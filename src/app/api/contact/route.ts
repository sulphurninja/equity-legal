// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, ContactForm } from "@/lib/db";

// If you're on Next.js 15, this helps ensure Node APIs like Buffer are available
export const runtime = "nodejs";

const TF_USERNAME = "API";
const TF_API_KEY = process.env.TRUSTEDFORM_API_KEY || "";

// -------------------- helpers --------------------
function getClientIp(req: NextRequest) {
  const xfwd = req.headers.get("x-forwarded-for");
  if (xfwd) return xfwd.split(",")[0]?.trim();
  return req.headers.get("x-real-ip") || req.cookies.get("client-ip")?.value || "0.0.0.0";
}

function isLikelyTrustedFormUrl(url: string | undefined) {
  if (!url) return false;
  try {
    const u = new URL(url);
    return /(^|\.)trustedform\.com$/i.test(u.hostname);
  } catch {
    return false;
  }
}

function basicAuthHeader(user: string, pass: string) {
  const token = Buffer.from(`${user}:${pass}`).toString("base64");
  return `Basic ${token}`;
}

/**
 * Claim/retain a TrustedForm certificate so it shows in your ActiveProspect account.
 * Returns { ok, status, json, raw } where ok === true when status === 201.
 */
async function claimTrustedFormCertificate(
  certUrl: string,
  payload: {
    reference?: string; // your internal id to correlate
    vendor?: string;    // shows up in TF reports (e.g., your domain)
    email_1?: string;
    phone_1?: string;
  }
) {
  const res = await fetch(certUrl, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(TF_USERNAME, TF_API_KEY),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {
    // leave as raw text
  }

  return { ok: res.status === 201, status: res.status, json, raw: text };
}

// -------------------- route --------------------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // TF cert URL coming from the form
    const trustedFormCertUrl: string =
      body.trustedFormCertUrl || body.xxTrustedFormCertUrl || "";

    const ipAddress = getClientIp(req);
    const userAgent = req.headers.get("user-agent") || "Unknown";
    const referer = req.headers.get("referer") || "";

    await connectToDatabase();

    // Sanitize the TF URL
    const tfUrl = isLikelyTrustedFormUrl(trustedFormCertUrl) ? trustedFormCertUrl : "";

    // Create the submission first
    const submission = new ContactForm({
      ...body,
      trustedFormCertUrl: tfUrl,
      ipAddress,
      userAgent,
      referer,
      submittedAt: new Date(),
    });

    await submission.save();

    // --- Claim/retain the TF cert so it appears in your ActiveProspect dashboard ---
    let claimSummary: { ok: boolean; status?: number } | null = null;

    if (tfUrl && TF_API_KEY) {
      try {
        const claim = await claimTrustedFormCertificate(tfUrl, {
          reference: submission._id.toString(),
          vendor: "lexclaimconnect.com", // you can change to any label you want
          email_1: body.email,
          phone_1: body.phone,
        });

        claimSummary = { ok: claim.ok, status: claim.status };

        // Persist claim metadata for auditing
        submission.set({
          trustedFormClaimed: claim.ok,
          trustedFormClaimStatus: claim.status,
          trustedFormClaimResponse: claim.json ?? claim.raw,
          claimedAt: new Date(),
        });
        await submission.save();
      } catch (e) {
        console.error("TrustedForm claim error:", e);
        submission.set({
          trustedFormClaimed: false,
          trustedFormClaimError: String(e),
        });
        await submission.save();
      }
    }

    return NextResponse.json(
      {
        message: "Contact form submitted successfully",
        success: true,
        trustedForm: {
          providedUrl: Boolean(tfUrl),
          claimed: claimSummary?.ok ?? false,
          status: claimSummary?.status ?? null,
        },
        id: submission._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      {
        message: "Error submitting contact form",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

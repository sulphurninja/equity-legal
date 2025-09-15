// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, ContactForm } from "@/lib/db";

function getClientIp(req: NextRequest) {
  const xfwd = req.headers.get("x-forwarded-for");
  if (xfwd) return xfwd.split(",")[0]?.trim();
  return (
    req.headers.get("x-real-ip") ||
    req.cookies.get("client-ip")?.value ||
    "0.0.0.0"
  );
}

function isLikelyTrustedFormUrl(url: string | undefined) {
  if (!url) return false;
  try {
    const u = new URL(url);
    // TrustedForm certs are typically hosted on trustedform.com subdomains.
    // We keep this permissive but safe; tighten if you prefer.
    return /(^|\.)trustedform\.com$/i.test(u.hostname);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Read TF certificate URL coming from the form
    // (you sent it as `trustedFormCertUrl`; SDK also places hidden field named `xxTrustedFormCertUrl`)
    const trustedFormCertUrl: string =
      body.trustedFormCertUrl ||
      body.xxTrustedFormCertUrl ||
      "";

    const ipAddress = getClientIp(req);
    const userAgent = req.headers.get("user-agent") || "Unknown";
    const referer = req.headers.get("referer") || "";

    await connectToDatabase();

    // Optional: basic validation/sanitization for TF URL
    const tfUrl = isLikelyTrustedFormUrl(trustedFormCertUrl)
      ? trustedFormCertUrl
      : "";

    const submission = new ContactForm({
      ...body,
      trustedFormCertUrl: tfUrl,
      ipAddress,
      userAgent,
      referer,
      submittedAt: new Date(),
    });

    await submission.save();

    return NextResponse.json(
      {
        message: "Contact form submitted successfully",
        success: true,
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

import { notFound } from "next/navigation";
import { Metadata } from "next";
import Header from "@/components/Header";
import CaseHero from "@/components/case-detail/CaseHero";
import CaseDescription from "@/components/case-detail/CaseDescription";
import EligibilityCriteria from "@/components/case-detail/EligibilityCriteria";
import CompensationInfo from "@/components/case-detail/CompensationInfo";
import RelatedConditions from "@/components/case-detail/RelatedConditions";
import CaseFAQ from "@/components/case-detail/CaseFAQ";
import CaseEvaluation from "@/components/sections/CaseEvaluation";
import { getCaseBySlug } from "@/lib/utils";

// Remove type definitions entirely to let Next.js infer them

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const caseData = await getCaseBySlug(params.slug);

  if (!caseData) {
    return {
      title: "Case Not Found | Lex Claim Connect",
      description: "The requested case information could not be found."
    };
  }

  return {
    title: `${caseData.title} Claims | Lex Claim Connect`,
    description: caseData.shortDescription,
  };
}

export default async function CaseDetailPage({
  params
}: {
  params: { slug: string }
}) {
  const caseData = await getCaseBySlug(params.slug);

  if (!caseData) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <CaseHero caseData={caseData} />
      <CaseDescription caseData={caseData} />
      <RelatedConditions caseData={caseData} />
      <EligibilityCriteria caseData={caseData} />
      <CompensationInfo caseData={caseData} />
      <CaseFAQ caseData={caseData} />
      <div id="case-evaluation" className="bg-gray-50 py-10">
        <CaseEvaluation />
      </div>
    </main>
  );
}

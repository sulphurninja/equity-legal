"use client";

import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import CaseHero from "@/components/case-detail/CaseHero";
import CaseDescription from "@/components/case-detail/CaseDescription";
import EligibilityCriteria from "@/components/case-detail/EligibilityCriteria";
import CompensationInfo from "@/components/case-detail/CompensationInfo";
import RelatedConditions from "@/components/case-detail/RelatedConditions";
import CaseFAQ from "@/components/case-detail/CaseFAQ";
import CaseEvaluation from "@/components/sections/CaseEvaluation";
import { CaseType } from "@/types/case";
import { useEffect } from "react";

interface CaseDetailContentProps {
  caseData: CaseType;
}

export default function CaseDetailContent({ caseData }: CaseDetailContentProps) {
  const searchParams = useSearchParams();

  // Example of using search params
  useEffect(() => {
    // Check if there's a specific section to scroll to from query params
    const section = searchParams.get('section');
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchParams]);

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

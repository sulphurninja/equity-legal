"use client";

import { motion } from "framer-motion";
import { CaseType } from "@/types/case";

interface CaseDescriptionProps {
  caseData: CaseType;
}

const CaseDescription = ({ caseData }: CaseDescriptionProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About {caseData.title} Claims
          </motion.h2>

          <motion.div
            className="prose prose-lg max-w-none text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>{caseData.fullDescription}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseDescription;

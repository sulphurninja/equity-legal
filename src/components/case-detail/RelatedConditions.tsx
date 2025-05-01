"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { CaseType } from "@/types/case";

interface RelatedConditionsProps {
  caseData: CaseType;
}

const RelatedConditions = ({ caseData }: RelatedConditionsProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Related Health Conditions
          </motion.h2>

          <motion.div
            className="flex items-start mb-8 bg-amber-50 border border-amber-200 p-4 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AlertCircle className="text-amber-500 mt-1 mr-3 flex-shrink-0" size={20} />
            <div>
              <p className="text-amber-800 font-medium">Important Health Information</p>
              <p className="text-amber-700">
                The following health conditions have been associated with {caseData.title.toLowerCase()}. If you've been diagnosed with any of these conditions, you may be eligible for compensation.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {caseData.relatedConditions.map((condition, index) => (
              <motion.div
                key={index}
                className="bg-white p-3 rounded-lg shadow-sm text-center"
                variants={itemVariants}
              >
                <span className="text-gray-700">{condition}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RelatedConditions;

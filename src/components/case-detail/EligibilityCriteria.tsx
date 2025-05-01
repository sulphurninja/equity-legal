"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CaseType } from "@/types/case";

interface EligibilityCriteriaProps {
  caseData: CaseType;
}

const EligibilityCriteria = ({ caseData }: EligibilityCriteriaProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
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
            Eligibility Criteria
          </motion.h2>

          <motion.p
            className="text-lg text-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            You may qualify for a {caseData.title} claim if you meet the following criteria:
          </motion.p>

          <motion.ul
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {caseData.eligibilityCriteria.map((criterion, index) => (
           <motion.li
           key={index}
           className="flex items-start bg-white p-4 rounded-lg shadow-sm"
           variants={itemVariants}
         >
           <Check className="text-primary mt-1 mr-3 flex-shrink-0" size={20} />
           <span className="text-gray-700">{criterion}</span>
         </motion.li>
       ))}
     </motion.ul>
   </div>
 </div>
</section>
);
};

export default EligibilityCriteria;

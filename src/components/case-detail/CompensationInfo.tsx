"use client";

import { motion } from "framer-motion";
import { DollarSign, Clock, ShieldAlert } from "lucide-react";
import { CaseType } from "@/types/case";

interface CompensationInfoProps {
  caseData: CaseType;
}

const CompensationInfo = ({ caseData }: CompensationInfoProps) => {
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
            Potential Compensation
          </motion.h2>

          <motion.div
            className="prose prose-lg max-w-none text-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>{caseData.compensationInfo}</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-primary/5 p-6 rounded-lg">
              <DollarSign className="text-primary mb-3" size={28} />
              <h3 className="text-lg font-bold text-primary mb-2">Financial Recovery</h3>
              <p className="text-gray-700">
                Compensation for medical bills, lost wages, pain and suffering, and other damages.
              </p>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <Clock className="text-primary mb-3" size={28} />
              <h3 className="text-lg font-bold text-primary mb-2">Time Sensitive</h3>
              <p className="text-gray-700">
                Legal deadlines apply. Don't wait to explore your legal options and rights.
              </p>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <ShieldAlert className="text-primary mb-3" size={28} />
              <h3 className="text-lg font-bold text-primary mb-2">No Risk</h3>
              <p className="text-gray-700">
                We work on a contingency fee basis - you pay nothing unless we win your case.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompensationInfo;

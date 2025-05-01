"use client";

import { motion } from "framer-motion";
import {
  ClipboardCheck,
  UserCheck,
  FileText,
  Scale,
  Coins,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ClaimProcess = () => {
  const steps = [
    {
      icon: <ClipboardCheck className="h-10 w-10 text-primary" />,
      title: "Free Case Review",
      description: "Complete our secure form or call us for a no-obligation evaluation of your potential claim by our legal experts."
    },
    {
      icon: <UserCheck className="h-10 w-10 text-primary" />,
      title: "Eligibility Verification",
      description: "Our specialized team analyzes your information to determine qualification and potential compensation value."
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Documentation & Evidence",
      description: "We assist in collecting relevant medical records, exposure documentation, and evidence to strengthen your case."
    },
    {
      icon: <Scale className="h-10 w-10 text-primary" />,
      title: "Legal Representation",
      description: "Our experienced attorneys file your claim and strategically advocate for maximum compensation on your behalf."
    },
    {
      icon: <Coins className="h-10 w-10 text-primary" />,
      title: "Compensation",
      description: "Receive the settlement you deserve for medical expenses, lost income, suffering, and other damages."
    }
  ];

  return (
    <section id="claim-process" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 md:w-64 md:h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Streamlined Claim Process
          </h2>
          <p className="text-lg text-gray-600">
            We've designed an efficient legal process that minimizes stress while maximizing your chances of a favorable outcome.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8 md:space-y-0 md:flex md:items-start md:justify-between md:flex-wrap relative">
          {/* Timeline line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[calc(50%-0.5px)] w-px h-[calc(100%-140px)] bg-primary/20 z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`md:w-[48%] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} relative z-10`}
              initial={{ opacity: 0, y: 40, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                <CardHeader className="flex flex-row items-start space-x-5 pb-2">
                  <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-primary/60">STEP {index + 1}</div>
                    <CardTitle className="text-xl text-primary">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Timeline dot (desktop only) */}
              <div className="hidden md:block absolute top-16 left-0 w-6 h-6 rounded-full bg-primary transform -translate-x-1/2 -translate-y-1/2 md:left-[calc(index % 2 === 0 ? 100% : 0)]"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-lg font-medium text-primary mb-6">
            Ready to start your claim process?
          </p>
          <Button asChild size="lg" variant="default" className="px-8 py-6 font-medium group">
            <Link href="#case-evaluation" className="flex items-center">
              Get Your Free Case Evaluation
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ClaimProcess;

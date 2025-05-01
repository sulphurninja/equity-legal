"use client";

import { motion } from "framer-motion";
import { HelpCircle, ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const FrequentlyAskedQuestions = () => {
  const faqs = [
    {
      question: "How do I know if I qualify for compensation?",
      answer: "Qualification criteria vary depending on the specific case. Generally, you may qualify if you were exposed to a harmful substance, used a defective product, or suffered injuries as a result of corporate negligence. Our free case evaluation can help determine if you're eligible for compensation based on your unique situation."
    },
    {
      question: "How much compensation could I receive?",
      answer: "Compensation amounts vary widely based on several factors, including the type and severity of your injuries, duration of exposure, medical expenses, lost wages, and pain and suffering. Some cases result in settlements ranging from tens of thousands to millions of dollars. Our legal team will work to secure the maximum compensation possible for your specific circumstances."
    },
    {
      question: "How long does the legal process take?",
      answer: "The timeline varies depending on the complexity of your case, but most claims take several months to a few years to resolve. Mass tort and class action cases often involve multiple phases, including discovery, potential settlement negotiations, and possibly trial. Our legal team works diligently to expedite the process while ensuring we build the strongest possible case for maximum compensation."
    },
    {
      question: "Will I need to appear in court?",
      answer: "Most mass tort and class action cases are resolved through settlements without clients needing to appear in court. However, in some instances, you might need to provide testimony or attend certain hearings. If your case does require court appearances, our legal team will thoroughly prepare you and provide support throughout the process."
    },
    {
      question: "Is there a deadline to file a claim?",
      answer: "Yes, there are time limits known as statutes of limitations that vary by case type and state. These deadlines can range from one to several years from the date of injury or from when you discovered (or should have discovered) that your injury was caused by a product or exposure. It's crucial to consult with an attorney as soon as possible to ensure your claim is filed within the appropriate timeframe."
    },
    {
      question: "Do I need to pay anything upfront to hire your firm?",
      answer: "No. We work on a contingency fee basis, which means you pay nothing upfront for our legal services. We only get paid if we win your case or secure a settlement. Our fee will be a percentage of your final compensation amount, which will be clearly outlined in our agreement before we begin working together."
    },
    {
      question: "What information will I need to provide for my case?",
      answer: "The specific information needed depends on your case type, but generally you'll need to provide medical records, evidence of exposure or product use, employment history (if relevant), and documentation of expenses related to your injury. During your initial consultation, we'll guide you through exactly what documentation will be helpful for your specific situation."
    }
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 text-primary border-primary/30">FAQ</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about our legal services and the claims process.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <motion.div
            className="lg:col-span-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <AccordionItem value={`item-${index}`} className="border-b border-gray-200">
                    <AccordionTrigger className="text-left font-medium text-lg text-primary hover:text-primary/80 py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-none shadow-lg bg-primary/5">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <HelpCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">Still Have Questions?</h3>
                </div>

                <p className="text-gray-600 mb-6">
                  If you don't see your question answered here, our legal team is ready to provide personalized assistance with your specific inquiry.
                </p>

                <Button asChild size="lg" className="w-full">
                  <Link href="#case-evaluation" className="flex items-center justify-center">
                    Contact Our Legal Team
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAskedQuestions;

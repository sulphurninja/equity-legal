"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Phone, ArrowRight, Share2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { CaseType } from "@/types/case";

interface CaseHeroProps {
  caseData: CaseType;
}

const CaseHero = ({ caseData }: CaseHeroProps) => {
  // Function to handle smooth scrolling to case evaluation
  const scrollToCaseEvaluation = (e: React.MouseEvent) => {
    e.preventDefault();
    const caseEvaluationElement = document.getElementById('case-evaluation');
    if (caseEvaluationElement) {
      caseEvaluationElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="pt-24 pb-16 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={caseData.imageUrl}
          alt={caseData.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/90 to-primary/85" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-white">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6 text-primary-foreground/70">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/cases">Cases</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-primary-foreground font-medium">
                  {caseData.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Back Button with highlighting animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Button
              asChild
              variant="ghost"
              className="text-accent hover:text-accent/80 hover:bg-white/5 -ml-3 group"
            >
              <Link href="/cases" className="flex items-center">
                <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
                Back to All Cases
              </Link>
            </Button>
          </motion.div>

          {/* Case status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4"
          >
            <Badge variant="outline" className="border-accent/50 text-accent px-3 py-1 uppercase text-xs tracking-wider">
              Active Litigation
            </Badge>
          </motion.div>

          {/* Case Title */}
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {caseData.title}
          </motion.h1>

          {/* Separator */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <Separator className="bg-accent/60 h-0.5 w-[120px]" />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              {caseData.shortDescription}
            </p>

            {/* Time sensitive notice */}
            <div className="flex items-center text-sm text-primary-foreground/80 mb-8 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              <Clock size={16} className="mr-2 text-accent" />
              <p>Time-sensitive: Legal deadlines may apply to your claim. Contact us promptly to protect your rights.</p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-primary font-medium text-base px-6 py-6 shadow-lg group"
                onClick={scrollToCaseEvaluation}
              >
                Check Your Eligibility
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-black hover:bg-white/10 hover:border-white/50 px-6 py-6"
              >
                <a href="tel:8001234567" className="flex text-black items-center">
                  <Phone size={16} className="mr-2" />
                  Call (908) 533-6944
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-white/20 text-white hover:bg-white/10 hidden sm:flex"
              >
                <Share2 size={16} />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseHero;

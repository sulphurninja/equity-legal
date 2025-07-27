"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Phone, 
  ArrowRight, 
  Share2, 
  Clock, 
  Shield,
  DollarSign,
  Users,
  Award,
  CheckCircle,
  Zap,
  AlertCircle,
  TrendingUp,
  Star,
  Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
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

  // Mock data for case-specific stats - in real app, this would come from the caseData
  const caseStats = {
    potentialCompensation: "$10,000 - $500,000+",
    casesWon: "2,500+",
    avgSettlement: "$125,000",
    timeLimit: caseData.featured ? "LIMITED TIME" : "ACTIVE"
  };

  return (
    <section className="pt-36  pb-16 sm:pb-20 relative overflow-hidden">
      {/* Enhanced Background with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src={caseData.imageUrl}
          alt={caseData.title}
          fill
          priority
          className="object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-blue-900/90 to-indigo-900/85" />
        
        {/* Animated Overlay Pattern */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"
          animate={{ x: [-100, 200] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-white">
          {/* Enhanced Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Breadcrumb className="mb-6 text-white/70">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="hover:text-accent transition-colors">
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/50" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="hover:text-accent transition-colors">
                    <Link href="/cases">Legal Cases</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/50" />
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-accent font-medium">
                    {caseData.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          {/* Enhanced Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <Button
              asChild
              variant="ghost"
              className="text-accent hover:text-accent/80 hover:bg-white/10 -ml-3 group backdrop-blur-sm border border-white/20 hover:border-accent/50 transition-all duration-300"
            >
              <Link href="/cases" className="flex items-center">
                <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
                <span className="hidden sm:inline">Back to All Cases</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Status Badges */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-2 sm:gap-3 mb-6"
              >
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-3 py-1 text-xs sm:text-sm font-bold backdrop-blur-sm">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                  ACTIVE LITIGATION
                </Badge>
                
                {caseData.featured && (
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-3 py-1 text-xs sm:text-sm font-bold backdrop-blur-sm animate-pulse">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                    URGENT DEADLINES
                  </Badge>
                )}
                
                <Badge className="bg-accent/20 text-accent border-accent/30 px-3 py-1 text-xs sm:text-sm font-bold backdrop-blur-sm">
                  <Scale className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                  NO WIN, NO FEE
                </Badge>
              </motion.div>

              {/* Case Title */}
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-accent to-yellow-400 bg-clip-text text-transparent">
                  {caseData.title}
                </span>
                <br />
                <span className="text-white text-2xl sm:text-3xl md:text-4xl">Claims & Compensation</span>
              </motion.h1>

              {/* Enhanced Separator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mb-6"
              >
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-accent to-yellow-400 rounded-full" />
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mb-8"
              >
                <p className="text-lg sm:text-xl text-white/90 mb-6 leading-relaxed">
                  {caseData.shortDescription}
                  <span className="font-bold text-accent"> Get the compensation you deserve.</span>
                </p>

                {/* Urgency Notice */}
                <Card className="bg-red-500/20 border-2 border-red-400/30 backdrop-blur-sm mb-6">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3">
                      <div className="bg-red-500/30 rounded-full p-2 flex-shrink-0">
                        <AlertCircle className="w-5 h-5 text-red-300" />
                      </div>
                      <div>
                        <h3 className="font-bold text-red-300 mb-2 text-sm sm:text-base">Time-Sensitive Legal Matter</h3>
                        <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                          Legal deadlines may apply to your claim. Many cases have statute of limitations that could prevent you from seeking compensation if you wait too long.
                          <span className="font-bold text-accent"> Contact us immediately to protect your rights.</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Main CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-accent to-yellow-400 hover:from-accent/90 hover:to-yellow-400/90 text-primary font-black text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 shadow-xl hover:shadow-2xl group transition-all duration-300"
                      onClick={scrollToCaseEvaluation}
                    >
                      <CheckCircle className="mr-2 sm:mr-3 h-5 w-5" />
                      <span className="hidden sm:inline">Check Your Eligibility</span>
                      <span className="sm:hidden">Check Eligibility</span>
                      <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="w-full border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-6 sm:px-8 py-4 sm:py-6 font-bold text-base sm:text-lg backdrop-blur-sm transition-all duration-300"
                    >
                      <a href="tel:9085336944" className="flex text-black items-center justify-center">
                        <Phone size={20} className="mr-2 sm:mr-3 text-black" />
                        <span className="hidden text-black sm:inline">Call (908) 533-6944</span>
                        <span className="sm:hidden ">Call Now</span>
                      </a>
                    </Button>
                  </motion.div>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-white/80 text-xs sm:text-sm">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-green-400 mr-2" />
                    <span className="font-medium">No Upfront Fees</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="font-medium">Free Consultation</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-accent mr-2" />
                    <span className="font-medium">98% Success Rate</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats Sidebar */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <Card className="bg-white/10 border-white/20 backdrop-blur-lg shadow-2xl">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Badge className="mb-3 px-3 py-1 bg-accent/20 text-accent border-accent/30 font-bold text-sm">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      CASE STATISTICS
                    </Badge>
                    <h3 className="text-xl font-black text-white mb-2">
                      {caseData.title} Cases
                    </h3>
                    <p className="text-white/70 text-sm">
                      Our track record with similar cases
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Potential Compensation */}
                    <div className="text-center">
                      <div className="bg-green-500/20 rounded-full p-4 inline-flex items-center justify-center mb-3">
                        <DollarSign className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="font-black text-2xl text-accent mb-1">{caseStats.potentialCompensation}</div>
                      <div className="text-white/70 text-sm">Potential Compensation</div>
                    </div>

                    <Separator className="bg-white/20" />

                    {/* Cases Won */}
                    <div className="text-center">
                      <div className="bg-blue-500/20 rounded-full p-4 inline-flex items-center justify-center mb-3">
                        <Award className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="font-black text-2xl text-accent mb-1">{caseStats.casesWon}</div>
                      <div className="text-white/70 text-sm">Similar Cases Won</div>
                    </div>

                    <Separator className="bg-white/20" />

                    {/* Average Settlement */}
                    <div className="text-center">
                      <div className="bg-purple-500/20 rounded-full p-4 inline-flex items-center justify-center mb-3">
                        <Users className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="font-black text-2xl text-accent mb-1">{caseStats.avgSettlement}</div>
                      <div className="text-white/70 text-sm">Average Settlement</div>
                    </div>
                  </div>

                  {/* Quick Action */}
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-black shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={scrollToCaseEvaluation}
                      >
                        <Zap className="mr-2 h-4 w-4" />
                        Start Free Review
                      </Button>
                    </motion.div>
                    
                    <p className="text-center text-white/60 text-xs mt-3">
                      Takes less than 2 minutes
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Trust Element */}
              <Card className="mt-6 bg-gradient-to-br from-accent/20 to-yellow-400/20 border-accent/30 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Shield className="w-5 h-5 text-accent mr-2" />
                    <span className="font-bold text-accent text-sm">100% CONFIDENTIAL</span>
                  </div>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Your consultation is completely confidential and protected by attorney-client privilege.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Share Button - Mobile Friendly */}
          <motion.div
            className="fixed bottom-6 right-6 sm:hidden z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm shadow-lg"
            >
              <Share2 size={16} />
              <span className="sr-only">Share case</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseHero;
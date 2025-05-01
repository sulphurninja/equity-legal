"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllCaseTypes } from "@/lib/utils";
import { CaseType } from "@/types/case";

const CaseTypesList = () => {
  const caseTypes = getAllCaseTypes();
  const [activeTab, setActiveTab] = useState("all");

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

  // Group cases by category for tabs
  const caseCategories = {
    all: caseTypes,
    medical: caseTypes.filter(c => ["cpap", "hernia-mesh", "nec-formula", "talcum-powder"].includes(c.slug)),
    environmental: caseTypes.filter(c => ["camp-lejeune", "roundup", "paraquat"].includes(c.slug)),
    military: caseTypes.filter(c => ["3m-earplugs", "camp-lejeune"].includes(c.slug))
  };

  return (
    <section id="case-types" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 text-primary border-primary/30">ACTIVE LITIGATION</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Mass Tort & Class Action Cases
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our firm is actively handling these significant cases. If you've been affected,
            you may be entitled to substantial compensation.
          </p>
        </motion.div>

        {/* Desktop view - Tabbed Interface */}
        <div className="hidden md:block">
          <Tabs defaultValue="all" className="w-full " onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-4 gap-4 w-full max-w-">
                <TabsTrigger value="all">All Cases</TabsTrigger>
                <TabsTrigger value="medical">Medical & Pharmaceutical</TabsTrigger>
                <TabsTrigger value="environmental">Environmental</TabsTrigger>
                <TabsTrigger value="military">Military</TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(caseCategories).map(([category, cases]) => (
              <TabsContent key={category} value={category}>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate={activeTab === category ? "visible" : "hidden"}
                  key={category}
                >
                  {cases.map((caseType) => (
                    <motion.div key={caseType.id} variants={itemVariants}>
                      <Link href={`/cases/${caseType.slug}`} className="block h-full group">
                        <Card className="h-full overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
                          <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src={caseType.imageUrl}
                              alt={caseType.title}
                              fill
                              className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                          </div>
                          <CardHeader className="pt-5 pb-0">
                            <CardTitle className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                              {caseType.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-3">
                            <CardDescription className="text-gray-600 line-clamp-3">
                              {caseType.shortDescription}
                            </CardDescription>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                              View Case Details <ArrowRight size={16} className="ml-1" />
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Mobile view - Enhanced Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {caseTypes.map((caseType) => (
                <CarouselItem key={caseType.id}>
                  <Link href={`/cases/${caseType.slug}`} className="block h-full">
                    <Card className="h-full overflow-hidden border-none shadow-md">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={caseType.imageUrl}
                          alt={caseType.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                      </div>
                      <CardHeader className="pt-5 pb-0">
                        <CardTitle className="text-lg font-bold text-primary">
                          {caseType.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-3">
                        <CardDescription className="text-gray-600 line-clamp-2">
                          {caseType.shortDescription}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <div className="flex items-center text-primary text-sm font-medium">
                          View Details <ArrowRight size={16} className="ml-1" />
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-2">
              <CarouselPrevious className="relative inset-0 translate-y-0" />
              <CarouselNext className="relative inset-0 translate-y-0" />
            </div>
          </Carousel>
        </div>

        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button asChild size="lg" variant="default" className="font-medium px-6 group">
            <Link href="/cases" className="flex items-center">
              Explore All Case Types
              <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseTypesList;

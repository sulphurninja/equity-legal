"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 text-white overflow-hidden">
      {/* Premium background with subtle overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/legal-background.jpg"
          alt="Legal background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/85" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Badge variant="outline" className="border-accent/50 text-accent px-4 py-1 mb-6 font-medium">
              TRUSTED LEGAL EXPERTISE
            </Badge>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-2 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Lex Claim Connect
          </motion.h1>

          <motion.div
            className="mx-auto w-24 mb-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Separator className="bg-accent/80 h-0.5" />
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl mb-10 text-gray-100 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Sophisticated legal representation for complex mass tort and class action litigation.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-primary font-medium px-6 py-6 shadow-md group">
              <Link href="#case-evaluation" className="flex items-center">
                Request Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button asChild variant="secondary" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-none shadow-md px-6 py-6">
              <a href="tel:8001234567">
               (908) 533-6944
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center space-x-16 md:space-x-24"
          >
            {[
              { number: "9+", text: "Years of Excellence" },
              { number: "$500M+", text: "Recovered for Clients" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-accent">{stat.number}</p>
                <p className="text-sm font-medium text-gray-200">{stat.text}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

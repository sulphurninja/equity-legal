"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook size={18} />, label: "Facebook", href: "#" },
    { icon: <Twitter size={18} />, label: "Twitter", href: "#" },
    { icon: <Linkedin size={18} />, label: "LinkedIn", href: "#" },
    { icon: <Instagram size={18} />, label: "Instagram", href: "#" }
  ];

  const caseLinks = [
    { label: "Camp Lejeune Water Contamination", href: "/cases/camp-lejeune" },
    { label: "3M Combat Arms Earplugs", href: "/cases/3m-earplugs" },
    { label: "Roundup Weed Killer", href: "/cases/roundup" },
    { label: "CPAP Machine Recall", href: "/cases/cpap" }
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Case Types", href: "#case-types" },
    { label: "Claim Process", href: "#claim-process" },
    { label: "FAQ", href: "#faq" },
    { label: "Free Case Review", href: "#case-evaluation" }
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Legal Disclaimer", href: "/disclaimer" },
    { label: "Accessibility", href: "/accessibility" }
  ];

  return (
    <footer className="bg-primary dark:bg-primary/90 text-primary-foreground pt-16 pb-8 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border-[40px] border-white" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border-[40px] border-white" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 mb-16">
          {/* Company Information */}
          <div className="lg:col-span-4">
            <div className="flex items-center mb-6">
              <img
                src="/logo.png"
                alt="Lex Claim Connect Logo"
                className="w-auto h-24"
              />
            </div>
            <span className="text-xl text-nowrap font-bold">Lex Claim Connect</span>
            <p className="mb-6 text-primary-foreground/80 leading-relaxed">
              We're dedicated to helping victims of negligence receive the compensation they deserve. Our experienced legal team handles mass tort and class action cases nationwide.
            </p>

            {/* Newsletter Subscription */}
            {/* <Card className="bg-white/10 border-none shadow-none mb-8">
              <CardContent className="p-4">
                <p className="text-sm text-white font-medium mb-3">Subscribe to our newsletter</p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="bg-white/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                  />
                  <Button variant="secondary" size="sm" className="shrink-0">
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card> */}

            {/* Social Links */}
            {/* <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="p-2.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div> */}
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3 text-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <Badge variant="outline" className="mr-2 bg-accent/20 text-accent border-transparent uppercase text-xs px-1.5">
                Contact
              </Badge>
              Contact Us
            </h3>
            <div className="space-y-5">
              <div className="flex items-start group">
                <Phone className="mr-3 mt-1 flex-shrink-0 text-accent group-hover:text-accent/80 transition-colors" size={18} />
                <div>
                  <p className="font-medium text-sm text-primary-foreground/70 mb-1">Call Us</p>
                  <a href="tel:9085336944" className="text-primary-foreground hover:text-accent transition-colors font-medium">
                    (908) 533-6944
                  </a>
                </div>
              </div>
              <div className="flex items-start group">
                <Mail className="mr-3 mt-1 flex-shrink-0 text-accent group-hover:text-accent/80 transition-colors" size={18} />
                <div>
                  <p className="font-medium text-sm text-primary-foreground/70 mb-1">Email Us</p>
                  <a href="mailto:support@lexclaimconnect.com" className="text-primary-foreground hover:text-accent transition-colors break-all font-medium">
                    support@lexclaimconnect.com
                  </a>
                </div>
              </div>
              {/* <div className="flex items-start group">
                <MapPin className="mr-3 mt-1 flex-shrink-0 text-accent group-hover:text-accent/80 transition-colors" size={18} />
                <div>
                  <p className="font-medium text-sm text-primary-foreground/70 mb-1">Our Office</p>
                  <address className="text-primary-foreground/90 not-italic">
                  613, Ridge Road, 201 Monmouth Junction<br />
                  NJ, 08852
                  </address>
                </div>
              </div> */}
            </div>
          </div>

          {/* Case Types */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6">Case Types</h3>
            <ul className="space-y-3">
              {caseLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center"
                  >
                    <div className="mr-2 w-1 h-1 bg-accent rounded-full"></div>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/cases"
                  className="text-accent hover:text-accent/80 transition-colors flex items-center font-medium"
                >
                  View All Case Types
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center"
                  >
                    <div className="mr-2 w-1 h-1 bg-accent rounded-full"></div>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="sm:col-span-2 lg:col-span-1 mt-2 pt-2 border-t border-white/10">
                <Button
                  asChild
                  variant="outline"
                  className="border-accent/50 hover:text-accent hover:bg-accent/20 hover:border-accent w-full text-black justify-start"
                >
                  <Link href="#case-evaluation" className="flex items-center">
                    <ExternalLink size={14} className="mr-2" />
                    Free Consultation
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="text-center text-sm text-primary-foreground/70">
          <p className="mb-4">© {currentYear} Lex Claim Connect. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {legalLinks.map((link, index) => (
              <React.Fragment key={index}>
                <Link href={link.href} className="hover:text-primary-foreground transition-colors">
                  {link.label}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="text-primary-foreground/30">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <motion.p
            className="text-xs max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            This website is attorney advertising. The information on this website is for general information purposes only.
            Nothing on this site should be taken as legal advice for any individual case or situation.
            This information is not intended to create, and receipt or viewing does not constitute, an attorney-client relationship.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

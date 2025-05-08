"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronRight, Clock, Award, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { getAllCaseTypes } from "@/lib/utils";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const caseTypes = getAllCaseTypes();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Group case types for a better organized mega menu
  const groupedCaseTypes = () => {
    const popularCases = caseTypes.slice(0, 4); // First 4 cases as popular
    const medicalCases = caseTypes.filter(c =>
      c.title.includes("CPAP") ||
      c.title.includes("Hernia") ||
      c.title.includes("Exactech") ||
      c.title.includes("NEC")
    );
    const environmentalCases = caseTypes.filter(c =>
      c.title.includes("Camp Lejeune") ||
      c.title.includes("Roundup") ||
      c.title.includes("PFAS") ||
      c.title.includes("Paraquat")
    );

    return { popularCases, medicalCases, environmentalCases };
  };

  const { popularCases, medicalCases, environmentalCases } = groupedCaseTypes();

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/97 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      {/* Top notification bar */}
      {/* <div className={cn(
        "bg-accent/90 text-primary py-1.5 transition-all overflow-hidden",
        scrolled ? "max-h-0 opacity-0" : "max-h-8 opacity-100"
      )}>
        <div className="container mx-auto px-4 flex justify-center items-center">
          <Clock size={14} className="mr-2" />
          <p className="text-xs font-medium">
            Free consultations available 24/7 • Call now: <a href="tel:8001234567" className="font-bold hover:underline">(908) 864-0126</a>
          </p>
        </div>
      </div> */}

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <img
                alt="Lex Claim Connect Logo"
                src='/logo.png'
                className="w-auto h-12 scale-125"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation with Enhanced Mega Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`text-${scrolled ? 'primary/90' : 'white'} font-medium`}>Case Types</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-3 gap-0 w-[900px] p-6">
                      <div className="px-4 border-r border-gray-200">
                        <h4 className="font-semibold text-primary mb-3 flex items-center">
                          <Award className="w-4 h-4 mr-2" /> Popular Cases
                        </h4>
                        <ul className="space-y-2">
                          {popularCases.map((caseType) => (
                            <li key={caseType.id}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={`/cases/${caseType.slug}`}
                                  className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium text-primary">{caseType.title}</div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="px-4 border-r border-gray-200">
                        <h4 className="font-semibold text-primary mb-3 flex items-center">
                          <Scale className="w-4 h-4 mr-2" /> Medical Cases
                        </h4>
                        <ul className="space-y-2">
                          {medicalCases.map((caseType) => (
                            <li key={caseType.id}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={`/cases/${caseType.slug}`}
                                  className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium text-primary">{caseType.title}</div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="px-4">
                        <h4 className="font-semibold text-primary mb-3 flex items-center">
                          <Scale className="w-4 h-4 mr-2" /> Environmental Cases
                        </h4>
                        <ul className="space-y-2">
                          {environmentalCases.map((caseType) => (
                            <li key={caseType.id}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={`/cases/${caseType.slug}`}
                                  className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium text-primary">{caseType.title}</div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-span-3 mt-4 pt-4 border-t border-gray-200">
                        <Link
                          href="/cases"
                          className="flex items-center justify-center w-full select-none rounded-md p-3 text-sm font-medium leading-none no-underline outline-none transition-colors bg-primary text-white hover:bg-primary/90"
                        >
                          View All Case Types
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/cases" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <span className={`text-${scrolled ? 'primary/90' : 'white'} hover:text-${scrolled ? 'primary/90' : 'black'}`}>All Cases</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#claim-process" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <span className={`text-${scrolled ? 'primary/90' : 'white '}`}>Claim Process</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#faq" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <span className={`text-${scrolled ? 'primary/90' : 'white'}`}>FAQ</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Phone number - visible on medium+ screens */}
          <div className={`hidden md:flex items-center ${scrolled ? 'text-primary' : 'text-white'} font-bold`}>
            <div className="bg-accent/20 rounded-full p-2 mr-3">
              <Phone className="text-accent" size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs opacity-80">Call for Free Consultation</span>
              <a href="tel:9085336944" className="hover:text-accent transition">
                (908) 533-6944
              </a>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button asChild variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold shadow-sm">
              <Link href="#case-evaluation">Free Case Review</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden flex items-center space-x-4">
            <a href="tel:8001234567" className={`${scrolled ? 'text-primary' : 'text-white'} p-2 rounded-full hover:bg-gray-100/20 transition-colors`}>
              <Phone size={20} />
            </a>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={`rounded-full ${scrolled ? 'text-primary' : 'text-white'}`} aria-label="Menu">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] sm:w-[385px] p-0">
                <div className="h-full flex flex-col">
                  <div className="p-6 border-b">
                    <div className="flex items-center">
                      <Image
                        src="/logo.png"
                        alt="Lex Claim Connect Logo"
                        width={32}
                        height={32}
                        className="w-auto h-8 mr-2"
                      />
                      <span className="text-lg font-bold text-primary">Lex Claim Connect</span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto py-4">
                    <div className="px-6 py-2 text-sm font-medium text-primary/70 uppercase tracking-wider">Case Types</div>
                    <div className="space-y-1">
                      {caseTypes.map((caseType) => (
                        <Link
                          key={caseType.id}
                          href={`/cases/${caseType.slug}`}
                          className="block px-6 py-2.5 text-gray-700 hover:text-primary hover:bg-gray-50"
                        >
                          {caseType.title}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 px-6 py-2 text-sm font-medium text-primary/70 uppercase tracking-wider">Navigation</div>
                    <div className="space-y-1">
                      <Link
                        href="/cases"
                        className="block px-6 py-2.5 text-gray-700 hover:text-primary hover:bg-gray-50 "
                      >
                        All Cases
                      </Link>
                      <Link
                        href="#claim-process"
                        className="block px-6 py-2.5 text-gray-700 hover:text-primary hover:bg-gray-50"
                      >
                        Claim Process
                      </Link>
                      <Link
                        href="#faq"
                        className="block px-6 py-2.5 text-gray-700 hover:text-primary hover:bg-gray-50"
                      >
                        FAQ
                      </Link>
                    </div>
                  </div>
                  <div className="p-6 border-t mt-auto">
                    <Button asChild className="w-full bg-accent text-primary hover:bg-accent/90" size="lg">
                      <Link href="#case-evaluation">
                        Free Case Review
                      </Link>
                    </Button>
                    <div className="flex justify-center mt-4">
                      <a href="tel:8001234567" className="flex items-center text-primary font-medium">
                        <Phone className="mr-2" size={16} />
                        Call (908) 533-6944
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

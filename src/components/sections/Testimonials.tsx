"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import useEmblaCarousel from 'embla-carousel-react';
import { Testimonial } from "@/types/case";

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    caseType: "Camp Lejeune Water Contamination",
    quote: "After being diagnosed with cancer linked to my time at Camp Lejeune, I didn't know where to turn. Lex Claim Connect guided me through the entire process with compassion and expertise. They secured a settlement that covered all my medical expenses and provided financial security for my family.",
    rating: 5,
    date: "January 15, 2023"
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    caseType: "3M Combat Arms Earplugs",
    quote: "As a veteran suffering from hearing loss due to defective earplugs, I was struggling to get the compensation I deserved. The team at Lex Claim Connect fought for me every step of the way. Their knowledge of military cases made all the difference in my successful claim.",
    rating: 5,
    date: "March 3, 2023"
  },
  {
    id: "3",
    name: "Jennifer Patel",
    caseType: "Roundup Weed Killer",
    quote: "After my non-Hodgkin's lymphoma diagnosis, I suspected it was connected to years of Roundup use in my nursery business. Lex Claim Connect took my case when others wouldn't. Their dedication and expertise resulted in a settlement that has given me peace of mind during a difficult time.",
    rating: 5,
    date: "April 22, 2023"
  },
  {
    id: "4",
    name: "Robert Williams",
    caseType: "CPAP Machine Recall",
    quote: "When I developed respiratory issues from my recalled CPAP machine, Lex Claim Connect helped me understand my rights. They maintained clear communication throughout the process and secured compensation that covered my medical bills and much more.",
    rating: 5,
    date: "June 10, 2023"
  },
  {
    id: "5",
    name: "David Thompson",
    caseType: "Hernia Mesh Complications",
    quote: "After multiple surgeries due to a defective hernia mesh, I was in pain and facing mounting medical bills. Lex Claim Connect took on the manufacturers and won. Their tenacity and legal expertise turned my situation around completely.",
    rating: 5,
    date: "August 5, 2023"
  }
];

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
    return () => {
      if (emblaApi) emblaApi.off('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    };
  }, [emblaApi]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        size={16}
      />
    ));
  };

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 opacity-5">
        <Quote size={300} className="text-primary rotate-180" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 text-primary border-primary/30">TESTIMONIALS</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Client Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear directly from clients who trusted us with their legal matters and received the justice and compensation they deserved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4" key={testimonial.id}>
                    <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-white">
                      <CardContent className="p-6 md:p-8 h-full flex flex-col">
                        <div className="mb-1">
                          <Quote size={30} className="text-primary/20" />
                        </div>
                        <div className="flex mb-3">
                          {renderStars(testimonial.rating)}
                        </div>
                        <p className="text-gray-700 italic mb-6 flex-grow">
                          "{testimonial.quote}"
                        </p>
                        <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                          <Avatar className="h-12 w-12 mr-4 bg-primary/10 text-primary">
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-800">{testimonial.name}</p>
                            <div className="flex items-center">
                              <Badge variant="secondary" className="text-xs font-normal bg-primary/10 text-primary hover:bg-primary/15">
                                {testimonial.caseType}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                onClick={scrollPrev}
                className="p-2 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} className="text-primary" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${index === selectedIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-gray-300'
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={scrollNext}
                className="p-2 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} className="text-primary" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

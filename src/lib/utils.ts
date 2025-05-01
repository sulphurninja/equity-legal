import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CaseType } from "@/types/case";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAllCaseTypes = (): CaseType[] => {
  return [
    // Existing cases
    {
      id: "1",
      slug: "camp-lejeune",
      title: "Camp Lejeune Water Contamination",
      shortDescription: "Military personnel and families exposed to contaminated water at Camp Lejeune may qualify for compensation.",
      fullDescription: "From 1953 to 1987, the water supply at Marine Corps Base Camp Lejeune in North Carolina was contaminated with dangerous chemicals including TCE, PCE, benzene, and vinyl chloride. Military personnel, their families, and civilian workers who lived or worked at the base during this period were exposed to these harmful substances, which have been linked to various cancers, Parkinson's disease, and other serious health conditions. The Camp Lejeune Justice Act of 2022 now allows affected individuals to seek compensation for their injuries.",
      imageUrl: "/images/cases/camp.jpg",
      compensationInfo: "Compensation amounts vary based on several factors, including the type and severity of your condition, duration of exposure, medical expenses, lost wages, and pain and suffering. Some Camp Lejeune settlements have ranged from $100,000 to over $1 million.",
      eligibilityCriteria: [
        "Stationed, lived, or worked at Camp Lejeune for at least 30 days between August 1953 and December 1987",
        "Developed a qualifying health condition such as cancer, Parkinson's disease, or birth defects",
        "Must file claim before August 10, 2024 (two years after the Camp Lejeune Justice Act was signed)"
      ],
      relatedConditions: [
        "Bladder Cancer",
        "Breast Cancer",
        "Esophageal Cancer",
        "Female Infertility",
        "Kidney Cancer",
        "Leukemia",
        "Liver Cancer",
        "Lung Cancer",
        "Miscarriage",
        "Multiple Myeloma",
        "Non-Hodgkin's Lymphoma",
        "Parkinson's Disease",
        "Renal Toxicity",
        "Scleroderma"
      ],
      faqs: [
        {
          question: "Who is eligible to file a Camp Lejeune water contamination claim?",
          answer: "Veterans, family members, and civilian workers who lived or worked at Camp Lejeune for at least 30 days between August 1953 and December 1987 and have since developed a qualifying health condition may be eligible to file a claim."
        },
        {
          question: "What if my loved one who was exposed has passed away?",
          answer: "Family members may file wrongful death claims on behalf of deceased veterans or dependents who were exposed to contaminated water at Camp Lejeune and later developed a qualifying condition."
        },
        {
          question: "Will filing a claim affect my VA benefits?",
          answer: "No. Filing a Camp Lejeune lawsuit will not affect your existing VA healthcare benefits or disability compensation. Any settlement you receive through a lawsuit is in addition to your VA benefits."
        }
      ]
    },
    {
      id: "2",
      slug: "3m-earplugs",
      title: "3M Combat Arms Earplugs",
      shortDescription: "Military service members who suffered hearing damage after using defective 3M earplugs may be eligible for compensation.",
      fullDescription: "Between 2003 and 2015, 3M Company supplied the U.S. military with Combat Arms Earplugs Version 2 (CAEv2), which were standard issue for military personnel serving in combat zones like Iraq and Afghanistan. These dual-ended earplugs were designed to provide two levels of hearing protection: one end for blocking all sound, and the other for blocking loud impulse sounds while allowing soldiers to hear commands and approaching enemies. However, the earplugs had a design defect that prevented them from forming a proper seal in the ear canal, leaving users vulnerable to hearing damage from loud combat and training noises. As a result, many service members developed hearing loss, tinnitus (ringing in the ears), and other auditory issues.",
      imageUrl: "/images/cases/earplug.jpg",
      compensationInfo: "Compensation in 3M earplug cases varies based on the severity of hearing damage and its impact on your life. Settlements may cover medical expenses, lost wages, pain and suffering, and decreased quality of life. Some individual verdicts have reached into the millions, though most settlements are lower.",
      eligibilityCriteria: [
        "Served in the U.S. military between 2003 and 2015",
        "Used 3M Combat Arms Earplugs during service",
        "Diagnosed with hearing loss, tinnitus, or other hearing-related condition"
      ],
      relatedConditions: [
        "Hearing Loss",
        "Tinnitus (Ringing in the Ears)",
        "Auditory Processing Disorder",
        "Permanent Hearing Damage"
      ],
      faqs: [
        {
          question: "How do I know if I used 3M Combat Arms Earplugs during my service?",
          answer: "The dual-ended Combat Arms Earplugs Version 2 (CAEv2) were standard issue to many service members deployed to Iraq and Afghanistan between 2003 and 2015. If you served during this time and were issued earplugs, there's a good chance they were the 3M product in question."
        },
        {
          question: "What evidence do I need for my 3M earplug claim?",
          answer: "Important evidence includes military service records, medical records documenting your hearing issues, diagnosis of hearing loss or tinnitus, and documentation of when and where you used the 3M earplugs. Our legal team can help you gather the necessary documentation."
        }
      ]
    },
    {
      id: "3",
      slug: "roundup",
      title: "Roundup Weed Killer",
      shortDescription: "Individuals exposed to Roundup herbicide who later developed cancer may qualify for substantial compensation.",
      fullDescription: "Roundup, manufactured by Monsanto (now owned by Bayer), is one of the world's most widely used herbicides. Its active ingredient, glyphosate, has been linked to the development of non-Hodgkin's lymphoma and other forms of cancer. Thousands of lawsuits have been filed against Bayer alleging that long-term exposure to Roundup caused users to develop cancer and that the company failed to warn consumers about the potential risks. In 2015, the International Agency for Research on Cancer (IARC) classified glyphosate as 'probably carcinogenic to humans,' fueling concerns about Roundup's safety.",
      imageUrl: "/images/cases/roundup.jpg",
      compensationInfo: "Roundup lawsuits have resulted in some of the largest product liability settlements in history. Bayer has set aside over $10 billion to resolve Roundup claims. Individual settlements vary widely, with some plaintiffs receiving several million dollars, especially in cases involving serious illness or death.",
      eligibilityCriteria: [
        "Regular exposure to Roundup weed killer (typically over several years)",
        "Diagnosed with non-Hodgkin's lymphoma or another qualifying cancer",
        "Diagnosis occurred within a reasonable time after exposure"
      ],
      relatedConditions: [
        "Non-Hodgkin's Lymphoma",
        "B-cell Lymphoma",
        "T-cell Lymphoma",
        "Chronic Lymphocytic Leukemia",
        "Multiple Myeloma",
        "Hairy Cell Leukemia"
      ],
      faqs: [
        {
          question: "Who is most at risk from Roundup exposure?",
          answer: "Those with the highest risk include agricultural workers, landscapers, gardeners, groundskeepers, and others who used Roundup regularly as part of their job. Homeowners who frequently used Roundup for lawn care over many years may also be at risk."
        },
        {
          question: "Is Roundup still on the market?",
          answer: "Yes, Roundup products are still available for sale in the United States. However, Bayer has announced plans to reformulate Roundup for the U.S. residential market to remove glyphosate while continuing to sell glyphosate-based formulations for agricultural use."
        }
      ]
    },
    {
      id: "4",
      slug: "cpap",
      title: "CPAP Machine Recall",
      shortDescription: "Users of recalled Philips CPAP, BiPAP, or ventilator devices who suffered injuries may be eligible for compensation.",
      fullDescription: "In June 2021, Philips Respironics issued a recall for millions of CPAP (Continuous Positive Airway Pressure), BiPAP (Bi-Level Positive Airway Pressure), and mechanical ventilator devices manufactured between 2009 and April 26, 2021. The recall was prompted by potential health risks associated with the polyester-based polyurethane (PE-PUR) sound abatement foam used in these devices. This foam can degrade over time, releasing potentially harmful particles and chemicals that users might inhale or ingest. The FDA has classified this as a Class I recall, the most serious type, indicating that use of these devices may cause serious injuries or death.",
      imageUrl: "/images/cases/cpap.jpg",
      compensationInfo: "Compensation in Philips CPAP lawsuits may cover medical expenses, ongoing treatment costs, lost wages, pain and suffering, and in some cases, punitive damages. The exact amount varies based on the severity of injuries and individual circumstances.",
      eligibilityCriteria: [
        "Used a recalled Philips CPAP, BiPAP, or ventilator device",
        "Experienced symptoms or diagnosed with a condition potentially related to foam degradation or exposure",
        "Used the device within the relevant timeframe (generally between 2009 and April 2021)"
      ],
      relatedConditions: [
        "Respiratory Issues (Inflammation, Irritation)",
        "Asthma",
        "Chemical Exposure Effects",
        "Headache",
        "Airway Inflammation",
        "Cancer (Lung, Kidney, Liver)",
        "Organ Damage",
        "Sinus Infection"
      ],
      faqs: [
        {
          question: "How do I know if my CPAP device is part of the recall?",
          answer: "You can check if your device is affected by looking up the serial number on the Philips Respironics recall website or by contacting Philips directly. Recalled devices include most DreamStation models made before April 26, 2021, as well as several other CPAP, BiPAP, and ventilator models."
        },
        {
          question: "What should I do if I have a recalled device?",
          answer: "Consult with your doctor before stopping use of your device, as the benefits may outweigh the risks for some users. Register your device with Philips for the recall, and consider alternative treatment options after discussing with your healthcare provider. If you've experienced health issues, document your symptoms and seek medical attention."
        }
      ]
    },
    // Additional cases from reference websites
    {
      id: "9",
      slug: "tylenol-autism",
      title: "Tylenol Autism & ADHD",
      shortDescription: "Children exposed to acetaminophen (Tylenol) before birth who developed autism or ADHD may qualify for compensation.",
      fullDescription: "Recent scientific studies have suggested a potential link between prenatal exposure to acetaminophen (the active ingredient in Tylenol and many other over-the-counter pain relievers) and an increased risk of autism spectrum disorder (ASD) and attention deficit hyperactivity disorder (ADHD) in children. Lawsuits allege that manufacturers and retailers of acetaminophen products failed to warn pregnant women about the potential risks of using these medications during pregnancy. These cases are based on multiple research studies, including a 2021 consensus statement published in Nature Reviews Endocrinology where 91 medical experts warned against using acetaminophen during pregnancy unless medically necessary.",
      imageUrl: "/images/cases/tylenol.jpg",
      compensationInfo: "As this litigation is still in its early stages, specific settlement amounts haven't been established. Compensation may cover medical expenses, therapy costs, educational support, lost earning capacity, and pain and suffering related to autism or ADHD diagnoses linked to prenatal acetaminophen exposure.",
      eligibilityCriteria: [
        "Mother used acetaminophen (Tylenol or generic versions) during pregnancy",
        "Child diagnosed with autism spectrum disorder (ASD) or ADHD",
        "Clear documentation of acetaminophen use during pregnancy and subsequent diagnosis"
      ],
      relatedConditions: [
        "Autism Spectrum Disorder (ASD)",
        "Attention Deficit Hyperactivity Disorder (ADHD)",
        "Developmental Delays",
        "Language Impairments",
        "Behavioral Issues"
      ],
      faqs: [
        {
          question: "Does all acetaminophen use during pregnancy cause autism or ADHD?",
          answer: "No, research suggests a potential increased risk, not a guaranteed outcome. Studies indicate that factors such as the amount, frequency, and duration of acetaminophen use during pregnancy may influence the level of risk. Many children whose mothers took acetaminophen during pregnancy do not develop these conditions."
        },
        {
          question: "What evidence will I need for a Tylenol autism lawsuit?",
          answer: "Important evidence includes medical records documenting acetaminophen use during pregnancy (such as doctor recommendations, prescriptions, or purchase receipts), the child's diagnostic records for autism or ADHD, and documentation of ongoing treatments and therapies. Our legal team can help determine if your case qualifies."
        }
      ]
    },
    {
      id: "10",
      slug: "hair-relaxer",
      title: "Hair Relaxer Cancer",
      shortDescription: "Women who regularly used chemical hair relaxers or straighteners and developed uterine, ovarian, or breast cancer may be eligible for compensation.",
      fullDescription: "Recent scientific research, including a 2022 study from the National Institutes of Health, has found that women who used chemical hair straightening or relaxing products may have an increased risk of developing uterine cancer, endometrial cancer, ovarian cancer, and breast cancer. These products contain potentially harmful endocrine-disrupting chemicals that can be absorbed through the scalp, especially if there are burns or lesions present during application. Lawsuits allege that manufacturers of these hair relaxer products, including L'Oréal, SoftSheen-Carson, Namaste, Dark & Lovely, and others, failed to warn consumers about these serious health risks despite allegedly being aware of the dangers.",
      imageUrl: "/images/cases/hair.png",
      compensationInfo: "Hair relaxer lawsuits are currently in the early stages of litigation. Potential compensation may include medical expenses, pain and suffering, lost wages, diminished quality of life, and punitive damages in some cases. The amount will likely vary based on factors such as the type and stage of cancer, treatment requirements, and individual circumstances.",
      eligibilityCriteria: [
        "Regular use of chemical hair relaxers or straighteners (usually for several years)",
        "Diagnosed with uterine cancer, endometrial cancer, ovarian cancer, or breast cancer",
        "No significant family history or genetic predisposition to the diagnosed cancer"
      ],
      relatedConditions: [
        "Uterine Cancer",
        "Endometrial Cancer",
        "Ovarian Cancer",
        "Breast Cancer",
        "Uterine Fibroids"
      ],
      faqs: [
        {
          question: "Which hair relaxer products are involved in lawsuits?",
          answer: "Lawsuits include various chemical hair straightening and relaxer products, particularly those marketed to Black women. Brands named in legal actions include Dark & Lovely, Just for Me, Optimum, Motions, TCB Naturals, Soft & Beautiful, and others manufactured by companies such as L'Oréal USA, SoftSheen-Carson, Revlon, and Strength of Nature."
        },
        {
          question: "Is there a connection between hair relaxers and specific types of cancer?",
          answer: "Research has found the strongest link between chemical hair relaxers and uterine cancer, with one NIH study showing women who used these products more than four times per year had more than double the risk of developing uterine cancer. Studies have also suggested potential links to ovarian and breast cancer, though research is ongoing."
        }
      ]
    },
    {
      id: "11",
      slug: "zantac",
      title: "Zantac Cancer",
      shortDescription: "Users of Zantac (ranitidine) who developed cancer may qualify for compensation after the discovery of a cancer-causing contaminant in the medication.",
      fullDescription: "In 2019, the FDA announced that Zantac (ranitidine) and its generic versions contained N-nitrosodimethylamine (NDMA), a probable human carcinogen. This discovery led to a market-wide recall of all ranitidine products in 2020. NDMA can form when ranitidine breaks down, especially when exposed to heat or over time during storage. Lawsuits allege that manufacturers, including GlaxoSmithKline, Boehringer Ingelheim, Sanofi, and Pfizer, knew or should have known about the NDMA contamination but failed to warn consumers about the cancer risks. Many Zantac users who took the medication regularly for heartburn, acid reflux, or GERD have since been diagnosed with various types of cancer, particularly of the digestive system.",
      imageUrl: "/images/cases/zantac.webp",
      compensationInfo: "A $500 million settlement was announced in July 2023 to resolve approximately 70,000 Zantac claims. Individual settlements for qualifying cases will vary based on cancer type, severity, age at diagnosis, duration of Zantac use, and other factors. Additional litigation is still ongoing for certain cancer types.",
      eligibilityCriteria: [
        "Regular use of prescription or over-the-counter Zantac/ranitidine (typically for at least one year)",
        "Diagnosed with a qualifying cancer type (bladder, stomach, esophageal, liver, pancreatic, colorectal)",
        "Diagnosis occurred after using Zantac regularly and within a reasonable timeframe after exposure"
      ],
      relatedConditions: [
        "Bladder Cancer",
        "Stomach Cancer",
        "Esophageal Cancer",
        "Liver Cancer",
        "Pancreatic Cancer",
        "Colorectal Cancer"
      ],
      faqs: [
        {
          question: "Does all ranitidine exposure cause cancer?",
          answer: "No, not everyone who took Zantac or generic ranitidine will develop cancer. The risk appears to be related to the amount and duration of exposure, as well as individual factors that affect cancer susceptibility. The legal cases focus on the manufacturers' alleged failure to warn about potential risks or properly test their products."
        },
        {
          question: "Can I still file a Zantac lawsuit?",
          answer: "Yes, while some settlement agreements have been reached, many claims are still being actively litigated. The ability to file depends on factors such as when you were diagnosed with cancer, what type of cancer you have, your history of Zantac use, and the statute of limitations in your state. It's important to consult with an attorney promptly to evaluate your specific situation."
        }
      ]
    },
    {
      id: "12",
      slug: "firefighting-foam",
      title: "Firefighting Foam (AFFF)",
      shortDescription: "Firefighters and others exposed to AFFF (aqueous film-forming foam) who developed cancer may be eligible for compensation.",
      fullDescription: "Aqueous film-forming foam (AFFF) has been widely used since the 1970s to fight flammable liquid fires, particularly at military bases, airports, and firefighter training facilities. This foam contains per- and polyfluoroalkyl substances (PFAS), sometimes called 'forever chemicals' because they don't break down naturally in the environment or human body. Scientific research has linked PFAS exposure to various types of cancer and other health conditions. Lawsuits allege that manufacturers of AFFF, including 3M and DuPont, knew about the potential health risks but failed to warn users or develop safer alternatives. Those at highest risk include firefighters, military personnel (especially those on naval ships or air bases), and communities near facilities where AFFF was regularly used.",
      imageUrl: "/images/cases/foam.jpg",
      compensationInfo: "In June 2023, 3M announced a settlement agreement of up to $12.5 billion to resolve AFFF litigation. Additional settlements may be forthcoming from other manufacturers. The compensation available will vary based on factors such as the type and stage of cancer, duration of exposure, and individual circumstances.",
      eligibilityCriteria: [
        "Significant exposure to AFFF firefighting foam (occupational or environmental)",
        "Diagnosed with a cancer associated with PFAS exposure (kidney, testicular, pancreatic, etc.)",
        "Clear timeline connecting foam exposure to cancer diagnosis"
      ],
      relatedConditions: [
        "Kidney Cancer",
        "Testicular Cancer",
        "Pancreatic Cancer",
        "Bladder Cancer",
        "Prostate Cancer",
        "Non-Hodgkin's Lymphoma",
        "Thyroid Disease",
        "Liver Damage",
        "Elevated Cholesterol"
      ],
      faqs: [
        {
          question: "Who was typically exposed to firefighting foam?",
          answer: "Those with highest exposure include firefighters (both military and civilian), military personnel stationed at bases where AFFF was used (particularly Navy and Air Force bases), airport workers involved in firefighting or training, and residents living near military bases, airports, or training facilities where AFFF contaminants entered the groundwater."
        },
        {
          question: "Is firefighting foam still being used?",
          answer: "While many facilities are transitioning to PFAS-free firefighting foams, AFFF is still used in some locations, particularly where required by federal regulations. However, the Department of Defense has been directed to phase out AFFF by October 2024, and many states have enacted legislation restricting its use."
        }
      ]
    },
    {
      id: "13",
      slug: "infant-formula-nec",
      title: "Infant Formula NEC",
      shortDescription: "Premature infants who developed necrotizing enterocolitis (NEC) after consuming cow's milk-based formula may be eligible for compensation.",
      fullDescription: "Necrotizing enterocolitis (NEC) is a serious gastrointestinal condition primarily affecting premature infants, where intestinal tissue becomes inflamed and dies. Research has indicated that premature babies fed cow's milk-based formulas, such as Similac or Enfamil, may have a significantly higher risk of developing NEC compared to those fed with human breast milk. Lawsuits allege that manufacturers of these formulas, including Abbott Laboratories (Similac) and Mead Johnson (Enfamil), failed to properly warn parents and medical providers about the increased risk of NEC associated with their products when used in premature infants.",
      imageUrl: "/images/cases/infant.jpg",
      compensationInfo: "Compensation in NEC formula cases may include medical expenses, future medical care, pain and suffering, and in cases of infant death, wrongful death damages. These cases are still developing, but given the serious nature of NEC and its consequences, substantial compensation may be available in successful claims.",
      eligibilityCriteria: [
        "Premature infant (born before 37 weeks gestation)",
        "Fed cow's milk-based formula (such as Similac or Enfamil) in the NICU or shortly after",
        "Diagnosed with necrotizing enterocolitis (NEC)",
        "Suffered serious complications requiring surgery or resulting in death"
      ],
      relatedConditions: [
        "Intestinal Perforation",
        "Short Bowel Syndrome",
        "Sepsis",
        "Developmental Delays",
        "Cerebral Palsy (in severe cases)",
        "Intestinal Stricture",
        "Need for Ostomy or Feeding Tube"
      ],
      faqs: [
        {
          question: "How is NEC linked to baby formula?",
          answer: "Multiple scientific studies have found that premature infants fed cow's milk-based formulas are more likely to develop NEC than those fed human milk. The exact mechanism isn't fully understood, but it's believed that premature intestines may have difficulty properly digesting cow's milk proteins, leading to inflammation and injury to the intestinal walls."
        },
        {
          question: "What should I do if my child was diagnosed with NEC after being fed formula?",
          answer: "First, ensure your child is receiving appropriate medical care. Then, gather all medical records related to your child's birth, NICU stay, feeding regimen, and NEC diagnosis and treatment. Keep any documentation about the formula your child received. Contact a qualified attorney who specializes in NEC formula cases to discuss your potential legal options."
        }
      ]
    },
    // Continuing with additional cases
    {
      id: "14",
      slug: "exactech",
      title: "Exactech Joint Replacement",
      shortDescription: "Patients with failed Exactech knee, hip, or ankle replacements may be eligible for compensation due to defective polyethylene inserts.",
      fullDescription: "In February 2022, Exactech expanded a recall of its joint replacement systems due to defective packaging of polyethylene inserts. The packaging failed to contain a secondary barrier layer that prevents oxygen from diffusing into the plastic insert, causing the plastic to degrade prematurely. This oxidation can lead to accelerated wear, bone loss, component fatigue, and premature joint replacement failure. The recall affects thousands of knee, ankle, and hip replacement systems implanted since 2004. Lawsuits allege that Exactech knew or should have known about these issues but failed to warn patients and surgeons about the risks.",
      imageUrl: "/images/cases/exactech.jpg",
      compensationInfo: "Compensation in Exactech cases may cover revision surgery costs, medical expenses, pain and suffering, lost wages, and diminished quality of life. Settlement amounts will likely depend on factors such as the severity of complications, number of revision surgeries needed, and impact on daily functioning.",
      eligibilityCriteria: [
        "Received an Exactech knee, ankle, or hip replacement system after 2004",
        "Experienced premature device failure or complications",
        "Required or scheduled for revision surgery",
        "Device is part of the recall (Optetrak, Truliant, Vantage, or other Exactech systems)"
      ],
      relatedConditions: [
        "Joint Pain and Swelling",
        "Instability or Loosening",
        "Osteolysis (Bone Loss)",
        "Polyethylene Wear",
        "Component Fatigue Cracking/Fracture",
        "Limited Mobility",
        "Revision Surgery"
      ],
      faqs: [
        {
          question: "How do I know if my Exactech implant is recalled?",
          answer: "Exactech has provided a look-up tool on their website where patients can enter their implant serial number to determine if it's part of the recall. Your orthopedic surgeon or their office staff may also be able to verify if your specific device is affected. The recall mainly includes Optetrak, Optetrak Logic, Truliant knee systems, Vantage ankle systems, and certain hip inserts."
        },
        {
          question: "What should I do if I have a recalled Exactech joint replacement?",
          answer: "First, consult with your orthopedic surgeon to evaluate your implant's condition and determine if you're experiencing any symptoms of premature wear. Your surgeon may recommend imaging tests such as X-rays to assess the implant. Even if you're not currently experiencing symptoms, regular monitoring is important. If you have complications, document all symptoms and medical visits, and contact an attorney to discuss your legal options."
        }
      ]
    },
    {
      id: "15",
      slug: "pfas-water-contamination",
      title: "PFAS Water Contamination",
      shortDescription: "People exposed to PFAS-contaminated water who developed cancer or other serious conditions may qualify for compensation.",
      fullDescription: "Per- and polyfluoroalkyl substances (PFAS) are a group of man-made chemicals that have been manufactured since the 1940s and used in everything from non-stick cookware to water-resistant clothing, food packaging, and firefighting foam. These 'forever chemicals' persist in the environment and human body, and have contaminated drinking water systems serving millions of Americans. Scientific studies have linked PFAS exposure to various health effects, including cancer, thyroid disease, decreased fertility, developmental issues in children, and immune system suppression. Lawsuits target manufacturers of PFAS chemicals, including 3M and DuPont, as well as companies that used these chemicals in their products, alleging they knew about the potential health risks but failed to warn the public.",
      imageUrl: "/images/cases/pfas.jpg",
      compensationInfo: "Several major settlements have been announced, including a $10.3 billion settlement by 3M in June 2023 to resolve public water supplier claims. Compensation in individual cases varies based on exposure level, type and severity of illness, and other factors. Additional settlements are expected as litigation progresses.",
      eligibilityCriteria: [
        "Exposure to PFAS-contaminated water (typically in a known contamination area)",
        "Diagnosed with a condition linked to PFAS exposure (certain cancers, thyroid disease, etc.)",
        "Evidence connecting contamination to local water supply"
      ],
      relatedConditions: [
        "Kidney Cancer",
        "Testicular Cancer",
        "Thyroid Disease and Cancer",
        "Ulcerative Colitis",
        "High Cholesterol",
        "Pregnancy-Induced Hypertension",
        "Immune System Effects",
        "Liver Damage"
      ],
      faqs: [
        {
          question: "How do I know if my water is contaminated with PFAS?",
          answer: "You can check the Environmental Working Group's PFAS Contamination Map or review water quality reports from your local utility. If you live near a military base, airport, firefighter training facility, or industrial plant that used PFAS, your risk may be higher. Water testing services can also check your water for PFAS contamination."
        },
        {
          question: "What levels of PFAS are considered dangerous?",
          answer: "The EPA has established a health advisory level of 0.004 parts per trillion (ppt) for PFOA and 0.02 ppt for PFOS, two of the most studied PFAS chemicals. These extremely low levels reflect growing concern about even minimal exposure. However, many water systems contain PFAS at levels much higher than these guidelines."
        }
      ]
    },
    {
      id: "16",
      slug: "hair-straightener-cancer",
      title: "Hair Straightener Cancer",
      shortDescription: "Women who regularly used chemical hair straighteners and developed uterine or other reproductive cancers may be eligible for compensation.",
      fullDescription: "In October 2022, a study from the National Institutes of Health found that women who frequently use chemical hair straightening or relaxer products may have more than twice the risk of developing uterine cancer compared to those who don't use these products. The study, which followed over 33,000 women for nearly 11 years, is particularly significant for Black women, who use hair straightening products at higher rates. These products often contain endocrine-disrupting chemicals like phthalates, parabens, and formaldehyde that can be absorbed through the scalp, especially when there are burns or abrasions present during application. Lawsuits allege that manufacturers failed to warn consumers about these serious health risks despite allegedly having knowledge of the dangers.",
      imageUrl: "/images/cases/hairst.jpg",
      compensationInfo: "Hair straightener cancer lawsuits are in the early stages of litigation. Compensation may include medical expenses, pain and suffering, lost wages, diminished quality of life, and possibly punitive damages. The amounts will likely vary based on factors such as cancer type and stage, treatment requirements, and individual circumstances.",
      eligibilityCriteria: [
        "Regular use of chemical hair straighteners/relaxers for several years",
        "Diagnosed with uterine cancer, endometrial cancer, ovarian cancer, or uterine fibroids",
        "No significant family history or genetic predisposition to the diagnosed condition"
      ],
      relatedConditions: [
        "Uterine Cancer",
        "Endometrial Cancer",
        "Ovarian Cancer",
        "Uterine Fibroids",
        "Breast Cancer",
        "Hormonal Disorders"
      ],
      faqs: [
        {
          question: "Which hair straightening products are involved in these lawsuits?",
          answer: "Lawsuits name various chemical hair straightening and relaxer products, particularly those marketed to Black women. Brands potentially involved include Dark & Lovely, Just for Me, Optimum, Motions, TCB Naturals, Soft & Beautiful, African Pride, Creme of Nature, ORS Olive Oil, and others manufactured by companies like L'Oréal, SoftSheen-Carson, Revlon, and Strength of Nature."
        },
        {
          question: "How is chemical hair straightener use linked to cancer?",
          answer: "Research suggests that chemical hair straighteners contain endocrine-disrupting chemicals that can mimic hormones in the body, potentially leading to hormonal cancers like uterine and ovarian cancer. These chemicals can be absorbed through the scalp, especially when there are burns or lesions present during application. The frequent application of these products over many years may increase exposure and risk."
        }
      ]
    },
    {
      id: "17",
      slug: "toxic-baby-food",
      title: "Toxic Baby Food",
      shortDescription: "Children exposed to heavy metals in baby food who developed autism or ADHD may qualify for compensation.",
      fullDescription: "In February 2021, a U.S. Congressional report revealed that several major baby food manufacturers were selling products containing dangerous levels of toxic heavy metals, including arsenic, lead, cadmium, and mercury. These heavy metals can have serious neurodevelopmental effects on developing brains, potentially contributing to autism spectrum disorder (ASD), attention deficit hyperactivity disorder (ADHD), and other neurological conditions. Lawsuits allege that baby food manufacturers knew their products contained these harmful substances but failed to warn parents about the risks or take adequate steps to reduce contamination levels. Affected brands named in litigation include Gerber, Beech-Nut, Earth's Best Organic, Parent's Choice (Walmart), Happy Baby (Nurture), and others.",
      imageUrl: "/images/cases/toxic.webp",
      compensationInfo: "As toxic baby food litigation is still developing, specific settlement amounts haven't been established. Compensation may cover medical expenses, therapy costs, educational support, lost earning capacity, and pain and suffering related to neurodevelopmental conditions linked to heavy metal exposure during critical developmental periods.",
      eligibilityCriteria: [
        "Child consumed commercial baby foods from named manufacturers during first years of life",
        "Child diagnosed with autism spectrum disorder, ADHD, or other qualifying developmental condition",
        "Clear documentation of baby food consumption and subsequent diagnosis"
      ],
      relatedConditions: [
        "Autism Spectrum Disorder (ASD)",
        "Attention Deficit Hyperactivity Disorder (ADHD)",
        "Cognitive Impairment",
        "Developmental Delays",
        "Learning Disabilities",
        "Behavioral Problems"
      ],
      faqs: [
        {
          question: "Which baby food brands are involved in the lawsuits?",
          answer: "Brands named in the Congressional report and subsequent lawsuits include Gerber, Beech-Nut, Earth's Best Organic (Hain Celestial Group), Parent's Choice (Walmart), Happy Baby (Nurture Inc.), Plum Organics (Campbell Soup), and Sprout Organic Foods. However, the issue may affect additional manufacturers as testing continues."
        },
        {
          question: "How can heavy metals in baby food affect child development?",
          answer: "Heavy metals like lead, arsenic, mercury, and cadmium are neurotoxins that can cross the blood-brain barrier and interfere with brain development, particularly during the critical first years of life. Even low levels of exposure can affect cognitive function, behavior, attention, and social skills. The developing brain is especially vulnerable to these toxins, which may contribute to conditions like autism and ADHD."
        }
      ]
    },
    {
      id: "18",
      slug: "paraquat",
      title: "Paraquat Herbicide",
      shortDescription: "Agricultural workers exposed to Paraquat herbicide who developed Parkinson's disease may qualify for compensation.",
      fullDescription: "Paraquat dichloride is a highly toxic herbicide used for weed and grass control in agricultural settings. Despite being banned in more than 30 countries due to its extreme toxicity, it remains one of the most widely used herbicides in the United States, primarily in commercial farming. Scientific research has established a potential link between paraquat exposure and an increased risk of developing Parkinson's disease, a progressive nervous system disorder affecting movement. Lawsuits allege that manufacturers of paraquat products, including Syngenta and Chevron, failed to adequately warn users about the potential neurological risks associated with exposure to the chemical, even when used as directed with safety equipment.",
      imageUrl: "/images/cases/paraquat.jpg",
      compensationInfo: "In 2023, a significant $220 million settlement was announced to resolve paraquat lawsuits, with individual payouts expected to range from $5,000 to $300,000 depending on factors like age at diagnosis, exposure level, and case strength. Additional litigation is ongoing with potential for further settlements.",
      eligibilityCriteria: [
        "Exposure to paraquat through occupational use, proximity to agricultural spraying, or contaminated water",
        "Diagnosed with Parkinson's disease or Parkinsonism",
        "Clear timeline connecting exposure to later development of symptoms"
      ],
      relatedConditions: [
        "Parkinson's Disease",
        "Parkinsonism",
        "Tremors",
        "Bradykinesia (Slow Movement)",
        "Muscle Rigidity",
        "Balance Problems",
        "Cognitive Impairment (in advanced cases)"
      ],
      faqs: [
        {
          question: "Who is most at risk for paraquat exposure?",
          answer: "Those with the highest risk include licensed applicators who directly handle and spray paraquat, agricultural workers in fields where paraquat was applied, farmers, tank mixers/loaders, chemical transporters, and those living near heavily sprayed agricultural areas. The risk is highest for those with repeated exposure over time."
        },
        {
          question: "How can I prove I was exposed to paraquat?",
          answer: "Documentation that can help establish paraquat exposure includes employment records showing work in agriculture, pesticide application licenses, purchase receipts for paraquat products, spraying logs or records, medical records noting occupational chemical exposure, and witness statements from co-workers or employers. Our legal team can help you gather and organize this documentation."
        }
      ]
    },
    {
      id: "19",
      slug: "talcum-powder",
      title: "Talcum Powder Cancer",
      shortDescription: "Women who developed ovarian cancer after using talcum powder products may be entitled to compensation.",
      fullDescription: "For decades, many women used talcum powder products, such as Johnson & Johnson's Baby Powder and Shower to Shower, for feminine hygiene purposes. However, scientific research has suggested a potential link between talcum powder use in the genital area and an increased risk of ovarian cancer. Lawsuits allege that talc manufacturers, particularly Johnson & Johnson, were aware of studies indicating this risk but failed to warn consumers. In October 2023, Johnson & Johnson reached a $6.475 billion settlement agreement to resolve most talcum powder lawsuits after their previous attempts to handle the litigation through bankruptcy were rejected by courts. The controversy centers around the potential contamination of talc with asbestos (a known carcinogen) due to the natural proximity of these minerals in the earth, as well as concerns about talc particles themselves traveling to the ovaries and causing inflammation that may lead to cancer.",
      imageUrl: "/images/cases/talcum-powder.avif",
      compensationInfo: "Johnson & Johnson has proposed a settlement of $6.475 billion to resolve talcum powder claims. Individual compensation would vary based on factors such as age at diagnosis, severity of illness, and whether the case involved death. Previous jury verdicts in talcum powder cases ranged from millions to billions of dollars, though many were later reduced on appeal.",
      eligibilityCriteria: [
        "Regular use of talcum powder products in the genital area for an extended period (typically years)",
        "Diagnosed with ovarian cancer or mesothelioma",
        "No significant family history of ovarian cancer or genetic predisposition"
      ],
      relatedConditions: [
        "Ovarian Cancer",
        "Fallopian Tube Cancer",
        "Primary Peritoneal Cancer",
        "Mesothelioma (in rare cases)"
      ],
      faqs: [
        {
          question: "Does all talcum powder cause cancer?",
          answer: "Not necessarily. The concern is primarily with talcum powder that may contain traces of asbestos due to contamination during the mining process, as well as the potential inflammatory effects of talc particles themselves. Modern talcum powder products often use alternatives like cornstarch, and manufacturers have implemented more rigorous testing for asbestos. The lawsuits focus on older formulations and usage patterns spanning decades."
        },
        {
          question: "Is there a statute of limitations for filing a talcum powder lawsuit?",
          answer: "Yes, there are time limits for filing talcum powder lawsuits that vary by state. Generally, the clock starts running at the time of diagnosis or when you should have reasonably known about the connection between your cancer and talcum powder use. Given the recent settlement announcement, it's essential to consult with an attorney promptly to understand the specific deadlines that apply to your situation."
        }
      ]
    },
    {
      id: "20",
      slug: "hernia-mesh",
      title: "Hernia Mesh Complications",
      shortDescription: "Patients who suffered complications after hernia repair surgery using surgical mesh may qualify for compensation.",
      fullDescription: "Hernia mesh is a medical device used to provide additional support to damaged tissue around hernias during surgical repair. While mesh can be effective in preventing hernia recurrence, certain types of surgical mesh products have been associated with serious complications. Thousands of patients have reported adverse effects including severe pain, infection, adhesion (when the mesh sticks to internal organs), bowel obstruction, mesh migration (when the mesh moves from its original placement), and the need for revision surgery. Several manufacturers have faced lawsuits alleging that their hernia mesh products were defectively designed or that they failed to adequately warn about potential risks.",
      imageUrl: "/images/cases/hernia-mesh.jpg",
      compensationInfo: "Compensation in hernia mesh cases typically covers medical expenses, revision surgeries, lost wages, pain and suffering, and decreased quality of life. Settlement amounts vary widely depending on the severity of complications, with some cases resolving for tens of thousands of dollars and others for hundreds of thousands. Manufacturers like C.R. Bard and Ethicon have reached settlements in some cases, while litigation against other manufacturers continues.",
      eligibilityCriteria: [
        "Underwent hernia repair surgery where mesh was implanted",
        "Experienced complications such as pain, infection, adhesion, obstruction, or mesh failure",
        "Required revision surgery or ongoing medical treatment due to mesh complications"
      ],
      relatedConditions: [
        "Chronic Pain",
        "Infection",
        "Adhesion to Organs",
        "Bowel Obstruction",
        "Mesh Migration",
        "Perforation of Organs",
        "Hernia Recurrence",
        "Inflammatory Response"
      ],
      faqs: [
        {
          question: "Which hernia mesh products are involved in lawsuits?",
          answer: "Multiple hernia mesh products from various manufacturers have been subject to litigation, including certain products made by Ethicon (Physiomesh), Atrium Medical (C-QUR), and Davol/C.R. Bard (Kugel Patch, PerFix Plug, Ventralex, and others). The specific products involved in lawsuits continue to evolve as new issues emerge."
        },
        {
          question: "How long do I have to file a hernia mesh lawsuit?",
          answer: "The statute of limitations varies by state and depends on when your injury occurred or when you discovered it was related to the hernia mesh. Typically, you have between 1-6 years to file a claim, but this timeline can be complex in medical device cases. It's best to consult with an attorney as soon as possible to ensure your claim is filed within the appropriate timeframe."
        }
      ]
    }
  ];
};

export const getCaseBySlug = async (slug: string): Promise<CaseType | undefined> => {
  const allCases = getAllCaseTypes();
  return allCases.find(c => c.slug === slug);
};

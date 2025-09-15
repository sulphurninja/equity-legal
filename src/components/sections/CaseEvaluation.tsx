"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, AlertCircle, ArrowRight, User, Mail, Phone, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CaseEvaluationFormData, FormStatus } from "@/types/form";
import { getAllCaseTypes } from "@/lib/utils";

declare global {
  interface Window {
    trustedFormCertUrlCallback?: (url: string) => void;
    trustedFormCertIdCallback?: (id: string) => void;
  }
}

interface ExtendedFormData extends CaseEvaluationFormData {
  agreeToQualification: boolean;
  agreeToTermsAndContact: boolean;
  agreeToDisclaimer: boolean;
  trustedFormCertUrl?: string; // for dev visibility only
}

const CaseEvaluation = () => {
  const [formData, setFormData] = useState<ExtendedFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    caseType: "",
    exposurePeriod: "",
    medicalCondition: "",
    additionalInfo: "",
    agreeToTerms: false,
    agreeToQualification: false,
    agreeToTermsAndContact: false,
    agreeToDisclaimer: false,
    trustedFormCertUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "", message: "" });

  const formRef = useRef<HTMLFormElement | null>(null);
  const tfUrlRef = useRef<string>(""); // set via callback if available
  const caseTypes = getAllCaseTypes();

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    // Optional callbacks (fire AFTER the script inserts the cert URL into your form):
    window.trustedFormCertUrlCallback = (url: string) => {
      tfUrlRef.current = url;
      setFormData((prev) => ({ ...prev, trustedFormCertUrl: url }));
      // console.debug("TrustedForm URL:", url);
    };
    window.trustedFormCertIdCallback = (id: string) => {
      // console.debug("TrustedForm ID:", id);
    };

    const loc = encodeURIComponent(window.location.href);
    const ref = encodeURIComponent(document.referrer || "");
    const field = "xxTrustedFormCertUrl";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = `https://api.trustedform.com/certify.js?provide_referrer=true&l=${loc}&r=${ref}&field=${encodeURIComponent(field)}`;

    // 🔑 Append INSIDE the form so TF injects the hidden input into THIS form.
    form.appendChild(script);
  }, []);

  // Wait briefly for TF to populate hidden input / callback before you submit
  const waitForTrustedFormUrl = async (): Promise<string> => {
    for (let i = 0; i < 30; i++) { // ~1.5s total
      const injected = formRef.current?.querySelector(
        'input[name="xxTrustedFormCertUrl"]'
      ) as HTMLInputElement | null;
      const v = injected?.value || tfUrlRef.current || "";
      if (v) return v;
      await new Promise((r) => setTimeout(r, 50));
    }
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (field: string, value: string) => setFormData((p) => ({ ...p, [field]: value }));
  const handleCheckboxChange = (field: string, checked: boolean) => setFormData((p) => ({ ...p, [field]: checked }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setFormStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }
    if (!formData.agreeToQualification || !formData.agreeToTermsAndContact || !formData.agreeToDisclaimer) {
      setFormStatus({ type: "error", message: "You must agree to all terms and conditions to proceed." });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      const tfUrl = await waitForTrustedFormUrl(); // may be "" if blocked

      await axios.post("/api/contact", {
        ...formData,
        trustedFormCertUrl: tfUrl,
      });

      setFormStatus({
        type: "success",
        message: "Your case evaluation request has been submitted successfully. A legal representative will contact you shortly.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        caseType: "",
        exposurePeriod: "",
        medicalCondition: "",
        additionalInfo: "",
        agreeToTerms: false,
        agreeToQualification: false,
        agreeToTermsAndContact: false,
        agreeToDisclaimer: false,
        trustedFormCertUrl: "",
      });
    } catch (err) {
      setFormStatus({
        type: "error",
        message: "An error occurred. Please try again later or call our office directly.",
      });
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="case-evaluation" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <Badge variant="outline" className="mb-6 px-4 py-2 text-primary border-primary/30 bg-primary/5 font-bold">100% FREE EVALUATION</Badge>
          <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">Get Your Free</span><br />
            <span className="text-gray-800">Case Evaluation</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-none shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-blue-50 text-center pb-8">
              <CardTitle className="text-2xl font-bold text-primary">Find Out If You Qualify for Compensation</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form ref={formRef} onSubmit={handleSubmit}>
                {/* TF will inject:
                   <input type="hidden" name="xxTrustedFormCertUrl" id="xxTrustedFormCertUrl_0" value="https://cert.trustedform.com/..." />
                */}
                <div className="space-y-6">
                  {/* Contact Info */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-6 text-center">Your Contact Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-bold text-gray-700 flex items-center"><User className="w-4 h-4 mr-2 text-primary" />First Name*</Label>
                        <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-bold text-gray-700 flex items-center"><User className="w-4 h-4 mr-2 text-primary" />Last Name*</Label>
                        <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email" className="text-sm font-bold text-gray-700 flex items-center"><Mail className="w-4 h-4 mr-2 text-primary" />Email Address*</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-bold text-gray-700 flex items-center"><Phone className="w-4 h-4 mr-2 text-primary" />Phone Number*</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                      </div>
                    </div>
                  </div>

                  {/* Case Details */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-6 text-center">Case Details</h3>
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="caseType" className="text-sm font-bold text-gray-700 flex items-center"><Scale className="w-4 h-4 mr-2 text-primary" />Case Type*</Label>
                        <Select onValueChange={(v) => handleSelectChange("caseType", v)} value={formData.caseType}>
                          <SelectTrigger className="mt-2 h-12 border-2 border-gray-200 focus:border-primary">
                            <SelectValue placeholder="Select your case type" />
                          </SelectTrigger>
                          <SelectContent>
                            {caseTypes.map((ct) => (
                              <SelectItem key={ct.id} value={ct.slug}>{ct.title}</SelectItem>
                            ))}
                            <SelectItem value="other">Other / Not Sure</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="additionalInfo" className="text-sm font-bold text-gray-700">Additional Information</Label>
                        <Textarea id="additionalInfo" name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>

                  {/* Required Agreements */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                    <h4 className="font-bold text-primary mb-4">Required Agreements</h4>
                    <div className="flex items-start space-x-3">
                      <Checkbox id="agreeToQualification" checked={formData.agreeToQualification} onCheckedChange={(c) => handleCheckboxChange("agreeToQualification", c as boolean)} className="mt-1" />
                      <label htmlFor="agreeToQualification" className="text-sm text-gray-800 cursor-pointer leading-relaxed">I may need help to find out if I may qualify for a settlement claim</label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox id="agreeToTermsAndContact" checked={formData.agreeToTermsAndContact} onCheckedChange={(c) => handleCheckboxChange("agreeToTermsAndContact", c as boolean)} className="mt-1" />
                      <label htmlFor="agreeToTermsAndContact" className="text-sm text-gray-800 cursor-pointer leading-relaxed">
                        I agree to the Terms of Service and Privacy Policy and authorize lexclaimconnect.com and up to 4 law firms, 3rd party providers and/or PLM to contact me by telephone, email, artificial voice and/or pre-recorded/text messages, using automated technology to the contact details provided above. You may revoke consent at any time. Message/data rates may apply. Consent is NOT a condition of purchase.
                      </label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox id="agreeToDisclaimer" checked={formData.agreeToDisclaimer} onCheckedChange={(c) => handleCheckboxChange("agreeToDisclaimer", c as boolean)} className="mt-1" />
                      <label htmlFor="agreeToDisclaimer" className="text-sm text-gray-800 cursor-pointer leading-relaxed">
                        Lex Claim Connect ("www.lexclaimconnect.com") is not a law firm and not a lawyer referral service...
                      </label>
                    </div>
                  </div>

                  {/* Status */}
                  <AnimatePresence>
                    {formStatus.message && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className={`p-4 rounded-lg ${formStatus.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                        <div className="flex items-start">
                          {formStatus.type === "success" ? <CheckCircle2 className="mr-3 mt-0.5 w-5 h-5" /> : <AlertCircle className="mr-3 mt-0.5 w-5 h-5" />}
                          <p className="font-medium">{formStatus.message}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <div className="flex justify-center pt-6">
                    <Button type="submit" name="submit" className="bg-gradient-to-r from-accent to-yellow-400 text-primary font-black px-8 py-6 text-lg w-full sm:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2 w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Get My Free Evaluation <ArrowRight className="ml-3 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Dev-only debug:
                  <pre className="text-xs mt-2">TF URL: {formData.trustedFormCertUrl || "(waiting...)"} </pre>
                  */}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CaseEvaluation;

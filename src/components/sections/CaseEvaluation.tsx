"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  User,
  Mail,
  Phone,
  Scale,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CaseEvaluationFormData, FormStatus } from "@/types/form";
import { getAllCaseTypes } from "@/lib/utils";

interface ExtendedFormData extends CaseEvaluationFormData {
  agreeToQualification: boolean;
  agreeToTermsAndContact: boolean;
  agreeToDisclaimer: boolean;
  trustedFormCertUrl?: string; // <- capture from TrustedForm hidden input
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

  const caseTypes = getAllCaseTypes();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setFormStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    if (
      !formData.agreeToQualification ||
      !formData.agreeToTermsAndContact ||
      !formData.agreeToDisclaimer
    ) {
      setFormStatus({
        type: "error",
        message: "You must agree to all terms and conditions to proceed.",
      });
      return;
    }

    // Read TrustedForm cert URL from hidden input that the SDK injects/populates
    const tfInput = formRef.current?.querySelector(
      'input[name="xxTrustedFormCertUrl"]'
    ) as HTMLInputElement | null;
    const tfUrl = tfInput?.value || "";

    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      await axios.post("/api/contact", {
        ...formData,
        trustedFormCertUrl: tfUrl, // send to server
      });

      setFormStatus({
        type: "success",
        message:
          "Your case evaluation request has been submitted successfully. A legal representative will contact you shortly.",
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
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "An error occurred. Please try again later or call our office directly.",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="case-evaluation" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Load TrustedForm SDK AFTER the page is interactive.
          This snippet appends a hidden input named `xxTrustedFormCertUrl`
          and records the page URL/referrer. */}
      <Script id="trustedform-certify" strategy="afterInteractive">
        {`
          (function() {
            var tf = document.createElement('script'); tf.type = 'text/javascript'; tf.async = true;
            var loc = encodeURIComponent(window.location.href);
            var ref = encodeURIComponent(document.referrer);
            // NOTE: both `field=xxTrustedFormCertUrl` and `xxTrustedFormCertUrl` param ensure the field name.
            tf.src = 'https://api.trustedform.com/certify.js?provide_referrer=true'
                     + '&l=' + loc
                     + '&r=' + ref
                     + '&field=xxTrustedFormCertUrl'
                     + '&xxTrustedFormCertUrl=xxTrustedFormCertUrl';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tf, s);
          })();
        `}
      </Script>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Badge
            variant="outline"
            className="mb-6 px-4 py-2 text-primary border-primary/30 bg-primary/5 font-bold"
          >
            100% FREE EVALUATION
          </Badge>

          <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Get Your Free
            </span>
            <br />
            <span className="text-gray-800">Case Evaluation</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-none shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-blue-50 text-center pb-8">
              <CardTitle className="text-2xl font-bold text-primary">
                Find Out If You Qualify for Compensation
              </CardTitle>
            </CardHeader>

            <CardContent className="p-8">
              <form ref={formRef} onSubmit={handleSubmit} data-tf-element="form">
                {/* hidden input for TF cert (SDK will populate) */}
                <input type="hidden" name="xxTrustedFormCertUrl" value={formData.trustedFormCertUrl || ""} readOnly />

                <div className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-6 text-center">Your Contact Information</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-bold text-gray-700 flex items-center">
                          <User className="w-4 h-4 mr-2 text-primary" />
                          First Name*
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="mt-2 h-12 border-2 border-gray-200 focus:border-primary"
                          required
                          data-tf-element-role="first-name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="lastName" className="text-sm font-bold text-gray-700 flex items-center">
                          <User className="w-4 h-4 mr-2 text-primary" />
                          Last Name*
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="mt-2 h-12 border-2 border-gray-200 focus:border-primary"
                          required
                          data-tf-element-role="last-name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email" className="text-sm font-bold text-gray-700 flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-primary" />
                          Email Address*
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-2 h-12 border-2 border-gray-200 focus:border-primary"
                          required
                          data-tf-element-role="email"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-sm font-bold text-gray-700 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-primary" />
                          Phone Number*
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-2 h-12 border-2 border-gray-200 focus:border-primary"
                          required
                          data-tf-element-role="phone"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Case Details */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-6 text-center">Case Details</h3>

                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="caseType" className="text-sm font-bold text-gray-700 flex items-center">
                          <Scale className="w-4 h-4 mr-2 text-primary" />
                          Case Type*
                        </Label>
                        <Select
                          onValueChange={(value) => handleSelectChange("caseType", value)}
                          value={formData.caseType}
                        >
                          <SelectTrigger className="mt-2 h-12 border-2 border-gray-200 focus:border-primary">
                            <SelectValue placeholder="Select your case type" />
                          </SelectTrigger>
                          <SelectContent>
                            {caseTypes.map((caseType) => (
                              <SelectItem key={caseType.id} value={caseType.slug}>
                                {caseType.title}
                              </SelectItem>
                            ))}
                            <SelectItem value="other">Other / Not Sure</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Optional additional text area if needed */}
                      <div>
                        <Label htmlFor="additionalInfo" className="text-sm font-bold text-gray-700">
                          Additional Information
                        </Label>
                        <Textarea
                          id="additionalInfo"
                          name="additionalInfo"
                          placeholder="Share anything else that may help us evaluate your case"
                          value={formData.additionalInfo}
                          onChange={handleInputChange}
                          className="mt-2 border-2 border-gray-200 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Required Agreements (with TrustedForm consent tags) */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                    <h4 className="font-bold text-primary mb-4">Required Agreements</h4>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreeToQualification"
                        checked={formData.agreeToQualification}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("agreeToQualification", checked as boolean)
                        }
                        className="mt-1"
                        data-tf-element-role="consent-opt-in"
                      />
                      <label
                        htmlFor="agreeToQualification"
                        className="text-sm text-gray-800 cursor-pointer leading-relaxed"
                        data-tf-element-role="consent-language"
                      >
                        I may need help to find out if I may qualify for a settlement claim
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreeToTermsAndContact"
                        checked={formData.agreeToTermsAndContact}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("agreeToTermsAndContact", checked as boolean)
                        }
                        className="mt-1"
                        data-tf-element-role="consent-opt-in"
                      />
                      <label
                        htmlFor="agreeToTermsAndContact"
                        className="text-sm text-gray-800 cursor-pointer leading-relaxed"
                        data-tf-element-role="consent-language"
                      >
                        I agree to the Terms of Service and Privacy Policy and authorize lexclaimconnect.com and up to 4
                        law firms, 3rd party providers and/or PLM to contact me by telephone, email, artificial voice
                        and/or pre-recorded/text messages, using an automated telephone technology directs to the number
                        or contact details provided above. I may additionally receive offers and/or information on offers
                        and various services these providers offer, and I agree to such contact, even if my phone number
                        is currently listed on any state, federal or corporate 'Do Not Call' list or registry. You may
                        revoke this consent at any time. Message and data rates may apply. Your consent is NOT based on
                        any condition of purchase of products and acceptance of services by any provider. The decision to
                        engage with or contract for services with any provider is entirely up to your discretion.
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreeToDisclaimer"
                        checked={formData.agreeToDisclaimer}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("agreeToDisclaimer", checked as boolean)
                        }
                        className="mt-1"
                        data-tf-element-role="consent-opt-in"
                      />
                      <label
                        htmlFor="agreeToDisclaimer"
                        className="text-sm text-gray-800 cursor-pointer leading-relaxed"
                        data-tf-element-role="consent-language"
                      >
                        Lex Claim Connect ("www.lexclaimconnect.com") is not a law firm and not a lawyer referral
                        service; nor is it a substitute for hiring an attorney or law firm. Any information displayed or
                        provided on the Site is for personal use only. This Site offers no legal, business, or tax
                        advice, recommendations, mediation or counseling in connection with any legal matter, under any
                        circumstances, and nothing we do and no element of the Site or the Site's call connect
                        functionality ("Call Service") should be construed as such. Some of the attorneys, law firms and
                        legal service providers (collectively, "Third Party Legal Professionals") are accessible via the
                        Call Service by virtue of their payment of a fee to promote their respective services to users of
                        the Call Service and should be considered as advertising. This Site does not endorse or recommend
                        any participating Third-Party Legal Professionals. Your use of the Site or Call Service is not
                        intended to create, and any information submitted to the Site and/or any electronic or other
                        communication sent to the Site will not create a contract for representation or an
                        attorney-client relationship between you and these Site or any of the Third Party Legal
                        Professionals.
                      </label>
                    </div>
                  </div>

                  {/* Status Messages */}
                  <AnimatePresence>
                    {formStatus.message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-4 rounded-lg ${
                          formStatus.type === "success"
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                      >
                        <div className="flex items-start">
                          {formStatus.type === "success" ? (
                            <CheckCircle2 className="mr-3 mt-0.5 flex-shrink-0 w-5 h-5" />
                          ) : (
                            <AlertCircle className="mr-3 mt-0.5 flex-shrink-0 w-5 h-5" />
                          )}
                          <p className="font-medium">{formStatus.message}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button (with consent role tags for TF) */}
                  <div className="flex justify-center pt-6">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-accent to-yellow-400 text-primary font-black px-8 py-6 text-lg w-full sm:w-auto"
                      disabled={isSubmitting}
                      data-tf-element-role="submit"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2 w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                          />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <span data-tf-element-role="submit-text">Get My Free Evaluation</span>
                          <ArrowRight className="ml-3 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </div>
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

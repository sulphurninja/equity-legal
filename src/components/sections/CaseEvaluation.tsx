"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Clock,
  ArrowRight,
  LockIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { CaseEvaluationFormData, FormStatus } from "@/types/form";
import { getAllCaseTypes } from "@/lib/utils";

const CaseEvaluation = () => {
  const [formData, setFormData] = useState<CaseEvaluationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    caseType: "",
    exposurePeriod: "",
    medicalCondition: "",
    additionalInfo: "",
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "", message: "" });
  const [activeStep, setActiveStep] = useState(1);

  const caseTypes = getAllCaseTypes();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      return !!formData.firstName && !!formData.lastName && !!formData.email && !!formData.phone;
    }
    return true;
  };

  const goToNextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(activeStep + 1);
    } else {
      setFormStatus({
        type: "error",
        message: "Please fill in all required fields to continue."
      });
    }
  };

  const goToPreviousStep = () => {
    setFormStatus({ type: "", message: "" });
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      setFormStatus({
        type: "error",
        message: "You must agree to the terms and conditions to proceed."
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      const response = await axios.post("/api/contact", formData);

      setFormStatus({
        type: "success",
        message: "Your case evaluation request has been submitted successfully. A legal representative will contact you shortly."
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
        agreeToTerms: false
      });

      // Reset to first step for new submissions
      setActiveStep(1);
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "An error occurred. Please try again later or call our office directly."
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {[1, 2].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`rounded-full h-10 w-10 flex items-center justify-center font-medium border-2 ${step === activeStep
                  ? "bg-primary text-white border-primary"
                  : step < activeStep
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "bg-gray-100 text-gray-400 border-gray-200"
                }`}
            >
              {step}
            </div>
            {step < 2 && (
              <div
                className={`h-1 w-16 ${step < activeStep ? "bg-primary/30" : "bg-gray-200"
                  }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="case-evaluation" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-none shadow-xl overflow-hidden">
            <CardHeader className="bg-primary text-white text-center py-8 px-6">
              <Badge variant="outline" className="mb-2 mx-auto border-white/30 text-white">FREE CONSULTATION</Badge>
              <CardTitle className="text-3xl font-bold mb-2">Case Evaluation</CardTitle>
              <CardDescription className="text-gray-100 text-lg">
                Find out if you qualify for compensation in just a few minutes
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8">
              {renderStepIndicator()}

              <form onSubmit={handleSubmit}>
                {activeStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-primary mb-2">Contact Information</h3>
                      <p className="text-gray-500">Tell us how to reach you for your case evaluation</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium">
                          First Name*
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium">
                          Last Name*
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address*
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Phone Number*
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <LockIcon className="mr-2" size={14} />
                        <p>Your information is secure</p>
                      </div>

                      <Button
                        type="button"
                        onClick={goToNextStep}
                        className="bg-primary hover:bg-primary/90 text-white font-medium"
                      >
                        Continue
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {activeStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-primary mb-2">Case Details</h3>
                      <p className="text-gray-500">Help us understand your potential claim</p>
                    </div>

                    <div>
                      <Label htmlFor="caseType" className="text-sm font-medium">
                        Case Type*
                      </Label>
                      <Select
                        onValueChange={(value) => handleSelectChange("caseType", value)}
                        value={formData.caseType}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select your case type" />
                        </SelectTrigger>
                        <SelectContent>
                          {caseTypes.map((caseType) => (
                            <SelectItem key={caseType.id} value={caseType.slug}>
                              {caseType.title}
                            </SelectItem>
                          ))}
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="exposurePeriod" className="text-sm font-medium">
                        Exposure Period
                      </Label>
                      <Select
                        onValueChange={(value) => handleSelectChange("exposurePeriod", value)}
                        value={formData.exposurePeriod}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="When were you exposed/affected?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="before-1970">Before 1970</SelectItem>
                          <SelectItem value="1970-1980">1970-1980</SelectItem>
                          <SelectItem value="1980-1990">1980-1990</SelectItem>
                          <SelectItem value="1990-2000">1990-2000</SelectItem>
                          <SelectItem value="2000-2010">2000-2010</SelectItem>
                          <SelectItem value="2010-present">2010-Present</SelectItem>
                          <SelectItem value="not-sure">Not Sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="medicalCondition" className="text-sm font-medium">
                        Medical Condition (if applicable)
                      </Label>
                      <Input
                        id="medicalCondition"
                        name="medicalCondition"
                        placeholder="Diagnosed medical condition related to your claim"
                        value={formData.medicalCondition}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="additionalInfo" className="text-sm font-medium">
                        Additional Information
                      </Label>
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        placeholder="Please provide any additional details about your situation"
                        rows={3}
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div className="flex items-start space-x-3 pt-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="agreeToTerms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions and consent to be contacted about my legal claim.
                        </label>
                        <p className="text-xs text-muted-foreground">
                          By checking this box, you authorize Lex Claim Connect to contact you via phone, email, or text regarding your legal inquiry.
                        </p>
                      </div>
                    </div>

                    {formStatus.message && (
                      <div className={`p-4 rounded-md ${formStatus.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                        <div className="flex items-start">
                          {formStatus.type === "success" ?
                            <CheckCircle2 className="mr-3 mt-0.5 flex-shrink-0" size={18} /> :
                            <AlertCircle className="mr-3 mt-0.5 flex-shrink-0" size={18} />
                          }
                          <p>{formStatus.message}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={goToPreviousStep}
                        className="border-gray-300 text-gray-700"
                      >
                        Back
                      </Button>

                      <Button
                        type="submit"
                        className="bg-accent hover:bg-accent/90 text-primary font-medium"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Case Evaluation"}
                        {!isSubmitting && <ArrowRight className="ml-2" size={16} />}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            </CardContent>

            <CardFooter className="bg-gray-50 p-6 border-t border-gray-100 flex flex-col gap-3">
              <div className="flex items-center justify-center text-sm text-gray-500">
                <ShieldCheck className="mr-2" size={16} />
                <p>Your information is secure and confidential</p>
              </div>
              <div className="flex items-center justify-center text-sm text-gray-500">
                <Clock className="mr-2" size={16} />
                <p>Most claim evaluations take less than 5 minutes to complete</p>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseEvaluation;

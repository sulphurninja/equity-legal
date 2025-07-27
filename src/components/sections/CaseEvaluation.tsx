"use client";

import { useState } from "react";
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
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Clock,
  ArrowRight,
  LockIcon,
  Star,
  Phone,
  Mail,
  User,
  FileText,
  Calendar,
  Activity,
  Gift,
  Zap,
  Award,
  TrendingUp,
  DollarSign,
  Scale
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
import Link from "next/link";

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
      <div className="flex items-center justify-center mb-6 sm:mb-8">
        <div className="flex items-center space-x-2 sm:space-x-4">
          {[1, 2].map((step) => (
            <div key={step} className="flex items-center">
              <motion.div
                className={`relative rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center font-bold text-base sm:text-lg transition-all duration-300 ${
                  step === activeStep
                    ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg scale-110"
                    : step < activeStep
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                }`}
                whileHover={{ scale: step <= activeStep ? 1.05 : 1 }}
                animate={step === activeStep ? { 
                  boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0.4)", "0 0 0 10px rgba(59, 130, 246, 0)", "0 0 0 0 rgba(59, 130, 246, 0)"] 
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {step < activeStep ? (
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  step
                )}
                
                {step === activeStep && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-blue-600"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ opacity: 0.1 }}
                  />
                )}
              </motion.div>
              
              {step < 2 && (
                <motion.div
                  className={`h-1 w-12 sm:w-20 mx-2 sm:mx-4 rounded-full transition-all duration-500 ${
                    step < activeStep 
                      ? "bg-gradient-to-r from-green-500 to-emerald-600" 
                      : "bg-gray-200"
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: step < activeStep ? 1 : 0.3 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="case-evaluation" className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-accent/20 to-yellow-400/20 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header - Mobile Optimized */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Badge variant="outline" className="mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-primary border-primary/30 bg-primary/5 font-bold backdrop-blur-sm">
            <Gift className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            100% FREE EVALUATION
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-primary mb-4 sm:mb-6 leading-tight px-2">
            <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Get Your Free
            </span>
            <br />
            <span className="text-gray-800">Case Evaluation</span>
          </h2>

          <motion.div
            className="w-16 sm:w-24 h-1 bg-gradient-to-r from-accent to-yellow-400 mx-auto mb-4 sm:mb-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            Find out if you qualify for compensation in just
            <span className="font-bold text-primary"> 2 simple steps.</span>
            <br />
            <span className="text-base sm:text-lg opacity-90">No fees unless we win your case.</span>
          </p>

          {/* Trust Indicators - Mobile Responsive */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 mt-6 sm:mt-8">
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mr-2" />
              <span className="font-medium text-sm sm:text-base">2 Minutes</span>
            </div>
            <div className="flex items-center text-gray-600">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
              <span className="font-medium text-sm sm:text-base">100% Secure</span>
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mr-2" />
              <span className="font-medium text-sm sm:text-base">No Upfront Fees</span>
            </div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-none shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm mx-2 sm:mx-0">
              {/* Enhanced Header - Mobile Optimized */}
              <CardHeader className="bg-gradient-to-br from-primary via-blue-600 to-indigo-700 text-white text-center py-8 sm:py-12 px-4 sm:px-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12" />
                </div>

                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center bg-accent/20 rounded-full px-3 sm:px-6 py-1.5 sm:py-2 mb-3 sm:mb-4"
                  >
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-accent mr-2" />
                    <span className="font-bold text-accent text-sm sm:text-base">INSTANT EVALUATION</span>
                  </motion.div>

                  <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 leading-tight">
                    Could You Be Entitled to Compensation?
                  </CardTitle>
                  <CardDescription className="text-gray-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-2">
                    Our expert legal team will review your case for free and contact you within 24 hours with your evaluation results.
                  </CardDescription>

                  {/* Value Propositions - Mobile Responsive */}
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-6">

                    <div className="text-center">
                      <div className="font-black text-xl sm:text-2xl text-accent">98%</div>
                      <div className="text-xs sm:text-sm opacity-90">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="font-black text-xl sm:text-2xl text-accent">24/7</div>
                      <div className="text-xs sm:text-sm opacity-90">Available</div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-8">
                {renderStepIndicator()}

                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {activeStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 sm:space-y-6"
                      >
                        <div className="text-center mb-6 sm:mb-8">
                          <div className="inline-flex items-center bg-blue-50 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-3 sm:mb-4">
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2" />
                            <h3 className="text-lg sm:text-xl font-bold text-primary">Your Contact Information</h3>
                          </div>
                          <p className="text-gray-600 text-sm sm:text-base px-2">We'll use this to send you your evaluation results</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Label htmlFor="firstName" className="text-sm font-bold text-gray-700 flex items-center">
                              <User className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
                              First Name*
                            </Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              placeholder="Enter your first name"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="mt-2 h-10 sm:h-12 border-2 border-gray-200 focus:border-primary transition-all duration-300 text-base"
                              required
                            />
                          </motion.div>
                          
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Label htmlFor="lastName" className="text-sm font-bold text-gray-700 flex items-center">
                              <User className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
                              Last Name*
                            </Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              placeholder="Enter your last name"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className="mt-2 h-10 sm:h-12 border-2 border-gray-200 focus:border-primary transition-all duration-300 text-base"
                              required
                            />
                          </motion.div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Label htmlFor="email" className="text-sm font-bold text-gray-700 flex items-center">
                              <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
                              Email Address*
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Enter your email address"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="mt-2 h-10 sm:h-12 border-2 border-gray-200 focus:border-primary transition-all duration-300 text-base"
                              required
                            />
                          </motion.div>
                          
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Label htmlFor="phone" className="text-sm font-bold text-gray-700 flex items-center">
                              <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
                              Phone Number*
                            </Label>
                            <Input
                              id="phone"
                              name="phone"
                              placeholder="Enter your phone number"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="mt-2 h-10 sm:h-12 border-2 border-gray-200 focus:border-primary transition-all duration-300 text-base"
                              required
                            />
                          </motion.div>
                        </div>

                        {/* Security Notice - Mobile Optimized */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 flex items-start sm:items-center">
                          <LockIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                          <div>
                            <p className="text-sm font-medium text-green-800">Your information is 100% secure</p>
                            <p className="text-xs text-green-600">We use bank-level encryption to protect your data</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 sm:pt-6 space-y-4 sm:space-y-0">
                          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-500">
                           
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-500" />
                              <span>4.9/5 rating</span>
                            </div>
                          </div>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full sm:w-auto"
                          >
                            <Button
                              type="button"
                              onClick={goToNextStep}
                              className="w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-bold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              Continue to Step 2
                              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {activeStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 sm:space-y-6"
                      >
                        <div className="text-center mb-6 sm:mb-8">
                          <div className="inline-flex items-center bg-purple-50 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-3 sm:mb-4">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2" />
                            <h3 className="text-lg sm:text-xl font-bold text-primary">Case Details</h3>
                          </div>
                          <p className="text-gray-600 text-sm sm:text-base px-2">Help us understand your potential claim</p>
                        </div>

                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label htmlFor="caseType" className="text-sm font-bold text-gray-700 flex items-center">
                            <Scale className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
                            Case Type*
                          </Label>
                          <Select
                            onValueChange={(value) => handleSelectChange("caseType", value)}
                            value={formData.caseType}
                          >
                            <SelectTrigger className="mt-2 h-10 sm:h-12 border-2 border-gray-200 focus:border-primary transition-all duration-300 text-base">
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
                        </motion.div>

                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label htmlFor="exposurePeriod" className="text-sm font-bold text-gray-700 flex items-center">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
                            When Were You Affected?
                          </Label>
                          <Select
                            onValueChange={(value) => handleSelectChange("exposurePeriod", value)}
                            value={formData.exposurePeriod}
                          >
                            <SelectTrigger className="mt-2 h-10 sm:h-12 border-2 border-gray-200 focus:border-primary transition-all duration-300 text-base">
                              <SelectValue placeholder="Select time period" />
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
                        </motion.div>

                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label htmlFor="medicalCondition" className="text-sm font-bold text-gray-700 flex items-center">
                            <Activity className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
                            Medical Condition (if applicable)
                          </Label>
                          <Input
                            id="medicalCondition"
                            name="medicalCondition"
                            placeholder="Any diagnosed medical condition related to your claim"
                            value={formData.medicalCondition}
                            onChange={handleInputChange}
                            className="mt-2 h-10 sm:h-12 border-2 border-gray-200 focus:border-primary transition-all duration-300 text-base"
                          />
                        </motion.div>

                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Label htmlFor="additionalInfo" className="text-sm font-bold text-gray-700 flex items-center">
                            <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
                            Additional Information
                          </Label>
                          <Textarea
                            id="additionalInfo"
                            name="additionalInfo"
                            placeholder="Tell us more about your situation..."
                            rows={3}
                            value={formData.additionalInfo}
                            onChange={handleInputChange}
                            className="mt-2 border-2 border-gray-200 focus:border-primary transition-all duration-300 resize-none text-base"
                          />
                        </motion.div>

                        {/* Terms Agreement - Mobile Optimized */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                          <div className="flex items-start space-x-3 sm:space-x-4">
                            <Checkbox
                              id="agreeToTerms"
                              checked={formData.agreeToTerms}
                              onCheckedChange={handleCheckboxChange}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <label
                                htmlFor="agreeToTerms"
                                className="text-sm font-medium text-gray-800 cursor-pointer leading-relaxed"
                              >
                                I agree to receive my free case evaluation and consent to be contacted about my legal claim via phone, email, or text.
                              </label>
                              <p className="text-xs text-gray-600 mt-2">
                                By checking this box, you authorize Lex Claim Connect to contact you regarding your legal inquiry. Standard message and data rates may apply.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Status Messages */}
                        <AnimatePresence>
                          {formStatus.message && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className={`p-3 sm:p-4 rounded-lg ${
                                formStatus.type === "success" 
                                  ? "bg-green-50 text-green-800 border border-green-200" 
                                  : "bg-red-50 text-red-800 border border-red-200"
                              }`}
                            >
                              <div className="flex items-start">
                                {formStatus.type === "success" ? (
                                <CheckCircle2 className="mr-2 sm:mr-3 mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                                ) : (
                                  <AlertCircle className="mr-2 sm:mr-3 mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                                )}
                                <p className="font-medium text-sm sm:text-base">{formStatus.message}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 sm:pt-6 space-y-4 sm:space-y-0">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={goToPreviousStep}
                            className="order-2 sm:order-1 w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-4 sm:px-6 py-3 font-medium"
                          >
                            <ArrowRight className="mr-2 w-4 h-4 rotate-180" />
                            Back
                          </Button>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="order-1 sm:order-2 w-full sm:w-auto"
                          >
                            <Button
                              type="submit"
                              className="w-full sm:w-auto bg-gradient-to-r from-accent to-yellow-400 hover:from-accent/90 hover:to-yellow-400/90 text-primary font-black px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="mr-2 w-4 h-4 sm:w-5 sm:h-5 border-2 border-primary border-t-transparent rounded-full"
                                  />
                                  Submitting...
                                </>
                              ) : (
                                <>
                                  <Award className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5" />
                                  <span className="hidden sm:inline">Get My Free Evaluation</span>
                                  <span className="sm:hidden">Get Evaluation</span>
                                  <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="ml-2 sm:ml-3"
                                  >
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                  </motion.div>
                                </>
                              )}
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </CardContent>

              {/* Enhanced Footer - Mobile Optimized */}
              <CardFooter className="bg-gradient-to-r from-gray-50 to-blue-50/50 p-4 sm:p-8 border-t border-gray-100">
                <div className="w-full space-y-4 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-8">
                    <div className="flex items-center text-sm text-gray-600">
                      <ShieldCheck className="mr-2 w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                      <span className="font-medium">SSL Encrypted & Secure</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="mr-2 w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                      <span className="font-medium">Response Within 24 Hours</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="mr-2 w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                      <span className="font-medium">98% Success Rate</span>
                    </div>
                  </div>

                  {/* Call Alternative - Mobile Optimized */}
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-3">
                      Prefer to speak with someone right now?
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto inline-block"
                    >
                      <Button asChild variant="outline" className="w-full sm:w-auto bg-white hover:bg-gray-50 border-2 border-primary/20 text-primary font-bold px-4 sm:px-6 py-3 text-sm sm:text-base">
                        <a href="tel:9085336944" className="flex items-center justify-center">
                          <Phone className="mr-2 w-4 h-4" />
                          <span className="hidden sm:inline">Call (908) 533-6944 - Free Consultation</span>
                          <span className="sm:hidden">Call (908) 533-6944</span>
                        </a>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Trust Badges - Mobile Responsive */}
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2 font-medium">4.9/5 Client Rating</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 text-gold-500 mr-2" />
                      <span className="font-medium">Award-Winning Firm</span>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Additional Trust Section - Mobile Optimized */}
          <motion.div
            className="mt-8 sm:mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-8 shadow-lg border border-white/20 mx-2 sm:mx-0">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">Why Choose Lex Claim Connect?</h3>
              
              <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 sm:gap-6">
             
                <motion.div
                  className="text-center group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 group-hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-base sm:text-lg text-primary mb-2">No Win, No Fee</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">You pay nothing unless we successfully win your case. Zero upfront costs.</p>
                  </div>
                </motion.div>

                <motion.div
                  className="text-center group sm:col-span-2 lg:col-span-1"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 sm:p-6 group-hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-base sm:text-lg text-primary mb-2">24/7 Support</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Our dedicated legal team is available around the clock to support your case.</p>
                  </div>
                </motion.div>
              </div>

              {/* Urgency Message - Mobile Optimized */}
              <motion.div
                className="mt-6 sm:mt-8 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4 sm:p-6"
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center mb-3">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mr-0 sm:mr-2 mb-2 sm:mb-0" />
                  <h4 className="font-bold text-base sm:text-lg text-red-700 text-center sm:text-left">Important: Time Limits Apply</h4>
                </div>
                <p className="text-red-600 text-center text-sm sm:text-base leading-relaxed">
                  Many legal claims have strict deadlines. Don't wait - get your free evaluation today to protect your rights and maximize your compensation.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Mobile-Specific Quick Action Bar */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50 sm:hidden"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <div className="flex space-x-3">
              <Button asChild className="flex-1 bg-gradient-to-r from-accent to-yellow-400 text-primary font-bold">
                <Link href="#case-evaluation" onClick={() => document.getElementById('case-evaluation')?.scrollIntoView({ behavior: 'smooth' })}>
                  <FileText className="w-4 h-4 mr-2" />
                  Start Evaluation
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 border-2 border-primary text-primary">
                <a href="tel:9085336944">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseEvaluation;
// "use client";

// import AdditionalDetailsStep from "@/components/manager/onboarding/additional-details-step";
// import BackgroundCheckStep from "@/components/manager/onboarding/background-check-step";
// import BankingStep from "@/components/manager/onboarding/banking-step";
// import CertificationsStep from "@/components/manager/onboarding/certifications-step";
// import ConfirmationStep from "@/components/manager/onboarding/confirmation-step";
// import ExperienceStep from "@/components/manager/onboarding/experience-step";
// import IdentityVerificationStep from "@/components/manager/onboarding/identity-verification-step";
// import PersonalInfoStep from "@/components/manager/onboarding/personal-info-step";
// import PortfolioStep from "@/components/manager/onboarding/portfolio-step";
// import PreviewStep from "@/components/manager/onboarding/preview-step";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@radix-ui/react-progress";
// import { ArrowLeft, ArrowRight, CheckCircle, Save } from "lucide-react";
// import { useState, useEffect } from "react";
// import { toast, Toaster } from "sonner";

// export interface FormData {
// 	// Step 1: Personal Info
// 	fullName: string;
// 	phoneNumber: string;
// 	email: string;
// 	address: string;
// 	profilePicture: File | null;

// 	// Step 2: Identity Verification
// 	idDocument: File | null;
// 	idType: string;
// 	idNumber: string;

// 	// Step 3: Certifications
// 	certificates: File[];
// 	certificationType: string;
// 	licenseNumber: string;
// 	issuingAuthority: string;
// 	expiryDate: string;

// 	// Step 4: Experience
// 	yearsExperience: string;
// 	pastRoles: string;
// 	references: Array<{
// 		name: string;
// 		phone: string;
// 		relationship: string;
// 	}>;

// 	// Step 5: Banking
// 	bankName: string;
// 	accountHolderName: string;
// 	accountNumber: string;
// 	mobileMoney: string;
// 	payoutPreference: "" | "bank-transfer" | "mobile-money" | "both";

// 	// Step 6: Portfolio
// 	portfolioItems: Array<{
// 		file: File;
// 		caption: string;
// 		type: "image" | "video";
// 	}>;

// 	// Step 7: Background Check
// 	backgroundCheckConsent: boolean;
// 	policeDocument: File | null;

// 	// Step 8: Additional Details
// 	languages: string[];
// 	workRadius: string;
// 	availability: string;
// 	toolsEquipment: string;

// 	// Step 9: Preview (no additional fields)
// }

// const STEPS = [
// 	"Personal Info",
// 	"Identity Verification",
// 	"Certifications",
// 	"Experience",
// 	"Banking Info",
// 	"Portfolio",
// 	"Background Check",
// 	"Additional Details",
// 	"Preview & Submit",
// ];

// export default function onboardingPage() {
// 	const [currentStep, setCurrentStep] = useState(0);
// 	const [isSubmitted, setIsSubmitted] = useState(false);
// 	const [formData, setFormData] = useState<FormData>({
// 		fullName: "",
// 		phoneNumber: "",
// 		email: "",
// 		address: "",
// 		profilePicture: null,
// 		idDocument: null,
// 		idType: "",
// 		idNumber: "",
// 		certificates: [],
// 		certificationType: "",
// 		licenseNumber: "",
// 		issuingAuthority: "",
// 		expiryDate: "",
// 		yearsExperience: "",
// 		pastRoles: "",
// 		references: [{ name: "", phone: "", relationship: "" }],
// 		bankName: "",
// 		accountHolderName: "",
// 		accountNumber: "",
// 		mobileMoney: "",
// 		payoutPreference: "",
// 		portfolioItems: [],
// 		backgroundCheckConsent: false,
// 		policeDocument: null,
// 		languages: [],
// 		workRadius: "",
// 		availability: "",
// 		toolsEquipment: "",
// 	});

// 	// Auto-save functionality
// 	useEffect(() => {
// 		const saveData = () => {
// 			localStorage.setItem(
// 				"onboarding-form-data",
// 				JSON.stringify({
// 					...formData,
// 					currentStep,
// 				})
// 			);
// 		};

// 		const timer = setTimeout(saveData, 1000);
// 		return () => clearTimeout(timer);
// 	}, [formData, currentStep]);

// 	// Load saved data on mount
// 	useEffect(() => {
// 		const savedData = localStorage.getItem("onboarding-form-data");
// 		if (savedData) {
// 			try {
// 				const parsed = JSON.parse(savedData);
// 				setFormData(parsed);
// 				setCurrentStep(parsed.currentStep || 0);
// 				toast.success(
// 					"Progress Restored\nYour previous progress has been restored."
// 				);
// 			} catch (error) {
// 				console.error("Error loading saved data:", error);
// 			}
// 		}
// 	}, [toast]);

// 	const updateFormData = (stepData: Partial<FormData>) => {
// 		setFormData((prev) => ({ ...prev, ...stepData }));
// 	};

// 	const nextStep = () => {
// 		if (currentStep < STEPS.length - 1) {
// 			setCurrentStep((prev) => prev + 1);
// 		}
// 	};

// 	const prevStep = () => {
// 		if (currentStep > 0) {
// 			setCurrentStep((prev) => prev - 1);
// 		}
// 	};

// 	const handleSubmit = async () => {
// 		try {
// 			// Simulate API call
// 			await new Promise((resolve) => setTimeout(resolve, 2000));

// 			setIsSubmitted(true);
// 			localStorage.removeItem("onboarding-form-data");

// 			// toast({
// 			// 	title: "Application Submitted!",
// 			// 	description: "Your application is now under review.",
// 			// });
// 		} catch (error) {
// 			// toast({
// 			// 	title: "Submission Failed",
// 			// 	description: "Please try again later.",
// 			// 	variant: "destructive",
// 			// });
// 		}
// 	};

// 	const saveProgress = () => {
// 		// toast({
// 		// 	title: "Progress Saved",
// 		// 	description: "Your progress has been saved successfully.",
// 		// });
// 	};

// 	const renderStep = () => {
// 		if (isSubmitted) {
// 			return <ConfirmationStep />;
// 		}

// 		switch (currentStep) {
// 			case 0:
// 				return <PersonalInfoStep data={formData} updateData={updateFormData} />;
// 			case 1:
// 				return (
// 					<IdentityVerificationStep
// 						data={formData}
// 						updateData={updateFormData}
// 					/>
// 				);
// 			case 2:
// 				return (
// 					<CertificationsStep data={formData} updateData={updateFormData} />
// 				);
// 			case 3:
// 				return <ExperienceStep data={formData} updateData={updateFormData} />;
// 			case 4:
// 				return <BankingStep data={formData} updateData={updateFormData} />;
// 			case 5:
// 				return <PortfolioStep data={formData} updateData={updateFormData} />;
// 			case 6:
// 				return (
// 					<BackgroundCheckStep data={formData} updateData={updateFormData} />
// 				);
// 			case 7:
// 				return (
// 					<AdditionalDetailsStep data={formData} updateData={updateFormData} />
// 				);
// 			case 8:
// 				return <PreviewStep data={formData} onEdit={setCurrentStep} />;
// 			default:
// 				return null;
// 		}
// 	};

// 	if (isSubmitted) {
// 		return (
// 			<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
// 				<div className="container mx-auto px-4 py-8">
// 					<ConfirmationStep />
// 				</div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
// 			<div className="container mx-auto px-4 py-8 max-w-4xl">
// 				{/* Header */}
// 				<div className="text-center mb-8">
// 					<h1 className="text-3xl font-bold text-gray-900 mb-2">
// 						Service Provider Registration
// 					</h1>
// 					<p className="text-gray-600">
// 						Complete your profile to start receiving service requests
// 					</p>
// 				</div>

// 				{/* Progress Bar */}
// 				<Card className="mb-8 border-0 shadow-sm">
// 					<CardContent className="p-6">
// 						<div className="flex items-center justify-between mb-4">
// 							<span className="text-sm font-medium text-gray-700">
// 								Step {currentStep + 1} of {STEPS.length}
// 							</span>
// 							<span className="text-sm text-gray-500">
// 								{STEPS[currentStep]}
// 							</span>
// 						</div>
// 						<Progress
// 							value={((currentStep + 1) / STEPS.length) * 100}
// 							className="h-2"
// 						/>
// 						<div className="flex justify-between mt-2">
// 							{STEPS.map((step, index) => (
// 								<div
// 									key={step}
// 									className={`text-xs ${
// 										index <= currentStep ? "text-blue-600" : "text-gray-400"
// 									}`}
// 								>
// 									{index < currentStep ? (
// 										<CheckCircle className="w-4 h-4 inline" />
// 									) : (
// 										<span className="hidden sm:inline">{step}</span>
// 									)}
// 								</div>
// 							))}
// 						</div>
// 					</CardContent>
// 				</Card>

// 				{/* Form Content */}
// 				<Card className="border-0 shadow-lg">
// 					<CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
// 						<CardTitle className="text-xl">{STEPS[currentStep]}</CardTitle>
// 					</CardHeader>
// 					<CardContent className="p-8">{renderStep()}</CardContent>
// 				</Card>

// 				{/* Navigation */}
// 				<div className="flex justify-between items-center mt-8">
// 					<Button
// 						variant="outline"
// 						onClick={prevStep}
// 						disabled={currentStep === 0}
// 						className="flex items-center gap-2"
// 					>
// 						<ArrowLeft className="w-4 h-4" />
// 						Previous
// 					</Button>

// 					<Button
// 						variant="ghost"
// 						onClick={saveProgress}
// 						className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
// 					>
// 						<Save className="w-4 h-4" />
// 						Save Progress
// 					</Button>

// 					{currentStep === STEPS.length - 1 ? (
// 						<Button
// 							onClick={handleSubmit}
// 							className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
// 						>
// 							Submit Application
// 							<CheckCircle className="w-4 h-4" />
// 						</Button>
// 					) : (
// 						<Button
// 							onClick={nextStep}
// 							className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
// 						>
// 							Next
// 							<ArrowRight className="w-4 h-4" />
// 						</Button>
// 					)}
// 				</div>
// 			</div>
// 			<Toaster />
// 		</div>
// 	);
// }

import React from "react";

export default function page() {
	return <div></div>;
}

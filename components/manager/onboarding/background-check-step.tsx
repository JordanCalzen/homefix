"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, FileText, X, Shield, AlertCircle } from "lucide-react";
// Define FormData type locally if not available elsewhere
export interface FormData {
	backgroundCheckConsent: boolean;
	policeDocument: File | null;
	// Add other fields as needed
}

interface BackgroundCheckStepProps {
	data: FormData;
	updateData: (data: Partial<FormData>) => void;
}

export default function BackgroundCheckStep({
	data,
	updateData,
}: BackgroundCheckStepProps) {
	const [fileName, setFileName] = useState<string | null>(null);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			updateData({ policeDocument: file });
			setFileName(file.name);
		}
	};

	const removeFile = () => {
		updateData({ policeDocument: null });
		setFileName(null);
	};

	return (
		<div className="space-y-6">
			<div className="text-center mb-6">
				<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<Shield className="w-8 h-8 text-blue-600" />
				</div>
				<h2 className="text-2xl font-semibold text-gray-900 mb-2">
					Background Check Consent
				</h2>
				<p className="text-gray-600">
					Help us maintain a safe platform for all users
				</p>
			</div>

			{/* Consent Checkbox */}
			<Card className="border-blue-200 bg-blue-50/30">
				<CardContent className="p-6">
					<div className="flex items-start gap-4">
						<Checkbox
							id="background-consent"
							checked={data.backgroundCheckConsent}
							onCheckedChange={(checked) =>
								updateData({ backgroundCheckConsent: checked as boolean })
							}
							className="mt-1"
						/>
						<div className="flex-1">
							<Label
								htmlFor="background-consent"
								className="text-sm font-medium text-gray-900 cursor-pointer"
							>
								I consent to a background check for verification purposes *
							</Label>
							<p className="text-sm text-gray-600 mt-2">
								By checking this box, you authorize us to conduct a background
								check to verify your identity and ensure the safety of our
								platform users. This may include criminal history, identity
								verification, and reference checks.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Optional Document Upload */}
			<div className="space-y-4">
				<div>
					<Label className="text-sm font-medium text-gray-700">
						Police Clearance or Reference Letter (Optional)
					</Label>
					<p className="text-xs text-gray-500 mt-1">
						Upload if you have a recent police clearance certificate or
						character reference letter
					</p>
				</div>

				{fileName ? (
					<div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
						<FileText className="w-8 h-8 text-blue-600" />
						<div className="flex-1">
							<p className="font-medium text-gray-900 truncate">{fileName}</p>
							<p className="text-sm text-gray-500">
								Document uploaded successfully
							</p>
						</div>
						<Button
							size="sm"
							variant="ghost"
							onClick={removeFile}
							className="text-red-600 hover:text-red-700 hover:bg-red-50"
						>
							<X className="w-4 h-4" />
						</Button>
					</div>
				) : (
					<Card className="border-dashed border-2 border-gray-200 bg-gray-50/50">
						<CardContent className="p-6">
							<div className="text-center">
								<div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
									<Upload className="w-5 h-5 text-gray-600" />
								</div>
								<Label htmlFor="police-document" className="cursor-pointer">
									<div className="text-gray-600 hover:text-gray-700">
										<span className="font-medium">Upload Document</span>
										<p className="text-sm text-gray-500 mt-1">
											PDF, PNG, or JPEG (max 10MB)
										</p>
									</div>
								</Label>
								<Input
									id="police-document"
									type="file"
									accept=".pdf,.png,.jpg,.jpeg"
									className="hidden"
									onChange={handleFileUpload}
								/>
							</div>
						</CardContent>
					</Card>
				)}
			</div>

			{/* Background Check Process Info */}
			<div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
				<h4 className="font-medium text-gray-900 mb-3">
					Background Check Process:
				</h4>
				<div className="space-y-3 text-sm text-gray-600">
					<div className="flex items-start gap-3">
						<div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
							1
						</div>
						<p>
							We'll verify your identity using the information you've provided
						</p>
					</div>
					<div className="flex items-start gap-3">
						<div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
							2
						</div>
						<p>
							A third-party service will conduct a criminal background check
						</p>
					</div>
					<div className="flex items-start gap-3">
						<div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
							3
						</div>
						<p>We'll contact your references to verify your work history</p>
					</div>
					<div className="flex items-start gap-3">
						<div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
							4
						</div>
						<p>Results are typically available within 3-5 business days</p>
					</div>
				</div>
			</div>

			{/* Important Notice */}
			<div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
				<div className="flex items-start gap-3">
					<AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
					<div>
						<h4 className="font-medium text-amber-900 mb-1">
							Important Notice
						</h4>
						<p className="text-sm text-amber-700">
							A background check is required for all service providers. Minor
							infractions may not disqualify you, but serious criminal history
							may affect your application. We evaluate each case individually
							and consider factors such as the nature of the offense, time
							elapsed, and evidence of rehabilitation.
						</p>
					</div>
				</div>
			</div>

			{/* Privacy Notice */}
			<div className="bg-green-50 border border-green-200 rounded-lg p-4">
				<div className="flex items-start gap-3">
					<Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
					<div>
						<h4 className="font-medium text-green-900 mb-1">
							Your Privacy is Protected
						</h4>
						<p className="text-sm text-green-700">
							All background check information is handled confidentially and in
							compliance with applicable laws. Your data is encrypted and only
							accessible to authorized personnel for verification purposes.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

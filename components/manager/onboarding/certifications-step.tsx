"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, X, Award, Plus } from "lucide-react";
// Define FormData type locally if not available elsewhere
type FormData = {
	certificationType: string;
	licenseNumber: string;
	issuingAuthority: string;
	expiryDate: string;
	certificates: File[];
};

interface CertificationsStepProps {
	data: FormData;
	updateData: (data: Partial<FormData>) => void;
}

export default function CertificationsStep({
	data,
	updateData,
}: CertificationsStepProps) {
	const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);
		if (files.length > 0) {
			const newCertificates = [...data.certificates, ...files];
			updateData({ certificates: newCertificates });

			const newFileNames = files.map((file) => file.name);
			setUploadedFiles((prev) => [...prev, ...newFileNames]);
		}
	};

	const removeFile = (index: number) => {
		const newCertificates = data.certificates.filter((_, i) => i !== index);
		updateData({ certificates: newCertificates });

		const newFileNames = uploadedFiles.filter((_, i) => i !== index);
		setUploadedFiles(newFileNames);
	};

	return (
		<div className="space-y-6">
			<div className="text-center mb-6">
				<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<Award className="w-8 h-8 text-blue-600" />
				</div>
				<h2 className="text-2xl font-semibold text-gray-900 mb-2">
					Trade Certifications & Licenses
				</h2>
				<p className="text-gray-600">
					Upload your professional certifications to showcase your expertise
				</p>
			</div>

			{/* Certification Type */}
			<div className="space-y-2">
				<Label
					htmlFor="certificationType"
					className="text-sm font-medium text-gray-700"
				>
					Primary Certification Type *
				</Label>
				<Select
					value={data.certificationType}
					onValueChange={(value) => updateData({ certificationType: value })}
				>
					<SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
						<SelectValue placeholder="Select your primary trade" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="plumbing">Plumbing</SelectItem>
						<SelectItem value="electrical">Electrical</SelectItem>
						<SelectItem value="hvac">HVAC</SelectItem>
						<SelectItem value="carpentry">Carpentry</SelectItem>
						<SelectItem value="painting">Painting</SelectItem>
						<SelectItem value="cleaning">Cleaning Services</SelectItem>
						<SelectItem value="landscaping">Landscaping</SelectItem>
						<SelectItem value="appliance-repair">Appliance Repair</SelectItem>
						<SelectItem value="other">Other</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* License Information */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-2">
					<Label
						htmlFor="licenseNumber"
						className="text-sm font-medium text-gray-700"
					>
						License Number
					</Label>
					<Input
						id="licenseNumber"
						placeholder="Enter license number (if applicable)"
						value={data.licenseNumber}
						onChange={(e) => updateData({ licenseNumber: e.target.value })}
						className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>

				<div className="space-y-2">
					<Label
						htmlFor="issuingAuthority"
						className="text-sm font-medium text-gray-700"
					>
						Issuing Authority
					</Label>
					<Input
						id="issuingAuthority"
						placeholder="e.g., State Board, City Council"
						value={data.issuingAuthority}
						onChange={(e) => updateData({ issuingAuthority: e.target.value })}
						className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>

				<div className="space-y-2 md:col-span-2">
					<Label
						htmlFor="expiryDate"
						className="text-sm font-medium text-gray-700"
					>
						Expiry Date
					</Label>
					<Input
						id="expiryDate"
						type="date"
						value={data.expiryDate}
						onChange={(e) => updateData({ expiryDate: e.target.value })}
						className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>
			</div>

			{/* Certificate Upload */}
			<div className="space-y-4">
				<Label className="text-sm font-medium text-gray-700">
					Upload Certificates *
				</Label>

				{/* Uploaded Files Display */}
				{uploadedFiles.length > 0 && (
					<div className="space-y-2">
						{uploadedFiles.map((fileName, index) => (
							<div
								key={index}
								className="flex items-center gap-3 p-3 bg-white rounded-lg border"
							>
								<FileText className="w-5 h-5 text-blue-600" />
								<span className="flex-1 text-sm font-medium text-gray-900 truncate">
									{fileName}
								</span>
								<Button
									size="sm"
									variant="ghost"
									onClick={() => removeFile(index)}
									className="text-red-600 hover:text-red-700 hover:bg-red-50"
								>
									<X className="w-4 h-4" />
								</Button>
							</div>
						))}
					</div>
				)}

				{/* Upload Area */}
				<Card className="border-dashed border-2 border-blue-200 bg-blue-50/50">
					<CardContent className="p-6">
						<div className="text-center">
							<div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
								<Plus className="w-5 h-5 text-blue-600" />
							</div>
							<Label htmlFor="certificates" className="cursor-pointer">
								<div className="text-blue-600 hover:text-blue-700">
									<span className="font-medium">Add More Certificates</span>
									<p className="text-sm text-gray-500 mt-1">
										PDF or PNG files (max 10MB each)
									</p>
								</div>
							</Label>
							<Input
								id="certificates"
								type="file"
								accept=".pdf,.png,.jpg,.jpeg"
								multiple
								className="hidden"
								onChange={handleFileUpload}
							/>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Info Box */}
			<div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
				<div className="flex items-start gap-3">
					<Award className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
					<div>
						<h4 className="font-medium text-amber-900 mb-1">
							Certification Tips
						</h4>
						<ul className="text-sm text-amber-700 space-y-1">
							<li>
								• Upload clear, readable copies of all relevant certifications
							</li>
							<li>
								• Include both front and back if information is on both sides
							</li>
							<li>
								• Expired certificates may still be valuable to show experience
							</li>
							<li>• You can add more certificates later from your dashboard</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

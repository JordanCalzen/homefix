"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Briefcase } from "lucide-react";
import type { FormData } from "@/types";

interface ExperienceStepProps {
	data: FormData;
	updateData: (data: Partial<FormData>) => void;
}

export default function ExperienceStep({
	data,
	updateData,
}: ExperienceStepProps) {
	const addReference = () => {
		const newReferences = [
			...data.references,
			{ name: "", phone: "", relationship: "" },
		];
		updateData({ references: newReferences });
	};

	const removeReference = (index: number) => {
		const newReferences = data.references.filter((_, i) => i !== index);
		updateData({ references: newReferences });
	};

	const updateReference = (index: number, field: string, value: string) => {
		const newReferences = data.references.map((ref, i) =>
			i === index ? { ...ref, [field]: value } : ref
		);
		updateData({ references: newReferences });
	};

	return (
		<div className="space-y-6">
			<div className="text-center mb-6">
				<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<Briefcase className="w-8 h-8 text-blue-600" />
				</div>
				<h2 className="text-2xl font-semibold text-gray-900 mb-2">
					Work Experience & References
				</h2>
				<p className="text-gray-600">
					Tell us about your professional background and provide references
				</p>
			</div>

			{/* Years of Experience */}
			<div className="space-y-2">
				<Label
					htmlFor="yearsExperience"
					className="text-sm font-medium text-gray-700"
				>
					Years of Experience *
				</Label>
				<Select
					value={data.yearsExperience}
					onValueChange={(value) => updateData({ yearsExperience: value })}
				>
					<SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
						<SelectValue placeholder="Select your experience level" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="0-1">Less than 1 year</SelectItem>
						<SelectItem value="1-3">1-3 years</SelectItem>
						<SelectItem value="3-5">3-5 years</SelectItem>
						<SelectItem value="5-10">5-10 years</SelectItem>
						<SelectItem value="10+">10+ years</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Past Roles Description */}
			<div className="space-y-2">
				<Label
					htmlFor="pastRoles"
					className="text-sm font-medium text-gray-700"
				>
					Describe Your Past Roles & Experience *
				</Label>
				<Textarea
					id="pastRoles"
					placeholder="Describe your work history, key responsibilities, notable projects, and any specializations..."
					value={data.pastRoles}
					onChange={(e) => updateData({ pastRoles: e.target.value })}
					className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
				/>
				<p className="text-xs text-gray-500">
					Include specific examples of projects you've completed and skills
					you've developed
				</p>
			</div>

			{/* References Section */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<Label className="text-sm font-medium text-gray-700">
						Professional References
					</Label>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={addReference}
						className="flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
					>
						<Plus className="w-4 h-4" />
						Add Reference
					</Button>
				</div>

				<div className="space-y-4">
					{data.references.map((reference, index) => (
						<Card key={index} className="border-gray-200">
							<CardHeader className="pb-3">
								<div className="flex items-center justify-between">
									<CardTitle className="text-sm font-medium text-gray-700">
										Reference {index + 1}
									</CardTitle>
									{data.references.length > 1 && (
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => removeReference(index)}
											className="text-red-600 hover:text-red-700 hover:bg-red-50"
										>
											<X className="w-4 h-4" />
										</Button>
									)}
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-medium text-gray-600">
											Full Name *
										</Label>
										<Input
											placeholder="Reference name"
											value={reference.name}
											onChange={(e) =>
												updateReference(index, "name", e.target.value)
											}
											className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-medium text-gray-600">
											Phone Number *
										</Label>
										<Input
											type="tel"
											placeholder="Phone number"
											value={reference.phone}
											onChange={(e) =>
												updateReference(index, "phone", e.target.value)
											}
											className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label className="text-xs font-medium text-gray-600">
										Relationship *
									</Label>
									<Select
										value={reference.relationship}
										onValueChange={(value) =>
											updateReference(index, "relationship", value)
										}
									>
										<SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
											<SelectValue placeholder="Select relationship" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="former-employer">
												Former Employer
											</SelectItem>
											<SelectItem value="supervisor">Supervisor</SelectItem>
											<SelectItem value="colleague">Colleague</SelectItem>
											<SelectItem value="client">Former Client</SelectItem>
											<SelectItem value="contractor">
												Fellow Contractor
											</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Info Box */}
			<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
				<div className="flex items-start gap-3">
					<Briefcase className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
					<div>
						<h4 className="font-medium text-blue-900 mb-1">
							Reference Guidelines
						</h4>
						<ul className="text-sm text-blue-700 space-y-1">
							<li>• Provide at least one professional reference</li>
							<li>
								• References should be people who can speak to your work quality
							</li>
							<li>
								• We may contact references during the verification process
							</li>
							<li>
								• Make sure to inform your references they may be contacted
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

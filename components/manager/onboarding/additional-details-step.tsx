"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { X, Plus, Settings, Globe, Clock, Wrench } from "lucide-react";
// Define FormData type locally if not available from another module
export interface FormData {
	languages: string[];
	workRadius: string;
	availability: string;
	toolsEquipment: string;
}

interface AdditionalDetailsStepProps {
	data: FormData;
	updateData: (data: Partial<FormData>) => void;
}

const COMMON_LANGUAGES = [
	"English",
	"Spanish",
	"French",
	"German",
	"Italian",
	"Portuguese",
	"Chinese",
	"Japanese",
	"Korean",
	"Arabic",
	"Hindi",
	"Russian",
];

export default function AdditionalDetailsStep({
	data,
	updateData,
}: AdditionalDetailsStepProps) {
	const [newLanguage, setNewLanguage] = useState("");

	const addLanguage = (language: string) => {
		if (language && !data.languages.includes(language)) {
			const newLanguages = [...data.languages, language];
			updateData({ languages: newLanguages });
			setNewLanguage("");
		}
	};

	const removeLanguage = (language: string) => {
		const newLanguages = data.languages.filter((lang) => lang !== language);
		updateData({ languages: newLanguages });
	};

	return (
		<div className="space-y-6">
			<div className="text-center mb-6">
				<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<Settings className="w-8 h-8 text-blue-600" />
				</div>
				<h2 className="text-2xl font-semibold text-gray-900 mb-2">
					Additional Details
				</h2>
				<p className="text-gray-600">
					Help us match you with the right customers and opportunities
				</p>
			</div>

			{/* Languages Spoken */}
			<Card className="border-blue-200 bg-blue-50/30">
				<CardHeader className="pb-3">
					<div className="flex items-center gap-2">
						<Globe className="w-5 h-5 text-blue-600" />
						<CardTitle className="text-lg">Languages Spoken</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex flex-wrap gap-2">
						{data.languages.map((language) => (
							<Badge
								key={language}
								variant="secondary"
								className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200"
							>
								{language}
								<Button
									size="sm"
									variant="ghost"
									className="h-4 w-4 p-0 hover:bg-blue-300"
									onClick={() => removeLanguage(language)}
								>
									<X className="w-3 h-3" />
								</Button>
							</Badge>
						))}
					</div>

					<div className="flex gap-2">
						<Select value={newLanguage} onValueChange={setNewLanguage}>
							<SelectTrigger className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white">
								<SelectValue placeholder="Select a language" />
							</SelectTrigger>
							<SelectContent>
								{COMMON_LANGUAGES.filter(
									(lang) => !data.languages.includes(lang)
								).map((language) => (
									<SelectItem key={language} value={language}>
										{language}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Button
							type="button"
							onClick={() => addLanguage(newLanguage)}
							disabled={!newLanguage}
							className="bg-blue-600 hover:bg-blue-700"
						>
							<Plus className="w-4 h-4" />
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Work Radius */}
			<Card className="border-green-200 bg-green-50/30">
				<CardHeader className="pb-3">
					<div className="flex items-center gap-2">
						<div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
							<div className="w-2 h-2 bg-white rounded-full"></div>
						</div>
						<CardTitle className="text-lg">Preferred Work Radius</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<Label
							htmlFor="workRadius"
							className="text-sm font-medium text-gray-700"
						>
							How far are you willing to travel for work?
						</Label>
						<Select
							value={data.workRadius}
							onValueChange={(value) => updateData({ workRadius: value })}
						>
							<SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white">
								<SelectValue placeholder="Select work radius" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="5km">Within 5 km</SelectItem>
								<SelectItem value="10km">Within 10 km</SelectItem>
								<SelectItem value="20km">Within 20 km</SelectItem>
								<SelectItem value="50km">Within 50 km</SelectItem>
								<SelectItem value="100km">Within 100 km</SelectItem>
								<SelectItem value="anywhere">Anywhere in the region</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Availability Schedule */}
			<Card className="border-purple-200 bg-purple-50/30">
				<CardHeader className="pb-3">
					<div className="flex items-center gap-2">
						<Clock className="w-5 h-5 text-purple-600" />
						<CardTitle className="text-lg">Availability Schedule</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<Label
							htmlFor="availability"
							className="text-sm font-medium text-gray-700"
						>
							When are you typically available for work?
						</Label>
						<Textarea
							id="availability"
							placeholder="e.g., Monday-Friday 8AM-6PM, Weekends by appointment, Emergency calls available 24/7..."
							value={data.availability}
							onChange={(e) => updateData({ availability: e.target.value })}
							className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px] bg-white"
						/>
						<p className="text-xs text-gray-500">
							Be specific about your regular hours, weekend availability, and
							emergency services
						</p>
					</div>
				</CardContent>
			</Card>

			{/* Tools & Equipment */}
			<Card className="border-orange-200 bg-orange-50/30">
				<CardHeader className="pb-3">
					<div className="flex items-center gap-2">
						<Wrench className="w-5 h-5 text-orange-600" />
						<CardTitle className="text-lg">Tools & Equipment Owned</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<Label
							htmlFor="toolsEquipment"
							className="text-sm font-medium text-gray-700"
						>
							What tools and equipment do you own?
						</Label>
						<Textarea
							id="toolsEquipment"
							placeholder="List your professional tools, equipment, vehicles, and any specialized machinery you own..."
							value={data.toolsEquipment}
							onChange={(e) => updateData({ toolsEquipment: e.target.value })}
							className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px] bg-white"
						/>
						<p className="text-xs text-gray-500">
							Include hand tools, power tools, vehicles, safety equipment, and
							any specialized machinery
						</p>
					</div>
				</CardContent>
			</Card>

			{/* Benefits Info */}
			<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
				<div className="flex items-start gap-3">
					<div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
						<span className="text-white text-xs font-bold">i</span>
					</div>
					<div>
						<h4 className="font-medium text-blue-900 mb-1">
							Why these details matter
						</h4>
						<ul className="text-sm text-blue-700 space-y-1">
							<li>
								• Language skills help us match you with customers who speak
								your languages
							</li>
							<li>
								• Work radius helps us show you relevant job opportunities in
								your area
							</li>
							<li>
								• Availability information helps customers know when to expect
								your services
							</li>
							<li>
								• Tool ownership can affect job matching and pricing
								recommendations
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Optional Notice */}
			<div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
				<div className="flex items-center gap-2 mb-2">
					<Settings className="w-4 h-4 text-gray-600" />
					<h4 className="font-medium text-gray-900">Optional Information</h4>
				</div>
				<p className="text-sm text-gray-600">
					All information on this step is optional but recommended. You can
					update these details anytime from your dashboard. The more information
					you provide, the better we can match you with suitable customers and
					opportunities.
				</p>
			</div>
		</div>
	);
}

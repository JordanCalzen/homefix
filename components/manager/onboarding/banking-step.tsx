"use client";
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
import { CreditCard, Shield, DollarSign } from "lucide-react";
// Define FormData type locally if not available elsewhere
export interface FormData {
	payoutPreference: "bank-transfer" | "mobile-money" | "both" | "";
	bankName?: string;
	accountHolderName?: string;
	accountNumber?: string;
	mobileMoney?: string;
}

interface BankingStepProps {
	data: FormData;
	updateData: (data: Partial<FormData>) => void;
}

export default function BankingStep({ data, updateData }: BankingStepProps) {
	return (
		<div className="space-y-6">
			<div className="text-center mb-6">
				<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<CreditCard className="w-8 h-8 text-blue-600" />
				</div>
				<h2 className="text-2xl font-semibold text-gray-900 mb-2">
					Banking Information
				</h2>
				<p className="text-gray-600">
					Set up your payment details to receive earnings from completed
					services
				</p>
			</div>

			{/* Payout Preference */}
			<div className="space-y-2">
				<Label
					htmlFor="payoutPreference"
					className="text-sm font-medium text-gray-700"
				>
					Preferred Payout Method *
				</Label>
				<Select
					value={data.payoutPreference}
					onValueChange={(value) =>
						updateData({
							payoutPreference: value as FormData["payoutPreference"],
						})
					}
				>
					<SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
						<SelectValue placeholder="Select payout method" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="bank-transfer">Bank Transfer</SelectItem>
						<SelectItem value="mobile-money">Mobile Money</SelectItem>
						<SelectItem value="both">Both Options</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Bank Information */}
			{(data.payoutPreference === "bank-transfer" ||
				data.payoutPreference === "both") && (
				<Card className="border-blue-200 bg-blue-50/30">
					<CardContent className="p-6 space-y-4">
						<div className="flex items-center gap-2 mb-4">
							<CreditCard className="w-5 h-5 text-blue-600" />
							<h3 className="font-medium text-gray-900">
								Bank Account Details
							</h3>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label
									htmlFor="bankName"
									className="text-sm font-medium text-gray-700"
								>
									Bank Name *
								</Label>
								<Input
									id="bankName"
									placeholder="Enter your bank name"
									value={data.bankName}
									onChange={(e) => updateData({ bankName: e.target.value })}
									className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="accountHolderName"
									className="text-sm font-medium text-gray-700"
								>
									Account Holder Name *
								</Label>
								<Input
									id="accountHolderName"
									placeholder="Full name on account"
									value={data.accountHolderName}
									onChange={(e) =>
										updateData({ accountHolderName: e.target.value })
									}
									className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white"
								/>
							</div>

							<div className="space-y-2 md:col-span-2">
								<Label
									htmlFor="accountNumber"
									className="text-sm font-medium text-gray-700"
								>
									Account Number / IBAN *
								</Label>
								<Input
									id="accountNumber"
									placeholder="Enter account number or IBAN"
									value={data.accountNumber}
									onChange={(e) =>
										updateData({ accountNumber: e.target.value })
									}
									className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white"
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Mobile Money Information */}
			{(data.payoutPreference === "mobile-money" ||
				data.payoutPreference === "both") && (
				<Card className="border-green-200 bg-green-50/30">
					<CardContent className="p-6 space-y-4">
						<div className="flex items-center gap-2 mb-4">
							<DollarSign className="w-5 h-5 text-green-600" />
							<h3 className="font-medium text-gray-900">
								Mobile Money Details
							</h3>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="mobileMoney"
								className="text-sm font-medium text-gray-700"
							>
								Mobile Money Number *
							</Label>
							<Input
								id="mobileMoney"
								placeholder="Enter mobile money number"
								value={data.mobileMoney}
								onChange={(e) => updateData({ mobileMoney: e.target.value })}
								className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white"
							/>
							<p className="text-xs text-gray-500">
								Enter the phone number associated with your mobile money account
							</p>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Security Notice */}
			<div className="bg-green-50 border border-green-200 rounded-lg p-4">
				<div className="flex items-start gap-3">
					<Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
					<div>
						<h4 className="font-medium text-green-900 mb-1">
							Your financial information is secure
						</h4>
						<p className="text-sm text-green-700">
							We use industry-standard encryption to protect your banking
							details. Your information is never shared with third parties and
							is only used for payment processing.
						</p>
					</div>
				</div>
			</div>

			{/* Payment Schedule Info */}
			<Card className="bg-gray-50 border-gray-200">
				<CardContent className="p-4">
					<h4 className="font-medium text-gray-900 mb-3">
						Payment Information:
					</h4>
					<ul className="space-y-2 text-sm text-gray-600">
						<li className="flex items-center gap-2">
							<div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
							Payments are processed weekly on Fridays
						</li>
						<li className="flex items-center gap-2">
							<div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
							Minimum payout threshold is $50
						</li>
						<li className="flex items-center gap-2">
							<div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
							Platform fee: 8% per completed service
						</li>
						<li className="flex items-center gap-2">
							<div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
							You can update payment details anytime in your dashboard
						</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}

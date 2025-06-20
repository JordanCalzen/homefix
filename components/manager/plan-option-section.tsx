"use client";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, X, Star, Zap, Crown, Shield } from "lucide-react";

const plans = [
	{
		id: "free",
		name: "Free",
		price: 0,
		period: "forever",
		description: "Perfect for getting started",
		icon: Shield,
		gradient: "from-gray-400 to-gray-600",
		popular: false,
		features: [
			{ name: "Up to 5 leads per month", included: true },
			{ name: "Basic profile setup", included: true },
			{ name: "Standard payment processing", included: true },
			{ name: "Email support", included: true },
			{ name: "Mobile app access", included: true },
			{ name: "Priority listing", included: false },
			{ name: "Advanced analytics", included: false },
			{ name: "24/7 phone support", included: false },
			{ name: "Custom branding", included: false },
			{ name: "Dedicated account manager", included: false },
		],
		cta: "Get Started Free",
		highlight: "No credit card required",
	},
	{
		id: "pro",
		name: "Pro",
		price: 29,
		period: "month",
		description: "Most popular for growing businesses",
		icon: Zap,
		gradient: "from-sky-500 to-blue-600",
		popular: true,
		features: [
			{ name: "Unlimited leads", included: true },
			{ name: "Priority listing", included: true },
			{ name: "Advanced analytics", included: true },
			{ name: "24/7 support", included: true },
			{ name: "Mobile app access", included: true },
			{ name: "Custom scheduling", included: true },
			{ name: "Automated invoicing", included: true },
			{ name: "Customer management", included: true },
			{ name: "Custom branding", included: false },
			{ name: "Dedicated account manager", included: false },
		],
		cta: "Start Pro Trial",
		highlight: "14-day free trial",
	},
	{
		id: "premium",
		name: "Premium",
		price: 59,
		period: "month",
		description: "For established service businesses",
		icon: Crown,
		gradient: "from-amber-500 to-orange-600",
		popular: false,
		features: [
			{ name: "Everything in Pro", included: true },
			{ name: "Featured placement", included: true },
			{ name: "Custom branding", included: true },
			{ name: "Dedicated account manager", included: true },
			{ name: "Priority phone support", included: true },
			{ name: "Advanced reporting", included: true },
			{ name: "API access", included: true },
			{ name: "White-label options", included: true },
			{ name: "Custom integrations", included: true },
			{ name: "Training & onboarding", included: true },
		],
		cta: "Contact Sales",
		highlight: "Custom solutions available",
	},
];

export default function PlanOptionsSection() {
	const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
		"monthly"
	);

	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-sky-50">
			<div className="container px-4 md:px-6">
				<div className="mx-auto max-w-2xl text-center mb-16">
					<Badge className="bg-sky-100 text-sky-800 hover:bg-sky-200 mb-4">
						<Star className="w-3 h-3 mr-1 fill-current" />
						Pricing Plans
					</Badge>
					<h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
						<span className="relative inline-block">
							<span className="relative z-10 bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
								Choose your plan
							</span>
							<span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sky-600/30 to-blue-600/30 blur-sm"></span>
						</span>{" "}
						and start growing
					</h2>
					<p className="text-lg text-gray-600 mb-8">
						Start free and upgrade as your business grows. All plans include our
						core features and support.
					</p>

					{/* Billing Toggle */}
					<div className="inline-flex items-center bg-white rounded-full p-1 shadow-sm border border-gray-200">
						<button
							onClick={() => setBillingPeriod("monthly")}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
								billingPeriod === "monthly"
									? "bg-sky-600 text-white shadow-sm"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							Monthly
						</button>
						<button
							onClick={() => setBillingPeriod("yearly")}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
								billingPeriod === "yearly"
									? "bg-sky-600 text-white shadow-sm"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							Yearly
							<Badge className="ml-2 bg-green-100 text-green-800 text-xs">
								Save 20%
							</Badge>
						</button>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{plans.map((plan) => (
						<Card
							key={plan.id}
							className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
								plan.popular
									? "border-2 border-sky-500 shadow-lg scale-105"
									: "border border-gray-200 hover:border-sky-200"
							}`}
						>
							{plan.popular && (
								<div className="absolute top-0 left-0 right-0">
									<div
										className={`bg-gradient-to-r ${plan.gradient} text-white text-center py-2 text-sm font-medium`}
									>
										Most Popular
									</div>
								</div>
							)}

							<CardHeader
								className={`text-center ${plan.popular ? "pt-12" : "pt-6"}`}
							>
								<div
									className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} text-white mb-4 mx-auto`}
								>
									<plan.icon className="w-6 h-6" />
								</div>
								<CardTitle className="text-2xl font-bold">
									{plan.name}
								</CardTitle>
								<div className="mt-4">
									<span className="text-4xl font-bold text-gray-900">
										$
										{billingPeriod === "yearly" && plan.price > 0
											? Math.round(plan.price * 0.8)
											: plan.price}
									</span>
									{plan.price > 0 && (
										<span className="text-gray-600">
											/{billingPeriod === "yearly" ? "month" : plan.period}
										</span>
									)}
								</div>
								<CardDescription className="mt-2">
									{plan.description}
								</CardDescription>
								<div className="text-xs text-sky-600 font-medium mt-2">
									{plan.highlight}
								</div>
							</CardHeader>

							<CardContent className="space-y-6">
								<ul className="space-y-3">
									{plan.features.map((feature, index) => (
										<li key={index} className="flex items-center gap-3">
											{feature.included ? (
												<CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
											) : (
												<X className="h-4 w-4 text-gray-300 flex-shrink-0" />
											)}
											<span
												className={`text-sm ${
													feature.included ? "text-gray-900" : "text-gray-400"
												}`}
											>
												{feature.name}
											</span>
										</li>
									))}
								</ul>

								<Button
									className={`w-full ${
										plan.popular
											? `bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white border-0`
											: "border-sky-200 hover:bg-sky-50 hover:border-sky-300"
									}`}
									variant={plan.popular ? "default" : "outline"}
									size="lg"
								>
									{plan.cta}
								</Button>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Enterprise CTA */}
				<div className="mt-16 max-w-6xl mx-auto text-center">
					<div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-sky-100">
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							Need a custom solution?
						</h3>
						<p className="text-gray-600 mb-6 max-w-2xl mx-auto">
							For large service companies or franchises, we offer custom
							enterprise solutions with dedicated support and tailored features.
						</p>
						<Button
							size="lg"
							variant="outline"
							className="border-sky-200 hover:bg-sky-50"
						>
							Contact Enterprise Sales
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

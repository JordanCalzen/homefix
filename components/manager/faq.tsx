"use client";
import { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle, Phone, Mail } from "lucide-react";

const faqCategories = [
	{
		id: "getting-started",
		name: "Getting Started",
		icon: HelpCircle,
		questions: [
			{
				question: "How do I get paid for my services?",
				answer:
					"We offer secure payment processing through our platform. Customers pay upfront, and you receive payment within 24-48 hours after job completion. We support direct deposit, PayPal, and other payment methods. All transactions are protected and you'll never have to chase invoices again.",
			},
			{
				question: "What documents do I need to get started?",
				answer:
					"You'll need a valid business license (if required in your area), proof of insurance, and any relevant certifications for your trade. We also require a background check for certain service categories. Our onboarding team will guide you through the entire process step by step.",
			},
			{
				question: "How long does the approval process take?",
				answer:
					"Most applications are reviewed within 24-48 hours. However, if additional documentation is needed or background checks take longer, it may take up to 5 business days. We'll keep you updated throughout the process via email and SMS.",
			},
		],
	},
	{
		id: "leads-jobs",
		name: "Leads & Jobs",
		icon: MessageCircle,
		questions: [
			{
				question: "How are leads generated and distributed?",
				answer:
					"Leads are generated from customers actively searching for services in your area. Our algorithm matches you with relevant opportunities based on your skills, location, availability, and customer preferences. You'll receive instant notifications for new leads that match your criteria.",
			},
			{
				question: "Can I set my own rates?",
				answer:
					"Yes! You have full control over your pricing. You can set hourly rates, flat fees, or custom quotes for different types of jobs. Our platform provides market insights to help you price competitively while maximizing your earnings.",
			},
			{
				question: "What if I need to cancel or reschedule a job?",
				answer:
					"We understand that emergencies happen. You can reschedule jobs through the app with at least 2 hours notice. For cancellations, please provide as much notice as possible to maintain your rating and avoid penalties. Our support team is always available to help with difficult situations.",
			},
		],
	},
	{
		id: "payments-billing",
		name: "Payments & Billing",
		icon: Phone,
		questions: [
			{
				question: "Are there any hidden fees?",
				answer:
					"No hidden fees! Our pricing is transparent. Free plan users pay a small transaction fee per completed job. Pro and Premium subscribers have no transaction fees and pay only their monthly subscription. All fees are clearly outlined in your dashboard.",
			},
			{
				question: "When do I get charged for my subscription?",
				answer:
					"Subscriptions are billed monthly or yearly depending on your chosen plan. Your first charge occurs after your free trial ends. You can cancel anytime and will retain access until the end of your billing period.",
			},
			{
				question: "What happens if a customer doesn't pay?",
				answer:
					"This rarely happens since customers pay upfront through our platform. In the unlikely event of a payment dispute, our support team will investigate and protect you from fraudulent chargebacks. We also offer payment protection insurance for qualifying jobs.",
			},
		],
	},
];

export default function FAQSection() {
	const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);
	const currentCategory =
		faqCategories.find((cat) => cat.id === activeCategory) || faqCategories[0];

	return (
		<section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-white">
			<div className="container px-4 md:px-6">
				<div className="mx-auto max-w-2xl text-center mb-16">
					<Badge className="bg-sky-100 text-sky-800 hover:bg-sky-200 mb-4">
						<HelpCircle className="w-3 h-3 mr-1" />
						Support Center
					</Badge>
					<h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
						<span className="relative inline-block">
							<span className="relative z-10 bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
								Frequently asked
							</span>
							<span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sky-600/30 to-blue-600/30 blur-sm"></span>
						</span>{" "}
						questions
					</h2>
					<p className="text-lg text-gray-600">
						Get answers to common questions about joining ServiceHub and growing
						your service business.
					</p>
				</div>

				<div className="max-w-4xl mx-auto">
					{/* Category Tabs */}
					<div className="flex flex-wrap justify-center gap-2 mb-12">
						{faqCategories.map((category) => (
							<button
								key={category.id}
								onClick={() => setActiveCategory(category.id)}
								className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
									activeCategory === category.id
										? "bg-sky-600 text-white shadow-md"
										: "bg-gray-100 text-gray-600 hover:bg-gray-200"
								}`}
							>
								<category.icon className="w-4 h-4" />
								{category.name}
							</button>
						))}
					</div>

					{/* FAQ Accordion */}
					<div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-8">
						<Accordion type="single" collapsible className="w-full space-y-4">
							{currentCategory.questions.map((faq, index) => (
								<AccordionItem
									key={index}
									value={`item-${index}`}
									className="bg-white rounded-lg border border-sky-100 px-6"
								>
									<AccordionTrigger className="text-left hover:no-underline py-6">
										<span className="font-semibold text-gray-900">
											{faq.question}
										</span>
									</AccordionTrigger>
									<AccordionContent className="pb-6">
										<p className="text-gray-600 leading-relaxed">
											{faq.answer}
										</p>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>

					{/* Contact Support */}
					<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="text-center p-6 bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl">
							<div className="w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
								<MessageCircle className="w-6 h-6 text-white" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
							<p className="text-sm text-gray-600 mb-4">
								Get instant help from our support team
							</p>
							<Button size="sm" className="bg-sky-600 hover:bg-sky-700">
								Start Chat
							</Button>
						</div>

						<div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
							<div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
								<Phone className="w-6 h-6 text-white" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">
								Phone Support
							</h3>
							<p className="text-sm text-gray-600 mb-4">
								Speak with our experts directly
							</p>
							<Button
								size="sm"
								variant="outline"
								className="border-emerald-200 hover:bg-emerald-50"
							>
								Call Now
							</Button>
						</div>

						<div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
							<div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
								<Mail className="w-6 h-6 text-white" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-2">
								Email Support
							</h3>
							<p className="text-sm text-gray-600 mb-4">
								Send us a detailed message
							</p>
							<Button
								size="sm"
								variant="outline"
								className="border-amber-200 hover:bg-amber-50"
							>
								Send Email
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

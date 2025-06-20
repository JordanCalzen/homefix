"use client";
import type React from "react";
import { useState } from "react";
import {
	Users,
	Calendar,
	CreditCard,
	Settings,
	BarChart3,
	MapPin,
	Star,
	Briefcase,
	TrendingUp,
} from "lucide-react";
import Image from "next/image";

interface BenefitTab {
	id: string;
	name: string;
	description: string;
	icon: React.ElementType;
	details: {
		title: string;
		description: string;
	}[];
	image: string;
	gradient: string;
}

const benefitTabs: BenefitTab[] = [
	{
		id: "leads",
		name: "Client Leads",
		description:
			"Get matched with pre-screened customers actively looking for your services.",
		icon: Users,
		details: [
			{
				title: "Pre-Qualified Customers",
				description:
					"Every lead is verified and ready to hire a professional service provider.",
			},
			{
				title: "Local Targeting",
				description:
					"Receive leads specifically in your service area and expertise.",
			},
			{
				title: "Instant Notifications",
				description:
					"Get notified immediately when a potential customer needs your services.",
			},
		],
		image:
			"https://img.freepik.com/premium-photo/young-black-male-plumber-sitting-floor-fixing-bathroom-sink-close-up_926199-3096774.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
		gradient: "from-sky-400 to-blue-600",
	},
	{
		id: "scheduling",
		name: "Flexible Scheduling",
		description:
			"Set your own hours and availability to work when it suits your lifestyle.",
		icon: Calendar,
		details: [
			{
				title: "Custom Availability",
				description:
					"Set your working hours, days off, and seasonal availability.",
			},
			{
				title: "Booking Management",
				description:
					"Accept, reschedule, or decline jobs with easy-to-use tools.",
			},
			{
				title: "Calendar Integration",
				description:
					"Sync with your existing calendar apps to avoid double bookings.",
			},
		],
		image:
			"https://img.freepik.com/free-photo/people-repairing-computer-chips_23-2150880940.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
		gradient: "from-emerald-400 to-teal-600",
	},
	{
		id: "payments",
		name: "Secure Payments",
		description:
			"Get paid fast with our secure payment system - no more chasing invoices.",
		icon: CreditCard,
		details: [
			{
				title: "Instant Payment Processing",
				description: "Receive payment within 24-48 hours after job completion.",
			},
			{
				title: "Multiple Payment Methods",
				description:
					"Accept credit cards, bank transfers, and digital wallet payments.",
			},
			{
				title: "Automatic Invoicing",
				description:
					"Generate professional invoices automatically for every completed job.",
			},
		],
		image:
			"https://img.freepik.com/premium-photo/side-view-portrait-two-multiethnic-young-women-working-with-leather-workshop-creating-hand_236854-43612.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
		gradient: "from-amber-400 to-orange-600",
	},
	{
		id: "management",
		name: "Job Management",
		description:
			"Manage all your jobs, clients, and communications in one dashboard.",
		icon: Settings,
		details: [
			{
				title: "Centralized Dashboard",
				description:
					"View all your active jobs, upcoming appointments, and client messages.",
			},
			{
				title: "Client Communication",
				description:
					"Built-in messaging system to communicate with customers seamlessly.",
			},
			{
				title: "Job History",
				description:
					"Keep detailed records of all completed work and customer interactions.",
			},
		],
		image:
			"https://img.freepik.com/premium-photo/technician-worker-installing-video-surveillance-camera_926199-2166926.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
		gradient: "from-violet-400 to-purple-600",
	},
	{
		id: "analytics",
		name: "Business Insights",
		description:
			"Track your earnings, monitor performance, and get insights to grow faster.",
		icon: BarChart3,
		details: [
			{
				title: "Earnings Dashboard",
				description:
					"Real-time tracking of your income, completed jobs, and pending payments.",
			},
			{
				title: "Performance Metrics",
				description:
					"Monitor your response time, completion rate, and customer satisfaction.",
			},
			{
				title: "Growth Recommendations",
				description:
					"Get personalized tips to improve your service and attract more customers.",
			},
		],
		image:
			"https://img.freepik.com/free-photo/service-maintenance-worker-repairing_23-2149176714.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
		gradient: "from-rose-400 to-pink-600",
	},
	{
		id: "exposure",
		name: "Market Exposure",
		description:
			"Increase your visibility and build a strong reputation in your local market.",
		icon: MapPin,
		details: [
			{
				title: "Professional Profile",
				description:
					"Showcase your skills, certifications, and portfolio to attract customers.",
			},
			{
				title: "Customer Reviews",
				description:
					"Build credibility with authentic reviews and ratings from satisfied clients.",
			},
			{
				title: "Local SEO Boost",
				description:
					"Appear in local search results when customers look for your services.",
			},
		],
		image:
			"https://img.freepik.com/premium-photo/electrician-installing-led-light-bulbs-ceiling-lamp_1048944-4083658.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
		gradient: "from-indigo-400 to-blue-600",
	},
];

export default function BenefitsSection() {
	const [activeTab, setActiveTab] = useState(benefitTabs[0].id);

	const currentBenefit =
		benefitTabs.find((tab) => tab.id === activeTab) || benefitTabs[0];

	return (
		<section
			id="benefits"
			className="w-full py-12 md:py-24 lg:py-32 bg-sky-100/80"
		>
			<div className="container px-4 md:px-6">
				<div className="mx-auto max-w-2xl text-center">
					<span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-600 ring-1 ring-inset ring-sky-500/20">
						<svg
							className="mr-1.5 h-2 w-2 fill-sky-600"
							viewBox="0 0 6 6"
							aria-hidden="true"
						>
							<circle cx="3" cy="3" r="3" />
						</svg>
						Service Provider Platform
					</span>

					<h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
						<span className="relative inline-block">
							<span className="relative z-10 bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
								Everything you need
							</span>
							<span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sky-600/30 to-blue-600/30 blur-sm"></span>
						</span>{" "}
						to grow your service business
					</h2>

					<p className="mt-6 text-lg leading-8 text-gray-600">
						Our comprehensive platform provides all the tools service
						professionals need to connect with customers, manage jobs, and scale
						their business with confidence.
					</p>
				</div>

				<div className="mt-16 mx-auto max-w-6xl">
					<div className="flex overflow-x-auto pb-4 sm:justify-center">
						<div className="inline-flex items-center space-x-2 rounded-full bg-gray-50 p-1.5">
							{benefitTabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
										activeTab === tab.id
											? `bg-white text-gray-900 shadow-sm ring-1 ring-gray-900/10`
											: `text-gray-600 hover:text-gray-900`
									}`}
								>
									<tab.icon
										className={`mr-1.5 h-4 w-4 ${
											activeTab === tab.id ? "text-sky-600" : "text-gray-400"
										}`}
									/>
									{tab.name}
								</button>
							))}
						</div>
					</div>

					<div className="mt-10">
						<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
							<div className="relative">
								<div
									className={`absolute -inset-4 bg-gradient-to-r ${currentBenefit.gradient} opacity-10 blur-xl rounded-3xl`}
								></div>
								<div className="relative overflow-hidden rounded-2xl shadow-xl">
									<Image
										src={currentBenefit.image}
										alt={`${currentBenefit.name} feature`}
										width={500}
										height={500}
										className="w-full h-80 object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
									<div className="absolute bottom-0 left-0 right-0 p-6">
										<div
											className={`inline-flex items-center rounded-full bg-gradient-to-r ${currentBenefit.gradient} px-3 py-1 text-sm font-medium text-white mb-2`}
										>
											{currentBenefit.name}
										</div>
										<p className="text-base font-medium text-white">
											{currentBenefit.description}
										</p>
									</div>
								</div>
							</div>

							<div className="flex flex-col justify-center">
								<div
									className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${currentBenefit.gradient} shadow-md mb-6`}
								>
									<currentBenefit.icon
										className="h-6 w-6 text-white"
										aria-hidden="true"
									/>
								</div>

								<h3 className="text-2xl font-bold text-gray-900">
									{currentBenefit.name}
								</h3>

								<p className="mt-3 text-lg text-gray-600">
									{currentBenefit.description}
								</p>

								<div className="mt-8 space-y-6">
									{currentBenefit.details.map((detail, index) => (
										<div key={index} className="flex">
											<div
												className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${currentBenefit.gradient} bg-opacity-10`}
											>
												<span className="text-sm font-medium text-white">
													{index + 1}
												</span>
											</div>
											<div className="ml-4">
												<h4 className="text-base font-semibold text-gray-900">
													{detail.title}
												</h4>
												<p className="mt-1 text-sm text-gray-600">
													{detail.description}
												</p>
											</div>
										</div>
									))}
								</div>

								<div className="mt-10">
									<button
										className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r ${currentBenefit.gradient} hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600`}
									>
										Learn more about {currentBenefit.name.toLowerCase()}
										<svg
											className="ml-2 h-4 w-4"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M14 5l7 7m0 0l-7 7m7-7H3"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Trust Indicators */}
				<div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
					<div className="text-center">
						<div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-sky-100 rounded-lg">
							<Users className="w-6 h-6 text-sky-600" />
						</div>
						<div className="text-2xl font-bold text-gray-900">10,000+</div>
						<div className="text-sm text-gray-600">Active Professionals</div>
					</div>
					<div className="text-center">
						<div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-emerald-100 rounded-lg">
							<Briefcase className="w-6 h-6 text-emerald-600" />
						</div>
						<div className="text-2xl font-bold text-gray-900">50,000+</div>
						<div className="text-sm text-gray-600">Jobs Completed</div>
					</div>
					<div className="text-center">
						<div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-amber-100 rounded-lg">
							<Star className="w-6 h-6 text-amber-600" />
						</div>
						<div className="text-2xl font-bold text-gray-900">4.9/5</div>
						<div className="text-sm text-gray-600">Average Rating</div>
					</div>
					<div className="text-center">
						<div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-rose-100 rounded-lg">
							<TrendingUp className="w-6 h-6 text-rose-600" />
						</div>
						<div className="text-2xl font-bold text-gray-900">150%</div>
						<div className="text-sm text-gray-600">Average Income Growth</div>
					</div>
				</div>
			</div>
		</section>
	);
}

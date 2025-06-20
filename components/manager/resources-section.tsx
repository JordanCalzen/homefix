"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	BookOpen,
	CheckCircle,
	Camera,
	Play,
	ArrowRight,
	Clock,
	Users,
	TrendingUp,
} from "lucide-react";
import Image from "next/image";

const resources = [
	{
		id: "profile-setup",
		title: "How to Set Up Your Profile",
		description:
			"Learn how to create a compelling profile that attracts more customers and builds trust with detailed photos, certifications, and service descriptions.",
		image:
			"https://img.freepik.com/premium-photo/man-using-laptop-computer-sign-up-log-username-password-virtual-touch-screenxa_1082696-1925.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
		type: "Guide",
		icon: BookOpen,
		readTime: "8 min read",
		difficulty: "Beginner",
		gradient: "from-sky-400 to-blue-600",
		stats: "95% completion rate",
	},
	{
		id: "win-clients",
		title: "Best Practices to Win Clients",
		description:
			"Discover proven strategies to stand out from the competition, write compelling proposals, and win more jobs consistently.",
		image:
			"https://img.freepik.com/free-photo/black-male-female-colleagues-sitting-office-looking-computer-screen-together_1098-20605.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
		type: "Tips",
		icon: CheckCircle,
		readTime: "12 min read",
		difficulty: "Intermediate",
		gradient: "from-emerald-400 to-teal-600",
		stats: "3x more leads on average",
	},
	{
		id: "portfolio-photos",
		title: "Portfolio Photo Tips",
		description:
			"Learn how to take professional photos that showcase your work and attract customers with proper lighting, angles, and composition.",
		image:
			"https://img.freepik.com/free-vector/minimal-photography-studio-instagram-posts_23-2149489076.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
		type: "Video",
		icon: Camera,
		readTime: "15 min watch",
		difficulty: "Beginner",
		gradient: "from-amber-400 to-orange-600",
		stats: "2x more profile views",
	},
	{
		id: "pricing-strategy",
		title: "Pricing Your Services Right",
		description:
			"Master the art of competitive pricing while maintaining profitability. Learn market research techniques and pricing psychology.",
		image:
			"https://img.freepik.com/free-photo/high-angle-people-celebrating-mother-s-day_23-2151207213.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
		type: "Course",
		icon: TrendingUp,
		readTime: "25 min course",
		difficulty: "Advanced",
		gradient: "from-violet-400 to-purple-600",
		stats: "40% higher earnings",
	},
	{
		id: "customer-service",
		title: "Exceptional Customer Service",
		description:
			"Build lasting relationships with customers through excellent communication, follow-up strategies, and problem resolution.",
		image:
			"https://img.freepik.com/free-photo/medium-shot-people-travel-agency-office_23-2150801464.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
		type: "Workshop",
		icon: Users,
		readTime: "20 min workshop",
		difficulty: "Intermediate",
		gradient: "from-rose-400 to-pink-600",
		stats: "98% customer satisfaction",
	},
	{
		id: "business-growth",
		title: "Scaling Your Service Business",
		description:
			"Advanced strategies for growing from solo operator to team leader. Learn about hiring, delegation, and business systems.",
		image:
			"https://img.freepik.com/free-photo/medium-shot-smiley-people-fist-bump_23-2149337248.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
		type: "Masterclass",
		icon: TrendingUp,
		readTime: "45 min class",
		difficulty: "Advanced",
		gradient: "from-indigo-400 to-blue-600",
		stats: "5x business growth",
	},
];

export default function ResourcesSection() {
	return (
		<section id="resources" className="w-full py-12 md:py-24 lg:py-32 bg-white">
			<div className="container px-4 md:px-6">
				<div className="mx-auto max-w-2xl text-center mb-16">
					<Badge className="bg-sky-100 text-sky-800 hover:bg-sky-200 mb-4">
						<BookOpen className="w-3 h-3 mr-1" />
						Learning Resources
					</Badge>
					<h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
						<span className="relative inline-block">
							<span className="relative z-10 bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
								Master your craft
							</span>
							<span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sky-600/30 to-blue-600/30 blur-sm"></span>
						</span>{" "}
						and grow your business
					</h2>
					<p className="text-lg text-gray-600">
						Get the tools and knowledge you need to maximize your success on our
						platform with expert-created content.
					</p>
				</div>

				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{resources.map((resource, index) => (
						<Card
							key={resource.id}
							className="group hover:shadow-xl transition-all duration-300 border-sky-100 overflow-hidden"
						>
							<div className="relative">
								<div
									className={`absolute -inset-1 bg-gradient-to-r ${resource.gradient} opacity-0 group-hover:opacity-10 blur transition-opacity duration-300`}
								></div>
								<CardHeader className="relative p-0">
									<div className="relative overflow-hidden">
										<Image
											src={resource.image || "/placeholder.svg"}
											width={500}
											height={300}
											alt={resource.title}
											className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
										<div className="absolute top-4 left-4 flex gap-2">
											<Badge
												className={`bg-gradient-to-r ${resource.gradient} text-white border-0`}
											>
												{resource.type}
											</Badge>
											<Badge
												variant="secondary"
												className="bg-white/90 text-gray-700"
											>
												{resource.difficulty}
											</Badge>
										</div>
										<div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm">
											<Clock className="w-4 h-4" />
											{resource.readTime}
										</div>
									</div>
								</CardHeader>
								<CardContent className="relative p-6">
									<div className="flex items-center gap-2 mb-3">
										<div
											className={`p-2 rounded-lg bg-gradient-to-br ${resource.gradient} bg-opacity-10`}
										>
											<resource.icon className="w-4 h-4 text-sky-600" />
										</div>
										<div className="text-xs font-medium text-sky-600 bg-sky-50 px-2 py-1 rounded-full">
											{resource.stats}
										</div>
									</div>
									<CardTitle className="text-xl mb-3 group-hover:text-sky-600 transition-colors">
										{resource.title}
									</CardTitle>
									<CardDescription className="text-gray-600 mb-6 leading-relaxed">
										{resource.description}
									</CardDescription>
									<Button
										className={`w-full bg-gradient-to-r ${resource.gradient} hover:opacity-90 text-white border-0`}
									>
										{resource.type === "Video" ? (
											<>
												<Play className="mr-2 h-4 w-4" />
												Watch Now
											</>
										) : (
											<>
												<BookOpen className="mr-2 h-4 w-4" />
												Start Learning
											</>
										)}
										<ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								</CardContent>
							</div>
						</Card>
					))}
				</div>

				{/* CTA Section */}
				<div className="mt-16 max-w-6xl mx-auto text-center">
					<div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-8 md:p-12">
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							Ready to become a <span className="text-sky-500">HomeFix</span>{" "}
							expert?
						</h3>
						<p className="text-gray-600 mb-6 max-w-2xl mx-auto">
							Join our comprehensive training program and get personalized
							guidance from successful service providers.
						</p>
						<Button
							size="lg"
							className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white"
						>
							Join Training Program
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

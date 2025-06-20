"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

interface Testimonial {
	id: string;
	name: string;
	role: string;
	company: string;
	image: string;
	rating: number;
	quote: string;
	stats: {
		label: string;
		value: string;
	};
	gradient: string;
}

const testimonials: Testimonial[] = [
	{
		id: "1",
		name: "Sarah K.",
		role: "Certified Plumber",
		company: "K&K Plumbing Services",
		image:
			"https://img.freepik.com/premium-photo/close-up-portrait-young-happy-woman-red-dress_118342-18050.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
		rating: 5,
		quote:
			"This platform helped me double my client base in 3 months! The lead quality is excellent and the payment system is so reliable. I've never had to chase invoices again.",
		stats: {
			label: "Revenue Growth",
			value: "+200%",
		},
		gradient: "from-sky-400 to-blue-600",
	},
	{
		id: "2",
		name: "Mike R.",
		role: "Licensed Electrician",
		company: "Rodriguez Electric",
		image:
			"https://img.freepik.com/free-photo/handsome-adult-male-posing_23-2148729713.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
		rating: 5,
		quote:
			"I love the flexibility and the professional tools. My business has grown 150% since joining ServiceHub last year. The customer support is outstanding too.",
		stats: {
			label: "Jobs Completed",
			value: "500+",
		},
		gradient: "from-emerald-400 to-teal-600",
	},
	{
		id: "3",
		name: "Lisa M.",
		role: "House Cleaning Service",
		company: "Sparkle Clean Co.",
		image:
			"https://img.freepik.com/premium-photo/serious-face-portrait-woman-studio-with-healthy-skin-natural-beauty-cosmetics-headshot-young-african-female-model-from-south-africa-isolated-white-background-with-facial-glow_590464-189112.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
		rating: 5,
		quote:
			"The customer support is amazing and the app makes managing my bookings so easy. Highly recommend to any service professional looking to grow their business!",
		stats: {
			label: "Client Retention",
			value: "95%",
		},
		gradient: "from-amber-400 to-orange-600",
	},
	{
		id: "4",
		name: "David Chen",
		role: "HVAC Technician",
		company: "Chen Climate Control",
		image:
			"https://img.freepik.com/premium-photo/black-student-with-accomplished-expression-posing-against-white-background_118124-51342.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
		rating: 5,
		quote:
			"ServiceHub transformed my small HVAC business into a thriving operation. The automated scheduling and payment processing saved me hours every week.",
		stats: {
			label: "Time Saved",
			value: "15hrs/week",
		},
		gradient: "from-violet-400 to-purple-600",
	},
];

export default function TestimonialsSection() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextTestimonial = () => {
		setCurrentIndex((prev) => (prev + 1) % testimonials.length);
	};

	const prevTestimonial = () => {
		setCurrentIndex(
			(prev) => (prev - 1 + testimonials.length) % testimonials.length
		);
	};

	const currentTestimonial = testimonials[currentIndex];

	return (
		<section
			id="testimonials"
			className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-sky-50"
		>
			<div className="container px-4 md:px-6">
				<div className="mx-auto max-w-2xl text-center mb-16">
					<Badge className="bg-sky-100 text-sky-800 hover:bg-sky-200 mb-4">
						<Star className="w-3 h-3 mr-1 fill-current" />
						Success Stories
					</Badge>
					<h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
						<span className="relative inline-block">
							<span className="relative z-10 bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
								Trusted by professionals
							</span>
							<span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sky-600/30 to-blue-600/30 blur-sm"></span>
						</span>{" "}
						like you
					</h2>
					<p className="text-lg text-gray-600">
						See how ServiceHub has helped thousands of service providers grow
						their businesses and achieve their goals.
					</p>
				</div>

				{/* Featured Testimonial */}
				<div className="relative mb-16 max-w-6xl mx-auto">
					<div
						className={`absolute -inset-4 bg-gradient-to-r ${currentTestimonial.gradient} opacity-10 blur-xl rounded-3xl`}
					></div>
					<Card className="relative bg-white border-0 shadow-2xl overflow-hidden">
						<div
							className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${currentTestimonial.gradient}`}
						></div>
						<CardContent className="p-8 md:p-12">
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
								<div className="lg:col-span-2">
									<Quote className="w-8 h-8 text-sky-400 mb-4" />
									<blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-6 leading-relaxed">
										"{currentTestimonial.quote}"
									</blockquote>
									<div className="flex items-center gap-4">
										<Image
											src={currentTestimonial.image || "/placeholder.svg"}
											width={60}
											height={60}
											alt={currentTestimonial.name}
											className="rounded-full border-2 border-sky-200"
										/>
										<div>
											<div className="font-semibold text-gray-900">
												{currentTestimonial.name}
											</div>
											<div className="text-sky-600 font-medium">
												{currentTestimonial.role}
											</div>
											<div className="text-sm text-gray-500">
												{currentTestimonial.company}
											</div>
										</div>
										<div className="ml-auto flex items-center gap-1">
											{[...Array(currentTestimonial.rating)].map((_, i) => (
												<Star
													key={i}
													className="w-4 h-4 fill-yellow-400 text-yellow-400"
												/>
											))}
										</div>
									</div>
								</div>
								<div className="text-center lg:text-right">
									<div
										className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${currentTestimonial.gradient} text-white mb-4`}
									>
										<span className="text-2xl font-bold">
											{currentTestimonial.stats.value}
										</span>
									</div>
									<div className="text-sm font-medium text-gray-600">
										{currentTestimonial.stats.label}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Navigation */}
					<div className="flex justify-center items-center gap-4 mt-8">
						<Button
							variant="outline"
							size="sm"
							onClick={prevTestimonial}
							className="rounded-full w-10 h-10 p-0 border-sky-200 hover:bg-sky-50"
						>
							<ChevronLeft className="w-4 h-4" />
						</Button>
						<div className="flex gap-2">
							{testimonials.map((_, index) => (
								<button
									key={index}
									onClick={() => setCurrentIndex(index)}
									className={`w-2 h-2 rounded-full transition-all ${
										index === currentIndex ? "bg-sky-600 w-6" : "bg-gray-300"
									}`}
								/>
							))}
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={nextTestimonial}
							className="rounded-full w-10 h-10 p-0 border-sky-200 hover:bg-sky-50"
						>
							<ChevronRight className="w-4 h-4" />
						</Button>
					</div>
				</div>

				{/* All Testimonials Grid */}
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{testimonials.slice(0, 3).map((testimonial, index) => (
						<Card
							key={testimonial.id}
							className="bg-white border-sky-100 hover:shadow-lg transition-all duration-300 group"
						>
							<CardHeader className="pb-4">
								<div className="flex items-center gap-3">
									<Image
										src={testimonial.image || "/placeholder.svg"}
										width={50}
										height={50}
										alt={testimonial.name}
										className="rounded-full"
									/>
									<div className="flex-1">
										<div className="font-semibold text-gray-900">
											{testimonial.name}
										</div>
										<div className="text-sm text-sky-600">
											{testimonial.role}
										</div>
									</div>
									<div className="flex items-center gap-1">
										{[...Array(testimonial.rating)].map((_, i) => (
											<Star
												key={i}
												className="w-3 h-3 fill-yellow-400 text-yellow-400"
											/>
										))}
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 text-sm leading-relaxed">
									"{testimonial.quote.substring(0, 120)}..."
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

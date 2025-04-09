"use client";

import { useState } from "react";
import Image from "next/image";
// import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

type CleaningCard = {
	id: number;
	title: string;
	description: string;
	date: string;
	image: string;
};

const cleaningCards: CleaningCard[] = [
	{
		id: 1,
		title: "55 Best Cleaning Tips for Every Room in Your Home",
		description:
			"Conducting all cleaning tasks with professionalism, including arriving on time.",
		date: "17 March 2024",
		image:
			"https://img.freepik.com/free-photo/surprised-holding-bucket-cleaning-tools-young-africanamerican-cleaner-male-uniform-with-gloves-isolated-green-background_141793-134917.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
	},
	{
		id: 2,
		title: "Tips For Cleaning Your Home Before A Party",
		description:
			"Start up money or a decent amount of savings will get you started cleaning business Suspen disse.",
		date: "29 March 2024",
		image:
			"https://img.freepik.com/free-photo/young-african-american-man-doing-laundry_273609-23240.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
	},
	{
		id: 3,
		title: "6 Cleaning Tips For When You Have Allergies",
		description:
			"Conducting all cleaning tasks with professionalism, including arriving on time.",
		date: "28 August 2024",
		image:
			"https://img.freepik.com/premium-photo/vertical-full-length-portrait-african-american-handyman-assembling-furniture-home-interior_236854-28659.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
	},
	{
		id: 4,
		title: "For the best Affordable tv mounting",
		description:
			"Conducting all cleaning tasks with professionalism, including arriving on time.",
		date: "1 April 2025",
		image:
			"https://img.freepik.com/premium-photo/installing-mount-tv_51195-3098.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
	},
];

export function Providers() {
	return (
		<div className="max-w-7xl mx-auto">
			<h2 className="text-3xl font-bold text-center mb-8">
				Cleaning Tips, Industry News, and More
			</h2>

			<div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
				{cleaningCards.map((card) => (
					<Card
						key={card.id}
						className="group lg:max-w-[20rem] md:max-w-[25rem] sm:max-w-[27rem] overflow-hidden relative rounded-2xl transition-all duration-300 border-0 shadow-md h-[30rem]"
					>
						<div className="relative h-full w-full">
							<Image
								src={card.image || "/placeholder.svg"}
								alt={card.title}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</div>
						<div className="absolute bottom-0 text-white ">
							<div className="p-5 relative bg-black/50 rounded-2xl  group-hover:bg-blue-500/95 backdrop-blur-[2px]">
								<h3 className="text-xl font-semibold mb-2">{card.title}</h3>
								<p className="text-sm mb-4 opacity-90">{card.description}</p>
								<div className="flex justify-between items-center">
									<a
										href="#"
										className="text-sm font-medium text-emerald-600 group-hover:text-yellow-400 hover:underline"
									>
										Discover More
									</a>
									<span className="text-xs opacity-70">{card.date}</span>
								</div>
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}

interface IServices {
	id: number;
	title: string;
	description: string;
	image: string;
	rating: number;
	providers: number;
}
const services = [
	{
		id: 1,
		title: "AC Installation & Repair",
		description:
			"Professional installation, maintenance, and repair services for all AC brands.",
		image:
			"https://img.freepik.com/free-photo/surprised-holding-bucket-cleaning-tools-young-africanamerican-cleaner-male-uniform-with-gloves-isolated-green-background_141793-134917.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		rating: 4.8,
		providers: 24,
	},
	{
		id: 2,
		title: "Plumbing Services",
		description:
			"From leaky faucets to complete pipe installations, our plumbers handle it all.",
		image:
			"https://img.freepik.com/premium-photo/vertical-full-length-portrait-african-american-handyman-assembling-furniture-home-interior_236854-28659.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		rating: 4.7,
		providers: 36,
	},
	{
		id: 3,
		title: "Electrical Work",
		description:
			"Licensed electricians for installations, repairs, and electrical emergencies.",
		image:
			"https://img.freepik.com/premium-photo/vertical-full-length-portrait-african-american-handyman-assembling-furniture-home-interior_236854-28659.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		rating: 4.9,
		providers: 18,
	},
	{
		id: 4,
		title: "House Cleaning",
		description:
			"Professional cleaning services for homes of all sizes, tailored to your needs.",
		image:
			"https://img.freepik.com/premium-photo/installing-mount-tv_51195-3098.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		rating: 4.6,
		providers: 42,
	},
	{
		id: 5,
		title: "Painting Services",
		description:
			"Interior and exterior painting with premium materials and expert techniques.",
		image:
			"https://img.freepik.com/free-photo/gardener-with-weedwacker-cutting-grass-garden_329181-20539.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		rating: 4.7,
		providers: 29,
	},
	{
		id: 6,
		title: "Lawn & Garden Care",
		description:
			"Complete lawn maintenance, landscaping, and garden design services.",
		image:
			"https://img.freepik.com/premium-photo/team-dark-skinned-servicemen-orange-suits-putting-television-set-coffee-table-plugging-it_274689-24048.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		rating: 4.5,
		providers: 31,
	},
];

function ServiceCard({ service }: { service: IServices }) {
	return (
		<Card className="group lg:max-w-[20rem] md:max-w-[25rem] sm:max-w-[27rem] overflow-hidden relative rounded-2xl transition-all duration-300 border-0 shadow-md h-[30rem]">
			<div className="relative h-full w-full">
				<Image
					src={service.image || "/placeholder.svg"}
					alt={service.title}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>
			<div className="absolute bottom-0 text-white ">
				<div className="p-5 relative bg-black/50 rounded-2xl  group-hover:bg-blue-500/95 backdrop-blur-[2px]">
					<h3 className="text-lg font-bold font-[Sora] mb-2">
						{service.title}
					</h3>
					<p className="text-gray-600 text-sm mb-4">{service.description}</p>
					<div className="flex items-center text-sm text-gray-500 mb-4">
						<span className="flex items-center">
							<Star className="h-4 w-4 text-yellow-400 mr-1" />
							{service.rating}
						</span>
						<span className="mx-2">•</span>
						<span>{service.providers} providers</span>
					</div>
				</div>
			</div>
			<CardFooter className="p-6 pt-0">
				<Button
					className="w-full bg-blue-100 text-blue-800 hover:bg-blue-200"
					asChild
				>
					<Link
						href="#"
						// className="text-sm font-medium text-emerald-600 group-hover:text-yellow-400 hover:underline"
					>
						View Providers
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

function Bubble({
	x,
	y,
	size,
	color,
}: {
	x: number;
	y: number;
	size: number;
	color: string;
}) {
	return (
		<motion.circle
			cx={x}
			cy={y}
			r={size}
			fill={color}
			initial={{ opacity: 0, scale: 0 }}
			animate={{
				opacity: [0.7, 0.3, 0.7],
				scale: [1, 1.2, 1],
				x: x + Math.random() * 100 - 50,
				y: y + Math.random() * 100 - 50,
			}}
			transition={{
				duration: 5 + Math.random() * 10,
				repeat: Number.POSITIVE_INFINITY,
				repeatType: "reverse",
			}}
		/>
	);
}

// Sample avatar data - in a real app, this would come from an API or database
const avatars = [
	{
		id: 1,
		src: "https://img.freepik.com/free-photo/medium-shot-woman-relaxing-home_23-2150307065.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		alt: "Avatar 1",
		initials: "A1",
	},
	{
		id: 2,
		src: "https://img.freepik.com/free-photo/people-showing-support-respect-with-yellow-background-suicide-prevention-day_23-2151607937.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		alt: "Avatar 2",
		initials: "A2",
	},
	{
		id: 3,
		src: "https://img.freepik.com/free-photo/confident-african-businesswoman-smiling-closeup-portrait-jobs-career-campaign_53876-129412.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		alt: "Avatar 3",
		initials: "A3",
	},
	{
		id: 4,
		src: "https://img.freepik.com/free-photo/confident-business-woman-portrait-smiling-face_53876-137693.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		alt: "Avatar 4",
		initials: "A4",
	},
	{
		id: 5,
		src: "https://img.freepik.com/premium-photo/portrait-african-american-man_53876-45148.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		alt: "Avatar 5",
		initials: "A5",
	},
];

function AvatarGroup() {
	return (
		<div className="">
			<div className="relative flex items-center">
				{avatars.map((avatar, index) => (
					<div
						key={avatar.id}
						className="relative"
						style={{
							marginLeft: index === 0 ? "0" : "-9px",
							zIndex: avatars.length - index,
						}}
					>
						<Avatar className="h-12 w-12 md:h-14 md:w-14 border-2 border-white rounded-full">
							<AvatarImage
								src={avatar.src || "/placeholder.svg"}
								alt={avatar.alt}
								className="object-cover"
							/>
							<AvatarFallback>{avatar.initials}</AvatarFallback>
						</Avatar>
					</div>
				))}
			</div>
		</div>
	);
}

function FloatingBubbles() {
	const [bubbles, setBubbles] = useState<
		Array<{ id: number; x: number; y: number; size: number; color: string }>
	>([]);

	useEffect(() => {
		const newBubbles = Array.from({ length: 50 }, (_, i) => ({
			id: i,
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			size: Math.random() * 20 + 5,
			color: `rgba(${Math.random() * 255},${Math.random() * 255},${
				Math.random() * 255
			},0.3)`,
		}));
		setBubbles(newBubbles);
	}, []);

	return (
		<div className="absolute inset-0 pointer-events-none">
			<svg className="w-full h-full">
				<title>Floating Bubbles</title>
				{bubbles.map((bubble) => (
					<Bubble key={bubble.id} {...bubble} />
				))}
			</svg>
		</div>
	);
}

export default function CtaV6({
	title = "Floating Bubbles",
}: {
	title?: string;
}) {
	const words = title.split(" ");

	return (
		<div className="relative h-[80vh] mb-6 -mt-8 rounded-3xl  w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
			<FloatingBubbles />

			<div className="relative z-10 container  mx-auto px-4 md:px-6 text-center">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 2 }}
					className="max-w-4xl mx-auto"
				>
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
							Ready to Book Your First Service?
						</h2>
						<p className="mt-6 text-lg leading-8 text-muted-foreground">
							Join thousands of satisfied homeowners who trust our platform for
							their home service needs.
						</p>
						<div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
							<Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
								Sign Up as a Homeowner
							</Button>
							<Button
								variant="outline"
								className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
							>
								Join as a Provider
							</Button>
						</div>
						<p className="mt-6 text-sm text-gray-600">
							Trusted by 1,200+ users in your area
						</p>
						<div className=" mt-4 flex items-center justify-center gap-4  ">
							<AvatarGroup />
							<div className="flex">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className="h-4 w-4 text-yellow-400 fill-yellow-400"
									/>
								))}
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

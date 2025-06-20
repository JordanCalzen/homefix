"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export function Hero() {
	return (
		<section className="py-12 md:py-16 relative">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<motion.div
					className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/10 dark:bg-primary/20 rounded-full"
					animate={{
						scale: [1, 1.1, 1],
						rotate: [0, 90, 0],
					}}
					transition={{
						duration: 20,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
				/>
				<motion.div
					className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary/10 dark:bg-secondary/20 rounded-full"
					animate={{
						scale: [1, 1.2, 1],
						rotate: [0, -90, 0],
					}}
					transition={{
						duration: 25,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
				/>
				<motion.div
					className="absolute top-1/4 left-1/4 w-12 h-12 bg-primary/20 dark:bg-primary/30 rounded-full"
					animate={{
						y: [0, -20, 0],
						x: [0, 20, 0],
					}}
					transition={{
						duration: 5,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute top-1/4 left-1/4 w-12 h-12 bg-primary/20 dark:bg-primary/30 rounded-full"
					animate={{
						y: [0, -20, 0],
						x: [0, 20, 0],
					}}
					transition={{
						duration: 5,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute top-1/2 left-1/2 w-12 h-12 bg-primary/20 dark:bg-primary/30 rounded-full"
					animate={{
						y: [0, -20, 0],
						x: [0, 20, 0],
					}}
					transition={{
						duration: 5,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute bottom-[10%] right-1/4 w-8 h-8 bg-secondary/20 dark:bg-secondary/30 rounded-full"
					animate={{
						y: [0, 30, 0],
						x: [0, -30, 0],
					}}
					transition={{
						duration: 7,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
			</div>
			<div className=" px-2">
				<div className="max-w-3xl mx-auto text-center">
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-[Sora] text-gray-900 mb-4">
						Find the Perfect Service Provider for Your Home
					</h1>
					<p className="text-lg text-gray-600 mb-8">
						Trusted professionals for all your home service needs, vetted and
						reviewed by your community.
					</p>
					<div className="relative max-w-xl mx-auto">
						<div className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm border">
							<div className="flex-1">
								<Input
									type="text"
									placeholder="What service do you need?"
									className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
								/>
							</div>
							<div className="w-px h-8 bg-gray-200"></div>
							<div className="flex-1">
								<Input
									type="text"
									placeholder="Your location"
									className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
								/>
							</div>
							<Button className="bg-blue-600 hover:bg-blue-700">
								<Search className="h-4 w-4 mr-2" />
								Search
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

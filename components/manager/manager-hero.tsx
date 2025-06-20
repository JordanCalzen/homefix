"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Briefcase, Shield, Award } from "lucide-react";
import Link from "next/link";

const backgroundImages = [
	"https://img.freepik.com/premium-photo/young-african-male-technician-repairing-air-conditioner_255667-67938.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
	"https://img.freepik.com/premium-photo/electrician-installing-led-light-bulbs-ceiling-lamp_1048944-4083658.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
	"https://img.freepik.com/premium-photo/young-afro-american-plumber-man-repairing-fixing-faucet-shower-stall-side-view-portrait-black-professional-skilled-handyman-blue-overalls-repairing-shower-service-assemble-concept_183219-8441.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
	"https://img.freepik.com/premium-photo/vertical-full-length-portrait-african-american-handyman-assembling-furniture-home-interior_236854-28659.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
	"https://img.freepik.com/premium-photo/cctv-security-system-alarm-home-equipment_1016675-2376.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
	"https://img.freepik.com/premium-photo/asian-builder-painting-primer-white-color-concrete-wall-inside-house-construction-site_43514-1382.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_hybrid&w=740",
];

export default function HeroSection() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex(
				(prevIndex) => (prevIndex + 1) % backgroundImages.length
			);
		}, 5000); // Change image every 5 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="relative   text-white overflow-hidden">
			<AnimatePresence mode="wait">
				<motion.div
					key={backgroundImages[currentImageIndex]}
					initial={{ opacity: 0.9 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className="absolute inset-0 bg-cover bg-black bg-center"
					style={{
						// backgroundImage: "url('/images/hero.webp')",
						filter: "brightness(1)",
					}}
				>
					<Image
						src={backgroundImages[currentImageIndex] || "/placeholder.svg"}
						alt="Professional service provider"
						fill
						style={{ objectFit: "cover" }}
						quality={100}
						className="opacity-20"
					/>
				</motion.div>
			</AnimatePresence>
			<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-12"
				>
					<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
						Start Offering Your Services on
						<br />
						<span className="text-sky-500">HomeFix</span>
					</h1>
					<p className="text-xl md:text-2xl text-sky-100 max-w-3xl mx-auto">
						Join thousands of trusted professionals connecting with homeowners
						looking for reliable, local experts. Grow your business with
						verified leads and secure payments.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
				>
					<Link
						href="/onboarding?=manager"
						className="bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition duration-300"
					>
						Get Started Now
						<ArrowRight className="ml-2 h-5 w-5" />
					</Link>
					<a
						href="/demo"
						className="bg-transparent border-2 border-sky-300 text-sky-300 hover:bg-sky-300 hover:text-sky-900 font-bold py-3 px-8 rounded-full transition duration-300"
					>
						Watch Demo
					</a>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
				>
					<div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6">
						<Briefcase className="w-12 h-12 text-sky-300 mb-4 mx-auto" />
						<h3 className="text-xl font-semibold mb-2">
							Verified Client Leads
						</h3>
						<p className="text-sky-100">
							Get matched with pre-screened customers actively looking for your
							services
						</p>
					</div>
					<div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6">
						<Shield className="w-12 h-12 text-sky-300 mb-4 mx-auto" />
						<h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
						<p className="text-sky-100">
							Get paid fast with our secure payment system
						</p>
					</div>
					<div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6">
						<Award className="w-12 h-12 text-sky-300 mb-4 mx-auto" />
						<h3 className="text-xl font-semibold mb-2">
							Build Your Reputation
						</h3>
						<p className="text-sky-100">
							Earn reviews and build a stellar online presence
						</p>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

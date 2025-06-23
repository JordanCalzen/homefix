"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import { Calendar } from "../ui/calendar";

const specialties = [
	"Plumber",
	"HVAC Specialist",
	"Cleaner",
	"Electrician",
	"Painter",
];

export default function Hero() {
	const [specialty, setSpecialty] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setSpecialty((prev) => (prev + 1) % specialties.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const router = useRouter();
	const [searchParams, setSearchParams] = useState({
		q: "",
		location: "",
		date: "",
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSearchParams((prev) => ({ ...prev, [name]: value }));
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();

		// Build the query string
		const params = new URLSearchParams();

		if (searchParams.q) {
			params.append("q", searchParams.q);
		}

		if (searchParams.location) {
			params.append("location", searchParams.location);
		}

		if (searchParams.date) {
			params.append("date", searchParams.date);
		}

		// Navigate to the  page with the search parameters
		const queryString = params.toString();
		router.push(`/${queryString ? `?${queryString}` : ""}`);
	};

	return (
		<div className="relative min-h-screen flex items-center justify-center overflow-hidden">
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{
					backgroundImage:
						"url('https://img.freepik.com/free-photo/full-shot-man-pushing-elevator-button_23-2149345535.jpg?uid=R177297642&ga=GA1.1.1851528187.1747311725&semt=ais_items_boosted&w=740')",
					filter: "brightness(0.5)",
				}}
			/>
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
				<motion.h1
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
				>
					Find the right{" "}
					<span className="text-blue-500">{specialties[specialty]}</span>
					<br />
					right now
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto"
				>
					Need a hand with home services? HomeFix links you to reliable trusted
					reliable service providers pros—fast, easy, and hassle-free.
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="max-w-4xl mx-auto"
				>
					<form
						onSubmit={handleSearch}
						className="grid md:grid-cols-12 gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl"
					>
						<div className="md:col-span-5 relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
							<Input
								name="q"
								value={searchParams.q}
								onChange={handleInputChange}
								placeholder="Search events..."
								className="pl-10 bg-white/10 border-white/10 text-white placeholder:text-gray-400"
							/>
						</div>
						<div className="md:col-span-3 relative">
							<MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
							<Input
								name="location"
								value={searchParams.location}
								onChange={handleInputChange}
								placeholder="Location"
								className="pl-10 bg-white/10 border-white/10 text-white placeholder:text-gray-400"
							/>
						</div>
						<div className="md:col-span-3 relative">
							<Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
							<Input
								name="date"
								value={searchParams.date}
								onChange={handleInputChange}
								type="date"
								className="pl-10 bg-white/10 border-white/10 text-white placeholder:text-gray-400"
							/>
						</div>
						<div className="md:col-span-1">
							<Button
								type="submit"
								className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-blue-500"
							>
								Search
							</Button>
						</div>
					</form>
				</motion.div>
			</div>
		</div>
	);
}

function SearchBarV1() {
	const [query, setQuery] = useState("");
	const router = useRouter();
	function handleSearch(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		router.push(`/search?query=${query}`);
		setQuery("");
	}
	return (
		<form className="" onSubmit={handleSearch}>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				className="flex justify-center"
			>
				<div className="relative max-w-xl w-full">
					<input
						type="text"
						placeholder="Search for doctors..."
						className="w-full px-6 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
						onChange={(e) => setQuery(e.target.value)}
						value={query}
					/>
					<button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-300">
						<Search className="w-6 h-6" />
					</button>
				</div>
			</motion.div>
		</form>
	);
}

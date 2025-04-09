import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ServiceCard() {
	const services = [
		{
			title: "Regular Home Cleaning",
			description:
				"Conducting all cleaning with professionalism, including  on time.",
			image:
				"https://img.freepik.com/free-photo/man-doing-professional-home-cleaning-service_23-2150359014.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		},
		{
			title: "Deep Cleaning",
			description:
				"Conducting all cleaning tasks with professionalism, including arriving on time.",
			image:
				"https://img.freepik.com/free-photo/full-shot-man-pushing-elevator-button_23-2149345535.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		},
		{
			title: "Deep Cleaning",
			description:
				"Conducting all cleaning tasks with professionalism, including arriving on time.",
			image:
				"https://img.freepik.com/free-photo/full-shot-man-pushing-elevator-button_23-2149345535.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		},
		{
			title: "Move-In/Out Cleaning",
			description:
				"Conducting all cleaning tasks with professionalism, including arriving on time.",
			image:
				"https://img.freepik.com/premium-photo/side-view-female-friends-using-digital-tablet-while-standing-gym_1048944-891231.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		},
	];

	return (
		<div className="container mx-auto py-12 px-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{services.map((service, index) => (
					<Card
						key={index}
						className={
							"overflow-hidden group lg:max-w-[20rem] md:max-w-[25rem] sm:max-w-[27rem] transition-colors duration-300  hover:bg-blue-500 hover:text-white  border-none shadow-md"
						}
					>
						<CardHeader className="pb-2">
							<div className="flex justify-between items-center">
								<CardTitle className="text-xl font-bold">
									{service.title}
								</CardTitle>
								<div
									className="rounded-full p-2
										group-hover:bg-yellow-400 bg-white border-2 border-yellow-400 text-black"
								>
									<ArrowRight
										className="h-5 w-5 -rotate-45 
											group-hover-text-white group-hover:text-white"
									/>
								</div>
							</div>
							<p className="text-sm mt-1 opacity-90">{service.description}</p>
						</CardHeader>
						<CardContent className="p-2">
							<div className="relative rounded-xl overflow-hidden h-64 w-full">
								<Image
									src={service.image || "/placeholder.svg"}
									alt={service.title}
									fill
									className="object-cover"
								/>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

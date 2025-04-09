import { FeaturedPrompts } from "@/components/frontend/featured";
import { Hero } from "@/components/frontend/hero";
import { Providers } from "@/components/frontend/providers";
import ServiceCard from "@/components/frontend/service-card";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1">
				<Hero />
				<FeaturedPrompts />
				<ServiceCard />
				<Providers />
			</main>
		</div>
	);
}

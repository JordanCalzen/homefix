import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface PopularServiceCardProps {
	service: {
		id: string;
		name: string;
		icon: LucideIcon;
		price: string;
		rating: number;
	};
}

export function PopularServiceCard({ service }: PopularServiceCardProps) {
	const Icon = service.icon;

	return (
		<div className="flex items-center gap-3">
			<div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
				<Icon className="h-5 w-5 text-primary" />
			</div>
			<div className="flex-1">
				<h3 className="font-medium">{service.name}</h3>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<span>{service.price}</span>
					<span>•</span>
					<div className="flex items-center">
						<Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
						<span>{service.rating}</span>
					</div>
				</div>
			</div>
			<Button variant="ghost" size="sm">
				Book
			</Button>
		</div>
	);
}

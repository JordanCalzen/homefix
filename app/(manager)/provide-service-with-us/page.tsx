import ManagerHeader from "@/components/manager/manager-header";
import BenefitsSection from "@/components/manager/interative-benefit-section";
import TestimonialsSection from "@/components/manager/testimonial-section";
import ResourcesSection from "@/components/manager/resources-section";
import PlanOptionsSection from "@/components/manager/plan-option-section";
import FAQSection from "@/components/manager/faq";
import HeroSection from "@/components/manager/manager-hero";

export default function ProviderWelcome() {
	return (
		<div className="flex flex-col min-h-screen">
			{/* Header */}
			<ManagerHeader />

			<main className="flex-1 ">
				{/* Hero Section */}
				<HeroSection />

				{/* Value Proposition Section */}
				<BenefitsSection />

				{/* Testimonials Section */}
				<TestimonialsSection />

				{/* Resources Section */}
				<ResourcesSection />

				{/* Plan Options Section */}
				<PlanOptionsSection />

				{/* FAQ Section */}
				<FAQSection />
			</main>
		</div>
	);
}

import Navbar from "@/components/common/navbar/Navbar";
import Footer from "@/components/common/Footer";

import PortfolioHero from "@/components/portfolio/hero/PortfolioHero";
import PortfolioCategories from "@/components/portfolio/categories/PortfolioCategories";
import ProjectsGrid from "@/components/portfolio/projects/ProjectsGrid";
import PortfolioStats from "@/components/portfolio/stats/PortfolioStats";
import Workflow from "@/components/portfolio/workflow/Workflow";
import ClientStories from "@/components/portfolio/testimonial/ClientStories";
import PortfolioCTA from "@/components/portfolio/cta/PortfolioCTA";

export default function PortfolioPage() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
        <PortfolioHero />

        <PortfolioCategories />

        <ProjectsGrid />

        <PortfolioStats />

        <Workflow />

        <ClientStories />

        <PortfolioCTA />
      </main>

      <Footer />
    </>
  );
}
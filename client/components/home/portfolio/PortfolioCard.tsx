import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { ArrowUpRight } from "lucide-react";

import BrowserMockup from "../BrowserMockup";

interface Props {
  project: {
    title: string;
    category: string;
    description: string;
    gradient: string;
    status: string;
  };
}

export default function PortfolioCard({
  project,
}: Props) {
  return (
    <Card
      hover
      padding="none"
      shadow="lg"
      className="overflow-hidden"
    >

      <BrowserMockup
        gradient={project.gradient}
      />

      <div className="p-8">

        <div className="flex items-center justify-between">

          <span className="rounded-full bg-blue-100 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">

            {project.category}

          </span>

          <span className="text-sm font-semibold text-emerald-600">

            {project.status}

          </span>

        </div>

        <h3 className="mt-6 text-3xl font-black text-slate-900">

          {project.title}

        </h3>

        <p className="mt-5 leading-8 text-slate-600">

          {project.description}

        </p>

        <div className="mt-8 flex items-center justify-between">

          <Button variant="outline">

            View Case Study

          </Button>

          <ArrowUpRight
            size={22}
            className="text-slate-400 transition group-hover:rotate-45"
          />

        </div>

      </div>

    </Card>
  );
}
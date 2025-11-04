"use client";

import React, { useState } from "react";
import HeadingBadge from "@/app/components/heading-badge";
import { SpotlightCard } from "@/app/components/ui/spotlight-card";
import { Building2, Calendar, ChevronRight, Briefcase } from "lucide-react";
import { cn } from "@/app/lib/utils";

type Experience = {
  company: string;
  companyLink: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
};

const experiences: Experience[] = [
  {
    company: "Hitachi Mgrm Net",
    companyLink: "https://www.linkedin.com/company/hitachi-mgrm",
    position: "Software Developer",
    duration: "June 2024 - Present",
    description: [
      "Led CRM platform development for 8M+ users across 5000+ schools, using Next.js and a scalable micro-frontend architecture.",
      "Implemented real-time calling in the agent module with WebRTC, JsSIP, Asterisk, and Socket.IO, improving agent response time by 40%.",
      "Integrated AI-driven call summaries with RingCentral and added Jitsi for seamless in-browser video calls, reducing manual documentation by 90%.",
      "Architected Mid-Day Meal system for 3000+ schools using Next.js, Zustand, and React Query, automating meal tracking and staff payouts.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Mantine",
      "WebRTC",
      "JsSip",
      "NodeJS",
      "Zustand",
      "React Query",
    ],
  },
  {
    company: "Laminaar Aviation Infotech",
    companyLink:
      "https://www.linkedin.com/company/laminaar-aviation-infotech-private-limited/",
    position: "Associate Software Engineer (Impacted by mass layoffs)",
    duration: "Feb 2023 - March 2024",
    description: [
      "Led a team of 4 to build airline operational modules using React.js, RTK and a custom MUI library.",
      "Achieved 80%+ test coverage using Jest, RTL and MSW, maintaining <5% code duplication (SonarQube).",
      "Deployed Node.js services on AWS EC2 with PM2, increasing uptime and reliability for airline crew systems.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Jest",
      "React Testing Library",
      "Pupeteer",
      "MS SQL",
    ],
  },
  // {
  //   company: "Startlazaa Pvt Ltd",
  //   companyLink: "https://www.linkedin.com/company/startlazaa",
  //   position: "ReactJS Developer - Contract Role",
  //   duration: "Aug 2022 - December 2024",
  //   description: [
  //     "Built responsive job portal modules in ReactJS + Tailwind, increasing engagement by 25%",
  //     "Developed OTP-based authentication using JWT and Socket.IO, reducing login time by 30%.",
  //     "Improved API integration and data fetching efficiency between frontend and Node.js backend.",
  //   ],
  //   technologies: [
  //     "React",
  //     "TypeScript",
  //     "Node.js",
  //     "Websockets",
  //     "React Hook Form",
  //     "MongoDB",
  //   ],
  // },
  {
    company: "Self Learning & Short-Term Remote Engagements",
    companyLink: "",
    position: "Career Break (Upskilling & Preparation)",
    duration: "August 2022 - January 2023",
    description: [
      "Focused on government exam preparation while enhancing technical proficiency through self-learning and freelance projects.",
      "Built small React and Node.js projects to strengthen full-stack fundamentals.",
      "Explored PostgreSQL, JavaScript, and modern frameworks like Next.js during this period.",
    ],
    technologies: ["React", "Next.js", "Node.js", "JavaScript", "PostgreSQL"],
  },
  {
    company: "Cognizant",
    companyLink: "https://www.linkedin.com/company/cognizant",
    position: "Programmer Analyst Trainee",
    duration: "July 2021 - July 2022",
    description: [
      "Implemented pharma dashboards using React + Material UI V5 and REST APIs with responsive UI across all major browsers.",
      "Ensured accessibility compliance and delivered component-driven frontends aligned with UX standards.",
      "Integrated AWS services (EC2, S3, IAM) via CI/CD (Jenkins) to streamline deployments.",
    ],
    technologies: [
      "React",
      "JavaScript",
      "REST APIs",
      "Material UI",
      "MongoDB",
      "Node.js",
    ],
  },
];

export function ExperienceSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="pt-10">
      <div className="space-y-8">
        <div className="flex flex-col items-start justify-start gap-5">
          <HeadingBadge title="Experience" icon={<Briefcase size={14} />} />
          <div className="space-y-2">
            <h3 className="text-3xl font-semibold">
              Work{" "}
              <span className="text-[#08090a] dark:text-emerald-500">
                Experience
              </span>
            </h3>
            <p className="text-[#737373] dark:text-[#A1A1AA] text-sm">
              Companies I&apos;ve worked with and the projects I&apos;ve been
              involved in
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {experiences.map((experience, index) => (
            <SpotlightCard
              key={index}
              className={cn(
                "p-6 cursor-pointer transition-all duration-300 group rounded-sm border border-gray-200/80 dark:border-gray-800/50 ease-in-out hover:border-gray-900/30 dark:hover:border-emerald-500/30",
                "hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-emerald-500/5",
                expandedIndex === index ? "bg-opacity-10" : ""
              )}
              gradientColor="rgba(34, 197, 94, 0.15)"
              lightGradientColor="rgba(8, 9, 10, 0.15)"
              onClick={() => toggleExpand(index)}
              disableScale={true}
            >
              <div className="space-y-4">
                <div className="flex xs:flex-row flex-col items-start justify-between gap-4">
                  <section className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium text-[#08090a] dark:text-white">
                        {experience.position}
                      </h3>
                      <ChevronRight
                        className={cn(
                          "w-5 h-5 text-[#08090a] dark:text-emerald-500 transition-all duration-500",
                          "transform-gpu opacity-0 scale-95 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-hover:scale-100",
                          "ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                          expandedIndex === index ? "rotate-90" : "rotate-0",
                          expandedIndex === index
                            ? "opacity-100 translate-x-0 scale-100"
                            : ""
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-[#737373] dark:text-[#A1A1AA]">
                      <Building2 className="w-4 h-4" />
                      <span>{experience.company}</span>
                    </div>
                  </section>
                  <section className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-[#191a1a] text-[#08090a] dark:text-emerald-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{experience.duration}</span>
                  </section>
                </div>

                <div
                  className={cn(
                    "grid transition-all duration-500 ease-in-out",
                    expandedIndex === index
                      ? "grid-rows-[1fr] opacity-100 translate-y-0"
                      : "grid-rows-[0fr] opacity-0 -translate-y-4"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pt-4 space-y-4">
                      <ul className="space-y-2 text-[#737373] dark:text-[#A1A1AA] text-sm">
                        {experience.description.map((item, i) => (
                          <li
                            key={i}
                            style={{ transitionDelay: `${i * 100}ms` }}
                            className={cn(
                              "list-disc list-inside transition-all duration-500",
                              "transform-gpu",
                              expandedIndex === index
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                            )}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, i) => (
                          <span
                            key={i}
                            style={{
                              transitionDelay:
                                expandedIndex === index
                                  ? `${i * 100 + 300}ms`
                                  : "0ms",
                            }}
                            className={cn(
                              "px-2 py-1 text-xs rounded-sm font-medium bg-white dark:bg-[#0a0a0a] border border-gray-200/80 dark:border-gray-800/50 text-[#737373] dark:text-[#A1A1AA] group-hover:border-gray-900/30 dark:group-hover:border-emerald-500/30 transition-all duration-300",
                              expandedIndex === index
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                            )}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

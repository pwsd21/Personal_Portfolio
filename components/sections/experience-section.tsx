"use client";

import React, { useState } from "react";
import HeadingBadge from "@/components/heading-badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Building2, Calendar, ChevronRight, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

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
    duration: "July 2024 - Present",
    description: [
      "Led the frontend development of a CRM module for government schools in Meghalaya, built using Next.js, supporting over 2 million users.",
      "Architected real-time call integration for the agent module using WebRTC, JsSIP, Asterisk, and SocketIO.",
      "Integrated Aritficial Intelligence using RCWebphone to generate transcript and summary of the calls.",
      "Developed the Mid-Day Meal Module for Government Schools in Odisha using Next.js, Zustand, React Query.",
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
    position: "Associate Software Engineer",
    duration: "Feb 2023 - June 2024",
    description: [
      "Developed L&T Module for Airlines Software",
      "Covered Unit and End-to-End Test Cases",
      "Created Database tables using MS SQL and wrote backend stored procedures.",
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
  //   position: "ReactJS Developer ( Contract Role )",
  //   duration: "Aug 2022 - December 2024",
  //   description: [
  //     "Developed a responsive online jobs portal using React.js.",
  //     "Implemented robust form validation using React Hook Form and Yup.",
  //     "Built secure OTP-based authentication with JWT, ensuring safe and reliable user login flows.",
  //     "Integrated Socket.IO to enable real-time updates.",
  //     "Created optimized Node.js APIs with MongoDB, reducing response times.",
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
    company: "Cognizant",
    companyLink: "https://www.linkedin.com/company/cognizant",
    position: "Programmer Analyst Trainee",
    duration: "June 2021 - December 2022",
    description: [
      "Developed an Inventory Management Platform for pharma-based client, emphasising REST API integration.",
      "Crafted responsive and compatible modules using Material UI",
      "Created optimized Node.js APIs with MongoDB, reducing response times",
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

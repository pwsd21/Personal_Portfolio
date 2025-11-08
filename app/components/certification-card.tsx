"use client";

import Link from "next/link";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { SpotlightCard } from "@/app/components/ui/spotlight-card";

type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link: string;
  skills: string[];
  color: "emerald";
};

const colorMap = {
  emerald: {
    badge:
      "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400",
    hover: "group-hover:border-emerald-500/30",
  },
  blue: {
    badge:
      "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400",
    hover: "group-hover:border-blue-500/30",
  },
  purple: {
    badge:
      "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900/50 text-purple-600 dark:text-purple-400",
    hover: "group-hover:border-purple-500/30",
  },
  orange: {
    badge:
      "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900/50 text-orange-600 dark:text-orange-400",
    hover: "group-hover:border-orange-500/30",
  },
};

export function CertificationCard({
  certification,
}: {
  certification: Certification;
}) {
  const colors = colorMap[certification.color];

  return (
    <Link
      href={certification.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <SpotlightCard
        gradientColor="rgba(34, 197, 94, 0.10)"
        lightGradientColor="rgba(15, 23, 42, 0.15)"
        spotlightSize={250}
        disableScale={true}
        className="overflow-hidden rounded-sm border border-gray-200/80 dark:border-gray-800/50 transition-all duration-300 ease-in-out hover:border-gray-900/30 dark:hover:border-emerald-500/30 h-full"
      >
        <div className="p-5 space-y-4">
          {/* Header with Issuer Badge and Verified */}
          <div className="flex items-start justify-between">
            <div
              className={` rounded-sm text-xs font-bold border ${colors.badge}`}
            >
              {certification.issuer}
            </div>
            <div className="flex items-center gap-1 text-emerald-500">
              <CheckCircle2 size={16} />
              <span className="text-xs font-medium">Verified</span>
            </div>
          </div>

          {/* Title */}
          <h4 className="text-lg font-semibold text-[#737373] dark:text-white group-hover:text-[#08090a]/90 dark:group-hover:text-emerald-500/90 duration-300 ease-in-out transition-colors">
            {certification.title}
          </h4>

          {/* Date & Credential ID */}
          <div className="flex flex-col gap-1 text-xs text-[#737373] dark:text-[#A1A1AA]">
            <div className="flex items-center gap-2">
              <span className="font-medium">Issued:</span>
              <span>{certification.date}</span>
            </div>
            {certification.credentialId && (
              <div className="flex items-center gap-2">
                <span className="font-medium">ID:</span>
                <span className="font-mono">{certification.credentialId}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {certification.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs rounded-sm font-medium bg-white dark:bg-[#0a0a0a] border border-gray-200/80 dark:border-gray-800/50 text-[#737373] dark:text-[#A1A1AA] group-hover:border-gray-900/30 dark:group-hover:border-emerald-500/30 transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* View Credential Link */}
          <div className="pt-2 flex items-center justify-between border-t border-gray-200/80 dark:border-gray-800/50">
            <span className="text-sm font-medium text-[#737373] dark:text-[#A1A1AA] group-hover:text-[#08090a] dark:group-hover:text-emerald-500 transition-colors">
              View Credential
            </span>
            <ExternalLink
              size={16}
              className="text-[#737373] dark:text-[#A1A1AA] group-hover:text-[#08090a] dark:group-hover:text-emerald-500 transition-colors"
            />
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}

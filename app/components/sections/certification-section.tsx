import HeadingBadge from "@/app/components/heading-badge";
import { CertificationCard } from "@/app/components/certification-card";
import { Award } from "lucide-react";

type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link: string;
  skills: string[];
  color: "emerald" | "blue" | "purple" | "orange";
};

const certifications: Certification[] = [
  {
    id: "1",
    title: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    date: "2024",
    credentialId: "D2FDA6B7A920",
    link: "https://www.hackerrank.com/certificates/d2fda6b7a920",
    skills: ["JavaScript", "ES6+", "DOM", "Async/Await"],
    color: "emerald",
  },
  {
    id: "2",
    title: "Frontend Developer (React)",
    issuer: "HackerRank",
    date: "2024",
    credentialId: "75F161A4DE6A",
    link: "https://www.hackerrank.com/certificates/75f161a4de6a",
    skills: ["React", "Hooks", "Components", "State Management"],
    color: "emerald",
  },
  {
    id: "3",
    title: "Azure DevOps Training",
    issuer: "Laminaar Aviation Infotech",
    date: "2023",
    credentialId: "H2223-6243-CCT-ADO-074",
    link: "https://drive.google.com/file/d/1Q3Mjy4buU-fmMcysPEdNNXDmHQ0PPi94/view",
    skills: ["Azure", "CI/CD", "DevOps", "Pipelines"],
    color: "emerald",
  },
  {
    id: "4",
    title: "The Joy of Computing using Python",
    issuer: "NPTEL",
    date: "2021",
    // credentialId: "XXXXX",
    link: "https://drive.google.com/file/d/1vFH7FqzLIZ4oyKdJSn02feJpRahwmXEq/view",
    skills: ["Python", "Algorithms", "Data Structures"],
    color: "emerald",
  },
];

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="w-full pt-10 flex flex-col items-start justify-start gap-y-10"
    >
      <div className="flex flex-col items-start justify-start gap-5">
        <HeadingBadge title="Certifications" icon={<Award size={14} />} />
        <div className="space-y-2">
          <h3 className="text-3xl font-semibold">
            My{" "}
            <span className="text-[#08090a] dark:text-emerald-500">
              Certifications
            </span>
          </h3>
          <p className="text-[#737373] dark:text-[#A1A1AA] text-sm">
            Professional certifications that validate my expertise in various
            technologies and frameworks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {certifications.map((cert) => (
          <CertificationCard key={cert.id} certification={cert} />
        ))}
      </div>
    </section>
  );
}

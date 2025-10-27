import { ProjectCard } from "@/app/components/project-card";
import HeadingBadge from "@/app/components/heading-badge";
import { FolderGit2 } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  tags: string[];
  link?: string;
  githubLink?: string;
  npmLink?: string;
  year?: string;
};

const projects: Project[] = [
  {
    id: "1",
    title: "use-history-ai",
    description:
      "AI-powered clipboard history manager for React. Track clipboard, add tags/categories, and analyze with Google Gemini AI. Published on NPM with Chrome extension.",
    imageUrl: "/projects/npmm.png",
    videoUrl: "/projects/clipboard-ai.mp4", // Add demo video
    tags: ["React", "TypeScript", "NPM Package", "Gemini AI"],
    link: "https://www.npmjs.com/package/use-history-ai", // Your Vercel demo
    npmLink: "https://www.npmjs.com/package/use-history-ai",
    githubLink: "https://github.com/yourusername/use-history-ai",
    year: "2024",
  },
  {
    id: "2",
    title: "Figma Clone",
    description:
      "Crafted Figma clone using NextJS, Tailwind CSS, and Typescript, powered by Liveblocks.",
    imageUrl: "",
    videoUrl: "/projects/figma.mp4",
    tags: ["React", "Next.js", "shadcn", "Tailwind CSS"],
    link: "https://figma-clone-git-main-pawan-kumar-sachdevas-projects.vercel.app/",
    year: "2024",
  },
  {
    id: "3",
    title: "Rapid Chat App",
    description:
      "Engineered a full-stack real-time Chat Application with MERN and Chakra UI, powered by Socket.IO.",
    imageUrl: "",
    videoUrl: "/projects/chat.mp4",
    tags: ["Javascript", "NodeJs", "ReactJS", "Chakra UI"],
    link: "https://rapid-chat-q01f.onrender.com/",
    year: "2023",
  },
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="w-full pt-10 flex flex-col items-start justify-start gap-y-10"
    >
      <div className="flex flex-col items-start justify-start gap-5">
        <HeadingBadge title="Projects" icon={<FolderGit2 size={14} />} />
        <div className="space-y-2">
          <h3 className="text-3xl font-semibold">
            My{" "}
            <span className="text-[#08090a] dark:text-emerald-500">
              Projects
            </span>
          </h3>
          <p className="text-[#737373] dark:text-[#A1A1AA] text-sm">
            Explore some of the projects I&apos;ve worked on. These showcase my
            skills and expertise in various domains of software development.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-1 gap-2 w-full">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

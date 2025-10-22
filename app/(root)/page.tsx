import { AboutSection } from "@/app/components/sections/about-section";
import { ActivitySection } from "@/app/components/sections/activity-section";
import { ContactSection } from "@/app/components/sections/contact-section";
import { ExperienceSection } from "@/app/components/sections/experience-section";
import { IntroSection } from "@/app/components/sections/Intro-section";
import { ProjectsSection } from "@/app/components/sections/projects-section";
import { ServicesSection } from "@/app/components/sections/services-section";
import { SkillsSection } from "@/app/components/sections/skills-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-40">
      <IntroSection />
      <hr className="w-full border-gray-300/90 dark:border-gray-300/10 mt-10" />
      <AboutSection />
      <hr className="w-full border-gray-300/90 dark:border-gray-300/10 mt-10" />
      <ActivitySection />
      <hr className="w-full border-gray-300/90 dark:border-gray-300/10 mt-10" />
      <SkillsSection />
      <hr className="w-full border-gray-300/90 dark:border-gray-300/10 mt-10" />
      <ProjectsSection />
      <hr className="w-full border-gray-300/90 dark:border-gray-300/10 mt-10" />
      <ExperienceSection />
      <hr className="w-full border-gray-300/90 dark:border-gray-300/10 mt-10" />
      <ServicesSection />
      <hr className="w-full border-gray-300/90 dark:border-gray-300/10 mt-10" />
      <ContactSection />
    </main>
  );
}

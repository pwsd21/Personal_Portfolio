import HeadingBadge from "@/app/components/heading-badge";
import { SpotlightCard } from "@/app/components/ui/spotlight-card";
import { User } from "lucide-react";

export function AboutSection() {
  return (
    <section
      id="about"
      className="w-full pt-10 flex flex-col items-start justify-start gap-y-8"
    >
      <div className="flex flex-col items-start justify-start gap-5">
        <HeadingBadge title="About Me" icon={<User size={14} />} />
        <div className="space-y-2">
          <h3 className="text-3xl font-semibold">
            Discover My{" "}
            <span className="text-[#08090a] dark:text-emerald-500">Story</span>
          </h3>
          <p className="text-[#737373] dark:text-[#A1A1AA] text-sm">
            Learn about my journey, experience, and what drives me as a
            developer.
          </p>
        </div>
      </div>

      <SpotlightCard
        gradientColor="rgba(34, 197, 94, 0.1)"
        lightGradientColor="rgba(8, 9, 10, 0.1)"
        spotlightSize={400}
        disableScale={true}
        className="p-6 rounded-sm border border-gray-200/80 dark:border-gray-800/50 bg-white dark:bg-[#0a0a0a] hover:border-gray-900/30 dark:hover:border-emerald-500/30 transition-all duration-300 w-full"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-[#08090a] dark:text-white flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gray-900 dark:bg-emerald-500"></span>
              Who I Am
            </h4>
            <p className="text-sm text-[#737373] dark:text-[#A1A1AA] leading-relaxed">
              I&apos;m a passionate full-stack developer with a keen eye for
              design and a love for creating seamless user experiences. With
              over 4 years of experience in web development, I&apos;ve worked on
              a range of projects—from small business websites to complex
              enterprise applications.
            </p>
            <p className="text-sm text-[#737373] dark:text-[#A1A1AA] leading-relaxed">
              My approach blends technical expertise with creative
              problem-solving, ensuring each project is not just functional, but
              also visually engaging and user-friendly.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-[#08090a] dark:text-white flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gray-900 dark:bg-emerald-500"></span>
              My Journey
            </h4>
            <p className="text-sm text-[#737373] dark:text-[#A1A1AA] leading-relaxed">
              My tech journey began in 2021 after graduating college, driven by
              a growing interest in coding during my student years. Fascinated
              by how things work behind the scenes, I chose to pursue software
              development—starting with web development as my gateway.
            </p>
            <p className="text-sm text-[#737373] dark:text-[#A1A1AA] leading-relaxed">
              Since then, I’ve built real-world projects, explored new
              technologies, and collaborated with amazing teams. Each step has
              sharpened my skills and deepened my passion for learning and
              building impactful digital solutions.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-[#08090a] dark:text-white flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gray-900 dark:bg-emerald-500"></span>
              Beyond Coding
            </h4>
            <p className="text-sm text-[#737373] dark:text-[#A1A1AA] leading-relaxed">
              Outside of tech, I enjoy playing and watching cricket, following
              football, watching movies, and playing chess—all of which fuel my
              creativity and keep me inspired. I’m also passionate about fitness
              and love hitting the gym regularly to stay energized and focused
              in both work and life.
            </p>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}

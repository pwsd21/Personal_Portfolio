"use client";

import HeadingBadge from "@/app/components/heading-badge";
import { SpotlightCard } from "@/app/components/ui/spotlight-card";
import {
  Activity,
  //   Github,
  //   Code2,
  TrendingUp,
  ExternalLink,
  Github,
} from "lucide-react";
import { CombinedActivityTracker } from "../activity/combined-activity-tracker";
// import { LeetCodeStats } from "../activity/leetcode-stats";
import { GitHubLanguages } from "../activity/github-languages";

export function ActivitySection() {
  return (
    <section
      id="activity"
      className="w-full pt-10 flex flex-col items-start justify-start gap-y-8"
    >
      <div className="flex flex-col items-start justify-start gap-5">
        <HeadingBadge
          title="Activity Tracker"
          icon={<TrendingUp size={14} />}
        />
        <div className="space-y-2">
          <h3 className="text-3xl font-semibold">
            My Coding{" "}
            <span className="text-[#08090a] dark:text-emerald-500">
              Journey
            </span>
          </h3>
          <p className="text-[#737373] dark:text-[#A1A1AA] text-sm">
            Track my GitHub activities, streaks, and programming language usage.
          </p>
        </div>
      </div>

      {/* Combined Activity Tracker */}
      <SpotlightCard
        gradientColor="rgba(34, 197, 94, 0.1)"
        lightGradientColor="rgba(8, 9, 10, 0.1)"
        spotlightSize={400}
        disableScale={true}
        className="p-6 rounded-sm border border-gray-200/80 dark:border-gray-800/50 bg-white dark:bg-[#0a0a0a] hover:border-gray-900/30 dark:hover:border-emerald-500/30 transition-all duration-300 w-full"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity
              size={20}
              className="text-gray-900 dark:text-emerald-500"
            />
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
              Combined Activity
            </h4>
          </div>
          <CombinedActivityTracker
            githubUsername="pwsd21"
            // leetcodeUsername="pawansachdeva1998"
          />
        </div>
      </SpotlightCard>

      {/* Two Column Layout for LeetCode Stats and Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 w-full">
        {/* LeetCode Stats */}
        {/* <SpotlightCard
          gradientColor="rgba(34, 197, 94, 0.1)"
          lightGradientColor="rgba(8, 9, 10, 0.1)"
          spotlightSize={400}
          disableScale={true}
          className="p-6 rounded-sm border border-gray-200/80 dark:border-gray-800/50 bg-white dark:bg-[#0a0a0a] hover:border-gray-900/30 dark:hover:border-emerald-500/30 transition-all duration-300"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2
                  size={20}
                  className="text-gray-900 dark:text-emerald-500"
                />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  LeetCode Stats
                </h4>
              </div>
              <a
                href="https://leetcode.com/pawansachdeva1998"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                View <ExternalLink size={14} />
              </a>
            </div>
            <LeetCodeStats username="pawansachdeva1998" />
          </div>
        </SpotlightCard> */}

        {/* GitHub Languages */}
        <SpotlightCard
          gradientColor="rgba(34, 197, 94, 0.1)"
          lightGradientColor="rgba(8, 9, 10, 0.1)"
          spotlightSize={400}
          disableScale={true}
          className="p-6 rounded-sm border border-gray-200/80 dark:border-gray-800/50 bg-white dark:bg-[#0a0a0a] hover:border-gray-900/30 dark:hover:border-emerald-500/30 transition-all duration-300"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Github
                  size={20}
                  className="text-gray-900 dark:text-emerald-500"
                />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Language Stats
                </h4>
              </div>
              <a
                href="https://github.com/pwsd21"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                View <ExternalLink size={14} />
              </a>
            </div>
            <GitHubLanguages username="pwsd21" />
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}

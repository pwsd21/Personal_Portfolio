"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Activity,
  ExternalLink,
  Loader2,
  Flame,
  Calendar,
  X,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
// import { SiLeetcode } from "react-icons/si";

interface Activity {
  date: Date;
  github: number;
  // leetcode: number;
  total: number;
  level: number;
}

interface CombinedActivityTrackerProps {
  githubUsername?: string;
  // leetcodeUsername?: string;
}

export function CombinedActivityTracker({
  githubUsername = "pwsd21",
  // leetcodeUsername = "pawansachdeva1998",
}: CombinedActivityTrackerProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [streaks, setStreaks] = useState({ current: 0, longest: 0 });
  const [selectedDay, setSelectedDay] = useState<Activity | null>(null);
  const [showModal, setShowModal] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const calculateStreaks = useCallback((activities: Activity[]) => {
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sortedDesc = [...activities].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    let foundToday = false;
    for (const activity of sortedDesc) {
      const activityDate = new Date(activity.date);
      activityDate.setHours(0, 0, 0, 0);

      if (
        !foundToday &&
        activityDate.getTime() === today.getTime() &&
        activity.total > 0
      ) {
        foundToday = true;
      }

      if (foundToday || activityDate.getTime() === today.getTime() - 86400000) {
        if (activity.total > 0) {
          currentStreak++;
        } else if (foundToday) {
          break;
        }
      }
    }

    const sortedAsc = [...activities].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    for (const activity of sortedAsc) {
      if (activity.total > 0) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    return { current: currentStreak, longest: longestStreak };
  }, []);

  const fetchCombinedActivities = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const githubResponse = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=${selectedYear}`
      );

      if (!githubResponse.ok) {
        throw new Error("Failed to fetch GitHub data");
      }

      const githubData = await githubResponse.json();

      const activityMap = new Map<string, Activity>();

      githubData.contributions.forEach(
        (contribution: { date: string; count: number; level: number }) => {
          const dateStr = contribution.date;
          activityMap.set(dateStr, {
            date: new Date(contribution.date),
            github: contribution.count,
            // leetcode: 0,
            total: contribution.count,
            level: contribution.level,
          });
        }
      );

      const activitiesArray = Array.from(activityMap.values());
      const total = activitiesArray.reduce((sum, act) => sum + act.total, 0);

      setActivities(activitiesArray);
      setTotalContributions(total);

      const calculatedStreaks = calculateStreaks(activitiesArray);
      setStreaks(calculatedStreaks);
    } catch (err) {
      console.error("Error fetching activities:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [githubUsername, selectedYear, calculateStreaks]);

  useEffect(() => {
    fetchCombinedActivities();
  }, [fetchCombinedActivities]);

  const getContributionColor = (level: number) => {
    const colors: Record<number, string> = {
      0: "bg-gray-200 dark:bg-gray-800",
      1: "bg-emerald-200 dark:bg-emerald-900/50",
      2: "bg-emerald-400 dark:bg-emerald-700",
      3: "bg-emerald-500 dark:bg-emerald-500",
      4: "bg-emerald-600 dark:bg-emerald-400",
    };
    return colors[level] || colors[0];
  };

  const groupActivitiesByWeek = () => {
    const weeks: Activity[][] = [];
    let currentWeek: Activity[] = [];

    activities.forEach((activity, index) => {
      currentWeek.push(activity);

      if (activity.date.getDay() === 6 || index === activities.length - 1) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });

    return weeks;
  };

  const handleDayClick = (activity: Activity | undefined) => {
    if (activity && activity.total > 0) {
      setSelectedDay(activity);
      setShowModal(true);
    }
  };

  if (isLoading) {
    return (
      <div className="h-32 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load activities: {error}
        </p>
      </div>
    );
  }

  const weeks = groupActivitiesByWeek();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="space-y-6">
      {/* Header with Year Selection and Stats */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-emerald-500" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              {totalContributions} contributions
            </h4>
          </div>

          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="appearance-none bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-900 dark:text-white hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <Calendar
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            GitHub <ExternalLink size={14} />
          </a>
          {/* <span className="text-gray-400">|</span>
          <a
            href={`https://leetcode.com/${leetcodeUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            LeetCode <ExternalLink size={14} />
          </a> */}
        </div>
      </div>

      {/* Streak Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Flame
              size={18}
              className="text-emerald-600 dark:text-emerald-400"
            />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Current Streak
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {streaks.current}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              days
            </span>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200 dark:border-orange-800/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={18} className="text-orange-600 dark:text-orange-400" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Longest Streak
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {streaks.longest}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              days
            </span>
          </div>
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="inline-flex flex-col gap-1 p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-gray-200 dark:border-gray-800 min-w-max">
          <div className="flex gap-1 mb-2">
            <div className="w-8"></div>
            {months.map((month, idx) => (
              <div
                key={idx}
                className="text-xs text-gray-500 dark:text-gray-400 w-full text-center px-4"
              >
                {month}
              </div>
            ))}
          </div>

          <div className="flex gap-1">
            <div className="flex flex-col gap-1 justify-around pr-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-xs text-gray-500 dark:text-gray-400 h-3 flex items-center"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="flex gap-1">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, dayIdx) => {
                    const activity = week.find(
                      (a) => a.date.getDay() === dayIdx
                    );
                    return (
                      <div
                        key={dayIdx}
                        onClick={() => handleDayClick(activity)}
                        className={`w-3 h-3  ${
                          activity
                            ? getContributionColor(activity.level)
                            : "bg-transparent"
                        } hover:ring-2 hover:ring-emerald-500 transition-all ${
                          activity && activity.total > 0 ? "cursor-pointer" : ""
                        }`}
                        title={
                          activity
                            ? `${
                                activity.total
                              } contributions on ${activity.date.toDateString()}`
                            : ""
                        }
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>

      {/* Modal for Daily Details */}
      {showModal && selectedDay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-200 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Activity on{" "}
                {selectedDay.date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  {/* <Github
                    size={18}
                    className="text-gray-900 dark:text-emerald-500"
                  /> */}
                  <FaGithub />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Contributed on GitHub
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {selectedDay.github}{" "}
                  {selectedDay.github === 1 ? "contribution" : "contributions"}
                </span>
              </div>

              {/* <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <SiLeetcode
                    size={18}
                    className="text-gray-900 dark:text-emerald-500"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Practiced on LeetCode
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {selectedDay.leetcode}{" "}
                  {selectedDay.leetcode === 1 ? "submission" : "submissions"}
                </span>
              </div> */}

              {/* <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Activity
                  </span>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedDay.total}
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

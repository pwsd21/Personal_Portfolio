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
}: // leetcodeUsername = "pawansachdeva1998",
CombinedActivityTrackerProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [streaks, setStreaks] = useState({ current: 0, longest: 0 });
  const [selectedDay, setSelectedDay] = useState<Activity | null>(null);
  const [showModal, setShowModal] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) => currentYear - i);

  const calculateStreaks = useCallback((activities: Activity[]) => {
    if (activities.length === 0) return { current: 0, longest: 0 };

    // Helper: format date in local timezone as YYYY-MM-DD
    const formatLocalDate = (date: Date) => {
      return date.toLocaleDateString("en-CA");
    };

    // Normalize all dates to local time
    const allDates: Activity[] = [];
    const firstDate = new Date(activities[0].date);
    const lastDate = new Date(activities[activities.length - 1].date);

    for (
      let d = new Date(firstDate);
      d <= lastDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = formatLocalDate(d);
      const existing = activities.find(
        (a) => formatLocalDate(a.date) === dateStr
      );
      allDates.push(
        existing || {
          date: new Date(d),
          github: 0,
          total: 0,
          level: 0,
        }
      );
    }

    // Calculate longest streak
    let longest = 0;
    let temp = 0;
    for (const a of allDates) {
      if (a.total > 0) {
        temp++;
        longest = Math.max(longest, temp);
      } else {
        temp = 0;
      }
    }

    // Calculate current streak based on local system time
    const today = new Date();
    const todayStr = formatLocalDate(today);

    // Check if last activity was today or earlier
    // const lastActivityStr = formatLocalDate(allDates[allDates.length - 1].date);
    const todayActivity =
      allDates.find((a) => formatLocalDate(a.date) === todayStr) || null;

    // If today's data exists and has contributions, start from today, else from yesterday
    const startFromToday = todayActivity && todayActivity.total > 0;
    const checkDate = new Date(today);
    if (!startFromToday) checkDate.setDate(checkDate.getDate() - 1);

    let current = 0;

    // Walk backward in time locally
    for (let i = allDates.length - 1; i >= 0; i--) {
      const activityDateStr = formatLocalDate(allDates[i].date);
      const checkDateStr = formatLocalDate(checkDate);

      if (activityDateStr === checkDateStr) {
        if (allDates[i].total > 0) {
          current++;
          checkDate.setDate(checkDate.getDate() - 1); // go to previous local day
        } else {
          break; // streak ended
        }
      } else if (activityDateStr < checkDateStr) {
        break; // gap day
      }
    }

    return { current, longest };
  }, []);

  const fetchCombinedActivities = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch GitHub contributions
      const githubResponse = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=${selectedYear}`
      );

      if (!githubResponse.ok) {
        throw new Error("Failed to fetch GitHub data");
      }

      const githubData = await githubResponse.json();

      const activityMap = new Map<string, Activity>();

      // Initialize with GitHub data
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

      // Fetch LeetCode submission calendar using official GraphQL API
      //   try {
      //     const leetcodeGraphQLResponse = await fetch("/api/leetcode", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         query: `
      //   query userProfileCalendar($username: String!, $year: Int) {
      //     matchedUser(username: $username) {
      //       userCalendar(year: $year) {
      //         submissionCalendar
      //       }
      //     }
      //   }
      // `,
      //         variables: {
      //           username: leetcodeUsername,
      //           year: selectedYear,
      //         },
      //       }),
      //     });

      //     if (leetcodeGraphQLResponse.ok) {
      //       const leetcodeData = await leetcodeGraphQLResponse.json();
      //       console.log("LeetCode GraphQL Response:", leetcodeData);

      //       if (
      //         leetcodeData.data?.matchedUser?.userCalendar?.submissionCalendar
      //       ) {
      //         let calendar =
      //           leetcodeData.data.matchedUser.userCalendar.submissionCalendar;

      //         // Parse the stringified calendar
      //         if (typeof calendar === "string") {
      //           calendar = JSON.parse(calendar);
      //         }

      //         console.log("LeetCode Calendar:", calendar);

      //         // Process all LeetCode submissions for selected year
      //         Object.entries(calendar).forEach(([timestamp, count]) => {
      //           const date = new Date(parseInt(timestamp) * 1000);
      //           const dateStr = date.toISOString().split("T")[0];

      //           const existing = activityMap.get(dateStr);
      //           const leetcodeCount = Number(count) || 0;

      //           if (existing) {
      //             const newTotal = existing.github + leetcodeCount;
      //             activityMap.set(dateStr, {
      //               ...existing,
      //               leetcode: leetcodeCount,
      //               total: newTotal,
      //               level: Math.max(
      //                 existing.level,
      //                 Math.min(4, Math.ceil(newTotal / 2))
      //               ),
      //             });
      //           } else {
      //             // Create entry for LeetCode-only days
      //             activityMap.set(dateStr, {
      //               date: date,
      //               github: 0,
      //               leetcode: leetcodeCount,
      //               total: leetcodeCount,
      //               level: Math.min(4, Math.ceil(leetcodeCount / 2)),
      //             });
      //           }
      //         });
      //       }
      //     } else {
      //       console.error("LeetCode GraphQL API failed");
      //     }
      //   } catch (leetcodeErr) {
      //     console.error("LeetCode GraphQL fetch error:", leetcodeErr);
      //   }

      const activitiesArray = Array.from(activityMap.values()).sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      );
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
      1: "bg-[#9be9a8] dark:bg-[#0e4429]",
      2: "bg-[#40c463] dark:bg-[#006d32]",
      3: "bg-[#30a14e] dark:bg-[#26a641]",
      4: "bg-[#216e39] dark:bg-[#39d353]",
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
                        className={`w-3 h-3 rounded-xs  ${
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

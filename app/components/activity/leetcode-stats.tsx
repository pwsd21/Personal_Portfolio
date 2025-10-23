"use client";

import { useState, useEffect, useCallback } from "react";
import { Award, Loader2 } from "lucide-react";

interface LeetCodeStatsData {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  ranking: number;
}

interface LeetCodeStatsProps {
  username?: string;
}

export function LeetCodeStats({
  username = "pawansachdeva1998",
}: LeetCodeStatsProps) {
  const [stats, setStats] = useState<LeetCodeStatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeetCodeStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `https://leetcode-stats-api.herokuapp.com/${username}`
      );
      console.log(response, 'resssss')

      if (!response.ok) {
        throw new Error("Failed to fetch LeetCode data");
      }

      const data = await response.json();
      console.log(data, 'dataaa')

      setStats({
        totalSolved: data.totalSolved || 0,
        totalQuestions: data.totalQuestions || 3000,
        easySolved: data.easySolved || 0,
        easyTotal: data.totalEasy || 800,
        mediumSolved: data.mediumSolved || 0,
        mediumTotal: data.totalMedium || 1600,
        hardSolved: data.hardSolved || 0,
        hardTotal: data.totalHard || 700,
        ranking: data.ranking || 0,
      });
    } catch (err) {
      console.error("Error fetching LeetCode stats:", err);

      try {
        const altResponse = await fetch(
          `https://alfa-leetcode-api.onrender.com/${username}/solved`
        );
        if (altResponse.ok) {
          const altData = await altResponse.json();
          setStats({
            totalSolved: altData.solvedProblem || 0,
            totalQuestions: 3000,
            easySolved: altData.easySolved || 0,
            easyTotal: 800,
            mediumSolved: altData.mediumSolved || 0,
            mediumTotal: 1600,
            hardSolved: altData.hardSolved || 0,
            hardTotal: 700,
            ranking: altData.ranking || 0,
          });
          setError(null);
        }
      } catch {
        setError("Unable to load stats");
      }
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchLeetCodeStats();
  }, [fetchLeetCodeStats]);

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <p className="text-sm text-yellow-600 dark:text-yellow-400">
          Unable to load LeetCode stats. Please try again later.
        </p>
      </div>
    );
  }

  const totalPercentage = (
    (stats.totalSolved / stats.totalQuestions) *
    100
  ).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Main Stats Circle */}
      <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              className="text-gray-200 dark:text-gray-800"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeDasharray={`${
                (stats.totalSolved / stats.totalQuestions) * 552
              } 552`}
              className="text-emerald-500 transition-all duration-1000"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              {stats.totalSolved}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              /{stats.totalQuestions}
            </span>
            <span className="text-xs text-emerald-500 font-medium mt-1">
              {totalPercentage}% Solved
            </span>
          </div>
        </div>

        {stats.ranking > 0 && (
          <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Award size={16} className="text-amber-600 dark:text-amber-400" />
              <span className="text-gray-600 dark:text-gray-400">Ranking:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                #{stats.ranking.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Difficulty Breakdown */}
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Easy
              </span>
            </div>
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {stats.easySolved}/{stats.easyTotal}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-1000"
              style={{
                width: `${Math.min(
                  (stats.easySolved / stats.easyTotal) * 100,
                  100
                )}%`,
              }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {((stats.easySolved / stats.easyTotal) * 100).toFixed(1)}% completed
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 border border-yellow-200 dark:border-yellow-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Medium
              </span>
            </div>
            <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
              {stats.mediumSolved}/{stats.mediumTotal}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-500 transition-all duration-1000"
              style={{
                width: `${Math.min(
                  (stats.mediumSolved / stats.mediumTotal) * 100,
                  100
                )}%`,
              }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {((stats.mediumSolved / stats.mediumTotal) * 100).toFixed(1)}%
            completed
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border border-red-200 dark:border-red-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Hard
              </span>
            </div>
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
              {stats.hardSolved}/{stats.hardTotal}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 transition-all duration-1000"
              style={{
                width: `${Math.min(
                  (stats.hardSolved / stats.hardTotal) * 100,
                  100
                )}%`,
              }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {((stats.hardSolved / stats.hardTotal) * 100).toFixed(1)}% completed
          </p>
        </div>
      </div>
    </div>
  );
}

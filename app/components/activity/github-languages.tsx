"use client";

import { useState, useEffect, useCallback } from "react";
import { Code2, Loader2 } from "lucide-react";

interface Language {
  name: string;
  percentage: string;
  count: number;
}

interface GitHubLanguagesProps {
  username?: string;
}

interface Repository {
  language: string | null;
}

export function GitHubLanguages({ username = "pwsd21" }: GitHubLanguagesProps) {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubLanguages = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );

      if (!reposResponse.ok) {
        throw new Error("Failed to fetch repositories");
      }

      const repos: Repository[] = await reposResponse.json();


      const languageBytes: Record<string, number> = {};
      for (const repo of repos) {
        if (repo.language) {
          languageBytes[repo.language] =
            (languageBytes[repo.language] || 0) + 1;
        }
      }

      const totalRepos = Object.values(languageBytes).reduce(
        (sum, count) => sum + count,
        0
      );
      const languageData = Object.entries(languageBytes)
        .map(([name, count]) => ({
          name,
          percentage: ((count / totalRepos) * 100).toFixed(1),
          count,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);
      setLanguages(languageData);
    } catch (err) {
      console.error("Error fetching languages:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchGitHubLanguages();
  }, [fetchGitHubLanguages]);

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-400",
      TypeScript: "bg-blue-500",
      Python: "bg-blue-600",
      Java: "bg-red-500",
      HTML: "bg-orange-500",
      CSS: "bg-purple-500",
      Go: "bg-cyan-500",
      Rust: "bg-orange-600",
      Ruby: "bg-red-600",
      PHP: "bg-indigo-500",
      C: "bg-gray-600",
      "C++": "bg-pink-500",
      "C#": "bg-green-600",
      Swift: "bg-orange-400",
      Kotlin: "bg-purple-600",
      Dart: "bg-blue-400",
    };
    return colors[language] || "bg-gray-500";
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
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <p className="text-sm text-yellow-600 dark:text-yellow-400">
          Unable to load language stats: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Code2 size={18} className="text-emerald-500" />
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
          Most Used Languages
        </h4>
      </div>

      <div className="space-y-3">
        {languages.map((lang) => (
          <div key={lang.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${getLanguageColor(
                    lang.name
                  )}`}
                ></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {lang.name}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {lang.percentage}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${getLanguageColor(
                  lang.name
                )} transition-all duration-1000`}
                style={{ width: `${lang.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

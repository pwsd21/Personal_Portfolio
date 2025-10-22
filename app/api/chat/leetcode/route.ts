import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    const year = searchParams.get("year");

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // GraphQL query to fetch recent submissions
    const query = `
      query recentSubmissions($username: String!) {
        recentAcSubmissions(username: $username) {
          title
          timestamp
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch LeetCode data");
    }

    const data = await res.json();

    // Filter submissions by year
    const submissions = data.data.recentAcSubmissions
      .map((s: { timestamp: number }) => {
        const date = new Date(s.timestamp * 1000);
        return {
          date: date.toISOString().split("T")[0], // YYYY-MM-DD
        };
      })
      .filter(
        (s: { date: string }) => new Date(s.date).getFullYear() === Number(year)
      );

    return NextResponse.json(submissions);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error fetching LeetCode data" },
      { status: 500 }
    );
  }
}

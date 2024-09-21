"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

interface NewsSummary {
  id: number;
  title: string;
  summary: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [newsSummaries, setNewsSummaries] = useState<NewsSummary[]>([]);

  // Mock data for autocomplete suggestions
  const drugList = [
    "Adderall",
    "Acetaminophen",
    "Amoxicillin",
    "Atorvastatin",
    "Amlodipine",
    "Albuterol",
  ];

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredSuggestions = drugList.filter((drug) =>
        drug.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetch("/api/py/news-summary")
      .then((response) => response.json())
      .then((data) => setNewsSummaries(data.data))
      .catch((error) => console.error("Error fetching news summaries:", error));
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <main className="container mx-auto p-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <header className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Drug safety vigilance for all
                </h1>
                <h2 className="text-3xl font-bold">Adderall</h2>
              </div>
              <div className="form-control relative">
                <input
                  type="text"
                  placeholder="Search for a drug..."
                  className="input input-bordered input-primary w-full max-w-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {suggestions.length > 0 && (
                  <ul className="menu bg-base-100 w-full p-2 rounded-box shadow-lg absolute top-full left-0 mt-1 z-10">
                    {suggestions.map((suggestion, index) => (
                      <li key={index}>
                        <a onClick={() => setSearchTerm(suggestion)}>
                          {suggestion}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Common side effects */}
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Common side effects
                </h3>
                <ol className="list-decimal list-inside">
                  <li>Increased heart rate</li>
                  <li>Elevated blood pressure</li>
                  <li>Insomnia</li>
                  <li>Loss of appetite</li>
                  <li>Dry mouth</li>
                </ol>
              </div>

              {/* Social sentiment */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Social sentiment</h3>
                <div className="h-32 bg-base-200 mb-4">
                  {/* Placeholder for chart */}
                </div>
                <p className="text-sm mb-4">
                  Analysis of negative comments related to Adderall side effects
                  from Reddit.
                </p>

                {[
                  { side_effect: "Somnolence", count: 4 },
                  { side_effect: "Drug Ineffective", count: 3 },
                  { side_effect: "Feeling Abnormal", count: 3 },
                  { side_effect: "Headache", count: 1 },
                  { side_effect: "Fatigue", count: 1 },
                  { side_effect: "Disturbance In Attention", count: 1 },
                  { side_effect: "Nausea", count: 1 },
                  { side_effect: "Depression", count: 1 },
                  { side_effect: "Product Quality Issue", count: 1 },
                ].map((sideEffect, index) => (
                  <div key={index} className="mb-6">
                    <h4 className="font-semibold mb-2">
                      {sideEffect.side_effect}{" "}
                      <span className="text-primary">
                        ({sideEffect.count} mentions)
                      </span>
                    </h4>
                    {sideEffect.side_effect === "Somnolence" && (
                      <>
                        <blockquote className="border-l-4 border-base-300 pl-4 mb-2 italic text-sm">
                          &ldquo;The only way I sleep is when I drink and it's
                          absolutely horrible&rdquo;
                        </blockquote>
                        <blockquote className="border-l-4 border-base-300 pl-4 mb-2 italic text-sm">
                          &ldquo;really only getting headaches and having a hard
                          time sleeping&rdquo;
                        </blockquote>
                      </>
                    )}
                    {sideEffect.side_effect === "Drug Ineffective" && (
                      <>
                        <blockquote className="border-l-4 border-base-300 pl-4 mb-2 italic text-sm">
                          &ldquo;What were his suggestions? I have tried taking
                          2 weeks break to see if I could lower my tolerance
                          level but it was not effective.&rdquo;
                        </blockquote>
                        <blockquote className="border-l-4 border-base-300 pl-4 mb-2 italic text-sm">
                          &ldquo;I've been done with schooling for a few years
                          now and have been working FT for a while&rdquo;
                        </blockquote>
                      </>
                    )}
                    {sideEffect.side_effect === "Feeling Abnormal" && (
                      <>
                        <blockquote className="border-l-4 border-base-300 pl-4 mb-2 italic text-sm">
                          &ldquo;Who is the manufacturer? I tried a weird
                          manufacturer during the shortage because that's all my
                          pharmacy had, and they were horrible&rdquo;
                        </blockquote>
                        <blockquote className="border-l-4 border-base-300 pl-4 mb-2 italic text-sm">
                          &ldquo;I swear it makes me feel like I took molly my
                          jaw start moving weird, I'll be sitting down inside
                          and just be dripping sweat, I talk alot, and the shit
                          makes me stuff DONE 😭&rdquo;
                        </blockquote>
                      </>
                    )}
                    {sideEffect.side_effect === "Headache" && (
                      <blockquote className="border-l-4 border-base-300 pl-4 mb-2 italic text-sm">
                        &ldquo;really only getting headaches and having a hard
                        time sleeping&rdquo;
                      </blockquote>
                    )}
                    {sideEffect.side_effect === "Fatigue" && (
                      <blockquote className="border-l-4 border-base-300 pl-4 mb-2 italic text-sm">
                        &ldquo;How do you replenish your dopamine if they're
                        exhausted? Thanks for replying.&rdquo;
                      </blockquote>
                    )}
                    {sideEffect.side_effect === "Disturbance In Attention" && (
                      <blockquote className="border-l-4 border-base-300 pl-4 mb-2 italic text-sm">
                        &ldquo;I find myself zoning out, not able to listen to
                        verbal instructions/directions, and trying to do other
                        tasks while someone is talking to me&rdquo;
                      </blockquote>
                    )}
                    {sideEffect.side_effect === "Nausea" && (
                      <blockquote className="border-l-4 border-base-300 pl-4 mb-2 italic text-sm">
                        &ldquo;The info abt this Rx drug indicates that it can
                        be a serious side effect for some ppl and that at high
                        doses can cause amphetamine psychosis and other
                        dangerous side effects&rdquo;
                      </blockquote>
                    )}
                    {sideEffect.side_effect === "Depression" && (
                      <blockquote className="border-l-4 border-base-300 pl-4 mb-2 italic text-sm">
                        &ldquo;It's the brand I get the most times and it is
                        truly depressing every time.&rdquo;
                      </blockquote>
                    )}
                    {sideEffect.side_effect === "Product Quality Issue" && (
                      <blockquote className="border-l-4 border-base-300 pl-4 mb-2 italic text-sm">
                        &ldquo;What were his suggestions? I have tried taking 2
                        weeks break to see if I could lower my tolerance level
                        but it was not effective.&rdquo;
                      </blockquote>
                    )}
                  </div>
                ))}
              </div>

              {/* In the media */}
              <div>
                <h3 className="text-xl font-semibold mb-4">In the media</h3>
                <p className="mb-4 text-sm">
                  Recent news stories highlight ongoing concerns about the
                  availability and safe use of Adderall, especially in high
                  doses.
                </p>

                {newsSummaries.map((news, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">{news.title}</h4>
                    <p className="mb-4 text-sm">{news.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety signals */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Safety signals</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">STRONG ASSOCIATION</h4>
                  <ul className="list-disc list-inside text-sm">
                    <li>Increased heart rate</li>
                    <li>Elevated blood pressure</li>
                    <li>Insomnia</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">MODERATE ASSOCIATION</h4>
                  <ul className="list-disc list-inside text-sm">
                    <li>Loss of appetite</li>
                    <li>Dry mouth</li>
                    <li>Nervousness or anxiety</li>
                    <li>Restlessness</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">LOWER ASSOCIATION</h4>
                  <ul className="list-disc list-inside text-sm">
                    <li>Headache</li>
                    <li>Stomach pain or nausea</li>
                    <li>Weight loss</li>
                    <li>Dizziness</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* User experience input */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">
                What has your experience been?
              </h3>
              <textarea
                className="textarea textarea-bordered w-full"
                rows={4}
              ></textarea>
            </div>

            {/* Download data */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Download data</h3>
              <Link href="#" className="link link-primary">
                FDA adverse event reports (CSV)
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

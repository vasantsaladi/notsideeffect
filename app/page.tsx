"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
)

interface Drug {
  id: number;
  genericName: string;
  brandName: string;
  effects: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [drugList, setDrugList] = useState(null);
  const [drug, setDrug] = useState<Drug | null>(null);

  useEffect(() => {
    console.log("getting drug list...");
    const getDrugList = async () => {
      console.log("querying supabase...");
      const { drugListDB, error } = await supabase
        .from('drugs')
        .select()
      console.log("got drugs:", drugListDB);
      console.log("error:", error);
      setDrugList(drugListDB);
    }

    if(!drugList)
      getDrugList();
  }, []);

  useEffect(() => {
    console.log("searching...", searchTerm);
    if (searchTerm.length > 0) {
      console.log("drugList", drugList);
      if(drugList != null) {
        const filteredSuggestions = drugList.filter((drug) =>
          drug.genericName.toLowerCase().contains(searchTerm.toLowerCase()) || 
          drug.brandName.toLowerCase().contains(searchTerm.toLowerCase()) 
        );
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    }
  }, [searchTerm]);

  const getDrugEffects = async () => {
    const { drugRes, drugError } = await supabase
        .from('drugs')
        .select()
        .or(`genericName.like.${searchTerm},brandName.like.${searchTerm}`)
        

    const { effectsRes, effectsError } = await supabase
        .from('effects')
        .select()
        .eq('drug_id', drugRes.id) 

    const drugObj = {
      id: drugRes.id,
      genericName: drugRes.genericName,
      brandName: drugRes.brandName,
      effects: effectsRes.effects
    }

    setDrug(drugObj); 
  }

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
                <h2 className="text-3xl font-bold">{drug?.brandName} ({drug?.genericName})</h2>
              </div>
              <div className="form-control relative">
                <input
                  type="text"
                  placeholder="Search for a drug..."
                  className="input input-bordered input-primary w-full max-w-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onSubmit={(e) => getDrugEffects()}
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
                <div>Test: Effects</div>
                <div>{drug?.effects}</div>
                {/* <ol className="list-decimal list-inside">
                  {
                    <li key={`${drug?.id}-${idx}`}></li>
                  })}
                </ol> */}
              </div>

              {/* Social sentiment */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Social sentiment</h3>
                <div className="h-32 bg-base-200 mb-4">
                  {/* Placeholder for chart */}
                </div>
                <p className="text-sm mb-4">
                  Ongoing concerns about the availability and safe use of
                  Adderall, especially in high doses.
                </p>

                <h4 className="font-semibold mb-2">
                  Insomnia <span className="text-primary">Metric</span>
                </h4>
                <blockquote className="border-l-4 border-base-300 pl-4 mb-4 italic text-sm">
                  &ldquo;I can&apos;t sleep at all when I take Adderall, even if
                  I take it early in the day.&rdquo;
                </blockquote>
                <blockquote className="border-l-4 border-base-300 pl-4 mb-4 italic text-sm">
                  &ldquo;Lack of sleep is making me feel exhausted all the
                  time.&rdquo;
                </blockquote>
                <p className="text-sm mb-4">
                  Analysis: Many users report difficulties with sleep,
                  indicating a significant negative impact on their well-being.
                </p>
              </div>

              {/* In the media */}
              <div>
                <h3 className="text-xl font-semibold mb-4">In the media</h3>
                <p className="mb-4 text-sm">
                  Recent news stories highlight ongoing concerns about the
                  availability and safe use of Adderall, especially in high
                  doses.
                </p>

                <h4 className="font-semibold mb-2 text-sm">
                  High Doses of ADHD Medications May Trigger Psychosis
                </h4>
                <p className="mb-4 text-sm">
                  A recent study found that high doses of stimulants like
                  Adderall can increase the risk of psychosis or mania by more
                  than fivefold.
                </p>

                <h4 className="font-semibold mb-2 text-sm">
                  DEA Shuts Down Drug Factory Amid Adderall Shortage
                </h4>
                <p className="mb-4 text-sm">
                  The DEA has shut down a New York-based drug factory,
                  exacerbating the ongoing Adderall shortage. The factory was
                  responsible...
                </p>

                <h4 className="font-semibold mb-2 text-sm">
                  Students Continue to Feel the Effects of Adderall Shortage
                </h4>
                <p className="mb-4 text-sm">
                  Nearly two years since the FDA announced a national Adderall
                  shortage, students are still struggling to access their
                  prescriptions.
                </p>
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

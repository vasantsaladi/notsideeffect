import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Drug safety vigilance for all
          </h1>
          <h2 className="text-3xl font-bold">Adderall</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Common side effects */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Common side effects</h3>
            <ol className="list-decimal list-inside">
              <li>Increased heart rate</li>
              <li>Elevated blood pressure</li>
              <li>Insomnia</li>
              <li>Loss of appetite</li>
              <li>Dry mouth</li>
              {/* Add more side effects */}
            </ol>
          </div>

          {/* Social sentiment */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Social sentiment</h3>
            <div className="h-32 bg-gray-200 mb-4">
              {/* Placeholder for chart */}
            </div>
            <p className="text-sm mb-4">
              Ongoing concerns about the availability and safe use of Adderall,
              especially in high doses.
            </p>

            <h4 className="font-semibold mb-2">
              Insomnia <span className="text-blue-500">Metric</span>
            </h4>
            <blockquote className="border-l-4 border-gray-300 pl-4 mb-4 italic text-sm">
              &ldquo;I can&apos;t sleep at all when I take Adderall, even if I
              take it early in the day.&rdquo;
            </blockquote>
            <blockquote className="border-l-4 border-gray-300 pl-4 mb-4 italic text-sm">
              &ldquo;Lack of sleep is making me feel exhausted all the
              time.&rdquo;
            </blockquote>
            <p className="text-sm mb-4">
              Analysis: Many users report difficulties with sleep, indicating a
              significant negative impact on their well-being.
            </p>

            {/* Add more social sentiment sections */}
          </div>

          {/* In the media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">In the media</h3>
            <p className="mb-4 text-sm">
              Recent news stories highlight ongoing concerns about the
              availability and safe use of Adderall, especially in high doses.
            </p>

            <h4 className="font-semibold mb-2 text-sm">
              High Doses of ADHD Medications May Trigger Psychosis
            </h4>
            <p className="mb-4 text-sm">
              A recent study found that high doses of stimulants like Adderall
              can increase the risk of psychosis or mania by more than fivefold.
            </p>

            <h4 className="font-semibold mb-2 text-sm">
              DEA Shuts Down Drug Factory Amid Adderall Shortage
            </h4>
            <p className="mb-4 text-sm">
              The DEA has shut down a New York-based drug factory, exacerbating
              the ongoing Adderall shortage. The factory was responsible...
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
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          ></textarea>
        </div>

        {/* Download data */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Download data</h3>
          <Link href="#" className="text-blue-500 hover:underline">
            FDA adverse event reports (CSV)
          </Link>
        </div>
      </div>
    </main>
  );
}

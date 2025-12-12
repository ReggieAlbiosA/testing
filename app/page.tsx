// app/page.tsx
"use client";

import React, { useState } from "react";

export default function Page() {
  // Calculator State
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  // Word Counter State
  const [text, setText] = useState<string>("");

  const calculate = (): void => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (!isNaN(n1) && !isNaN(n2)) {
      setResult(n1 + n2);
    }
  };

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 gap-8 text-gray-800">
      {/* Calculator Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-all hover:shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight">Calculator</h1>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-600 mb-1 block">First Number</span>
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="0"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-600 mb-1 block">Second Number</span>
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="0"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={calculate}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer shadow-md active:scale-[0.98]"
        >
          Add Numbers
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-center">
            <span className="text-gray-600 text-sm uppercase tracking-wide">Result</span>
            <p className="text-3xl font-bold text-blue-700 mt-1">{result}</p>
          </div>
        )}
      </div>

      {/* Word Counter Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-all hover:shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight">Word Counter</h2>
        
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-600 mb-1 block">Enter text below</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors resize-none"
            placeholder="Type or paste your text here..."
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-100 text-center">
            <span className="text-gray-600 text-sm font-medium uppercase tracking-wide">Words</span>
            <p className="text-3xl font-bold text-green-700 mt-1">{wordCount}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 text-center">
            <span className="text-gray-600 text-sm font-medium uppercase tracking-wide">Characters</span>
            <p className="text-3xl font-bold text-purple-700 mt-1">{charCount}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

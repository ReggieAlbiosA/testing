// app/page.tsx
"use client";

import React, { useState } from "react";
import WordCounter from "./components/WordCounter";
import Calendar from "./components/Calendar";
import TodoList from "./components/TodoList";
import Stopwatch from "./components/Stopwatch";
import BmiCalculator from "./components/BmiCalculator";

export default function Page() {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const calculate = (): void => {
    setResult(num1 + num2);
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Calculator</h1>

      <label className="block mb-2">
        First Number
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(Number(e.target.value))}
          className="border p-2 w-full mt-1"
        />
      </label>

      <label className="block mb-4">
        Second Number
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(Number(e.target.value))}
          className="border p-2 w-full mt-1"
        />
      </label>

      <button
        type="button"
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add
      </button>

      {result !== null && (
        <p className="mt-4 text-lg font-medium">Result: {result}</p>
      )}

      <WordCounter />

      <Calendar />

      <TodoList />

      <Stopwatch />

      <BmiCalculator />
    </main>
  );
}

"use client";

import React, { useState } from "react";

export default function BmiCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      alert("Please enter valid positive numbers for weight and height.");
      return;
    }

    // BMI = weight (kg) / (height (m))^2
    const heightInMeters = h / 100;
    const bmiValue = w / (heightInMeters * heightInMeters);
    
    setBmi(parseFloat(bmiValue.toFixed(1)));
    determineCategory(bmiValue);
  };

  const determineCategory = (bmiValue: number) => {
    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue < 24.9) {
      setCategory("Normal weight");
    } else if (bmiValue < 29.9) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setCategory("");
  };

  return (
    <div className="bg-white p-6 rounded shadow-sm border border-gray-200 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">BMI Calculator</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 70"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 175"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={calculateBmi}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
          >
            Calculate
          </button>
          <button
            onClick={reset}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors font-medium"
          >
            Reset
          </button>
        </div>

        {bmi !== null && (
          <div className="mt-6 text-center p-4 bg-gray-50 rounded border border-gray-200">
            <p className="text-sm text-gray-500 uppercase tracking-wide">Your BMI</p>
            <p className="text-3xl font-bold text-gray-900 my-2">{bmi}</p>
            <p className={`text-lg font-medium ${
              category === "Normal weight" ? "text-green-600" : 
              category === "Obese" ? "text-red-600" :
              "text-yellow-600"
            }`}>
              {category}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

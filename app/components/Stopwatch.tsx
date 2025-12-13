"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = () => {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    const pad = (num: number) => num.toString().padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
  };

  return (
    <div className="bg-white p-6 rounded shadow-sm border border-gray-200 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Stopwatch</h2>

      <div className="text-center mb-6">
        <div className="text-5xl font-mono font-bold text-gray-900 tracking-wider">
          {formatTime()}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        {!isRunning ? (
          <button
            onClick={start}
            className="w-24 px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors"
          >
            Start
          </button>
        ) : (
          <button
            onClick={stop}
            className="w-24 px-4 py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600 transition-colors"
          >
            Stop
          </button>
        )}
        
        <button
          onClick={reset}
          className="w-24 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

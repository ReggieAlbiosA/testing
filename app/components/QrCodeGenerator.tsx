"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [qrSrc, setQrSrc] = useState("");

  const generateQr = () => {
    if (!text.trim()) {
      setQrSrc("");
      return;
    }
    // Using api.qrserver.com for simple QR code generation without extra dependencies
    setQrSrc(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      generateQr();
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-sm border border-gray-200 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">QR Code Generator</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text or URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. https://google.com"
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
            <button
              onClick={generateQr}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
            >
              Generate
            </button>
          </div>
        </div>

        {qrSrc && (
          <div className="flex flex-col items-center mt-6 p-4 bg-gray-50 border border-gray-200 rounded">
            <Image 
              src={qrSrc} 
              alt="Generated QR Code" 
              width={192}
              height={192}
              className="border border-white shadow-md bg-white"
              unoptimized
            />
            <p className="mt-2 text-xs text-gray-500 break-all text-center max-w-xs">
              {text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

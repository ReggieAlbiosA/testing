"use client";

import React, { useState, useEffect } from "react";

export default function ColorConverter() {
  const [hex, setHex] = useState("#3B82F6");
  const [rgb, setRgb] = useState("");
  const [hsl, setHsl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    convertColor(hex);
  }, [hex]);

  const convertColor = (hexValue: string) => {
    // Validate Hex
    if (!/^#([0-9A-F]{3}){1,2}$/i.test(hexValue)) {
      setError("Invalid HEX code");
      setRgb("");
      setHsl("");
      return;
    }

    setError("");
    let c = hexValue.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    const colorInt = parseInt(c.join(""), 16);
    const r = (colorInt >> 16) & 255;
    const g = (colorInt >> 8) & 255;
    const b = colorInt & 255;

    setRgb(`rgb(${r}, ${g}, ${b})`);

    // RGB to HSL
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
      }
      h /= 6;
    }

    setHsl(`hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`);
  };

  return (
    <div className="bg-white p-6 rounded shadow-sm border border-gray-200 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Color Converter</h2>

      <div className="flex gap-4 items-start">
        <div 
          className="w-24 h-24 rounded border border-gray-200 shadow-inner flex-shrink-0"
          style={{ backgroundColor: !error ? hex : 'transparent' }}
        ></div>

        <div className="flex-1 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">HEX</label>
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className={`w-full p-2 border rounded font-mono ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:ring-2 outline-none`}
              placeholder="#000000"
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">RGB</label>
            <div className="w-full p-2 bg-gray-50 border border-gray-200 rounded font-mono text-gray-800 select-all">
              {rgb || "-"}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">HSL</label>
            <div className="w-full p-2 bg-gray-50 border border-gray-200 rounded font-mono text-gray-800 select-all">
              {hsl || "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

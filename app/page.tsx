"use client";

import { useState } from "react";

type AgeResult = {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  zodiacSign: string;
};

function getZodiacSign(month: number, day: number): string {
  if ((month === 0 && day >= 20) || (month === 1 && day <= 18)) return "Aquarius";
  if ((month === 1 && day >= 19) || (month === 2 && day <= 20)) return "Pisces";
  if ((month === 2 && day >= 21) || (month === 3 && day <= 19)) return "Aries";
  if ((month === 3 && day >= 20) || (month === 4 && day <= 20)) return "Taurus";
  if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) return "Gemini";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 22)) return "Cancer";
  if ((month === 6 && day >= 23) || (month === 7 && day <= 22)) return "Leo";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Virgo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Libra";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 21)) return "Scorpio";
  if ((month === 10 && day >= 22) || (month === 11 && day <= 21)) return "Sagittarius";
  return "Capricorn";
}

export default function Home() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!birthDate) {
      setError("Please enter a valid birth date.");
      setResult(null);
      return;
    }

    const today = new Date();
    const dob = new Date(birthDate);

    if (isNaN(dob.getTime())) {
      setError("Please enter a valid birth date.");
      setResult(null);
      return;
    } 

    if (dob > today) {
      setError("Birth date cannot be in the future.");
      setResult(null);
      return;
    }

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      const daysInPrevMonth = prevMonth.getDate();
      days += daysInPrevMonth;
      months -= 1;
    }

    if (months < 0) {
      months += 12;
      years -= 1;
    }

    const totalMonths = years * 12 + months;
    const zodiacSign = getZodiacSign(dob.getMonth(), dob.getDate());

    setResult({ years, months, days, totalMonths, zodiacSign });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Age Calculator</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="birthDate"
              className="block text-sm font-medium mb-1"
            >
              Birth Date
            </label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Calculate Age
          </button>
        </form>

        {result && (
          <div className="mt-6 border-t pt-4 space-y-1 text-sm">
            <p>Your age is:{" "} <strong>{result.years} years, {result.months} months, and {result.days} days</strong></p>
            <p>Total months lived:{" "} <strong>{result.totalMonths} months</strong></p>
            <p>Zodiac Sign: <strong>{result.zodiacSign}</strong></p>
          </div>
        )}
      </div>
    </main>
  );
}
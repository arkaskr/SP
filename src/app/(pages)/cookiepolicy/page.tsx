
"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CookiesPolicyComponent = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Get current date in the format: February 26, 2025
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  return (
    <Card className="w-full mx-auto shadow-lg my-4 px-20">
      <CardHeader className="bg-slate-50 border-b">
        <CardTitle className="text-2xl font-bold text-blue-800 text-center">Cookies Policy</CardTitle>
        <p className="text-gray-600 text-center">
            SynergiaPrep Pvt. Ltd. |{" "}
            <a
              href="https://www.synergiaprep.com"
              className="text-blue-600 hover:underline"
            >
              www.synergiaprep.com
            </a>
          </p>
        <p className="text-xs md:text-sm text-center text-slate-400">Last Updated: {currentDate}</p>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-blue-700">What Are Cookies?</h2>
            <p className="text-sm md:text-base">
              Cookies are small text files stored on your device to enhance Platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">Types of Cookies We Use</h2>
            <ul className="list-disc ml-6 text-sm md:text-base space-y-2">
              <li>
                <span className="font-medium text-blue-600">Essential:</span> Necessary for login and payment processing.
              </li>
              <li>
                <span className="font-medium text-blue-600">Analytics:</span> Track usage patterns (e.g., Google Analytics).
              </li>
              <li>
                <span className="font-medium text-blue-600">Preferences:</span> Remember language/display settings.
              </li>
              <li>
                <span className="font-medium text-blue-600">Advertising:</span> Deliver targeted ads (opt-out available).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">Consent</h2>
            <ul className="list-disc ml-6 text-sm md:text-base">
              <li>By using the Platform, you consent to cookies unless disabled via browser settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">Managing Cookies</h2>
            <ul className="list-disc ml-6 text-sm md:text-base">
              <li>Adjust settings in your browser to block/delete cookies (may affect functionality).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">Third-Party Cookies</h2>
            <ul className="list-disc ml-6 text-sm md:text-base">
              <li>Ads or embedded content (e.g., YouTube videos) may use their own cookies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">Contact Us</h2>
            <p className="text-sm md:text-base">
              For questions or concerns, email <a href="mailto:support@synergiaprep.com" className="text-blue-600 hover:underline">support@synergiaprep.com</a>.
            </p>
          </section>
        </div>
      </CardContent>
    </Card>
  );
};

export default CookiesPolicyComponent;
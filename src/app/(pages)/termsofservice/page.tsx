
"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfServiceComponent = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Get current date in the format: February 26, 2025
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  return (
    <Card className="w-full mx-auto shadow-lg my-4 px-20">
      <CardHeader className="bg-slate-50 border-b">
        <CardTitle className="text-2xl font-bold text-blue-800 text-center">Terms of Use</CardTitle>
        <p className="text-gray-600 text-center">
            SynergiaPrep Pvt. Ltd. |{" "}
            <a
              href="https://www.synergiaprep.com"
              className="text-blue-600 hover:underline"
            >
              www.synergiaprep.com
            </a>
          </p>
        <p className="text-xs md:text-sm text-center text-slate-500">Last Updated: {currentDate}</p>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-blue-700">1. Acceptance of Terms</h2>
            <p className="text-sm md:text-base">
              By using synergiaprep.com (&quot;Platform&quot;), you agree to these Terms of Use. If you disagree, do not use the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">2. Eligibility</h2>
            <p className="text-sm md:text-base">
              Users must be at least 13 years old (or older as per local laws).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">3. Account Responsibilities</h2>
            <ul className="list-disc ml-6 text-sm md:text-base space-y-1">
              <li>Provide accurate information and safeguard your account credentials.</li>
              <li>Notify us immediately of unauthorized access at <a href="mailto:support@synergiaprep.com" className="text-blue-600 hover:underline">support@synergiaprep.com</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">4. Services</h2>
            <ul className="list-disc ml-6 text-sm md:text-base space-y-1">
              <li>Current offerings: Online exam preparation tools.</li>
              <li>Future R&D products may be added under the same Platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">5. Payment Terms</h2>
            <ul className="list-disc ml-6 text-sm md:text-base">
              <li>Fees for premium services are non-refundable unless required by law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">6. Intellectual Property</h2>
            <ul className="list-disc ml-6 text-sm md:text-base">
              <li>All content (e.g., courses, videos, quizzes) is owned by SynergiaPrep or licensors. Unauthorized use is prohibited.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">7. Prohibited Conduct</h2>
            <ul className="list-disc ml-6 text-sm md:text-base space-y-1">
              <li>Reverse engineering, spamming, or uploading harmful code.</li>
              <li>Sharing copyrighted material without permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">8. Disclaimers</h2>
            <ul className="list-disc ml-6 text-sm md:text-base">
              <li>Services are provided &quot;as is.&quot; We do not guarantee exam outcomes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">9. Limitation of Liability</h2>
            <ul className="list-disc ml-6 text-sm md:text-base">
              <li>We are not liable for indirect, incidental, or consequential damages arising from Platform use.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">10. Termination</h2>
            <ul className="list-disc ml-6 text-sm md:text-base">
              <li>We reserve the right to suspend accounts for violations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">11. Governing Law</h2>
            <ul className="list-disc ml-6 text-sm md:text-base">
              <li>Disputes governed by laws of [Jurisdiction, e.g., India].</li>
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

export default TermsOfServiceComponent;
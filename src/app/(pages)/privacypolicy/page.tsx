
"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicyComponent = () => {
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
        <CardTitle className="text-2xl font-bold text-blue-800 text-center">Privacy Policy</CardTitle>
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
      <CardContent className="p-4 md:p-6 ">
        <div className="space-y-6 ">
          <section>
            <h2 className="text-xl font-semibold text-blue-700">Introduction</h2>
            <p className="text-sm md:text-base ">
              Welcome to SynergiaPrep Pvt. Ltd. (&quot;SynergiaPrep,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). This Privacy Policy governs your use of our website (synergiaprep.com), mobile applications, and related services (collectively, the &quot;Platform&quot;). By accessing or using the Platform, you agree to the terms of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">Information We Collect</h2>
            <p className="text-sm md:text-base mb-2">We collect the following categories of information:</p>
            
            <div className="mb-4">
              <h3 className="text-sm md:text-base text-blue-600 font-medium mb-1">Personal Information:</h3>
              <ul className="list-disc ml-6 text-sm md:text-base space-y-1">
                <li>Name, email address, phone number, educational institution details, year of graduation, and user-uploaded photos/IDs.</li>
                <li>Payment details (processed securely via third-party gateways).</li>
                <li>Demographic data (e.g., location, preferences).</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm md:text-base text-blue-600 font-medium mb-1">Automated Data:</h3>
              <ul className="list-disc ml-6 text-sm md:text-base space-y-1">
                <li>IP address, device information, browser type, network data, and cookies (see Cookies Policy).</li>
                <li>Usage patterns (e.g., pages visited, time spent).</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm md:text-base text-blue-600 font-medium mb-1">Third-Party Registration:</h3>
              <ul className="list-disc ml-6 text-sm md:text-base">
                <li>If you register via Google/Facebook, we may access your profile information (subject to their policies).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">How We Use Your Information</h2>
            <ul className="list-disc ml-6 text-sm md:text-base space-y-1">
              <li>Deliver and personalize services (e.g., exam prep, future R&D products).</li>
              <li>Communicate updates, offers, or security alerts.</li>
              <li>Improve Platform functionality, analytics, and research.</li>
              <li>Comply with legal obligations and prevent fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">Sharing of Information</h2>
            <p className="text-sm md:text-base mb-2">We may share your data with:</p>
            <ul className="list-disc ml-6 text-sm md:text-base space-y-1">
              <li><span className="font-medium">Service Providers:</span> Payment processors, cloud hosting, and analytics partners.</li>
              <li><span className="font-medium">Legal Authorities:</span> To comply with court orders, laws, or protect rights.</li>
              <li><span className="font-medium">Business Transfers:</span> In case of mergers, acquisitions, or restructuring.</li>
              <li><span className="font-medium">Aggregated/Anonymized Data:</span> For marketing or research (no personal identifiers).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">Security Measures</h2>
            <ul className="list-disc ml-6 text-sm md:text-base space-y-1">
              <li>Encryption, access controls, and regular security audits.</li>
              <li>However, no internet transmission is 100% secure; use the Platform at your own risk.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">Your Rights</h2>
            <ul className="list-disc ml-6 text-sm md:text-base space-y-1">
              <li><span className="font-medium">Access/Correction:</span> Request a copy of your data or update inaccuracies.</li>
              <li><span className="font-medium">Deletion:</span> Ask us to delete your account/data (subject to legal requirements).</li>
              <li><span className="font-medium">Opt-Out:</span> Unsubscribe from marketing emails via the link in communications.</li>
              <li><span className="font-medium">Data Portability:</span> Request data in a machine-readable format.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">Children&apos;s Privacy</h2>
            <p className="text-sm md:text-base">
              The Platform is not intended for users under <span className="font-medium">13</span> (or higher age per local laws). We do not knowingly collect data from minors without parental consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">Updates to This Policy</h2>
            <p className="text-sm md:text-base">
              We may update this Policy periodically. Continued use of the Platform constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-700">Contact Us</h2>
            <p className="text-sm md:text-base">
              For questions or requests, email <a href="mailto:support@synergiaprep.com" className="text-blue-600 hover:underline">support@synergiaprep.com</a>.
            </p>
          </section>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacyPolicyComponent;
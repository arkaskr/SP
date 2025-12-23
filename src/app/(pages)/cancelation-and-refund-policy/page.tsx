
import React from "react";

export default function Page() {
  return (
    <div className="mx-auto p-6">
      <div className="space-y-6">
        <header className="border-b pb-4">
          <h1 className="text-2xl font-bold text-blue-800 text-center">
            Cancellation and Refund Policy
          </h1>
          <p className="text-gray-600 text-center">
            SynergiaPrep Pvt. Ltd. |{" "}
            <a
              href="https://www.synergiaprep.com"
              className="text-blue-600 hover:underline"
            >
              www.synergiaprep.com
            </a>
          </p>
        </header>

        <div className="prose">
          <p className="text-gray-700">
            Thank you for choosing SynergiaPrep. We strive to ensure you have a
            satisfying experience with our online exam preparation platform.
            Kindly review our cancellation and refund policy carefully:
          </p>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-blue-700">
              Cancellation Policy
            </h2>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              <li className="py-1">
                Users may cancel their subscription or course enrollment at any
                time by submitting a cancellation request via email to{" "}
                <a
                  href="mailto:support@synergiaprep.com"
                  className="text-blue-600 hover:underline"
                >
                  support@synergiaprep.com
                </a>
                .
              </li>
              <li className="py-1">
                Cancellation requests must include the registered email address,
                subscription details, and the reason for cancellation.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-blue-700">
              Refund Policy
            </h2>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              <li className="py-1">
                SynergiaPrep Pvt. Ltd. has a strict no refund policy. All
                purchases made are final and non-refundable.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-blue-700">Amendments</h2>
            <p className="mt-2 text-gray-700">
              SynergiaPrep Pvt. Ltd. reserves the right to revise these policies
              periodically. Any changes will be clearly communicated via our
              website and/or via email to our registered users.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-blue-700">
              Contact Information
            </h2>
            <p className="mt-2 text-gray-700">
              For queries regarding these policies, please contact:
            </p>
            <p className="mt-2 text-gray-700">
              Email:{" "}
              <a
                href="mailto:support@synergiaprep.com"
                className="text-blue-600 hover:underline"
              >
                support@synergiaprep.com
              </a>
            </p>
            <p className="mt-1 text-gray-700">
              Phone:{" "}
              <a
                href="tel:+918274995556"
                className="text-blue-600 hover:underline"
              >
                [+91 - 8274995556]
              </a>
            </p>
          </section>

          <p className="mt-8 text-center font-medium text-gray-700">
            Thank you for choosing SynergiaPrep Pvt. Ltd.
          </p>
        </div>
      </div>
    </div>
  );
}


import React from "react";

export default function Page() {
  return (
    <div className="mx-auto p-6">
      <div className="space-y-6">
        <header className="border-b pb-4">
          <h1 className="text-2xl font-bold text-blue-800 text-center">
            Shipping and Delivery Policy
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
            Kindly review our Shipping and Delivery Policy carefully:
          </p>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-blue-700">
              Shipping and Delivery Policy
            </h2>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              <li className="py-1">
                SynergiaPrep provides digital courses and materials; hence, no
                physical shipping is involved.
              </li>
              <li className="py-1">
                Upon successful payment, access to the purchased course or
                materials will be granted immediately or within 24 hours.
              </li>
              <li className="py-1">
                Billing information and confirmation will be shared to your
                registered mobile number or email address for authentication of
                the purchase.
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

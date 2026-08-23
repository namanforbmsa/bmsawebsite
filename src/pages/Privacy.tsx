/**
 * Privacy Policy Page
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-6">Privacy Policy</h1>

          <section className="prose lg:prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              At BMSA, we are committed to protecting the privacy and security of our users' personal information.
              This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use
              our online shipping services. By using our services, you agree to the collection and use of information in
              accordance with this policy.
            </p>

            <h2 className="font-semibold">Personal &amp; Business Information</h2>
            <p>
              When you create an account, we may collect the following personal and business details:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name of the Company.</li>
              <li>Name of the Concerned Person Using the Services.</li>
              <li>Company Email address.</li>
              <li>Registered Phone number for immediate contacting.</li>
              <li className="break-words">Documents related to the services. All documents so collected will be destroyed after the service has
                been completed. BMSA is not a custodian of documents; requests to retrieve documents after completion
                will not be accommodated. Sensitive documents (e.g., CP, Fixture Note, Recap, SOF) will be secured by
                BMSA.</li>
              <li>Billing address.</li>
              <li>Payment information (e.g., credit card details).</li>
            </ul>

            <h2 className="font-semibold">Technical Information</h2>
            <p>
              When you interact with our website, we may automatically collect certain technical information, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address.</li>
              <li>Browser type and version.</li>
              <li>Operating system.</li>
              <li>Device type.</li>
              <li>Pages visited on our site and duration of visit.</li>
              <li>Cookies and other tracking technologies (see the Cookies section).</li>
            </ul>

            <h2 className="font-semibold">How We Share Your Information</h2>
            <p>We may share your personal information with third parties in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service Providers:</strong> We may share data with third-party providers to fulfil services such
                as Hold Cleaning and Guidance, Underwater Hull Inspection and Cleaning, and Port Captain services. For
                laytime calculation, CP review, and voyage management purposes, we will not share your confidential
                information.
              </li>
              <li>
                <strong>Business Transfers:</strong> If BMSA undergoes a merger, acquisition, or asset sale, your
                information may be transferred as part of the transaction.
              </li>
              <li>
                <strong>Legal Compliance:</strong> We may disclose your information if required by law (e.g., subpoena,
                court order) or to protect the rights, property, or safety of BMSA and our customers.
              </li>
            </ul>
            <p>BMSA reserves the right to suspend or terminate accounts for violations of the Terms or misuse of the service.</p>

            <h2 className="font-semibold">Data Retention</h2>
            <p>
              We retain your personal information only as long as necessary to fulfil the purposes outlined in this
              Privacy Policy or to comply with legal obligations. Once data is no longer needed, we will securely delete
              or anonymize it.
            </p>

            <h2 className="font-semibold">Security of Your Information</h2>
            <p>
              We use commercially reasonable security measures to protect your personal information from unauthorized
              access, disclosure, alteration, or destruction. Measures include encryption of sensitive data, regular
              security audits, and restricted access to authorized personnel. However, no method of transmission or
              electronic storage is 100% secure, so absolute security cannot be guaranteed.
            </p>

            <h2 className="font-semibold">Your Rights and Choices</h2>
            <p>
              Depending on your location and applicable laws, you may have rights regarding your personal information,
              including the right to correct, delete, or opt-out of marketing communications. To exercise these rights,
              please contact us at <a href="mailto:operations@bmsagroup.net" className="underline">operations@bmsagroup.net</a>.
            </p>

            <h2 className="font-semibold">Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, personalize content and ads, and
              understand how users interact with our site. You can control cookies via your browser settings; note that
              disabling cookies may affect site functionality.
            </p>

            <h2 className="font-semibold">International Data Transfers</h2>
            <p>
              If you are located outside the country where our servers are hosted, your information may be transferred
              and processed in a different country. We ensure such transfers comply with applicable laws and that
              safeguards are in place to protect your data.
            </p>

            <p>
              If you have questions about this Privacy Policy, please <Link to="/contact" className="underline">contact us</Link>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;

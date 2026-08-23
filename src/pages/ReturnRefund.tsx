/**
 * Return & Refund Policy Page
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ReturnRefund = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-6">Return &amp; Refund Policy</h1>

          <section className="prose lg:prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              At BMSA, we strive to offer top-quality services and ensure customer satisfaction. However, if a
              situation arises where a refund or return is appropriate, this policy outlines the terms and conditions
              governing such requests.
            </p>

            <h2 className="font-semibold">Eligibility for Refunds</h2>
            <p>Refunds may be issued under the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service Not Rendered:</strong> If the service was not provided as described or promised.
              </li>
              <li>
                <strong>Technical Issues:</strong> If significant technical problems prevent proper use of the service
                and we are unable to resolve the issue within a reasonable time.
              </li>
              <li>
                <strong>Error in Billing:</strong> If you were charged incorrectly due to a system or billing error.
              </li>
            </ul>

            <h2 className="font-semibold">Non-Refundable Items</h2>
            <p>The following circumstances are typically non-refundable:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Partially Used Services:</strong> If you have already used part of a service, no refund will be
                issued for the unused portion unless there are extenuating circumstances.
              </li>
              <li>
                <strong>Change of Mind:</strong> Refunds will not be issued simply because you changed your mind about
                using the service.
              </li>
              <li>
                <strong>Violation of Terms:</strong> If you have violated our Terms of Service, refunds will not be
                provided.
              </li>
            </ul>

            <h2 className="font-semibold">Refund Request Process</h2>
            <p>To request a refund, please follow these steps:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Submit a Request:</strong> Contact our customer support team at <a href="mailto:operations@bmsagroup.net" className="underline">operations@bmsagroup.net</a>.
                Provide your transaction details, the reason for the refund, and any supporting documentation.
              </li>
              <li>
                <strong>Evaluation:</strong> Our team will evaluate your request within 3–5 business days.
              </li>
              <li>
                <strong>Resolution:</strong> If approved, the refund will be processed and credited back to your
                original payment method within 7–10 business days.
              </li>
            </ol>

            <h2 className="font-semibold">Service-Specific Refunds</h2>
            <p>
              Certain services may have unique refund policies which will be outlined at the point of purchase. Please
              review individual service terms for details.
            </p>

            <h2 className="font-semibold">Changes to this Policy</h2>
            <p>
              We reserve the right to modify or update this Return and Refund Policy at any time. Changes will be
              effective immediately upon posting. Please review this policy periodically for updates.
            </p>

            <p>
              For assistance or questions about refunds, please <Link to="/contact" className="underline">contact us</Link>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnRefund;

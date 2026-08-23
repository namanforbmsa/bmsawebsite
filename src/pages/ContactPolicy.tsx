/**
 * Contact Us Policy Page
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ContactPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-6">Contact Us Policy</h1>

          <section className="prose lg:prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              At BMSA we prioritize providing exceptional customer service to ensure that your online payment
              experience is smooth, secure, and hassle-free. If you have any questions, concerns, or require assistance
              regarding online payments, we are here to help.
            </p>

            <h2 className="font-semibold">How to Contact Us</h2>
            <p>You can reach our customer support team through the following channels:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Email Support:</strong> For general inquiries or technical support, email us at
                <a href="mailto:operations@bmsagroup.net" className="underline"> operations@bmsagroup.net</a>. We aim to
                respond within 24–48 hours.
              </li>
              <li>
                <strong>Phone Support:</strong> Call our toll-free number <a href="tel:+919004138991" className="underline">+91-9004138991</a>
                (Monday–Friday, 9 AM–5 PM IST).
              </li>
              <li>
                <strong>Contact Page:</strong> Use the <Link to="/contact" className="underline">Contact page</Link> for
                service requests and forms.
              </li>
            </ul>

            <h2 className="font-semibold">Common Issues We Address</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment confirmation issues.</li>
              <li>Transaction failures or declines.</li>
              <li>Refund requests or inquiries.</li>
              <li>Security and privacy concerns related to payments.</li>
              <li>General questions about payment options and policies.</li>
            </ul>

            <h2 className="font-semibold">Refund and Dispute Inquiries</h2>
            <p>
              For inquiries related to refunds, disputes, or chargebacks, please include the following information to
              expedite the process:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Transaction ID or Order Number.</li>
              <li>Date of the transaction.</li>
              <li>The payment method used.</li>
              <li>A brief description of the issue.</li>
            </ul>

            <h2 className="font-semibold">Escalations</h2>
            <p>
              If your issue is not resolved to your satisfaction, request an escalation. Our senior support team will
              review escalated cases and respond within 48 hours.
            </p>

            <h2 className="font-semibold">Security and Privacy</h2>
            <p>
              We are committed to protecting your privacy and the security of your financial information. For more
              details on how we handle your data, please review our <Link to="/privacy" className="underline">Privacy Policy</Link>
              and <Link to="/terms" className="underline">Terms of Service</Link>.
            </p>

            <p>
              We value your business and are committed to ensuring that your online payment experience is both secure
              and efficient. Thank you for choosing BMSA.
            </p>

            <p className="text-sm text-muted-foreground">Feel free to adjust placeholders and details according to your company's specific policies.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPolicy;

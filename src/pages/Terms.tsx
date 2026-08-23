/**
 * Terms & Conditions Page
 *
 * Simple static page showing Terms & Conditions with the project's heading theme.
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Terms = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-6">Terms &amp; Conditions</h1>

          <section className="prose lg:prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              Welcome to BMSA. These Terms and Conditions outline the rules and regulations for using our online
              shipping services. By accessing or using our website and shipping services, you agree to comply with and be
              bound by these terms. If you do not agree, please discontinue using our services immediately.
            </p>

            <h2 className="font-semibold">Acceptance of Terms</h2>
            <p>
              By using our online shipping services, you agree to be legally bound by these Terms and Conditions, our
              Privacy Policy, and any other guidelines or rules applicable to specific services or features provided by
              BMSA. These terms may be updated from time to time, and it is your responsibility to review them
              regularly.
            </p>

            <h2 className="font-semibold">Services We Provide</h2>
            <p>We offer a variety of shipping-related services, including but not limited to:</p>
            <ul className="list-disc list-inside">
              <li>Laytime Calculation Services</li>
              <li>Charter Party Reviews</li>
              <li>Hold Cleaning and Guidance</li>
              <li>Voyage Operation</li>
              <li>Port Captain</li>
              <li>Underwater Hull Inspection and Cleaning</li>
            </ul>

            <h2 className="font-semibold">User Account Registration</h2>
            <p>
              To use certain features of our online shipping services, you may be required to create an account. You
              agree to provide accurate and complete information during registration, keep your login credentials
              secure and confidential, and be responsible for all activities conducted under your account. BMSA reserves
              the right to suspend or terminate accounts for violations of these Terms or misuse of the service.
            </p>

            <h2 className="font-semibold">Termination of Services</h2>
            <p>
              We reserve the right to terminate or suspend your access to our online shipping services if you violate
              these Terms, provide false information, or misuse our services. In the event of termination, any pending
              shipments may be canceled, and any fees paid for unused services will be refunded as applicable.
            </p>

            <h2 className="font-semibold">Changes to Terms and Services</h2>
            <p>
              BMSA reserves the right to modify or update these Terms and Conditions at any time. Any changes will be
              effective upon posting on our website. Your continued use of the service after such changes constitutes
              your acceptance of the revised Terms.
            </p>

            <h2 className="font-semibold">Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any
              disputes arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the
              courts in Mumbai High Court, Maharashtra, India.
            </p>

            <p>
              If you have questions about these Terms, please <Link to="/contact" className="underline">contact us</Link>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;

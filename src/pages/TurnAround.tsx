/**
 * Turn Around Time Policy Page
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const TurnAround = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-6">Turn Around Time Policy</h1>

          <section className="prose lg:prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              At BMSA we strive to deliver service quickly, accurately, and efficiently. The turnaround time
              refers to the total time from when an order is placed to when it is processed and delivered. Turnaround
              time depends on the type of service selected and on receipt of all required documents.
            </p>

            <h2 className="font-semibold">Order Processing Time — Laytime Calculation Service</h2>
            <p>Once you place an order, our team will process it as quickly as possible. Standard processing times are:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Same-Day Processing:</strong> Orders placed before the cutoff time (e.g., <em>12:00 PM IST</em>) on a
                business day will be processed and emailed the same day, provided all documents are received.
              </li>
              <li>
                <strong>Next-Day Processing:</strong> Orders placed after the cutoff time will be processed and emailed on
                the following business day, provided all documents are received.
              </li>
              <li>
                <strong>Weekends and Holidays:</strong> Orders placed on weekends or public holidays will be processed on the
                next business day, provided all documents are received.
              </li>
            </ul>

            <h2 className="font-semibold">Order Processing Time — CP Review Service</h2>
            <p>For Charter Party (CP) Review orders, standard processing times are:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Three-Day Processing:</strong> CP Review orders placed during a business day will be processed and
                emailed within three business days, provided all required documents are received.
              </li>
              <li>
                <strong>Weekends and Holidays:</strong> CP Review orders placed on weekends or public holidays will be
                processed and emailed within three business days from the next business day, provided all documents are
                received.
              </li>
            </ul>

            <h2 className="font-semibold">Order Processing — Other Services</h2>
            <p>
              For other services, including Hold Cleaning and Guidance, Port Captain, Underwater Hull Inspection and
              Cleaning, and voyage-related support, our team will contact you after receiving your order to clarify the
              scope, confirm documentation, and provide an estimated timeline specific to your request.
            </p>

            <h2 className="font-semibold">Notes and Conditions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All processing timelines assume receipt of complete and accurate documentation.</li>
              <li>Delays in providing documents, additional clarifications, or external dependencies (e.g., port
                operations, third-party vendors) may extend processing times.</li>
              <li>If you require expedited handling, please contact us and we will advise on feasibility and any
                applicable charges.</li>
            </ul>

            <p>
              For specific questions or to check the status of an order, please <Link to="/contact" className="underline">contact us</Link>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TurnAround;

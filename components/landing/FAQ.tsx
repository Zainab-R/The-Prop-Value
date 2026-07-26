const faqs = [
  {
    q: "Are these property prices exact?",
    a: "No. Prop Value provides an estimated price range based on the information you enter.",
  },
  {
    q: "Can I buy or sell property here?",
    a: "No. Prop Value is only a property valuation platform and does not list or sell properties.",
  },
  {
    q: "Can prices be updated?",
    a: "Yes. Administrators can update pricing rules and sector values from the admin panel.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-center text-4xl font-bold text-[#102A43]">
          Frequently Asked Questions
        </h2>

        <div className="mt-16 space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-xl border p-6"
            >
              <h3 className="font-semibold text-lg text-[#102A43]">
                {faq.q}
              </h3>

              <p className="mt-3 text-gray-600">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
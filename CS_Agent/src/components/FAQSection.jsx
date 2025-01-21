import React, { useState } from "react";

const FAQSection = () => {
  const faqs = [
    {
      question: "What is the PM-Kisan Scheme?",
      answer:
        "It is a Central Sector Scheme designed to provide income support to all landholding farmers' families in India to meet agricultural and domestic needs. The Government of India bears the entire financial liability.",
    },
    {
      question: "Who is eligible to receive benefits under the scheme?",
      answer:
        "All landholding farmers' families with cultivable land in their names are eligible.",
    },
    {
      question: "What are the benefits provided under the scheme?",
      answer:
        "Eligible farmers receive ₹6,000 per year, paid in three installments of ₹2,000 every four months.",
    },
    {
      question: "How are beneficiaries identified?",
      answer:
        "State/UT governments identify beneficiaries based on land ownership records.",
    },
    {
      question: "How is the benefit amount transferred?",
      answer:
        "The financial benefit is directly credited into the beneficiaries’ bank accounts.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            <button
              className="flex justify-between items-center w-full text-lg font-semibold text-gray-800"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className="text-xl">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>
            {activeIndex === index && (
              <div className="mt-3 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;

import React from "react";
import FaqItem from "./faqItem";

const FaqComp = () => {
  const faqs = [
    {
      qsn: "what is react?",
      ans: "react is a js library for building user interfaces",
    },
    {
      qsn: "what is jsx?",
      ans: "jsx is a syntax extension for javascript that looks similar to html and is used in react to describe the UI structure",
    },
    {
      qsn: "what is a component?",
      ans: "a component is a reusable piece of code that represents a part of the user interface in a react application",
    },
  ];
  return (
    <div>
      {faqs.map((faq, index) => {
        return <FaqItem faq={faq} index={index} />;
      })}
    </div>
  );
};

export default FaqComp;

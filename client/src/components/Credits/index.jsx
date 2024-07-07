import React from "react";

const Credits = () => {
  return (
    <span className="text-sm text-gray-600">
      <a
        href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline hover:text-blue-700"
      >
        Nanny Stork AI Pre-Alpha v0.1.0
      </a>
      . Demo purposes only. Based on the ChatGPT model by OpenAI.
    </span>
  );
};

export default Credits;

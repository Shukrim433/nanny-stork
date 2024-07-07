import quoteArray from "../../utils/quotes";
import { useState, useEffect } from "react";
// Import our custom hook.
import { useTheme } from "../../utils/ThemeContext";

export default function QuoteContainer() {
  // Pluck values from our ThemeContext by invoking our useTheme hook
  const { pinkTheme, toggleTheme } = useTheme();

  // Object containing CSS gradient for pinkTheme and blueTheme
  const themeStyles = pinkTheme // if pinkTheme is set to true...
    ? "baby-quote-container w-full bg-pink-200 flex items-center justify-center mb-11 mt-5 py-20 transition duration-300" // this is the pinl theme styling
    : "baby-quote-container w-full bg-blue-200 flex items-center justify-center mb-11 mt-5 py-20 transition duration-300"; // else this is the blue theme styling

  const [Currentquote, setCurrentQuote] = useState({});

  useEffect(() => {
    const randomQuote =
      quoteArray[Math.floor(Math.random() * quoteArray.length)];
    setCurrentQuote(randomQuote);
  }, []);

  return (
    <div className={themeStyles}>
      <div className="baby-quote max-w-xl text-center">
        <p className="baby-quote-text text-xl font-semibold text-white">
          "{Currentquote.quote}" - {Currentquote.author}
        </p>
      </div>
    </div>
  );
}

import quoteArray from "../../utils/quotes";
import { useState, useEffect } from "react";

export default function QuoteContainer() {

    const [Currentquote, setCurrentQuote] = useState({});

    useEffect(() => {
        const randomQuote = quoteArray[Math.floor(Math.random() * quoteArray.length)];
        setCurrentQuote(randomQuote);
    
    },[]);

    return (
    <div className="baby-quote-container w-full bg-pink-200 flex items-center justify-center mb-11 mt-5 py-20">
        <div className="baby-quote max-w-xl text-center">
            <p className="baby-quote-text text-xl font-semibold text-white">
                "{Currentquote.quote}" - {Currentquote.author}
            </p>
        </div>
    </div>
    )
}
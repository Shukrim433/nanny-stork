import React from 'react';

const HomeOptions = () => {
    return (
        <div className="md:flex items-start text-center gap-4">
            <div className="flex flex-col mb-8 md:mb-0 gap-4 flex-grow">
                <h2 className="flex items-center justify-center gap-2 text-lg font-normal md:flex-col">
                    Examples
                </h2>
                <ul className="flex flex-col gap-4 w-full max-w-md mx-auto">
                    <button className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">"Explain quantum computing in simple terms" →</button>
                    <button className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">"Got any creative ideas for a 10 year old’s birthday?" →</button>
                    <button className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">"How do I make an HTTP request in Javascript?" →</button>
                </ul>
            </div>
            <div className="flex flex-col mb-8 md:mb-0 gap-4 flex-grow">
                <h2 className="flex items-center justify-center gap-2 text-lg font-normal md:flex-col">
                    Capabilities
                </h2>
                <ul className="flex flex-col gap-4 w-full max-w-md mx-auto">
                    <li className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300">Remembers what user said earlier in the conversation</li>
                    <li className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300">Allows user to provide follow-up corrections</li>
                    <li className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300">Trained to decline inappropriate requests</li>
                </ul>
            </div>
            <div className="flex flex-col mb-8 md:mb-0 gap-4 flex-grow">
                <h2 className="flex items-center justify-center gap-2 text-lg font-normal md:flex-col">
                    Limitations
                </h2>
                <ul className="flex flex-col gap-4 w-full max-w-md mx-auto">
                    <li className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300">May occasionally generate incorrect information</li>
                    <li className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300">May occasionally produce harmful instructions or biased content</li>
                    <li className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300">Limited knowledge of world and events after 2021</li>
                </ul>
            </div>
        </div>
    )
}

export default HomeOptions
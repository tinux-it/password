"use client"
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Define the type for options
type PasswordOptions = {
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    specials: boolean;
    length: number;
}

export default function Home() {
    const [generatedPassword, setGeneratedPassword] = useState("");
    const [options, setOptions] = useState<PasswordOptions>({
        lowercase: true,
        uppercase: false,
        numbers: false,
        specials: false,
        length: 16
    });
    const [showCopyMessage, setShowCopyMessage] = useState(false);

    // Use useCallback to memoize the generatePassword function
    const generatePassword = useCallback(() => {
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const specialChars = "!@#$%^&*()_-+=";

        let charset = "";
        if (options.lowercase) charset += lowercase;
        if (options.uppercase) charset += uppercase;
        if (options.numbers) charset += numbers;
        if (options.specials) charset += specialChars;

        if (charset === "") charset = lowercase;

        let newPassword = "";
        for (let i = 0; i < options.length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        setGeneratedPassword(newPassword);
    }, [options]); // Add options as a dependency

    // Generate password whenever options change
    useEffect(() => {
        generatePassword();
    }, [generatePassword]); // Now correctly depends on the memoized function

    // Auto-hide the copy message after 2 seconds
    useEffect(() => {
        if (showCopyMessage) {
            const timer = setTimeout(() => {
                setShowCopyMessage(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showCopyMessage]);

    function handleCheckboxChange(option: keyof PasswordOptions) {
        if (typeof options[option] === 'boolean') {
            setOptions(prevOptions => ({
                ...prevOptions,
                [option]: !prevOptions[option]
            }));
        }
    }

    function handleLengthChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newLength = parseInt(event.target.value, 10);
        setOptions(prevOptions => ({
            ...prevOptions,
            length: newLength
        }));
    }

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(generatedPassword);
            setShowCopyMessage(true);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900">
            {/* Flash Message */}
            <div
                className={`fixed top-4 transform transition-all duration-300 ease-in-out ${
                    showCopyMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                }`}
            >
                <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Password copied to clipboard!
                </div>
            </div>

            <div className="relative flex flex-col my-6 bg-gray-800 shadow-xl rounded-xl w-full max-w-md overflow-hidden border border-gray-700">
                {/* Header Image */}
                <div className="relative h-40 overflow-hidden">
                    <Image
                        src={"https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
                        alt={"Digital security lock"}
                        className="w-full h-full object-cover"
                        width={800}
                        height={400}
                        quality={80}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800 opacity-90"></div>
                    <div className="absolute bottom-0 left-0 p-5">
                        <h1 className="text-2xl font-bold text-white">Secure Password Generator</h1>
                        <p className="text-gray-300 text-sm">Create strong, unique passwords instantly</p>
                    </div>
                </div>

                {/* Password Display */}
                <div className="px-5 py-4">
                    <div className="p-3 bg-gray-900 border border-gray-700 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1 flex justify-between items-center">
                            <span>Generated password</span>
                            <button
                                className="text-xs text-blue-400 hover:text-blue-300 focus:outline-none flex items-center"
                                onClick={copyToClipboard}
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                                </svg>
                                Copy
                            </button>
                        </div>
                        <div className="text-lg font-mono break-all text-blue-300" id="generated-password">
                            {generatedPassword}
                        </div>
                    </div>
                </div>

                {/* Options Panel */}
                <div className="p-5 bg-gray-800">
                    {/* Length Slider */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="length-slider"
                                   className="text-sm font-medium text-gray-300">
                                Password Length
                            </label>
                            <span className="text-blue-400 font-mono bg-gray-900 px-2 py-1 rounded text-xs">
                {options.length}
              </span>
                        </div>
                        <input
                            id="length-slider"
                            type="range"
                            min="8"
                            max="32"
                            step="1"
                            value={options.length}
                            onChange={handleLengthChange}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>8</span>
                            <span>16</span>
                            <span>24</span>
                            <span>32</span>
                        </div>
                    </div>

                    {/* Character Options */}
                    <h6 className="mb-3 text-sm font-medium text-gray-300 border-b border-gray-700 pb-2">
                        Character Types
                    </h6>

                    <div className="space-y-3">
                        <div className="flex items-center">
                            <input
                                checked={options.lowercase}
                                id="lowercase-checkbox"
                                type="checkbox"
                                onChange={() => handleCheckboxChange('lowercase')}
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded-sm focus:ring-blue-500 focus:ring-opacity-25"
                            />
                            <label htmlFor="lowercase-checkbox"
                                   className="ms-2 text-sm text-gray-300">
                                Lowercase (a-z)
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                checked={options.uppercase}
                                id="uppercase-checkbox"
                                type="checkbox"
                                onChange={() => handleCheckboxChange('uppercase')}
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded-sm focus:ring-blue-500 focus:ring-opacity-25"
                            />
                            <label htmlFor="uppercase-checkbox"
                                   className="ms-2 text-sm text-gray-300">
                                Uppercase (A-Z)
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                checked={options.numbers}
                                id="numbers-checkbox"
                                type="checkbox"
                                onChange={() => handleCheckboxChange('numbers')}
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded-sm focus:ring-blue-500 focus:ring-opacity-25"
                            />
                            <label htmlFor="numbers-checkbox"
                                   className="ms-2 text-sm text-gray-300">
                                Numbers (0-9)
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                checked={options.specials}
                                id="specials-checkbox"
                                type="checkbox"
                                onChange={() => handleCheckboxChange('specials')}
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded-sm focus:ring-blue-500 focus:ring-opacity-25"
                            />
                            <label htmlFor="specials-checkbox"
                                   className="ms-2 text-sm text-gray-300">
                                Special characters (!@#$%^&*()_-+=)
                            </label>
                        </div>
                    </div>
                </div>

                {/* Footer */}
            </div>

            <div className="text-gray-500 text-xs mt-4">
                <a href="https://tomemming.nl">Made with ❤️ by Tom Emming</a>
            </div>
        </div>
    );
}
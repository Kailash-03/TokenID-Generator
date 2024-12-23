import { useState, useCallback, useEffect } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [numberOfTokens, setNumberOfTokens] = useState(1);
  const [tokens, setTokens] = useState([]);

  // Function to generate a single token
  const generateToken = useCallback(() => {
    let token = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*()_+-={}|[]:;<>?,./';

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length);
      token += str.charAt(char);
    }
    return token;
  }, [length, numberAllowed, characterAllowed]);

  // Function to generate multiple unique tokens
  const generateTokens = useCallback(() => {
    const uniqueTokens = new Set();

    while (uniqueTokens.size < numberOfTokens) {
      const token = generateToken();
      uniqueTokens.add(token);
    }

    setTokens(Array.from(uniqueTokens));
  }, [generateToken, numberOfTokens]);

  // Function to copy a token to the clipboard
  const copyToClipboard = useCallback((token) => {
    window.navigator.clipboard.writeText(token);
    alert(`Copied: ${token}`);
  }, []);

  // Regenerate tokens when dependencies change
  useEffect(() => {
    generateTokens();
  }, [length, numberAllowed, characterAllowed, numberOfTokens, generateTokens]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
      <div className='w-11/12 max-w-4xl bg-white shadow-lg rounded-lg p-6'>
        <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>
          Unique Token ID Generator
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex items-center gap-x-2'>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer w-full'
              onChange={(e) => setLength(e.target.value)}
            />
            <label className='text-gray-700 font-medium'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input
              type='checkbox'
              checked={numberAllowed}
              id='numberInput'
              onChange={() => setNumberAllowed((prev) => !prev)}
              className='h-5 w-5 text-pink-500'
            />
            <label className='text-gray-700 font-medium'>Allow Numbers</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input
              type='checkbox'
              checked={characterAllowed}
              id='characterInput'
              onChange={() => setCharacterAllowed((prev) => !prev)}
              className='h-5 w-5 text-pink-500'
            />
            <label className='text-gray-700 font-medium'>Allow Characters</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <label className='text-gray-700 font-medium'>Tokens:</label>
            <input
              type='number'
              min={1}
              value={numberOfTokens}
              className='outline-none w-20 text-center rounded-lg border border-gray-300 py-1'
              onChange={(e) => setNumberOfTokens(Number(e.target.value))}
            />
          </div>
        </div>
        <div className='mt-6 bg-gray-100 rounded-lg p-4 max-h-64 overflow-y-auto'>
          <h2 className='text-lg font-semibold text-gray-800 mb-2'>Generated Tokens:</h2>
          {tokens.map((token, index) => (
            <div
              key={index}
              className='flex items-center justify-between bg-white p-2 mb-2 rounded-lg shadow-sm border'
            >
              <span className='text-gray-600 font-mono text-sm'>{index + 1}: {token}</span>
              <button
                className='bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-3 py-1 text-sm'
                onClick={() => copyToClipboard(token)}
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

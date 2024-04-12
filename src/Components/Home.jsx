import React, { useState, useEffect } from 'react';
import waveImage from '../assets/water.png'; // Import your water image
import airdropImage from '../assets/airdrop.png'; // Import your clock image
import './css/Home.css'; // Import CSS file for animations

function Home() {
  const [text, setText] = useState('');
  const sentences = [
    "Payments tool for software companies",
    "From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack."
  ];
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const currentSentence = sentences[sentenceIndex];

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < currentSentence.length) {
        setText(currentText => currentText + currentSentence[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setText('');
          setSentenceIndex((sentenceIndex + 1) % sentences.length);
        }, 2000);
      }
    }, 100); // Typing speed in milliseconds

    return () => clearInterval(timer);
  }, [sentenceIndex, currentSentence, sentences]);

  return (
    <div className="h-screen relative overflow-hidden">
      <section className="bg-transparent dark:bg-transparent flex justify-center items-center">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Welcome to Airdrop <br /> Manager</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl font-w-400 dark:text-gray-600">The Airdrop Manager is a comprehensive tool designed to streamline task management and facilitate efficient tracking of airdrop data.</p>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={airdropImage} alt="mockup" className="w-full" /> {/* Use airdropImage */}
          </div>                
        </div>
      </section>
      <div className="wave-container flex items-center justify-center">
        {/* Background wave image */}
        <img
          src={waveImage}
          alt="Wave"
          className="absolute top-0 right-0 w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Animated wave image */}
        <img
          src={waveImage}
          alt="Wave"
          className="absolute top-full right-0 w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'waveAnimation 10s linear infinite', // Adjust animation duration as needed
            animationTimingFunction: 'cubic-bezier(0.36, 0.45, 0.63, 0.53)', // Custom easing
          }}
        />
      </div>
    </div>
  );
}

export default Home;

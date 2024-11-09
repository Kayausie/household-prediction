'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [expandedIndex, setExpandedIndex] = useState(null);

    {/* Expand Function */}
    const expand = (index) => {
      if (expandedIndex === index) {
        setExpandedIndex(null); 
      } else {
        setExpandedIndex(index);
      }
    };

    {/* Scroll Down to Pane Function */}
    const scroll = () => {
      const faqElement = document.getElementById('faq');
      if (faqElement) {
        faqElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (  
        <div className="relative w-screen h-[calc(100vh-100px)]">
            <div className="absolute inset-0 z-0">
            {/* Hero Image */}
            <img
              src="/hero.jpeg"
              alt="house hero image"
              class="object-cover object-center w-full h-full"
            />
            </div>
            {/* Centre Box */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full">
                <div className="bg-white bg-opacity-40 p-6 rounded-lg shadow-lg backdrop-blur-lg">
                    <h1 className="text-xl font-bold text-black">Buying, Selling or Curious? Our AI Knows Best!</h1>
                    <p className="text-black" style={{ marginTop: '16px', marginBottom: '32px' }}>
                        We’ll equip you with all the essential information you need—more
                        <br /> detailed and comprehensive than what any real estate agent can offer.
                    </p>
                    {/* Redirect to Predict Button */}
                    <div className="flex space-x-4">
                        <Button
                            onClick={() => navigate('/predict')}
                            variant="contained"
                            sx={{
                                bgcolor: 'black',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '20px',
                                flex: 1,
                                '&:hover': {
                                    bgcolor: 'transparent',
                                    borderRadius: '20px',
                                    border: '1px solid black',
                                    color: 'black',
                                },
                            }}
                        >
                            View Insight
                        </Button>
                        {/* Scroll Button */}
                        <Button
                            variant="outlined"
                            onClick={scroll}
                            sx={{
                                borderColor: 'white',
                                color: 'black',
                                padding: '5px 10px',
                                borderRadius: '20px',
                                flex: 0.5,
                                '&:hover': {
                                    bgcolor: '#355E3B',
                                    borderColor: '#355E3B',
                                    borderRadius: '20px',
                                    color: 'white',
                                },
                            }}
                        >
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
            {/* Three Illustrations */}
            <div className="absolute inset-x-0 top-[calc(100vh-40px)] z-10 flex justify-center space-x-4">
                <img
                    src="house-search.png"
                    alt="illustration"
                    className="w-1/3 md:w-1/4 lg:w-1/5 h-auto"
                    />
                    
                
                <img
                  src="/illustration.svg"
                  alt="illustration"

                  className="w-1/3 md:w-1/4 lg:w-1/5 h-auto"
                  />
                <img
                    src="/illustration2.svg"
                    alt="illustration"
                    className="w-1/3 md:w-1/4 lg:w-1/5 h-auto"
                />
            </div>

            {/* FAQ Heading */}
            <div className="absolute inset-x-0 top-[calc(100vh+465px)] z-10 flex justify-center items-center mb-10">
              <h1 className="text-3xl font-bold text-white">FAQ - Insight on Us</h1>
            </div>

            {/* FAQ and Side Image*/}
            <div id="faq" className="absolute inset-x-0 top-[calc(100vh+580px)] z-10 flex justify-center mt-10 p-4">
                  <div className="w-full md:w-[85%] lg:w-[70%] flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
                    {/* Side Image */}
                    <div className="w-full md:w-1/2 lg:w-1/2 flex-shrink-0">
                    <img
                        src="/side_img.jpeg"
                        alt="side image"
                        class="shadow-lg object-cover w-full h-auto"
                      />
                    </div>
                    {/* FAQ Pane */}
                    <div className="w-full md:w-1/2 lg:w-1/2 bg-gray-100 p-6 shadow-lg">
                        {[
                            { question: "What is HouseAI?", answer: "HouseAI is a machine learning model developed by us to provide insights on housing. \
                              The mode provides real-time predictions through analsying a large data set of properties in Melbourne." },
                            { question: "How much is the service?", answer: "Free! we won't charge you for using the service at all." },
                            { question: "Who are the developers?", answer: "Group 13 - 08, minus Patrick because he stopped coming to workshops" },
                            { question: "What should I do with the information?", answer: "You can use this information to be more informed when buying or selling a house." },
                        ].map((item, index) => (
                            <div key={index} className="border-b border-gray-300 py-4">
                                <div
                                    onClick={() => expand(index)}
                                    className="flex justify-between items-center cursor-pointer"
                                >
                                    <h2 className="font-medium text-lg sm:text-xl md:text-2xl text-black">{item.question}</h2>
                                    <span className="text-black">{expandedIndex === index ? '-' : '+'}</span>
                                </div>
                                {expandedIndex === index && (
                                    <p className="mt-2 text-gray-700">{item.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

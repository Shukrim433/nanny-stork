import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuoteContainer from '../components/quote-container';

const AboutUs = () => {
  return (
    <>
    <QuoteContainer />
      <div className="about-us-container flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-center max-w-3xl">
          Welcome to our platform! We provide useful resources and support for new parents. Our AI helps you with parenting challenges and connects you with a community of mothers and mothers-to-be.
        </p>
        <p className="text-lg text-center max-w-3xl mt-4">
        Becoming a new parent is a joyful yet challenging experience. Recovering from childbirth, managing a newborn's 
        sleep and feeding schedules, understanding a baby's needs, and adjusting to new family dynamics can be overwhelming. To support new parents throughout their journey, we propose AI-powered Nanny Stork system that offers 24/7 advice, care, and tips. This system will provide personalized planning, child development tracking, early monitoring, symptom management, nutritional guidance, emotional support, postpartum care, and more.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;

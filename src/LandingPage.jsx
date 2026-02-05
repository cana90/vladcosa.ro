import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function LandingPage() {
    return (
        <div className="min-h-screen bg-cream-50">
            <Navigation />
            <Hero />
            <div className="w-full h-px bg-sage-200" />
            <About />
            <div className="w-full h-px bg-sage-200" />
            <Services />
            <div className="w-full h-px bg-sage-200" />
            <Contact />
            <Footer />
        </div>
    );
}

export default LandingPage;
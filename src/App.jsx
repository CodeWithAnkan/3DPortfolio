import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react"
import Hero from "./sections/Hero.jsx";
import ShowcaseSection from "./sections/ShowcaseSection.jsx";
import NavBar from "./components/NavBar.jsx";
import LogoSection from "./sections/LogoSection.jsx";
import FeatureCards from "./sections/FeatureCards.jsx";
import ExperienceSection from "./sections/ExperienceSection.jsx";
import TechStack from "./sections/TechStack.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import { SpeedInsights } from '@vercel/speed-insights/react';

const App = () => {
    const [theme, setTheme] = useState('dark'); // Default theme

    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

        if (savedTheme) {
            setTheme(savedTheme);
        } else if (prefersLight) {
            setTheme('light');
        } else {
            setTheme('dark'); // Default to dark if no preference or system is dark
        }
    };

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        loadTheme();
    }, []); // Run once on mount

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <>
            <NavBar toggleTheme={toggleTheme} currentTheme={theme} />
            <Hero />
            <ShowcaseSection />
            <LogoSection />
            <FeatureCards />
            <ExperienceSection />
            <TechStack />
            <Contact />
            <Footer />
            <Analytics />
            <SpeedInsights />
        </>
    )
}
export default App

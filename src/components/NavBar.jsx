import React, { useEffect, useState } from 'react';
import { navLinks } from "../constants/index.js";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const NavBar = ({ toggleTheme, currentTheme }) => { // Destructure props here
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : 'not-scrolled'}`}>
            <div className="inner">
                <a className="logo" href="#hero">
                    Ankan Chatterjee
                </a>

                <nav className="desktop">
                    <ul>
                        {navLinks.map(({ link, name }) => (
                            <li key={name} className="group">
                                <a href={link}>
                                    <span>{name}</span>
                                    <span className="underline"></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="clerk-themed-button"> {/* Applied themed button class */}
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>

                    {/* Theme Switcher Button */}
                    <button
                        onClick={toggleTheme}
                        className="contact-btn group" // Re-use existing button styling
                        aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        <div className="inner">
                            <span>
                                {currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                            </span>
                        </div>
                    </button>

                    <a href="#contact" className="contact-btn group">
                        <div className="inner">
                            <span>Contact me</span>
                        </div>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default NavBar;

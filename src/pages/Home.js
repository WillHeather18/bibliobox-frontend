import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import AppBar from "../Components/AppBar";
import { Link } from 'react-router-dom';
import DownArrow from '../assets/down-arrow.svg';

function Home() {
    const [isTransparent, setIsTransparent] = useState(true);

    const scrollDown = () => {
        window.scrollTo({
            top: window.innerHeight * 0.91, // 100vh
            behavior: 'smooth' // smooth scroll
        });
    }

    useEffect(() => {
        const onScroll = () => {
            const newIsTransparent = window.scrollY < window.innerHeight * 0.85;
            if (newIsTransparent !== isTransparent) {
                setIsTransparent(newIsTransparent);
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [isTransparent]);

    return (
        <div>
            <div className="home-page">
            <AppBar transparent={isTransparent} />
            <div className="home-page-hero">
                <h2 className="hero-text">
                Discover joy in every box
                <br />
                <br />
                Because great stories should find you</h2>
                <Link to="/ourboxes">
                    <button className="boxes-button">Discover Our Boxes</button>
                </Link>
                <img src={DownArrow} alt="Down Arrow" className="down-arrow" onClick={scrollDown}/>
            </div>
            <div className="how-it-works">
                <h1 className="how-it-works-title">Handpicked books, delivered monthly to your door</h1>
                <div className="step1">
                    <h2 className="step-title">1. Select your box</h2>
                    <p className="step-description">We have a box for everyone! Choose from our selection of genres and themes.</p>
                </div>
                <div className="step2">
                    <h2 className="step-title">2. We pick your books</h2>
                    <p className="step-description">Our algorithm will handpick books just for you.</p>
                </div>
                <div className="step3">
                    <h2 className="step-title">3. Enjoy your box</h2>
                    <p className="step-description">Sit back, relax, and enjoy your box of books!</p>
                </div>
            </div>  
        </div>
        </div>
    );
}

export default Home;
"use client";

import React, { forwardRef } from "react";

const HomePage = forwardRef(function HomePage(_, ref) {
  return (
    <div className="home-page">
      <video autoPlay muted loop playsInline>
        <source src="assets/videos/home-page-video.mp4" />
      </video>

      <div className="hero-section">
        <h1>Premium configurator for discerning riders and their horses</h1>
        <p>Create your own equipment now – luxury has never been so easily within reach</p>
        <button ref={ref}>START CONFIGURING</button>
      </div>
    </div>
  );
});

export default HomePage;

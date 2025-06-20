"use client";
import { useEffect, useRef } from "react";
import HomePage from "./components/home-page";
import SelectionPage from "./components/selection-page";

export default function Home() {
  const startButton = useRef(null);
  
  const homePage = useRef(null);
  const selectionPage = useRef(null); 

  useEffect(() => {
    startButton.current.onclick = function() {
      homePage.current.style.display = "none";
      selectionPage.current.style.display = "block";
    }
  }, []);

  return (
    <div>
      <div ref={homePage}>
        <HomePage ref={startButton} />
      </div>
      <div ref={selectionPage} style={{display: "none"}}>
        <SelectionPage />
      </div>
    </div>
  );
}

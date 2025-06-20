"use client";

import { useEffect, useState, useRef } from "react";

const SelectionPage = () => {
    
    const selectionPage = useRef(null);

    const selectionParameters = ["rider", "horse-and-rider", "horse"];

    useEffect(() => {
        for (let i = 0; i < 3; i++) {
            selectionPage.current.children[i].onclick = function() {
                window.location.href = "configurator-page?type=" + selectionParameters[i];
            };
        }
    }, []);

    return (
        <div className="selection-page" ref={selectionPage}>
            <div>Rider only</div>
            <div>Horse and rider</div>
            <div>Horse only</div>
        </div>
    );
};

export default SelectionPage;

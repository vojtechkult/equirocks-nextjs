"use client";
import { useEffect, useState, useRef } from "react";
import Configurator from "./components/configurator";

export default function Home() {

  const cfg = useRef(null);
  const btn = useRef(null);

  let cfgReady = false;


  useEffect(() => {

    window.addEventListener("message", function(event) {
      if (event.data.type === "3dConfiguratorLoaded") {
          console.log("Konfigurátor je připraven.");
          cfgReady = true;
      }
    });


    let cfgData = {
      interior: "classic",
      sideboard: "cascade",
      railing: "no",
      color_of_wall: "#dd8573",
      stairs_profile: "sharp_4",
      railing_handrail: "steel",
      stairs_decor: "oak_tabacco",
      lighting_width: "700mm",
    }
    setConfiguration();


    function setConfiguration() {
      let data = cfgData;
      
      if (!cfgReady) {
        setTimeout(setConfiguration, 1000);
      }
      
      var iframe = cfg.current;
      if (iframe && iframe.contentWindow) {
          var iframeOrigin = new URL(iframe.src).origin;
          var message = JSON.stringify({ type: "setConfiguration", data: data });
          console.log("Sending message:", message);
          iframe.contentWindow.postMessage(message, iframeOrigin);

          window.addEventListener("message", (event) => {
              //console.log("Received message:", event.data); 
          }, false);
      }
    }


    btn.current.onclick = function() {
      cfgData = {
        sideboard: "continous",
        stairs_decor: "oak_aspen"
      }
      setConfiguration();
    }

  }, []);

  return (
    <div className="wrapper">
      <h1>EquiRocks</h1>
      <h2>Konfigurátor</h2>

      <iframe ref={cfg} src="https://1529606975.cdn.precismo.tech/4bd47996ae5125a9c35a/1/objects/20000356/"/>

      <button ref={btn}>Změna konfigurace</button>

      {/*<img src="horse.png"></img>*/}
    </div>
  );
}

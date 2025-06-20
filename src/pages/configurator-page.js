"use client";
import '../app/globals.css';

import { useEffect, useState, useRef } from "react";
import Head from 'next/head';


export default function ConfiguratorPage() {
    let mainWhite = "#fefefe";
    let mainBlack = "#201f1f";

    const productListWrapper = useRef(null);
    const productHeading = useRef(null);
    const productCategories = useRef(null);
    const productSubcategories = useRef(null);
    const productItems = useRef(null);
    const selectionButtons = useRef(null);

    const customizationButton = useRef(null);
    const customizationMenu = useRef(null);
    const customizationModal = useRef(null);
    const customizationHeading = useRef(null);
    const customizationCancel = useRef(null);
    const customizationConfirm = useRef(null);
    const customizationClose = useRef(null);

    const productOptions = useRef(null);
    const productOptionsClose = useRef(null);
    const productOptionsCancel = useRef(null);
    const productOptionsConfirm = useRef(null);
    const productOptionsName = useRef(null);
    const productOptionsPrice = useRef(null);
    const productOptionsImg = useRef(null);
    const productOptionsParameters = useRef(null);
    const productOptionsDetails = useRef(null);
    const productOptionsDetailsClose = useRef(null);
    const productOptionsDetailsOpen = useRef(null);
    const productOptionsBottom = useRef(null);

    const filtersModal = useRef(null);
    const filtersClose = useRef(null);
    const filtersOpen = useRef(null);

useEffect(() => {

    // Počáteční čtení URL parametrů
    let url = window.location.href;
    const params = Object.fromEntries(new URLSearchParams(url.split('?')[1]));

    if (params.customization) {
      openCustomization(params.customization);
    }


    let mnozstvi = 3;
    

    // Tvorba horních selekčních tlačítek
    let typeOptions;
    if (params.type) {
        switch (params.type) {
            case "rider":
                typeOptions = ["Rider"];
            break;

            case "horse-and-rider":
                typeOptions = ["Rider", "Horse"];
            break;

            case "horse":
                typeOptions = ["Horse"];
            break;
        }
    }
    else {
        typeOptions = ["Rider", "Horse", "Tent"];
    }

    selectionButtons.current.innerHTML = '';
    for (let i = 0; i < typeOptions.length; i++) {
        let button = document.createElement("button");
        button.textContent = typeOptions[i];

        if (i < typeOptions.length-1) {
            button.style.borderRight = "none";
        }

        selectionButtons.current.appendChild(button);
    }
    radioSelection(selectionButtons, mainBlack);
    selectionButtons.current.children[0].click();


    // Tvorba produktových tlačítek
    let productAmount = 9;
    productListWrapper.current.innerHTML = '';

    for (let i = 0; i < productAmount; i++) {
        let productItem = document.createElement("img");
        productItem.src = "assets/icons/icon-tshirt.svg";
        productListWrapper.current.appendChild(productItem);
    }


    // Výběr produktů
    for (let i = 0; i < productListWrapper.current.childElementCount; i++) {
      let productButton = productListWrapper.current.children[i];
      productButton.style.backgroundColor = "#fefefe";

      productButton.onclick = function() {
        
        productSubcategories.current.style.display = "none";
        productItems.current.style.display = "none";

        // Zvýraznení tlačítek
        for (let j = 0; j < productListWrapper.current.childElementCount; j++) {
          let currentButton = productListWrapper.current.children[j];
          if (j !== i) {
            currentButton.style.backgroundColor = "#fefefe";
            currentButton.src = "assets/icons/icon-tshirt.svg";

            currentButton.addEventListener("mouseover", () => {
                currentButton.style.backgroundColor = "#d6d6d6";
            });
            currentButton.addEventListener("mouseout", () => {
                currentButton.style.backgroundColor = mainWhite;
            });
          }
          else {
            productButton.style.backgroundColor = mainBlack;
            currentButton.src = "assets/icons/icon-tshirt-white.svg";

            productButton.addEventListener("mouseover", () => {
                currentButton.style.backgroundColor = mainBlack;
            });
            productButton.addEventListener("mouseout", () => {
                currentButton.style.backgroundColor = mainBlack;
            });
          }
        }

        // Vykreslení výběrů
        productHeading.current.textContent = "Sedla";

        // Kategorie
        productCategories.current.innerHTML = '';
        for (let j = 0; j < mnozstvi; j++) {
          let categoryButton = document.createElement("button");
          categoryButton.textContent = "Sedlo " + (j+1);
          productCategories.current.appendChild(categoryButton);

          categoryButton.addEventListener("click", () => {
            displaySubcategories();
          });
        }
        radioSelection(productCategories, mainBlack);
        productCategories.current.children[0].click();

        // Podkategorie
        function displaySubcategories() {
          productSubcategories.current.style.display = "flex";

          productSubcategories.current.innerHTML = '';
          for (let j = 0; j < mnozstvi; j++) {
            let subcategoryButton = document.createElement("button");
            subcategoryButton.textContent = "Podsedlo " + (j+1);
            productSubcategories.current.appendChild(subcategoryButton);

            subcategoryButton.addEventListener("click", () => {
              displayProductItems();
            });
          }
          radioSelection(productSubcategories, "#525252");
          productSubcategories.current.children[0].click();
        }

        // Produktové obrázky
        function displayProductItems() {
          productItems.current.style.display = "flex";

          productItems.current.innerHTML = '';
          for (let j = 0; j < mnozstvi; j++) {
            let productItem = document.createElement("div");
            productItem.appendChild(document.createElement("img"));
            productItem.children[0].src = "assets/images/bila-decka.png";
            productItem.appendChild(document.createElement("p"));
            productItem.children[1].textContent = "Bílá dečka " + (j+1);
            productItem.appendChild(document.createElement("b"));
            productItem.children[2].textContent = "599 Kč";
            productItems.current.appendChild(productItem);

            productItem.onclick = function() {
              openProductOptions(
                {
                  name: productItem.children[1].textContent,
                  img: productItem.children[0].src,
                  price: productItem.children[2].textContent
                }
              );
            };
          }
        }
      }
    }
    productListWrapper.current.children[0].click();


    // Radiový výběr
    function radioSelection(wrapper, highlightColor) {
      let items = wrapper.current.childElementCount;

      for (let i = 0; i < items; i++) {
        let item = wrapper.current.children[i];
        item.style.backgroundColor = mainWhite;

        item.addEventListener("click", () => {
          for (let j = 0; j < items; j++) {
            let currentItem = wrapper.current.children[j];

            if (j !== i) {
              currentItem.style.backgroundColor = mainWhite;
              currentItem.style.color = highlightColor;
            }
            else {
              item.style.backgroundColor = highlightColor;
              item.style.color = mainWhite;
            }
          }
        });
      }
    }


    // Customizační menu
    customizationButton.current.addEventListener("mouseover", () => {
        customizationButton.current.src = "assets/icons/icon-customize-white.svg";
        customizationButton.current.parentElement.style.backgroundColor = mainBlack;
        customizationMenu.current.style.display = "block";

        customizationMenu.current.addEventListener("mouseleave", () => {
            customizationButton.current.src = "assets/icons/icon-customize.svg";
            customizationButton.current.parentElement.style.backgroundColor = mainWhite;
            customizationMenu.current.style.display = "none";
        });

        for (let i = 0; i < 3; i++) {
          customizationMenu.current.children[i].addEventListener("click", () => {
            openCustomization(["horse", "rider", "background"][i]);
          });
        }
    });

    function openCustomization(type) {
      let heading = "";
      
      switch (type) {
        case "horse":
          heading = "Horse Customization";
        break;

        case "rider":
          heading = "Rider Customization";
        break;

        default:
          heading = "Background Customization";
        break;
      }

      addParameter("customization", type);

      customizationHeading.current.textContent = heading;
      customizationModal.current.style.display = "flex";
    }

    function closeCustomization() {
      customizationModal.current.style.display = "none";
      removeParameter("customization");
    }

    customizationCancel.current.onclick = function() {
      closeCustomization();
    }
    customizationConfirm.current.onclick = function() {
      closeCustomization();
    }
    customizationClose.current.onclick = function() {
      closeCustomization();
    }
    

    // Filtry
    filtersOpen.current.addEventListener("mouseover", () => {
      filtersOpen.current.style.backgroundColor = mainBlack;
      filtersOpen.current.style.cursor = "pointer";
      filtersOpen.current.children[0].src = "assets/icons/icon-filters-white.svg";
    });
    filtersOpen.current.addEventListener("mouseleave", () => {
      filtersOpen.current.style.backgroundColor = mainWhite;
      filtersOpen.current.children[0].src = "assets/icons/icon-filters.svg";
    });

    filtersOpen.current.onclick = function() {
      filtersModal.current.style.display = "flex";
    }
    filtersClose.current.onclick = function() {
      filtersModal.current.style.display = "none";
    }


    // Product options
    productOptionsClose.current.onclick = function() {
      productOptions.current.style.display = "none";
    }
    productOptionsCancel.current.onclick = function() {
      productOptions.current.style.display = "none";
    }
    productOptionsConfirm.current.onclick = function() {
      productOptions.current.style.display = "none";
    }

    productOptionsDetailsOpen.current.onclick = function() {
      openProductDetails();
    }

    productOptionsDetailsClose.current.onclick = function() {
      closeProductDetails();
    }

    function openProductDetails() {
      productOptionsParameters.current.style.display = "none";
      productOptionsDetails.current.style.display = "flex";
      productOptionsDetailsOpen.current.style.opacity = "0%";
      productOptionsBottom.current.style.opacity = "0%";
    }

    function closeProductDetails() {
      productOptionsParameters.current.style.display = "flex";
      productOptionsDetails.current.style.display = "none";
      productOptionsDetailsOpen.current.style.opacity = "100%";
      productOptionsBottom.current.style.opacity = "100%";
    }

    function openProductOptions(options) {
      console.log("Produktové nastavení", options);

      closeProductDetails();

      if (options.img) {
        productOptionsImg.current.src = options.img;
      }
      if (options.name) {
        productOptionsName.current.textContent = options.name;
      }
      if (options.price) {
        productOptionsPrice.current.textContent = options.price;
      }

      productOptions.current.style.display = "flex";
    }


    // URL parametry
    function addParameter(parameter, value) {
      let currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set(parameter, value); 
      window.history.pushState({}, "", currentUrl);
    }

    function removeParameter(parameter) {
      let currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete(parameter);
      window.history.pushState({}, "", currentUrl);
    }

}, []);
    
return (
<div className="configurator-step">
	<Head>
		<title>EquiRocks | Konfigurátor</title>
	</Head>

  {/* Hlavní konfigurátorové okno */}
	<div className="item-main">
		<div className="configurator-top-line">
			<div className="selection-buttons" ref={selectionButtons}>
			</div>
			<div className="selection-options">
				<div className="selection-option">
					<img src="assets/icons/icon-customize.svg" ref={customizationButton}></img>
				</div>

                <div className="customization-menu" ref={customizationMenu}>
                    <img src="assets/icons/icon-horse.svg"></img>
                    <img src="assets/icons/icon-user.svg"></img>
                    <img src="assets/icons/icon-landscape.svg"></img>
                </div>

				<div className="selection-option" ref={filtersOpen} style={{borderRight: "1px solid #201f1f"}}>
					<img src="assets/icons/icon-filters.svg"></img>
				</div>
				<div className="filter-assets" style={{display: "none"}}>
					<p>4</p>
					<img src="assets/icons/icon-x.svg"></img>
				</div>
			</div>
		</div>
		<div className="configurator-bottom-line">
			<div className="wrapper-column">
				<a className="login-link">Sign in</a>
				<div className="icon-button">
					<img src="assets/icons/icon-arrow-left.svg"></img>
					<p>Back to store</p>
				</div>
			</div>
			<div>
				<button className="button-white">Total: 79 €</button>
				<button className="button-black">Add to Cart</button>
			</div>
		</div>
	</div>

  {/* Sidebar */}
	<div className="item-sidebar">
		<div className="product-list-wrapper" ref={productListWrapper}>
		</div>
		<div className="product-selection-wrapper">
			<p ref={productHeading}>Horní text</p>
			<div ref={productCategories} className="product-category-selection">
				<button>Sedlo</button>
			</div>
			<div ref={productSubcategories} className="product-subcategory-selection">
				<button>Sedlo</button>
			</div>
			<div ref={productItems} className="product-items-wrapper">
				<div>
					<img src="assets/images/bila-decka.png"></img>
					<p>Bílá dečka</p>
					<b>599 Kč</b>
				</div>
				<div>
					<img src="assets/images/bila-decka.png"></img>
					<p>Bílá dečka</p>
					<b>599 Kč</b>
				</div>
			</div>
		</div>
	</div>

  {/* Modální okno - Product options */}
  <div ref={productOptions} className="product-options">
    <div>
      <div className="options-heading">
        <h1>Product options</h1>
        <img ref={productOptionsClose} src="assets/icons/icon-x.svg" className="icon-size-24"></img>
      </div>

      <div className="options-content">

        {/* Levá strana - stále zobrazená - část s konfigurátorem */}
        <div>
          <div className="options-configurator">
            <img ref={productOptionsImg} src="assets/images/saddle-brown.png"></img>
          </div>

          <div className="options-configurator-description">
            <div className="wrapper-between-down">
              <h2 ref={productOptionsName}>Jump wadded saddle pad with Makebe logo</h2>
              <p ref={productOptionsPrice}>79 €</p>
            </div>
            <button ref={productOptionsDetailsOpen}>Product details</button>
            <div className="wrapper-between-up" ref={productOptionsBottom}>
              <img src="assets/images/company-logo.png"></img>
              <a>Show product at eshop</a>
            </div>
          </div>
        </div>

        {/* Pravá strana 1 - parametry nastavení */}
        <div ref={productOptionsParameters}>
          <div className="product-options-scroll">
          </div>
          <div className="product-options-buttons">
            <button ref={productOptionsCancel} className="button-white">CANCEL</button>
            <button ref={productOptionsConfirm} className="button-black">CONFIRM</button>
          </div>
        </div>

        {/* Pravá strana 2 - detaily o produktu */}
        <div ref={productOptionsDetails}>
          <div className="options-heading" style={{paddingInline: "0"}}>
            <h1>Product details</h1>
            <img ref={productOptionsDetailsClose} src="assets/icons/icon-x.svg" className="icon-size-24"></img>
          </div>

          <div className="product-details-scroll">
            <b>About product:</b>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean id metus id velit ullamcorper pulvinar. Nam libero tempore, cum soluta nobis est eligendi placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Cras pede or quis. Mauris elementum mauris vitae tortor.</p>

            <div className="spacer-medium"></div>

            <b>Brand:</b>
            <div className="spacer-small"></div>
            <img src="assets/images/company-logo.png"></img>
            <div className="spacer-small"></div>

            <a>Show product at eshop</a>

            <div className="spacer-medium"></div>

            <div className="sample-box"></div>
            <div className="sample-box"></div>
            <div className="sample-box"></div>
          </div>
        </div>

      </div>

    </div>
  </div>

  {/* Modální okno - Filtry */}
  <div ref={filtersModal} className="filters-modal">
    <div>
      <img ref={filtersClose} src="assets/icons/icon-x.svg" className="icon-size-24"></img>

      <div className="selection-large">
        <h2>Rider Settings:</h2>
        <div className="filters-scroll">
          <div className="sample-box"></div>
          <div className="sample-box"></div>
          <div className="sample-box"></div>
          <div className="sample-box"></div>
        </div>
      </div>
      <div className="selection-large">
        <h2>Horse Settings:</h2>
        <div className="filters-scroll">
          <div className="sample-box"></div>
          <div className="sample-box"></div>
          <div className="sample-box"></div>
          <div className="sample-box"></div>
        </div>
      </div>
      <div className="selection-small">
        <h2>Distributor:</h2>
        <div className="filters-scroll">
          <div className="sample-box"></div>
          <div className="sample-box"></div>
          <div className="sample-box"></div>
          <div className="sample-box"></div>
        </div>
      </div>
    </div>
  </div>

  {/* Customizace */}
  <div ref={customizationModal} className="customization-modal">
    <div>
      <div className="top-line">
        <div>
          <p>Customization Mode</p>
          <img src="assets/icons/icon-customize-white.svg" style={{backgroundColor: "#232222"}}></img>
        </div>

        <img ref={customizationClose} src="assets/icons/icon-x.svg"></img>
      </div>
    </div>

    <div>
      <h3 ref={customizationHeading}>Horse Customization</h3>

      <div className="customization-scroll">
        <div className="sample-box"></div>
        <div className="sample-box"></div>
        <div className="sample-box"></div>
        <div className="sample-box"></div>
      </div>

      <div className="button-wrapper">
        <button ref={customizationCancel} className="button-white">CANCEL</button>
        <button ref={customizationConfirm} className="button-black">CONFIRM</button>
      </div>
    </div>
  </div>

</div>
    );
}

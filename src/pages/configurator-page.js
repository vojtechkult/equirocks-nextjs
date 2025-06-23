"use client";
import '../app/globals.css';

import { useEffect, useState, useRef } from "react";
import Head from 'next/head';


export default function ConfiguratorPage() {
    let mainWhite = "#fefefe";
    let mainBlack = "#201f2f";

    let equipmentList = [
      {
        name: "Horse 1",
        items: [
          {
            name: "Sedlo hnědé",
            price: 1890,
            amount: 1,
          },
          {
            name: "Dečka béžová",
            price: 590,
            amount: 2,
          },
          {
            name: "Ohlávka",
            price: 2499,
            amount: 1,
          }
        ]
      },
      {
        name: "Horse 2",
        items: [
          {
            name: "Sedlo hnědé",
            price: 1890,
            amount: 1,
          },
          {
            name: "Dečka béžová",
            price: 590,
            amount: 2,
          },
          {
            name: "Ohlávka",
            price: 2499,
            amount: 1,
          }
        ]
      }
    ];

    let productList = [
      {
        product_name: "Saddles",
        product_icon: {
          group: "horse",
          type: "saddle"
        },
        categories: [
          {
            category_name: "Racing saddles",
            items: [
              {
                subcategory: "Standard",
                name: "Brown saddle Standard",
                price: "559.90",
              },
              {
                subcategory: "Standard",
                name: "White saddle Standard",
                price: "599.90",
              },
              {
                subcategory: "Deluxe",
                name: "Brown saddle Deluxe",
                price: "759.90",
              },
              {
                subcategory: "Deluxe",
                name: "White saddle Deluxe",
                price: "799.90",
              }
            ],
          },
          {
            category_name: "Jumping saddles",
            items: [
              {
                subcategory: "Jumping",
                name: "Brown jumping saddle",
                price: "499.90",
              },
              {
                subcategory: "Jumping",
                name: "White jumping saddle",
                price: "499.90",
              },
              {
                subcategory: "Jumping",
                name: "Black jumping saddle",
                price: "499.90",
              }
            ]
          },
        ]
      },
      {
        product_name: "Blankets",
        product_icon: {
          group: "horse",
          type: "blanket"
        },
        categories: [
          {
            category_name: "Horse blankets",
            items: [
              {
                subcategory: "Standard",
                name: "Brown blanket",
                price: "499.90",
              },
              {
                subcategory: "Standard",
                name: "White blanket",
                price: "499.90",
              },
            ],
          },
        ]
      }
    ];

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
    const customizationImage = useRef(null);

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
    const productOptionsScroll = useRef(null);

    const filtersModal = useRef(null);
    const filtersClose = useRef(null);
    const filtersOpen = useRef(null);

    const equipmentOpen = useRef(null);
    const equipmentModal = useRef(null);
    const equipmentScroll = useRef(null);
    const equipmentClose = useRef(null);

    const showFilter1 = useRef(null);
    const showFilter2 = useRef(null);
    const showFilter3 = useRef(null);
    const filterContent1 = useRef(null);
    const filterContent2 = useRef(null);
    const filterContent3 = useRef(null);

useEffect(() => {

    // #region MongoDB

    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        console.log("Načtené produkty:", data);
      } catch (err) {
        console.error("Chyba při načítání produktů:", err);
      }
    }

    //fetchProducts();

    // #endregion


    // #region Aktuální URL

    // Počáteční čtení URL parametrů
    let url = window.location.href;
    const params = Object.fromEntries(new URLSearchParams(url.split('?')[1]));

    if (params.customization) {
      openCustomization(params.customization);
    }
    
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
    // #endregion


    // #region Sidebar
    // Tvorba produktových tlačítek
    let productAmount = productList.length;
    productListWrapper.current.innerHTML = '';

    for (let i = 0; i < productAmount; i++) {
        let icons = selectIcons(productList[i].product_icon);

        let productItem = document.createElement("img");
        productItem.src = icons[0];
        productListWrapper.current.appendChild(productItem);
    }

    // Výběr produktů
    for (let i = 0; i < productAmount; i++) {
      let icons = selectIcons(productList[i].product_icon);

      let productButton = productListWrapper.current.children[i];
      productButton.style.backgroundColor = "#fefefe";

      productButton.onclick = function() {
        
        productSubcategories.current.style.display = "none";
        productItems.current.style.display = "none";

        // Zvýraznení tlačítek
        for (let j = 0; j < productAmount; j++) {
          let currentButton = productListWrapper.current.children[j];
          if (j !== i) {
            currentButton.style.backgroundColor = mainWhite;
            currentButton.src = selectIcons(productList[j].product_icon)[0];

            currentButton.addEventListener("mouseover", () => {
                currentButton.style.backgroundColor = "#ddd";
            });
            currentButton.addEventListener("mouseout", () => {
                currentButton.style.backgroundColor = mainWhite;
            });
          }
          else {
            productButton.style.backgroundColor = mainBlack;
            currentButton.src = selectIcons(productList[j].product_icon)[1];

            productButton.addEventListener("mouseover", () => {
                currentButton.style.backgroundColor = mainBlack;
            });
            productButton.addEventListener("mouseout", () => {
                currentButton.style.backgroundColor = mainBlack;
            });
          }
        }

        // Vykreslení výběrů
        productHeading.current.textContent = productList[i].product_name;

        
        let categoryAmount = productList[i].categories.length;
        let subcategoryAmount = 1;


        // Kategorie
        productCategories.current.innerHTML = '';
        let checkedCategories = [];

        for (let j = 0; j < categoryAmount; j++) {
          let categoryButton = document.createElement("button");
          categoryButton.textContent = productList[i].categories[j].category_name;
          productCategories.current.appendChild(categoryButton);

          checkedCategories.push(false);

          categoryButton.addEventListener("click", () => {
            checkedCategories[j] = !checkedCategories[j];
            //displaySubcategories();
            displayProductItems(i, checkedCategories);
          });
        }
        checkboxSelection(productCategories, mainBlack);
        productCategories.current.children[0].click();


        // Podkategorie - zatím vypuštěno
        function displaySubcategories() {
          productSubcategories.current.style.display = "flex";

          productSubcategories.current.innerHTML = '';
          for (let j = 0; j < subcategoryAmount; j++) {
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
        function displayProductItems(productOrder, checkedCategories) {
          productItems.current.style.display = "flex";

          let currentProducts = [];

          for (let j = 0; j < checkedCategories.length; j++) {
            if (checkedCategories[j]) {
              for (let k = 0; k < productList[productOrder].categories[j].items.length; k++) {
                currentProducts.push(productList[productOrder].categories[j].items[k]);
              }
            }
          }

          let productsAmount = currentProducts.length;

          productItems.current.innerHTML = '';
          for (let j = 0; j < productsAmount; j++) {
            let productItem = document.createElement("div");
            productItem.appendChild(document.createElement("img"));
            productItem.children[0].src = "assets/images/bila-decka.png";
            productItem.appendChild(document.createElement("p"));
            productItem.children[1].textContent = currentProducts[j].name;
            productItem.appendChild(document.createElement("b"));
            productItem.children[2].textContent = currentProducts[j].price + " Kč";
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

          if (productItems.current.childElementCount == 0) {
            productItems.current.textContent = "Select a product category."
          }
        }
      }
    }
    productListWrapper.current.children[0].click();

    // #endregion


    // #region Customizace
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
      let image = "";
      
      switch (type) {
        case "horse":
          heading = "Horse Customization";
          image = "assets/images/horse-brown.png";
        break;

        case "rider":
          heading = "Rider Customization";
          image = "assets/images/rider-female.png";
        break;

        default:
          heading = "Background Customization";
          image = "assets/images/background-transparent.png";
        break;
      }

      addParameter("customization", type);

      customizationHeading.current.textContent = heading;
      customizationImage.current.src = image;
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
    // #endregion
    

    // #region Filtry
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

    let filterContents = [filterContent1, filterContent2, filterContent3];
    let filterButtons = [showFilter1, showFilter2, showFilter3];
    for (let i = 0; i < 3; i++) {
      filterButtons[i].current.onclick = function() {
        if (filterContents[i].current.style.display == "block") {
          filterContents[i].current.style.display = "none";
          filterButtons[i].current.src = "assets/icons/icon-arrow-right.svg";
        }
        else {
          for (let j = 0; j < 3; j++) {
            filterContents[j].current.style.display = "none";
            filterButtons[j].current.src = "assets/icons/icon-arrow-right.svg";
          }

          filterContents[i].current.style.display = "block";
          filterButtons[i].current.src = "assets/icons/icon-arrow-down.svg";
        }
      }
    }
    // #endregion


    // #region Product options
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

      productOptionsScroll.current.innerHTML = '';
      createColorSelection("Core color:", ["#E9E8EB", "#D9D3B7", "#DF7250", "#7D3938", "Black", "#574184", "#315C40", "#BF366D", "#5D8695"], productOptionsScroll.current);
      createColorSelection("Color of edging:", ["#5D8695", "#DF7250", "#D9D3B7"], productOptionsScroll.current);

      productOptions.current.style.display = "flex";
    }

    function createColorSelection(name, colors, source) {
      let heading = document.createElement("b");
      heading.textContent = name;
      source.appendChild(heading);

      let selection = document.createElement("div");
      selection.className = "color-options-wrapper";

      for (let i = 0; i < colors.length; i++) {
        let item = document.createElement("div");
        item.appendChild(document.createElement("div"));
        item.children[0].style.backgroundColor = colors[i];

        item.addEventListener("click", () => {
          for (let j = 0; j < colors.length; j++) {
            if (j !== i) {
              selection.children[j].style.borderColor = "transparent";
            }
            else {
              selection.children[j].style.borderColor = mainBlack;
            }
          }
        });
        selection.appendChild(item);
      }
      source.appendChild(selection);
      selection.children[0].click();
    }
    // #endregion


    // #region Košíkový seznam
    equipmentOpen.current.onclick = function() {
      if (equipmentModal.current.style.display == "flex") {
        equipmentModal.current.style.display = "none";
      }
      else {
        openEquipmentModal();
      }
    }

    equipmentClose.current.onclick = function() {
      equipmentModal.current.style.display = "none";
    }

    
    function openEquipmentModal() {
      equipmentScroll.current.innerHTML = '';

      for (let i = 0; i < equipmentList.length; i++) {
        let listItem = document.createElement("div");
        listItem.appendChild(document.createElement("b"));
        listItem.children[0].textContent = equipmentList[i].name;

        for (let j = 0; j < equipmentList[i].items.length; j++) {

          if (equipmentList[i].items[j].amount > 0) {
            let equipmentItem = document.createElement("div");
            equipmentItem.className = "equipment-item";

            equipmentItem.appendChild(document.createElement("p"));
            equipmentItem.appendChild(document.createElement("p"));
            equipmentItem.appendChild(document.createElement("div"));

            equipmentItem.children[0].textContent = equipmentList[i].items[j].name;
            equipmentItem.children[1].textContent = formatNumber(equipmentList[i].items[j].price) + " Kč";
            
            equipmentItem.children[2].appendChild(document.createElement("img"));
            equipmentItem.children[2].children[0].src = "assets/icons/icon-x.svg";
            equipmentItem.children[2].children[0].onclick = function() {
              equipmentList[i].items[j].amount = 0;
              equipmentItem.style.display = "none";
              calculateTotalPrice();
            }

            let counter = document.createElement("div");
            counter.className = "counter";
            counter.appendChild(document.createElement("img"));
            counter.appendChild(document.createElement("p"));
            counter.appendChild(document.createElement("img"));

            counter.children[1].textContent = equipmentList[i].items[j].amount;

            counter.children[0].src = "assets/icons/icon-minus.svg";
            counter.children[0].onclick = function() {
              if (equipmentList[i].items[j].amount > 1) {
                equipmentList[i].items[j].amount -= 1;
                counter.children[1].textContent = equipmentList[i].items[j].amount;
                calculateTotalPrice();
              }
            }

            counter.children[2].src = "assets/icons/icon-plus.svg";
            counter.children[2].onclick = function() {
              if (equipmentList[i].items[j].amount < 99) {
                equipmentList[i].items[j].amount += 1;
                counter.children[1].textContent = equipmentList[i].items[j].amount;
                calculateTotalPrice();
              }
            }

            equipmentItem.children[2].appendChild(counter);

            listItem.appendChild(equipmentItem);
          }
        }

        if (listItem.childElementCount > 1) {
          equipmentScroll.current.appendChild(listItem);
        }
      }

      if (equipmentScroll.current.childElementCount == 0) {
        equipmentScroll.current.textContent = "There are no configured products at the moment.";
      }

      equipmentModal.current.style.display = "flex";
    }
    // #endregion


    // #region Obecné funkce

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


    // Celková cena
    calculateTotalPrice();

    function calculateTotalPrice() {
      let total = 0;

      for (let i = 0; i < equipmentList.length; i++) {
        for (let j = 0; j < equipmentList[i].items.length; j++) {
          total += (equipmentList[i].items[j].price*equipmentList[i].items[j].amount);
        }
      }

      //console.log("Celkový součet: " + total);
      equipmentOpen.current.textContent = "Total: " + formatNumber(total) + " Kč";
    }


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


    // Checkboxový výběr
    function checkboxSelection(wrapper, highlightColor) {
      let items = wrapper.current.childElementCount;

      for (let i = 0; i < items; i++) {
        let item = wrapper.current.children[i];
        item.style.backgroundColor = mainWhite;

        item.addEventListener("click", () => {
          if (item.style.backgroundColor == "rgb(254, 254, 254)") {
            item.style.backgroundColor = highlightColor;
            item.style.color = mainWhite;
          }
          else {
            item.style.backgroundColor = mainWhite;
            item.style.color = highlightColor;
          }
        });
      }
    }


    // Formátování čísel
    function formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }


    // Výběr ikonky
    function selectIcons(icon) {

      let src1 = "";
      let src2 = "";

      if (icon.group == "horse") {
        switch (icon.type) {
          case "saddle":
            src1 = "sedlo";
            src2 = "sedlo-black";
          break;

          case "blanket":
            src1 = "decka-2";
            src2 = "decka-2-black";
          break;

          default:
            src1 = "uzda";
            src2 = "uzda-black"
          break;
        }

        src1 = "assets/horse-icons/horse-" + src1 + ".svg";
        src2 = "assets/horse-icons/horse-" + src2 + ".svg";
      }
      else {
        switch (icon.type) {
          default:
            src1 = "tricko";
            src2 = "tricko-black";
          break;
        }

        src1 = "assets/rider-icons/rider-" + src1 + ".svg";
        src2 = "assets/rider-icons/rider-" + src2 + ".svg";
      }

      return [src1, src2];
    }
    // #endregion

}, []);
    
return (
<div className="configurator-step">
	<Head>
		<title>EquiRocks | Konfigurátor</title>
	</Head>

  {/* Hlavní konfigurátorové okno */}
	<div className="item-main">

    {/* Extra mobilní horní linka */}
    <div className="configurator-top-mobile-line">
      <div className="mobile-icon-button">
					<img src="assets/icons/icon-arrow-left-white.svg"></img>
					<p>Back to store</p>
				</div>
        <a>Sign in</a>
    </div>

    {/* Horní linka - výběr zobrazení, filtry, customizace */}
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

    {/* Spodní linka - přihlášení, seznam produktů, košík */}
		<div className="configurator-bottom-line">
			<div className="login-wrapper">
				<a className="login-link">Sign in</a>
				<div className="icon-button">
					<img src="assets/icons/icon-arrow-left.svg"></img>
					<p>Back to store</p>
				</div>
			</div>
			<div className="cart-container">
				<button ref={equipmentOpen} className="button-white">Total: 79 €</button>
				<button className="button-black">Add to Cart</button>

        <div ref={equipmentModal} className="equipment-wrapper">
          <div className="wrapper-between-middle">
            <h3>Configured Equipment</h3>
            <img ref={equipmentClose} src="assets/icons/icon-x.svg" className="icon-size-24"></img>
          </div>

          <div ref={equipmentScroll} className="equipment-scroll">
            {/*
            <div>
              <b>Horse 1:</b>
              <div className="equipment-item">
                <p>Jump wadded saddle pad with Makebe logo</p>
                <p>1 890 Kč</p>

                <div>
                  <img src="assets/icons/icon-x.svg"></img>
                  <div className="counter">
                    <img src="assets/icons/icon-minus.svg"></img>
                    <p>1</p>
                    <img src="assets/icons/icon-plus.svg"></img>
                  </div>
                </div>
              </div>
            </div>
            */}
          </div>
        </div>
			</div>
		</div>
	</div>

  {/* Sidebar */}
	<div className="item-sidebar">
		<div className="product-list-wrapper" ref={productListWrapper}>
		</div>

    <div className="slider-indicator">
      <img src="assets/icons/icon-arrow-right-white.svg"></img>
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
        <div className="options-content-container">
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
          <div ref={productOptionsScroll} className="product-options-scroll">
            
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
        <img ref={showFilter1} src="assets/icons/icon-arrow-right.svg"></img>
        <div ref={filterContent1} className="filters-scroll">
          <div className="sample-box"></div>
          <div className="sample-box"></div>
          <div className="sample-box"></div>
          <div className="sample-box"></div>
        </div>
      </div>
      <div className="selection-large">
        <h2>Horse Settings:</h2>
        <img ref={showFilter2} src="assets/icons/icon-arrow-right.svg"></img>
        <div ref={filterContent2} className="filters-scroll">
          <div className="sample-box"></div>
          <div className="sample-box"></div>
          <div className="sample-box"></div>
          <div className="sample-box"></div>
        </div>
      </div>
      <div className="selection-small">
        <h2>Distributor:</h2>
        <img ref={showFilter3} src="assets/icons/icon-arrow-right.svg"></img>
        <div ref={filterContent3} className="filters-scroll">
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
          <img src="assets/icons/icon-customize-white.svg"></img>
        </div>

        <img ref={customizationClose} src="assets/icons/icon-x.svg"></img>
      </div>

      <img ref={customizationImage}></img>
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

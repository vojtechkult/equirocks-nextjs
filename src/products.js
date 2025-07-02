export const allProducts = [
    {
        product_name: "Saddle",
        product_icon: {
            group: "horse",
            type: "saddle"
        },
        categories: [
            {
                category_name: "Saddles",
                items: [
                    {
                        name: "Saddle",
                        image: "product-saddle.png",
                        price: "299.90",
                        equipped: false,

                        display: ["saddle", {model_id: "default"}],
                        remove: ["remove_saddle", {}],

                        options: [
                            {
                                name: "Saddle color",
                                type: "color",
                                key: "saddle_color",
                                options: [
                                    {
                                        value: {color_id: "black"},
                                        color: "#000000",
                                    },
                                    {
                                        value: {color_id: "brown"},
                                        color: "#794831",
                                    },
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
    },
    {
        product_name: "Blanket",
        product_icon: {
            group: "horse",
            type: "blanket"
        },
        categories: [
            {
                category_name: "Blankets",
                items: [
                    {
                        name: "Blanket",
                        image: "product-blanket.png",
                        price: "299.90",
                        equipped: false,

                        display: ["blanket", {model_id: "fleece_blanket_mkb"}],
                        remove: ["remove_blanket", {}],

                        options: [
                            {
                                name: "Blanket color",
                                type: "color",
                                key: "blanket_color",
                                options: [
                                    {
                                        value: {color_id: "beige"},
                                        color: "#a28777",
                                    },
                                    {
                                        value: {color_id: "gray"},
                                        color: "#868589",
                                    },
                                    {
                                        value: {color_id: "blue"},
                                        color: "#242431",
                                    },
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
    },
    {
        product_name: "Pad",
        product_icon: {
            group: "horse",
            type: "pad"
        },
        categories: [
            {
                category_name: "Pads",
                items: [
                    {
                        name: "Pad",
                        image: "product-pad.png",
                        price: "299.90",
                        equipped: false,

                        display: ["pad", {model_id: "jump_carded_mkb"}],
                        remove: ["remove_pad", {}],

                        options: [
                            {
                                name: "Pad color",
                                type: "color",
                                key: "pad_color",
                                options: [
                                    {
                                        value: {color_id: "blue"},
                                        color: "#3b5e9c",
                                    },
                                    {
                                        value: {color_id: "white"},
                                        color: "#ebeced",
                                    },
                                    {
                                        value: {color_id: "brown"},
                                        color: "#633209",
                                    },
                                    {
                                        value: {color_id: "black"},
                                        color: "#000000",
                                    },
                                ]
                            },
                            {
                                name: "Pad ribbon color",
                                type: "color",
                                key: "pad_ribbon_color",
                                options: [
                                    {
                                        value: {color_id: "blue"},
                                        color: "#3b5e9c",
                                    },
                                    {
                                        value: {color_id: "gray"},
                                        color: "#000000",
                                    },
                                    {
                                        value: {color_id: "brown"},
                                        color: "#633209",
                                    },
                                    {
                                        value: {color_id: "black"},
                                        color: "#000000",
                                    },
                                    {
                                        value: {color_id: "bordeaux"},
                                        color: "#941239",
                                    },
                                    {
                                        value: {color_id: "white"},
                                        color: "#ebeced",
                                    },
                                    {
                                        value: {color_id: "beige"},
                                        color: "#f0c57f",
                                    },
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
    },
    {
        product_name: "Bonnet",
        product_icon: {
            group: "horse",
            type: "bonnet"
        },
        categories: [
            {
                category_name: "Bonnets",
                items: [
                    {
                        name: "Bonnet",
                        image: "product-bonnet.png",
                        price: "299.90",
                        equipped: false,

                        display: ["bonnet", {model_id: "horse_fly_hood_mkb"}],
                        remove: ["remove_bonnet", {}],

                        options: [
                            {
                                name: "Bonnet color",
                                type: "color",
                                key: "bonnet_color",
                                options: [
                                    {
                                        value: {color_id: "blue"},
                                        color: "#565b6f",
                                    },
                                    {
                                        value: {color_id: "black"},
                                        color: "#000000",
                                    },
                                    {
                                        value: {color_id: "gray"},
                                        color: "#60605e",
                                    },
                                    {
                                        value: {color_id: "brown"},
                                        color: "#695749",
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
    },
    {
        product_name: "Front legs protection",
        product_icon: {
            group: "horse",
            type: "front_legs"
        },
        categories: [
            {
                category_name: "Font legs protection",
                items: [
                    {
                        name: "Front legs protection",
                        image: "product-front-legs-protection.png",
                        price: "299.90",
                        equipped: false,

                        display: ["front_legs_prot", {model_id: "tendon_boots_mkb"}],
                        remove: ["remove_front_legs_prot", {}],

                        options: [
                            {
                                name: "Front legs protection color",
                                type: "color",
                                key: "front_legs_prot_color",
                                options: [
                                    {
                                        value: {color_id: "black"},
                                        color: "#000000",
                                    },
                                    {
                                        value: {color_id: "brown"},
                                        color: "#794831",
                                    },
                                ]
                            },
                            {
                                name: "Tendon center color",
                                type: "color",
                                key: "tendon_ctr_color",
                                options: [
                                    {
                                        value: {color_id: "bordeaux"},
                                        color: "#941239",
                                    },
                                    {
                                        value: {color_id: "blue"},
                                        color: "#3b5e9c",
                                    },
                                    {
                                        value: {color_id: "beige"},
                                        color: "#f0c57f",
                                    },
                                    {
                                        value: {color_id: "orange"},
                                        color: "#ff7119",
                                    },
                                    {
                                        value: {color_id: "green"},
                                        color: "#23ad2e",
                                    },
                                    {
                                        value: {color_id: "turqouise"},
                                        color: "#37e6c0",
                                    },
                                    {
                                        value: {color_id: "red"},
                                        color: "#de3759",
                                    },
                                    {
                                        value: {color_id: "pearl"},
                                        color: "#dbc7ad",
                                    },
                                    {
                                        value: {color_id: "gold"},
                                        color: "#f09c2e",
                                    },
                                    {
                                        value: {color_id: "black"},
                                        color: "#000000",
                                    },
                                    {
                                        value: {color_id: "fuchsia"},
                                        color: "#db2e9c",
                                    },
                                    {
                                        value: {color_id: "chocolate"},
                                        color: "#633209",
                                    },
                                    {
                                        value: {color_id: "brown"},
                                        color: "#794831",
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
    },
    {
        product_name: "Hind legs protection",
        product_icon: {
            group: "horse",
            type: ""
        },
        categories: [
            {
                category_name: "Hind legs protection",
                items: [
                    {
                        name: "Hind legs protection",
                        image: "product-hind-legs-protection.png",
                        price: "299.90",
                        equipped: false,

                        display: ["hind_legs_prot", {model_id: "fetlock_mkb"}],
                        remove: ["remove_hind_legs_prot", {}],

                         options: [
                            {
                                name: "Hind legs protection color",
                                type: "color",
                                key: "hind_legs_prot_color",
                                options: [
                                    {
                                        value: {color_id: "black"},
                                        color: "#000000",
                                    },
                                    {
                                        value: {color_id: "brown"},
                                        color: "#794831",
                                    },
                                ]
                            },
                            {
                                name: "Fetlock center color",
                                type: "color",
                                key: "fetlock_ctr_color",
                                options: [
                                    {
                                        value: {color_id: "bordeaux"},
                                        color: "#941239",
                                    },
                                    {
                                        value: {color_id: "blue"},
                                        color: "#3b5e9c",
                                    },
                                    {
                                        value: {color_id: "beige"},
                                        color: "#f0c57f",
                                    },
                                    {
                                        value: {color_id: "orange"},
                                        color: "#ff7119",
                                    },
                                    {
                                        value: {color_id: "green"},
                                        color: "#23ad2e",
                                    },
                                    {
                                        value: {color_id: "turqouise"},
                                        color: "#37e6c0",
                                    },
                                    {
                                        value: {color_id: "red"},
                                        color: "#de3759",
                                    },
                                    {
                                        value: {color_id: "pearl"},
                                        color: "#dbc7ad",
                                    },
                                    {
                                        value: {color_id: "gold"},
                                        color: "#f09c2e",
                                    },
                                    {
                                        value: {color_id: "black"},
                                        color: "#000000",
                                    },
                                    {
                                        value: {color_id: "fuchsia"},
                                        color: "#db2e9c",
                                    },
                                    {
                                        value: {color_id: "chocolate"},
                                        color: "#633209",
                                    },
                                    {
                                        value: {color_id: "brown"},
                                        color: "#794831",
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
    }
];
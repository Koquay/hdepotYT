import { createReducer } from "@ngrx/store";

const initialState = {
    heroCarouselImages: [
        "Screenshot%20from%202024-07-02%2010-32-18.png",
        "Screenshot%20from%202024-07-02%2010-35-42.png",
        "Screenshot%20from%202024-07-02%2010-35-31.png"
    ],

    topPickTabs: [
        {
            type: "All",
            href: "#tab-1",
            active: true
        },
        {
            type: "Refrigerators",
            href: "#tab-1",
            active: false
        },
        {
            type: "Ranges",
            href: "#tab-1",
            active: false
        },
        // {
        //     type: "Washers & Dryers",
        //     href: "#tab-1",
        //     active: false
        // },
        // {
        //     type: "Patio Furniture",
        //     href: "#tab-1",
        //     active: false
        // },
        // {
        //     type: "Grills",
        //     href: "#tab-1",
        //     active: false
        // },
        // {
        //     type: "Bath",
        //     href: "#tab-1",
        //     active: false
        // },
        // {
        //     type: "Lawn & Garden",
        //     href: "#tab-1",
        //     active: false
        // },
        // {
        //     type: "Storage & Organization",
        //     href: "#tab-1",
        //     active: false
        // },
        // {
        //     type: "Furniture",
        //     href: "#tab-10",
        //     active: false
        // },
        
    ],
    
}

export const HomeReducer = createReducer(
    initialState,

  );
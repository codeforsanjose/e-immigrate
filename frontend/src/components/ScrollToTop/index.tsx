import React from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
    // Extracts pathname property(key) from an object
    const { pathname } = useLocation();

    // Automatically scrolls to top whenever pathname changes
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}
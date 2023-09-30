import { useState, useEffect } from 'react';

export default function useWindowDimensions() {
    const hasWindow = typeof window !== 'undefined';

    function getWindowDimensions() {
        const screenHeight = hasWindow ? window.innerHeight : null;
        const screenWidth = hasWindow ? window.innerWidth : null;
        return {screenHeight, screenWidth};
    };

    const [windowDimensions, setWindowDimensions] = useState<{screenHeight: number | null, screenWidth: number | null}>(getWindowDimensions());

    function handleResize() {
        setWindowDimensions(getWindowDimensions());
    };

    useEffect(() => {
        if (hasWindow) {
            handleResize();

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        };
    }, [hasWindow]);

    return windowDimensions;
};

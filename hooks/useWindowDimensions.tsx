import { useState, useEffect } from 'react';

export default function useWindowDimensions() {
    const hasWindow = typeof window !== 'undefined';

    function getWindowDimensions() {
        const height = hasWindow ? window.innerHeight : null;
        const width = hasWindow ? window.innerWidth : null;
        return {height, width};
    };

    const [windowDimensions, setWindowDimensions] = useState<{height: number | null, width: number | null}>(getWindowDimensions());

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

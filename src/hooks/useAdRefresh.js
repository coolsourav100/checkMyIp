import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useAdRefresh = () => {
    const location = useLocation();

    useEffect(() => {
        const refreshAds = () => {
            if (window.adsbygoogle) {
                window.adsbygoogle.pauseAdRequests = 1;
                setTimeout(() => {
                    window.adsbygoogle.pauseAdRequests = 0;
                    window.adsbygoogle.push({});
                }, 100);
            }
        };
        refreshAds();
    }, [location.pathname]);
};

export default useAdRefresh;

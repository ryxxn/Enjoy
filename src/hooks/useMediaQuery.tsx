import { useState, useEffect } from 'react';
import { throttle } from 'lodash';

export enum MEDIA_SIZE {
  MOBILE = 768,
  TABLET = 1024,
}

const useMediaQuery = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // throttle
    const handleResize = throttle(() => {
      setScreenWidth(window.innerWidth);
    }, 200);

    handleResize(); // 초기 렌더링 시 크기에 따라 상태를 설정합니다.
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = screenWidth < MEDIA_SIZE.MOBILE;
  const isTablet =
    screenWidth >= MEDIA_SIZE.MOBILE && screenWidth < MEDIA_SIZE.TABLET;
  const isDesktop = screenWidth > MEDIA_SIZE.TABLET;

  return { isMobile, isTablet, isDesktop, screenWidth };
};

export default useMediaQuery;

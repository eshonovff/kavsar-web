import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';  // Make sure to import this for fade effect
import './Banner.css';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { GetBanner } from '../../Api/bannerApi';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useScroll } from '../../hook/ScrollProvider';

const Banner = () => {
  const dispatch = useDispatch();
  const { data: banners } = useSelector((state) => state.BannerSlicer);
  const { t } = useTranslation();
    const { requestRef, scrollToSection } = useScroll();
  useEffect(() => {
    dispatch(GetBanner());
  }, [dispatch]);

  // Prevent rendering if there are no banners
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="relative h-[450px] max-w-[1500px] w-full m-auto px-16 pt-10">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,  
          disableOnInteraction: false,
          pauseOnMouseEnter: false,  
        }}
        effect="fade"
        fadeEffect={{ 
          crossFade: true  
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={false}
        loop={true}  // Add loop for continuous sliding
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper"
      >
        {banners?.map((banner) => (
          <SwiperSlide key={banner.id} className="relative overflow-hidden rounded-lg shadow-xl">
            <div className="absolute inset-0 h-[450px]">
              {banner.imagePath && (
                <img 
                  src={import.meta.env.VITE_APP_API_URL_IMAGE + banner.imagePath} 
                  alt={banner.title || 'Banner Image'} 
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-full flex flex-col justify-center items-start p-8 text-left max-w-2xl">
              {banner.title && (
                <h2 className="text-white text-4xl font-bold mb-4 animate-fade-in-up">
                  {banner.title}
                </h2>
              )}
              {banner.description && (
                <p className="text-white text-xl mb-6 animate-fade-in-up animation-delay-300">
                  {banner.description}
                </p>
              )}
              
              <div className="group">
              <button 
               onClick={() => scrollToSection(requestRef)}
                type="primary"
                style={{
                  background: "linear-gradient(to right, #6366f1, #8b5cf6)",
                  color: "white",
                  border: "none",
                  fontWeight: 500,
                  fontSize: "16px",
                  position: "relative",
                  zIndex: 10,
                  padding: "12px 16px", /* Increased height */
                  borderRadius: "0.5rem",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                  transition: "all 0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(99, 102, 241, 0.4), 0 2px 4px -1px rgba(99, 102, 241, 0.06)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  
                  // Анимация для волны
                  const waveElement = e.currentTarget.querySelector('.wave-effect');
                  if (waveElement) {
                    waveElement.style.transform = "translateX(100%)";
                  }
                  
                  // Анимация для иконки
                  const iconElement = e.currentTarget.querySelector('.arrow-icon');
                  if (iconElement) {
                    iconElement.style.transform = "translateX(4px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                  
                  // Сброс анимации для волны
                  const waveElement = e.currentTarget.querySelector('.wave-effect');
                  if (waveElement) {
                    waveElement.style.transform = "translateX(-100%)";
                  }
                  
                  // Сброс анимации для иконки
                  const iconElement = e.currentTarget.querySelector('.arrow-icon');
                  if (iconElement) {
                    iconElement.style.transform = "translateX(0)";
                  }
                }}
              >
                <span  style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", gap: "0.5rem" }}>
               
                  {t("banners.SignCourses")}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="arrow-icon"
                    style={{ 
                      height: "1rem", 
                      width: "1rem",
                      transition: "transform 0.3s"
                    }}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
                <span 
                  className="wave-effect"
                  style={{ 
                    position: "absolute", 
                    inset: 0, 
                    backgroundColor: "white", 
                    opacity: 0.2, 
                    transform: "translateX(-100%)",
                    transition: "transform 0.7s"
                  }}
                ></span>
              </button>
            </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Add styles for hover effects */}
      <style jsx>{`
        .group:hover .white-wave {
          transform: translateX(100%) !important;
        }
        
        .group:hover .group-hover-svg {
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
}

export default Banner;
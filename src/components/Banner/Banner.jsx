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

const Banner = () => {
  const dispatch = useDispatch();
  const { data: banners } = useSelector((state) => state.BannerSlicer);
  const { t } = useTranslation();
  
  useEffect(() => {
    dispatch(GetBanner());
  }, [dispatch]);

  // Prevent rendering if there are no banners
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="relative h-[450px] max-w-[1500px] w-full m-auto">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,  // Increased delay for better visibility
          disableOnInteraction: false,
          pauseOnMouseEnter: false,  // Ensure it doesn't pause on hover
        }}
        effect="fade"
        fadeEffect={{ 
          crossFade: true  // Enable cross-fade for smoother transitions
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
        {banners.map((banner) => (
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
              <Button 
                type="primary" 
                size="large"
                className="bg-blue-600 hover:bg-blue-700 border-none text-white px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-600"
              >
                {t("banners.SignCourses")}
              </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
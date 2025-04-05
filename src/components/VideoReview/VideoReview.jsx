// VideoReviewTailwind.jsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { GetVideoReview } from '../../Api/bannerApi';

// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import custom styles for elements that can't be styled with Tailwind
import './VideoReview.css';

const VideoReviewTailwind = () => {
  const dispatch = useDispatch();
  const { videoReview } = useSelector((state) => state.BannerSlicer);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(GetVideoReview());
  }, [dispatch]);

  const handleVideoPlay = (id) => {
    if (activeVideoId === id) {
      // If the video is already active, pause it
      const videoElement = document.getElementById(`video-${id}`);
      if (videoElement) {
        videoElement.pause();
        setActiveVideoId(null);
      }
      return;
    }
    
    // Pause all videos
    document.querySelectorAll('.video-player').forEach(video => {
      video.pause();
    });

    // Play the selected video
    const videoElement = document.getElementById(`video-${id}`);
    if (videoElement) {
      videoElement.play()
        .then(() => {
          setActiveVideoId(id);
        })
        .catch(err => {
          console.error("Error playing video:", err);
        });
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 inline-block relative after:content-[''] after:block after:w-16 after:h-1 after:bg-blue-500 after:mx-auto after:mt-3">
            {t('HomePage.VideoReview.title') || 'Отзывы выпускников'}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-base leading-relaxed">
            {t('HomePage.VideoReview.description') || 'Послушайте, что говорят те, кто уже прошли наши курсы и получите от них необходимые рекомендации'}
          </p>
        </div>

        {/* Slider Container */}
        <div className="review-slider-container relative mt-10 px-10">
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            centeredSlides={false}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{
              clickable: true,
              el: '.custom-pagination'
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="reviews-swiper"
          >
            {videoReview?.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                  {/* Video Wrapper - с градиентом вместо черного фона */}
                  <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
                    <div className="flex justify-center rounded-t-2xl overflow-hidden video-frame-container">
                      <video
                        id={`video-${review.id}`}
                        src={`${import.meta.env.VITE_APP_API_URL_IMAGE.replace(/\/$/, '')}${review.videoReviewFile}`}
                        className="video-player"
                        style={{width: '250px'}} // Фиксированная ширина, высота автоматически
                        preload="metadata"
                        playsInline
                        onClick={() => activeVideoId === review.id ? handleVideoPlay(review.id) : null}
                      />
                      
                      {activeVideoId !== review.id && (
                        <div 
                          className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-blue-200/30 transition-all duration-300"
                          onClick={() => handleVideoPlay(review.id)}
                        >
                          <div className="w-16 h-16 bg-blue-500/85 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF" className="w-6 h-6 ml-1">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reviewer Info */}
                  <div className="p-4 bg-white rounded-b-2xl flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 mr-3 flex-shrink-0">
                      <img 
                        src={`${import.meta.env.VITE_APP_API_URL_IMAGE.replace(/\/$/, '')}/placeholder-avatar.jpg`} 
                        alt={review.reviewerName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/40';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-800 truncate m-0">{review.reviewerName}</h3>
                      <div className="text-sm text-blue-500 mt-1">Kavsar Academy</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-0 w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-md z-10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </div>
          <div className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-0 w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-md z-10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </div>

          {/* Pagination Dots */}
          <div className="custom-pagination flex justify-center gap-2 mt-8"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoReviewTailwind;
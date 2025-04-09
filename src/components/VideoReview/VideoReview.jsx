// VideoReviewTailwind.jsx - Оптимизированная версия
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GetVideoReview } from "../../Api/bannerApi";

// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

// Import custom styles with a unique name
import "./VideoReview.css";

const VideoReviewTailwind = () => {
  const dispatch = useDispatch();
  const { videoReview } = useSelector((state) => state.BannerSlicer);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(GetVideoReview());
  }, [dispatch]);

  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    document.querySelectorAll(".video-review-player").forEach((video) => {
      video.pause();
    });

    // Play the selected video
    const videoElement = document.getElementById(`video-${id}`);
    if (videoElement) {
      videoElement
        .play()
        .then(() => {
          setActiveVideoId(id);
        })
        .catch((err) => {
          console.error("Error playing video:", err);
        });
    }
  };

  // Improve slides per view calculation for better adaptivity
  const getSlidesPerView = () => {
    if (windowWidth < 480) {
      return 1;
    } else if (windowWidth < 768) {
      return 1.5; // Show 1.5 slides on small tablets for better UX
    } else if (windowWidth < 1024) {
      return 2;
    } else if (windowWidth < 1280) {
      return 2.5; // Show 2.5 slides on medium screens for better UX
    } else {
      return 3;
    }
  };

  // Optimize space between slides for different screen sizes
  const getSpaceBetween = () => {
    if (windowWidth < 480) {
      return 8;
    } else if (windowWidth < 768) {
      return 12;
    } else if (windowWidth < 1024) {
      return 16;
    } else {
      return 24;
    }
  };

  // Calculate card width based on screen size
  const getCardWidth = () => {
    if (windowWidth < 480) {
      return { width: "280px", maxWidth: "90%" };
    } else if (windowWidth < 640) {
      return { width: "320px", maxWidth: "90%" };
    } else if (windowWidth < 768) {
      return { width: "360px", maxWidth: "80%" };
    } else if (windowWidth < 1024) {
      return { width: "340px", maxWidth: "85%" };
    } else {
      return { width: "360px", maxWidth: "100%" };
    }
  };

  // Calculate aspect ratio padding based on device orientation
  const getAspectRatioPadding = () => {
    // Use 16:9 aspect ratio for regular videos (more common)
    return { paddingBottom: "56.25%" }; // 16:9 ratio
    
    // If you specifically need vertical videos (9:16), use:
    // return { paddingBottom: "177.78%" }; // 9:16 ratio
    
    // For 2:4 ratio as previously used:
    // return { paddingBottom: "200%" }; // 2:4 ratio
  };

  // Get card dimensions
  const cardStyles = getCardWidth();
  const aspectRatioStyles = getAspectRatioPadding();

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-[1500px] mx-auto px-3 sm:px-4 md:px-6">
        {/* Section Header with Improved Typography */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 inline-block relative">
            {t("HomePage.VideoReview.title") || "Отзывы выпускников"}
            <span className="block h-1 w-16 sm:w-20 md:w-24 bg-blue-500 mx-auto mt-2 sm:mt-3 md:mt-4 rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-4">
            {t("HomePage.VideoReview.description") ||
              "Послушайте, что говорят те, кто уже прошли наши курсы и получите от них необходимые рекомендации"}
          </p>
        </div>

        {/* Video Grid Section with Improved Styling and Adaptivity */}
        <div className="video-review-container relative mt-4 sm:mt-8 md:mt-10 px-2 sm:px-6 md:px-8">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 40,
              modifier: 1,
              slideShadows: false,
            }}
            slideToClickedSlide={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".video-review-pagination",
            }}
            navigation={{
              nextEl: ".video-review-next-button",
              prevEl: ".video-review-prev-button",
            }}
            slidesPerView={getSlidesPerView()}
            spaceBetween={getSpaceBetween()}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="video-review-swiper"
            // Add breakpoints for more precise control
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              480: {
                slidesPerView: 1.2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 1.5,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1380: {
                slidesPerView: 4.5,
                spaceBetween: 24,
              },
            }}
          >
            {videoReview?.map((review) => (
              <SwiperSlide key={review.id} className="video-review-slide h-auto py-4 sm:py-6 md:py-8">
                <div 
                  className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 flex flex-col h-full border border-blue-100 mx-auto"
                  style={{ width: cardStyles.width, maxWidth: cardStyles.maxWidth }}
                >
                  {/* Video Wrapper with Light Gradient Background and 16:9 Aspect Ratio */}
                  <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
                    {/* Updated aspect ratio container to 16:9 for better compatibility */}
                    <div className="aspect-ratio-box relative" style={aspectRatioStyles}>
                      <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
                        <video
                          id={`video-${review.id}`}
                          src={`${import.meta.env.VITE_APP_API_URL_IMAGE.replace(
                            /\/$/,
                            ""
                          )}${review.videoReviewFile}`}
                          className="video-review-player w-full h-full object-cover"
                          preload="metadata"
                          playsInline
                          onClick={() =>
                            activeVideoId === review.id
                              ? handleVideoPlay(review.id)
                              : null
                          }
                        />

                        {activeVideoId !== review.id && (
                          <div
                            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-transparent hover:bg-blue-100/50 transition-all duration-300"
                            onClick={() => handleVideoPlay(review.id)}
                          >
                            <div className="video-review-play-button w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 group">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#FFFFFF"
                                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-0.5 sm:ml-1 group-hover:text-white"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Reviewer Info with Enhanced Design */}
                  <div className="p-3 sm:p-4 md:p-5 bg-white rounded-b-xl sm:rounded-b-2xl">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-blue-500 mr-2 sm:mr-3 md:mr-3 flex-shrink-0 shadow-md bg-blue-100">
                        <img
                          src={`${import.meta.env.VITE_APP_API_URL_IMAGE.replace(
                            /\/$/,
                            ""
                          )}${
                            review.reviewerImage || "/placeholder-avatar.jpg"
                          }`}
                          alt={review.reviewerName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                            e.target.parentNode.innerHTML = `
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full text-blue-500 p-1 sm:p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            `;
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base md:text-base font-bold text-gray-800 truncate">
                          {review.reviewerName}
                        </h3>
                        <div className="flex items-center mt-0.5 sm:mt-1">
                          <span className="text-xs sm:text-sm font-medium text-blue-600">
                            Kavsar Academy
                          </span>
                          <span className="mx-1 sm:mx-2 text-gray-300">•</span>
                          <span className="text-xs sm:text-sm text-gray-500">
                            {t("HomePage.VideoReview.Graduate")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {review.quote && (
                      <div className="mt-1 sm:mt-2 text-gray-700 italic text-xs sm:text-sm border-l-2 sm:border-l-4 border-blue-500 pl-2 sm:pl-3 py-0.5 sm:py-1">
                        "
                        {windowWidth < 480
                          ? review.quote.length > 50
                            ? review.quote.substring(0, 50) + "..."
                            : review.quote
                          : windowWidth < 768
                          ? review.quote.length > 80
                            ? review.quote.substring(0, 80) + "..."
                            : review.quote
                          : review.quote.length > 120
                          ? review.quote.substring(0, 120) + "..."
                          : review.quote}
                        "
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Enhanced Navigation Buttons */}
          <div className="video-review-prev-button absolute top-1/2 -translate-y-1/2 left-0 sm:left-1 md:left-2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-md z-10 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5"
            >
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </div>
          <div className="video-review-next-button absolute top-1/2 -translate-y-1/2 right-0 sm:right-1 md:right-2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-md z-10 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5"
            >
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </div>

          {/* Enhanced Pagination Dots */}
          <div className="video-review-pagination flex justify-center gap-1 sm:gap-2 mt-4 sm:mt-6 md:mt-8"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoReviewTailwind;
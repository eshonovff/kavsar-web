// VideoReviewTailwind.jsx
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

// Import custom styles for elements that can't be styled with Tailwind
import "./VideoReview.css";

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
    document.querySelectorAll(".video-player").forEach((video) => {
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

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header with Improved Typography */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 inline-block relative">
            {t("HomePage.VideoReview.title") || "Отзывы выпускников"}
            <span className="block h-1 w-24 bg-blue-500 mx-auto mt-4 rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {t("HomePage.VideoReview.description") ||
              "Послушайте, что говорят те, кто уже прошли наши курсы и получите от них необходимые рекомендации"}
          </p>
        </div>

        {/* Video Grid Section with Improved Styling */}
        <div className="review-slider-container relative mt-10 px-6 sm:px-10">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
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
              el: ".custom-pagination",
            }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="reviews-swiper"
          >
            {videoReview?.map((review) => (
              <SwiperSlide key={review.id} className="h-auto py-8">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full border border-blue-100">
                  {/* Video Wrapper with Light Gradient Background */}
                  <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
                    <div className="flex justify-center overflow-hidden video-frame-container">
                      <video
                        id={`video-${review.id}`}
                        src={`${import.meta.env.VITE_APP_API_URL_IMAGE.replace(
                          /\/$/,
                          ""
                        )}${review.videoReviewFile}`}
                        className="video-player"
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
                          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 group">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="#FFFFFF"
                              className="w-8 h-8 ml-1 group-hover:text-white"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reviewer Info with Enhanced Design */}
                  <div className="p-5 bg-white rounded-b-2xl">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 mr-4 flex-shrink-0 shadow-md bg-blue-100">
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
                            e.target.onerror = null; // Предотвращаем бесконечный цикл ошибок
                            // Заменяем изображение на SVG иконку пользователя
                            e.target.style.display = "none";
                            e.target.parentNode.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full text-blue-500 p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      `;
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-800 truncate">
                          {review.reviewerName}
                        </h3>
                        <div className="flex items-center mt-1">
                          <span className="text-sm font-medium text-blue-600">
                            Kavsar Academy
                          </span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">
                            {review.course || "Выпускник"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {review.quote && (
                      <div className="mt-2 text-gray-700 italic text-sm border-l-4 border-blue-500 pl-3 py-1">
                        "
                        {review.quote.length > 120
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
          <div className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-0 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-lg z-10 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </div>
          <div className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-0 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-lg z-10 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </div>

          {/* Enhanced Pagination Dots */}
          <div className="custom-pagination flex justify-center gap-2 mt-10"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoReviewTailwind;

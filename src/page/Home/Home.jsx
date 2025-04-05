import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import { GetGalerry } from "../../Api/bannerApi";
import Banner from "../../components/Banner/Banner";
import ChooseUs from "../../components/ChooseUs/ChooseUs";
import { motion } from "framer-motion";
import "./Home.css";
import Course from "../../components/Course/Course";
import { Button } from "antd";
import Image1 from "../../assets/IMG_1448.png";
import VideoReview from "../../components/VideoReview/VideoReview";

const Homeus = () => {
  const dispatch = useDispatch();
  const { galerry } = useSelector((state) => state.BannerSlicer);
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [videoPaused, setVideoPaused] = useState(true);

  useEffect(() => {
    dispatch(GetGalerry());

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        // Play video when in view, pause when out of view
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current
            .play()
            .then(() => setVideoPaused(false))
            .catch((err) => console.log("Video autoplay prevented:", err));
        } else if (videoRef.current) {
          videoRef.current.pause();
          setVideoPaused(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [dispatch]);

  const statsItems = [
    { number: "3+", label: t("HomePage.year") },
    { number: "500+", label: t("HomePage.student") },
    { number: "5+", label: t("HomePage.place") },
    { number: "40+", label: t("HomePage.college") },
  ];

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setVideoPaused(false);
      } else {
        videoRef.current.pause();
        setVideoPaused(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Banner />

      <ChooseUs />

      <motion.section
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-[1500px] w-full mx-auto px-4 py-16 md:py-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-8">
            <motion.h1
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ y: 20 }}
              animate={{ y: isVisible ? 0 : 20 }}
              transition={{ delay: 0.2 }}
            >
              {t("HomePage.title")}
            </motion.h1>

            <motion.p
              className="text-gray-700 leading-relaxed"
              initial={{ y: 20 }}
              animate={{ y: isVisible ? 0 : 20 }}
              transition={{ delay: 0.3 }}
            >
              {t("HomePage.description")}
            </motion.p>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8"
              initial={{ y: 20 }}
              animate={{ y: isVisible ? 0 : 20 }}
              transition={{ delay: 0.4 }}
            >
              {statsItems?.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative group perspective-1000"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="bg-white shadow-lg rounded-xl p-6 transform transition-all duration-500 group-hover:rotate-y-180 preserve-3d">
                    <div className="flex flex-col items-center backface-hidden">
                      <span className="text-3xl font-bold text-indigo-600">
                        {item.number}
                      </span>
                      <span className="text-sm font-medium text-gray-500 mt-2">
                        {item.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="rounded-2xl overflow-hidden shadow-2xl transform perspective-1000"
            initial={{ rotateY: 15, rotateX: 5 }}
            animate={{
              rotateY: isVisible ? [15, -5, 0] : 15,
              rotateX: isVisible ? [5, -2, 0] : 5,
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {galerry && galerry.length > 0 ? (
              <div className="relative overflow-hidden rounded-2xl transform-style-3d shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 z-10 rounded-2xl pointer-events-none"></div>
                <video
                  ref={videoRef}
                  src={
                    import.meta.env.VITE_APP_API_URL_IMAGE + galerry[0].mediaUrl
                  }
                  className="w-full h-full object-cover transform transition-all duration-300 hover:scale-105"
                  muted
                  loop
                  playsInline
                  controls={false}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 z-20">
                  <button
                    className="bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/30 transition-all"
                    onClick={toggleVideoPlayback}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {videoPaused ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-64 w-full bg-gray-200 animate-pulse rounded-2xl"></div>
            )}
          </motion.div>
        </div>
      </motion.section>

      <Course />

      <section className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-lg overflow-hidden relative my-18">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-40"></div>
          <div className="absolute bottom-10 right-20 w-48 h-48 bg-indigo-200 rounded-full opacity-40"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-200 rounded-full opacity-30"></div>
        </div>
        
        <div className="max-w-[1500px] m-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 px-6 z-10">
          <motion.div 
            className="flex flex-col max-w-md space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1 
              className="text-4xl font-bold text-gray-800 leading-tight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {t("HomePage.section.title")}
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              {t("HomePage.section.description")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Button
                type="primary"
                style={{
                  background: "linear-gradient(to right, #6366f1, #8b5cf6)",
                  color: "white",
                  border: "none",
                  fontWeight: 500,
                  fontSize: "16px",
                  position: "relative",
                  zIndex: 10,
                  padding: "12px 16px", 
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
                <span style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <img 
              src={Image1} 
              alt="Education concept" 
              className="object-cover rounded-lg shadow-xl max-h-96 hover:shadow-2xl transition-shadow duration-300"
            />
          </motion.div>
        </div>
      </section>

      <VideoReview />
    </div>
  );
};

export default Homeus;
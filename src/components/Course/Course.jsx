import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { GetCourse } from '../../Api/bannerApi';
import { Link } from 'react-router-dom';

// Компонент рейтинга в виде плашки с звездой
const RatingBadge = ({ rating }) => {
  return (
    <div className="flex items-center bg-yellow-400 text-white px-3 py-1 rounded-md font-semibold">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 mr-1"
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      {rating.toFixed(1)}
    </div>
  );
};

// Компонент тега материала
const MaterialTag = ({ text }) => {
  return (
    <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md text-sm font-medium inline-block mb-2 mr-2">
      {text}
    </div>
  );
};

// Функция для обрезки текста до 160 символов
const truncateText = (text, maxLength = 160) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const Course = () => {
  const dispatch = useDispatch();
  const { t, i18n:{language}, i18n } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const { course } = useSelector((state) => state.BannerSlicer);
  
  const isRTL = i18n.dir() === 'rtl';
  // Генерируем случайные рейтинги для каждого курса
  
  useEffect(() => {
    dispatch(GetCourse(language));
  }, [dispatch, language]);
  
  const [courseRatings, setCourseRatings] = useState({});
  // Генерируем рейтинги при изменении списка курсов
  useEffect(() => {
    if (course && course.length > 0) {
      const ratings = {};
      course.forEach(item => {
        // Генерируем случайный рейтинг от 4.5 до 5.0
        ratings[item.id] = 4.5 + Math.random() * 0.5;
      });
      setCourseRatings(ratings);
    }
  }, [course]);

  const toggleShowAll = () => {
    setShowAll(prevState => !prevState);
  };

  const displayedCourses = showAll ? (course || []) : (course || [])?.slice(0, 8);
  const hasMoreCourses = (course || [])?.length > 8;

  return (
    <div className={`max-w-[1500px] mx-auto py-16 px-4 sm:px-6 rounded-3xl shadow-md relative overflow-hidden bg-gradient-to-b from-white to-blue-50 ${isRTL ? 'rtl' : 'ltr'}`}>
   
      {/* Background particles with optimized animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full opacity-10"
            style={{
              width: `${Math.floor(Math.random() * 12) + 6}px`,
              height: `${Math.floor(Math.random() * 12) + 6}px`,
              top: `${Math.floor(Math.random() * 100)}%`,
              left: `${Math.floor(Math.random() * 100)}%`,
              backgroundColor: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#10b981',
              animation: `float${i % 5 + 1} ${20 + i * 2}s infinite ease-in-out`,
              animationDelay: `${i * 0.5}s`,
              willChange: 'transform'
            }}
          ></div>
        ))}
      </div>
      
      {/* Section title */}
      <div className="relative z-10 mb-12 sm:mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 mb-2">
          {t('HomePage.courses.title')}
        </h2>
        <p className="text-slate-700 max-w-2xl mx-auto">{t('HomePage.courses.description')}</p>
        <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full relative mt-4">
          <div className="absolute inset-0 bg-indigo-500 blur-md opacity-50 rounded-full">
          </div>
        </div>
      </div>
      
      {/* Courses grid with improved accessibility and responsiveness */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 relative z-10">
        {displayedCourses && displayedCourses.length > 0 ? (
          displayedCourses.map((item) => (
            <div key={item.id} className="group">
              <div className="h-full bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl transition-all hover:border duration-500 transform group-hover:shadow-lg group-hover:border-indigo-500/50 relative flex flex-col">
                {/* Card background elements (reduced for better performance) */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-10 -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-600 rounded-full blur-3xl opacity-10 -ml-10 -mb-10"></div>
                </div>

                {/* Course image with improved loading */}
                <div className="relative h-44 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900 opacity-60 z-10"></div>
                  <img 
                    src={`${import.meta.env.VITE_APP_API_URL_IMAGE}${item.imagePath}`} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Рейтинг курса (в правом нижнем углу изображения) */}
                  <div className="absolute bottom-2 right-2 z-20">
                    <RatingBadge rating={courseRatings[item.id] || 4.9} />
                  </div>
                </div>
                
                {/* Content container with standard height */}
                <div className="relative z-10 p-4 sm:p-5 flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.name}</h3>
                  
                  {/* Ограничиваем описание курса до 160 символов */}
                  <p className="text-gray-600 text-sm mb-3">{truncateText(item.description, 100)}</p>
                  
                  {/* Материалы курса в виде тегов */}
                  {item.materials && item.materials.length > 0 && (
                    <div className="mb-16 flex flex-wrap">
                      {item.materials.slice(0, 2).map((material, index) => (
                        <MaterialTag key={index} text={material} />
                      ))}
                      {item.materials.length > 2 && (
                        <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md text-sm font-medium inline-block mb-2 mr-2">
                          +{item.materials.length - 2}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Bottom positioned button */}
                  <Link to={`/course/${item.id}`}>
                  <div className="absolute bottom-5 left-4 sm:left-5 right-4 sm:right-5">
                    <div className="group/btn">
                      <button 
                        style={{
                          background: "linear-gradient(to right, #6366f1, #8b5cf6)",
                          color: "white",
                          border: "none",
                          fontWeight: 500,
                          fontSize: "16px",
                          position: "relative",
                          zIndex: 10,
                          padding: "10px 16px",
                          borderRadius: "0.5rem",
                          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                          transition: "all 0.3s",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          overflow: "hidden",
                          width: "100%"
                        }}
                        aria-label={`${t('HomePage.courses.button')} ${t('HomePage.courses.button')} ${item.name}`}
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
                          {t('HomePage.courses.button')}
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`arrow-icon ${isRTL ? 'transform rotate-180' : ''}`}
                            style={{ 
                              height: "1rem", 
                              width: "1rem",
                              transition: "transform 0.3s"
                            }}
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                            aria-hidden="true"
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
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 sm:py-16 bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 sm:h-16 w-12 sm:w-16 text-gray-400 mb-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-xl text-gray-600">{t('noCourses')}</p>
          </div>
        )}
      </div>
      
      {/* "More Courses"/"Hide" button with improved accessibility */}
      {hasMoreCourses && (
        <div className="mt-12 sm:mt-16 text-center relative z-10">
          <div className="group">
            <button 
              onClick={toggleShowAll}
              style={{
                background: "linear-gradient(to right, #6366f1, #8b5cf6)",
                color: "white",
                border: "none",
                fontWeight: 500,
                fontSize: "16px",
                position: "relative",
                zIndex: 10,
                padding: "12px 24px",
                borderRadius: "9999px",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                overflow: "hidden"
              }}
              aria-expanded={showAll}
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
                  iconElement.style.transform = `rotate(${showAll ? '0' : '180'}deg)`;
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
                  iconElement.style.transform = showAll ? "rotate(180deg)" : "rotate(0deg)";
                }
              }}
            >
              <span style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {showAll ? t('HomePage.courses.hide') : t('HomePage.courses.showmore')}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="arrow-icon" 
                  style={{ 
                    height: "1.25rem", 
                    width: "1.25rem",
                    transition: "transform 0.3s",
                    transform: showAll ? "rotate(180deg)" : "rotate(0deg)"
                  }}
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
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
      )}

      {/* Animation styles with performance optimizations */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-15px, 10px) rotate(90deg); }
          50% { transform: translate(10px, 15px) rotate(180deg); }
          75% { transform: translate(15px, -10px) rotate(270deg); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(15px, -15px) rotate(90deg); }
          50% { transform: translate(-15px, -10px) rotate(180deg); }
          75% { transform: translate(-10px, 15px) rotate(270deg); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-10px, -15px) rotate(90deg); }
          50% { transform: translate(15px, 10px) rotate(180deg); }
          75% { transform: translate(10px, -10px) rotate(270deg); }
        }
        
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(15px, 10px) rotate(90deg); }
          50% { transform: translate(5px, -15px) rotate(180deg); }
          75% { transform: translate(-10px, 5px) rotate(270deg); }
        }
        
        @keyframes float5 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-5px, 15px) rotate(90deg); }
          50% { transform: translate(-15px, -5px) rotate(180deg); }
          75% { transform: translate(10px, -10px) rotate(270deg); }
        }

        /* Add RTL support */
        .rtl {
          direction: rtl;
          text-align: right;
        }
        
        .rtl .flex {
          flex-direction: row-reverse;
        }
      `}</style>
    </div>
  );
};

export default Course;
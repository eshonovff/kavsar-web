import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GetCourse } from "../../Api/bannerApi";
import YoutubeStyleLoader from "../../components/loading/YoutubeStyleLoader";

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
    <span className="bg-indigo-50 text-indigo-700 text-xs py-1 px-2 rounded">
      {text}
    </span>
  );
};

const Courses = () => {
  const dispatch = useDispatch();
  const { course, loading } = useSelector((state) => state.BannerSlicer);
  const { t , i18n:{language}} = useTranslation();
  
  // Состояние только для поиска
  const [searchTerm, setSearchTerm] = useState("");
  
  // Генерируем случайные рейтинги для каждого курса
  const [courseRatings, setCourseRatings] = useState({});

  useEffect(() => {
    dispatch(GetCourse(language));
  }, [dispatch, language]);
  
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

  // Фильтрация курсов только по поиску
  const filteredCourses = course ? course.filter(item => {
    const matchesSearch = !searchTerm || 
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  }) : [];


  if (loading?.course) {
    return <YoutubeStyleLoader />;
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {t('courses.hero.our')}{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
            {t('courses.hero.educationalCourses')}
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('courses.hero.description')}
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder={t('courses.search.placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none shadow-md"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={`${import.meta.env.VITE_APP_API_URL_IMAGE}${item.imagePath}`}
                    alt={item.name}
                    className="w-full h-48 object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-white rounded-full py-1 px-3 text-xs font-semibold text-indigo-700">
                    {item.category || t('courses.card.defaultCategory')}
                  </div>
                  {item.level && (
                    <div className="absolute top-4 right-4 bg-white rounded-full py-1 px-3 text-xs font-semibold text-pink-700">
                      {item.level}
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4">
                    <RatingBadge rating={courseRatings[item.id] || 4.8} />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.materials && item.materials.slice(0, 2).map((material, index) => (
                      <MaterialTag key={index} text={material} />
                    ))}
                    {item.materials && item.materials.length > 2 && (
                      <span className="bg-gray-50 text-gray-700 text-xs py-1 px-2 rounded">
                        +{item.materials.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-lg font-bold text-gray-900">
                      {item.price ? `${item.price} ${t('courses.card.currency')}` : t('courses.card.free')}
                    </span>
                    <a href={`/course/${item.id}`} className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all">
                      {t('courses.card.details')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-300 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {t('courses.empty.title')}
            </h3>
            <p className="text-gray-500">
              {t('courses.empty.description')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
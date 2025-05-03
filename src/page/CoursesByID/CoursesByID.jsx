import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { GetCourse, GetCourseById } from "../../Api/bannerApi"; // Предполагаем, что такая функция API существует

// Компонент рейтинга в виде звезд
const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${
            index < filledStars
              ? "text-yellow-400"
              : index === filledStars && hasHalfStar
              ? "text-yellow-400 half-star"
              : "text-gray-300"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-2 text-gray-700 font-medium">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

// Тег материала
const MaterialTag = ({ text }) => {
  return (
    <div className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md text-sm font-medium mr-2 mb-2">
      {text}
    </div>
  );
};

const CoursesByID = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Предполагаем, что в Redux-хранилище есть активный курс
  const { activeCourse, course } = useSelector((state) => state.BannerSlicer);
  console.log(course);

  // Состояние для хранения рейтинга
  const [rating, setRating] = useState(4.8);

  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    // Установка рейтинга
    setRating(4.5 + Math.random() * 0.5);

    // Безопасная загрузка данных курса
    if (id) {
      dispatch(GetCourseById({ id }));
    }
    
    // Загрузка списка всех курсов
    dispatch(GetCourse());
  }, [id, dispatch, t]); // Добавляем t в зависимости, чтобы реагировать на изменения языка

  // Если курс не найден
  if (!activeCourse) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400 mx-auto mb-4"
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
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            {t("Course not found", "Курс не найден")}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("Unfortunately, the requested course was not found or has been deleted.", "К сожалению, запрашиваемый курс не найден или был удален.")}
          </p>
          <Link
            to="/courses"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {t("Return to course list", "Вернуться к списку курсов")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Хлебные крошки */}
      <div className="max-w-7xl mx-auto mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">
                {t("Home")}
              </Link>
            </li>
            <li className="flex items-center">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Link
                to="/courses"
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                {t("Courses")}
              </Link>
            </li>
            <li className="flex items-center">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2 text-gray-700 font-medium truncate">
                {activeCourse.name || t("Course Details")}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Основное содержимое */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Верхняя часть с изображением и базовой информацией */}
          <div className="relative">
            <img
              src={`${import.meta.env.VITE_APP_API_URL_IMAGE}${
                activeCourse.imagePath
              }`}
              alt={activeCourse.name || t("Course")}
              className="w-full h-80 object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/1920x640?text=No+Image';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-indigo-500 text-white text-xs py-1 px-3 rounded-full">
                  {activeCourse.category || t("Course")}
                </span>
                <span className="bg-pink-500 text-white text-xs py-1 px-3 rounded-full">
                  {activeCourse.level || t("AllLevels")}
                </span>
                <span className="bg-yellow-500 text-white text-xs py-1 px-3 rounded-full flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {rating.toFixed(1)}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {activeCourse.name || t("Course")}
              </h1>
             
            </div>
          </div>

          {/* Информация о курсе */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Основная информация */}
              <div className="md:col-span-2">
                {/* Табы */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-8" aria-label="Tabs">
                    <button
                      onClick={() => setActiveTab("description")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "description"
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {t("Description")}
                    </button>
                    <button
                      onClick={() => setActiveTab("curriculum")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "curriculum"
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {t("Curriculum")}
                    </button>
                    <button
                      onClick={() => setActiveTab("instructor")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "instructor"
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {t("Instructor")}
                    </button>
                  </nav>
                </div>

                {/* Содержимое табов */}
                <div className="pb-6">
                  {/* Описание */}
                  {activeTab === "description" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {t("AboutCourse")}
                      </h2>
                      <div className="prose max-w-none text-gray-700 mb-8">
                        <p className="mb-4">{activeCourse.description || t("No description available")}</p>
                        <p>
                        {t(
                          "CourseDescriptionFallback",
                          "Наша академия предлагает этот курс с целью помочь вам приобрести не только теоретические знания, но и практические навыки. Программа разработана опытными преподавателями и адаптирована для студентов с разным уровнем подготовки — от начинающих до продвинутых. Современные методики обучения и индивидуальный подход к каждому студенту обеспечивают высокую эффективность обучения и стабильный прогресс."
                        )}
                        </p>
                      </div>

                      {/* Материалы */}
                      {activeCourse.materials &&
                        Array.isArray(activeCourse.materials) && 
                        activeCourse.materials.length > 0 && (
                          <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                              {t("WhatYouWillLearn")}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {activeCourse.materials.map((material, index) => (
                                <div
                                  key={index}
                                  className="flex items-start space-x-3"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-green-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span className="text-gray-700">
                                    {material}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Требования */}
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          {t("Requirements")}
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>{t("RequirementBasic")}</li>
                          <li>{t("RequirementInternet")}</li>
                          <li>{t("RequirementComputer")}</li>
                        </ul>
                      </div>

                      {/* Для кого этот курс */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          {t("WhoThisCourseIsFor")}
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>{t("ForBeginner")}</li>
                          <li>{t("ForStudent")}</li>
                          <li>{t("ForProfessional")}</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Программа курса */}
                  {activeTab === "curriculum" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {t("CourseCurriculum")}
                      </h2>

                      <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 border border-blue-100">
                        <div className="animate-pulse absolute -right-16 -top-16 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
                        <div className="animate-pulse delay-700 absolute -left-8 -bottom-8 w-24 h-24 bg-indigo-200 rounded-full opacity-20"></div>

                        <div className="relative flex items-center">
                          <div className="hidden md:block mr-4">
                            <div className="relative">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-blue-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <div className="absolute top-0 left-0 w-full h-full animate-ping bg-blue-100 rounded-full opacity-30"></div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-800 mb-1 relative">
                              <span className="relative inline-block">
                                {t("Coming Soon", "Скоро")}
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-200"></div>
                              </span>
                            </h3>

                            <p className="text-gray-600">
                              {t(
                                "The videos for the course you are interested in will be available soon. Currently not active.",
                                "Видеоматериалы курса, которым вы интересуетесь, будут доступны в ближайшее время. В настоящее время не активны."
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Animated dots */}
                        <div className="flex mt-3 ml-16 md:ml-20">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-1 animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-1 animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>

                      {/* Здесь будет содержимое учебной программы, когда оно станет доступным */}
                    </div>
                  )}

                  {/* Преподаватель */}
                  {activeTab === "instructor" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {activeCourse.colleagues && Array.isArray(activeCourse.colleagues) && activeCourse.colleagues.length > 1 
                          ? t("MeetInstructors", "Познакомьтесь с преподавателями") 
                          : t("MeetInstructor", "Познакомьтесь с преподавателем")}
                      </h2>

                      {/* Проверяем, есть ли массив colleagues и отображаем всех преподавателей */}
                      {activeCourse.colleagues && Array.isArray(activeCourse.colleagues) && activeCourse.colleagues.length > 0 ? (
                        <div className="space-y-6">
                          {activeCourse.colleagues.map((colleague, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                              <div className="flex-shrink-0">
                                <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                  {colleague.profileImage ? (
                                    <img
                                      src={`${import.meta.env.VITE_APP_API_URL_IMAGE}${colleague.profileImage}`}
                                      alt={colleague.fullName || t("Instructor")}
                                      className="h-full w-full object-cover"
                                      onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                      }}
                                    />
                                  ) : (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-12 w-12 text-gray-400"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </div>
                              </div>

                              <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                  {colleague.fullName || t("Instructor Name")}
                                </h3>
                                <p className="text-indigo-600 mb-3">
                                  {colleague.role || t("CourseInstructor")}
                                </p>
                                {colleague.about && (
                                  <div className="text-gray-700">
                                    <p>{colleague.about}</p>
                                  </div>
                                )}
                                {colleague.summary && (
                                  <div className="text-gray-600 text-sm mt-2">
                                    <p>{colleague.summary}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        // Запасной вариант, если массив преподавателей отсутствует
                        <div className="bg-gray-50 rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                          <div className="flex-shrink-0">
                            <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {t("ExperiencedInstructor")}
                            </h3>
                            <p className="text-indigo-600 mb-3">
                              {t("CourseInstructor")}
                            </p>
                            <div className="text-gray-700">
                              <p>{t("InstructorDescriptionFallback", "Наши опытные инструкторы являются экспертами в своей области и готовы поделиться своими знаниями и опытом. Они разработали этот курс с учетом самых современных методик обучения.")}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Боковая панель с информацией и кнопкой регистрации */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-8">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {activeCourse.price
                        ? `${activeCourse.price} ${t("somoni", "сомони")}`
                        : t("Free")}
                    </div>
                  </div>

                  {/* Заменяем обычную кнопку на Link-компонент для перехода на RequestByID */}
                  <Link
                    to={`/course/${id}/RequestByID`}
                    state={{ courseName: activeCourse.name }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mb-4 text-center block"
                  >
                    {t("EnrollNow")}
                  </Link>

                  <button className="w-full py-3 px-4 bg-white border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mb-8">
                    {t("TryDemoLesson")}
                  </button>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 mr-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <span className="block text-sm text-gray-500">
                          {t("Duration")}
                        </span>
                        <span className="font-medium text-gray-900">
                          {activeCourse.duration
                            ? `${activeCourse.duration} ${t("months")}`
                            : t("Flexible")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 mr-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      <div>
                        <span className="block text-sm text-gray-500">
                          {t("Level")}
                        </span>
                        <span className="font-medium text-gray-900">
                          {activeCourse.level || t("AllLevels")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 mr-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <div>
                        <span className="block text-sm text-gray-500">
                          {t("Students")}
                        </span>
                        <span className="font-medium text-gray-900">
                          {Math.floor(Math.random() * 150) + 50}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 mr-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <span className="block text-sm text-gray-500">
                          {t("LastUpdated")}
                        </span>
                        <span className="font-medium text-gray-900">
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">
                      {t("Materials")}
                    </h4>
                    <div className="flex flex-wrap">
                      {activeCourse.materials &&
                        Array.isArray(activeCourse.materials) &&
                        activeCourse.materials.map((material, index) => (
                          <MaterialTag key={index} text={material} />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Другие курсы - Исправленная проблемная часть */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t("OtherCourses")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {course && Array.isArray(course) && 
              course
                .filter((item) => item && activeCourse && item.id !== activeCourse.id)
                .slice(0, 3) // Ограничиваем количество отображаемых курсов
                .map((item) => (
                  <div
                    key={item.id || Math.random().toString()}
                    className="bg-gradient-to-br from-blue-50 to-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Image container */}
                      <div className="sm:w-1/3 relative overflow-hidden aspect-video sm:aspect-square">
                        <img
                          src={`${import.meta.env.VITE_APP_API_URL_IMAGE}${
                            item.imagePath
                          }`}
                          alt={item.name || t("Course")}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                          }}
                        />
                        {/* Bright overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Content container */}
                      <div className="flex-1 p-4 flex flex-col justify-between relative">
                        {/* Small decorative element */}
                        <div className="absolute w-8 h-1 bg-blue-400 rounded-full top-2 right-4 group-hover:w-12 transition-all duration-300"></div>

                        <div>
                          <h3 className="font-medium text-base text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1 pr-10">
                            {item.name || t("Unnamed Course")}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                            {item.description || t("No description available")}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-gray-100">
                          <Link
                            to={`/course/${item.id}`}
                            className="inline-flex items-center text-xs font-medium text-blue-500 hover:text-blue-700"
                          >
                            {t("Details", "Подробнее")}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 ml-1 transform transition-transform group-hover:translate-x-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesByID;
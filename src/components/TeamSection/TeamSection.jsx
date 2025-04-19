import React, { useEffect, useState } from 'react';
import { Users, Award, Briefcase, Star, Code, Mail, Globe, Linkedin, ChevronDown, ChevronUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { GetColleague } from '../../Api/bannerApi';
import { useTranslation } from 'react-i18next';

// Компонент карточки сотрудника
const TeamMemberCard = ({ member }) => {
  const { t } = useTranslation();
  
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md shadow-lg transition-all duration-300 transform group-hover:shadow-xl group-hover:scale-[1.02] h-full flex flex-col">
        {/* Фото сотрудника с градиентным оверлеем */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          <img 
            src={`${import.meta.env.VITE_APP_API_URL_IMAGE}${member.profileImagePath}`}
            alt={member.fullName}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Технологии, которыми владеет */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-wrap gap-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
            {member.knowingIcons.map((icon, index) => (
              <div key={index} className="w-8 h-8 rounded-full bg-white/90 p-1 shadow-md">
                <img 
                  src={`${import.meta.env.VITE_APP_API_URL_IMAGE}${icon}`} 
                  alt={t('team.skillAlt')}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Тонкая градиентная линия */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-violet-600"></div>
        
        {/* Информация о сотруднике */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-bold mb-1 text-gray-800">{member.fullName}</h3>
          
          {/* Summary с ограничением */}
          <div className="relative mb-2">
            <p className="text-sm text-indigo-600 font-medium overflow-hidden transition-all duration-300">
              <span className="line-clamp-2 group-hover:line-clamp-none">
                {member.summary}
              </span>
            </p>
          </div>
          
          {/* About с ограничением */}
          <div className="relative">
            <p className="text-xs text-gray-600 overflow-hidden transition-all duration-300">
              <span className="line-clamp-3 group-hover:line-clamp-none">
                {member.aboute}
              </span>
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Основной компонент команды для About.jsx
const TeamSection = () => {
  const dispatch = useDispatch();
  const { colleague, loading } = useSelector((state) => state.BannerSlicer);
  const [showAllTeachers, setShowAllTeachers] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    // Загружаем данные о команде
    dispatch(GetColleague());
  }, [dispatch]);

  // Разделяем сотрудников на директоров и преподавателей
  const directors = colleague?.filter(member => member.role === "director") || [];
  const allTeachers = colleague?.filter(member => member.role === "teacher") || [];
  
  // Определяем, сколько преподавателей показывать
  const teachersToDisplay = showAllTeachers ? allTeachers : allTeachers.slice(0, 8);
  const hasMoreTeachers = allTeachers.length > 8;

  return (
    <>
      {/* Руководство - компактный дизайн для 2 директоров */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              {t('team.leadership.title')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mb-6 mx-auto"></div>
            <p className="text-gray-700 max-w-3xl mx-auto">
              {t('team.leadership.description')}
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center">
              {directors.map((director, index) => (
                <div key={director.id} className="lg:w-2/5 group">
                  <div className="h-full relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md shadow-lg transition-all duration-300 transform group-hover:shadow-xl group-hover:scale-[1.02] flex flex-col">
                    {/* Фото с оверлеем */}
                    <div className="relative h-72 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                      <img 
                        src={`${import.meta.env.VITE_APP_API_URL_IMAGE}${director.profileImagePath}`}
                        alt={director.fullName}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Технологии/навыки */}
                      <div className="absolute bottom-4 left-0 right-0 px-5 flex flex-wrap gap-2 justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                        {director.knowingIcons.map((icon, i) => (
                          <div key={i} className="w-10 h-10 rounded-full bg-white/90 p-1.5 shadow-lg">
                            <img 
                              src={`${import.meta.env.VITE_APP_API_URL_IMAGE}${icon}`} 
                              alt={t('team.skillAlt')}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Декоративная полоса */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-indigo-600 to-violet-600"></div>
                    
                    {/* Информация - с ограниченной высотой */}
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                        {director.fullName}
                      </h3>
                      
                      {/* Summary с ограничением */}
                      <div className="relative mb-2">
                        <p className="text-md font-medium text-gray-700 overflow-hidden transition-all duration-300">
                          <span className="line-clamp-2 group-hover:line-clamp-none">
                            {director.summary}
                          </span>
                        </p>
                      </div>
                      
                      {/* Описание с ограничением и возможностью показать больше */}
                      <div className="relative">
                        <p className="text-gray-600 text-sm line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                          {director.aboute}
                        </p>
                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 transition-opacity duration-300"></div>
                      </div>
                      
                      {/* Декоративный элемент */}
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mt-4 self-end">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                          {index === 0 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Преподаватели */}
      <section className="py-16 relative bg-gradient-to-b from-slate-50 to-indigo-50/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              {t('team.teachers.title')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mb-6 mx-auto"></div>
            <p className="text-gray-700 max-w-3xl mx-auto">
              {t('team.teachers.description')}
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <>
              {/* Сетка с преподавателями */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {teachersToDisplay.map((teacher) => (
                  <TeamMemberCard key={teacher.id} member={teacher} />
                ))}
              
                {/* Если нет преподавателей, показываем сообщение */}
                {allTeachers.length === 0 && !loading && (
                  <div className="col-span-full text-center p-12 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
                    <div className="w-16 h-16 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                      <Users className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-gray-800">
                      {t('team.teachers.empty.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('team.teachers.empty.message')}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Кнопка "Показать еще" */}
              {hasMoreTeachers && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setShowAllTeachers(!showAllTeachers)}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3 text-white shadow-lg transition-all duration-300 hover:shadow-indigo-500/30"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center gap-2">
                      {showAllTeachers ? (
                        <>
                          <ChevronUp className="w-5 h-5" />
                          <span>{t('team.teachers.button.hide')}</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-5 h-5" />
                          <span>{t('team.teachers.button.showMore', { count: allTeachers.length - 8 })}</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default TeamSection;
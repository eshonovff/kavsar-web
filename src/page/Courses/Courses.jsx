import React, { useState } from 'react';

// Dummy data - замените на ваши реальные данные о курсах
const coursesData = [
  {
    id: 1,
    title: "Программирование на JavaScript",
    category: "Разработка",
    level: "Начинающий",
    duration: "3 месяца",
    price: "1500 сомони",
    students: 120,
    rating: 4.8,
    image: "https://via.placeholder.com/500x300",
    description: "Изучите основы современного JavaScript и научитесь создавать интерактивные веб-приложения с нуля.",
    features: ["Frontend разработка", "Работа с DOM", "ES6+", "Основы React"]
  },
  {
    id: 2,
    title: "Графический дизайн",
    category: "Дизайн",
    level: "Средний",
    duration: "2 месяца",
    price: "1200 сомони",
    students: 85,
    rating: 4.6,
    image: "https://via.placeholder.com/500x300",
    description: "Освойте Adobe Photoshop, Illustrator и принципы современного дизайна для создания профессиональных графических материалов.",
    features: ["Adobe Photoshop", "Adobe Illustrator", "Теория цвета", "UI/UX основы"]
  },
  {
    id: 3,
    title: "Основы бухгалтерского учета",
    category: "Бизнес",
    level: "Начинающий",
    duration: "2 месяца",
    price: "1300 сомони",
    students: 65,
    rating: 4.5,
    image: "https://via.placeholder.com/500x300",
    description: "Получите фундаментальные знания в области бухгалтерского учета и налогообложения.",
    features: ["Финансовый учет", "Налоговый учет", "1С Бухгалтерия", "Отчетность"]
  },
  {
    id: 4,
    title: "Английский язык для начинающих",
    category: "Языки",
    level: "Начинающий",
    duration: "4 месяца",
    price: "1100 сомони",
    students: 150,
    rating: 4.9,
    image: "https://via.placeholder.com/500x300",
    description: "Интенсивный курс английского языка для начинающих с фокусом на разговорной практике.",
    features: ["Грамматика", "Лексика", "Разговорная практика", "Аудирование"]
  },
  {
    id: 5,
    title: "Мобильная разработка на Flutter",
    category: "Разработка",
    level: "Продвинутый",
    duration: "3 месяца",
    price: "1800 сомони",
    students: 70,
    rating: 4.7,
    image: "https://via.placeholder.com/500x300",
    description: "Научитесь создавать кросс-платформенные мобильные приложения с помощью Flutter и Dart.",
    features: ["Dart язык", "UI компоненты", "State management", "Публикация приложений"]
  },
  {
    id: 6,
    title: "Маркетинг в социальных сетях",
    category: "Маркетинг",
    level: "Средний",
    duration: "2 месяца",
    price: "1400 сомони",
    students: 110,
    rating: 4.6,
    image: "https://via.placeholder.com/500x300",
    description: "Стратегии продвижения бизнеса в социальных сетях и создание эффективных рекламных кампаний.",
    features: ["SMM стратегия", "Таргетированная реклама", "Контент-план", "Аналитика"]
  }
];

// Все уникальные категории из данных
const categories = ["Все", ...new Set(coursesData.map(course => course.category))];
const levels = ["Все уровни", "Начинающий", "Средний", "Продвинутый"];

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [activeLevel, setActiveLevel] = useState("Все уровни");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Фильтрация курсов
  const filteredCourses = coursesData.filter(course => {
    const matchesCategory = activeCategory === "Все" || course.category === activeCategory;
    const matchesLevel = activeLevel === "Все уровни" || course.level === activeLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesLevel && matchesSearch;
  });

  // Открытие модального окна с деталями курса
  const openCourseDetails = (course) => {
    setSelectedCourse(course);
  };

  // Закрытие модального окна
  const closeCourseDetails = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Наши <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">образовательные курсы</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Выберите подходящий курс и начните свой путь к новым знаниям и навыкам вместе с нами.
        </p>
      </div>

      {/* Filter and Search Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row justify-between items-stretch md:items-center space-y-4 md:space-y-0">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-700 font-medium mr-2">Категории:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-700 font-medium mr-2">Уровень:</span>
            <div className="flex flex-wrap gap-2">
              {levels.map(level => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeLevel === level
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Поиск курсов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <div 
                key={course.id} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => openCourseDetails(course)}
              >
                <div className="relative">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover object-center" />
                  <div className="absolute top-4 left-4 bg-white rounded-full py-1 px-3 text-xs font-semibold text-indigo-700">
                    {course.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-white rounded-full py-1 px-3 text-xs font-semibold text-pink-700">
                    {course.level}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">{course.rating} ({course.students})</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{course.duration}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="bg-indigo-50 text-indigo-700 text-xs py-1 px-2 rounded">
                        {feature}
                      </span>
                    ))}
                    {course.features.length > 2 && (
                      <span className="bg-gray-50 text-gray-700 text-xs py-1 px-2 rounded">
                        +{course.features.length - 2}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-lg font-bold text-gray-900">{course.price}</span>
                    <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all">
                      Подробнее
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Курсы не найдены</h3>
            <p className="text-gray-500">Попробуйте изменить параметры фильтрации или поиска</p>
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img src={selectedCourse.image} alt={selectedCourse.title} className="w-full h-64 object-cover object-center" />
              <button 
                onClick={closeCourseDetails}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-indigo-500 text-white text-xs py-1 px-2 rounded">{selectedCourse.category}</span>
                  <span className="bg-pink-500 text-white text-xs py-1 px-2 rounded">{selectedCourse.level}</span>
                  <span className="bg-yellow-500 text-white text-xs py-1 px-2 rounded flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {selectedCourse.rating}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedCourse.title}</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap justify-between items-center mb-8">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Длительность</p>
                    <p className="font-semibold">{selectedCourse.duration}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Студентов</p>
                    <p className="font-semibold">{selectedCourse.students}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Рейтинг</p>
                    <p className="font-semibold">{selectedCourse.rating}/5</p>
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-bold text-gray-900">{selectedCourse.price}</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Описание курса</h3>
                <p className="text-gray-700">{selectedCourse.description}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Что вы изучите</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCourse.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button className="py-3 px-6 bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex-1 flex items-center justify-center">
                  Записаться на курс
                </button>
                <button className="py-3 px-6 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  Демо-урок
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
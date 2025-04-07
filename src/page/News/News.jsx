import React, { useState, useEffect } from 'react';

// Пример данных новостей - замените на данные из вашего API
const newsData = [
  {
    id: 1,
    title: "Открытие нового учебного центра в центре Душанбе",
    category: "Событие",
    date: "2025-04-01",
    image: "https://via.placeholder.com/800x500",
    summary: "Мы рады объявить об открытии нашего нового современного учебного центра в центре Душанбе, оснащенного передовыми технологиями и комфортными аудиториями.",
    content: `
      <p>1 апреля 2025 года состоялось торжественное открытие нового учебного центра нашей компании в самом центре Душанбе. Этот проект стал результатом многомесячной работы и инвестиций в будущее образования Таджикистана.</p>
      
      <p>Новый центр оснащен:</p>
      <ul>
        <li>10 просторными аудиториями с современным оборудованием</li>
        <li>Компьютерным классом с 30 рабочими станциями</li>
        <li>Конференц-залом на 100 человек</li>
        <li>Зоной отдыха и кафе для студентов</li>
      </ul>
      
      <p>"Мы стремимся создать идеальную среду для обучения, где студенты смогут получить не только знания, но и практические навыки в комфортной обстановке," - отметил директор компании на церемонии открытия.</p>
      
      <p>Первые занятия в новом центре начнутся уже 10 апреля. Все зарегистрированные студенты получат специальные пригласительные на торжественное мероприятие.</p>
    `,
    author: "Администрация",
    tags: ["открытие", "учебный центр", "Душанбе", "образование"]
  },
  {
    id: 2,
    title: "Запуск новой программы по искусственному интеллекту",
    category: "Образование",
    date: "2025-03-22",
    image: "https://via.placeholder.com/800x500",
    summary: "Мы запускаем новую программу обучения по искусственному интеллекту и машинному обучению с ведущими специалистами отрасли.",
    content: `
      <p>В ответ на растущий спрос на специалистов в области искусственного интеллекта, мы рады объявить о запуске нашего нового курса "Основы искусственного интеллекта и машинного обучения".</p>
      
      <p>Программа курса разработана совместно с ведущими IT-компаниями и включает:</p>
      <ul>
        <li>Основы программирования на Python для анализа данных</li>
        <li>Математические основы машинного обучения</li>
        <li>Практические проекты на реальных данных</li>
        <li>Стажировку в IT-компаниях Таджикистана</li>
      </ul>
      
      <p>Курс будет вести Рахмон Алиев, эксперт по искусственному интеллекту с 10-летним опытом работы в международных компаниях.</p>
      
      <p>Первый набор студентов начнется 1 мая 2025 года. Количество мест ограничено, поэтому рекомендуем регистрироваться заранее.</p>
    `,
    author: "Отдел образовательных программ",
    tags: ["курсы", "искусственный интеллект", "машинное обучение", "Python"]
  },
  {
    id: 3,
    title: "Наши студенты заняли призовые места на международной олимпиаде",
    category: "Достижения",
    date: "2025-03-15",
    image: "https://via.placeholder.com/800x500",
    summary: "Студенты нашего центра завоевали золотую и две серебряные медали на Международной олимпиаде по программированию в Алматы.",
    content: `
      <p>С гордостью сообщаем, что команда наших студентов вернулась с триумфом с Международной олимпиады по программированию, проходившей в Алматы с 10 по 14 марта 2025 года.</p>
      
      <p>Результаты наших студентов:</p>
      <ul>
        <li>Анвар Каримов - золотая медаль в категории "Алгоритмическое программирование"</li>
        <li>Саида Назарова - серебряная медаль в категории "Веб-разработка"</li>
        <li>Фирдавс Рахимов - серебряная медаль в категории "Мобильная разработка"</li>
      </ul>
      
      <p>В олимпиаде приняли участие более 200 студентов из 15 стран Центральной Азии и Восточной Европы. Конкуренция была очень высокой, что делает достижения наших студентов еще более значимыми.</p>
      
      <p>"Это результат упорного труда наших студентов и преподавателей. Мы создаем среду, где талант может развиваться и достигать международного уровня," - прокомментировал руководитель направления программирования.</p>
      
      <p>Торжественное награждение победителей состоится в нашем центре 20 марта в 16:00. Приглашаем всех студентов и сотрудников присоединиться к празднованию!</p>
    `,
    author: "Пресс-служба",
    tags: ["олимпиада", "программирование", "победа", "международный конкурс"]
  },
  {
    id: 4,
    title: "Партнерство с ведущими IT-компаниями для трудоустройства выпускников",
    category: "Партнерство",
    date: "2025-03-05",
    image: "https://via.placeholder.com/800x500",
    summary: "Мы подписали соглашения с пятью ведущими IT-компаниями Таджикистана для обеспечения трудоустройства наших выпускников.",
    content: `
      <p>Мы рады объявить о заключении стратегических партнерских соглашений с пятью ведущими IT-компаниями Таджикистана: TajSoft, Digital Dushanbe, FrontLine Systems, InnoTech и CyberSolutions.</p>
      
      <p>В рамках этого партнерства:</p>
      <ul>
        <li>Наши студенты будут проходить производственную практику в этих компаниях</li>
        <li>Эксперты из компаний будут вести мастер-классы и практические занятия</li>
        <li>Лучшие выпускники получат гарантированные предложения о работе</li>
        <li>Компании будут участвовать в разработке учебных программ</li>
      </ul>
      
      <p>"Это партнерство закрывает разрыв между образованием и реальным сектором. Наши студенты будут не только получать теоретические знания, но и осваивать актуальные технологии, которые используются в индустрии," - отметил директор по партнерским отношениям.</p>
      
      <p>Первая ярмарка вакансий с участием компаний-партнеров пройдет 15 апреля 2025 года в нашем центре. Все студенты смогут представить свои портфолио и пройти предварительные собеседования.</p>
    `,
    author: "Отдел по работе с партнерами",
    tags: ["партнерство", "трудоустройство", "IT-компании", "карьера"]
  },
  {
    id: 5,
    title: "Начало регистрации на летние интенсивные курсы 2025",
    category: "Образование",
    date: "2025-02-28",
    image: "https://via.placeholder.com/800x500",
    summary: "Открыта регистрация на наши популярные летние интенсивные курсы по программированию, дизайну и маркетингу для студентов всех возрастов.",
    content: `
      <p>Мы открываем регистрацию на летние интенсивные курсы 2025 года! Этим летом мы предлагаем разнообразные программы для учащихся всех возрастов и уровней подготовки.</p>
      
      <p>Доступные курсы:</p>
      <ul>
        <li>Web-разработка с нуля (HTML, CSS, JavaScript) - 4 недели</li>
        <li>Разработка мобильных приложений для Android - 6 недель</li>
        <li>Графический дизайн и UI/UX - 5 недель</li>
        <li>Цифровой маркетинг и SMM - 3 недели</li>
        <li>Основы программирования для школьников (12-16 лет) - 4 недели</li>
      </ul>
      
      <p>Все курсы проводятся в формате интенсивов с практическими заданиями и реальными проектами. По окончании курсов студенты получают сертификаты и готовые проекты для своего портфолио.</p>
      
      <p>Раннее бронирование до 30 апреля со скидкой 15%!</p>
      
      <p>Для регистрации заполните форму на нашем сайте или посетите наш офис.</p>
    `,
    author: "Приемная комиссия",
    tags: ["летние курсы", "интенсив", "обучение", "регистрация"]
  },
  {
    id: 6,
    title: "Бесплатный семинар по кибербезопасности для всех желающих",
    category: "Событие",
    date: "2025-02-20",
    image: "https://via.placeholder.com/800x500",
    summary: "Приглашаем всех на бесплатный семинар по основам кибербезопасности и защите персональных данных в современном мире.",
    content: `
      <p>25 февраля 2025 года в 18:00 мы проводим открытый бесплатный семинар "Кибербезопасность для всех: как защитить себя в цифровом мире".</p>
      
      <p>На семинаре будут рассмотрены следующие темы:</p>
      <ul>
        <li>Основные угрозы в сети Интернет</li>
        <li>Как создавать и хранить надежные пароли</li>
        <li>Защита от фишинга и социальной инженерии</li>
        <li>Безопасное использование социальных сетей</li>
        <li>Защита персональных данных на мобильных устройствах</li>
      </ul>
      
      <p>Семинар проведет Фарход Джалилов, сертифицированный специалист по информационной безопасности с опытом работы в банковском секторе.</p>
      
      <p>Семинар открыт для всех желающих, независимо от возраста и уровня технических знаний. Количество мест ограничено, поэтому необходима предварительная регистрация.</p>
      
      <p>Зарегистрироваться можно по телефону или через форму на нашем сайте.</p>
    `,
    author: "Отдел мероприятий",
    tags: ["семинар", "кибербезопасность", "бесплатно", "обучение"]
  }
];

// Главный компонент страницы новостей
const News = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedNews, setSelectedNews] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 3;

  // Имитация загрузки данных с сервера
  useEffect(() => {
    // В реальном проекте здесь будет API запрос
    setNews(newsData);
    
    // Извлекаем уникальные категории
    const uniqueCategories = ["Все", ...new Set(newsData.map(item => item.category))];
    setCategories(uniqueCategories);
  }, []);

  // Фильтрация новостей по категории и поиску
  const filteredNews = news.filter(item => {
    const matchesCategory = selectedCategory === "Все" || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Пагинация
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  // Функция для форматирования даты
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  // Открытие полной новости
  const openNewsDetail = (news) => {
    setSelectedNews(news);
    window.scrollTo(0, 0);
  };

  // Закрытие детальной новости
  const closeNewsDetail = () => {
    setSelectedNews(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedNews ? (
        // Детальный просмотр новости
        <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button 
              onClick={closeNewsDetail}
              className="flex items-center text-indigo-600 font-medium hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Вернуться к списку новостей
            </button>
          </div>
          
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
              <img 
                src={selectedNews.image} 
                alt={selectedNews.title} 
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {selectedNews.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 text-sm">{formatDate(selectedNews.date)}</span>
                <div className="text-gray-500 text-sm">Автор: {selectedNews.author}</div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {selectedNews.title}
              </h1>
              
              <div 
                className="prose prose-indigo max-w-none" 
                dangerouslySetInnerHTML={{ __html: selectedNews.content }} 
              />
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {selectedNews.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Поделиться новостью:</h3>
                <div className="flex space-x-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="text-blue-400 hover:text-blue-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                  <button className="text-green-500 hover:text-green-700">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="text-blue-700 hover:text-blue-900">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      ) : (
        // Список новостей
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Заголовок секции */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Новости и <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">события</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Будьте в курсе последних новостей, мероприятий и достижений нашей компании
            </p>
          </div>
          
          {/* Фильтры и поиск */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
              {/* Фильтры по категориям */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Поиск */}
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Поиск новостей..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full md:w-72 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Отображение выбранных фильтров */}
          {(selectedCategory !== "Все" || searchTerm) && (
            <div className="mb-8 flex items-center">
              <span className="text-gray-600 mr-2">Фильтры:</span>
              <div className="flex flex-wrap gap-2">
                {selectedCategory !== "Все" && (
                  <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("Все")}
                      className="ml-2 text-indigo-500 hover:text-indigo-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
                
                {searchTerm && (
                  <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
                    Поиск: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm("")}
                      className="ml-2 text-indigo-500 hover:text-indigo-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Список новостей */}
          {currentNews.length > 0 ? (
            <div className="space-y-10">
              {currentNews.map(item => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img 
                        className="h-48 w-full object-cover md:h-full md:w-48" 
                        src={item.image} 
                        alt={item.title} 
                      />
                    </div>
                    <div className="p-6 md:p-8 w-full">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {item.category}
                        </span>
                        <span className="text-gray-500 text-sm">{formatDate(item.date)}</span>
                      </div>
                      
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h2>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {item.summary}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.slice(0, 3).map((tag, index) => (
                          <span 
                            key={index} 
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            +{item.tags.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          Автор: {item.author}
                        </div>
                        <button
                          onClick={() => openNewsDetail(item)}
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
                        >
                          Подробнее
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-700 mb-2">Новости не найдены</h3>
              <p className="text-gray-500">Попробуйте изменить параметры фильтрации или поиска</p>
            </div>
          )}
          
          {/* Пагинация */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-10">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Предыдущая
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium ${
                    currentPage === i + 1
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Следующая
              </button>
            </div>
          )}
          
          {/* Подписка на новости */}
          <div className="mt-20 bg-gradient-to-r from-indigo-600 to-pink-500 rounded-2xl p-8 md:p-10 text-white">
            <div className="md:flex justify-between items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold mb-2">Подпишитесь на наши новости</h3>
                <p className="text-indigo-100">
                  Получайте последние новости и специальные предложения прямо на вашу электронную почту
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Ваш email"
                    className="w-full md:w-64 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="bg-white text-indigo-600 font-medium px-4 py-3 rounded-r-lg hover:bg-indigo-50 transition-colors">
                    Подписаться
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetCourse, GetNews } from '../../Api/bannerApi';
import { useTranslation } from 'react-i18next';

const News = () => {
  const { t } = useTranslation();
  const [selectedNews, setSelectedNews] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 3;
  const dispatch = useDispatch();
  const { newss, course } = useSelector((state) => state.BannerSlicer);
   
  console.log("newss:", newss);
  
  useEffect(() => {
    // Гирифтани ахбор аз backend
    dispatch(GetNews());
  }, [dispatch, t]);

  // Гирифтани курсҳо вақте ки ягон ахбор интихоб мешавад
  useEffect(() => {
    if (selectedNews) {
      dispatch(GetCourse());
    }
  }, [selectedNews, dispatch]);

  // Филтр кардани ахбор аз рӯи ҷустуҷӯ
  const filteredNews = newss ? newss.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  }) : [];

  // Саҳифабандӣ
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  // Функсия барои формат кардани сана
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tg-TJ', options);
  };

  // Кушодани ахбори пурра
  const openNewsDetail = (news) => {
    setSelectedNews(news);
    window.scrollTo(0, 0);
  };

  // Пӯшидани ахбори муфассал
  const closeNewsDetail = () => {
    setSelectedNews(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedNews ? (
        // Намоиши муфассали ахбор
        <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button 
              onClick={closeNewsDetail}
              className="flex items-center text-indigo-600 font-medium hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              {t("news.backToList") || "Бозгашт ба рӯйхати ахбор"}
            </button>
          </div>
          
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
              <img 
                src={import.meta.env.VITE_APP_API_URL_IMAGE + selectedNews.mediaUrl} 
                alt={selectedNews.title} 
                className="w-full h-80 object-cover"
              />
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 text-sm">{formatDate(selectedNews.createdAt)}</span>
                <div className="text-gray-500 text-sm">{t("news.author") || "Муаллиф"}: {selectedNews.author}</div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {selectedNews.title}
              </h1>
              
              <div 
                className="prose prose-indigo max-w-none" 
                dangerouslySetInnerHTML={{ __html: selectedNews.content }} 
              />
              
              <div className="mt-8 pt-6 border-t border-gray-200">
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
              
              {/* Қисмати курсҳо дар поёни мақолаи ахбор */}
              {course && course.length > 0 && (
                <div className="mt-12 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold mb-4">{t("news.ourCourses") || "Курсҳои мо"}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.slice(0, 4).map(item => (
                      <div key={item.id} className="bg-indigo-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-indigo-700">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.description?.substring(0, 100)}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      ) : (
        // Рӯйхати ахбор
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Сарлавҳаи қисмат */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("news.newsTitle") || "Ахбор"} <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">{t("news.events") || "рӯйдодҳо"}</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("news.stayUpdated") || "Аз охирин ахбор, чорабиниҳо ва дастовардҳои ширкати мо бохабар бошед"}
            </p>
          </div>
          
          {/* Ҷустуҷӯ */}
          <div className="mb-10">
            <div className="flex justify-center items-center mb-6">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder={t("news.searchPlaceholder") || "Ҷустуҷӯи ахбор..."}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Намоиши филтрҳои интихобшуда */}
          {searchTerm && (
            <div className="mb-8 flex items-center justify-center">
              <span className="text-gray-600 mr-2">{t("news.filters") || "Филтрҳо"}:</span>
              <div className="flex flex-wrap gap-2">
                <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
                  {t("news.search") || "Ҷустуҷӯ"}: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-2 text-indigo-500 hover:text-indigo-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Рӯйхати ахбор */}
          {currentNews && currentNews.length > 0 ? (
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
                        src={import.meta.env.VITE_APP_API_URL_IMAGE + item.mediaUrl} 
                        alt={item.title} 
                      />
                    </div>
                    <div className="p-6 md:p-8 w-full">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-gray-500 text-sm">{formatDate(item.createdAt)}</span>
                      </div>
                      
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h2>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {item.summary}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          {t("news.author") || "Муаллиф"}: {item.author}
                        </div>
                        <button
                          onClick={() => openNewsDetail(item)}
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
                        >
                          {t("news.readMore") || "Бештар"}
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
              <h3 className="text-xl font-medium text-gray-700 mb-2">{t("news.noNewsFound") || "Ахбор ёфт нашуд"}</h3>
              <p className="text-gray-500">{t("news.changeFilters") || "Параметрҳои филтрро тағйир диҳед"}</p>
            </div>
          )}
          
          {/* Саҳифабандӣ */}
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
                {t("news.previous") || "Қаблӣ"}
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
                {t("news.next") || "Навбатӣ"}
              </button>
            </div>
          )}
          
          {/* Обуна барои ахбор */}
          <div className="mt-20 bg-gradient-to-r from-indigo-600 to-pink-500 rounded-2xl p-8 md:p-10 text-white">
            <div className="md:flex justify-between items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold mb-2">{t("news.subscribe") || "Ба ахбори мо обуна шавед"}</h3>
                <p className="text-indigo-100">
                  {t("news.subscribeDescription") || "Охирин ахбор ва пешниҳодҳои махсусро мустақиман тавассути почтаи электронии худ гиред"}
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <div className="flex">
                  <input
                    type="email"
                    placeholder={t("news.yourEmail") || "Почтаи электронии шумо"}
                    className="w-full md:w-64 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="bg-white text-indigo-600 font-medium px-4 py-3 rounded-r-lg hover:bg-indigo-50 transition-colors">
                    {t("news.subscribeButton") || "Обуна шудан"}
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
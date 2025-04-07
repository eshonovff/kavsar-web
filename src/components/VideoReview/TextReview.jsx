import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { GetTextReview } from '../../Api/bannerApi';

// Компонент рейтинга со звездами
const StarRating = ({ rating }) => {
  const ratingValue = rating || 0; // Защита от undefined или null
  
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg 
          key={index} 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 ${index < ratingValue ? 'text-yellow-400' : 'text-gray-300'}`}
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Компонент модального окна для добавления отзыва
const FeedbackModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    text: '',
    grade: 5
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      grade: rating
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки отзыва на бэкенд
    console.log('Отправка отзыва:', formData);
    // После успешной отправки
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all">
        <div className="bg-gradient-to-r from-blue-500 to-violet-500 p-5">
          <h3 className="text-xl font-bold text-white">
            {t('TextReview.modalTitle') || 'Оставить отзыв'}
          </h3>
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-white hover:text-gray-200 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              {t('TextReview.formNameLabel') || 'Ваше имя'}
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder={t('TextReview.formNamePlaceholder') || 'Введите ваше имя'}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {t('TextReview.formRatingLabel') || 'Ваша оценка'}
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-8 w-8 ${formData.grade >= star ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              {t('TextReview.formTextLabel') || 'Ваш отзыв'}
            </label>
            <textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              placeholder={t('TextReview.formTextPlaceholder') || 'Расскажите о вашем опыте...'}
              required
            ></textarea>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t('TextReview.formSubmitButton') || 'Отправить отзыв'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Компонент карточки отзыва
const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-100/50 rounded-full translate-x-1/4 translate-y-1/4 z-0"></div>
      
      <div className="relative z-10">
        <div className="flex items-start mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-800">{review.fullName || "Пользователь"}</h3>
            <StarRating rating={review.grade} />
          </div>
        </div>
        
        <div className="text-gray-600">
          <div className="text-blue-300 opacity-50 text-4xl leading-none mb-1">"</div>
          <p className="line-clamp-2">{review.text || "Отзыв"}</p>
        </div>
      </div>
    </div>
  );
};

const TextReview = () => {
  const dispatch = useDispatch();
  const { textReview } = useSelector((state) => state.BannerSlicer);
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainer = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    // Get current language from i18n
    const currentLang = i18n.language || 'Ru';
    // Map i18n language codes to API language codes if needed
    const apiLang = currentLang === 'en' ? 'En' : 
                    currentLang === 'tj' ? 'Tj' : 'Ru';
                    
    // Dispatch API call
    dispatch(GetTextReview({
      lang: apiLang
    }));
  }, [dispatch, i18n.language]);

  // Фильтруем только подтвержденные отзывы
  const approvedReviews = textReview ? textReview.filter(review => review.approved) : [];

  // Безопасное разделение отзывов на ряды, защита от отсутствия данных
  const firstRowReviews = approvedReviews?.length > 0 ? approvedReviews.slice(0, Math.min(3, approvedReviews.length)) : [];
  const secondRowReviews = approvedReviews?.length > 3 ? approvedReviews.slice(3, Math.min(6, approvedReviews.length)) : [];
  const remainingReviews = approvedReviews?.length > 6 ? approvedReviews.slice(6) : [];
  
  // Функция для проверки наличия переполнения
  const checkOverflow = () => {
    const container = scrollContainer.current;
    if (container) {
      const hasHorizontalOverflow = container.scrollWidth > container.clientWidth;
      setHasOverflow(hasHorizontalOverflow);
    }
  };
  
  // Отслеживание положения скролла
  const handleScroll = () => {
    const container = scrollContainer.current;
    if (container) {
      setScrollPosition(container.scrollLeft);
    }
  };
  
  // Функции для прокрутки
  const scrollLeft = () => {
    const container = scrollContainer.current;
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    const container = scrollContainer.current;
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  // Инициализация и обработка изменения размера окна
  useEffect(() => {
    const container = scrollContainer.current;
    
    checkOverflow();
    
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    
    window.addEventListener('resize', checkOverflow);
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', checkOverflow);
    };
  }, [approvedReviews]);

  // Определение, показывать ли кнопки прокрутки
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollContainer.current 
    ? scrollPosition < scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth
    : false;

  return (
    <div className="bg-gradient-to-b from-indigo-50 via-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase mb-2 inline-block">
            {t('TextReview.subtitle') || 'Что о нас говорят'}
          </span>
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-700 inline-block mb-4">
            {t('TextReview.title') || 'Отзывы наших учеников'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {t('TextReview.description') || 'Узнайте, что говорят наши выпускники о своем опыте обучения в нашей академии'}
          </p>
        </div>

        {/* Сетка отзывов */}
        <div className="relative">
          {/* Первый ряд отзывов (до 3) */}
          {firstRowReviews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {firstRowReviews.map(review => (
                <ReviewCard key={review.id || Math.random()} review={review} />
              ))}
            </div>
          )}
          
          {/* Второй ряд отзывов (с 4 по 6) */}
          {secondRowReviews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {secondRowReviews.map(review => (
                <ReviewCard key={review.id || Math.random()} review={review} />
              ))}
            </div>
          )}
          
          {/* Оставшиеся отзывы с горизонтальной прокруткой */}
          {remainingReviews.length > 0 && (
            <div className="relative">
              <div 
                ref={scrollContainer}
                className="overflow-x-auto hide-scrollbar py-2"
                style={{ 
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                <div className="flex space-x-4">
                  {remainingReviews.map(review => (
                    <div key={review.id || Math.random()} className="w-72 flex-shrink-0">
                      <ReviewCard review={review} />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Кнопки прокрутки */}
              {hasOverflow && (
                <>
                  <button 
                    onClick={scrollLeft}
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-lg p-2 ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer hover:bg-gray-100'}`}
                    disabled={!canScrollLeft}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={scrollRight}
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-lg p-2 ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer hover:bg-gray-100'}`}
                    disabled={!canScrollRight}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Leave Review Button */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group relative overflow-hidden rounded-full bg-white px-8 py-4 shadow-lg transition-all duration-300 hover:shadow-blue-500/20 hover:shadow-xl flex items-center space-x-3"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            <span className="relative inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="font-medium text-gray-800 group-hover:text-white transition-colors">
                {t('TextReview.leaveReviewButton') || 'Оставить свой отзыв'}
              </span>
            </span>
          </button>
        </div>
      </div>
      
      {/* Modal for adding reviews */}
      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default TextReview;
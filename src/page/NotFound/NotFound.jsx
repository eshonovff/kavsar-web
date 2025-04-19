import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './NotFound.css'; // Файл со стилями для анимации

const NotFound = () => {
  const { t } = useTranslation();
  
  // Эффект для анимации при загрузке страницы
  useEffect(() => {
    // Запускаем анимацию чисел
    const interval = setInterval(() => {
      const numbers = document.querySelectorAll('.animated-number');
      numbers.forEach(number => {
        const currentNumber = parseInt(number.textContent);
        const newNumber = Math.floor(Math.random() * 10);
        if (number.textContent !== '4') {
          number.textContent = newNumber;
        }
      });
    }, 200);
    
    // Останавливаем интервал после нескольких итераций
    setTimeout(() => {
      clearInterval(interval);
      const numbers = document.querySelectorAll('.animated-number');
      numbers[0].textContent = '4';
      numbers[1].textContent = '0';
      numbers[2].textContent = '4';
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-200 p-4">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>
      
      {/* Анимированные числа 404 */}
      <div className="animated-404-container flex mb-8 md:mb-12">
        <div className="animated-number-wrapper">
          <div className="animated-number-bg">
            <span className="animated-number">4</span>
          </div>
          <div className="gear gear-large"></div>
        </div>
        <div className="animated-number-wrapper">
          <div className="animated-number-bg">
            <span className="animated-number">0</span>
          </div>
          <div className="planet-ring"></div>
        </div>
        <div className="animated-number-wrapper">
          <div className="animated-number-bg">
            <span className="animated-number">4</span>
          </div>
          <div className="gear gear-small"></div>
        </div>
      </div>
      
      {/* Сообщение и кнопка */}
      <div className="text-center max-w-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {t('notFound.title') || 'Страница не найдена'}
        </h1>
        <p className="text-gray-600 mb-8 text-md md:text-lg">
          {t('notFound.message') || 'Извините, страница, которую вы ищете, не существует или была перемещена.'}
        </p>
        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            {t('notFound.backToHome') || 'Вернуться на главную'}
          </Link>
        </div>
      </div>
      
      {/* Анимированная фигура */}
      <div className="astronaut-container mt-12 md:mt-16">
        <div className="astronaut">
          <div className="astronaut-helmet"></div>
          <div className="astronaut-body"></div>
          <div className="astronaut-pack"></div>
          <div className="astronaut-arm-left"></div>
          <div className="astronaut-arm-right"></div>
          <div className="astronaut-leg-left"></div>
          <div className="astronaut-leg-right"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
import React, { useEffect, useState } from 'react';
import { Users, Award, Briefcase, Star, Code, Mail, Globe, Linkedin } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { GetGalerry } from '../../Api/bannerApi';
import TeamSection from '../../components/TeamSection/TeamSection';


// Упрощенная карточка с 3D-эффектом
const Card3D = ({ children, className }) => {
  return (
    <div
      className={`relative transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 ${className}`}
    >
      {children}
    </div>
  );
};

// Главный компонент страницы "О нас"
const About = () => {
  const dispatch = useDispatch();
  const { galerry, loading, colleague } = useSelector((state) => state.BannerSlicer);
  const [videoUrl, setVideoUrl] = useState('');

  console.log(colleague);
  
  
  useEffect(() => {
    // Загружаем галерею
    dispatch(GetGalerry());
  }, [dispatch]);
  
  // Когда галерея загружена, устанавливаем URL видео
  useEffect(() => {
    if (galerry && galerry.length > 0) {
      // Устанавливаем URL для видео - первый элемент из галереи
      setVideoUrl(`${import.meta.env.VITE_APP_API_URL_IMAGE}${galerry[0].mediaUrl}`);
      console.log("Видео URL установлен:", `${import.meta.env.VITE_APP_API_URL_IMAGE}${galerry[0].mediaUrl}`);
    }
  }, [galerry]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-gray-800">
      {/* Элементы фона */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>
      
      {/* Раздел заголовка */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 max-w-6xl relative">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            О нашей академии
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mb-8"></div>
          <p className="text-lg md:text-xl text-gray-700  mb-12">
  Мы создаём не просто курсы — мы формируем сообщество, где каждый может расти, развиваться и реализовывать свои мечты. 
  Кавсар Академия — это территория возможностей, где обучение превращается в вдохновляющее путешествие. <br /><br />

  Мы предлагаем курсы для всех возрастов и интересов: <strong>IT и программирование, медицинская подготовка, кулинария, иностранные языки, дошкольное развитие, автошкола, шитьё</strong> и многое другое. 
  Здесь каждый находит то, что приближает его к цели. <br /><br />

  Наши преподаватели — это не просто специалисты, а настоящие наставники, которые с душой делятся знаниями и поддерживают на каждом шаге. 
  Современные методики, практика с первого дня и индивидуальный подход делают обучение у нас результативным и вдохновляющим. <br /><br />

  📚 Учитесь с комфортом, 🌍 развивайтесь без границ и ✨ стройте своё будущее вместе с нами!  
  <strong>Кавсар Академия — там, где начинается твой успех.</strong>
</p>

        </div>
      </section>
      
      {/* Раздел с видео */}
{/* Раздел с видео - автовоспроизведение без лишних элементов */}
<section className="py-16 relative">
  <div className="container mx-auto px-4 max-w-6xl">
    <div className="rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative">
        {loading ? (
          // Показываем индикатор загрузки
          <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : videoUrl ? (
          // Видео с автовоспроизведением
          <video 
            className="w-full aspect-video object-cover" 
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={videoUrl} type="video/mp4" />
            Ваш браузер не поддерживает видео
          </video>
        ) : (
          // Если видео не найдено
          <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
            <p className="text-white">Видео не найдено</p>
          </div>
        )}
      </div>
    </div>
  </div>
</section>




      
      {/* Раздел достижений */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              Наши достижения
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mb-6 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users className="w-10 h-10" />, number: "500+", text: "Выпускников" },
              { icon: <Award className="w-10 h-10" />, number: "20+", text: "Образовательных программ" },
              { icon: <Award className="w-10 h-10" />, number: "95%", text: "Рекомендуют нас" },
              { icon: <Award className="w-10 h-10" />, number: "3+", text: "Лет опыта" }
            ].map((achievement, index) => (
              <Card3D key={index} className="bg-white/80 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600 mb-4">
                  {achievement.icon}
                </div>
                <h3 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                  {achievement.number}
                </h3>
                <p className="text-gray-700">{achievement.text}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </section>
      





          {/* Раздел команда  */}


     
          <TeamSection />





    </div>
  );
};

export default About;

















// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// const About = () => {
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     // Имитация загрузки данных
//     const timer = setTimeout(() => {
//       setIsLoading(false)
//     }, 2000)
    
//     return () => clearTimeout(timer)
//   }, [])

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       {isLoading ? (
//         <div className="text-center">
//           <div className="flex justify-center">
//             <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//           <p className="mt-4 text-xl font-medium text-gray-700">Дар рафти коркард қарор дорад...</p>
//         </div>
//       ) : (
//         <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8 transform transition-all duration-500 ease-in-out animate-fadeIn">
//           <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-bounce">Дар бораи мо</h1>
//           <div className="space-y-4">
//             <p className="text-lg text-gray-600 animate-pulse">
//               Саҳифа дар рафти коркард қарор дорад. Ба зудӣ маълумоти муфассал дар ин ҷо ҷойгир карда мешавад.
//             </p>
//             <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
//             <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
//             <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
//           </div>
//           <div className="mt-8 flex justify-center">
//             <Link to={"/"} >
//             <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105">
//               Баргаштан ба саҳифаи асосӣ
//             </button>
//             </Link>
//           </div>
//         </div>
//       )}
      
//       {/* CSS для создания пользовательской анимации fadeIn */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           0% { opacity: 0; transform: translateY(20px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 1s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default About
import React, { useEffect, useState } from 'react';
import { Users, Award, Briefcase, Star, Code, Mail, Globe, Linkedin } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { GetGalerry } from '../../Api/bannerApi';

// Пути к изображениям
const MEDIA_PATHS = {
  directorImages: [
    '/images/team/director1.jpg',
    '/images/team/director2.jpg',
  ],
  teamImages: [
    '/images/team/teacher1.jpg',
    '/images/team/teacher2.jpg',
    '/images/team/teacher3.jpg',
    '/images/team/teacher4.jpg',
  ],
};

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
  const { galerry, loading } = useSelector((state) => state.BannerSlicer);
  const [videoUrl, setVideoUrl] = useState('');
  
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
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mb-12">
            Мы создаем образовательное пространство, где каждый студент может раскрыть свой потенциал и достичь невероятных высот. 
            Наша миссия — предоставить качественное образование, которое сочетает в себе теоретические знания и практические навыки.
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
              { icon: <Users className="w-10 h-10" />, number: "5000+", text: "Выпускников" },
              { icon: <Award className="w-10 h-10" />, number: "50+", text: "Образовательных программ" },
              { icon: <Award className="w-10 h-10" />, number: "95%", text: "Рекомендуют нас" },
              { icon: <Award className="w-10 h-10" />, number: "10", text: "Лет опыта" }
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
      
      {/* Раздел команды */}
     {/* Раздел команды - улучшенный */}
<section className="py-20 relative">
  <div className="container mx-auto px-4 max-w-6xl">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
        Дастаи мо
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mb-6 mx-auto"></div>
    </div>
    
    {/* Директора */}
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-indigo-600" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800">Руководство</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[
          {
            name: "Сулаймонов Нурулло",
            position: "Мудирис ва роҳбари Softclub",
            description: "Мо ҳудро ба ҳар як барномасози хоҳишманд ва ва ҳар одаме, ки то адои натиҷа омода аст, мебахшем",
            image: MEDIA_PATHS.directorImages[0]
          },
          {
            name: "Кабиров Зоирҷон",
            position: "Ҳимматгузори Softclub BIO",
            description: "Моҳои қудрати технологияи боварӣ дорем ва кушиш мекунем, ки бозори суруҷо ва вокеият мезофазӣ дар-небошад.",
            image: MEDIA_PATHS.directorImages[1]
          }
        ].map((director, index) => (
          <div key={index} className="group relative">
            <div className="relative z-10 rounded-2xl bg-white/90 backdrop-blur-md p-6 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-indigo-600/10 blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-pink-600/10 blur-xl"></div>
              
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="md:w-2/5 mb-6 md:mb-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-sm opacity-70 transform scale-105"></div>
                    <div className="w-32 h-32 rounded-full overflow-hidden relative z-10 border-4 border-white">
                      <img 
                        src={director.image} 
                        alt={director.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="absolute -right-2 bottom-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full p-2 z-20 shadow-lg">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                <div className="md:w-3/5 md:pl-6 text-center md:text-left">
                  <h4 className="text-2xl font-bold mb-2 text-gray-900">{director.name}</h4>
                  <p className="text-indigo-600 font-medium mb-4">{director.position}</p>
                  <p className="text-gray-700 mb-5">{director.description}</p>
                  <div className="flex justify-center md:justify-start space-x-3">
                    <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                      <Globe className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Преподаватели */}
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <Users className="w-5 h-5 text-indigo-600" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800">Муаллимони мо</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            name: "Салимзода Абдурахим", 
            position: "UX/UI дизайнер", 
            image: MEDIA_PATHS.teamImages[0],
            skills: ["UI/UX", "Figma", "Adobe XD"],
            techIcons: ["/images/icons/figma.svg", "/images/icons/adobe-xd.svg"]
          },
          { 
            name: "Манонзода Аличон", 
            position: "Инженер .NET", 
            image: MEDIA_PATHS.teamImages[1],
            skills: [".NET", "C#", "Azure"],
            techIcons: ["/images/icons/dotnet.svg", "/images/icons/csharp.svg"]
          },
          { 
            name: "Начибуллох Шамсудинов", 
            position: "Front-end разработчик", 
            image: MEDIA_PATHS.teamImages[2],
            skills: ["JavaScript", "React", "TypeScript"],
            techIcons: ["/images/icons/javascript.svg", "/images/icons/react.svg"]
          },
          { 
            name: "Бахтовар Рахмонов", 
            position: "Python разработчик", 
            image: MEDIA_PATHS.teamImages[3],
            skills: ["Python", "Django", "FastAPI"],
            techIcons: ["/images/icons/python.svg", "/images/icons/django.svg"]
          }
        ].map((member, index) => (
          <div key={index} className="group relative">
            <div className="relative z-10 rounded-2xl bg-white/90 backdrop-blur-md p-6 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-indigo-600/10 blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-pink-600/10 blur-xl"></div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-5 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-sm opacity-70 transform scale-105"></div>
                  <div className="w-28 h-28 rounded-full overflow-hidden relative z-10 border-4 border-white">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                
                <h4 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h4>
                <p className="text-indigo-600 font-medium mb-4">{member.position}</p>
                
                {member.skills && (
                  <div className="flex flex-wrap justify-center gap-2 mb-5">
                    {member.skills.map((skill, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    <Code className="w-4 h-4" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
            
            {member.techIcons && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center gap-1">
                {member.techIcons.map((icon, idx) => (
                  <div key={idx} className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                    <img src={icon} alt="tech" className="w-5 h-5" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default About;
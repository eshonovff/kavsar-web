import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GetChooseUs } from "../../Api/bannerApi";
import { useScroll } from "../../hook/ScrollProvider";
import YoutubeStyleLoader from "../loading/YoutubeStyleLoader";

// Компоненти индикатори загрузка дар услуби YouTube


const ChooseUs = () => {
  const dispatch = useDispatch();
  const { choose, loading } = useSelector((state) => state.BannerSlicer);
  const { t, i18n:{language} } = useTranslation();
  const { requestRef, scrollToSection } = useScroll();
  
  useEffect(() => {
    dispatch(GetChooseUs(language));
  }, [dispatch, language]);

  // Отображение индикатора загрузки
  if (loading?.chooseUs) {
    return <YoutubeStyleLoader />;
  }

  // Custom layout for exactly 4 or 5 items
  const itemCount = choose?.length || 0;
  const needsSpecialLayout = itemCount === 4 || itemCount === 5;

  return (
    <div className="max-w-[1500px] w-full m-auto py-16 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-5 -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full opacity-5 -ml-40 -mb-40"></div>
      
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-center mb-4">
          {t("chooseUs.title")}
        </h1>
        
        {needsSpecialLayout ? (
       
          <div className="flex flex-col gap-8">
            {/* Top row with always 3 items */}
     
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {choose.slice(0, 3)?.map((item, index) => (
    <ModernCard3D 
      key={item.id} 
      item={item} 
      index={index} 
      scrollToSection={scrollToSection}
      requestRef={requestRef}
    />
  ))}
</div>
            
            {/* Bottom row with remaining items (1 or 2), centered */}
            <div className="flex justify-center gap-8">
              {itemCount === 4 ? (
                // If 4 items total, show 1 centered in bottom row
                <div className="w-full max-w-md md:max-w-none md:w-1/3">
                  <ModernCard3D item={choose[3]} index={3} />
                </div>
              ) : (
                // If 5 items total, show 2 in bottom row
                <>
                  <div className="w-full max-w-md md:max-w-none md:w-1/3">
                    <ModernCard3D item={choose[3]} index={3} />
                  </div>
                  <div className="w-full max-w-md md:max-w-none md:w-1/3">
                    <ModernCard3D item={choose[4]} index={4} />
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          // Default grid layout for other numbers of items
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {choose?.map((item, index) => (
              <ModernCard3D key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Modern 3D Interactive Card Component
const ModernCard3D = ({ item, index, scrollToSection, requestRef }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Colors for the glowing effect background
  const colors = [
    "from-blue-500/20 to-purple-500/20",
    "from-green-500/20 to-teal-500/20",
    "from-orange-500/20 to-red-500/20",
  ];
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate cursor position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const posX = e.clientX - centerX;
    const posY = e.clientY - centerY;
    
    // Calculate rotation (max 10 degrees)
    const rotateY = (posX / (rect.width / 2)) * 10;
    const rotateX = (-posY / (rect.height / 2)) * 10;
    
    // Calculate movement for the floating icon (max 10px)
    const moveX = (posX / (rect.width / 2)) * 10;
    const moveY = (posY / (rect.height / 2)) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
    setPosition({ x: moveX, y: moveY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setPosition({ x: 0, y: 0 });
  };

  const colorClass = colors[index % colors.length];

  return (
    <div
      ref={cardRef}
      className="group relative h-52 rounded-xl shadow-2xl overflow-hidden cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: isHovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
      }}
    >
      {/* Card background with gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      {/* Glass effect card */}
      <div className="absolute inset-0.5 backdrop-blur-sm rounded-lg shadow-xl p-6 flex flex-col">
        {/* Floating icon */}
        <div 
          className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4 shadow-lg"
          style={{
            transform: `translateX(${position.x}px) translateY(${position.y}px)`,
            transition: isHovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
          }}
        >
          <img 
            src={import.meta.env.VITE_APP_API_URL_IMAGE + item.iconPath} 
            alt={item.title} 
            className="w-8 h-8 object-contain"
          />
        </div>
        
        <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {item.title}
        </h2>
        
        <p className="text-gray-950 dark:text-gray-950 text-sm flex-grow">
          {item.description}
        </p>
        
        {/* Animated arrow */}
        <div className="flex justify-end mt-2">
      <div 
        onClick={() => scrollToSection && scrollToSection(requestRef)}
        className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center overflow-hidden group-hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -ml-8 -mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );  
};

export default ChooseUs;
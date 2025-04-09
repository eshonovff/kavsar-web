import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Address = () => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mapRef = useRef(null);

  // Checking if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Effect for map marker
  useEffect(() => {
    const setupOverlay = () => {
      const mapContainer = mapRef.current;
      if (!mapContainer) return;

      // Remove existing overlay if it exists
      const existingOverlay = mapContainer.querySelector('.map-fixed-overlay');
      if (existingOverlay) {
        existingOverlay.remove();
      }

      // Create new overlay for marker
      const overlay = document.createElement('div');
      overlay.className = 'map-fixed-overlay';
      overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 100;
      `;
      
      // Add overlay to map container
      mapContainer.appendChild(overlay);
    };

    setupOverlay();
    
    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        const overlay = mapRef.current.querySelector('.map-fixed-overlay');
        if (overlay) {
          overlay.remove();
        }
      }
    };
  }, []);

  // Phone call function
  const handleCallClick = () => {
    window.location.href = 'tel:+992205122525';
  };

  // Open route function
  const handleRouteClick = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=38.548866,68.760221`, '_blank');
  };

  return (
    <div className="py-20 px-4 bg-gray-50 bg-gradient-to-br from-indigo-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
            {t('address.title')}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t('address.description')}
          </p>
        </div>
        
        {/* Map and Contact Card Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 rounded-3xl overflow-hidden shadow-xl">
          {/* Map Container - Interactive map with fixed marker */}
          <div 
            ref={mapRef}
            className="h-[500px] md:h-auto relative rounded-xl overflow-hidden transition-all duration-500 shadow-lg border-4 border-white"
            style={{
              boxShadow: isHovered ? '0 25px 50px -12px rgba(236, 72, 153, 0.4)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Interactive map (can be moved) */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps?q=38.548866,68.760221&z=17&output=embed" 
                width="100%" 
                height="100%" 
                className="border-0" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="absolute bottom-4 right-4 z-10 bg-white p-2 rounded-lg shadow-md pointer-events-none">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
              </div>
            </div>
          </div>
          
          {/* Contact Info Card */}
          <div className="bg-white p-8 md:p-10 rounded-xl flex flex-col justify-between shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 relative">
              <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                {t('address.contact')}
              </span>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-pink-500 mt-2 rounded-full"></div>
            </h3>
            
            {/* Contact Items */}
            <div className="flex flex-col space-y-6 mb-8">
              {/* Phone - clickable on entire area */}
              <a 
                href="tel:+992205122525" 
                className="flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 hover:bg-indigo-50"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center rounded-lg flex-shrink-0 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.44,13c-.22,0-.45-.07-.67-.12a9.44,9.44,0,0,1-1.31-.39,2,2,0,0,0-2.48,1l-.22.45a12.18,12.18,0,0,1-2.66-2,12.18,12.18,0,0,1-2-2.66L10.52,9a2,2,0,0,0,1-2.48,10.33,10.33,0,0,1-.39-1.31c-.05-.22-.09-.45-.12-.68a3,3,0,0,0-3-2.49h-3a3,3,0,0,0-3,3.41A19,19,0,0,0,18.53,21.91l.38,0a3,3,0,0,0,2-.76,3,3,0,0,0,1-2.25v-3A3,3,0,0,0,19.44,13Z"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">{t('address.telephone')}</span>
                  <span className="text-gray-800 font-medium hover:text-indigo-600 transition-colors">
                    +992 205 12 25 25 <br />
                    +992 985 78 84 44
                  </span>
                </div>
              </a>
              
              {/* Address */}
              <div className="flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 hover:bg-indigo-50">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 text-white flex items-center justify-center rounded-lg flex-shrink-0 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2a8,8,0,0,0-8,8c0,5.4,7.05,11.5,7.35,11.76a1,1,0,0,0,1.3,0C13,21.5,20,15.4,20,10A8,8,0,0,0,12,2Zm0,11a3,3,0,1,1,3-3A3,3,0,0,1,12,13Z"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">{t('address.adres')}</span>
                  <span className="text-gray-800 font-medium">
                    {t('address.place')}
                  </span>
                </div>
              </div>
              
              {/* Email */}
              <a 
                href="mailto:info@kavsar.tj" 
                className="flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 hover:bg-indigo-50"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-500 text-white flex items-center justify-center rounded-lg flex-shrink-0 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,4H5A3,3,0,0,0,2,7V17a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm-.67,2L12,10.75,5.67,6ZM19,18H5a1,1,0,0,1-1-1V7.25l7.4,5.55a1,1,0,0,0,.6.2,1,1,0,0,0,.6-.2L20,7.25V17A1,1,0,0,1,19,18Z"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">E-mail</span>
                  <span className="text-gray-800 font-medium hover:text-indigo-600 transition-colors">
                    info@kavsar.tj
                  </span>
                </div>
              </a>
            </div>
            
            {/* CTA Buttons - with added call functionality */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={handleCallClick}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.44,13c-.22,0-.45-.07-.67-.12a9.44,9.44,0,0,1-1.31-.39,2,2,0,0,0-2.48,1l-.22.45a12.18,12.18,0,0,1-2.66-2,12.18,12.18,0,0,1-2-2.66L10.52,9a2,2,0,0,0,1-2.48,10.33,10.33,0,0,1-.39-1.31c-.05-.22-.09-.45-.12-.68a3,3,0,0,0-3-2.49h-3a3,3,0,0,0-3,3.41A19,19,0,0,0,18.53,21.91l.38,0a3,3,0,0,0,2-.76,3,3,0,0,0,1-2.25v-3A3,3,0,0,0,19.44,13Z"/>
                </svg>
                {t('address.button')}
              </button>
              <button 
                onClick={handleRouteClick}
                className="flex-1 py-3 px-6 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors duration-300 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2a8,8,0,0,0-8,8c0,5.4,7.05,11.5,7.35,11.76a1,1,0,0,0,1.3,0C13,21.5,20,15.4,20,10A8,8,0,0,0,12,2Zm0,11a3,3,0,1,1,3-3A3,3,0,0,1,12,13Z"/>
                </svg>
                {t('address.route')}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Call Button - Only appears on mobile devices */}
        {isMobile && (
          <div className="fixed bottom-5 right-5 z-50">
            <a 
              href="tel:+992205122525" 
              className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-600 to-pink-500 rounded-full text-white shadow-lg animate-pulse"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.44,13c-.22,0-.45-.07-.67-.12a9.44,9.44,0,0,1-1.31-.39,2,2,0,0,0-2.48,1l-.22.45a12.18,12.18,0,0,1-2.66-2,12.18,12.18,0,0,1-2-2.66L10.52,9a2,2,0,0,0,1-2.48,10.33,10.33,0,0,1-.39-1.31c-.05-.22-.09-.45-.12-.68a3,3,0,0,0-3-2.49h-3a3,3,0,0,0-3,3.41A19,19,0,0,0,18.53,21.91l.38,0a3,3,0,0,0,2-.76,3,3,0,0,0,1-2.25v-3A3,3,0,0,0,19.44,13Z"/>
              </svg>
            </a>
          </div>
        )}
        
        {/* Working Hours */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 mt-8 p-4 bg-white rounded-xl shadow-lg border border-gray-100 max-w-max mx-auto">
          <div className="text-pink-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Zm1-8.25V8a1,1,0,0,0-2,0v4a1,1,0,0,0,.34.75l3.21,2.74a1,1,0,0,0,1.3-1.51Z"/>
            </svg>
          </div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <span className="font-semibold text-gray-800">{t('address.time')}:</span>
            <span className="text-gray-500">Пн-Сб: 9:00 - 20:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
import React from 'react'

const YoutubeStyleLoader = () => {
  return (
    <div className="youtube-style-loader-container h-[450px] max-w-[1500px] w-full m-auto px-1 sm:px-2 md:px-4 lg:px-16 pt-10 flex flex-col items-center justify-center">
      {/* Плейсхолдер баннер */}
      <div className="w-full h-[400px] bg-gray-200 rounded-lg relative overflow-hidden">
        {/* Gradient animation overlay */}
        <div className="youtube-loading-shimmer absolute inset-0"></div>
        
        {/* Скелетон контент */}
        <div className="absolute bottom-8 left-8 w-1/2">
          <div className="h-10 bg-gray-300 rounded-md mb-4 w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded-md mb-2 w-full"></div>
          <div className="h-6 bg-gray-300 rounded-md mb-4 w-4/5"></div>
          <div className="h-10 bg-gray-300 rounded-md w-40"></div>
        </div>
      </div>
      
      {/* CSS барои анимацияи загрузка */}
      <style jsx>{`
        .youtube-loading-shimmer {
          background: linear-gradient(90deg, 
            rgba(0,0,0,0) 0%, 
            rgba(255,255,255,0.15) 50%, 
            rgba(0,0,0,0) 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  )
}

export default YoutubeStyleLoader







  
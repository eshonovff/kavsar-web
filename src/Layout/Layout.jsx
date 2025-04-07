import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/IMG_0318.png";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../components/LanguageSelect/LanguageSelect";

const Layout = () => {
  const { t } = useTranslation();
  const location = useLocation(); // Получаем текущий путь
  
  // Функция для определения, является ли путь активным
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return path !== '/' && location.pathname.startsWith(path);
  };

  // Стиль для активной кнопки
  const activeStyle = {
    background: "linear-gradient(to top, rgba(49, 46, 129, 0.6), rgba(88, 28, 135, 0.6))",
    color: "white"
  };

  return (
    <div>
      <header className="flex sticky top-0 z-50 backdrop-blur-xl justify-between items-center shadow-md px-16">
        <div className="max-w-[1500px] w-full flex justify-between items-center m-auto">
          <div className="flex justify-between items-center w-[50%]">
            <Link to={"/"}>
              <img className="w-[100px]" src={logo} alt="" />
            </Link>

            <Link to={"/"}>
              <Button
                type="text"
                style={{
                  fontWeight: 500,
                  fontSize: "16px",
                  margin: "8px 0",
                  transition: "all 0.3s",
                  ...(isActive('/') ? activeStyle : {})
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(to top, rgba(49, 46, 129, 0.6), rgba(88, 28, 135, 0.6))";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/')) {
                    e.currentTarget.style.background = "";
                    e.currentTarget.style.color = "";
                  } else {
                    e.currentTarget.style.background = activeStyle.background;
                    e.currentTarget.style.color = activeStyle.color;
                  }
                }}
              >
                {t("navbar.home")}
              </Button>
            </Link>

            <Link to={"/courses"}>
              <Button
                type="text"
                style={{
                  fontWeight: 500,
                  fontSize: "16px",
                  margin: "8px 0",
                  transition: "all 0.3s",
                  ...(isActive('/courses') ? activeStyle : {})
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(to top, rgba(49, 46, 129, 0.6), rgba(88, 28, 135, 0.6))";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/courses')) {
                    e.currentTarget.style.background = "";
                    e.currentTarget.style.color = "";
                  } else {
                    e.currentTarget.style.background = activeStyle.background;
                    e.currentTarget.style.color = activeStyle.color;
                  }
                }}
              >
                {t("navbar.courses")}
              </Button>
            </Link>

            <Link to={"/news"}>
              <Button
                type="text"
                style={{
                  fontWeight: 500,
                  fontSize: "16px",
                  margin: "8px 0",
                  transition: "all 0.3s",
                  ...(isActive('/news') ? activeStyle : {})
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(to top, rgba(49, 46, 129, 0.6), rgba(88, 28, 135, 0.6))";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/news')) {
                    e.currentTarget.style.background = "";
                    e.currentTarget.style.color = "";
                  } else {
                    e.currentTarget.style.background = activeStyle.background;
                    e.currentTarget.style.color = activeStyle.color;
                  }
                }}
              >
                {t("navbar.news")}
              </Button>
            </Link>

            <Link to={"/about"}>
              <Button
                type="text"
                style={{
                  fontWeight: 500,
                  fontSize: "16px",
                  margin: "8px 0",
                  transition: "all 0.3s",
                  ...(isActive('/about') ? activeStyle : {})
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(to top, rgba(49, 46, 129, 0.6), rgba(88, 28, 135, 0.6))";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/about')) {
                    e.currentTarget.style.background = "";
                    e.currentTarget.style.color = "";
                  } else {
                    e.currentTarget.style.background = activeStyle.background;
                    e.currentTarget.style.color = activeStyle.color;
                  }
                }}
              >
                {t("navbar.aboutUs")}
              </Button>
            </Link>
          </div>

          {/* Остальная часть кода остается без изменений */}
          <div className="flex justify-between items-center w-[23%]">
            <LanguageSelect />
            
            {/* Кнопка со стилями inline */}
            <div className="group">
              <button 
                type="primary"
                style={{
                  background: "linear-gradient(to right, #6366f1, #8b5cf6)",
                  color: "white",
                  border: "none",
                  fontWeight: 500,
                  fontSize: "16px",
                  position: "relative",
                  zIndex: 10,
                  padding: "12px 16px", /* Increased height */
                  borderRadius: "0.5rem",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                  transition: "all 0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(99, 102, 241, 0.4), 0 2px 4px -1px rgba(99, 102, 241, 0.06)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  
                  // Анимация для волны
                  const waveElement = e.currentTarget.querySelector('.wave-effect');
                  if (waveElement) {
                    waveElement.style.transform = "translateX(100%)";
                  }
                  
                  // Анимация для иконки
                  const iconElement = e.currentTarget.querySelector('.arrow-icon');
                  if (iconElement) {
                    iconElement.style.transform = "translateX(4px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                  
                  // Сброс анимации для волны
                  const waveElement = e.currentTarget.querySelector('.wave-effect');
                  if (waveElement) {
                    waveElement.style.transform = "translateX(-100%)";
                  }
                  
                  // Сброс анимации для иконки
                  const iconElement = e.currentTarget.querySelector('.arrow-icon');
                  if (iconElement) {
                    iconElement.style.transform = "translateX(0)";
                  }
                }}
              >
                <span style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {t("banners.SignCourses")}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="arrow-icon"
                    style={{ 
                      height: "1rem", 
                      width: "1rem",
                      transition: "transform 0.3s"
                    }}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
                <span 
                  className="wave-effect"
                  style={{ 
                    position: "absolute", 
                    inset: 0, 
                    backgroundColor: "white", 
                    opacity: 0.2, 
                    transform: "translateX(-100%)",
                    transition: "transform 0.7s"
                  }}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <Outlet />
      {/* Остальная часть кода (футер) остается без изменений */}
      <footer className="bg-gradient-to-t from-indigo-900 to-purple-900 text-white py-14 mt-10">
        <div className="max-w-[1500px] w-full mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img
                className="w-[120px] mb-4 brightness-0 invert opacity-90"
                src={logo}
                alt="Logo"
              />
              <p className="text-indigo-200 max-w-xs">
                Modern educational platform with innovative courses for
                everyone.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2 w-1.5 h-6 bg-indigo-400 rounded-full inline-block"></span>
                Navigation
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-indigo-200 hover:text-white transition-colors"
                  >
                    {t("navbar.home")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses"
                    className="text-indigo-200 hover:text-white transition-colors"
                  >
                    {t("navbar.courses")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/news"
                    className="text-indigo-200 hover:text-white transition-colors"
                  >
                    {t("navbar.news")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-indigo-200 hover:text-white transition-colors"
                  >
                    {t("navbar.aboutUs")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2 w-1.5 h-6 bg-indigo-400 rounded-full inline-block"></span>
                Contact
              </h3>
              <ul className="space-y-2">
                <li className="text-indigo-200">info@kavsar.com</li>
                <li className="text-indigo-200">+992 123 456 789</li>
              </ul>

              <div className="mt-6 flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-indigo-800/40 text-center text-indigo-200">
            <p>© {new Date().getFullYear()} Kavsar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
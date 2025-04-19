import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/IMG_0318.png";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../components/LanguageSelect/LanguageSelect";
import { useState, useEffect } from "react";
import { useScroll } from "../hook/ScrollProvider";

const Layout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { requestRef, scrollToSection } = useScroll();

  // Function to check if route is active
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    return path !== "/" && location.pathname.startsWith(path);
  };

  // Style for active button
  const activeStyle = {
    background:
      "linear-gradient(to top, rgba(49, 46, 129, 0.6), rgba(88, 28, 135, 0.6))",
    color: "white",
  };

  // Функция для обработки нажатия на кнопку записи
  const handleRequestButtonClick = () => {
    // Если мы на главной странице (pathname равен '/'), то выполняем скролл
    if (location.pathname === '/') {
      scrollToSection(requestRef);
    } else {
      // Иначе переходим на новую страницу
      navigate('/requstorInstagram');
    }
  };

  // Update window width state on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.scrollTo(0, 0);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Render header based on screen size
  const renderHeader = () => {
    // Small screens (400px - 700px)
    if (windowWidth >= 400 && windowWidth <= 700) {
      return (
        <header className="sticky top-0 z-50 backdrop-blur-xl shadow-md">
          <div className="px-4 py-2">
            {/* Logo and menu button on top */}
            <div className="flex justify-between items-center mb-4">
              <Link to={"/"}>
                <img className="w-[80px]" src={logo} alt="Logo" />
              </Link>
              <div className="flex justify-between items-center mt-2">
                <button
                  type="button"
                  onClick={handleRequestButtonClick}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-medium text-sm flex items-center"
                >
                  {t("banners.SignCourses")}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={toggleMobileMenu}
                  className="text-indigo-600 focus:outline-none ml-2"
                >
                  {mobileMenuOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Bottom navigation buttons */}
            <div
              className={`flex flex-col space-y-2 ${
                mobileMenuOpen ? "block" : "hidden"
              }`}
            >
              <div className="grid grid-cols-4 gap-1">
                <Link to={"/"} className="flex-1">
                  <Button
                    type="text"
                    block
                    style={{
                      fontWeight: 500,
                      margin: "4px 2px",
                      ...(isActive("/") ? activeStyle : {}),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mb-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <span className="block text-xs">{t("navbar.home")}</span>
                  </Button>
                </Link>

                <Link to={"/courses"} className="flex-1">
                  <Button
                    type="text"
                    block
                    style={{
                      fontWeight: 500,
                      margin: "4px 2px",
                      ...(isActive("/courses") ? activeStyle : {}),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mb-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                    <span className="block text-xs">{t("navbar.courses")}</span>
                  </Button>
                </Link>

                <Link to={"/news"} className="flex-1">
                  <Button
                    type="text"
                    block
                    style={{
                      fontWeight: 500,
                      margin: "4px 2px",
                      ...(isActive("/news") ? activeStyle : {}),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mb-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                        clipRule="evenodd"
                      />
                      <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                    </svg>
                    <span className="block text-xs">{t("navbar.news")}</span>
                  </Button>
                </Link>

                <Link to={"/library"} className="flex-1">
                  <Button
                    type="text"
                    block
                    style={{
                      fontWeight: 500,
                      margin: "4px 2px",
                      ...(isActive("/library") ? activeStyle : {}),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mb-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    <span className="block text-xs">{t("navbar.library")}</span>
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1">
                <Link to={"/about"} className="flex-1">
                  <Button
                    type="text"
                    block
                    style={{
                      fontWeight: 500,
                      margin: "4px 2px",
                      ...(isActive("/about") ? activeStyle : {}),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mb-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="block text-xs">{t("navbar.aboutUs")}</span>
                  </Button>
                </Link>
                
                <div className="flex justify-center items-center mt-2">
                  <LanguageSelect />
                </div>
              </div>
            </div>
          </div>
        </header>
      );
    }

    // Medium screens (701px - 1150px)
    else if (windowWidth >= 701 && windowWidth <= 1150) {
      return (
        <header className="sticky top-0 z-50 backdrop-blur-xl shadow-md py-2 px-4">
          <div className="flex flex-wrap items-center">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link to={"/"}>
                <img className="w-[90px]" src={logo} alt="Logo" />
              </Link>
              <div className="flex items-center space-x-2 mt-2 md:mt-0">
                <LanguageSelect />

                <button
                  onClick={handleRequestButtonClick}
                  type="button"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-lg shadow-md font-medium text-sm flex items-center"
                >
                  {t("banners.SignCourses")}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={toggleMobileMenu}
                  className="inline-flex md:hidden text-indigo-600 focus:outline-none"
                >
                  {mobileMenuOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div
              className={`flex-grow w-full md:w-auto mt-4 md:mt-0 ${
                mobileMenuOpen ? "block" : "hidden md:block"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex space-x-2">
                  <Link to={"/"}>
                    <Button
                      type="text"
                      style={{
                        fontWeight: 500,
                        fontSize: "14px",
                        margin: "4px 0",
                        transition: "all 0.3s",
                        ...(isActive("/") ? activeStyle : {}),
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
                        fontSize: "14px",
                        margin: "4px 0",
                        transition: "all 0.3s",
                        ...(isActive("/courses") ? activeStyle : {}),
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
                        fontSize: "14px",
                        margin: "4px 0",
                        transition: "all 0.3s",
                        ...(isActive("/news") ? activeStyle : {}),
                      }}
                    >
                      {t("navbar.news")}
                    </Button>
                  </Link>

                  <Link to={"/library"}>
                    <Button
                      type="text"
                      style={{
                        fontWeight: 500,
                        fontSize: "14px",
                        margin: "4px 0",
                        transition: "all 0.3s",
                        ...(isActive("/library") ? activeStyle : {}),
                      }}
                    >
                      {t("navbar.library")}
                    </Button>
                  </Link>

                  <Link to={"/about"}>
                    <Button
                      type="text"
                      style={{
                        fontWeight: 500,
                        fontSize: "14px",
                        margin: "4px 0",
                        transition: "all 0.3s",
                        ...(isActive("/about") ? activeStyle : {}),
                      }}
                    >
                      {t("navbar.aboutUs")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
      );
    }

    // Large screens (1150px and above)
    else {
      return (
        <header className="flex sticky top-0 z-50 backdrop-blur-xl justify-between items-center shadow-md px-8 lg:px-16 py-2">
          <div className="max-w-[1500px] w-full flex justify-between items-center m-auto">
            <div className="flex justify-between items-center lg:w-[50%]">
              <Link to={"/"}>
                <img className="w-[100px]" src={logo} alt="Logo" />
              </Link>

              <Link to={"/"}>
                <Button
                  type="text"
                  style={{
                    fontWeight: 500,
                    fontSize: "16px",
                    margin: "8px 0",
                    transition: "all 0.3s",
                    ...(isActive("/") ? activeStyle : {}),
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to top, rgba(49, 46, 129, 0.6), rgba(88, 28, 135, 0.6))";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/")) {
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
                    ...(isActive("/courses") ? activeStyle : {}),
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to top, rgba(49, 46, 129, 0.6), rgba(88, 28, 135, 0.6))";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/courses")) {
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
                    ...(isActive("/news") ? activeStyle : {}),
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to top, rgba(49, 46, 129, 0.6), rgba(88, 28, 135, 0.6))";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/news")) {
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
              <Link to={"/library"}>
                <Button
                  type="text"
                  style={{
                    fontWeight: 500,
                    fontSize: "16px",
                    margin: "8px 0",
                    transition: "all 0.3s",
                    ...(isActive("/library") ? activeStyle : {}),
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to top, rgba(49, 46, 129, 0.6), rgba(88, 28, 135, 0.6))";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/library")) {
                      e.currentTarget.style.background = "";
                      e.currentTarget.style.color = "";
                    } else {
                      e.currentTarget.style.background = activeStyle.background;
                      e.currentTarget.style.color = activeStyle.color;
                    }
                  }}
                >
                  {t("navbar.library")}
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
                    ...(isActive("/about") ? activeStyle : {}),
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to top, rgba(49, 46, 129, 0.6), rgba(88, 28, 135, 0.6))";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/about")) {
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

            <div className="flex justify-between items-center w-auto lg:w-[23%]">
              <LanguageSelect />

              <div className="group ml-2">
                <button
                  type="button"
                  onClick={handleRequestButtonClick}
                  style={{
                    background: "linear-gradient(to right, #6366f1, #8b5cf6)",
                    color: "white",
                    border: "none",
                    fontWeight: 500,
                    fontSize: "16px",
                    position: "relative",
                    zIndex: 10,
                    padding: "12px 16px",
                    borderRadius: "0.5rem",
                    boxShadow:
                      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    transition: "all 0.3s",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px -1px rgba(99, 102, 241, 0.4), 0 2px 4px -1px rgba(99, 102, 241, 0.06)";
                    e.currentTarget.style.transform = "translateY(-2px)";

                    const waveElement =
                      e.currentTarget.querySelector(".wave-effect");
                    if (waveElement) {
                      waveElement.style.transform = "translateX(100%)";
                    }

                    const iconElement =
                      e.currentTarget.querySelector(".arrow-icon");
                    if (iconElement) {
                      iconElement.style.transform = "translateX(4px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
                    e.currentTarget.style.transform = "translateY(0)";

                    const waveElement =
                      e.currentTarget.querySelector(".wave-effect");
                    if (waveElement) {
                      waveElement.style.transform = "translateX(-100%)";
                    }

                    const iconElement =
                      e.currentTarget.querySelector(".arrow-icon");
                    if (iconElement) {
                      iconElement.style.transform = "translateX(0)";
                    }
                  }}
                >
                  <span
                    style={{
                      position: "relative",
                      zIndex: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {t("banners.SignCourses")}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="arrow-icon"
                      style={{
                        height: "1rem",
                        width: "1rem",
                        transition: "transform 0.3s",
                      }}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
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
                      transition: "transform 0.7s",
                    }}
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </header>
      );
    }
  };

  // Render mobile bottom tab bar
  const renderMobileTabBar = () => {
    if (windowWidth >= 400 && windowWidth <= 700) {
      return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
          <div className="flex justify-around">
            <Link to={"/"} className="flex-1 py-2 flex flex-col items-center">
              <div
                className={`p-1 rounded-full ${
                  isActive("/") ? "bg-indigo-100" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${
                    isActive("/") ? "text-indigo-600" : "text-gray-500"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span
                className={`text-xs ${
                  isActive("/")
                    ? "text-indigo-600 font-medium"
                    : "text-gray-500"
                }`}
              >
                {t("navbar.home")}
              </span>
            </Link>

            <Link
              to={"/courses"}
              className="flex-1 py-2 flex flex-col items-center"
            >
              <div
                className={`p-1 rounded-full ${
                  isActive("/courses") ? "bg-indigo-100" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${
                    isActive("/courses") ? "text-indigo-600" : "text-gray-500"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
              </div>
              <span
                className={`text-xs ${
                  isActive("/courses")
                    ? "text-indigo-600 font-medium"
                    : "text-gray-500"
                }`}
              >
                {t("navbar.courses")}
              </span>
            </Link>

            <Link
              to={"/news"}
              className="flex-1 py-2 flex flex-col items-center"
            >
              <div
                className={`p-1 rounded-full ${
                  isActive("/news") ? "bg-indigo-100" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${
                    isActive("/news") ? "text-indigo-600" : "text-gray-500"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                    clipRule="evenodd"
                  />
                  <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                </svg>
              </div>
              <span
                className={`text-xs ${
                  isActive("/news")
                    ? "text-indigo-600 font-medium"
                    : "text-gray-500"
                }`}
              >
                {t("navbar.news")}
              </span>
            </Link>

            <Link
              to={"/library"}
              className="flex-1 py-2 flex flex-col items-center"
            >
              <div
                className={`p-1 rounded-full ${
                  isActive("/library") ? "bg-indigo-100" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${
                    isActive("/library") ? "text-indigo-600" : "text-gray-500"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <span
                className={`text-xs ${
                  isActive("/library")
                    ? "text-indigo-600 font-medium"
                    : "text-gray-500"
                }`}
              >
                {t("navbar.library")}
              </span>
            </Link>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {renderHeader()}

      <div className={windowWidth >= 400 && windowWidth <= 700 ? "pb-16" : ""}>
        <Outlet />
      </div>

      {renderMobileTabBar()}

      <footer className="bg-gradient-to-t from-indigo-900 to-purple-900 text-white py-8 md:py-14 mt-10">
        <div className="max-w-[1500px] w-full mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img
                className="w-[100px] md:w-[120px] mb-4 brightness-0 invert opacity-90"
                src={logo}
                alt="Logo"
              />
              <p className="text-indigo-200 max-w-xs">
                {t("footer.description") ||
                  "Modern educational platform with innovative courses for everyone."}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2 w-1.5 h-6 bg-indigo-400 rounded-full inline-block"></span>
                {t("footer.navigation") || "Navigation"}
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
                    to="/library"
                    className="text-indigo-200 hover:text-white transition-colors"
                  >
                    {t("navbar.library")}
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
                {t("footer.contact") || "Contact"}
              </h3>
              <ul className="space-y-2">
                <li className="text-indigo-200">info@kavsar.com</li>
                <li className="text-indigo-200">+992 205 12 25 25</li>
                <li className="text-indigo-200">+992 985 78 84 44</li>
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

          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-indigo-800/40 text-center text-indigo-200">
            <p>
              © {new Date().getFullYear()} Kavsar.{" "}
              {t("footer.rights") || "All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
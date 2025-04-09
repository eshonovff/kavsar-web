import React, { useState } from "react";
import image1 from "../../assets/photo_2025-02-03_15-24-19.jpg";
import { useTranslation } from "react-i18next";
import { useScroll } from "../../hook/ScrollProvider";

const Request = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    source: "Instagram",
    message: "",
  });

  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Логика отправки формы
  };

  const { requestRef} = useScroll();

  return (
    <div ref={requestRef} className="bg-gradient-to-br from-indigo-50 via-blue-50 to-violet-50 py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto backdrop-blur-sm">
        {/* Неоморфический заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-600 inline-block">
            {t("Request.title")}
          </h1>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            {t("Request.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Форма - занимает 3/5 на больших экранах */}
          <div className="lg:col-span-3 backdrop-blur-md bg-white/70 rounded-3xl shadow-lg border border-white/50 overflow-hidden">
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 ml-1"
                  >
                    {t("Request.form.fullName")}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                      placeholder={t("Request.form.fullNamePlaceholder")}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 ml-1"
                  >
                    {t("Request.form.phone")}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                      placeholder="+992 XXX-XX-XX"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 ml-1"
                  >
                    {t("Request.form.email")}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                      placeholder="example@domain.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="source"
                    className="block text-sm font-medium text-gray-700 ml-1"
                  >
                    {t("Request.form.source")}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <select
                      id="source"
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option value="Instagram">
                        {t("Request.form.sourceOptions.instagram")}
                      </option>
                      <option value="Friend">
                        {t("Request.form.sourceOptions.friend")}
                      </option>
                      <option value="Website">
                        {t("Request.form.sourceOptions.website")}
                      </option>
                      <option value="Banners">
                        {t("Request.form.sourceOptions.banners")}
                      </option>
                      <option value="College">
                        {t("Request.form.sourceOptions.college")}
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 ml-1"
                  >
                    {t("Request.form.message")}
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="3"
                      className="pl-10 w-full px-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all resize-none"
                      placeholder={t("Request.form.messagePlaceholder")}
                    ></textarea>
                  </div>
                </div>

                <div className="pt-2">
                  {/* Кнопка с неоновым эффектом */}
                  <button
                    type="submit"
                    className="group relative w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl transition-all duration-300 transform overflow-hidden shadow-lg hover:shadow-blue-500/50"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      {t("Request.form.submit")}
                    </span>
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-2 text-center">
                  {t("Request.form.privacy")}{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {t("Request.form.privacyLink")}
                  </a>
                </p>
              </form>
            </div>
          </div>

          {/* Изображение и контактная информация - занимает 2/5 на больших экранах */}
          <div className="lg:col-span-2">
            <div className="h-full rounded-3xl overflow-hidden shadow-lg relative group">
              {/* Основное изображение с эффектом параллакса */}
              <div className="absolute inset-0 transform group-hover:scale-105 transition-transform duration-1000 ease-in-out">
                <img
                  src={image1}
                  alt={t("Request.contact.title")}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Стеклянный эффект для карточки контактов */}
              <div className="relative h-full flex flex-col justify-end">
                <div
                  className="bg-gradient-to-t from-indigo-900/90 via-indigo-900/60 to-transparent p-6 text-white backdrop-blur-lg backdrop-filter"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(49, 46, 129, 0.9) 0%, rgba(49, 46, 129, 0.7) 40%, rgba(49, 46, 129, 0.3) 80%, transparent 100%)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2 text-blue-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                    {t("Request.contact.title")}
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-blue-200">
                          {t("Request.contact.phone")}
                        </div>
                        <div>+992 (205) 12 25 25</div>
                        <div>+992 (985) 78 84 44 </div>

                      </div>
                    </div>

                    <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-blue-200">
                          {t("Request.contact.email")}
                        </div>
                        <div>info@kavsar.academy</div>
                      </div>
                    </div>

                    <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-blue-200">
                          {t("Request.contact.address")}
                        </div>
                        <div>{t("Request.contact.addressValue")}</div>
                      </div>
                    </div>
                  </div>

                  {/* Современные иконки соцсетей */}
                  <div className="flex space-x-3 mt-6">
                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/kavsaracademy.tj?igsh=Ymp1NTJ4c3Vva3B4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full backdrop-blur-sm bg-white/10 flex items-center justify-center border border-white/20 transition-all hover:bg-white/30 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/share/15ptZjZuSa/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full backdrop-blur-sm bg-white/10 flex items-center justify-center border border-white/20 transition-all hover:bg-white/30 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>

                    {/* Telegram */}
                    <a
                      href="https://t.me/KavsarAcademy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full backdrop-blur-sm bg-white/10 flex items-center justify-center border border-white/20 transition-all hover:bg-white/30 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 6.627 5.374 12 12 12 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm-1.218 19.075c-.13.077-.394.077-.524 0l-2.999-2.242c-.247-.185-.281-.508-.074-.745.037-.042.08-.078.124-.107l1.054-.706 2.242 1.667c.065.048.138.071.211.071.208 0 .38-.162.39-.37l.87-9.851c.012-.149.136-.268.286-.273.149-.007.282.106.308.253l1.574 9.651c.087.532-.089 1.081-.47 1.447l-2.993 2.202zm4.755-11.932c-.126-.393-.496-.556-.893-.344l-10.039 5.323c-.353.187-.46.636-.202.953.258.318.737.363 1.055.108l9.934-5.322c.397-.212.568-.588.145-.718z" />
                      </svg>
                    </a>

                    {/* TikTok */}
                    <a
                      href="https://www.tiktok.com/@kavsaracademy.tj?_t=ZS-8uBK4sTEN0M&_r=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full backdrop-blur-sm bg-white/10 flex items-center justify-center border border-white/20 transition-all hover:bg-white/30 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;

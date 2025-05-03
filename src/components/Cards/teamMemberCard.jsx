import {useTranslation} from "react-i18next";
import React from "react";

export const TeamMemberCard = ({ member }) => {
    const { t } = useTranslation();
    console.log(member,"aloo");
    return (
        <div className="group">
            <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md shadow-lg transition-all duration-300 transform group-hover:shadow-xl group-hover:scale-[1.02] h-full flex flex-col">
                {/* Фото сотрудника с градиентным оверлеем */}
                <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <img
                        src={`${import.meta.env.VITE_APP_API_URL_IMAGE}${member.profileImagePath}`}
                        alt={member.fullName}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Технологии, которыми владеет */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-wrap gap-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                        {member.knowingIcons.map((icon, index) => (
                            <div key={index} className="w-8 h-8 rounded-full bg-white/90 p-1 shadow-md">
                                <img
                                    src={`${import.meta.env.VITE_APP_API_URL_IMAGE}${icon}`}
                                    alt={t('team.skillAlt')}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Тонкая градиентная линия */}
                <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-violet-600"></div>

                {/* Информация о сотруднике */}
                <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold mb-1 text-gray-800">{member.fullName}</h3>

                    {/* Summary с ограничением */}
                    <div className="relative mb-2">
                        <p className="text-sm text-indigo-600 font-medium overflow-hidden transition-all duration-300">
              <span className="line-clamp-2 group-hover:line-clamp-none">
                {member.summary}
              </span>
                        </p>
                    </div>

                    {/* About с ограничением */}
                    <div className="relative">
                        <p className="text-xs text-gray-600 overflow-hidden transition-all duration-300">
              <span className="line-clamp-3 group-hover:line-clamp-none">
                {member.aboute}
              </span>
                        </p>
                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 transition-opacity duration-300"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
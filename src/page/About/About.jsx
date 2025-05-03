import React, {useEffect, useState} from 'react';
import {Users, Award, Briefcase, Star, Code, Mail, Globe, Linkedin} from 'lucide-react';
import {useDispatch, useSelector} from 'react-redux';
import {GetGalerry} from '../../Api/bannerApi';
import TeamSection from '../../components/TeamSection/TeamSection';
import {useTranslation} from 'react-i18next';

// Упрощенная карточка с 3D-эффектом
const Card3D = ({
                    children,
                    className
                }) => {
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
    const {
        gallery,
        loading
    } = useSelector((state) => state.BannerSlicer);
    const [videoUrl, setVideoUrl] = useState('');
    const {t} = useTranslation();

    // Достижения
    const achievements = [
        {
            icon:
                <Users
                    className="w-10 h-10"/>,
            number: "500+",
            text: t("about.achievements.graduates")
        },
        {
            icon:
                <Award
                    className="w-10 h-10"/>,
            number: "20+",
            text: t("about.achievements.programs")
        },
        {
            icon:
                <Award
                    className="w-10 h-10"/>,
            number: "95%",
            text: t("about.achievements.recommend")
        },
        {
            icon:
                <Award
                    className="w-10 h-10"/>,
            number: "3+",
            text: t("about.achievements.experience")
        }
    ];


    useEffect(() => {
        if (!gallery.length) {
            dispatch(GetGalerry());
        }
    }, [dispatch, gallery.length]);

    useEffect(() => {
        if (gallery.length > 0) {
            const firstMedia = gallery[0]?.mediaUrl;
            setVideoUrl(`${import.meta.env.VITE_APP_API_URL_IMAGE}${firstMedia}`);
        }
    }, [gallery]);

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-gray-800">
            {/* Элементы фона */}
            <div
                className="absolute inset-0 overflow-hidden -z-10">
                <div
                    className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div
                    className="absolute top-0 -right-20 w-80 h-80 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div
                    className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            </div>

            {/* Раздел заголовка */}
            <section
                className="py-20 relative">
                <div
                    className="container mx-auto px-4 max-w-[1500px] relative">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                        {t("about.title")}
                    </h1>
                    <div
                        className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mb-8"></div>
                    <div
                        className="text-lg md:text-xl text-gray-700 mb-12">
                        <p>
                            {t("about.intro.paragraph1")}
                        </p>
                        <br/>
                        <p>
                            {t("about.intro.paragraph2")}
                            <strong>{t("about.intro.specialties")}</strong> {t("about.intro.paragraph2End")}
                        </p>
                        <br/>
                        <p>
                            {t("about.intro.paragraph3")}
                        </p>
                        <br/>
                        <p>
                            📚 {t("about.intro.final1")},
                            🌍 {t("about.intro.final2")} ✨ {t("about.intro.final3")}
                            <br/>
                            <strong>{t("about.intro.slogan")}</strong>
                        </p>
                    </div>
                </div>
            </section>

            {/* Раздел с видео */}
            <section
                className="py-16 relative">
                <div
                    className="container mx-auto px-4 max-w-6xl">
                    <div
                        className="rounded-2xl overflow-hidden shadow-2xl">
                        <div
                            className="relative">
                            {loading.gallery ? (
                                <div
                                    className="w-full aspect-video bg-gray-800 flex items-center justify-center">
                                    <div
                                        className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
                                </div>
                            ) : videoUrl ? (
                                <video
                                    className="w-full aspect-video object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                >
                                    <source
                                        src={videoUrl}
                                        type="video/mp4"/>
                                    {t("about.video.unsupported")}
                                </video>
                            ) : (
                                // Если видео не найдено
                                <div
                                    className="w-full aspect-video bg-gray-800 flex items-center justify-center">
                                    <p className="text-white">{t("about.video.notFound")}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Раздел достижений */}
            <section
                className="py-20 relative">
                <div
                    className="container mx-auto px-4 max-w-6xl">
                    <div
                        className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                            {t("about.achievements.title")}
                        </h2>
                        <div
                            className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mb-6 mx-auto"></div>
                    </div>

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {achievements.map((achievement, index) => (
                            <Card3D
                                key={index}
                                className="bg-white/80 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center text-center">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600 mb-4">
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

            {/* Раздел команда */}
            <TeamSection/>
        </div>
    );
};

export default About;
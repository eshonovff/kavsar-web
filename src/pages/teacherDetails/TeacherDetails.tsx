import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { getColleagueById } from "../../api/api";
import type { Colleague } from "../../types/colleague";

const TeacherDetails = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const { data: colleagueData, isLoading } = useQuery({
        queryKey: ['colleague', id, i18n.language],
        queryFn: () => getColleagueById({ id: Number(id), language: i18n.language }),
        enabled: !!id,
    });

    const teacher: Colleague | null = colleagueData?.data || null;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (!teacher) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="bg-slate-800/20 backdrop-blur-sm border border-dashed border-slate-700/50 rounded-[2rem] p-12 max-w-2xl mx-auto">
                    <p className="text-slate-400 text-lg mb-8">{t('courses.noResults')}</p>
                    <Link
                        to="/about"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        {t('teacherDetails.backToTeam')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 md:space-y-12 pb-20">
            <div className="container mx-auto px-4" data-aos="fade-down">
                <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors group mb-6"
                >
                    <div className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{t('teacherDetails.backToTeam')}</span>
                </Link>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
                    <div className="lg:col-span-4 space-y-6" data-aos="fade-right">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-slate-700/50 bg-slate-900 shadow-2xl">
                                <img
                                    src={import.meta.env.VITE_API_URL_IMAGES + teacher.profileImagePath}
                                    alt={teacher.fullName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-[2rem] p-6 text-center space-y-4 shadow-xl">
                            <h4 className="text-white font-bold text-lg">{t('contactForm.freeLesson')}</h4>
                            <button
                                onClick={() => navigate('/contact')}
                                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-slate-900 font-bold hover:opacity-90 transition-all shadow-lg shadow-emerald-500/25"
                            >
                                <Send className="w-4 h-4" />
                                {t('contactForm.submit')}
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-8 space-y-8 md:space-y-10" data-aos="fade-left">
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                    {teacher.role === 'director' ? t('pages.about.team.director') : t('pages.about.team.instructors')}
                                </span>
                                {teacher.knowingIcons && teacher.knowingIcons.length > 0 && (
                                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                                        <Sparkles className="w-3 h-3" />
                                        {t('teacherDetails.skills')}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                                {teacher.fullName}
                            </h1>
                            <p className="text-xl md:text-2xl text-emerald-400/90 font-medium italic">
                                "{teacher.summary}"
                            </p>
                        </div>

                        <div className="h-px bg-gradient-to-r from-slate-800 via-slate-700 to-transparent"></div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                                {t('teacherDetails.aboutTitle')}
                            </h3>
                            <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
                                {teacher.aboute}
                            </div>
                        </div>

                        {teacher.knowingIcons && teacher.knowingIcons.length > 0 && (
                            <div className="space-y-6 pt-4">
                                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <span className="w-8 h-1 bg-cyan-500 rounded-full"></span>
                                    {t('teacherDetails.skills')}
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {teacher.knowingIcons.map((icon, idx) => (
                                        <div
                                            key={idx}
                                            className="group relative p-3 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-cyan-500/30 transition-all duration-300"
                                            title="Skill icon"
                                        >
                                            <img
                                                src={import.meta.env.VITE_API_URL_IMAGES + icon}
                                                alt="Skill"
                                                className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDetails;

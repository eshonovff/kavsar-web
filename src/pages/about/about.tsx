import { useTranslation } from 'react-i18next';
import { colleague, getVideo } from '../../api/api';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef, type FC } from 'react';
import { Users, BookOpen, Star, Trophy } from 'lucide-react';
import type { Colleague } from '../../types/colleague';
import DirectorCard from '../../components/team/DirectorCard';
import TeamMemberCard from '../../components/team/TeamMemberCard';

const CountUp: FC<{ end: number; duration?: number; suffix?: string }> = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                    setCount(0);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
    const { t, i18n } = useTranslation();

    const { data: colleagueData, isLoading: isTeamLoading } = useQuery({
        queryKey: ['colleague', i18n.language],
        queryFn: () => colleague(i18n.language),
    });

    const { data: videoData } = useQuery({
        queryKey: ['video'],
        queryFn: () => getVideo(),
    });

    const colleagues: Colleague[] = colleagueData?.data || [];
    const director = colleagues.find(c => c.role?.toLowerCase() === 'director');
    const teamMembers = colleagues.filter(c => c.role?.toLowerCase() !== 'director');

    const video = videoData?.data && videoData.data.length > 0 ? videoData.data[0] : null;
    const videoUrl = video?.mediaUrl
        ? import.meta.env.VITE_API_URL_IMAGES + video.mediaUrl
        : null;

    const stats = [
        { value: 500, suffix: '+', label: t('pages.about.achievements.graduates'), icon: Users },
        { value: 20, suffix: '+', label: t('pages.about.achievements.programs'), icon: BookOpen },
        { value: 95, suffix: '%', label: t('pages.about.achievements.recommend'), icon: Star },
        { value: 3, suffix: '+', label: t('pages.about.achievements.experience'), icon: Trophy },
    ];

    return (
        <div className="space-y-12 md:space-y-20 pb-12">
            <div className="space-y-6 md:space-y-8" data-aos="fade-up">
                <div className="relative inline-block">
                    <h1 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent pb-3 md:pb-4">
                        {t('pages.about.academyTitle')}
                    </h1>
                    <div className="absolute bottom-0 left-0 w-12 md:w-16 h-1 md:h-1.5 bg-emerald-500 rounded-full" />
                </div>

                <div className="space-y-4 md:space-y-6 text-slate-300 text-sm md:text-lg leading-relaxed max-w-5xl">
                    <p>{t('pages.about.p1')}</p>
                    <p>{t('pages.about.p2')}</p>
                    <p>{t('pages.about.p3')}</p>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-base md:text-2xl font-medium text-slate-200">
                    <span>{t('pages.about.footer1')}</span>
                    <span className="text-emerald-400">{t('pages.about.footer2')}</span>
                    <span className="text-cyan-400">{t('pages.about.footer3')}</span>
                </div>

                <p className="text-base md:text-xl font-bold text-white border-l-4 border-emerald-500 pl-3 md:pl-4 py-2 bg-slate-800/20 rounded-r-xl">
                    {t('pages.about.success')}
                </p>
            </div>

            <div className="relative" data-aos="zoom-in" data-aos-duration="1000">
                {videoUrl ? (
                    <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden bg-slate-800/50 border border-slate-700/50 shadow-2xl shadow-emerald-500/10">
                        <video
                            src={videoUrl}
                            className="w-full aspect-video object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                ) : (
                    <div className="aspect-video bg-slate-800/30 border-2 border-dashed border-slate-700/50 rounded-2xl md:rounded-[2rem] flex items-center justify-center">
                        <p className="text-slate-500 font-medium italic">{t('ourCompany.noVideo')}</p>
                    </div>
                )}
            </div>

            <div className="space-y-8 md:space-y-12" data-aos="fade-up">
                <div className="text-center space-y-2 md:space-y-4">
                    <h2 className="text-2xl md:text-4xl font-bold text-white relative inline-block">
                        {t('pages.about.achievements.title')}
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 md:w-12 h-1 bg-emerald-500 rounded-full" />
                    </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl md:rounded-3xl p-4 md:p-8 text-center hover:border-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/5"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                                <stat.icon className="w-5 h-5 md:w-8 md:h-8 text-emerald-400" />
                            </div>
                            <div className="text-2xl md:text-5xl font-bold text-white mb-1 md:mb-2">
                                <CountUp end={stat.value} suffix={stat.suffix} duration={2000} />
                            </div>
                            <div className="text-[10px] md:text-sm text-slate-400 font-medium uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-12 md:space-y-16 pt-6 md:pt-10">
                <div className="text-center space-y-3 md:space-y-4" data-aos="fade-up">
                    <h2 className="text-2xl md:text-4xl font-bold text-white relative inline-block">
                        {t('pages.about.team.title')}
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 md:w-12 h-1 bg-cyan-500 rounded-full" />
                    </h2>
                </div>

                {isTeamLoading ? (
                    <div className="flex justify-center py-16 md:py-20">
                        <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-12 md:space-y-16">
                        {director && <DirectorCard director={director} />}

                        {teamMembers.length > 0 && (
                            <div className="space-y-8 md:space-y-10">
                                <h3 className="text-xl md:text-2xl font-bold text-slate-400 text-center uppercase tracking-[0.2em]" data-aos="fade-up">
                                    {t('pages.about.team.instructors')}
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                                    {teamMembers.map((member, index) => (
                                        <TeamMemberCard key={member.id} member={member} index={index} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default About;

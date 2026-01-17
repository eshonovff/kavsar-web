import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef, type FC } from 'react';

interface GalleryItem {
    id: number;
    mediaUrl: string;
}

interface OurCompanyProps {
    data: GalleryItem[];
}

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

const OurCompany: FC<OurCompanyProps> = ({ data }) => {
    const { t } = useTranslation();

    const video = data && data.length > 0 ? data[0] : null;
    const videoUrl = video?.mediaUrl
        ? import.meta.env.VITE_API_URL_IMAGES + video.mediaUrl
        : null;

    const stats = [
        { value: 3, suffix: '+', label: t('ourCompany.stats.experience') },
        { value: 500, suffix: '+', label: t('ourCompany.stats.graduates') },
        { value: 5, suffix: '+', label: t('ourCompany.stats.branches') },
        { value: 40, suffix: '+', label: t('ourCompany.stats.staff') },
    ];

    return (
        <section className="py-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="space-y-6" data-aos="fade-right">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        {t('ourCompany.title')}
                    </h2>
                    <p className="text-slate-400 leading-relaxed">
                        {t('ourCompany.description')}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 text-center hover:border-emerald-500/30 transition-colors"
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                            >
                                <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-1">
                                    <CountUp end={stat.value} suffix={stat.suffix} duration={1500} />
                                </div>
                                <div className="text-xs text-slate-400 uppercase tracking-wide">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative" data-aos="fade-left">
                    {videoUrl ? (
                        <div className="relative rounded-2xl overflow-hidden bg-slate-800/50 border border-slate-700/50">
                            <video
                                src={videoUrl}
                                className="w-full aspect-video object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </div>
                    ) : (
                        <div className="aspect-video bg-slate-800/50 border border-slate-700/50 rounded-2xl flex items-center justify-center">
                            <p className="text-slate-500">{t('ourCompany.noVideo')}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default OurCompany;
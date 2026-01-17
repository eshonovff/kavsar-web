import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, type FC } from 'react';

interface BannerItem {
    id: number;
    title: string;
    description: string;
    imagePath?: string;
}

interface BannerProps {
    data: BannerItem[];
}

const Banner: FC<BannerProps> = ({ data }) => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);

    const banners = data && data.length > 0 ? data : [];
    const hasBanners = banners.length > 0;
    const hasMultiple = banners.length > 1;

    useEffect(() => {
        if (!hasMultiple) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [banners.length, hasMultiple]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const currentBanner = hasBanners ? banners[currentIndex] : null;
    const title = currentBanner?.title || t('banner.title');
    const description = currentBanner?.description || t('banner.description');
    const imageUrl = currentBanner?.imagePath
        ? import.meta.env.VITE_API_URL_IMAGES + currentBanner.imagePath
        : null;

    return (
        <section className="relative overflow-hidden rounded-[3rem] bg-surface-50 dark:bg-surface-50 border border-surface-200 dark:border-surface-800/50 min-h-[350px] max-h-[650px] md:min-h-[500px] transition-colors duration-500 shadow-2xl">
            {imageUrl && (
                <img
                    key={currentIndex}
                    src={imageUrl}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-500"
                />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80" />

            <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative z-10 px-4 py-8 md:px-12 md:py-24 lg:py-32">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 md:mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400" />
                        <span className="text-xs md:text-sm text-emerald-400 font-medium">{t('banner.badge')}</span>
                    </div>

                    <h1
                        key={`title-${currentIndex}`}
                        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-6 leading-tight animate-fade-in"
                    >
                        {title}
                    </h1>

                    <p
                        key={`desc-${currentIndex}`}
                        className="text-sm md:text-lg lg:text-xl text-slate-300 mb-5 md:mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in line-clamp-3 md:line-clamp-none"
                    >
                        {description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                        <button className="group flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-xl text-slate-900 font-semibold text-sm md:text-base hover:opacity-90 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40">
                            {t('banner.button')}
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {hasMultiple && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-800/50 text-white hover:bg-slate-700/50 transition-colors backdrop-blur-sm"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-800/50 text-white hover:bg-slate-700/50 transition-colors backdrop-blur-sm"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </>
            )}

            {hasMultiple && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'w-8 bg-emerald-400'
                                : 'bg-slate-500 hover:bg-slate-400'
                                }`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Banner;

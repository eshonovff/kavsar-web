import { useTranslation } from 'react-i18next';
import { useRef, useState, useEffect, type FC } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, User } from 'lucide-react';

interface VideoReviewItem {
    id: number;
    reviewerName: string;
    videoReviewFile: string;
}

interface VideoReviewsProps {
    data: VideoReviewItem[];
}

const VideoReviews: FC<VideoReviewsProps> = ({ data }) => {
    const { t } = useTranslation();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [playingId, setPlayingId] = useState<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    const reviews = data && data.length > 0 ? data : [];

    const duplicatedReviews = [...reviews, ...reviews, ...reviews];

    useEffect(() => {
        if (reviews.length === 0 || isPaused) return;

        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationId: number;
        let scrollSpeed = 1;

        const scroll = () => {
            if (scrollContainer && !isPaused) {
                scrollContainer.scrollLeft += scrollSpeed;

                const maxScroll = scrollContainer.scrollWidth / 3;
                if (scrollContainer.scrollLeft >= maxScroll * 2) {
                    scrollContainer.scrollLeft = maxScroll;
                }
                if (scrollContainer.scrollLeft <= 0) {
                    scrollContainer.scrollLeft = maxScroll;
                }
            }
            animationId = requestAnimationFrame(scroll);
        };

        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;

        animationId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationId);
    }, [reviews.length, isPaused]);

    if (reviews.length === 0) return null;

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleVideoClick = (id: number, videoElement: HTMLVideoElement) => {
        if (playingId === id) {
            videoElement.pause();
            setPlayingId(null);
            setIsPaused(false);
        } else {
            const allVideos = document.querySelectorAll('video');
            allVideos.forEach(v => v.pause());
            videoElement.play();
            setPlayingId(id);
            setIsPaused(true);
        }
    };

    return (
        <section
            className="py-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
                if (!playingId) setIsPaused(false);
            }}
        >
            <div className="flex items-center justify-between mb-8" data-aos="fade-up">
                <div>
                    <span className="inline-block px-4 py-1.5 mb-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 font-medium">
                        {t('videoReviews.badge')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        {t('videoReviews.title')}
                    </h2>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:border-emerald-500/30 transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:border-emerald-500/30 transition-all"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {duplicatedReviews.map((review, index) => (
                    <div
                        key={`${review.id}-${index}`}
                        className="flex-shrink-0 w-52 sm:w-72 md:w-80 group"
                    >
                        <div className="relative rounded-2xl overflow-hidden bg-slate-800/30 border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300">
                            <div className="relative aspect-[9/14] sm:aspect-[9/16] bg-slate-900">
                                <video
                                    src={import.meta.env.VITE_API_URL_IMAGES + review.videoReviewFile}
                                    className="w-full h-full object-cover"
                                    loop
                                    playsInline
                                    onClick={(e) => handleVideoClick(review.id, e.currentTarget)}
                                />

                                <div
                                    className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity cursor-pointer ${playingId === review.id ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
                                    onClick={(e) => {
                                        const video = (e.currentTarget.previousElementSibling as HTMLVideoElement);
                                        handleVideoClick(review.id, video);
                                    }}
                                >
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500/90 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                                        {playingId === review.id ? (
                                            <Pause className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                                        ) : (
                                            <Play className="w-5 h-5 sm:w-7 sm:h-7 text-white ml-0.5 sm:ml-1" />
                                        )}
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold text-xs sm:text-sm">
                                                {review.reviewerName}
                                            </h3>
                                            <p className="text-slate-400 text-[10px] sm:text-xs">
                                                {t('videoReviews.student')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex sm:hidden justify-center gap-2 mt-4">
                <button
                    onClick={() => scroll('left')}
                    className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </section >
    );
};

export default VideoReviews;

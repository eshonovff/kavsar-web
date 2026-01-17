import { useTranslation } from 'react-i18next';
import { useState, useRef, type FC } from 'react';
import { User, Star, MessageCircle, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFeedBack } from '../../api/api';

interface FeedbackItem {
    id: number;
    text: string;
    grade: string;
    fullName: string;
    profileImagePath: string | null;
    approved: boolean;
}

interface FeedbackProps {
    data: FeedbackItem[];
}

const FeedbackCard: FC<{ feedback: FeedbackItem }> = ({ feedback }) => {
    return (
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-4">
                {feedback.profileImagePath ? (
                    <img
                        src={import.meta.env.VITE_API_URL_IMAGES + feedback.profileImagePath}
                        alt={feedback.fullName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/30"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500/30 flex items-center justify-center">
                        <User className="w-6 h-6 text-emerald-400" />
                    </div>
                )}
                <div className="flex-1">
                    <h3 className="text-white font-semibold">{feedback.fullName}</h3>
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed line-clamp-4">
                "{feedback.text}"
            </p>
        </div>
    );
};

const Feedback: FC<FeedbackProps> = ({ data }) => {
    const { t, i18n } = useTranslation();
    const queryClient = useQueryClient();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        grade: 5,
        text: ''
    });

    const feedbacks = data && data.length > 0 ? data.filter(f => f.approved) : [];
    const gridFeedbacks = feedbacks.slice(0, 6);
    const scrollFeedbacks = feedbacks.slice(6);

    const mutation = useMutation({
        mutationFn: postFeedBack,
        onSuccess: () => {
            setIsModalOpen(false);
            setFormData({ fullName: '', grade: 5, text: '' });
            queryClient.invalidateQueries({ queryKey: ['feedback'] });
            alert(t('feedback.successMessage'));
        },
        onError: () => {
            alert(t('feedback.errorMessage'));
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const lang = i18n.language.split('-')[0];

        const payload = {
            textTj: lang === 'tj' ? formData.text : '',
            textRu: lang === 'ru' ? formData.text : '',
            textEn: lang === 'en' ? formData.text : '',
            grade: formData.grade,
            fullName: formData.fullName,
            approved: false
        };

        mutation.mutate(payload);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (feedbacks.length === 0 && !isModalOpen) return null;

    return (
        <section className="py-12">
            <div className="text-center mb-12" data-aos="fade-up">
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 font-medium">
                    {t('feedback.badge')}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {t('feedback.title')}
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    {t('feedback.description')}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="100">
                {gridFeedbacks.map((feedback) => (
                    <FeedbackCard key={feedback.id} feedback={feedback} />
                ))}
            </div>

            {scrollFeedbacks.length > 0 && (
                <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-400 text-sm">{t('feedback.moreFeedbacks')}</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:border-emerald-500/30 transition-all"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:border-emerald-500/30 transition-all"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {scrollFeedbacks.map((feedback) => (
                            <div key={feedback.id} className="flex-shrink-0 w-80">
                                <FeedbackCard feedback={feedback} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex justify-center mt-10">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-500/50 transition-all"
                >
                    <MessageCircle className="w-5 h-5" />
                    {t('feedback.leaveReview')}
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-white">
                                    {t('feedback.leaveReview')}
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-1.5 text-white/80 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm text-slate-300 mb-2">
                                    {t('feedback.yourName')}
                                </label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    placeholder={t('feedback.namePlaceholder')}
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-slate-300 mb-2">
                                    {t('feedback.yourRating')}
                                </label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, grade: star })}
                                            className="p-1 transition-transform hover:scale-110"
                                        >
                                            <Star
                                                className={`w-8 h-8 ${star <= formData.grade ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-300 mb-2">
                                    {t('feedback.yourReview')}
                                </label>
                                <textarea
                                    value={formData.text}
                                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                    placeholder={t('feedback.reviewPlaceholder')}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={mutation.isPending}
                                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-slate-900 font-semibold hover:opacity-90 transition-all disabled:opacity-50"
                            >
                                <Check className="w-5 h-5" />
                                {mutation.isPending ? t('feedback.sending') : t('feedback.submitReview')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Feedback;

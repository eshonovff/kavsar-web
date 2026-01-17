import { useTranslation } from 'react-i18next';
import { getNews } from '../../api/api';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Tag } from 'lucide-react';

interface NewsItem {
    id: number;
    title: string;
    summary: string;
    content: string;
    category: string;
    author: string;
    image: string;
    mediaUrl: string;
    likeCount: number;
    createdAt: string;
}

const News = () => {
    const { t, i18n } = useTranslation();

    const { data: newsData, isLoading } = useQuery({
        queryKey: ['news', i18n.language],
        queryFn: () => getNews(i18n.language),
    });

    const news: NewsItem[] = newsData?.data || [];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-12">
            <div className="text-center" data-aos="fade-up">
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 font-medium">
                    {t('nav.news')}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {t('pages.news.title')}
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    {t('pages.news.description')}
                </p>
            </div>

            {news.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item, index) => (
                        <div
                            key={item.id}
                            className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 flex flex-col group"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={import.meta.env.VITE_API_URL_IMAGES + item.mediaUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                                        <Tag className="w-3 h-3" />
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(item.createdAt).toLocaleDateString(i18n.language === 'tj' ? 'tg-TJ' : i18n.language)}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {item.summary}
                                </p>
                                <Link
                                    to={`/news/${item.id}`}
                                    className="mt-auto flex items-center gap-2 text-emerald-400 text-sm font-semibold hover:gap-3 transition-all"
                                >
                                    {t('coursesPreview.moreInfo')}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-800/20 rounded-3xl border border-dashed border-slate-700/50">
                    <p className="text-slate-500">{t('courses.noResults')}</p>
                </div>
            )}
        </div>
    );
};

export default News;

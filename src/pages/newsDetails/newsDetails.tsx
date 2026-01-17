import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { getNewsById } from "../../api/api";

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

const NewsDetails = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();

    const { data: newsData, isLoading } = useQuery({
        queryKey: ['news', id, i18n.language],
        queryFn: () => getNewsById({ id: Number(id), language: i18n.language }),
    });

    const item: NewsItem | null = newsData?.data || null;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!item) {
        return (
            <div className="text-center py-20 bg-slate-800/20 rounded-3xl border border-dashed border-slate-700/50">
                <p className="text-slate-400 mb-6">{t('newsDetails.notFound')}</p>
                <Link
                    to="/news"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:underline"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('newsDetails.backToNews')}
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div data-aos="fade-up">
                <Link
                    to="/news"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('newsDetails.backToNews')}
                </Link>
            </div>

            <article className="space-y-8">
                <div className="relative rounded-3xl overflow-hidden border border-slate-700/50 aspect-video md:aspect-[21/9]" data-aos="fade-up">
                    <img
                        src={import.meta.env.VITE_API_URL_IMAGES + item.mediaUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                </div>

                <div className="space-y-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium flex items-center gap-1.5">
                            <Tag className="w-4 h-4" />
                            {item.category}
                        </span>
                        <div className="flex items-center gap-2 text-slate-500">
                            <Calendar className="w-4 h-4" />
                            {new Date(item.createdAt).toLocaleDateString(i18n.language === 'tj' ? 'tg-TJ' : i18n.language)}
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <User className="w-4 h-4" />
                            {item.author}
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                        {item.title}
                    </h1>
                </div>

                <div
                    className="prose prose-invert prose-emerald max-w-none text-slate-300 leading-relaxed space-y-4"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <p className="text-xl text-slate-400 font-medium italic border-l-4 border-emerald-500 pl-6 py-2">
                        {item.summary}
                    </p>
                    <div className="whitespace-pre-wrap">
                        {item.content}
                    </div>
                </div>
            </article>
        </div>
    );
};

export default NewsDetails;

import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, Download, User, Calendar, Tag } from "lucide-react";
import { getLibraryBookById } from "../../api/api";

interface Book {
    id: number;
    title: string;
    author: string;
    summary: string;
    publicationDate: string;
    description: string;
    category: string;
    imagePath: string;
    bookPdfPath: string;
}

const BookDetails = () => {
    const { id } = useParams();
    const { t } = useTranslation();

    const { data: bookData, isLoading } = useQuery({
        queryKey: ['book', id],
        queryFn: () => getLibraryBookById(Number(id)),
    });

    const book: Book | null = bookData?.data || null;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!book) {
        return (
            <div className="text-center py-20 bg-slate-800/20 rounded-3xl border border-dashed border-slate-700/50">
                <p className="text-slate-400 mb-6">{t('library.noResults')}</p>
                <Link
                    to="/library"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:underline"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('libraryDetails.backToLibrary')}
                </Link>
            </div>
        );
    }

    const handleDownload = () => {
        const fullUrl = import.meta.env.VITE_API_URL_IMAGES + book.bookPdfPath;
        window.open(fullUrl, '_blank');
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            <div data-aos="fade-up">
                <Link
                    to="/library"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('libraryDetails.backToLibrary')}
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 space-y-6" data-aos="fade-right">
                    <div className="relative rounded-3xl overflow-hidden border border-slate-700/50 aspect-[3/4] shadow-2xl shadow-emerald-500/10">
                        <img
                            src={import.meta.env.VITE_API_URL_IMAGES + book.imagePath}
                            alt={book.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40" />
                    </div>

                    <button
                        onClick={handleDownload}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-emerald-500 text-slate-900 rounded-2xl font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
                    >
                        <Download className="w-5 h-5" />
                        {t('libraryDetails.downloadPdf')}
                    </button>
                </div>

                <div className="lg:col-span-2 space-y-8" data-aos="fade-left">
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium flex items-center gap-1.5">
                                <Tag className="w-4 h-4" />
                                {book.category}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            {book.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-8 py-4 border-y border-slate-800/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                    <User className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">{t('libraryDetails.author')}</p>
                                    <p className="text-white font-medium">{book.author}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                    <Calendar className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">{t('libraryDetails.publicationDate')}</p>
                                    <p className="text-white font-medium">{book.publicationDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-emerald-400" />
                                {t('libraryDetails.description')}
                            </h2>
                            <p className="text-lg text-slate-400 font-medium italic border-l-4 border-emerald-500 pl-6 py-2">
                                {book.summary}
                            </p>
                            <div className="prose prose-invert prose-emerald max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
                                {book.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;

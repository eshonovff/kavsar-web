import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { BookOpen, Search, Filter, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getLibraryBook } from '../../api/api';
import { useQuery } from '@tanstack/react-query';

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

const Library = () => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const { data: booksData, isLoading } = useQuery({
        queryKey: ['libraryBooks'],
        queryFn: () => getLibraryBook(),
    });

    const books: Book[] = booksData?.data || [];

    const categories = useMemo(() => {
        const cats = new Set(books.map(book => book.category));
        return ['all', ...Array.from(cats)];
    }, [books]);

    const filteredBooks = useMemo(() => {
        return books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [books, searchQuery, selectedCategory]);


    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            <div className="text-center" data-aos="fade-up">
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 font-medium">
                    {t('nav.library')}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {t('pages.library.title')}
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    {t('library.description')}
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8" data-aos="fade-up">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('library.searchPlaceholder')}
                        className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                </div>
                <div className="relative min-w-[200px]">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full pl-12 pr-10 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white appearance-none focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat} className="bg-slate-900">
                                {cat === 'all' ? t('contactForm.selectOption') : cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredBooks.map((book, index) => (
                        <div
                            key={book.id}
                            className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 flex flex-col group"
                            data-aos="fade-up"
                            data-aos-delay={index * 50}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={import.meta.env.VITE_API_URL_IMAGES + book.imagePath}
                                    alt={book.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                                <div className="absolute top-4 right-4">
                                    <span className="px-2 py-1 rounded bg-emerald-500/20 border border-emerald-500/30 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                                        {book.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                                    {book.title}
                                </h3>
                                <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                                    <User className="w-3 h-3 text-emerald-500" />
                                    {book.author}
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {book.summary}
                                </p>
                                <Link
                                    to={`/library/${book.id}`}
                                    className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-slate-700/50 hover:bg-emerald-500 text-white hover:text-slate-900 rounded-xl transition-all duration-300 font-medium border border-slate-600/50 hover:border-emerald-500 shadow-lg"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    {t('library.moreInfo')}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-800/20 rounded-3xl border border-dashed border-slate-700/50">
                    <p className="text-slate-500">{t('library.noResults')}</p>
                </div>
            )}
        </div>
    );
};

export default Library;

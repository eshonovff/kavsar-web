import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { BookOpen, ArrowRight, Search } from 'lucide-react';
import { getCourses } from '../../api/api';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

interface CourseItem {
    id: number;
    name: string;
    description: string;
    duration: number;
    imagePath: string;
    materials: string[];
    price: number;
}

const Courses = () => {
    const { t, i18n } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');

    const { data: coursesData } = useQuery({
        queryKey: ['courses', i18n.language],
        queryFn: () => getCourses(i18n.language),
    });

    const courses: CourseItem[] = coursesData?.data || [];

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="text-center" data-aos="fade-up">
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 font-medium">
                    {t('pages.courses.title')}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {t('pages.courses.title')}
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    {t('pages.courses.description')}
                </p>
            </div>

            <div className="max-w-md mx-auto" data-aos="fade-up" data-aos-delay="100">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type="text"
                        placeholder={t('courses.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                    <div
                        key={course.id}
                        className="group flex flex-col h-full bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1"
                        data-aos="fade-up"
                        data-aos-delay={index * 50}
                    >
                        <div className="relative h-48 overflow-hidden flex-shrink-0">
                            {course.imagePath ? (
                                <img
                                    src={import.meta.env.VITE_API_URL_IMAGES + course.imagePath}
                                    alt={course.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center">
                                    <BookOpen className="w-12 h-12 text-slate-600" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <span className="inline-block px-3 py-1 bg-emerald-500/90 rounded-lg text-sm text-white font-semibold">
                                    {course.price} TJS
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col flex-grow p-5">
                            <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors h-14">
                                {course.name}
                            </h3>

                            <div className="flex-grow mb-4">
                                {course.materials && course.materials.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                                            <BookOpen className="w-4 h-4" />
                                            <span>{t('courses.materials')}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {course.materials.slice(0, 3).map((material, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-1 text-xs bg-slate-700/50 text-slate-300 rounded-md"
                                                >
                                                    {material.length > 18 ? material.substring(0, 18) + '...' : material}
                                                </span>
                                            ))}
                                            {course.materials.length > 3 && (
                                                <span className="px-2 py-1 text-xs bg-slate-700/50 text-slate-400 rounded-md">
                                                    +{course.materials.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link
                                to={`/courses/${course.id}`}
                                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-emerald-400 font-medium hover:from-emerald-500/20 hover:to-cyan-500/20 transition-all mt-auto"
                            >
                                {t('courses.moreInfo')}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-slate-400">{t('courses.noResults')}</p>
                </div>
            )}
        </div>
    );
};

export default Courses;

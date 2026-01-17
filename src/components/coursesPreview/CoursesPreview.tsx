import { useTranslation } from 'react-i18next';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FC } from 'react';

interface CourseItem {
    id: number;
    name: string;
    description: string;
    duration: number;
    imagePath: string;
    materials: string[];
    price: number;
}

interface CoursesPreviewProps {
    data: CourseItem[];
}

const CoursesPreview: FC<CoursesPreviewProps> = ({ data }) => {
    const { t } = useTranslation();

    const courses = data && data.length > 0 ? data.slice(0, 4) : [];

    if (courses.length === 0) return null;

    return (
        <section className="py-12">
            <div className="flex items-center justify-between mb-8" data-aos="fade-up">
                <div>
                    <span className="inline-block px-4 py-1.5 mb-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 font-medium">
                        {t('coursesPreview.badge')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        {t('coursesPreview.title')}
                    </h2>
                </div>
                <Link
                    to="/courses"
                    className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-500/50 transition-all group"
                >
                    {t('coursesPreview.viewAll')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="group bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1"
                        data-aos="fade-up"
                        data-aos-delay={courses.indexOf(course) * 100}
                    >
                        <div className="relative h-44 overflow-hidden">
                            <img
                                src={import.meta.env.VITE_API_URL_IMAGES + course.imagePath}
                                alt={course.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                        </div>

                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                                {course.name}
                            </h3>

                            {course.materials && course.materials.length > 0 && (
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                                        <BookOpen className="w-4 h-4" />
                                        <span>{t('coursesPreview.materials')}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {course.materials.slice(0, 3).map((material, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 text-xs bg-slate-700/50 text-slate-300 rounded-md"
                                            >
                                                {material.length > 15 ? material.substring(0, 15) + '...' : material}
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

                            <Link
                                to={`/courses/${course.id}`}
                                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-emerald-400 font-medium hover:from-emerald-500/20 hover:to-cyan-500/20 transition-all"
                            >
                                {t('coursesPreview.moreInfo')}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 sm:hidden">
                <Link
                    to="/courses"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-500/50 transition-all"
                >
                    {t('coursesPreview.viewAll')}
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
};

export default CoursesPreview;

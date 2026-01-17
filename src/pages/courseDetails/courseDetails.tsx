import { useParams, Link, useNavigate } from "react-router-dom";
import { getCoursesById } from "../../api/api";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, DollarSign, BookOpen, User, ChevronRight } from "lucide-react";

interface Colleague {
    id: number;
    fullName: string;
    about: string;
    summary: string;
    role: string | null;
    profileImage: string;
}

interface CourseData {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    imagePath: string;
    colleagues: Colleague[];
    materials: string[];
}

const CourseDetails = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const { data: courseData, isLoading } = useQuery({
        queryKey: ['course', id, i18n.language],
        queryFn: () => getCoursesById({ id: Number(id), language: i18n.language }),
    });

    const course: CourseData | null = courseData?.data || null;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-400">{t('courseDetails.notFound')}</p>
                <Link to="/courses" className="text-emerald-400 hover:underline mt-4 inline-block">
                    {t('courseDetails.backToCourses')}
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div data-aos="fade-up">
                <Link
                    to="/courses"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('courseDetails.backToCourses')}
                </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div data-aos="fade-right">
                    <div className="rounded-2xl overflow-hidden border border-slate-700/50">
                        <img
                            src={import.meta.env.VITE_API_URL_IMAGES + course.imagePath}
                            alt={course.name}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>

                <div className="space-y-6" data-aos="fade-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        {course.name}
                    </h1>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                            <DollarSign className="w-5 h-5 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">{course.price} TJS</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                            <Clock className="w-5 h-5 text-slate-400" />
                            <span className="text-slate-300">{course.duration} {t('courseDetails.months')}</span>
                        </div>
                    </div>

                    <p className="text-slate-400 leading-relaxed">
                        {course.description}
                    </p>

                    <button
                        onClick={() => navigate('/contact', { state: { courseName: course.name } })}
                        className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-slate-900 font-semibold hover:opacity-90 transition-all"
                    >
                        {t('courseDetails.enroll')}
                    </button>
                </div>
            </div>

            {course.materials && course.materials.length > 0 && (
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 md:p-8" data-aos="fade-up">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <BookOpen className="w-6 h-6 text-emerald-400" />
                        {t('courseDetails.curriculum')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {course.materials.map((material, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-emerald-500/30 transition-colors"
                                data-aos="fade-up"
                                data-aos-delay={index * 50}
                            >
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-emerald-400 font-semibold text-sm">{index + 1}</span>
                                </div>
                                <span className="text-slate-300">{material}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {course.colleagues && course.colleagues.length > 0 && (
                <div data-aos="fade-up">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <User className="w-6 h-6 text-emerald-400" />
                        {t('courseDetails.instructors')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {course.colleagues.map((colleague, index) => (
                            <div
                                key={colleague.id}
                                className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="flex items-start gap-4">
                                    {colleague.profileImage ? (
                                        <img
                                            src={import.meta.env.VITE_API_URL_IMAGES + colleague.profileImage}
                                            alt={colleague.fullName}
                                            className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-500/30"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-xl bg-emerald-500/20 border-2 border-emerald-500/30 flex items-center justify-center">
                                            <User className="w-8 h-8 text-emerald-400" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            {colleague.fullName}
                                        </h3>
                                        <p className="text-sm text-emerald-400 mb-3">
                                            {colleague.summary}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed mt-4">
                                    {colleague.about}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex justify-center" data-aos="fade-up">
                <Link
                    to="/courses"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
                >
                    {t('courseDetails.viewOtherCourses')}
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};

export default CourseDetails;
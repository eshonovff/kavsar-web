import { useTranslation } from 'react-i18next';
import { useState, type FC } from 'react';
import { User, Phone, Calendar, GraduationCap, ChevronDown, Send, CheckCircle, Clock, Users, Award } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCourses, postRequest } from '../../api/api';

const Enrollment: FC = () => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        find: '',
        question: ''
    });
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { data: coursesData } = useQuery({
        queryKey: ['courses', i18n.language],
        queryFn: () => getCourses(i18n.language),
    });

    const courses = coursesData?.data || [];

    const timeOptions = [
        { value: 'morning', label: t('enrollment.timeOptions.morning') },
        { value: 'afternoon', label: t('enrollment.timeOptions.afternoon') },
        { value: 'evening', label: t('enrollment.timeOptions.evening') },
        { value: 'weekend', label: t('enrollment.timeOptions.weekend') }
    ];

    const mutation = useMutation({
        mutationFn: postRequest,
        onSuccess: () => {
            setFormData({ fullName: '', phone: '', email: '', find: '', question: '' });
            setSelectedCourseId('');
            setSelectedTime('');
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 5000);
        },
        onError: () => {
            alert(t('enrollment.error'));
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const selectedCourse = courses.find((c: any) => c.id.toString() === selectedCourseId);
        const timeOption = timeOptions.find(opt => opt.value === selectedTime);

        const requestData = {
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            find: selectedCourse ? `Курс: ${selectedCourse.title}` : 'enrollment',
            question: `Вақти маъқул: ${timeOption?.label || 'Интихоб нашуд'}. ${formData.question || ''}`
        };

        mutation.mutate(requestData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCourseSelect = (courseId: string) => {
        setSelectedCourseId(courseId);
        setIsDropdownOpen(false);
    };

    const handleTimeSelect = (value: string) => {
        setSelectedTime(value);
        setIsTimeDropdownOpen(false);
    };

    const selectedCourse = courses.find((c: any) => c.id.toString() === selectedCourseId);
    const selectedTimeOption = timeOptions.find(opt => opt.value === selectedTime);

    const benefits = [
        { icon: GraduationCap, title: t('enrollment.benefits.certificate.title'), desc: t('enrollment.benefits.certificate.desc') },
        { icon: Users, title: t('enrollment.benefits.groups.title'), desc: t('enrollment.benefits.groups.desc') },
        { icon: Clock, title: t('enrollment.benefits.flexible.title'), desc: t('enrollment.benefits.flexible.desc') },
        { icon: Award, title: t('enrollment.benefits.practice.title'), desc: t('enrollment.benefits.practice.desc') }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-20 pb-32">
            <div className="container mx-auto px-4">

                <div className="text-center mb-12" data-aos="fade-up">
                    <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 font-medium">
                        {t('enrollment.badge')}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        {t('enrollment.title')}
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
                        {t('enrollment.description')}
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" data-aos="fade-up" data-aos-delay="100">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 text-center hover:border-emerald-500/30 transition-all"
                        >
                            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                <benefit.icon className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-white font-semibold text-sm mb-1">{benefit.title}</h3>
                            <p className="text-slate-400 text-xs">{benefit.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">

                    <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 md:p-8" data-aos="fade-right">
                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {t('enrollment.successTitle')}
                                </h3>
                                <p className="text-slate-400 mb-6">
                                    {t('enrollment.successMessage')}
                                </p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="px-6 py-3 bg-emerald-500/20 text-emerald-400 rounded-xl font-medium hover:bg-emerald-500/30 transition-all"
                                >
                                    {t('enrollment.newEnrollment')}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <h2 className="text-xl font-bold text-white mb-6">
                                    {t('enrollment.formTitle')}
                                </h2>

                                <div>
                                    <label className="block text-sm text-slate-300 mb-2">
                                        {t('enrollment.name')}
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder={t('enrollment.namePlaceholder')}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-300 mb-2">
                                        {t('enrollment.phone')}
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+992 XXX-XX-XX"
                                            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                            required
                                        />
                                    </div>
                                </div>


                                <div>
                                    <label className="block text-sm text-slate-300 mb-2">
                                        {t('enrollment.course')}
                                    </label>
                                    <div className="relative">
                                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 z-10" />
                                        <button
                                            type="button"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="w-full pl-12 pr-12 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-left text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                        >
                                            {selectedCourse ? selectedCourse.title : t('enrollment.selectCourse')}
                                        </button>
                                        <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />

                                        {isDropdownOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden z-20 shadow-xl max-h-60 overflow-y-auto">
                                                {courses.map((course: any) => (
                                                    <button
                                                        key={course.id}
                                                        type="button"
                                                        onClick={() => handleCourseSelect(course.id.toString())}
                                                        className="w-full px-4 py-3 text-left text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors flex items-center gap-3"
                                                    >
                                                        <GraduationCap className="w-4 h-4 text-emerald-400" />
                                                        {course.title}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-300 mb-2">
                                        {t('enrollment.time')}
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 z-10" />
                                        <button
                                            type="button"
                                            onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                                            className="w-full pl-12 pr-12 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-left text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                        >
                                            {selectedTimeOption ? selectedTimeOption.label : t('enrollment.selectTime')}
                                        </button>
                                        <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 transition-transform ${isTimeDropdownOpen ? 'rotate-180' : ''}`} />

                                        {isTimeDropdownOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden z-20 shadow-xl">
                                                {timeOptions.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() => handleTimeSelect(option.value)}
                                                        className="w-full px-4 py-3 text-left text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                                                    >
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={mutation.isPending}
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-slate-900 font-semibold hover:opacity-90 transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50"
                                >
                                    <Send className="w-5 h-5" />
                                    {mutation.isPending ? t('enrollment.sending') : t('enrollment.submit')}
                                </button>

                                <p className="text-center text-xs text-slate-500">
                                    {t('enrollment.privacyNote')}
                                </p>
                            </form>
                        )}
                    </div>

                    <div className="space-y-6" data-aos="fade-left">
                        <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-2xl p-6 md:p-8">
                            <h3 className="text-xl font-bold text-white mb-4">
                                {t('enrollment.whyEnroll')}
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-300 text-sm">{t('enrollment.reasons.reason1')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-300 text-sm">{t('enrollment.reasons.reason2')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-300 text-sm">{t('enrollment.reasons.reason3')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-300 text-sm">{t('enrollment.reasons.reason4')}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 md:p-8">
                            <h3 className="text-xl font-bold text-white mb-4">
                                {t('enrollment.contactTitle')}
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs">{t('enrollment.callUs')}</p>
                                        <a href="tel:+992205122525" className="text-white hover:text-emerald-400 transition-colors font-medium">
                                            +992 (205) 12 25 25
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs">{t('enrollment.workingHours')}</p>
                                        <p className="text-white font-medium">09:00 - 21:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Enrollment;

import { useTranslation } from 'react-i18next';
import { useState, useEffect, type FC } from 'react';
import { User, Phone, Mail, MessageSquare, Send, MapPin, Instagram, Facebook, ChevronDown } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { postRequest } from '../../api/api';
import kavsar from '/kavsar.jpg'

const ContactForm: FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        find: '',
        question: ''
    });

    useEffect(() => {
        const state = location.state as { courseName?: string };
        if (state?.courseName) {
            setFormData(prev => ({
                ...prev,
                question: t('contactForm.courseInquiry', { courseName: state.courseName })
            }));
        }
    }, [location.state, t]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const findOptions = [
        { value: 'instagram', label: 'Instagram' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'telegram', label: 'Telegram' },
        { value: 'friends', label: t('contactForm.options.friends') },
        { value: 'other', label: t('contactForm.options.other') }
    ];

    const mutation = useMutation({
        mutationFn: postRequest,
        onSuccess: () => {
            setFormData({ fullName: '', phone: '', email: '', find: '', question: '' });
            alert(t('contactForm.success'));
        },
        onError: () => {
            alert(t('contactForm.error'));
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFindSelect = (value: string) => {
        setFormData({ ...formData, find: value });
        setIsDropdownOpen(false);
    };

    const selectedFind = findOptions.find(opt => opt.value === formData.find);

    return (
        <section id="contact-form" className="py-12">
            <div className="text-center mb-12" data-aos="fade-up">
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 font-medium">
                    {t('contactForm.badge')}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {t('contactForm.title')}
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    {t('contactForm.description')}
                </p>
                <p className="text-lg text-emerald-400 font-medium mt-3">
                    {t('contactForm.freeLesson')}
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 md:p-8" data-aos="fade-right">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm text-slate-300 mb-2">
                                {t('contactForm.name')}
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder={t('contactForm.namePlaceholder')}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-300 mb-2">
                                {t('contactForm.phone')}
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
                                {t('contactForm.email')}
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@domain.com"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-300 mb-2">
                                {t('contactForm.findUs')}
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full pl-4 pr-12 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-left text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                >
                                    {selectedFind ? selectedFind.label : t('contactForm.selectOption')}
                                </button>
                                <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />

                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden z-10 shadow-xl">
                                        {findOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => handleFindSelect(option.value)}
                                                className="w-full px-4 py-3 text-left text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-300 mb-2">
                                {t('contactForm.message')}
                            </label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
                                <textarea
                                    name="question"
                                    value={formData.question}
                                    onChange={handleChange}
                                    placeholder={t('contactForm.messagePlaceholder')}
                                    rows={4}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-slate-900 font-semibold hover:opacity-90 transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50"
                        >
                            <Send className="w-5 h-5" />
                            {mutation.isPending ? t('contactForm.sending') : t('contactForm.submit')}
                        </button>

                        <p className="text-center text-xs text-slate-500">
                            {t('contactForm.privacyNote')}
                        </p>
                    </form>
                </div>

                <div className="relative rounded-2xl overflow-hidden min-h-[500px]" data-aos="fade-left">
                    <img
                        src={kavsar}
                        alt="Office"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Phone className="w-5 h-5 text-emerald-400" />
                                {t('contactForm.contactUs')}
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-emerald-400 mt-1" />
                                    <div>
                                        <p className="text-slate-400 text-sm">{t('contactForm.phoneLabel')}</p>
                                        <a href="tel:+992205122525" className="text-white hover:text-emerald-400 transition-colors">+992 (205) 12 25 25</a>
                                        <br />
                                        <a href="tel:+992985788444" className="text-white hover:text-emerald-400 transition-colors">+992 (985) 78 84 44</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-emerald-400 mt-1" />
                                    <div>
                                        <p className="text-slate-400 text-sm">{t('contactForm.emailLabel')}</p>
                                        <a href="mailto:korvonihunar@gmail.com" className="text-white hover:text-emerald-400 transition-colors">korvonihunar@gmail.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-emerald-400 mt-1" />
                                    <div>
                                        <p className="text-slate-400 text-sm">{t('contactForm.addressLabel')}</p>
                                        <p className="text-white">{t('contactForm.address')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6 pt-4 border-t border-slate-700/50">
                                <a href="https://www.instagram.com/kavsaracademy.tj?igsh=Ymp1NTJ4c3Vva3B4" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 transition-all">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="https://www.facebook.com/kavsaracademy.tj?mibextid=wwXIfr&rdid=QX1AiMoysqtLu85Q&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F15ptZjZuSa%2F%3Fmibextid%3DwwXIfr#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 transition-all">
                                    <Facebook className="w-5 h-5" />
                                </a>

                                <a href="https://t.me/KavsarAcademy" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 transition-all">
                                    <Send className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;

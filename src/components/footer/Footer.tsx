import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import logo from '/logo2.png';

const Footer = () => {
    const { t } = useTranslation();

    const quickLinks = [
        { path: '/', label: t('nav.home') },
        { path: '/courses', label: t('nav.courses') },
        { path: '/news', label: t('nav.news') },
        { path: '/library', label: t('nav.library') },
        { path: '/about', label: t('nav.about') },
    ];

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Youtube, href: '#', label: 'YouTube' },
        { icon: Send, href: '#', label: 'Telegram' },
    ];

    return (
        <footer className="bg-surface-50 border-t text-gray-400 border-surface-200 transition-colors duration-500">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    <div className="space-y-8">
                        <Link to="/" className="inline-block group">
                            <img src={logo} alt="Kavsar" className="h-auto w-30 transition-transform duration-500 group-hover:scale-110" />
                        </Link>
                        <p className="text-surface-800 text-sm leading-relaxed transition-colors font-medium">
                            {t('footer.newsletterDesc')}
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-12 h-12 rounded-2xl bg-surface-100 flex items-center justify-center text-surface-700 hover:text-white hover:bg-emerald-500 transition-all duration-300 shadow-sm"
                                >
                                    <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-surface-950 font-bold text-lg mb-8 uppercase tracking-widest transition-colors">{t('footer.quickLinks')}</h3>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="group flex items-center gap-2 text-surface-800 hover:text-emerald-400 text-sm transition-all font-bold"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-surface-950 font-bold text-lg mb-8 uppercase tracking-widest transition-colors">{t('footer.contact')}</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 text-surface-800 text-sm transition-colors group">
                                <div className="p-2.5 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                                    <MapPin className="w-5 h-5 text-emerald-500" />
                                </div>
                                <span className="font-medium pt-1">Dushanbe, Tajikistan</span>
                            </li>
                            <li className="flex items-center gap-4 text-surface-800 text-sm transition-colors group">
                                <div className="p-2.5 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                                    <Phone className="w-5 h-5 text-emerald-500" />
                                </div>
                                <a href="tel:+992205122525" className="hover:text-emerald-400 transition-colors font-bold text-base">
                                    +992 205-12-25-25
                                </a>
                            </li>
                            <li className="flex items-center gap-4 text-surface-800 text-sm transition-colors group">
                                <div className="p-2.5 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                                    <Mail className="w-5 h-5 text-emerald-500" />
                                </div>
                                <a href="mailto:korvonihunar@gmail.com" className="hover:text-emerald-400 transition-colors font-bold text-base">
                                   korvonihunar@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-surface-950 font-bold text-lg mb-8 uppercase tracking-widest transition-colors">{t('footer.newsletter')}</h3>
                        <p className="text-surface-800 text-sm mb-6 transition-colors font-medium">
                            {t('footer.newsletterDesc')}
                        </p>
                        <form className="relative group">
                            <input
                                type="email"
                                placeholder={t('footer.emailPlaceholder')}
                                className="w-full pl-6 pr-16 py-4 bg-surface-100 border border-surface-200 rounded-2xl text-sm text-surface-950 placeholder-surface-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 px-4 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-surface-200 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-surface-700 text-sm transition-colors font-bold uppercase tracking-widest text-center md:text-left">
                        {t('footer.copyright')}
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-surface-700 hover:text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] transition-colors">
                            {t('footer.privacyPolicy')}
                        </a>
                        <a href="#" className="text-surface-700 hover:text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] transition-colors">
                            {t('footer.termsOfService')}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

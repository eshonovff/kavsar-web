import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Home, BookOpen, Newspaper, Library, Info } from 'lucide-react';
import logo from '/logo2.png';

const Header = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { path: '/', label: t('nav.home'), icon: Home },
        { path: '/courses', label: t('nav.courses'), icon: BookOpen },
        { path: '/news', label: t('nav.news'), icon: Newspaper },
        { path: '/library', label: t('nav.library'), icon: Library },
        { path: '/about', label: t('nav.about'), icon: Info },
    ];

    const languages = [
        { code: 'tj', label: 'TJ' },
        { code: 'ru', label: 'RU' },
        { code: 'en', label: 'EN' },
    ];

    const currentLang = i18n.language.split('-')[0];

    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setIsMobileMenuOpen(false);
    };

    const isActiveLink = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const handleEnrollClick = () => {
        if (location.pathname === '/') {
            const element = document.getElementById('contact-form');
            element?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/contact');
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-[500] backdrop-blur-xl bg-slate-900/80 border-b border-slate-800/50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img src={logo} alt="Kavsar" className="h-25 w-auto" />
                        </Link>

                        <nav className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveLink(link.path)
                                        ? 'text-white bg-slate-800/80'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="hidden lg:flex items-center gap-4">
                            <div className="flex items-center gap-1 bg-slate-800/50 rounded-lg p-1">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${currentLang === lang.code
                                            ? 'bg-emerald-500/20 text-emerald-400'
                                            : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleEnrollClick}
                                className="px-5 py-2 text-sm font-medium text-slate-900 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/25"
                            >
                                {t('auth.signUp')}
                            </button>
                        </div>

                        <div className="flex lg:hidden items-center gap-3">
                            <div className="hidden sm:flex items-center gap-1 bg-slate-800/50 rounded-lg p-1">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${currentLang === lang.code
                                            ? 'bg-emerald-500/20 text-emerald-400'
                                            : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleEnrollClick}
                                className="hidden sm:block px-4 py-1.5 text-xs font-medium text-slate-900 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-lg hover:opacity-90 transition-opacity"
                            >
                                {t('auth.signUp')}
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="sm:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {isMobileMenuOpen && (
                        <div className="sm:hidden py-4 border-t border-slate-800/50">
                            <div className="space-y-3 px-2">
                                <div className="flex gap-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => changeLanguage(lang.code)}
                                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentLang === lang.code
                                                ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30'
                                                : 'text-slate-400 bg-slate-800/50 hover:text-white'
                                                }`}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={handleEnrollClick}
                                    className="w-full py-2.5 text-sm font-medium text-slate-900 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    {t('auth.signUp')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </header>


            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">

                <div
                    className="absolute inset-0 backdrop-blur-2xl bg-white/10"
                    style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
                        boxShadow: '0 -1px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
                        borderTop: '0.5px solid rgba(255,255,255,0.18)',
                    }}
                />

                <div className="relative flex items-center justify-around h-20 pb-1 max-w-lg mx-auto px-2">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = isActiveLink(link.path);
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="flex flex-col items-center justify-center gap-0.5 px-4 py-2 transition-all duration-200 ease-out"
                            >
                                <div className={`p-1.5 rounded-2xl transition-all duration-300 ${isActive
                                    ? 'bg-gradient-to-br from-green-500/25 to-cyan-400/20 shadow-lg shadow-green-500/20'
                                    : ''
                                    }`}>
                                    <Icon
                                        className={`w-6 h-6 transition-all duration-200 ${isActive
                                            ? 'text-green-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                                            : 'text-gray-400'
                                            }`}
                                        strokeWidth={isActive ? 2.5 : 1.8}
                                    />
                                </div>
                                <span className={`text-[10px] font-semibold tracking-tight transition-all duration-200 ${isActive
                                    ? 'text-green-400'
                                    : 'text-gray-500'
                                    }`}>
                                    {link.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
};

export default Header;

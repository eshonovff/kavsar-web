import { useTranslation } from 'react-i18next';
import { type FC } from 'react';
import { Phone, MapPin, Mail, Clock, Navigation, PhoneCall } from 'lucide-react';

const LocationMap: FC = () => {
    const { t } = useTranslation();

    return (
        <section className="py-12">
            <div className="text-center mb-10" data-aos="fade-up">
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 font-medium">
                    {t('location.badge')}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {t('location.title')}
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    {t('location.description')}
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="rounded-2xl overflow-hidden border border-slate-700/50 h-[400px] lg:h-auto" data-aos="fade-right">
                    <iframe
                        src="https://www.google.com/maps?q=38.548866,68.760221&z=17&output=embed"
                        width="100%"
                        height="100%"
                        className="border-0 min-h-[400px]"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 md:p-8" data-aos="fade-left">
                    <h3 className="text-xl font-bold text-white mb-6">
                        {t('location.contactInfo')}
                    </h3>

                    <div className="space-y-5">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                <Phone className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm mb-1">{t('location.phone')}</p>
                                <a href="tel:+992205122525" className="text-white hover:text-emerald-400 transition-colors block">
                                    +992 205 12 25 25
                                </a>
                                <a href="tel:+992985788444" className="text-white hover:text-emerald-400 transition-colors block">
                                    +992 985 78 84 44
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm mb-1">{t('location.address')}</p>
                                <p className="text-white">{t('location.addressValue')}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                <Mail className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm mb-1">E-mail</p>
                                <a href="mailto:korvonihunar@gmail.com" className="text-white hover:text-emerald-400 transition-colors">
                                    korvonihunar@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <a
                            href="tel:+992205122525"
                            className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-slate-900 font-semibold hover:opacity-90 transition-all"
                        >
                            <PhoneCall className="w-5 h-5" />
                            {t('location.call')}
                        </a>
                        <a
                            href="https://www.google.com/maps/dir//38.548866,68.760221"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-3 border border-slate-700 rounded-xl text-slate-300 hover:text-white hover:border-emerald-500/50 transition-all"
                        >
                            <Navigation className="w-5 h-5" />
                            {t('location.route')}
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/30 border border-slate-700/50 rounded-full" data-aos="fade-up">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    <span className="text-slate-400">{t('location.workingHours')}:</span>
                    <span className="text-white font-medium">{t('location.workingHoursValue')}</span>
                </div>
            </div>
        </section>
    );
};

export default LocationMap;

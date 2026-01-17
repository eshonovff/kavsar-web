import { useTranslation } from 'react-i18next';
import { CheckCircle, Award, Users, BookOpen, Clock, Headphones } from 'lucide-react';
import type { FC } from 'react';

interface ChooseUsItem {
    id: number;
    title: string;
    description: string;
    icon?: string;
}

interface ChooseUsProps {
    data: ChooseUsItem[];
}

const defaultIcons = [Award, Users, BookOpen, Clock, Headphones, CheckCircle];

const ChooseUs: FC<ChooseUsProps> = ({ data }) => {
    const { t } = useTranslation();

    const items = data && data.length > 0 ? data : [];

    return (
        <section className="py-8">
            <div className="text-center mb-12" data-aos="fade-up">
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 font-medium">
                    {t('chooseUs.badge')}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {t('chooseUs.title')}{' '}
                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        {t('chooseUs.titleHighlight')}
                    </span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    {t('chooseUs.description')}
                </p>
            </div>

            {items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => {
                        const IconComponent = defaultIcons[index % defaultIcons.length];
                        return (
                            <div
                                key={item.id}
                                className="group relative p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300 hover:-translate-y-1"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <IconComponent className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default ChooseUs;

import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Colleague } from '../../types/colleague';

interface DirectorCardProps {
    director: Colleague;
}

const DirectorCard: FC<DirectorCardProps> = ({ director }) => {
    const { t } = useTranslation();

    return (
        <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <div className="group relative bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden hover:border-emerald-500/30 transition-all duration-500">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center p-6 md:p-12">
                    <div className="relative aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl">
                        <img
                            src={import.meta.env.VITE_API_URL_IMAGES + director.profileImagePath}
                            alt={director.fullName}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                            <span className="px-3 py-1 md:px-4 md:py-1.5 bg-emerald-500 text-slate-950 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full">
                                {t('pages.about.team.director')}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-4 md:space-y-6 text-left">
                        <div className="space-y-1 md:space-y-2">
                            <h3 className="text-xl md:text-4xl font-bold text-white text-center md:text-left leading-tight">{director.fullName}</h3>
                            <p className="text-emerald-400 font-medium text-xs md:text-lg uppercase tracking-wide text-center md:text-left">{director.summary}</p>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-sm md:text-lg line-clamp-4 md:line-clamp-6 text-center md:text-left">{director.aboute}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 pt-2 md:pt-4">
                            <Link
                                to={`/teacher/${director.id}`}
                                className="px-6 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl text-sm font-bold transition-all border border-emerald-500/20"
                            >
                                {t('teacherDetails.aboutTitle')}
                            </Link>

                            {director.knowingIcons?.slice(0, 4).map((icon, idx) => (
                                <div key={idx} className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-slate-700/30 p-1.5 md:p-2 flex items-center justify-center border border-slate-600/30 hover:border-emerald-500/50 transition-colors">
                                    <img src={import.meta.env.VITE_API_URL_IMAGES + icon} alt="skill" className="w-full h-full object-contain filter brightness-90 group-hover:brightness-100" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DirectorCard;

import { type FC } from 'react';
import { Link } from 'react-router-dom';
import type { Colleague } from '../../types/colleague';

interface TeamMemberCardProps {
    member: Colleague;
    index: number;
}

const TeamMemberCard: FC<TeamMemberCardProps> = ({ member, index }) => {
    return (
        <Link
            to={`/teacher/${member.id}`}
            className="group block bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 hover:border-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-cyan-500/5 flex flex-col h-full"
            data-aos="fade-up"
            data-aos-delay={index * 100}
        >
            <div className="relative aspect-[4/5] rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6">
                <img
                    src={import.meta.env.VITE_API_URL_IMAGES + member.profileImagePath}
                    alt={member.fullName}
                    className="w-full h-full object-cover filter md:grayscale md:group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="space-y-2 md:space-y-3 flex-1 flex flex-col">
                <div className="space-y-1 text-center">
                    <h4 className="text-base md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">{member.fullName}</h4>
                    <p className="text-[10px] md:text-xs text-cyan-500 font-semibold uppercase tracking-wider">{member.summary}</p>
                </div>
                <p className="text-[11px] md:text-sm text-slate-400 line-clamp-3 md:line-clamp-4 text-center italic flex-1">
                    "{member.aboute}"
                </p>
                <div className="flex justify-center flex-wrap gap-2 pt-3 md:pt-4 border-t border-slate-700/50">
                    {member.knowingIcons?.slice(0, 4).map((icon, idx) => (
                        <img
                            key={idx}
                            src={import.meta.env.VITE_API_URL_IMAGES + icon}
                            alt="skill"
                            className="w-5 h-5 md:w-6 md:h-6 object-contain opacity-50 group-hover:opacity-100 transition-opacity"
                        />
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default TeamMemberCard;

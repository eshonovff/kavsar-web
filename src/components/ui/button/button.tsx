import { Loader2 } from 'lucide-react';
import { type FC, useState } from 'react';
import { type ButtonProps, sizeClasses, variantClasses } from "./button.ts";

type Ripple = {
    x: number;
    y: number;
    size: number;
    id: number;
};

const Button: FC<ButtonProps> = ({
    type = 'button',
    children,
    size = 'md',
    variant = 'primary',
    startIcon,
    endIcon,
    onClick,
    className = '',
    disabled = false,
    isPending = false,
}) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || isPending) return;

        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const rippleSize = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - rippleSize / 2;
        const y = e.clientY - rect.top - rippleSize / 2;

        const newRipple: Ripple = {
            x,
            y,
            size: rippleSize,
            id: Date.now(),
        };

        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
        }, 600);

        if (onClick) {
            onClick(e);
        }
    };

    return (
        <button
            type={type}
            className={`relative cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg transition overflow-hidden ${className} ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={handleClick}
            disabled={disabled || isPending}>
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className="absolute rounded-full bg-white/30 pointer-events-none animate-ping"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                        animationDuration: '0.6s',
                        animationFillMode: 'forwards',
                    }}
                />
            ))}

            {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <>
                    {startIcon && <span className="flex items-center">{startIcon}</span>}
                    {children}
                    {endIcon && <span className="flex items-center">{endIcon}</span>}
                </>
            )}
        </button>
    );
};

export default Button;

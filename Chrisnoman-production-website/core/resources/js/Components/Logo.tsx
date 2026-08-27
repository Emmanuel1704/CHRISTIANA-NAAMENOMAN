interface LogoProps {
    className?: string;
    variant?: 'dark' | 'light';
    size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', variant = 'dark', size = 'md' }: LogoProps) {
    const primaryColor = variant === 'dark' ? '#1a1a1a' : '#ffffff';
    const goldColor = '#C8A55C';

    const sizeMap = {
        sm: { height: 40, monogram: 18, title: 13, subtitle: 6 },
        md: { height: 56, monogram: 24, title: 18, subtitle: 8 },
        lg: { height: 72, monogram: 32, title: 24, subtitle: 10 },
    };

    const s = sizeMap[size];

    return (
        <div className={`flex items-center gap-3 select-none ${className}`}>
            {/* CN Monogram */}
            <svg
                width={s.height}
                height={s.height}
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Outer ring */}
                <circle cx="40" cy="40" r="38" stroke={goldColor} strokeWidth="2.5" />
                {/* Inner ring */}
                <circle cx="40" cy="40" r="32" stroke={goldColor} strokeWidth="0.8" opacity="0.5" />
                
                {/* Letter C */}
                <text
                    x="25"
                    y="50"
                    fontFamily="Georgia, 'Times New Roman', serif"
                    fontSize="30"
                    fontWeight="bold"
                    fill={primaryColor}
                    letterSpacing="-2"
                >
                    C
                </text>
                
                {/* Letter N */}
                <text
                    x="42"
                    y="50"
                    fontFamily="Georgia, 'Times New Roman', serif"
                    fontSize="30"
                    fontWeight="bold"
                    fill={goldColor}
                    letterSpacing="-2"
                >
                    N
                </text>

                {/* Small diamond accent */}
                <rect
                    x="38"
                    y="58"
                    width="4"
                    height="4"
                    fill={goldColor}
                    transform="rotate(45, 40, 60)"
                />
            </svg>

            {/* Brand Text */}
            <div className="flex flex-col">
                <span
                    style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontSize: `${s.title}px`,
                        fontWeight: 800,
                        letterSpacing: '0.25em',
                        color: primaryColor,
                        lineHeight: 1.2,
                    }}
                >
                    CHRISNOMAN
                </span>
                <span
                    style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontSize: `${s.subtitle}px`,
                        fontWeight: 400,
                        letterSpacing: '0.45em',
                        color: goldColor,
                        lineHeight: 1.8,
                        textTransform: 'uppercase',
                    }}
                >
                    Fashion House
                </span>
            </div>
        </div>
    );
}

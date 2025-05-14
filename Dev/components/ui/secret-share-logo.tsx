interface LogoProps {
  variant: "primary" | "horizontal" | "icon";
  darkMode: boolean;
}

export function SecretShareLogo({ variant, darkMode }: LogoProps) {
  const textColor = darkMode ? "#ffffff" : "#0f172a";
  const primaryColor = "#3b82f6"; // Blue
  const secondaryColor = darkMode ? "#60a5fa" : "#1d4ed8"; // Lighter blue for dark mode, darker for light

  if (variant === "icon") {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill={primaryColor} opacity="0.1" />
        <path
          d="M50 20C38.954 20 30 28.954 30 40V45H35V40C35 31.716 41.716 25 50 25C58.284 25 65 31.716 65 40V55H30V80H70V55H70V40C70 28.954 61.046 20 50 20Z"
          fill={primaryColor}
        />
        <rect
          x="35"
          y="60"
          width="30"
          height="15"
          rx="2"
          fill={secondaryColor}
        />
        <path
          d="M50 65C48.343 65 47 66.343 47 68C47 69.657 48.343 71 50 71C51.657 71 53 69.657 53 68C53 66.343 51.657 65 50 65Z"
          fill={darkMode ? "#ffffff" : "#0f172a"}
        />
        <path
          d="M65 40L75 30M75 30L85 40M75 30V50"
          stroke={secondaryColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M35 40L25 30M25 30L15 40M25 30V50"
          stroke={secondaryColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === "horizontal") {
    return (
      <svg viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <circle cx="40" cy="40" r="40" fill={primaryColor} opacity="0.1" />
          <path
            d="M40 16C31.163 16 24 23.163 24 32V36H28V32C28 25.373 33.373 20 40 20C46.627 20 52 25.373 52 32V44H24V64H56V44H56V32C56 23.163 48.837 16 40 16Z"
            fill={primaryColor}
          />
          <rect
            x="28"
            y="48"
            width="24"
            height="12"
            rx="2"
            fill={secondaryColor}
          />
          <path
            d="M40 52C38.674 52 37.6 53.074 37.6 54.4C37.6 55.726 38.674 56.8 40 56.8C41.326 56.8 42.4 55.726 42.4 54.4C42.4 53.074 41.326 52 40 52Z"
            fill={darkMode ? "#ffffff" : "#0f172a"}
          />
          <path
            d="M52 32L60 24M60 24L68 32M60 24V40"
            stroke={secondaryColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 32L20 24M20 24L12 32M20 24V40"
            stroke={secondaryColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        <text
          x="90"
          y="48"
          fontFamily="'Source Code Pro', monospace"
          fontWeight="700"
          fontSize="28"
          fill={textColor}
        >
          SecretShare
        </text>
        <text
          x="90"
          y="64"
          fontFamily="'Inter', sans-serif"
          fontWeight="400"
          fontSize="14"
          fill={darkMode ? "#94a3b8" : "#64748b"}
        >
          Secure. Private. Encrypted.
        </text>
      </svg>
    );
  }

  // Default primary logo
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="100" fill={primaryColor} opacity="0.1" />
      <g transform="translate(50, 40)">
        <path
          d="M50 16C38.954 16 30 24.954 30 36V41H35V36C35 27.716 41.716 21 50 21C58.284 21 65 27.716 65 36V51H30V76H70V51H70V36C70 24.954 61.046 16 50 16Z"
          fill={primaryColor}
        />
        <rect
          x="35"
          y="56"
          width="30"
          height="15"
          rx="2"
          fill={secondaryColor}
        />
        <path
          d="M50 61C48.343 61 47 62.343 47 64C47 65.657 48.343 67 50 67C51.657 67 53 65.657 53 64C53 62.343 51.657 61 50 61Z"
          fill={darkMode ? "#ffffff" : "#0f172a"}
        />
        <path
          d="M65 36L75 26M75 26L85 36M75 26V46"
          stroke={secondaryColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M35 36L25 26M25 26L15 36M25 26V46"
          stroke={secondaryColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <text
        x="100"
        y="140"
        fontFamily="'Source Code Pro', monospace"
        fontWeight="700"
        fontSize="18"
        fill={textColor}
        textAnchor="middle"
      >
        SecretShare
      </text>
      <text
        x="100"
        y="160"
        fontFamily="'Inter', sans-serif"
        fontWeight="400"
        fontSize="12"
        fill={darkMode ? "#94a3b8" : "#64748b"}
        textAnchor="middle"
      >
        Secure. Private. Encrypted.
      </text>
    </svg>
  );
}

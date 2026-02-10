interface PixelButtonProps {
  children?: React.ReactNode;
  color?: string;
  hover?: boolean;
  /** When true, button uses accent color as fill (default); outline on hover. Prevents white flash when swapping nav state. */
  filled?: boolean;
  onClick?: () => void;
}

export function PixelButton({
  children,
  color = '#fff',
  hover = false,
  filled = false,
  onClick,
}: PixelButtonProps) {
  const defaultBg = filled ? color : 'transparent';
  const defaultText = filled ? '#000' : color;

  return (
    <button
      onClick={onClick}
      className={`inline-block cursor-pointer select-none border-2 px-2 py-1 text-[16px] tracking-[0.04em]${
        hover ? ' transition-colors duration-150' : ''
      }`}
      style={{
        backgroundColor: defaultBg,
        borderColor: color,
        color: defaultText,
        boxShadow: `2px 2px 0 0 ${color}`,
      }}
      onMouseEnter={
        hover
          ? (e) => {
              if (filled) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = color;
              } else {
                e.currentTarget.style.backgroundColor = color;
                e.currentTarget.style.color = '#000';
              }
            }
          : undefined
      }
      onMouseLeave={
        hover
          ? (e) => {
              e.currentTarget.style.backgroundColor = defaultBg;
              e.currentTarget.style.color = defaultText;
            }
          : undefined
      }
    >
      {children}
    </button>
  );
}

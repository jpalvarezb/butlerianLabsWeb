interface PixelButtonProps {
  children?: React.ReactNode;
  color?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function PixelButton({
  children,
  color = '#fff',
  hover = false,
  onClick,
}: PixelButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-block cursor-pointer select-none border-2 bg-transparent px-2 py-1 text-[16px] tracking-[0.04em]${
        hover ? ' transition-colors duration-150' : ''
      }`}
      style={{
        borderColor: color,
        color: color,
        boxShadow: `2px 2px 0 0 ${color}`,
      }}
      onMouseEnter={
        hover
          ? (e) => {
              e.currentTarget.style.backgroundColor = color;
              e.currentTarget.style.color = '#000';
            }
          : undefined
      }
      onMouseLeave={
        hover
          ? (e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = color;
            }
          : undefined
      }
    >
      {children}
    </button>
  );
}

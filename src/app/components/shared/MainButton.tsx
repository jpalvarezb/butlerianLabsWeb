import { Link } from 'react-router-dom';
import { cn } from '@/app/components/ui/utils';

interface MainButtonProps {
  children?: React.ReactNode;
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const baseStyles =
  'inline-block border-2 border-white px-6 sm:px-8 py-3 text-[11px] tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black';

export function MainButton({
  children,
  href,
  type,
  disabled,
  onClick,
  className,
}: MainButtonProps) {
  const styles = cn(baseStyles, className);

  if (href) {
    // Use native <a> for hash links (anchor scroll)
    if (href.startsWith('#')) {
      return (
        <a href={href} className={styles}>
          {children}
        </a>
      );
    }

    return (
      <Link to={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type ?? 'button'}
      disabled={disabled}
      onClick={onClick}
      className={cn(styles, disabled && 'opacity-40 pointer-events-none')}
    >
      {children}
    </button>
  );
}

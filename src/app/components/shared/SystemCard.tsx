import { Link } from 'react-router-dom';
import { cn } from '@/app/components/ui/utils';
import { PixelButton } from './PixelButton';

interface SystemCardProps {
  id: string;
  title: string;
  children?: React.ReactNode;
  buttonLabel?: string;
  buttonColor?: string;
  buttonHover?: boolean;
  buttonHref?: string;
  className?: string;
}

export function SystemCard({
  id,
  title,
  children,
  buttonLabel,
  buttonColor = '#fff',
  buttonHover = false,
  buttonHref,
  className,
}: SystemCardProps) {
  return (
    <div className={cn('flex flex-col border border-white/20 p-6', className)}>
      <div className="mb-4 text-[13px] tracking-[0.25em] text-white/40">
        {id}
      </div>
      <h3 className="mb-3 text-sm leading-snug tracking-wide text-white">
        {title}
      </h3>
      <p
        className={`text-sm leading-relaxed text-white/50${buttonLabel ? ' mb-6' : ''}`}
      >
        {children}
      </p>
      {buttonLabel && (
        <div className="mt-auto">
          {buttonHref ? (
            <Link to={buttonHref}>
              <PixelButton color={buttonColor} hover={buttonHover}>
                {buttonLabel}
              </PixelButton>
            </Link>
          ) : (
            <PixelButton color={buttonColor} hover={buttonHover}>
              {buttonLabel}
            </PixelButton>
          )}
        </div>
      )}
    </div>
  );
}

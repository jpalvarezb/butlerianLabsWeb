import { cn } from '@/app/components/ui/utils';

interface TypographyProps {
  children?: React.ReactNode;
  className?: string;
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        'mb-2 max-w-2xl font-sans text-2xl leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl',
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        'mb-8 font-sans text-2xl leading-tight tracking-tight sm:text-3xl lg:text-4xl',
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        'mb-4 text-base font-normal tracking-wide text-white',
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function BodyText({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        'text-sm leading-relaxed text-white/70 sm:text-base',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SmallText({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        'text-xs leading-relaxed text-white/70 sm:text-sm',
        className,
      )}
    >
      {children}
    </p>
  );
}

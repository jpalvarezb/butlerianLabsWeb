import { cn } from '@/app/components/ui/utils';

interface TextBlockProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export function TextBlock({ title, children, className }: TextBlockProps) {
  return (
    <div className={cn(className)}>
      <h3 className="mb-4 text-base font-normal tracking-wide text-white">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-white/60">{children}</p>
    </div>
  );
}

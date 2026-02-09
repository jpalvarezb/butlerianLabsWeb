import { cn } from '@/app/components/ui/utils';

interface SectionLabelProps {
  children?: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn('mb-6 flex items-center gap-4', className)}>
      <span className="text-[12px] tracking-[0.3em] uppercase text-[#03ff8a]">
        {children}
      </span>
      <div className="h-[3px] flex-1 bg-white" />
    </div>
  );
}

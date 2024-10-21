import { cn } from '@/lib/utils';

export function Card({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col gap-2 rounded-lg border border-neutral-200 p-4 md:p-6',
        props.className,
      )}
    >
      {children}
    </div>
  );
}

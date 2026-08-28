import { cn } from "@/lib/utils";

export interface TatarstanFlagProps {
  numOfColumns?: number,
  staggeredDelay?: number,
  className?: string,
}

function TatarstanFlag({
  className,
  numOfColumns = 60,
  staggeredDelay = 60,
}: TatarstanFlagProps) {
  return (
    <div className={cn('flag', className)}>
      {Array.from({ length: numOfColumns }).map((_, index) => (
        <div
          key={index}
          className={'column'}
          style={{
            animationDelay:
              index * staggeredDelay + 'ms',
          }}
        />
      ))}
    </div>
  );
}

export default TatarstanFlag;

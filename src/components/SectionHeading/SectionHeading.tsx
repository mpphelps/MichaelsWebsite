import classes from './SectionHeading.module.css';

interface SectionHeadingProps {
  index?: string;
  label?: string;
  title: string;
  align?: 'left' | 'center';
}

const cn = (...arr: (string | false | undefined)[]) => arr.filter(Boolean).join(' ');

export function SectionHeading({ index, label, title, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={cn(classes.wrap, align === 'center' && classes.center)}>
      {(index || label) && (
        <div className={classes.meta}>
          {index && <span className={classes.index}>{index}</span>}
          {label && <span className={classes.label}>{label}</span>}
        </div>
      )}
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.rule}>
        <span className={classes.ruleAccent} aria-hidden />
      </div>
    </div>
  );
}

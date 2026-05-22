import type { ReactNode, CSSProperties } from 'react';
import classes from './HoloPanel.module.css';

type Status = 'online' | 'idle' | 'alert';

interface HoloPanelProps {
  label?: string;
  status?: Status;
  variant?: 'default' | 'subtle' | 'flat';
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  style?: CSSProperties;
}

const statusLabels: Record<Status, string> = {
  online: 'ONLINE',
  idle: 'STANDBY',
  alert: 'ALERT',
};

const cn = (...arr: (string | false | undefined)[]) => arr.filter(Boolean).join(' ');

export function HoloPanel({ label, status, variant = 'default', children, className, noPadding, style }: HoloPanelProps) {
  const showHeader = Boolean(label || status);

  return (
    <div className={cn(classes.panel, classes[`variant_${variant}`], className)} style={style}>
      <span className={cn(classes.corner, classes.tl)} aria-hidden />
      <span className={cn(classes.corner, classes.tr)} aria-hidden />
      <span className={cn(classes.corner, classes.bl)} aria-hidden />
      <span className={cn(classes.corner, classes.br)} aria-hidden />

      {showHeader && (
        <div className={classes.header}>
          {label && <span className={classes.label}>{label}</span>}
          {status && (
            <span className={cn(classes.status, classes[`status_${status}`])}>
              <span className={classes.statusDot} aria-hidden />
              {statusLabels[status]}
            </span>
          )}
        </div>
      )}

      <div className={cn(classes.body, noPadding && classes.noPadding)}>{children}</div>
    </div>
  );
}

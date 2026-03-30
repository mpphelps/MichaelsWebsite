import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import classes from './HorizontalBarChart.module.css';

interface ChartDataItem {
  name: string;
  value: number;
}

interface HorizontalBarChartProps {
  data: ChartDataItem[];
  title: string;
  subtitle?: string;
  valueLabel?: string;
  height?: number;
  accent?: string;
}

const DEFAULTS = {
  accent: '#00d2c6',
  height: 300,
  valueLabel: '',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label, valueLabel, accent }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className={classes.chartTooltip}>
      <span className={classes.tooltipLabel}>{label}</span>
      <span className={classes.tooltipDivider} style={{ background: `${accent}4d` }} />
      <span className={classes.tooltipValue} style={{ color: accent }}>
        {payload[0].value}{valueLabel ? ` ${valueLabel}` : ''}
      </span>
    </div>
  );
}

export default function HorizontalBarChart({
  data,
  title,
  subtitle,
  valueLabel = DEFAULTS.valueLabel,
  height = DEFAULTS.height,
  accent = DEFAULTS.accent,
}: HorizontalBarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const domain = [0, Math.ceil(maxValue * 1.2)];

  return (
    <div
      className={classes.chartSection}
      style={{
        borderColor: `${accent}1a`,
        background: `linear-gradient(175deg, ${accent}08 0%, rgba(0,0,0,0.2) 100%)`,
      }}
    >
      <div
        className={classes.chartGlow}
        style={{
          background: `radial-gradient(ellipse at center, ${accent}14 0%, transparent 70%)`,
        }}
      />
      <div className={classes.chartHeader}>
        <h3 className={classes.chartTitle}>{title}</h3>
        {subtitle && <span className={classes.chartSubtitle}>{subtitle}</span>}
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 48, left: 8, bottom: 4 }}
          barCategoryGap="30%"
        >
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={accent} stopOpacity={0.15} />
              <stop offset="60%" stopColor={accent} stopOpacity={0.7} />
              <stop offset="100%" stopColor={accent} stopOpacity={0.95} />
            </linearGradient>
            <filter id="barGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid
            strokeDasharray="2 6"
            stroke="rgba(255,255,255,0.04)"
            horizontal={false}
          />
          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 500 }}
            width={90}
          />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#4b5563', fontSize: 11 }}
            domain={domain}
          />
          <Tooltip
            content={<CustomTooltip valueLabel={valueLabel} accent={accent} />}
            cursor={{ fill: `${accent}0a` }}
          />
          <Bar
            dataKey="value"
            radius={[0, 4, 4, 0]}
            animationDuration={1000}
            animationEasing="ease-out"
            filter="url(#barGlow)"
          >
            {data.map((_, i) => (
              <Cell key={i} fill="url(#barGrad)" opacity={1 - i * 0.1} />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              style={{ fill: accent, fontSize: 12, fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

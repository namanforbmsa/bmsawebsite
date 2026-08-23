import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

type Stat = { value: number; label: string; max?: number };

const StatGraph: React.FC<{ stat: Stat }> = ({ stat }) => {
  const data = [{ name: stat.label, value: stat.value, fill: "#2563eb" }];
  const max = stat.max ?? Math.max(100, stat.value);

  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center">
      <div style={{ width: 120, height: 120, margin: "0 auto" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={12} data={data} startAngle={90} endAngle={-270}>
            <RadialBar minAngle={15} background={{ fill: '#f1f5f9' }} clockWise dataKey="value" />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-2xl font-bold text-primary mt-2">{stat.value}</div>
      <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
    </div>
  );
};

const StatsGraphs: React.FC<{ stats: Stat[] }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {stats.map((s) => (
        <StatGraph key={s.label} stat={s} />
      ))}
    </div>
  );
};

export default StatsGraphs;

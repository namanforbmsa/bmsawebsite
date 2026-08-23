import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

type Stat = { value: number; label: string };

const COLORS = ["#2563eb", "#06b6d4", "#7c3aed"];

const DonutStats: React.FC<{ stats: Stat[] }> = ({ stats }) => {
  const data = stats.map((s) => ({ name: s.label, value: s.value }));

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={4}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => value.toString()} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, idx) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="inline-block h-3 w-6 rounded" style={{ background: COLORS[idx % COLORS.length] }} />
            <div>
              <div className="text-lg font-bold text-primary">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutStats;

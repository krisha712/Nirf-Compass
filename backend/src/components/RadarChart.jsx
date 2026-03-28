// SVG Radar Chart - no external charting library needed
const SIZE = 260;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 100;
const LEVELS = 4;

const AXES = [
  { key: 'tlr', label: 'TLR' },
  { key: 'rp',  label: 'RP'  },
  { key: 'go',  label: 'GO'  },
  { key: 'oi',  label: 'OI'  },
  { key: 'pr',  label: 'PR'  },
];

const toXY = (angle, r) => ({
  x: CX + r * Math.sin(angle),
  y: CY - r * Math.cos(angle),
});

const polygon = (values) => {
  const step = (2 * Math.PI) / AXES.length;
  return AXES.map((ax, i) => {
    const r = (values[ax.key] / 100) * R;
    const pt = toXY(i * step, r);
    return pt.x + ',' + pt.y;
  }).join(' ');
};

export default function RadarChart({ selected, peerAvg }) {
  const step = (2 * Math.PI) / AXES.length;

  return (
    <svg viewBox={'0 0 ' + SIZE + ' ' + SIZE} className="w-full max-w-xs mx-auto">
      {/* Grid rings */}
      {Array.from({ length: LEVELS }).map((_, lvl) => {
        const r = R * ((lvl + 1) / LEVELS);
        const pts = AXES.map((_, i) => {
          const pt = toXY(i * step, r);
          return pt.x + ',' + pt.y;
        }).join(' ');
        return (
          <polygon
            key={lvl}
            points={pts}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis lines + labels */}
      {AXES.map((ax, i) => {
        const outer = toXY(i * step, R);
        const labelPt = toXY(i * step, R + 18);
        return (
          <g key={ax.key}>
            <line x1={CX} y1={CY} x2={outer.x} y2={outer.y} stroke="#d1d5db" strokeWidth="1" />
            <text
              x={labelPt.x}
              y={labelPt.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fontWeight="600"
              fill="#6b7280"
            >
              {ax.label}
            </text>
          </g>
        );
      })}

      {/* Peer average polygon */}
      <polygon
        points={polygon(peerAvg)}
        fill="rgba(99,102,241,0.15)"
        stroke="#6366f1"
        strokeWidth="2"
        strokeDasharray="5 3"
      />

      {/* Selected university polygon */}
      <polygon
        points={polygon(selected)}
        fill="rgba(59,130,246,0.2)"
        stroke="#3b82f6"
        strokeWidth="2"
      />

      {/* Dots on selected */}
      {AXES.map((ax, i) => {
        const r = (selected[ax.key] / 100) * R;
        const pt = toXY(i * step, r);
        return <circle key={ax.key} cx={pt.x} cy={pt.y} r="4" fill="#3b82f6" />;
      })}
    </svg>
  );
}

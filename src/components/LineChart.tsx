import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path, Line, Circle } from 'react-native-svg';
import { colors } from '../theme/colors';

interface Props {
  data: number[];
  selected: number;
  width: number;
  height: number;
}

const PAD_X = 10;
const PAD_Y = 22;

export default function LineChart({ data, selected, width, height }: Props) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => ({
    x: PAD_X + (i / (data.length - 1)) * (width - PAD_X * 2),
    y: PAD_Y + (1 - (v - min) / range) * (height - PAD_Y * 2),
  }));

<<<<<<< HEAD
  // Catmull-Rom -> Bezier: тегіс 
=======
  // Catmull-Rom -> Bezier: тегіс қисық
>>>>>>> 401dc14 (first commit)
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  const area = `${d} L${pts[pts.length - 1].x},${height} L${pts[0].x},${height} Z`;
  const sel = pts[selected];

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="stroke" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#A9C8FF" />
          <Stop offset="1" stopColor={colors.primary} />
        </LinearGradient>
        <LinearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={colors.primary} stopOpacity="0.12" />
          <Stop offset="1" stopColor={colors.primary} stopOpacity="0" />
        </LinearGradient>
      </Defs>

      {pts.map((p, i) => (
        <Line key={i} x1={p.x} x2={p.x} y1={0} y2={height} stroke="#F0F0F3" strokeWidth={1} />
      ))}

      <Path d={area} fill="url(#fill)" />
      <Path d={d} stroke="url(#stroke)" strokeWidth={4} fill="none" strokeLinecap="round" />
      <Circle cx={sel.x} cy={sel.y} r={8} fill={colors.white} stroke={colors.primary} strokeWidth={4} />
    </Svg>
  );
}

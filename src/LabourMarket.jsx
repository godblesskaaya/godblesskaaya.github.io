/**
 * src/pages/LabourMarket.jsx
 *
 * WIRING (see plan in README):
 * 1. npm install recharts
 * 2. Wrap <App> with <BrowserRouter> in main.jsx
 * 3. Add <Route path="/research/labour-market" element={<LabourMarket />} /> in App.jsx
 * 4. Add public/404.html for GitHub Pages SPA routing (see spa-github-pages pattern)
 *
 * Font: uses font-serif (Georgia fallback — already in browser). No new Google Font needed.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Cell,
} from "recharts";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const TZ_PERCENTILES = [
  {
    pct: "P10", value: 200, range: "TZS 180–220K / mo",
    label: "Bottom Decile",
    desc: "Casual and temporary workers in food service, accommodation, and low-skill private manufacturing. They exist inside the formal sector definition only because their employer is registered — their wages sit below even the public sector floor.",
  },
  {
    pct: "P25", value: 345, range: "TZS 320–370K / mo",
    label: "Lower Quartile",
    desc: "Entry-level private sector workers in manufacturing, trade, and construction. Many are compressed against the old TZS 370K minimum wage floor — creating a mass point rather than a smooth distribution at this level.",
  },
  {
    pct: "P50", value: 480, range: "TZS 470–490K / mo",
    label: "Median — The Honest Centre",
    desc: "The typical formal sector worker. Private sector, regular contract, most likely in manufacturing or trade. This figure sits 21% below the headline mean of TZS 609K — the gap that the skew creates.",
  },
  {
    pct: "P75", value: 740, range: "TZS 700–780K / mo",
    label: "Upper Quartile",
    desc: "Mid-level civil servants, experienced teachers, supervisory manufacturing roles, and the lower end of finance. The jump from P50 to P75 (≈TZS 260K) is already twice the jump from P25 to P50 — the tail begins stretching rightward.",
  },
  {
    pct: "P90", value: 1050, range: "TZS 1.0–1.1M / mo",
    label: "Top Decile",
    desc: "Approximately 407,000 workers. Upper public sector grades, senior private sector management, and the lower finance sector. The P90/P10 ratio is already 5× — a wide spread for a single formal sector.",
  },
  {
    pct: "P95", value: 1250, range: "TZS 1.2–1.3M / mo",
    label: "Top 5%",
    desc: "Approximately 204,000 workers. Senior civil service grades and mid-level finance. This sits very close to the Public Administration mean of TZS 1.23M — confirming where these workers cluster.",
  },
  {
    pct: "P99", value: 2250, range: "TZS 2.0–2.5M / mo",
    label: "Top 1%",
    desc: "Approximately 40,700 workers. Senior banking executives, top civil servants, specialist professionals. The distance from P95 to P99 (≈TZS 1M) covers more TZS ground than the entire span from P10 to P75 combined.",
  },
];

const USA_PERCENTILES = [
  {
    pct: "P10", value: 10264, annual: "$10,264 / yr",
    label: "Bottom Decile",
    desc: "Part-time retail, food service, and seasonal agricultural workers. Many are at or near the $7.25/hr federal minimum. This band is heavily influenced by part-year and youth workers — the data includes everyone who earned wages, not only full-time employees.",
  },
  {
    pct: "P25", value: 28000, annual: "$28,000 / yr",
    label: "Lower Quartile",
    desc: "Entry-level full-time service workers, healthcare support aides, and office admin. The mass point for occupations in low-wage services that work partial years.",
  },
  {
    pct: "P50", value: 50200, annual: "$50,200 / yr",
    label: "Median — The Honest Centre",
    desc: "The typical American worker. Aligns with office/admin support ($50K mean) and production occupations. For full-time workers only the BLS CPS gives a higher figure: $61,984/yr — reflecting how part-time work pulls the all-worker median down.",
  },
  {
    pct: "P75", value: 88710, annual: "$88,710 / yr",
    label: "Upper Quartile",
    desc: "Experienced professionals — registered nurses, accountants, IT support specialists, mid-level managers. The P50→P75 jump ($38.5K) is already 75% larger than the P25→P50 jump ($22.2K), showing the distribution accelerating rightward.",
  },
  {
    pct: "P90", value: 150000, annual: "$150,000 / yr",
    label: "Top Decile",
    desc: "Approximately 15.5 million workers. Senior managers, engineers, physicians, senior tech workers. The Computer & Math mean ($116.8K) and Business & Finance mean ($93.7K) both feed into this band.",
  },
  {
    pct: "P95", value: 201050, annual: "$201,050 / yr",
    label: "Top 5%",
    desc: "Approximately 7.8 million workers. Senior executives, specialist physicians, experienced attorneys. Legal occupations ($137.7K mean) and Management ($141.8K mean) cluster heavily in the upper portion of this range.",
  },
  {
    pct: "P99", value: 430000, annual: "$430,000 / yr",
    label: "Top 1%",
    desc: "Approximately 1.8 million workers. C-suite executives, top lawyers, surgeons, and hedge fund managers. The P99/P50 ratio is 8.6× — nearly double the equivalent ratio in Tanzania's formal sector. This is where US distributional inequality is structurally more extreme.",
  },
];

const TZ_SECTORS = [
  { name: "Food & Accom.", value: 290 },
  { name: "Trade",         value: 490 },
  { name: "Manufacturing", value: 510 },
  { name: "Construction",  value: 530 },
  { name: "Education",     value: 580 },
  { name: "Non-profit",    value: 607 },
  { name: "Public Admin",  value: 1229 },
  { name: "Finance & Ins.",value: 1347 },
];

const TZ_CURVE = (() => {
  const pts = [];
  const logMed = Math.log(480), s = 0.55;
  for (let x = 50; x <= 2800; x += 35) {
    const y = (1 / (x * s * Math.sqrt(2 * Math.PI))) *
      Math.exp(-((Math.log(x) - logMed) ** 2) / (2 * s ** 2));
    pts.push({ x, y: parseFloat((y * 900).toFixed(5)) });
  }
  return pts;
})();

const COMPARISON = [
  { metric: "Formal sector mean",         tz: "TZS 609K / mo",          usa: "$73,472 / yr" },
  { metric: "Estimated median",            tz: "~TZS 480K / mo",         usa: "$50,200 / yr" },
  { metric: "Mean / median ratio",         tz: "1.27×",                  usa: "1.46×",      flag: "USA more skewed" },
  { metric: "Pearson skewness coeff.",     tz: "~0.8 – 1.0",             usa: "~0.9 – 1.0" },
  { metric: "P90 / P10 ratio",             tz: "~5×",                    usa: "~14.6×",     flag: "USA far wider" },
  { metric: "P99 / P50 ratio",             tz: "~4.7×",                  usa: "8.6×",       flag: "USA more extreme" },
  { metric: "Inter-quartile range (IQR)",  tz: "~TZS 395K",              usa: "~$60,710" },
  { metric: "Gini coefficient",            tz: "0.40 (household)",        usa: "0.50–0.52 (individual)" },
  { metric: "Top 1% income share",         tz: "~12% (estimated)",        usa: "~20% (IRS SOI)" },
  { metric: "Distribution type",           tz: "Log-normal, left-truncated", usa: "Log-normal, very fat tail" },
];

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS (inline for chart panels — Tailwind can't generate arbitrary hex)
// ─────────────────────────────────────────────────────────────────────────────

const D = {
  bg:     "#0F0E0A",
  panel:  "#161410",
  border: "#272218",
  gold:   "#C8921A",
  amber:  "#E0AC40",
  cream:  "#EDE3CC",
  muted:  "#6B5E42",
  green:  "#4E7A4E",
  rust:   "#B03A10",
  sky:    "#3A7AAA",
};

// ─────────────────────────────────────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ n, children }) => (
  <div className="flex items-center gap-4 mb-5">
    <span className="text-xs font-mono text-stone-400 tracking-[0.2em]">0{n}</span>
    <div className="h-px flex-1 bg-stone-200" />
    <span className="text-xs font-mono text-stone-400 tracking-[0.15em] uppercase">{children}</span>
  </div>
);

const Prose = ({ children }) => (
  <p className="font-serif text-stone-700 leading-[1.9] text-[1.0625rem] mb-5">{children}</p>
);

const PullQuote = ({ children }) => (
  <FadeIn>
    <div className="my-12 py-2">
      <div className="h-0.5 w-12 bg-amber-400 mb-6" />
      <p className="font-serif text-[1.35rem] leading-[1.65] text-stone-800 italic tracking-[-0.01em]">
        {children}
      </p>
    </div>
  </FadeIn>
);

const ChartPanel = ({ children, caption, label }) => (
  <FadeIn className="my-10 -mx-4 sm:mx-0">
    <div className="rounded-sm overflow-hidden" style={{ background: D.bg }}>
      {label && (
        <div className="px-5 pt-4 pb-0">
          <p className="text-[10px] font-mono tracking-[0.18em] uppercase" style={{ color: D.muted }}>
            {label}
          </p>
        </div>
      )}
      <div className="px-3 py-4">{children}</div>
    </div>
    {caption && (
      <p className="text-[11px] font-mono text-stone-400 mt-2 leading-relaxed px-1">{caption}</p>
    )}
  </FadeIn>
);

const InlineStat = ({ value, label, accent = "text-amber-700" }) => (
  <span>
    <span className={`font-mono font-semibold ${accent}`}>{value}</span>
    <span className="text-stone-500 text-sm"> {label}</span>
  </span>
);

// ─────────────────────────────────────────────────────────────────────────────
// CHARTS
// ─────────────────────────────────────────────────────────────────────────────

const tt = (style = {}) => ({
  contentStyle: { background: D.panel, border: `1px solid ${D.border}`, color: D.cream, fontSize: 12, ...style },
  cursor: { fill: "rgba(255,255,255,0.03)" },
});

function CentralTendencyChart() {
  const data = [
    { label: "Mode (est.)",         value: 435, fill: D.muted },
    { label: "Median (est.)",        value: 480, fill: D.green },
    { label: "National Mean",        value: 609, fill: D.gold },
    { label: "Public Sector Mean",   value: 1273, fill: D.rust },
  ];
  return (
    <ResponsiveContainer width="100%" height={190}>
      <BarChart data={data} layout="vertical" margin={{ left: 16, right: 72, top: 6, bottom: 6 }}>
        <XAxis type="number" tickFormatter={v => `${v}K`}
          tick={{ fill: D.muted, fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="label" width={140}
          tick={{ fill: D.cream, fontSize: 10, fontFamily: "Georgia, serif" }} axisLine={false} tickLine={false} />
        <Tooltip formatter={v => [`TZS ${v}K / mo`]} {...tt()} />
        <Bar dataKey="value" radius={[0, 2, 2, 0]}
          label={{ position: "right", formatter: v => `${v}K`, fill: D.muted, fontSize: 10, fontFamily: "monospace" }}>
          {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function HighEarnerDecomposition() {
  const data = [
    { label: "Headline mean (all workers)", value: 609, fill: D.gold },
    { label: "Mean — bottom 84% only",      value: 485, fill: D.muted },
    { label: "Estimated median",             value: 480, fill: D.green },
  ];
  return (
    <ResponsiveContainer width="100%" height={155}>
      <BarChart data={data} layout="vertical" margin={{ left: 16, right: 72, top: 6, bottom: 6 }}>
        <XAxis type="number" domain={[0, 700]} tickFormatter={v => `${v}K`}
          tick={{ fill: D.muted, fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="label" width={190}
          tick={{ fill: D.cream, fontSize: 10, fontFamily: "Georgia, serif" }} axisLine={false} tickLine={false} />
        <Tooltip formatter={v => [`TZS ${v}K / mo`]} {...tt()} />
        <Bar dataKey="value" radius={[0, 2, 2, 0]}
          label={{ position: "right", formatter: v => `TZS ${v}K`, fill: D.muted, fontSize: 10, fontFamily: "monospace" }}>
          {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function PercentilesViz({ data, activeKey, onToggle, maxVal, accentColor, rangeKey }) {
  return (
    <div className="space-y-0.5">
      {data.map(d => {
        const isActive = activeKey === d.pct;
        const w = Math.min((d.value / maxVal) * 100, 100);
        return (
          <div
            key={d.pct}
            onClick={() => onToggle(isActive ? null : d.pct)}
            className="cursor-pointer rounded-sm px-3 py-2.5 transition-colors duration-150"
            style={{ background: isActive ? D.panel : "transparent" }}
          >
            <div className="flex items-center gap-3 mb-1.5">
              <span className="font-mono text-xs w-8 flex-shrink-0" style={{ color: accentColor }}>
                {d.pct}
              </span>
              <span className="font-serif text-xs flex-1" style={{ color: D.cream }}>
                {d.label}
              </span>
              <span className="font-mono text-xs ml-auto flex-shrink-0" style={{ color: D.amber }}>
                {d[rangeKey]}
              </span>
            </div>
            <div className="ml-11">
              <div className="h-[5px] rounded-full" style={{ background: D.border }}>
                <div
                  className="h-[5px] rounded-full transition-all duration-300"
                  style={{ width: `${w}%`, background: isActive ? accentColor : D.muted }}
                />
              </div>
              {isActive && (
                <p className="text-[11px] mt-2 leading-[1.75]" style={{ color: D.muted }}>
                  {d.desc}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DistributionCurve() {
  return (
    <ResponsiveContainer width="100%" height={185}>
      <AreaChart data={TZ_CURVE} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="tzGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={D.rust}  stopOpacity={0.35} />
            <stop offset="28%"  stopColor={D.gold}  stopOpacity={0.70} />
            <stop offset="55%"  stopColor={D.amber} stopOpacity={0.35} />
            <stop offset="100%" stopColor={D.muted} stopOpacity={0.08} />
          </linearGradient>
        </defs>
        <XAxis dataKey="x" tickFormatter={v => `${v}K`}
          ticks={[200, 435, 480, 609, 1200, 2500]}
          tick={{ fill: D.muted, fontSize: 9, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
        <YAxis hide />
        <ReferenceLine x={435} stroke={D.muted}    strokeDasharray="2 4"
          label={{ value: "Mode", fill: D.muted, fontSize: 9, position: "insideTopRight" }} />
        <ReferenceLine x={480} stroke={D.green}    strokeDasharray="3 3"
          label={{ value: "Median", fill: D.green, fontSize: 9, position: "insideTopRight" }} />
        <ReferenceLine x={609} stroke={D.gold}     strokeDasharray="3 3"
          label={{ value: "Mean", fill: D.gold, fontSize: 9, position: "insideTopLeft" }} />
        <Tooltip
          labelFormatter={x => `TZS ${Number(x)}K / mo`}
          formatter={() => [null, null]}
          contentStyle={{ background: D.panel, border: `1px solid ${D.border}`, color: D.cream, fontSize: 11 }}
        />
        <Area type="monotone" dataKey="y" stroke={D.gold} strokeWidth={1.5} fill="url(#tzGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function SectorChart() {
  const sorted = [...TZ_SECTORS].sort((a, b) => a.value - b.value);
  return (
    <ResponsiveContainer width="100%" height={245}>
      <BarChart data={sorted} layout="vertical" margin={{ left: 10, right: 64, top: 6, bottom: 6 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={D.border} horizontal={false} />
        <XAxis type="number" tickFormatter={v => `${v}K`}
          tick={{ fill: D.muted, fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" width={110}
          tick={{ fill: D.cream, fontSize: 10, fontFamily: "Georgia, serif" }} axisLine={false} tickLine={false} />
        <Tooltip formatter={v => [`TZS ${v}K / mo`]} {...tt()} />
        <ReferenceLine x={480} stroke={D.green} strokeDasharray="3 3"
          label={{ value: "Median", fill: D.green, fontSize: 9, position: "insideTopRight" }} />
        <ReferenceLine x={609} stroke={D.gold}  strokeDasharray="3 3"
          label={{ value: "Mean", fill: D.gold, fontSize: 9, position: "insideTopLeft" }} />
        <Bar dataKey="value" radius={[0, 2, 2, 0]}
          label={{ position: "right", formatter: v => `${v}K`, fill: D.muted, fontSize: 9, fontFamily: "monospace" }}>
          {sorted.map((d, i) => (
            <Cell key={i}
              fill={d.value > 609 ? D.amber : d.value > 480 ? D.muted : D.rust}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function LabourMarket() {
  const [tzActive, setTzActive] = useState("P50");
  const [usaActive, setUsaActive] = useState("P50");

  return (
    <div className="min-h-screen bg-stone-50">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <header style={{ background: D.bg }} className="relative">
        {/* Back link */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-24">
          <Link
            to="/research"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors duration-200"
            style={{ color: D.muted }}
            onMouseEnter={e => e.target.style.color = D.amber}
            onMouseLeave={e => e.target.style.color = D.muted}
          >
            <span>←</span> <span>All research</span>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-20">
          {/* Kicker */}
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-8" style={{ color: D.muted }}>
            Research · Labour Economics · Tanzania & United States · 2024
          </p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl sm:text-5xl leading-[1.1] tracking-[-0.02em] mb-8"
            style={{ color: D.cream }}
          >
            What Workers Actually Earn —<br />
            <span style={{ color: D.gold }}>And Why the Average Lies</span>
          </motion.h1>

          {/* The thesis equation — the signature design element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="h-px flex-1 opacity-20" style={{ background: D.amber }} />
            <p className="font-mono text-sm tracking-widest" style={{ color: D.amber }}>
              Mode &lt; Median &lt; Mean
            </p>
            <div className="h-px flex-1 opacity-20" style={{ background: D.amber }} />
          </motion.div>

          {/* Abstract */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="max-w-4xl"
          >
            <p className="font-serif text-[1.0625rem] leading-[1.85]" style={{ color: "#9A8E78" }}>
              When Tanzania's National Bureau of Statistics reports a formal sector mean wage of TZS 609,354
              per month, the figure is accurate. It is also a poor description of what most formal workers
              earn. This analysis unpacks why — working through the full percentile structure of Tanzania's
              formal labour market, characterising the statistical shape of its earnings distribution, and
              using the United States as a comparison mirror. The finding is counterintuitive: the US
              distribution, despite the country's greater wealth, has a significantly fatter upper tail.
            </p>
            <div className="flex items-center gap-6 mt-8 pt-6 border-t" style={{ borderColor: D.border }}>
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: D.muted }}>By</p>
                <p className="font-serif text-sm" style={{ color: D.cream }}>Godbless Gadiel Kaaya</p>
              </div>
              <div className="h-6 w-px" style={{ background: D.border }} />
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: D.muted }}>Sources</p>
                <p className="font-serif text-sm" style={{ color: "#9A8E78" }}>NBS Tanzania EES 2023/24 · ILFS 2024 · BLS OEWS May 2024 · Census ASEC 2024</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── BODY ──────────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-20">

        {/* ── 01 THE PROBLEM WITH THE AVERAGE ──────────────────────── */}
        <FadeIn>
          <section className="mb-16">
            <Eyebrow n={1}>The Problem with the Headline Number</Eyebrow>

            <Prose>
              There is a specific way that wage statistics mislead. It is not through fabrication or
              deliberate distortion — the numbers that get published are real. The problem is subtler:
              the mean, the measure almost always reported as the "average", is extraordinarily sensitive
              to extreme values. In any distribution where a small group earns dramatically more than
              everyone else, the mean gets pulled toward that tail. The result is a headline figure that
              accurately describes the mathematical centre of mass — and inaccurately describes the
              experience of most workers.
            </Prose>

            <Prose>
              Tanzania's formal sector offers a clean illustration of this effect. The 2023/24 Formal
              Sector Employment and Earnings Survey, published by the National Bureau of Statistics,
              reports a mean monthly wage of TZS 609,354 across 4.07 million workers. That figure is
              widely cited. It is also, as we will show, roughly 26% higher than what the majority of
              those workers actually earn — inflated by a concentrated group of high earners in Finance,
              Insurance, and the upper grades of the civil service. The honest central measure is closer
              to TZS 480,000. The difference between those two numbers matters enormously for anyone
              trying to understand the market: workers setting salary expectations, firms benchmarking
              pay, policymakers designing wage floors.
            </Prose>

            <Prose>
              This analysis works through the full statistical structure of Tanzania's formal sector
              earnings, then applies the same framework to the United States for comparison. The goal is
              not to debunk official statistics but to read them more carefully — to surface the
              percentile structure, characterise the distribution shape, and locate where the mean diverges
              from the typical.
            </Prose>
          </section>
        </FadeIn>

        {/* ── 02 TANZANIA IN CONTEXT ───────────────────────────────── */}
        <FadeIn>
          <section className="mb-16">
            <Eyebrow n={2}>Tanzania in Context — Two Economies in One</Eyebrow>

            <Prose>
              Before entering the formal sector statistics, a frame is necessary. Tanzania's labour
              market is not one economy but two, running in parallel with minimal connection between
              them. The 2024 Integrated Labour Force Survey counts over 30 million employed persons.
              Of those, only 4.07 million — roughly 13% — work in the formal sector that the earnings
              surveys cover. The remaining 87% work in agriculture, informal trade, and unregistered
              services, outside the reach of employment law, wage floors, and official data collection.
            </Prose>

            <Prose>
              The informality rate has actually worsened since the previous survey cycle: from 92.5% in
              2020/21 to 94.6% in 2024. This matters for interpreting any formal sector statistic,
              including the mean wage. When the NBS reports TZS 609,354 as the average earnings figure,
              it is describing a minority of workers who are already positively selected — they have
              formal contracts, registered employers, and access to the labour market's institutional
              infrastructure. The remaining 26 million or so workers earn less, often much less, with
              no equivalent data trail. Any analysis of "Tanzanian wages" that begins and ends with
              the formal sector mean is already working with a selective sample.
            </Prose>

            <Prose>
              With that frame established, the formal sector is still worth analysing on its own terms.
              Four million workers is not a small number, and the formal sector sets the wage
              benchmarks that informal earnings are implicitly measured against. What follows is a
              statistical portrait of those workers.
            </Prose>
          </section>
        </FadeIn>

        {/* ── 03 WHAT THE MEAN HIDES ───────────────────────────────── */}
        <FadeIn>
          <section className="mb-16">
            <Eyebrow n={3}>What the Formal Sector Mean Hides</Eyebrow>

            <Prose>
              The central tendency of any distribution can be measured three ways, and they tell different
              stories. The <strong className="text-stone-900">mode</strong> — the most common value — sits
              around TZS 430,000–450,000 in Tanzania's formal sector, anchored by the mass of workers
              in manufacturing and trade. The <strong className="text-stone-900">median</strong> — the
              midpoint, where half the workforce earns more and half earns less — is approximately
              TZS 470,000–490,000. The <strong className="text-stone-900">mean</strong> — the headline
              figure — is TZS 609,354. The ordering matters:
              Mode &lt; Median &lt; Mean is the mathematical signature of a right-skewed distribution.
              It tells you before you look at anything else that the tail is pulling the average upward.
            </Prose>

            <ChartPanel
              label="Tanzania Formal Sector — Central Tendency Comparison (TZS × 1,000 / month)"
              caption="EES 2023/24, NBS Tanzania. Mode and median are estimates derived from sector-level anchor points and employment share weights."
            >
              <CentralTendencyChart />
            </ChartPanel>

            <Prose>
              The mechanism behind the gap is traceable. Finance and Insurance employs 4.1% of the
              formal workforce — approximately 167,000 people — at a mean of TZS 1,346,772 per month.
              Public Administration and Defence employs 11.9% — about 484,000 people — at a mean of
              TZS 1,228,899. Together, those two sectors account for roughly 16% of all formal workers,
              averaging approximately TZS 1,260,000 each. Strip them out and recalculate: the remaining
              84% of formal workers have an implied mean of around TZS 485,000. That is the mean of
              most of the formal workforce — and it sits very close to the median, as it should in
              a distribution without an extreme upper tail.
            </Prose>

            <ChartPanel
              label="How 16% of Workers Inflate the Headline Mean by 26%"
              caption="Back-calculation from EES 2023/24 sector-level means and employment shares. The headline figure is not inaccurate — it is simply an unresistant estimator."
            >
              <HighEarnerDecomposition />
            </ChartPanel>

            <Prose>
              The implication is direct: when the EES 2023/24 reports TZS 609,354 as the formal sector
              mean, it is a number that describes almost no worker's actual experience. High earners in
              finance and public administration are real, their wages are real, and they belong in the
              calculation — but including them without qualification creates a figure that overstates
              what most formal workers earn by roughly a quarter. The trimmed mean (dropping the top and
              bottom 5% of earners) falls to approximately TZS 490,000–510,000. The median is the most
              honest single-number summary: TZS 480,000, roughly.
            </Prose>
          </section>
        </FadeIn>

        {/* ── 04 PERCENTILE PORTRAIT ───────────────────────────────── */}
        <FadeIn>
          <section className="mb-16">
            <Eyebrow n={4}>A Percentile Portrait of the Formal Worker</Eyebrow>

            <Prose>
              A single central measure is insufficient to characterise a skewed distribution. What is
              needed is the full percentile structure — a portrait of the workforce from bottom to top,
              with the worker profile at each level. The estimates below are derived from the EES
              2023/24 sector-level means, employment shares, and the known shape of the distribution.
              They are informed estimates, not directly published figures, but they are anchored at
              multiple points by hard data and are consistent with all the structural information
              available. Click any row to read the worker profile at that level.
            </Prose>

            <ChartPanel
              label="Tanzania Formal Sector — Percentile Profile (click to expand)"
              caption="Estimates inferred from EES 2023/24 sector means, employment share weights, and log-normal distribution assumptions."
            >
              <PercentilesViz
                data={TZ_PERCENTILES}
                activeKey={tzActive}
                onToggle={setTzActive}
                maxVal={2500}
                accentColor={D.gold}
                rangeKey="range"
              />
            </ChartPanel>

            <Prose>
              The inter-percentile gaps are where the skew becomes tangible. From P25 to P50 — the
              lower half of the distribution — the span is approximately TZS 135,000. From P50 to P75,
              the span is approximately TZS 260,000: nearly twice as wide for the same percentile
              distance. From P75 to P99, the span is approximately TZS 1,510,000 — covering in a single
              jump what takes four quartiles to accumulate on the lower side. The P90/P10 ratio is
              roughly 5×: a bottom-decile formal worker earns about a fifth of what a top-decile formal
              worker earns, within the same supposedly regulated sector.
            </Prose>

            <Prose>
              The P99 deserves particular attention. Approximately 40,700 workers sit at or above
              TZS 2,000,000 per month. The distance from P95 to P99 — a span of 4 percentile points —
              covers as much TZS ground as the entire range from P10 to P75. This is the statistical
              fingerprint of a fat upper tail: the top of the distribution stretches far faster than
              the bottom compresses. A Pearson skewness coefficient of approximately 0.8–1.0 (anything
              above 0.5 is considered meaningful) quantifies it precisely.
            </Prose>
          </section>
        </FadeIn>

        {/* ── 05 DISTRIBUTION SHAPE ───────────────────────────────── */}
        <FadeIn>
          <section className="mb-16">
            <Eyebrow n={5}>The Shape of the Distribution</Eyebrow>

            <Prose>
              The Tanzania formal sector earnings distribution is best described as a right-skewed
              log-normal — the near-universal shape of wage data. On a log scale, where each step
              represents a proportional increase rather than an absolute one, the distribution
              approximates a bell curve. On a linear scale, it looks like a compressed hump between
              TZS 300,000 and TZS 700,000 with a long, thin tail stretching rightward toward TZS
              1.3 million and beyond.
            </Prose>

            <ChartPanel
              label="Approximate Earnings Distribution — Tanzania Formal Sector"
              caption="Log-normal approximation (σ ≈ 0.55) fitted to sector-level anchor points. Dashed lines mark mode, median, and mean. The visual gap between median and mean is the skew made geometric."
            >
              <DistributionCurve />
            </ChartPanel>

            <Prose>
              There are two structural features that distinguish the Tanzanian distribution from a
              clean log-normal. The first is left truncation: the minimum wage floor (TZS 370,000
              during the survey period, raised to TZS 500,000 in July 2025) creates an artificial
              spike at the lower bound. Rather than tapering smoothly toward zero, the distribution
              is cut off and piled up at the floor — workers who would otherwise earn below it are
              compressed against it. The second is a civil service "kink" in the right portion: public
              sector pay is set by grade bands rather than market forces, creating discrete mass points
              at each grade level rather than a smooth continuum. The aggregate distribution inherits
              these lumps, making the right side slightly irregular compared to pure log-normal theory.
            </Prose>

            <Prose>
              Examining earnings by sector reinforces where the distribution's weight sits and
              why the mean is where it is. Most of the workforce — manufacturing at 17.7%, education
              at 15.9%, trade and construction — earns in the TZS 480,000–620,000 band, roughly
              symmetrically around the median. Finance and Public Administration are outliers, not
              the centre.
            </Prose>

            <ChartPanel
              label="Mean Monthly Earnings by Sector — Formal Sector Only"
              caption="EES 2023/24. Amber = above mean. Sectors below the median line represent the majority of formal employment by headcount."
            >
              <SectorChart />
            </ChartPanel>
          </section>
        </FadeIn>

        {/* ── PULL QUOTE ───────────────────────────────────────────── */}
        <PullQuote>
          The United States, with its far greater average wealth, turns out to have a significantly
          more extreme upper tail than Tanzania's formal sector. The P99/P50 ratio is 8.6× in the US
          versus 4.7× in Tanzania. The problem of high earners distorting the mean is universal —
          but the degree of distortion is not.
        </PullQuote>

        {/* ── 06 USA ───────────────────────────────────────────────── */}
        <FadeIn>
          <section className="mb-16">
            <Eyebrow n={6}>The United States — Same Lens, Different Scale</Eyebrow>

            <Prose>
              Applying the same framework to the United States produces a set of direct comparisons
              that are revealing in ways that cut against intuition. The US has published, granular
              percentile data from the Census Bureau's Annual Social and Economic Supplement — no
              estimation required. The median individual income across all workers is exactly
              $50,200 per year (Census ASEC 2024). The mean is $73,472. The gap between them
              is $23,272 — meaning the mean sits 46% above the median, versus 27% in Tanzania's
              formal sector. On this measure alone, the US earnings distribution is more skewed.
            </Prose>

            <Prose>
              The coefficient of variation — the ratio of standard deviation to mean — is estimated
              at 1.1–1.3 in the US, versus 0.8–1.0 for Tanzania's formal sector. The Gini
              coefficient for individual US income sits at 0.50–0.52; Tanzania's household Gini
              is 0.40. The US is a richer country with a more unequal income distribution — a
              combination that is possible, even common, but not what most people assume when comparing
              a high-income and a lower-income economy. The interactive percentile portrait below,
              using the same format as the Tanzania analysis, makes the structural shape legible.
            </Prose>

            <ChartPanel
              label="United States — Percentile Profile (click to expand)"
              caption="Census ASEC 2024 via DQYDJ/IPUMS CPS v11.0. Includes all workers with wage income — full-time and part-time. Full-time-only median is $61,984/yr (BLS CPS Q4 2024)."
            >
              <PercentilesViz
                data={USA_PERCENTILES}
                activeKey={usaActive}
                onToggle={setUsaActive}
                maxVal={450000}
                accentColor={D.sky}
                rangeKey="annual"
              />
            </ChartPanel>

            <Prose>
              The US distribution has the same log-normal family shape as Tanzania's, but its upper
              tail is structurally different. Where Tanzania's high-earner effect is driven by a
              relatively small and bounded group — senior civil servants on grade bands, finance
              executives in a nascent banking sector — the US tail is driven by executive compensation
              schemes, technology sector equity, and financial services where individual earnings are
              effectively unbounded. A Tanzanian public servant's salary is constrained by the civil
              service schedule. A US hedge fund manager's is not constrained by anything comparable.
              The result is that the US P99 ($430,000/year) is 8.6 times the median, while Tanzania's
              equivalent ratio is approximately 4.7 times. The richest country in the world has a more
              extreme earnings tail than Tanzania's formal sector. The top 1% of US earners capture
              roughly 20% of all individual income — a single percentile accounting for a fifth of
              the total.
            </Prose>
          </section>
        </FadeIn>

        {/* ── 07 COMPARISON ────────────────────────────────────────── */}
        <FadeIn>
          <section className="mb-16">
            <Eyebrow n={7}>Two Countries, One Distortion</Eyebrow>

            <Prose>
              The comparison table below places the key statistical measures side by side. The
              Tanzania column uses the formal sector, which is the closest equivalent to the US
              wage-and-salary workforce the US surveys cover. Several findings stand out.
            </Prose>

            {/* Comparison Table */}
            <div className="my-8 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="text-left pb-3 pr-4 font-mono text-[10px] tracking-widest uppercase text-stone-400 font-normal">Metric</th>
                    <th className="text-left pb-3 pr-4 font-mono text-[10px] tracking-widest uppercase text-amber-600 font-normal">Tanzania (Formal)</th>
                    <th className="text-left pb-3 pr-4 font-mono text-[10px] tracking-widest uppercase text-sky-600 font-normal">United States</th>
                    <th className="text-left pb-3 font-mono text-[10px] tracking-widest uppercase text-stone-400 font-normal hidden sm:table-cell">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((r, i) => (
                    <tr key={i} className="border-b border-stone-100 last:border-0">
                      <td className="py-3 pr-4 font-serif text-stone-600 align-top">{r.metric}</td>
                      <td className="py-3 pr-4 font-mono text-amber-700 font-medium align-top">{r.tz}</td>
                      <td className="py-3 pr-4 font-mono text-sky-700 font-medium align-top">{r.usa}</td>
                      <td className="py-3 font-serif text-xs text-stone-400 italic align-top hidden sm:table-cell">
                        {r.flag || ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Prose>
              The mean/median ratio — the simplest single measure of how much high earners inflate the
              average — is 1.27× in Tanzania and 1.46× in the US. Both distributions are right-skewed,
              but the US skew is more pronounced. The P90/P10 ratio is 5× in Tanzania versus 14.6× in
              the US — though this comparison is complicated by the US figure including part-time and
              part-year workers who have no equivalent in the formal sector frame. Even the Pearson
              skewness coefficients are similar (0.8–1.0 in both cases), confirming that the
              mathematical structure of the problem is the same in both economies, just calibrated
              differently at the top.
            </Prose>

            <Prose>
              The structural cause of the difference is the absence of a ceiling on private compensation
              in the US. Tanzania's high earners are mostly constrained: the civil service has grade
              bands, the finance sector is small, and executive compensation is modest by international
              standards. The US has none of these constraints at scale — technology, finance, and
              executive pay create individual earnings that dwarf anything in Tanzania's distribution.
              This is not a moral distinction. It is a structural one that explains why, despite being
              a far wealthier country on average, the US has a more unequal earnings distribution by
              every tail measure.
            </Prose>
          </section>
        </FadeIn>

        {/* ── 08 WHAT THIS MEANS ───────────────────────────────────── */}
        <FadeIn>
          <section className="mb-16">
            <Eyebrow n={8}>What This Tells Us</Eyebrow>

            <Prose>
              The first thing it tells us is that the reported mean wage should rarely be used as a
              benchmark for individual workers. In Tanzania's formal sector, TZS 609,354 is the figure
              most likely to appear in press releases and policy documents. A graduate entering the
              formal labour market who benchmarks against it will likely be disappointed — the median
              worker in that market earns approximately TZS 480,000, and the mode is even lower. The
              more honest anchor is the P50, or for the upper half of the workforce, the P75. The same
              applies in the US: $73,472 as a salary benchmark inflates expectations for most workers
              in most occupations.
            </Prose>

            <Prose>
              The second thing it tells us is that geography and sector matter more than aggregate
              statistics suggest. In Tanzania, Dar es Salaam accounts for 33.7% of all formal jobs,
              and Finance and Insurance — the highest-earning sector — is concentrated there. A formal
              sector worker in Dar es Salaam in a financial institution occupies a fundamentally
              different position in the distribution than a manufacturing worker in Morogoro. These
              are not deviations from the average; they are the structure that the average conceals.
              In the US, the equivalent distinction runs between coastal tech and finance workers and
              the median service sector employee in a mid-sized city.
            </Prose>

            <Prose>
              Third, and perhaps most important for anyone reading this from Tanzania: the country's
              formal sector, despite its informality problems and developmental constraints, does not
              have an exceptionally extreme earnings distribution by international standards. The P99/P50
              ratio of approximately 4.7× compares favourably to the US equivalent of 8.6×. What
              Tanzania has is a low absolute floor and a narrow formal sector — not, relative to its
              size, an unusually fat tail. The policy challenge is widening the formal sector and
              raising the floor, not necessarily redistributing from the top.
            </Prose>

            <Prose>
              Finally, the Mode &lt; Median &lt; Mean ordering that opens this analysis is not a
              peculiarity of Tanzania or the US. It is the default state of wage distributions in
              every market economy where private compensation can vary freely. The typical worker
              in any labour market earns below the average wage. Understanding that fact — and reading
              earnings data with that structural reality in mind — is the beginning of any serious
              engagement with what labour markets actually do.
            </Prose>
          </section>
        </FadeIn>

        {/* ── METHODOLOGY ──────────────────────────────────────────── */}
        <FadeIn>
          <section className="pt-8 border-t border-stone-200">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-4">
              Methodology & Sources
            </p>
            <p className="font-serif text-[0.875rem] text-stone-500 leading-[1.85]">
              Tanzania data is drawn primarily from the National Bureau of Statistics Formal Sector
              Employment and Earnings Survey (EES 2023/24) and the Integrated Labour Force Survey
              (ILFS 2024). Where the EES publishes sector-level means and employment shares rather
              than full percentile distributions, percentile estimates are back-calculated using a
              log-normal distribution fitted to the available anchor points (sector means, national
              mean, public/private split). These estimates are labelled as such throughout and should
              be treated as informed approximations rather than directly observed data. United States
              percentile data is drawn directly from the Census Bureau Annual Social and Economic
              Supplement (ASEC 2024) as compiled by DQYDJ/IPUMS CPS v11.0, and from the Bureau of
              Labour Statistics Occupational Employment and Wage Statistics (OEWS, May 2024) and
              Current Population Survey (Q4 2024, USDL-25-0072). Gini coefficients, income share
              data, and top-percentile income figures for the US are sourced from IRS Statistics of
              Income (2022, CPI-adjusted to 2024). All figures are pre-tax gross individual earnings
              unless otherwise noted. Currency conversion (TZS to USD) uses a reference rate of
              approximately TZS 2,650 per USD, for contextual comparison only.
            </p>

            {/* Footer bar */}
            <div className="mt-12 pt-6 border-t border-stone-200 flex items-center justify-between flex-wrap gap-4">
              <p className="font-mono text-[10px] text-stone-400 tracking-widest">
                © 2025 Godbless Gadiel Kaaya · Blenko Technologies
              </p>
              <Link
                to="/research"
                className="font-mono text-[10px] tracking-widest uppercase text-stone-400 hover:text-stone-700 transition-colors"
              >
                ← All research
              </Link>
            </div>
          </section>
        </FadeIn>

      </main>
    </div>
  );
}

"use client";

import { useState } from 'react';
import {
  Play,
  Clock,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Search,
  BarChart3,
  Shield,
  Users,
  Zap,
  TrendingUp,
  Lock,
} from 'lucide-react';

// ── Video data ────────────────────────────────────────────────────────────────
// Using YouTube embed IDs — replace with your own video IDs when ready.
const ALL_VIDEOS = [
  {
    id: 1,
    title: 'System Initialization & Onboarding',
    description: 'Get your VeylanLabs dashboard fully set up, link your Telegram and TradingView accounts, and understand the Command Center.',
    duration: '5:24',
    category: 'Onboarding',
    icon: Zap,
    youtubeId: 'dQw4w9WgXcQ', // replace with real ID
    free: true,
    order: 1,
  },
  {
    id: 2,
    title: 'Reading the Liquidity Maps',
    description: 'Identify high-density liquidation zones, understand long vs short clusters, and use the heatmap to plan entries.',
    duration: '12:10',
    category: 'Indicators',
    icon: TrendingUp,
    youtubeId: 'dQw4w9WgXcQ',
    free: true,
    order: 2,
  },
  {
    id: 3,
    title: 'Market Structure & CHoCH Detection',
    description: 'Master Higher Highs / Lower Lows, Break of Structure (BOS), and Change of Character (CHoCH) across timeframes.',
    duration: '8:45',
    category: 'Strategy',
    icon: BarChart3,
    youtubeId: 'dQw4w9WgXcQ',
    free: true,
    order: 3,
  },
  {
    id: 4,
    title: 'Risk Protocol Configuration',
    description: 'Set your max drawdown killswitch, configure per-trade risk limits, and enable auto-kill position management.',
    duration: '6:30',
    category: 'Risk',
    icon: Shield,
    youtubeId: 'dQw4w9WgXcQ',
    free: false,
    order: 4,
  },
  {
    id: 5,
    title: 'War Room Etiquette & Alert System',
    description: 'How to read Telegram signal alerts, understand timeframes, and act on War Room notifications correctly.',
    duration: '3:20',
    category: 'Community',
    icon: Users,
    youtubeId: 'dQw4w9WgXcQ',
    free: false,
    order: 5,
  },
  {
    id: 6,
    title: 'Advanced Order Block Identification',
    description: 'Deep-dive into institutional order blocks, mitigation blocks, and breaker blocks with live chart examples.',
    duration: '15:00',
    category: 'Strategy',
    icon: BarChart3,
    youtubeId: 'dQw4w9WgXcQ',
    free: false,
    order: 6,
  },
];

const CATEGORIES = ['All', 'Onboarding', 'Indicators', 'Strategy', 'Risk', 'Community'];

const CATEGORY_COLORS: Record<string, string> = {
  Onboarding: 'text-[var(--neon)] bg-[var(--neon-dim)] border-[var(--neon)]/30',
  Indicators:  'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
  Strategy:    'text-blue-500 bg-blue-500/10 border-blue-500/30',
  Risk:        'text-amber-500 bg-amber-500/10 border-amber-500/30',
  Community:   'text-purple-500 bg-purple-500/10 border-purple-500/30',
};

export default function TrainingPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [watchingId, setWatchingId] = useState<number | null>(null);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const filtered = ALL_VIDEOS.filter(v => {
    const matchCat = activeCategory === 'All' || v.category === activeCategory;
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) ||
                        v.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const watchingVideo = ALL_VIDEOS.find(v => v.id === watchingId);

  const markComplete = (id: number) => {
    setCompleted(prev => new Set([...prev, id]));
  };

  const completedCount = completed.size;
  const progress = Math.round((completedCount / ALL_VIDEOS.length) * 100);

  return (
    <div className="animate-fade-in-up">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-1 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-[var(--neon)]" />
            Training Academy
          </h1>
          <p className="text-muted-foreground">Master the VeylanLabs suite and optimize your workflow.</p>
        </div>

        {/* Progress pill */}
        <div className="glass-panel rounded-2xl px-5 py-3 flex items-center gap-4 min-w-[200px]">
          <div className="flex-1">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Your Progress</div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--neon)] rounded-full transition-all duration-700 shadow-[0_0_8px_var(--neon)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="text-xl font-extrabold text-[var(--neon)] tabular-nums">{progress}%</span>
        </div>
      </div>

      {/* ── Video player modal ── */}
      {watchingVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-premium rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <span className={`text-xs font-bold px-2 py-1 rounded border mr-3 ${CATEGORY_COLORS[watchingVideo.category] || 'text-muted-foreground bg-muted border-border'}`}>
                  {watchingVideo.category}
                </span>
                <span className="font-bold text-foreground">{watchingVideo.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { markComplete(watchingVideo.id); setWatchingId(null); }}
                  className="flex items-center gap-1.5 text-xs font-bold text-[var(--neon)] hover:brightness-110 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" /> Mark Complete
                </button>
                <button
                  onClick={() => setWatchingId(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors text-2xl leading-none px-2"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${watchingVideo.youtubeId}?autoplay=1&rel=0`}
                title={watchingVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-muted-foreground">{watchingVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search lessons…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-[var(--neon)] focus:ring-1 focus:ring-[var(--neon)] transition-all text-sm"
          />
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                activeCategory === cat
                  ? 'bg-[var(--neon)] text-background border-transparent shadow-[0_0_10px_var(--neon)]'
                  : 'border-border text-muted-foreground hover:border-foreground/30 bg-background'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Video grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No lessons match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(video => {
            const Icon = video.icon;
            const isDone = completed.has(video.id);
            return (
              <div
                key={video.id}
                className={`glass-premium rounded-2xl overflow-hidden group flex flex-col transition-all hover:scale-[1.01] ${
                  isDone ? 'ring-1 ring-[var(--neon)]/40' : ''
                }`}
              >
                {/* Thumbnail */}
                <div
                  className="aspect-video bg-gradient-to-br from-black to-muted/30 relative flex items-center justify-center cursor-pointer"
                  onClick={() => video.free ? setWatchingId(video.id) : null}
                >
                  {/* Lesson number */}
                  <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-xs font-bold text-white/60">
                    {video.order}
                  </div>

                  {/* Duration badge */}
                  <span className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-bold font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {video.duration}
                  </span>

                  {/* Done badge */}
                  {isDone && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-[var(--neon)]/20 border border-[var(--neon)]/40 text-[var(--neon)] text-[10px] font-bold px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> DONE
                    </div>
                  )}

                  {/* Icon backdrop */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-16 h-16 text-white/5" />
                  </div>

                  {/* Play button */}
                  {video.free ? (
                    <div className="w-14 h-14 rounded-full bg-[var(--neon)]/20 border border-[var(--neon)]/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--neon)]/30 transition-all shadow-[0_0_20px_var(--neon-dim)] z-10">
                      <Play className="w-6 h-6 text-[var(--neon)] ml-1" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-black/40 border border-white/10 flex items-center justify-center z-10">
                      <Lock className="w-5 h-5 text-white/40" />
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ${CATEGORY_COLORS[video.category] || 'text-muted-foreground bg-muted border-border'}`}>
                      {video.category}
                    </span>
                    {!video.free && (
                      <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded">
                        INNER CIRCLE
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base leading-tight mb-2 group-hover:text-[var(--neon)] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                    {video.description}
                  </p>

                  <button
                    onClick={() => video.free ? setWatchingId(video.id) : null}
                    disabled={!video.free}
                    className={`mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      isDone
                        ? 'bg-[var(--neon-dim)] text-[var(--neon)] border border-[var(--neon)]/30'
                        : video.free
                          ? 'bg-background border border-border hover:border-[var(--neon)]/50 hover:text-[var(--neon)] text-foreground'
                          : 'bg-muted text-muted-foreground cursor-not-allowed border border-border'
                    }`}
                  >
                    {isDone ? (
                      <><CheckCircle2 className="w-4 h-4" /> Completed</>
                    ) : video.free ? (
                      <><Play className="w-4 h-4" /> Watch Now <ChevronRight className="w-3 h-3" /></>
                    ) : (
                      <><Lock className="w-4 h-4" /> Inner Circle Only</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center mt-8 opacity-60">
        More lessons added weekly. Inner Circle members unlock all content.
      </p>
    </div>
  );
}

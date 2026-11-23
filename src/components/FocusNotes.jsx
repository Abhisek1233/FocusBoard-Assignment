import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Sparkles, Flame, Trophy } from 'lucide-react';
import { focusNotesSlides } from '../data/sampleTasks';

export default function FocusNotes({ slides = focusNotesSlides }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const totalSlides = slides.length;
  const currentSlide = slides[currentSlideIndex];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handleSelectSlide = (index) => {
    setCurrentSlideIndex(index);
  };

  // Keyboard navigation for carousel
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Focus Notes Carousel"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 sm:p-7 shadow-lg shadow-indigo-950/20 border border-indigo-800/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
    >
      {/* Background ambient glowing shapes matching Figma visual treatment */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/3 w-40 h-40 rounded-full bg-purple-500/15 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left: Content Block */}
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/10 backdrop-blur-md text-indigo-200 border border-white/10">
              <Sparkles className="w-3 h-3 text-indigo-300" />
              {currentSlide.pill}
            </span>
            <span className="text-xs font-semibold font-mono tracking-widest text-indigo-300/80">
              {currentSlide.counter}
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {currentSlide.headline}
            </h2>
            <p className="text-sm text-indigo-100/80 mt-1">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Dash Navigation Indicators */}
          <div className="flex items-center gap-2 pt-1" role="tablist" aria-label="Slide Indicators">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={idx === currentSlideIndex}
                aria-label={`Go to slide ${idx + 1}: ${slide.headline}`}
                onClick={() => handleSelectSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
                  idx === currentSlideIndex
                    ? 'w-8 bg-white shadow-xs'
                    : 'w-3 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Floating Task Progress Card (Figma desktop fidelity) & Carousel Arrow Controls */}
        <div className="flex items-center gap-4 self-end md:self-center">
          {/* Floating Card */}
          <div className="hidden sm:flex flex-col gap-2 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl min-w-[210px] transform hover:scale-102 transition-transform">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                <CheckCircle2 className="w-2.5 h-2.5" />
                {currentSlide.cardBadge}
              </span>
              <span className="text-[11px] font-bold text-white/90">
                {currentSlide.cardProgress}%
              </span>
            </div>
            <div className="text-xs font-semibold text-white truncate">
              {currentSlide.cardTitle}
            </div>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-400 to-indigo-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${currentSlide.cardProgress}%` }}
              />
            </div>
          </div>

          {/* Previous & Next Control Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 active:scale-95 text-indigo-950 flex items-center justify-center shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

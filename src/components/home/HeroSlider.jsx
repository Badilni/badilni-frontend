import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  Keyboard,
} from 'swiper/modules'
import { useNavigate } from 'react-router-dom'
import { HERO_SLIDES } from './heroSliderData'
import {
  FiArrowRight,
  FiActivity,
  FiLayers,
  FiCalendar,
  FiSearch,
  FiCheck,
} from 'react-icons/fi'
import { BsArrowLeftRight, BsChatFill, BsStarFill } from 'react-icons/bs'

// Import Swiper styling sets natively directly into bundle context
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Mockup render helpers for each slide to make the slider extremely premium and interactive
function SlideMockup({ slideId }) {
  if (slideId === 'slide-welcome') {
    return (
      <div className="w-full max-w-[400px] bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-slate-800/60 p-6 md:p-8 shadow-2xl relative animate-float">
        <div className="absolute -inset-[1px] bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20 rounded-[2.5rem] pointer-events-none" />
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300">
            Live Swap Match
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />{' '}
            Active
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex flex-col items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
            />
            <div className="text-center">
              <p className="font-extrabold text-xs text-white">Sarah J.</p>
              <p className="text-[9px] text-blue-300 font-bold">
                Figma Designer
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-1">
            <BsArrowLeftRight className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-[8px] font-bold text-slate-300 bg-white/10 px-1.5 py-0.5 rounded-md">
              Swapping
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
            />
            <div className="text-center">
              <p className="font-extrabold text-xs text-white">Alex R.</p>
              <p className="text-[9px] text-purple-300 font-bold">
                Node Developer
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <BsChatFill className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <p className="text-[10px] text-white truncate font-bold">
              Swap Room #120
            </p>
          </div>
          <span className="text-[9px] text-slate-300 font-bold">8:00 PM</span>
        </div>
      </div>
    )
  }

  if (slideId === 'slide-teach') {
    return (
      <div className="w-full max-w-[400px] bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-slate-800/60 p-6 md:p-8 shadow-2xl relative animate-float-reverse">
        <div className="absolute -inset-[1px] bg-gradient-to-tr from-emerald-500/20 via-transparent to-teal-500/20 rounded-[2.5rem] pointer-events-none" />
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300">
            Teaching Session
          </span>
          <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold text-[10px] uppercase tracking-wider">
            Time Swap
          </span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <FiCalendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-white">
                Booked Time Swap Slot
              </p>
              <p className="text-[10px] text-slate-300">
                Tomorrow, 4:00 PM - 5:00 PM
              </p>
            </div>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between text-xs text-white">
            <span>Rate / Hour</span>
            <span className="font-extrabold text-emerald-400">
              Free (Swap Credit)
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (slideId === 'slide-request') {
    return (
      <div className="w-full max-w-[400px] bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-slate-800/60 p-6 md:p-8 shadow-2xl relative animate-float">
        <div className="absolute -inset-[1px] bg-gradient-to-tr from-orange-500/20 via-transparent to-red-500/20 rounded-[2.5rem] pointer-events-none" />
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300">
            Timeline Request
          </span>
          <FiSearch className="w-3.5 h-3.5 text-slate-300" />
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2.5">
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-[10px] font-bold text-white">
              Diana Prince
            </span>
          </div>
          <p className="text-xs font-bold text-white leading-snug">
            Looking for help with React JS routing and state management
          </p>
          <div className="flex justify-between items-center pt-2 border-t border-white/10">
            <span className="text-[9px] text-slate-300 font-bold bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded">
              Category: Web Dev
            </span>
            <span className="text-[10px] text-white font-bold">1 reply</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[400px] bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-slate-800/60 p-6 md:p-8 shadow-2xl relative animate-float-reverse">
      <div className="absolute -inset-[1px] bg-gradient-to-tr from-purple-500/20 via-transparent to-pink-500/20 rounded-[2.5rem] pointer-events-none" />
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300">
          Verified Credentials
        </span>
        <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold text-[9px] uppercase tracking-wider flex items-center gap-1">
          <FiCheck className="w-3 h-3" /> Trusted
        </span>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150"
            className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
          />
          <div>
            <p className="text-sm font-extrabold text-white">Michael Chen</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <BsStarFill className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-bold text-white">4.9</span>
              <span className="text-[10px] text-slate-300">(73 reviews)</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed italic">
          "Exchanged Python scripting for Figma basics. Super professional and
          easy to communicate with!"
        </p>
      </div>
    </div>
  )
}

export default function HeroSlider() {
  const navigate = useNavigate()

  return (
    <section
      className="relative w-full h-[520px] md:h-[580px] lg:h-[620px] bg-slate-900 overflow-hidden"
      aria-label="Platform introduction carousel"
    >
      {/* Background Neon glow shapes */}
      <div className="absolute top-[-10%] left-[20%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none z-0" />

      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={850}
        loop={true}
        keyboard={{ enabled: true, onlyInViewport: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          el: '.custom-hero-pagination',
          bulletClass:
            'w-2.5 h-2.5 mx-1.5 rounded-full bg-white/40 transition-all duration-300 inline-block cursor-pointer aria-hidden',
          bulletActiveClass: '!bg-blue-500 !w-7',
        }}
        navigation={{
          nextEl: '.hero-btn-next',
          prevEl: '.hero-btn-prev',
        }}
        className="w-full h-full"
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {({ isActive }) => (
              <div className="relative w-full h-full flex items-center">
                {/* Lazy-Loaded High Resolution Background Layer */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.image}
                    alt={slide.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[6000ms] ease-out scale-100"
                    style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)' }}
                  />
                  {/* Readability Gradient Overlays optimized for high contrast */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${slide.overlayClass || 'from-black/90 via-black/60'}`}
                  />
                  <div className="absolute inset-0 bg-slate-950/45" />
                </div>

                {/* Glassmorphism Content Card Container Grid */}
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8 z-10 relative">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left: Text & CTA */}
                    <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-300 font-bold text-[11px] uppercase tracking-wider">
                        <FiActivity className="w-3.5 h-3.5" />
                        <span>Interactive Platform Swap</span>
                      </div>

                      <h1
                        className={`text-3xl md:text-5xl lg:text-6xl font-black font-sans text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200 tracking-tight leading-[1.08] transition-all duration-500 delay-100 transform ${
                          isActive
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4'
                        }`}
                      >
                        {slide.title}
                      </h1>

                      <p
                        className={`text-xs md:text-sm lg:text-base text-slate-200/90 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 transition-all duration-500 delay-200 transform ${
                          isActive
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4'
                        }`}
                      >
                        {slide.description}
                      </p>

                      <div
                        className={`flex flex-wrap gap-3.5 items-center justify-center lg:justify-start pt-3 transition-all duration-500 delay-300 transform ${
                          isActive
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-95'
                        }`}
                      >
                        {slide.primaryCta && (
                          <button
                            onClick={() => navigate(slide.primaryCta.path)}
                            className="px-6 py-3 text-xs md:text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                          >
                            {slide.primaryCta.text}
                          </button>
                        )}

                        {slide.secondaryCta && (
                          <button
                            onClick={() => navigate(slide.secondaryCta.path)}
                            className="px-6 py-3 text-xs md:text-sm font-extrabold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
                          >
                            {slide.secondaryCta.text}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Right: Dynamic Slide Mockup Screen */}
                    <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
                      <SlideMockup slideId={slide.id} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Directional Navigation Controls (Hidden on small screens) */}
      <button
        className="hero-btn-prev hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-2xl bg-black/20 hover:bg-black/40 border border-white/10 backdrop-blur-md text-white hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 cursor-pointer shadow-lg"
        aria-label="Previous slide"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        className="hero-btn-next hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-2xl bg-black/20 hover:bg-black/40 border border-white/10 backdrop-blur-md text-white hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 cursor-pointer shadow-lg"
        aria-label="Next slide"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Structured Pagination Dots Overlay Dock */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center items-center pointer-events-none">
        <div className="custom-hero-pagination px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center pointer-events-auto shadow-lg" />
      </div>
    </section>
  )
}

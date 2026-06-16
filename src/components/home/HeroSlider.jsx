import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination, Keyboard } from 'swiper/modules'
import { useNavigate } from 'react-router-dom'
import { HERO_SLIDES } from './heroSliderData'

// Import Swiper styling sets natively directly into bundle context
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function HeroSlider() {
  const navigate = useNavigate()

  return (
    <section 
      className="relative w-full h-[380px] md:h-[440px] lg:h-[480px] bg-slate-100 dark:bg-slate-950 overflow-hidden"
      aria-label="Platform introduction carousel"
    >
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        loop={true}
        keyboard={{ enabled: true, onlyInViewport: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          el: '.custom-hero-pagination',
          bulletClass: 'w-2.5 h-2.5 mx-1.5 rounded-full bg-slate-400/60 dark:bg-slate-600/60 transition-all duration-300 inline-block cursor-pointer aria-hidden',
          bulletActiveClass: '!bg-blue-600 dark:!bg-blue-400 !w-7',
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
                    className="w-full h-full object-cover transition-transform duration-[5000ms] ease-out scale-100"
                    style={{ transform: isActive ? 'scale(1.04)' : 'scale(1)' }}
                  />
                  {/* Readability Gradient Overlays optimized for light/dark balances */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-transparent dark:from-slate-950/90 dark:via-slate-950/60 dark:to-transparent" />
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
                </div>

                {/* Glassmorphism Content Card Container Grid */}
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8 z-10 relative">
                  <div 
                    className={`max-w-xl md:max-w-2xl bg-white/10 dark:bg-slate-900/20 backdrop-blur-md border border-white/20 dark:border-slate-800/30 p-5 md:p-8 rounded-2xl shadow-2xl transition-all duration-700 transform ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    {/* Header Title Layer */}
                    <h1 
                      className={`text-2xl md:text-3xl lg:text-4xl font-black font-sans text-white tracking-tight leading-[1.2] mb-2.5 transition-all duration-500 delay-100 transform ${
                        isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                    >
                      {slide.title}
                    </h1>

                    {/* Description Paragraph Block */}
                    <p 
                      className={`text-xs md:text-sm lg:text-base text-slate-100 dark:text-slate-200 font-medium leading-relaxed mb-5 md:mb-6 transition-all duration-500 delay-200 transform ${
                        isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                    >
                      {slide.description}
                    </p>

                    {/* Action Nodes Footer Wrapper */}
                    <div 
                      className={`flex flex-wrap gap-2.5 items-center transition-all duration-500 delay-300 transform ${
                        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                    >
                      {slide.primaryCta && (
                        <button
                          onClick={() => navigate(slide.primaryCta.path)}
                          className="px-5 py-2.5 text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-blue-600/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer"
                        >
                          {slide.primaryCta.text}
                        </button>
                      )}
                      
                      {slide.secondaryCta && (
                        <button
                          onClick={() => navigate(slide.secondaryCta.path)}
                          className="px-5 py-2.5 text-xs md:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl transition-all duration-200 backdrop-blur-sm transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer"
                        >
                          {slide.secondaryCta.text}
                        </button>
                      )}
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
        className="hero-btn-prev hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-xl bg-white/10 dark:bg-slate-900/20 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 cursor-pointer shadow-lg"
        aria-label="Previous slide"
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        className="hero-btn-next hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-xl bg-white/10 dark:bg-slate-900/20 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 cursor-pointer shadow-lg"
        aria-label="Next slide"
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Structured Pagination Dots Overlay Dock */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center items-center pointer-events-none">
        <div className="custom-hero-pagination px-3 py-1.5 rounded-full bg-slate-900/30 dark:bg-black/30 backdrop-blur-sm border border-white/5 flex items-center pointer-events-auto" />
      </div>
    </section>
  )
}
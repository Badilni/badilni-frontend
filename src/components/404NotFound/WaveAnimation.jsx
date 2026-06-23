const WaveBackground = ({ opacityTop = 'opacity-15', opacityBottom = 'opacity-25' }) => {
  return (
    <>
      <style>{`
        @keyframes waveLeftToRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-wave-top {
          animation: waveLeftToRight 18s linear infinite;
        }
        .animate-wave-bottom-fast {
          animation: waveLeftToRight 10s linear infinite;
        }
        .animate-wave-bottom-slow {
          animation: waveLeftToRight 15s linear infinite;
        }
      `}</style>

      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-0 h-[140px] md:h-[200px] pointer-events-none">
        <div className={`w-[200%] h-full flex animate-wave-top ${opacityTop}`}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-1/2 h-full fill-blue-600">
            <path d="M0,0V30c150,50,350,50,600,0s450-50,600,0V0H0Z"></path>
          </svg>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-1/2 h-full fill-blue-600">
            <path d="M0,0V30c150,50,350,50,600,0s450-50,600,0V0H0Z"></path>
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0 h-[140px] md:h-[180px] pointer-events-none">
        <div className={`w-[200%] h-full flex animate-wave-bottom-fast absolute bottom-0 left-0 ${opacityBottom}`}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-1/2 h-full fill-blue-500">
            <path d="M0,60 C300,10 300,110 600,60 C900,10 900,110 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-1/2 h-full fill-blue-500">
            <path d="M0,60 C300,10 300,110 600,60 C900,10 900,110 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>

        <div className="w-[200%] h-full flex animate-wave-bottom-slow relative z-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-1/2 h-full fill-blue-600">
            <path d="M0,60 C300,110 300,10 600,60 C900,110 900,10 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-1/2 h-full fill-blue-600">
            <path d="M0,60 C300,110 300,10 600,60 C900,110 900,10 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </div>
    </>
  )
}

export default WaveBackground

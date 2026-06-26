const OrbitingCircles = () => {
  return (
    <>
      <style>{`
        @keyframes waveFlowForward {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -200; }
        }
        @keyframes waveFlowBackward {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: 200; }
        }

        .animate-flow-mid-1 { animation: waveFlowForward 8s linear infinite; }
        .animate-flow-mid-2 { animation: waveFlowBackward 10s linear infinite; }
        .animate-flow-mid-3 { animation: waveFlowForward 12s linear infinite 0.5s; }
        .animate-flow-mid-4 { animation: waveFlowBackward 14s linear infinite 1s; }
      `}</style>

      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50 dark:opacity-40 z-0 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="animate-flow-mid-1"
            d="M -50,450 C 300,550 500,250 900,450 C 1200,650 1300,300 1490,200"
            stroke="var(--primary-light)"
            strokeWidth="1.5"
            strokeDasharray="20 10"
          />

          <path
            className="animate-flow-mid-2"
            d="M -50,320 C 250,150 600,550 850,300 C 1150,120 1350,450 1490,380"
            stroke="var(--primary-light)"
            strokeWidth="1"
            strokeDasharray="15 15"
            opacity="0.7"
          />

          <path
            className="animate-flow-mid-3"
            d="M -50,100 C 400,200 300,600 800,500 C 1100,400 1200,700 1490,750"
            stroke="var(--secondary-light)"
            strokeWidth="1.2"
            strokeDasharray="30 15"
          />

          <path
            className="animate-flow-mid-4"
            d="M -50,220 C 350,50 450,350 850,200 C 1150,80 1250,450 1490,500"
            stroke="var(--secondary-light)"
            strokeWidth="1.5"
            strokeDasharray="10 10"
            opacity="0.8"
          />

          <path
            className="animate-flow-mid-1"
            d="M -100,750 C 250,600 500,780 800,620 C 1100,480 1250,720 1490,580"
            stroke="var(--main-text)"
            strokeWidth="1.2"
            strokeDasharray="25 10"
          />

          <path
            className="animate-flow-mid-2"
            d="M -50,280 C 200,420 500,180 800,320 C 1100,450 1300,220 1490,360"
            stroke="var(--main-text)"
            strokeWidth="1"
            strokeDasharray="12 12"
            opacity="0.6"
          />

          <path
            className="animate-flow-mid-3"
            d="M 50,-50 C 400,150 500,350 800,500 C 1100,650 1200,450 1400,300"
            stroke="var(--black-text)"
            strokeWidth="1.2"
            strokeDasharray="40 20"
            opacity="0.7"
          />

          <path
            className="animate-flow-mid-4"
            d="M -100,520 C 250,680 600,400 850,600 C 1050,750 1250,500 1440,680"
            stroke="var(--black-text)"
            strokeWidth="1"
            strokeDasharray="15 10"
            opacity="0.5"
          />

          <path
            className="animate-flow-mid-1"
            d="M -100,50 C 250,180 500,-20 850,120 C 1150,220 1300,20 1490,150"
            stroke="var(--gray-text)"
            strokeWidth="1.2"
            strokeDasharray="20 15"
          />

          <path
            className="animate-flow-mid-2"
            d="M -50,580 C 300,380 600,750 900,520 C 1150,380 1300,680 1490,480"
            stroke="var(--gray-text)"
            strokeWidth="1"
            strokeDasharray="8 8"
            opacity="0.7"
          />
        </svg>
      </div>
    </>
  )
}

export default OrbitingCircles

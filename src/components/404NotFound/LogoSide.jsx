const LogoSide = ({ src }) => {
  return (
    <>
      <style>{`
        @keyframes blueGlowPulse {
          0% {
            filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 35px rgba(47, 151, 233, 0.9));
          }
          100% {
            filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.5));
          }
        }
        .animate-blue-glow {
          animation: blueGlowPulse 4s ease-in-out infinite;
        }
      `}</style>

      <div className="w-64 h-64 md:w-80 md:h-80 lg:w-[250px] lg:h-[250px] flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform duration-300">
        <img
          src={src}
          alt="Badal Creative Block Illustration"
          className="w-full h-full object-contain animate-blue-glow"
          draggable="false"
        />
      </div>
    </>
  )
}

export default LogoSide

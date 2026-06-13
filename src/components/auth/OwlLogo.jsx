import React, { useState, useEffect } from 'react'

const OwlLogo = ({
  errorMessage = '',
  passwordFocused = false,
  submitHovered = false,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })  

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const calculateEyeOffset = () => {
    if (errorMessage || submitHovered || passwordFocused) {
      return { dx: 0, dy: 0 }
    }
    const dx = Math.min(
      Math.max((mousePos.x / window.innerWidth - 0.5) * 20, -10),
      10
    )
    const dy = Math.min(
      Math.max((mousePos.y / window.innerHeight - 0.5) * 20, -10),
      10
    )
    return { dx, dy }
  }

  const { dx, dy } = calculateEyeOffset()

  const showError = !!errorMessage
  const showHearts = !showError && submitHovered
  const showClosed = !showError && !submitHovered && passwordFocused
  const showDefault = !showError && !submitHovered && !passwordFocused

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-[220px] h-[220px] md:w-[250px] md:h-[250px]">
        <svg viewBox="0 0 200 200" width="100%" height="100%">
          {/* Graduation Cap */}
          <rect
            x="20"
            y="30"
            width="80"
            height="25"
            fill="var(--owl-logo)"
          />
          <rect x="100" y="30" width="80" height="25" fill="#3B96EC" />
          <rect x="45" y="55" width="55" height="30" fill="#3B96EC" />
          <rect
            x="100"
            y="55"
            width="55"
            height="30"
            fill="var(--owl-logo)"
          />
          <rect x="165" y="40" width="6" height="55" fill="#4A5568" />
          <polygon points="160,95 176,95 180,120 156,120" fill="#FF3B00" />

          {/* Outer Eye Sockets */}
          <circle cx="65" cy="115" r="45" fill="var(--owl-logo)" />
          <circle cx="135" cy="115" r="45" fill="#3B96EC" />
          <circle cx="65" cy="115" r="28" fill="#F0F4F8" />
          <circle cx="135" cy="115" r="28" fill="#F0F4F8" />

          {showError && (
            <>
              <text
                x="65"
                y="122"
                textAnchor="middle"
                fill='#DC2626'
                fontSize="20"
                fontWeight="bold"
                fontFamily="s"
              >
                Error
              </text>
              <text
                x="135"
                y="122"
                textAnchor="middle"
                fill="#DC2626"
                fontSize="20"
                fontWeight="bold"
                fontFamily="s"
              >
                Error
              </text>
            </>
          )}

          {/* Hearts — sized to fit nicely inside eye circle r=28 */}
          {showHearts && (
            <>
              {/* Left eye heart */}
              <g transform="translate(65, 108)">
                <path
                  d="M0,5 C-3,-3 -14,-3 -14,6 C-14,13 0,20 0,20 C0,20 14,13 14,6 C14,-3 3,-3 0,5 Z"
                  fill="#FF3B00"
                />
              </g>
              {/* Right eye heart */}
              <g transform="translate(135, 108)">
                <path
                  d="M0,5 C-3,-3 -14,-3 -14,6 C-14,13 0,20 0,20 C0,20 14,13 14,6 C14,-3 3,-3 0,5 Z"
                  fill="#FF3B00"
                />
              </g>
            </>
          )}

          {/* Closed eyes — arc curves downward like a closed eyelid */}
          {showClosed && (
            <>
              <path
                d="M 45 115 Q 65 130 85 115"
                stroke="#0B1930"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 115 115 Q 135 130 155 115"
                stroke="#0B1930"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            </>
          )}

          {/* Default — eyes follow mouse */}
          {showDefault && (
            <>
              <g transform={`translate(${dx}, ${dy})`}>
                <circle cx="65" cy="115" r="15" fill="#00E5FF" />
                <circle cx="65" cy="115" r="7" fill="#222B36" />
              </g>
              <g transform={`translate(${dx}, ${dy})`}>
                <circle cx="135" cy="115" r="15" fill="#00E5FF" />
                <circle cx="135" cy="115" r="7" fill="#222B36" />
              </g>
            </>
          )}

          {/* Beak */}
          <polygon points="100,125 100,165 85,145" fill="#FFC300" />
          <polygon points="100,125 100,165 115,145" fill="#E0A800" />
        </svg>
      </div>
    </div>
  )
}

export default OwlLogo

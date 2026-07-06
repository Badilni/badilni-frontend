import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiCompass,
  FiTrendingUp,
  FiMessageSquare,
  FiArrowRight,
} from 'react-icons/fi'

function StepMockup({ stepIdx }) {
  // macOS style browser bar wrapper
  const wrapMockup = (content, activeUrl) => (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] space-y-4 relative overflow-hidden transition-all duration-500">
      {/* Background glow inside the mockup */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 blur-[40px] pointer-events-none rounded-full" />
      
      {/* Mac Window Control Header */}
      <div className="flex items-center gap-1.5 pb-3.5 border-b border-slate-800/80">
        <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm" />
        <span className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm" />
        <div className="flex-1 text-center pr-10">
          <span className="text-[10px] text-slate-500 font-mono font-bold tracking-tight bg-slate-950/40 px-3 py-1 rounded-md border border-slate-800/60 select-none">
            {activeUrl}
          </span>
        </div>
      </div>
      
      {/* Inner Screen Content */}
      <div className="relative z-10">{content}</div>
    </div>
  )

  if (stepIdx === 0) {
    return wrapMockup(
      <div className="space-y-4 text-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-650 text-white flex items-center justify-center font-bold text-sm shadow-md">
            S
          </div>
          <div>
            <div className="h-4 bg-slate-800 rounded-md w-28 mb-1.5" />
            <div className="h-2.5 bg-slate-800/60 rounded-md w-16" />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider">Skills I Can Teach</p>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] px-3 py-1 rounded-lg bg-blue-950/40 text-blue-300 font-bold border border-blue-900/40">React JS</span>
            <span className="text-[10px] px-3 py-1 rounded-lg bg-blue-950/40 text-blue-300 font-bold border border-blue-900/40">Node.js</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider">Skills I Want to Learn</p>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] px-3 py-1 rounded-lg bg-purple-950/40 text-purple-300 font-bold border border-purple-900/40">UI/UX Design</span>
            <span className="text-[10px] px-3 py-1 rounded-lg bg-purple-950/40 text-purple-300 font-bold border border-purple-900/40">Figma</span>
          </div>
        </div>
      </div>,
      'badilni.com/profile/setup'
    )
  }

  if (stepIdx === 1) {
    return wrapMockup(
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
          <p className="text-xs font-bold text-slate-200">Matching Swap Partners</p>
          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md font-bold">2 Found</span>
        </div>
        
        {/* Match 1 */}
        <div className="p-3 bg-slate-950/50 border border-slate-800/60 rounded-2xl flex items-center justify-between gap-3 hover:border-slate-700/60 transition-colors">
          <div className="flex items-center gap-2">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150" className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-800" />
            <div>
              <p className="text-xs font-bold text-slate-200">Sarah Jenkins</p>
              <p className="text-[9px] text-emerald-400 font-bold">Offers UI/UX Design</p>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 font-bold">98% Match</span>
        </div>

        {/* Match 2 */}
        <div className="p-3 bg-slate-950/50 border border-slate-800/60 rounded-2xl flex items-center justify-between gap-3 hover:border-slate-700/60 transition-colors">
          <div className="flex items-center gap-2">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-800" />
            <div>
              <p className="text-xs font-bold text-slate-200">Alex Rivera</p>
              <p className="text-[9px] text-emerald-400 font-bold">Offers Figma Basics</p>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 font-bold">92% Match</span>
        </div>
      </div>,
      'badilni.com/explore/swappers'
    )
  }

  return wrapMockup(
    <div className="space-y-4 text-slate-200">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-xs font-bold text-slate-200">Chatting with Sarah J.</p>
        </div>
        <span className="text-[9px] text-slate-500">Active Now</span>
      </div>

      <div className="space-y-3 h-[130px] overflow-y-auto scrollbar-hide pr-1">
        <div className="flex gap-2">
          <div className="max-w-[85%] rounded-2xl p-3 bg-slate-800/70 border border-slate-750 text-[11px] text-slate-200 leading-relaxed shadow-sm">
            Hi! I saw your React profile. Would you be interested in swapping for UI/UX training?
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <div className="max-w-[85%] rounded-2xl p-3 bg-gradient-to-r from-blue-600 to-indigo-650 text-white text-[11px] font-semibold leading-relaxed shadow-sm">
            Sure! That sounds like a perfect swap. Let's schedule a Zoom call this evening!
          </div>
        </div>
      </div>
    </div>,
    'badilni.com/chat/sarah-jenkins'
  )
}

export default function HomeFeatures() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: 'Define Your Talents',
      description:
        'Sign up, update your profile, and list the skill tags you can share and the ones you want to learn. It takes less than 2 minutes!',
      icon: <FiCompass className="w-5 h-5" />,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Step 01',
    },
    {
      title: 'Find Your Perfect Swap',
      description:
        'Browse offers or request specific services in the timeline. Find partners matching your target expertise.',
      icon: <FiTrendingUp className="w-5 h-5" />,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Step 02',
    },
    {
      title: 'Connect & Learn Together',
      description:
        'Initiate a secure instant chat, agree on a session time, swap your knowledge, and review each other to earn trust.',
      icon: <FiMessageSquare className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-600',
      badge: 'Step 03',
    },
  ]

  const features = [
    {
      title: '100% Free Swap',
      desc: 'No credit cards, no hidden charges. Just pure knowledge exchange powered by the community.',
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      largeIcon: (
        <svg className="w-36 h-36 text-blue-500/10 dark:text-blue-450/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      border: 'hover:border-blue-500/30 dark:hover:border-blue-500/20',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Vetted Trust Network',
      desc: 'Authentic ratings, transparent reviews, and verified profile credentials keep our space safe and professional.',
      icon: (
        <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      largeIcon: (
        <svg className="w-36 h-36 text-emerald-500/10 dark:text-emerald-450/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      border: 'hover:border-emerald-500/30 dark:hover:border-emerald-500/20',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Direct Instant Chat',
      desc: 'Send requests and chat in real-time with other members to quickly coordinate session details.',
      icon: (
        <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      largeIcon: (
        <svg className="w-36 h-36 text-purple-500/10 dark:text-purple-450/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      border: 'hover:border-purple-500/30 dark:hover:border-purple-500/20',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <div id="why-badilni-section" className="w-full bg-slate-50/50 dark:bg-slate-950/20 py-16 md:py-24 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section 1: Core Values / Why Us */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-4 py-2 rounded-full shadow-sm">
            Why Badilni
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight mt-5">
            A Better Way to Learn and Grow
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-slate-400 mt-4 font-semibold max-w-xl mx-auto leading-relaxed">
            Badilni is built around community trust, collaboration, and barrier-free skill sharing. Here is how we redefine online learning.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((feat, index) => (
            <div
              key={index}
              className="relative group hover:-translate-y-2 transition-all duration-300"
            >
              {/* Glowing Blur Aura behind card */}
              <div className={`absolute -inset-[1px] bg-gradient-to-r ${feat.color} rounded-[2rem] opacity-0 group-hover:opacity-100 blur-[2px] transition-all duration-500 z-0`} />
              <div className={`absolute -inset-[8px] bg-gradient-to-r ${feat.color} rounded-[2.5rem] opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500 z-0 pointer-events-none`} />

              {/* Card Body */}
              <div className="relative z-10 bg-gradient-to-br from-white to-slate-50/70 dark:from-slate-900 dark:to-slate-950/60 border border-gray-150/80 dark:border-slate-800/85 p-8 rounded-[2rem] h-full flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                {/* Large transparent icon watermark */}
                <div className="absolute -bottom-6 -right-6 pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 z-0 opacity-40 group-hover:opacity-60">
                  {feat.largeIcon}
                </div>

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shrink-0 ${feat.bg} transition-transform duration-300 group-hover:scale-110 shadow-md`}>
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400 mt-4 leading-relaxed font-semibold">
                    {feat.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Step-by-Step Interactive Workflow */}
        <div className="bg-[var(--whiteBackground)] dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-[2.5rem] p-6 md:p-12 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
            {/* Step Left: Text Header & Mockup Preview */}
            <div className="lg:w-5/12 space-y-6 w-full">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-3 py-1.5 rounded-full shadow-sm">
                  Interactive Walkthrough
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
                  How Skill Swapping Works on Badilni
                </h2>
                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Get started today in three simple steps. Click on any step indicator on the right to see how easy it is to exchange expertise.
                </p>
              </div>

              {/* Dynamic Step Mockup Screen */}
              <div key={activeStep} className="py-2 animate-fade-in">
                <StepMockup stepIdx={activeStep} />
              </div>
              
              <button
                onClick={() => navigate('/signUp')}
                className="group flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-sm shadow-xl shadow-blue-500/20 hover:brightness-110 hover:shadow-2xl transition-all duration-200 cursor-pointer active:scale-95 w-full justify-center sm:w-auto"
              >
                <span>Join Community Now</span>
                <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Step Right: Interactive Steps List */}
            <div className="lg:w-7/12 w-full space-y-5">
              {steps.map((step, idx) => {
                const isSelected = activeStep === idx
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`relative w-full rounded-[2rem] p-6 pl-8 border cursor-pointer transition-all duration-300 overflow-hidden ${
                      isSelected
                        ? 'bg-slate-50 dark:bg-slate-950/40 border-blue-400 dark:border-blue-500/85 shadow-sm scale-[1.01]'
                        : 'bg-transparent border-transparent hover:bg-slate-50/50 dark:hover:bg-slate-950/20'
                    }`}
                  >
                    {/* Left active line indicator */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${step.color} transition-all duration-300 transform origin-top ${isSelected ? 'scale-y-100' : 'scale-y-0'}`} />

                    <div className="flex items-start gap-4">
                      {/* Step Badge */}
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg bg-gradient-to-r ${step.color} text-white tracking-widest shrink-0 mt-1.5 shadow-sm`}>
                        {step.badge}
                      </span>
                      
                      {/* Title & Description */}
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-lg font-black text-slate-800 dark:text-slate-100 ${isSelected ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                          {step.title}
                        </h4>
                        
                        {/* Expandable description block */}
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            isSelected ? 'grid-rows-[1fr] opacity-100 mt-2.5' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <p className="overflow-hidden text-sm text-gray-500 dark:text-slate-400 leading-relaxed font-semibold">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Icon */}
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isSelected 
                          ? `bg-gradient-to-r ${step.color} text-white border-transparent shadow-md` 
                          : 'bg-slate-100 dark:bg-slate-800/80 text-gray-400 dark:text-slate-500 border-gray-100 dark:border-slate-800'
                      }`}>
                        {step.icon}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

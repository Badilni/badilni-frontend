import { useState, useEffect } from 'react'
import Button from '../common/Button'
import ThemeToggle from '../common/ThemeToggle'

const FirstSection = () => {
  return (
    <div>
      <div className="min-h-screen bg-[var(--background-light)] text-[var(--black-text)] font-poppins p-10 transition-colors duration-300">
        <main className="max-w-4xl mx-auto space-y-16">
          <section className="text-center space-y-6 py-10">
            <h1 className="text-5xl font-extrabold tracking-tight transition-all duration-300">
              Welcome to{' '}
              <span className="text-[var(--primary-light)] bg-gradient-to-r from-[var(--primary-light)] to-[var(--secondary-light)] bg-clip-text text-transparent">
                Badilni
              </span>
            </h1>
            <p className="text-[var(--grat-text)] text-lg max-w-2xl mx-auto font-light">
              The first platform for smart exchange. Experience the power of
              reusable components and modern design now.
            </p>
           
            <div className="flex justify-center gap-4 flex-wrap">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
              <Button variant="outline" size="md">
                Learn More
              </Button>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </div>
          </section>

          <section className="bg-[var(--whiteBackground)] p-8 rounded-3xl shadow-sm transition-all duration-300">
            <div className="flex flex-col gap-6">
              <div>
                <h4 className="text-[var(--black-text)] font-bold text-xl tracking-tight">
                  Skills
                </h4>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="skills">All</Button>
                <Button variant="skills">Programming</Button>
                <Button variant="skills">Design</Button>
                <Button variant="skills">Graphic Design</Button>
                <Button variant="skills">Photography</Button>
                <Button variant="skills">Cook</Button>
                <Button variant="skills">Content Writing</Button>
                <Button variant="skills">Data Analytics</Button>
                <Button variant="Skip">Skip for now</Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default FirstSection

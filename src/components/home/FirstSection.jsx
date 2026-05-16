import Button from "../common/Button"
const FirstSection = () => {
  return (
    <div>

      <div className="min-h-screen bg-[var(--background)] text-[var(--black-text)] font-poppins p-10 light">
      
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-20">
         <h2 className="text-2xl font-bold text-[var(--main-text)]">Badilni</h2>
         <div className="flex gap-2">
            <Button variant="primary" size="lg">Logout</Button>
            <Button variant="primary" size="md">Logout</Button>
            <Button variant="primary" size="sm">Logout</Button>
         </div>
      </header>
      
      <main className="max-w-4xl mx-auto space-y-16">
        
        <section className="text-center space-y-6 py-10">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Welcome to <span className="text-[var(--primary)]">Badilni</span>
          </h1>
          <p className="text-[var(--grat-text)] text-lg max-w-2xl mx-auto font-light">
            The first platform for smart exchange. Experience the power of reusable components and modern design now.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button variant="primary" size="lg" className="px-12">Start primary</Button>
            <Button variant="primary" size="md" className="px-12">Start primary</Button>
            <Button variant="primary" size="sm" className="px-12">Start primary</Button>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button variant="secondary" size="lg" className="px-12">Start secondary</Button>
            <Button variant="secondary" size="md" className="px-12">Start secondary</Button>
            <Button variant="secondary" size="sm" className="px-12">Start secondary</Button>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button variant="outline" size="lg">Learn More</Button>
            <Button variant="outline" size="md">Learn More</Button>
            <Button variant="outline" size="sm">Learn More</Button>
          </div>
        </section>

        <section className="bg-[var(--backgDangerOpacity)] p-8 rounded-3xl border border-[var(--danger)]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-[var(--danger)] font-bold text-lg">Danger Zone</h4>
              <p className="text-[var(--grat-text)] text-sm">Once the account is deleted, you cannot recover your data again.</p>
            </div>
            <Button variant="danger" onClick={() => confirm("Are you sure?")}>
              Delete Account Permanently
            </Button>
          </div>
        </section>

        <section className="bg-[var(--whiteBackground)] p-8 rounded-3xl border border-[var(--black-text)]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-[var(--black-text)] font-bold text-lg">Danger Zone</h4>
              <p className="text-[var(--grat-text)] text-sm">Once the account is deleted, you cannot recover your data again.</p>
            </div>
            <Button variant="Disable" onClick={() => confirm("Are you sure?")}>
              Disable
            </Button>
          </div>
        </section>

        <section className="bg-[var(--whiteBackground)] p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-[var(--black-text)] font-bold text-xl tracking-tight">Skills</h4>
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

        <section className="bg-[var(--whiteBackground)] p-8 rounded-3xl border border-slate-100 space-y-4">
  <h4 className="font-bold text-lg mb-4">Status Badges</h4>
  
  <div className="flex gap-4 flex-wrap">
    <span className="px-4 py-1 rounded-full text-[var(--danger)] bg-[var(--backgDangerOpacity)] border border-[var(--danger)]/20 text-sm font-medium">
      Rejected
    </span>

    <span className="px-4 py-1 rounded-full text-[var(--success)] bg-[var(--backgSuccessOpacity)] border border-[var(--success)]/20 text-sm font-medium">
      Completed
    </span>

    <span className="px-4 py-1 rounded-full text-[var(--warning)] bg-[var(--backWarningOpacity)] border border-[var(--warning)]/20 text-sm font-medium">
      Pending
    </span>
  </div>
</section>

      </main>
    </div>
    </div>
  )
}

export default FirstSection
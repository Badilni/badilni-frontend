const SkillBadge = ({ skill }) => (
  <span className="px-4 py-1.5 bg-[var(--primary-light)]/10 text-[var(--primary-light)] rounded-full text-sm font-medium border border-[var(--primary-light)]/20 hover:bg-[var(--primary-light)]/20 transition-colors cursor-default">
    {skill}
  </span>
)

export default SkillBadge
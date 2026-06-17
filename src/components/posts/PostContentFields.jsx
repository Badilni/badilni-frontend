export default function PostContentFields({
  postText,
  setPostText,
  categories,
  selectedCategory,
  setSelectedCategory,
  skills,
  skillInput,
  setSkillInput,
  handleAddSkill,
  handleRemoveSkill,
}) {
  return (
    <>
      {/* text area */}
      <div className="px-6 py-2">
        <textarea
          rows="4"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="w-full bg-transparent text-[var(--black-text)] dark:text-slate-100 placeholder:text-[var(--Disabled)] text-sm border-none p-0 focus:ring-0 resize-none focus:outline-none min-h-[90px]"
          placeholder="Show your offer here..."
        />
      </div>

      {/* category section */}
      <div className="px-6 py-3">
        <h4 className="text-[10px] font-bold tracking-wider text-[var(--gray-text)] uppercase mb-2">
          Select Category
        </h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1 rounded-full text-xs font-medium transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[var(--primary-light)] border-[var(--primary-light)] text-white dark:text-slate-900'
                  : 'bg-[var(--background-light)] border-slate-200/20 dark:border-slate-700/50 text-[var(--gray-text)] hover:opacity-80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* skills section */}
      <div className="px-6 py-3">
        <h4 className="text-[10px] font-bold tracking-wider text-[var(--gray-text)] uppercase mb-2">
          Related Skills
        </h4>
        <div className="flex flex-wrap items-center gap-1.5 p-2 border border-slate-200/20 dark:border-slate-700/50 rounded-lg bg-[var(--background-light)] dark:bg-slate-800/40">
          {skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1 bg-[var(--whiteBackground)] dark:bg-slate-800 text-[var(--black-text)] dark:text-slate-200 px-2 py-0.5 rounded text-xs font-medium border border-slate-200/20 dark:border-slate-700/30"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-[var(--gray-text)] hover:text-[var(--danger)] font-bold text-sm leading-none cursor-pointer"
              >
                &times;
              </button>
            </span>
          ))}
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleAddSkill}
            placeholder="Add skill..."
            className="flex-1 bg-transparent border-none p-0 text-xs text-[var(--black-text)] dark:text-slate-200 placeholder:text-[var(--Disabled)] focus:ring-0 focus:outline-none"
          />
        </div>
      </div>
    </>
  );
}

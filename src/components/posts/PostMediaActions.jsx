import { FaImage, FaPaperclip } from 'react-icons/fa6';

export default function PostMediaActions({
  imageInputRef,
  fileInputRef,
  triggerImageUpload,
  triggerFileUpload,
  handleFileChange,
  attachedImage,
  attachedFile,
}) {
  return (
    <div className="px-6 py-4 flex items-center gap-5 mt-2 border-t border-slate-100 dark:border-slate-800/40">
      <input
        type="file"
        ref={imageInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileChange(e, 'image')}
      />
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf,.doc,.docx,.zip"
        className="hidden"
        onChange={(e) => handleFileChange(e, 'file')}
      />

      {/* button add image */}
      <button
        type="button"
        onClick={triggerImageUpload}
        className="flex items-center gap-2 text-xs font-semibold text-[var(--gray-text)] hover:text-[var(--black-text)] dark:hover:text-slate-200 cursor-pointer group transition-colors duration-200"
      >
        <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-500/10 group-hover:bg-sky-100 dark:group-hover:bg-sky-500/20 transition-colors">
          <FaImage size={15} className="text-sky-500 group-hover:scale-110 transition-transform duration-200" />
        </div>
        <span className="text-[12px] font-medium">
          {attachedImage ? 'Change Photo' : 'Add Photo'}
        </span>
      </button>

      {/* close button file */}
      <button
        type="button"
        onClick={triggerFileUpload}
        className="flex items-center gap-2 text-xs font-semibold text-[var(--gray-text)] hover:text-[var(--black-text)] dark:hover:text-slate-200 cursor-pointer group transition-colors duration-200"
      >
        <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-500/10 group-hover:bg-teal-100 dark:group-hover:bg-teal-500/20 transition-colors">
          <FaPaperclip size={14} className="text-teal-500 group-hover:scale-110 transition-transform duration-200" />
        </div>
        <span className="text-[12px] font-medium">
          {attachedFile ? 'File Attached' : 'Attach File'}
        </span>
      </button>
    </div>
  );
}

import useCreatePost from '../../hooks/posts/usePostEditor';
import PostPopupHeader from './HeaderPost';
import PostContentFields from './PostContentFields';
import PostMediaActions from './PostMediaActions';
import PostPopupFooter from './PostPopupFooter';

export default function CreatePostPopup({ isOpen, onClose }) {
  const {
    selectedCategory,
    setSelectedCategory,
    skills,
    skillInput,
    setSkillInput,
    postText,
    setPostText,
    categories,
    handleAddSkill,
    handleRemoveSkill,
    handlePostSubmit,
    fileInputRef,
    imageInputRef,
    triggerImageUpload,
    triggerFileUpload,
    handleFileChange,
    attachedImage,
    attachedFile
  } = useCreatePost(onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/*background overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
        onClick={onClose}
      />

      {/* main Card*/}
      <div className="relative w-full max-w-xl bg-[var(--whiteBackground)] dark:bg-[#1e293b] text-[var(--black-text)] rounded-xl shadow-2xl flex flex-col z-10 overflow-hidden font-sans border border-slate-200/10 dark:border-slate-700/50 transition-colors duration-300 animate-in fade-in zoom-in-95 duration-200">

        {/* Header post */}
        <PostPopupHeader onClose={onClose} />

        {/* text field */}
        <PostContentFields
          postText={postText}
          setPostText={setPostText}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          skills={skills}
          skillInput={skillInput}
          setSkillInput={setSkillInput}
          handleAddSkill={handleAddSkill}
          handleRemoveSkill={handleRemoveSkill}
        />

        {/* 5. media actions */}
        <PostMediaActions
          imageInputRef={imageInputRef}
          fileInputRef={fileInputRef}
          triggerImageUpload={triggerImageUpload}
          triggerFileUpload={triggerFileUpload}
          handleFileChange={handleFileChange}
          attachedImage={attachedImage}
          attachedFile={attachedFile}
        />

        {/* 6. content footer */}
        <PostPopupFooter
          onClose={onClose}
          handlePostSubmit={handlePostSubmit}
        />

      </div>
    </div>
  );
}

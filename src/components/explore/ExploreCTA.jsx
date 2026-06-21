
import FloatingActionButton from '../common/PlusButtonPopUp';
import CreatePostPopup from '../posts/CreatePostPopup';
import useContactUs from '../../hooks/Contact/useContact';

export default function ExploreCTA() {
  const {
    isPostPopupOpen,
    handleOpenPopup,
    handleClosePopup,
  } = useContactUs();

  return (
    <>
      {/* CTA Banner */}
      <section className="mt-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Are you an expert?</h3>
            <p className="text-white/70 text-sm md:text-base max-w-md">
              Share your knowledge, exchange skills, and grow your network. Join thousands of mentors on Badilni.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <button className="bg-white text-blue-700 font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer">
              Become a Mentor
            </button>
            <button className="border-2 border-white/30 text-white font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-200 active:scale-95 cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <FloatingActionButton onClick={handleOpenPopup} />
      <CreatePostPopup isOpen={isPostPopupOpen} onClose={handleClosePopup} />
    </>
  );
}

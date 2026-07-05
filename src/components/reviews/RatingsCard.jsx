import { StarRating } from '../profile/ReviewCard';

const RatingsCard = ({ profile }) => {
  const averageRating = profile?.averageRating || 0;
  const reviewsCount = profile?.reviewsCount || 0;

  const RATING_BARS = [5, 4, 3, 2, 1];

  return (
    <div className="bg-[var(--whiteBackground)] rounded-2xl p-6 border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)]">
      <h2 className="font-bold text-[var(--black-text)] text-lg mb-6">Ratings & Reviews</h2>
      <div className="flex flex-col sm:flex-row gap-8 items-center">
        <div className="text-center shrink-0">
          <div className="text-6xl font-extrabold text-[var(--primary-light)] leading-none mb-2">
            {averageRating.toFixed(1)}
          </div>
          <StarRating rating={Math.round(averageRating)} size="md" />
          <div className="text-xs text-[var(--gray-text)] mt-2">
            {reviewsCount} Total Reviews
          </div>
        </div>

        <div className="flex-1 w-full space-y-2">
          {RATING_BARS.map((stars) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="w-3 text-xs text-[var(--gray-text)] text-right">{stars}</span>
              <div className="flex-1 h-2.5 bg-[var(--background-light)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)]"
                  style={{ width: '0%' }}
                />
              </div>
              <span className="w-8 text-xs text-[var(--gray-text)]">0%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingsCard;

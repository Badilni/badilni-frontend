import { usePasswordReset } from '../../hooks/usePasswordReset';
import { IoIosArrowRoundBack } from "react-icons/io";
import Button from '../common/Button';
import HeadPasswordReset from '../common/HeadPasswordReset';

const PasswordReset = ({ email, verificationCode, onBack, onSuccess }) => {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    error,
    handleSubmit,
    passwordCriteria,
    isPasswordMismatched
  } = usePasswordReset(email, verificationCode, onSuccess);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-300 gap-6 relative bg-[var(--background-light)]">
      <HeadPasswordReset/>

      <div className="relative w-full max-w-[480px] rounded-[24px] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-left transition-colors duration-300 bg-[var(--whiteBackground)]">
        <button
          type="button"
          onClick={onBack}
          className="absolute top-[35px] left-[35px] w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100 transition-all border-[var(--gray-text)] bg-[var(--whiteBackground)]"
        >
          <IoIosArrowRoundBack className="text-[var(--secondary-light)]" size={28} />
        </button>

        <form onSubmit={handleSubmit} className="space-y-6 mt-12">
          <div>
            <h2 className="text-[26px] font-bold mb-2 tracking-tight transition-colors text-[var(--black-text)]">
              Reset Password
            </h2>
            <p className="text-sm leading-relaxed transition-colors text-[var(--gray-text)]">
              Please enter your new password below to secure your account.
            </p>
          </div>

          {error && (
            <div className="p-3 text-sm rounded-xl font-medium transition-all bg-[var(--backgDangerOpacity)] text-[var(--danger)]">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-semibold transition-colors text-[var(--black-text)]">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className={`w-full h-12 px-4 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400 text-[var(--black-text)] bg-[var(--whiteBackground)] ${error ? 'border-[var(--danger)]' : 'border-[var(--gray-text)]'}`}
            />

            {password.length > 0 && (
              <div className="text-xs space-y-1.5 p-4 rounded-xl mt-2 border border-dashed transition-all bg-[var(--background-light)] border-[var(--gray-text)]">
                <p className="font-semibold mb-1 opacity-90 text-[var(--black-text)]">
                  Password Requirements:
                </p>
                <p className={`flex items-center gap-1.5 font-medium transition-colors ${passwordCriteria.hasMinLength ? "text-green-600" : "text-amber-600 opacity-80"}`}>
                  {passwordCriteria.hasMinLength ? "✓" : "•"} At least 8 characters
                </p>
                <p className={`flex items-center gap-1.5 font-medium transition-colors ${passwordCriteria.hasUppercase ? "text-green-600" : "text-amber-600 opacity-80"}`}>
                  {passwordCriteria.hasUppercase ? "✓" : "•"} One uppercase letter (A-Z)
                </p>
                <p className={`flex items-center gap-1.5 font-medium transition-colors ${passwordCriteria.hasLowercase ? "text-green-600" : "text-amber-600 opacity-80"}`}>
                  {passwordCriteria.hasLowercase ? "✓" : "•"} One lowercase letter (a-z)
                </p>
                <p className={`flex items-center gap-1.5 font-medium transition-colors ${passwordCriteria.hasNumber ? "text-green-600" : "text-amber-600 opacity-80"}`}>
                  {passwordCriteria.hasNumber ? "✓" : "•"} One number (0-9)
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold transition-colors text-[var(--black-text)]">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              className={`w-full h-12 px-4 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400 text-[var(--black-text)] bg-[var(--whiteBackground)] ${isPasswordMismatched || error ? 'border-[var(--danger)]' : 'border-[var(--gray-text)]'}`}
            />

            {isPasswordMismatched && (
              <p className="text-[var(--danger)] text-xs font-semibold flex items-center gap-1 mt-1 transition-all">
                ❌ Passwords do not match yet.
              </p>
            )}
          </div>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 text-white rounded-2xl font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Updating Password...' : 'Update Password'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;

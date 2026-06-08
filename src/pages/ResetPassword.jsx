import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { useAuth } from '../hooks/useAuth.jsx';
import { validatePassword, getPasswordStrength } from '../utils/validation';

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const pwCheck = validatePassword(password);
    if (!password) { setError('Password is required'); return; }
    if (!pwCheck.valid) { setError(pwCheck.errors.join(', ')); return; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }

    setLoading(true);
    try {
      await resetPassword(password);
      navigate('/login', { state: { message: 'Password updated. Please sign in.' } });
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your new password">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">{error}</div>}

        <div>
          <label className="block text-xs font-medium text-[#94a3b8] mb-1.5">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2.5 bg-[#1a2332] border border-[#1e293b] rounded-lg text-sm text-white placeholder-[#64748b] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            placeholder="Enter new password"
          />
          {password && (
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-1 bg-[#1e293b] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${(strength.score / 6) * 100}%`, backgroundColor: strength.color }} />
              </div>
              <span className="text-[10px]" style={{ color: strength.color }}>{strength.label}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#94a3b8] mb-1.5">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2.5 bg-[#1a2332] border border-[#1e293b] rounded-lg text-sm text-white placeholder-[#64748b] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            placeholder="Confirm new password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>

        <p className="text-center text-xs text-[#64748b]">
          <Link to="/login" className="text-[#2563EB] hover:underline">Back to Sign In</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

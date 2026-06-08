import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { useAuth } from '../hooks/useAuth.jsx';
import { validateEmail } from '../utils/validation';

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) { setError('Email is required'); return; }
    if (!validateEmail(email)) { setError('Invalid email address'); return; }

    setLoading(true);
    try {
      const result = await forgotPassword(email.trim());
      setSuccess(result.message || 'Password reset link sent to your email.');
    } catch (err) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Forgot Password" subtitle="Enter your email to receive a reset link">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">{error}</div>}
        {success && <div className="p-3 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs">{success}</div>}

        <div>
          <label className="block text-xs font-medium text-[#94a3b8] mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 bg-[#1a2332] border border-[#1e293b] rounded-lg text-sm text-white placeholder-[#64748b] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <p className="text-center text-xs text-[#64748b]">
          <Link to="/login" className="text-[#2563EB] hover:underline">Back to Sign In</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

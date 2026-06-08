import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, RefreshCw } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { authService } from '../services/authService';

export default function VerifyEmail() {
  const location = useLocation();
  const email = location.state?.email || '';
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [resendError, setResendError] = useState('');

  const handleResend = async () => {
    if (!email) {
      setResendError('Email address not found. Please register again.');
      return;
    }

    setResending(true);
    setResendMessage('');
    setResendError('');

    try {
      const result = await authService.resendVerification(email);
      setResendMessage(result.message);
    } catch (err) {
      console.error('Resend verification error:', err);
      setResendError(err.message || 'Failed to resend verification email');
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout title="Verify Your Email" subtitle="One more step before you can sign in">
      <div className="space-y-5 text-center">
        <div className="w-14 h-14 rounded-full bg-[#2563EB]/15 flex items-center justify-center mx-auto">
          <Mail className="w-7 h-7 text-[#2563EB]" />
        </div>

        <div className="p-4 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs leading-relaxed">
          Registration successful.
          <br />
          Please check your email and verify your account before signing in.
        </div>

        {email && (
          <p className="text-xs text-[#94a3b8]">
            Verification link sent to{' '}
            <span className="text-white font-medium">{email}</span>
          </p>
        )}

        <p className="text-[11px] text-[#64748b] leading-relaxed">
          Click the link in your email to confirm your account. After verifying,
          return here and sign in to access the dashboard.
        </p>

        {resendMessage && (
          <div className="p-3 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs">
            {resendMessage}
          </div>
        )}

        {resendError && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            {resendError}
          </div>
        )}

        <button
          type="button"
          onClick={handleResend}
          disabled={resending || !email}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#1e293b] text-[#94a3b8] text-sm font-medium rounded-lg hover:bg-[#1a2332] hover:text-white transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
          {resending ? 'Sending...' : 'Resend Verification Email'}
        </button>

        <Link
          to="/login"
          state={email ? { message: 'After verifying your email, sign in below.' } : undefined}
          className="block w-full py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors text-center"
        >
          Go to Sign In
        </Link>

        <p className="text-xs text-[#64748b]">
          Wrong email?{' '}
          <Link to="/register" className="text-[#2563EB] hover:underline">Register again</Link>
        </p>
      </div>
    </AuthLayout>
  );
}

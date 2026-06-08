import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { useAuth } from '../hooks/useAuth.jsx';
import { validateEmail } from '../utils/validation';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const successMessage = location.state?.message;
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const newErrors = {};

    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(form.email)) newErrors.email = 'Invalid email address';
    if (!form.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await signIn(form.email.trim(), form.password, form.rememberMe);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign In" subtitle="Access the Mogadishu Urban Growth Observatory">
      <form onSubmit={handleSubmit} className="space-y-4">
        {successMessage && (
          <div className="p-3 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs">{successMessage}</div>
        )}
        {serverError && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">{serverError}</div>
        )}

        <div>
          <label className="block text-xs font-medium text-[#94a3b8] mb-1.5">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2.5 bg-[#1a2332] border border-[#1e293b] rounded-lg text-sm text-white placeholder-[#64748b] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#94a3b8] mb-1.5">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-3 py-2.5 bg-[#1a2332] border border-[#1e293b] rounded-lg text-sm text-white placeholder-[#64748b] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-[10px] text-red-400 mt-1">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.rememberMe}
              onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })}
              className="w-3.5 h-3.5 rounded border-[#334155] bg-[#1a2332] text-[#2563EB] focus:ring-[#2563EB] focus:ring-offset-0"
            />
            <span className="text-xs text-[#94a3b8]">Remember Me</span>
          </label>
          <Link to="/forgot-password" className="text-xs text-[#2563EB] hover:underline">Forgot Password?</Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-50"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="text-center text-xs text-[#64748b]">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-[#2563EB] hover:underline">Register</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

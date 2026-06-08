import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { useAuth } from '../hooks/useAuth.jsx';
import { validateEmail, validatePassword, getPasswordStrength } from '../utils/validation';

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const strength = getPasswordStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(form.email)) newErrors.email = 'Invalid email address';

    const pwCheck = validatePassword(form.password);
    if (!form.password) newErrors.password = 'Password is required';
    else if (!pwCheck.valid) newErrors.password = pwCheck.errors.join(', ');

    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await signUp(form.fullName.trim(), form.email.trim(), form.password);
      navigate('/login', { state: { message: 'Registration successful. Please sign in.' } });
    } catch (err) {
      setServerError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Register to access the Mogadishu Urban Growth Observatory">
      <form onSubmit={handleSubmit} className="space-y-4">
        {serverError && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">{serverError}</div>
        )}

        <div>
          <label className="block text-xs font-medium text-[#94a3b8] mb-1.5">Full Name</label>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="w-full px-3 py-2.5 bg-[#1a2332] border border-[#1e293b] rounded-lg text-sm text-white placeholder-[#64748b] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-[10px] text-red-400 mt-1">{errors.fullName}</p>}
        </div>

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
            placeholder="Create a strong password"
          />
          {form.password && (
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-1 bg-[#1e293b] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${(strength.score / 6) * 100}%`, backgroundColor: strength.color }} />
              </div>
              <span className="text-[10px]" style={{ color: strength.color }}>{strength.label}</span>
            </div>
          )}
          {errors.password && <p className="text-[10px] text-red-400 mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#94a3b8] mb-1.5">Confirm Password</label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            className="w-full px-3 py-2.5 bg-[#1a2332] border border-[#1e293b] rounded-lg text-sm text-white placeholder-[#64748b] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <p className="text-[10px] text-red-400 mt-1">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>

        <p className="text-center text-xs text-[#64748b]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#2563EB] hover:underline">Sign In</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

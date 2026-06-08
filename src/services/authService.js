import { supabase, isSupabaseConfigured } from '../lib/supabase';

const DEMO_SESSION_KEY = 'mugo_demo_session';
const DEMO_USERS_KEY = 'mugo_demo_users';

function getDemoUsers() {
  try {
    return JSON.parse(localStorage.getItem(DEMO_USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveDemoSession(session) {
  if (session) localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
  else localStorage.removeItem(DEMO_SESSION_KEY);
}

function getDemoSession() {
  try {
    const raw = localStorage.getItem(DEMO_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const authService = {
  signIn: async (email, password, rememberMe = false) => {
    if (!isSupabaseConfigured) {
      const users = getDemoUsers();
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) throw new Error('Invalid email or password');

      const session = {
        access_token: 'demo',
        user: { id: user.id, email: user.email, user_metadata: { full_name: user.full_name } },
        expires_at: rememberMe ? Date.now() + 30 * 24 * 60 * 60 * 1000 : Date.now() + 24 * 60 * 60 * 1000,
      };
      saveDemoSession(session);
      return { user: session.user, session };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  signUp: async (fullName, email, password) => {
    if (!isSupabaseConfigured) {
      const users = getDemoUsers();
      if (users.some((u) => u.email === email)) throw new Error('Email already registered');

      const newUser = {
        id: `demo-${Date.now()}`,
        full_name: fullName,
        email,
        password,
      };
      users.push(newUser);
      localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
      return { user: { id: newUser.id, email, user_metadata: { full_name: fullName } }, session: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    if (!isSupabaseConfigured) {
      saveDemoSession(null);
      return;
    }
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  forgotPassword: async (email) => {
    if (!isSupabaseConfigured) {
      const users = getDemoUsers();
      if (!users.some((u) => u.email === email)) throw new Error('No account found with this email');
      return { message: 'Password reset link sent (demo mode)' };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return { message: 'Password reset link sent' };
  },

  resetPassword: async (newPassword) => {
    if (!isSupabaseConfigured) {
      const session = getDemoSession();
      if (!session) throw new Error('Invalid or expired reset session');
      const users = getDemoUsers();
      const idx = users.findIndex((u) => u.email === session.user.email);
      if (idx === -1) throw new Error('User not found');
      users[idx].password = newPassword;
      localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
      return { message: 'Password updated' };
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return { message: 'Password updated' };
  },

  getSession: async () => {
    if (!isSupabaseConfigured) {
      const session = getDemoSession();
      if (!session) return null;
      if (session.expires_at && Date.now() > session.expires_at) {
        saveDemoSession(null);
        return null;
      }
      return session;
    }

    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  getUser: async () => {
    if (!isSupabaseConfigured) {
      const session = getDemoSession();
      return session?.user || null;
    }

    const { data } = await supabase.auth.getUser();
    return data.user;
  },

  onAuthStateChange: (callback) => {
    if (!isSupabaseConfigured) {
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
    return supabase.auth.onAuthStateChange(callback);
  },
};

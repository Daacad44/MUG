import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = async () => {
    const s = await authService.getSession();
    setSession(s);
    if (s) {
      const u = await authService.getUser();
      setUser(u);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshSession().finally(() => setLoading(false));

    const { data: { subscription } } = authService.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s) authService.getUser().then(setUser);
      else setUser(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email, password, rememberMe) => {
    const data = await authService.signIn(email, password, rememberMe);
    setUser(data.user);
    setSession(data.session);
    return data;
  };

  const signUp = async (fullName, email, password) => {
    const data = await authService.signUp(fullName, email, password);
    if (data?.session) {
      setUser(data.user);
      setSession(data.session);
    }
    return data;
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    setSession(null);
  };

  const forgotPassword = async (email) => authService.forgotPassword(email);
  const resetPassword = async (password) => authService.resetPassword(password);

  return (
    <AuthContext.Provider
      value={{ user, session, loading, signIn, signUp, signOut, forgotPassword, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

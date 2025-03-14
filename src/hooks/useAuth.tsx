
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';

type AuthContextType = {
  session: any | null;
  user: any | null;
  loading: boolean;
  updateUserProfile: (name: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  updateUserProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Function to update user profile
  const updateUserProfile = async (name: string) => {
    if (!user) return;
    
    try {
      // First update the user metadata in auth
      const { error: authError } = await supabase.auth.updateUser({
        data: { name }
      });
      
      if (authError) throw authError;
      
      // Then update the profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ name })
        .eq('id', user.id);
      
      if (profileError) throw profileError;
      
      // Update local user state with the new name
      setUser(prev => prev ? {...prev, user_metadata: {...(prev.user_metadata || {}), name}} : null);
      
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  const value = {
    session,
    user,
    loading,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

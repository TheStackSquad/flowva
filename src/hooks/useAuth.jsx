// src/hooks/useAuth.

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // 1. Check if a session already exists in local storage
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log('✅ Session recovered for:', session.user.email);
          setUser(session.user);
        } else {
          // 2. No session? Silently sign in as the designated Test User
          console.log('🚀 No session found. Initiating Auto-Auth...');
          
          const { data, error } = await supabase.auth.signInWithPassword({
            email: 'test+astronautdesh@example.com',
            password: 'secure-password-123',
          });

          if (error) throw error;
          
          setUser(data.user);
          toast.success('Interview Mode: Auto-authenticated');
        }
      } catch (error) {
        console.error('❌ Auth error:', error.message);
        toast.error('Auth failed: Check console');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes (sign-out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
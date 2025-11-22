
"use client";

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/auth';
import { useProfileStore } from '@/lib/store/profile';
import { createClient } from '@/lib/supabase/client';

export function StoreInitializer() {
  const supabase = createClient();
  const { setUser, setSession, setUserType } = useAuthStore();
  const { setProfile } = useProfileStore();

  useEffect(() => {
    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            const { user } = session;
            setUser(user);
            setSession(session);

            const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            if (profile) {
                setUserType(profile.user_type);
                setProfile(profile);
            }
        }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const { user } = session || { user: null };
      setUser(user);
      setSession(session)
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile) {
          setUserType(profile.user_type);
          setProfile(profile);
        }
      } else {
        setUserType(null);
        setProfile(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, setSession, setUser, setUserType, setProfile]);

  return null;
}

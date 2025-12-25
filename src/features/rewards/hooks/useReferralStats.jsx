//src/features/rewards/hooks/useReferralStats.jsx
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../hooks/useAuth';

export const useReferralStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalReferrals: 0,
    totalPoints: 0,
    loading: true
  });

  const fetchStats = useCallback(async () => {
    if (!user) return;

    try {
      const { data, count, error } = await supabase
        .from('referrals')
        .select('points_awarded', { count: 'exact' })
            .eq('referrer_id', user.id);

      if (error) throw error;

      const points = data.reduce((sum, ref) => sum + (ref.points_awarded || 0), 0);
      
      setStats({
        totalReferrals: count || 0,
        totalPoints: points,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching referral stats:', error.message);
      setStats(prev => ({ ...prev, loading: false }));
    }
  }, [user]);

  useEffect(() => {
    fetchStats();

    // Real-time: Listen for new referrals or status changes
    const channel = supabase
      .channel(`public:referrals:referrer=${user?.id}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'referrals', 
          filter: `referrer_id=eq.${user?.id}` 
        }, 
        () => {
          fetchStats(); // Refresh stats when a friend joins or is rewarded
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchStats]);

  return stats;
};
//src/features/rewards/hooks/useRewards.jsx

import { useState, useEffect, useCallback } from "react";
import { supabase, getFullUserData, claimDailyPoints, recordShare } from "../../../lib/supabase";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";

export function useRewards() {
  const { user } = useAuth();
  const [data, setData] = useState({
    rewards: null,
    transactions: [],
  });
  const [loading, setLoading] = useState(true);

  // Optimized Fetch: Get everything in one go
  const fetchAllData = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data: result, error } = await getFullUserData(user.id);
      
      if (error) throw error;

      setData({
        rewards: {
          points: result.points,
          streak_days: result.streak_days,
          last_claim_date: result.last_claim_date
        },
        transactions: result.transactions || []
      });
    } catch (err) {
      console.error("Fetch Error:", err.message);
      toast.error("Sync failed");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Initial load and Real-time Subscription
  useEffect(() => {
    if (!user) return;

    fetchAllData();

    // WOW FACTOR: Listen for ANY change to this user's data
    // This catches updates to both rewards AND new transactions
    const channel = supabase
      .channel(`user-updates-${user.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', filter: `user_id=eq.${user.id}` },
        () => {
          console.log("🔄 Real-time sync triggered...");
          fetchAllData(); // Refresh everything to keep UI perfect
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchAllData]);

  // Actions (Keep these simple, let the Subscription handle the UI update)
  const claimDaily = async () => {
    const { data: res, error } = await claimDailyPoints(user.id);
    if (error) toast.error(error.message);
    else toast.success(`+${res.points_awarded} points!`);
    return { success: !error };
  };

  const shareStack = async (platform = "twitter") => {
    const { data: res, error } = await recordShare(user.id, "stack", platform);
    if (error) toast.error(error.message);
    else toast.success("Shared successfully!");
    return { success: !error };
  };

  return {
    ...data, // Spreads rewards and transactions
    loading,
    claimDaily,
    shareStack,
    refetch: fetchAllData
  };
}
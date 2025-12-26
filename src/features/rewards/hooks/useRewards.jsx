//src/features/rewards/hooks/useRewards.jsx

import { useState, useEffect, useCallback } from "react";
import { supabase, getFullUserData, claimDailyPoints, recordShare } from "../../../lib/supabase";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";

export function useRewards() {
  const { user } = useAuth();
  const [data, setData] = useState({ rewards: null, transactions: [] });
  const [loading, setLoading] = useState(true);
  const [claimResult, setClaimResult] = useState(null);

  // Fetch user rewards and transaction data
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
      toast.error("Failed to sync rewards data");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Subscribe to real-time updates for rewards and transactions
  useEffect(() => {
    if (!user) return;

    fetchAllData();

    const channel = supabase
      .channel(`user-updates-${user.id}`)
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'user_rewards',
          filter: `user_id=eq.${user.id}` 
        },
        () => fetchAllData()
      )
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'points_transactions',
          filter: `user_id=eq.${user.id}` 
        },
        () => fetchAllData()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user, fetchAllData]);

  // Claim daily points with optimistic update
const claimDaily = async () => {
  if (!user) return { success: false };

  try {
    const { data: res, error } = await claimDailyPoints(user.id);
    
    if (error) {
      toast.error(error.message);
      return { success: false };
    }

    setData(prev => ({
      ...prev,
      rewards: {
        points: prev.rewards.points + res.points_awarded,
        streak_days: res.new_streak,
        last_claim_date: new Date().toISOString().split('T')[0]
      }
    }));

    setClaimResult({
      success: true,
      pointsAwarded: res.points_awarded,
      newStreak: res.new_streak
    });

    toast.success(`+${res.points_awarded} points! 🎉`);

    return { 
      success: true, 
      data: res 
    };
  } catch (err) {
    console.error("Claim error:", err);
    toast.error("Failed to claim points");
    return { success: false };
  }
};

  // Record social share for points
  const shareStack = async (platform = "twitter") => {
    if (!user) return { success: false };

    try {
      const { data: res, error } = await recordShare(user.id, "stack", platform);
      
      if (error) {
        toast.error(error.message);
        return { success: false };
      }

      toast.success("Share recorded! Points added.");
      return { success: true };
    } catch (err) {
      console.error("Share error:", err);
      toast.error("Failed to record share");
      return { success: false };
    }
  };

  // Clear claim result after modal closes
  const clearClaimResult = useCallback(() => setClaimResult(null), []);

  return {
    ...data,
    loading,
    claimDaily,
    shareStack,
    refetch: fetchAllData,
    claimResult,
    clearClaimResult
  };
}
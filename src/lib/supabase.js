//src/lib/supabase.js

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getFullUserData = async (userId) => {
  return await supabase
    .from("user_rewards")
    .select(
      `
      points,
      streak_days,
      last_claim_date,
      transactions:points_transactions(*)
    `
    )
    .eq("user_id", userId)
    .single();
};

export const claimDailyPoints = async (userId) => {
  try {
    const { data, error } = await supabase.rpc("claim_daily_points", {
      p_user_id: userId,
    });

    if (error) throw error;

    const result = Array.isArray(data) ? data[0] : data;

    if (!result.success) {
      return {
        data: null,
        error: { message: result.message },
      };
    }

    return {
      data: {
        points_awarded: result.points_awarded,
        new_streak: result.new_streak,
        message: result.message,
      },
      error: null,
    };
  } catch (err) {
    console.error("Claim error:", err);
    return {
      data: null,
      error: { message: err.message || "Failed to claim points" },
    };
  }
};

export const recordShare = async (shareType, platform) => {
  return await supabase.rpc("record_share", {
    p_share_type: shareType,
    p_platform: platform,
  });
};
//src/signin-and-call.js
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error('Set SUPABASE_URL and SUPABASE_ANON_KEY');

const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } });

async function main() {
  const email = 'test+astronautdesh@example.com';
  const password = 'secure-password-123';

  const { data: signInData, error: signInError } = await client.auth.signInWithPassword({ email, password });
  if (signInError) {
    console.error('Sign in error', signInError);
    process.exit(1);
  }
  const access_token = signInData.session?.access_token;
  console.log('Access token obtained:', !!access_token);

  // Now call an Edge Function or Postgres function via RPC so the request includes the JWT.
  // Option A: call an RPC via Supabase client (recommended)
 const supabaseWithAuth = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
   global: {
     headers: {
       Authorization: `Bearer ${access_token}`,
     },
   },
 });

  // Call claim_daily_points() via RPC
  const { data: claimRes, error: claimErr } = await supabaseWithAuth.rpc('claim_daily_points');
  if (claimErr) {
    console.error('claim_daily_points error', claimErr);
  } else {
    console.log('claim_daily_points result:', claimRes);
  }

  // Call record_share via RPC (no-arg version uses auth.uid())
  const { data: shareRes, error: shareErr } = await supabaseWithAuth.rpc('record_share', { p_share_type: 'stack', p_platform: 'twitter' });
  if (shareErr) {
    console.error('record_share error', shareErr);
  } else {
    console.log('record_share result:', shareRes);
  }
}

// Check rewards table
const { data: rewards, error: rewardErr } = await client
  .from('user_rewards')
  .select('points, streak_days, last_claim_date')
  .single(); // Use .single() if you expect only one row for the logged-in user

console.log('Current Rewards:', rewards || rewardErr);

// Check transactions table
const { data: transactions, error: transErr } = await client
  .from('points_transactions')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(5);

console.log('Recent Transactions:', transactions || transErr);

main();
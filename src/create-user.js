//src/create-user.js
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
console.log("Checking URL:", process.env.SUPABASE_URL);

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase environment variables');
}

const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

async function main() {
  const payload = {
    id: '3c6edf48-ab6c-4bef-9ac7-5148562045ad', // optional
    email: 'test+astronautdesh@example.com',
    password: 'secure-password-123',
    email_confirm: true,
    user_metadata: { username: 'AstronautDesh' },
  };

  const { data, error } = await admin.auth.admin.createUser(payload);
  if (error) {
    console.error('createUser error', error);
    process.exit(1);
  }
  console.log('Created user:', data);
}
main();
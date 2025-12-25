# React + Vite

# FlowvaHub Rewards System
A high-performance rewards and referral engine built with React, Tailwind CSS, and Supabase (PostgreSQL).

# Data Seeding & Development
To ensure a robust testing environment without manual UI entry, the system utilizes administrative scripts to bypass standard auth throttles:

create-user.js: Leverages the Supabase Service Role Key to programmatically inject users into the auth.users table. This bypasses email confirmation requirements for rapid testing.

signin-and-call.js: Automates the authentication handshake to retrieve JWTs and execute protected RPC (Remote Procedure Call) functions, ensuring the rewards logic holds up under automated load.

# PostgreSQL Architecture & Logic
The backend is a relational powerhouse designed for Atomic Consistency.

# Schema Features:
Normalization: Data is split into user_profiles (identity), user_rewards (accounting), and points_transactions (ledger) to ensure high read speeds.

Integrity Constraints: Use of CHECK constraints (e.g., points >= 0) prevents negative balances at the database level—the "Final Line of Defense."

JSONB Metadata: The points_transactions table includes a jsonb column for extensibility, allowing us to store varied event data without schema migrations.

# Functions & Triggers:
handle_new_user(): An automation trigger that fires immediately upon Auth signup to initialize a reward profile, generate a unique 8-character referral_code, and grant a "Welcome Bonus."

Point Ledgering: Every point change in user_rewards is paired with an insert into points_transactions via SQL functions to maintain a 100% accurate audit trail.

# UI Components & Lighthouse Optimization
Every component is architected for the "100/100" Lighthouse Score.

Cumulative Layout Shift (CLS): We use Skeleton Loaders in PointsBalanceCard and Sidebar to reserve space for data, preventing "jumpy" UI during Supabase fetches.

Largest Contentful Paint (LCP): High-priority assets like the starIcon use explicit dimensions (width/height) and loading="eager" to ensure immediate rendering.

GPU Acceleration: Animations (like the coinSpin) are offloaded to the GPU using CSS transform: rotateY, keeping the Main Thread free for user interactions.

Accessibility (A11y): Semantic HTML combined with aria-progressbar and role="status" ensures the dashboard is fully navigable via screen readers.


<img width="818" height="510" alt="Image" src="https://github.com/user-attachments/assets/e43ad761-b79c-439c-9bee-db519308c302" />

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

# Technologies Used

# Frontend
React 19: Utilizing the latest features, including native metadata hoisting for SEO and optimized concurrent rendering.

Vite 7: Serving as the lightning-fast build tool and development server to ensure instant Hot Module Replacement (HMR).

Tailwind CSS 4: A utility-first CSS framework for building a sleek, responsive, and maintainable UI with modern PostCSS nesting.

Lucide React: Providing a consistent and accessible SVG icon library.

React Router 7: Managing complex client-side routing and navigation states.

React Hot Toast: Delivering lightweight, non-blocking notifications for user actions (like "Link Copied").

# Backend & Infrastructure
# Supabase:
Powering the entire backend ecosystem, including:

# PostgreSQL:
A relational database with advanced triggers and functions.

# GoTrue (Auth):
Secure, JWT-based user authentication.

# Realtime:
WebSocket-based database listeners for instant UI updates.

# PostCSS & Autoprefixer:
Ensuring cross-browser compatibility and modern CSS transformations.

# Dotenv:
Managing secure environment variables for local development.


# Performance & DX (Developer Experience)
# ESLint: Enforcing high code quality and React best practices.
# Module Type: Leveraging ES Modules ("type": "module") for modern JavaScript compatibility.

# ChefTip - Support Your Favorite Chefs

A modern web application that allows food enthusiasts to discover, follow, and tip their favorite chefs directly.

## Features

- **Chef Discovery** - Browse and search through a curated list of talented chefs
- **Chef Profiles** - View detailed chef profiles with specialties, ratings, and tip history
- **Tipping System** - Send tips directly to chefs via secure Stripe payments
- **Leaderboard** - See top-tipped chefs ranked by community support
- **User Dashboard** - Track your tipping history and manage your account
- **Social Feed** - Stay updated with chef posts and culinary creations

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **UI Components:** shadcn/ui, Radix UI
- **Animations:** Framer Motion
- **Backend:** Supabase (PostgreSQL, Auth, Edge Functions)
- **Payments:** Stripe
- **Build Tool:** Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/cheftip.git
cd cheftip
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Start the development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React context providers
├── hooks/          # Custom React hooks
├── integrations/   # Third-party integrations
├── lib/            # Utility functions
├── pages/          # Page components
└── assets/         # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.


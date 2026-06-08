# Mogadishu Urban Growth Observatory (2016–2026)

Enterprise GIS Platform for visualizing urban growth, analyzing building density, and predicting future urban expansion across Mogadishu, Somalia.

## Tech Stack

- **Frontend:** Vite, React, Tailwind CSS, React Router, TanStack Query, Recharts, Leaflet
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Realtime, RLS)
- **Analysis:** Python (growth analysis, spatial forecasting)
- **Deployment:** Vercel (frontend), Supabase Cloud (backend)

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

The app works with mock data when Supabase is not configured.

## Supabase Setup

1. Create a new Supabase project
2. Run migrations: `supabase/migrations/001_initial_schema.sql`
3. Seed data: `supabase/seed/seed_data.sql`
4. Create storage buckets: `maps`, `reports`
5. Add your URL and anon key to `.env`

## Python Analysis

```bash
cd python
pip install -r requirements.txt

# Growth analysis
python analysis/growth_analysis.py

# Spatial forecasting
python prediction/forecast.py
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/` | Main GIS dashboard with map, stats, charts |
| Map Explorer | `/map` | Full map with layer controls and district filtering |
| Growth Analysis | `/analysis` | Built-up area growth, hotspots, density changes |
| Prediction | `/prediction` | Future growth forecast map and expansion zones |
| Reports | `/reports` | Export PDF, CSV, and PNG |
| About | `/about` | Project info, methodology, data sources |

## Deployment (Vercel)

```bash
npm run build
```

Connect your GitHub repo to Vercel and set environment variables in the Vercel dashboard.

## Color System

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#0B1120` | Primary background |
| Primary Blue | `#2563EB` | Active states, primary actions |
| Purple | `#9333EA` | Density data, predictions |
| Orange | `#F97316` | Density metrics |
| Yellow | `#FACC15` | Older development areas |

## License

Mogadishu Urban Growth Observatory © 2024 All rights reserved.

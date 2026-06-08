-- Mogadishu Urban Growth Observatory Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles with roles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('super_admin', 'analyst', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Urban growth data
CREATE TABLE IF NOT EXISTS urban_growth (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year INTEGER NOT NULL UNIQUE,
  built_up_area NUMERIC NOT NULL,
  growth_rate NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Building density data
CREATE TABLE IF NOT EXISTS building_density (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year INTEGER NOT NULL UNIQUE,
  density NUMERIC NOT NULL,
  building_count INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Land use data
CREATE TABLE IF NOT EXISTS land_use (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year INTEGER NOT NULL UNIQUE,
  built_up NUMERIC NOT NULL,
  vegetation NUMERIC NOT NULL,
  bare_land NUMERIC NOT NULL,
  water NUMERIC NOT NULL,
  others NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prediction zones
CREATE TABLE IF NOT EXISTS prediction_zones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  zone_name TEXT NOT NULL,
  probability_score NUMERIC NOT NULL CHECK (probability_score >= 0 AND probability_score <= 1),
  geometry JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GIS layers metadata
CREATE TABLE IF NOT EXISTS gis_layers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  layer_name TEXT NOT NULL,
  layer_type TEXT NOT NULL,
  geojson_url TEXT NOT NULL
);

-- Reports
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE urban_growth ENABLE ROW LEVEL SECURITY;
ALTER TABLE building_density ENABLE ROW LEVEL SECURITY;
ALTER TABLE land_use ENABLE ROW LEVEL SECURITY;
ALTER TABLE prediction_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE gis_layers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Helper function to get user role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Super admins manage profiles" ON profiles
  FOR ALL USING (get_user_role() = 'super_admin');

-- Read policies (all authenticated + anon for public data)
CREATE POLICY "Public read urban_growth" ON urban_growth
  FOR SELECT USING (true);

CREATE POLICY "Public read building_density" ON building_density
  FOR SELECT USING (true);

CREATE POLICY "Public read land_use" ON land_use
  FOR SELECT USING (true);

CREATE POLICY "Public read prediction_zones" ON prediction_zones
  FOR SELECT USING (true);

CREATE POLICY "Public read gis_layers" ON gis_layers
  FOR SELECT USING (true);

-- Write policies (analyst and super_admin)
CREATE POLICY "Analysts write urban_growth" ON urban_growth
  FOR INSERT WITH CHECK (get_user_role() IN ('analyst', 'super_admin'));

CREATE POLICY "Analysts update urban_growth" ON urban_growth
  FOR UPDATE USING (get_user_role() IN ('analyst', 'super_admin'));

CREATE POLICY "Analysts write building_density" ON building_density
  FOR INSERT WITH CHECK (get_user_role() IN ('analyst', 'super_admin'));

CREATE POLICY "Analysts write land_use" ON land_use
  FOR INSERT WITH CHECK (get_user_role() IN ('analyst', 'super_admin'));

CREATE POLICY "Analysts write prediction_zones" ON prediction_zones
  FOR INSERT WITH CHECK (get_user_role() IN ('analyst', 'super_admin'));

CREATE POLICY "Analysts write reports" ON reports
  FOR INSERT WITH CHECK (get_user_role() IN ('analyst', 'super_admin'));

CREATE POLICY "Public read reports" ON reports
  FOR SELECT USING (true);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'viewer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE urban_growth;
ALTER PUBLICATION supabase_realtime ADD TABLE building_density;
ALTER PUBLICATION supabase_realtime ADD TABLE land_use;
ALTER PUBLICATION supabase_realtime ADD TABLE prediction_zones;
ALTER PUBLICATION supabase_realtime ADD TABLE reports;

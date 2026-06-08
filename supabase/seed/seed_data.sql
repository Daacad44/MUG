-- Seed data for Mogadishu Urban Growth Observatory

INSERT INTO urban_growth (year, built_up_area, growth_rate) VALUES
  (2014, 142.3, 3.20),
  (2016, 160.2, 3.80),
  (2018, 178.1, 4.10),
  (2020, 192.6, 3.50),
  (2022, 213.4, 4.60),
  (2024, 229.7, 4.00),
  (2026, 249.6, 4.21)
ON CONFLICT (year) DO NOTHING;

INSERT INTO building_density (year, density, building_count) VALUES
  (2014, 420, 95000),
  (2016, 475, 110423),
  (2018, 531, 125846),
  (2020, 586, 141269),
  (2022, 641, 156692),
  (2024, 697, 172115),
  (2026, 752, 187540)
ON CONFLICT (year) DO NOTHING;

INSERT INTO land_use (year, built_up, vegetation, bare_land, water, others) VALUES
  (2014, 28.5, 32.1, 24.5, 6.3, 8.6),
  (2016, 30.2, 31.3, 23.9, 6.3, 8.3),
  (2018, 31.9, 30.5, 23.3, 6.3, 8.0),
  (2020, 33.6, 29.7, 22.7, 6.3, 7.7),
  (2022, 35.3, 28.9, 22.1, 6.3, 7.4),
  (2024, 37.0, 28.1, 21.5, 6.3, 7.1),
  (2026, 38.7, 26.4, 20.1, 6.3, 8.5)
ON CONFLICT (year) DO NOTHING;

INSERT INTO prediction_zones (zone_name, probability_score, geometry) VALUES
  ('Hodan Expansion', 0.87, '{"type":"Polygon","coordinates":[[[45.33,2.03],[45.35,2.03],[45.35,2.05],[45.33,2.05],[45.33,2.03]]]}'),
  ('Wadajir Growth Corridor', 0.74, '{"type":"Polygon","coordinates":[[[45.30,2.02],[45.32,2.02],[45.32,2.04],[45.30,2.04],[45.30,2.02]]]}'),
  ('Kahda Periphery', 0.68, '{"type":"Polygon","coordinates":[[[45.28,2.05],[45.30,2.05],[45.30,2.07],[45.28,2.07],[45.28,2.05]]]}'),
  ('Daynile Fringe', 0.61, '{"type":"Polygon","coordinates":[[[45.32,2.07],[45.34,2.07],[45.34,2.09],[45.32,2.09],[45.32,2.07]]]}');

INSERT INTO gis_layers (layer_name, layer_type, geojson_url) VALUES
  ('Built-up Area', 'polygon', '/data/built-up.geojson'),
  ('Building Density', 'heatmap', '/data/density.geojson'),
  ('Roads', 'line', '/data/roads.geojson'),
  ('Landmarks', 'point', '/data/landmarks.geojson'),
  ('District Boundaries', 'polygon', '/data/districts.geojson'),
  ('Prediction Zones', 'polygon', '/data/prediction.geojson');

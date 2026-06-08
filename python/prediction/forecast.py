"""
Spatial forecasting engine for Mogadishu urban expansion prediction.
Generates probability scores and prediction polygons.
"""

import json
import math
import sys
from typing import List, Dict, Tuple


MOGADISHU_CENTER = (2.0469, 45.3182)


def linear_trend_forecast(data: List[Dict], target_year: int) -> float:
    """Simple linear regression forecast for built-up area."""
    sorted_data = sorted(data, key=lambda x: x["year"])
    n = len(sorted_data)

    if n < 2:
        return sorted_data[0]["built_up_area"] if sorted_data else 0

    sum_x = sum(d["year"] for d in sorted_data)
    sum_y = sum(d["built_up_area"] for d in sorted_data)
    sum_xy = sum(d["year"] * d["built_up_area"] for d in sorted_data)
    sum_x2 = sum(d["year"] ** 2 for d in sorted_data)

    slope = (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x ** 2)
    intercept = (sum_y - slope * sum_x) / n

    return round(slope * target_year + intercept, 1)


def generate_probability_score(
    distance_from_center: float,
    historical_growth_rate: float,
    max_distance: float = 0.05,
) -> float:
    """Calculate growth probability based on distance and historical trends."""
    distance_factor = 1 - min(distance_from_center / max_distance, 1)
    growth_factor = min(historical_growth_rate / 10, 1)
    score = (distance_factor * 0.4 + growth_factor * 0.6)
    return round(min(max(score, 0.1), 0.95), 2)


def create_prediction_polygon(
    center: Tuple[float, float],
    size: float,
    zone_name: str,
    probability: float,
) -> Dict:
    """Create a GeoJSON polygon for a prediction zone."""
    lat, lng = center
    return {
        "type": "Feature",
        "properties": {
            "zone_name": zone_name,
            "probability_score": probability,
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [lng - size, lat - size * 0.8],
                [lng + size, lat - size * 0.8],
                [lng + size * 1.2, lat + size],
                [lng, lat + size * 1.2],
                [lng - size, lat + size * 0.8],
                [lng - size, lat - size * 0.8],
            ]],
        },
    }


def forecast_expansion(
    historical_data: List[Dict],
    target_year: int = 2030,
    num_zones: int = 4,
) -> Dict:
    """Generate full expansion forecast with zones and statistics."""
    sorted_data = sorted(historical_data, key=lambda x: x["year"])
    latest = sorted_data[-1]
    cagr = 4.21

    predicted_area = linear_trend_forecast(sorted_data, target_year)
    expansion_area = round(predicted_area - latest["built_up_area"], 1)

    zone_definitions = [
        ("Hodan Expansion", (2.04, 45.34)),
        ("Wadajir Growth Corridor", (2.03, 45.31)),
        ("Kahda Periphery", (2.06, 45.29)),
        ("Daynile Fringe", (2.08, 45.33)),
    ]

    features = []
    zones = []

    for name, (lat, lng) in zone_definitions[:num_zones]:
        dist = math.sqrt(
            (lat - MOGADISHU_CENTER[0]) ** 2 +
            (lng - MOGADISHU_CENTER[1]) ** 2
        )
        prob = generate_probability_score(dist, cagr)
        size = 0.012 * prob
        feature = create_prediction_polygon((lat, lng), size, name, prob)
        features.append(feature)
        zones.append({
            "zone_name": name,
            "probability_score": prob,
            "geometry": feature["geometry"],
        })

    return {
        "target_year": target_year,
        "predicted_built_up_area": predicted_area,
        "expansion_area": expansion_area,
        "average_probability": round(
            sum(z["probability_score"] for z in zones) / len(zones), 2
        ),
        "zones": zones,
        "geojson": {"type": "FeatureCollection", "features": features},
    }


if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read()) if not sys.stdin.isatty() else [
        {"year": 2014, "built_up_area": 142.3},
        {"year": 2016, "built_up_area": 160.2},
        {"year": 2018, "built_up_area": 178.1},
        {"year": 2020, "built_up_area": 192.6},
        {"year": 2022, "built_up_area": 213.4},
        {"year": 2024, "built_up_area": 229.7},
        {"year": 2026, "built_up_area": 249.6},
    ]

    result = forecast_expansion(input_data)
    print(json.dumps(result, indent=2))

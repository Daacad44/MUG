"""
Historical growth analysis for Mogadishu Urban Growth Observatory.
Calculates growth trends from urban_growth time series data.
"""

import json
import sys
from typing import List, Dict


def calculate_annual_growth_rates(data: List[Dict]) -> List[Dict]:
    """Calculate year-over-year growth rates from built-up area data."""
    sorted_data = sorted(data, key=lambda x: x["year"])
    rates = []

    for i in range(1, len(sorted_data)):
        prev = sorted_data[i - 1]
        curr = sorted_data[i]
        area_growth = ((curr["built_up_area"] - prev["built_up_area"]) / prev["built_up_area"]) * 100
        period = f"{prev['year']}-{str(curr['year'])[-2:]}"
        rates.append({
            "period": period,
            "rate": round(area_growth / (curr["year"] - prev["year"]), 2),
            "start_year": prev["year"],
            "end_year": curr["year"],
        })

    return rates


def calculate_cagr(data: List[Dict]) -> float:
    """Calculate compound annual growth rate."""
    sorted_data = sorted(data, key=lambda x: x["year"])
    if len(sorted_data) < 2:
        return 0.0

    start = sorted_data[0]
    end = sorted_data[-1]
    years = end["year"] - start["year"]

    if years == 0 or start["built_up_area"] == 0:
        return 0.0

    cagr = ((end["built_up_area"] / start["built_up_area"]) ** (1 / years) - 1) * 100
    return round(cagr, 2)


def identify_growth_hotspots(zones: List[Dict], threshold: float = 0.6) -> List[Dict]:
    """Identify zones with high growth probability as hotspots."""
    return [z for z in zones if z.get("probability_score", 0) >= threshold]


def analyze(data: List[Dict]) -> Dict:
    """Run full growth analysis pipeline."""
    rates = calculate_annual_growth_rates(data)
    cagr = calculate_cagr(data)

    return {
        "annual_growth_rates": rates,
        "compound_annual_growth_rate": cagr,
        "total_years": len(data),
        "latest_built_up_area": sorted(data, key=lambda x: x["year"])[-1]["built_up_area"],
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

    result = analyze(input_data)
    print(json.dumps(result, indent=2))

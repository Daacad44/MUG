export const MOGADISHU_COORDS = { lat: 2.0469, lng: 45.3182 };

function extractCoordinates(geometry) {
  const coords = [];
  const { type, coordinates } = geometry;

  if (type === 'Polygon') {
    coordinates.forEach((ring) => ring.forEach((c) => coords.push(c)));
  } else if (type === 'MultiPolygon') {
    coordinates.forEach((polygon) =>
      polygon.forEach((ring) => ring.forEach((c) => coords.push(c)))
    );
  }
  return coords;
}

export function getGeoBounds(geojson) {
  const coords = geojson.features.flatMap((f) => extractCoordinates(f.geometry));
  let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;

  coords.forEach(([lng, lat]) => {
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  });

  return { minLng, maxLng, minLat, maxLat };
}

export function createProjector(bounds, width, height, padding = 8) {
  const lngRange = bounds.maxLng - bounds.minLng;
  const latRange = bounds.maxLat - bounds.minLat;
  const scale = Math.min(
    (width - padding * 2) / lngRange,
    (height - padding * 2) / latRange
  );
  const offsetX = (width - lngRange * scale) / 2;
  const offsetY = (height - latRange * scale) / 2;

  return (lng, lat) => [
    offsetX + (lng - bounds.minLng) * scale,
    height - offsetY - (lat - bounds.minLat) * scale,
  ];
}

export function geometryToPath(geometry, project) {
  const paths = [];

  const ringToPath = (ring) => {
    if (!ring.length) return '';
    return ring
      .map(([lng, lat], i) => {
        const [x, y] = project(lng, lat);
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(' ') + ' Z';
  };

  if (geometry.type === 'Polygon') {
    geometry.coordinates.forEach((ring) => paths.push(ringToPath(ring)));
  } else if (geometry.type === 'MultiPolygon') {
    geometry.coordinates.forEach((polygon) =>
      polygon.forEach((ring) => paths.push(ringToPath(ring)))
    );
  }

  return paths.join(' ');
}

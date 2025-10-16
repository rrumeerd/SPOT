import React, { useState, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Rectangle, useMap, useMapEvent, useMapEvents } from 'react-leaflet';

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

const BOUNDS_STYLE = { weight: 1 }

function MinimapBounds({ parentMap, zoom }) {
  const minimap = useMap()

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom())
    },
    [parentMap],
  )
  useMapEvent('click', onClick)

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds())
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds())
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom)
  }, [minimap, parentMap, zoom])

  // Listen to events on the parent map using useEffect
  React.useEffect(() => {
    const handleMove = () => onChange()
    const handleZoom = () => onChange()
    
    parentMap.on('move', handleMove)
    parentMap.on('zoom', handleZoom)
    
    return () => {
      parentMap.off('move', handleMove)
      parentMap.off('zoom', handleZoom)
    }
  }, [parentMap, onChange])

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
}

function MinimapControl({ position, zoom }) {
  const parentMap = useMap()
  const mapZoom = zoom || 0

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    [],
  )

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  )
}

export default MinimapControl;
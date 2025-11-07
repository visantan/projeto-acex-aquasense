// src/pages/Mapa.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/Mapa.css';
import ruas from '../data/ruas';

import L from 'leaflet';

// Corrige o ícone padrão do Leaflet usando arquivos da pasta public
L.Icon.Default.mergeOptions({
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

function Mapa() {
  return (
    <div className="mapa-container">
      <h2>Mapa de Vazamentos e Obras</h2>
      <MapContainer
        center={[-23.6639, -46.5383]} // Santo André
        zoom={13}
        scrollWheelZoom={false}
        className="mapa"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {ruas.map((rua) => (
          <Marker key={rua.id} position={[rua.lat, rua.lng]}>
            <Popup>
              <strong>{rua.nome}</strong><br />
              Bairro: {rua.bairro}<br />
              {rua.status.vazamento && (<>Vazamento detectado<br /></>)}
              {rua.status.obra && (<>Obra em andamento<br /></>)}
              Qualidade: {rua.status.qualidade}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Mapa;
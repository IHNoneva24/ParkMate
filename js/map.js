// ============ GEOLOCATION FUNCTIONS ============
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser.'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                resolve(currentLocation);
            },
            (error) => {
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    });
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
}

function calculateTravelTime(distanceKm, speedKmh = 30) {
    const timeHours = distanceKm / speedKmh;
    const timeMinutes = timeHours * 60;
    return Math.round(timeMinutes);
}

function getDirectionsToParking(parking) {
    if (!currentLocation) {
        return null;
    }

    const distance = calculateDistance(
        currentLocation.lat, currentLocation.lng,
        parking.coordinates.lat, parking.coordinates.lng
    );
    
    const time = calculateTravelTime(distance);
    
    return {
        distance: distance.toFixed(1),
        time: time,
        walkingTime: calculateTravelTime(distance, 5)
    };
}

function getUserLocation() {
    const button = document.getElementById('locationButton');
    const originalHTML = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    
    getCurrentLocation()
        .then(location => {
            updateUserLocationOnMap();
            showNotification('Местоположението е обновено!', 'success');
            renderParkingOnMap();
        })
        .catch(error => {
            console.error('Error getting location:', error);
            showNotification('Не можахме да получим вашето местоположение. Моля, разрешете достъпа до локация.', 'error');
        })
        .finally(() => {
            button.innerHTML = originalHTML;
            button.disabled = false;
        });
}

function refreshMapData() {
    const button = document.getElementById('refreshButton');
    button.classList.add('spinning');
    button.disabled = true;
    
    getCurrentLocation()
        .then(location => {
            updateUserLocationOnMap();
            updateWeatherData();
            renderParkingOnMap();
            populateNavigationSelect();
            showNotification('Данните са обновени!', 'success');
        })
        .catch(error => {
            console.error('Error refreshing data:', error);
            updateWeatherData();
            renderParkingOnMap();
            populateNavigationSelect();
            showNotification('Данни обновени (без локация)', 'info');
        })
        .finally(() => {
            button.classList.remove('spinning');
            button.disabled = false;
        });
}

function updateUserLocationOnMap() {
    if (!currentLocation || typeof L === 'undefined' || !leafletMap) return;

    if (userLocationMarker) {
        userLocationMarker.setLatLng([currentLocation.lat, currentLocation.lng]);
    } else {
        const checkSvg = `
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" fill="#2ecc71" stroke="#ffffff" stroke-width="1.5"/>
              <path d="M7.5 12.5l2.5 2.5L16.5 9.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;

        const html = `<div class="user-location-marker">${checkSvg}</div>`;

        const userIcon = L.divIcon({
            className: 'user-location-divicon',
            html: html,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });

        const popupText = (translations && translations[currentLanguage] && translations[currentLanguage].yourLocation) || 'You are here';

        userLocationMarker = L.marker([currentLocation.lat, currentLocation.lng], { icon: userIcon }).addTo(leafletMap);
        userLocationMarker.bindPopup(popupText, { maxWidth: 200, closeButton: true });
    }

    try {
        const latlng = [currentLocation.lat, currentLocation.lng];
        if (!leafletMap.getBounds().contains(latlng)) {
            leafletMap.setView(latlng, 14);
        }
    } catch (err) {
        leafletMap.setView([currentLocation.lat, currentLocation.lng], 14);
    }
}

function renderParkingOnMap() {
    if (typeof L === 'undefined') {
        setTimeout(renderParkingOnMap, 500);
        return;
    }

    if (leafletMap) {
        leafletMap.remove();
        leafletMap = null;
    }
    
    const mapContainer = document.getElementById('leafletMap');
    if (!mapContainer) return;

    try {
        leafletMap = L.map('leafletMap').setView([42.5149, 27.4612], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
            minZoom: 12
        }).addTo(leafletMap);
        
        // only show parkings within Burgas bounding box (approx) to ensure spots are in the city and on land
    function isInBurgas(coord) {
        // lat 42.45–42.60, lng 27.35–27.60 roughly covers Burgas area
        return coord && coord.lat >= 42.45 && coord.lat <= 42.60 && coord.lng >= 27.35 && coord.lng <= 27.60;
    }

    parkingData.forEach(parking => {
            if (!isInBurgas(parking.coordinates)) {
                // skip parkings outside the allowed region
                return;
            }
            const color = parking.status === 'available' ? '#27AE60' : 
                         parking.status === 'full' ? '#E74C3C' : '#3498DB';
            
            const customIcon = L.divIcon({
                className: 'parking-marker-icon',
                html: `<div style="background: ${color}; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); cursor: pointer;"><i style="font-family: Arial; font-style: normal;">P</i></div>`,
                iconSize: [40, 40],
                iconAnchor: [20, 20],
                popupAnchor: [0, -20]
            });
            
            const marker = L.marker([parking.coordinates.lat, parking.coordinates.lng], { icon: customIcon }).addTo(leafletMap);
            
            const statusText = parking.status === 'available' ? '🟢 Свободен' :
                              parking.status === 'full' ? '🔴 Пълен' : '🔵 Резервиран';
            
            const directions = currentLocation ? getDirectionsToParking(parking) : null;
            
            const popupContent = `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 280px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px; text-align: center;">
                        <h3 style="margin: 0; font-size: 16px; font-weight: 700;">${parking.name}</h3>
                        <div style="font-size: 12px; opacity: 0.9; margin-top: 4px;">${parking.location}</div>
                    </div>
                    
                    <div style="padding: 16px; background: white;">
                        <div style="display: flex; align-items: center; margin-bottom: 12px;">
                            <div style="width: 12px; height: 12px; border-radius: 50%; background: ${parking.status === 'available' ? '#27AE60' : parking.status === 'full' ? '#E74C3C' : '#3498DB'}; margin-right: 8px;"></div>
                            <span style="font-size: 14px; font-weight: 600; color: ${parking.status === 'available' ? '#27AE60' : parking.status === 'full' ? '#E74C3C' : '#3498DB'};">${statusText}</span>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                            <div style="text-align: center; padding: 8px; background: #f8f9fa; border-radius: 8px;">
                                <div style="font-size: 18px; font-weight: 700; color: #2C3E50;">${parking.availableSpots}</div>
                                <div style="font-size: 10px; color: #7F8C8D;">свободни</div>
                            </div>
                            <div style="text-align: center; padding: 8px; background: #f8f9fa; border-radius: 8px;">
                                <div style="font-size: 18px; font-weight: 700; color: #2C3E50;">${parking.price}</div>
                                <div style="font-size: 10px; color: #7F8C8D;">на час</div>
                            </div>
                        </div>
                        
                        ${directions ? `
                        <div style="background: #e8f4fd; border: 1px solid #3498DB; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
                            <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                <i class="fas fa-route" style="color: #3498DB; margin-right: 8px;"></i>
                                <span style="font-size: 12px; font-weight: 600; color: #2C3E50;">Посока до паркинга</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div style="text-align: center;">
                                    <div style="font-size: 16px; font-weight: 700; color: #3498DB;">${directions.distance} km</div>
                                    <div style="font-size: 10px; color: #7F8C8D;">разстояние</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="font-size: 16px; font-weight: 700; color: #27AE60;">${directions.time} мин</div>
                                    <div style="font-size: 10px; color: #7F8C8D;">с кола</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="font-size: 16px; font-weight: 700; color: #F39C12;">${directions.walkingTime} мин</div>
                                    <div style="font-size: 10px; color: #7F8C8D;">пеша</div>
                                </div>
                            </div>
                        </div>
                        ` : ''}
                        
                        <div style="display: flex; gap: 8px;">
                            <button onclick="showParkingDetails(${parking.id})" style="flex: 1; padding: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 6px;">
                                <i class="fas fa-info-circle"></i>
                                Детайли
                            </button>
                            <button onclick="makeBooking(${parking.id})" style="flex: 1; padding: 10px; background: ${parking.status === 'available' ? 'linear-gradient(135deg, #27AE60 0%, #2ECC71 100%)' : '#E74C3C'}; color: white; border: none; border-radius: 8px; cursor: ${parking.status === 'available' ? 'pointer' : 'not-allowed'}; font-weight: 600; font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 6px;" ${parking.status !== 'available' ? 'disabled' : ''}>
                                <i class="fas fa-calendar-plus"></i>
                                Резервирай
                            </button>
                        </div>
                        
                        <div style="margin-top: 12px; text-align: center;">
                            <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
                                <i class="fas fa-star" style="color: #FFD700; font-size: 12px;"></i>
                                <span style="font-size: 12px; color: #7F8C8D;">${parking.rating} (${parking.reviews} отзива)</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            marker.bindPopup(popupContent, {
                maxWidth: 300,
                minWidth: 280,
                closeButton: true,
                className: 'modern-parking-popup'
            });
        });

        setTimeout(() => {
            if (leafletMap) leafletMap.invalidateSize();
        }, 100);

    } catch (error) {
        console.error('Error initializing map:', error);
    }
}

function updateWeatherWidget() {
    const weatherConditions = [
        { temp: '18°C', desc: 'Слънчево', icon: 'fas fa-sun', color: '#FFD700' },
        { temp: '15°C', desc: 'Облачно', icon: 'fas fa-cloud', color: '#95A5A6' },
        { temp: '12°C', desc: 'Дъждовно', icon: 'fas fa-cloud-rain', color: '#3498DB' },
        { temp: '20°C', desc: 'Ясно', icon: 'fas fa-sun', color: '#FFD700' }
    ];
    
    const currentWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    
    document.getElementById('weatherTemp').textContent = currentWeather.temp;
    document.getElementById('weatherDesc').textContent = currentWeather.desc;
    document.querySelector('#weatherContent i').className = currentWeather.icon;
    document.querySelector('#weatherContent i').style.color = currentWeather.color;
    
    document.getElementById('weatherWind').textContent = (Math.floor(Math.random() * 20) + 5) + ' km/h';
    document.getElementById('weatherHumidity').textContent = (Math.floor(Math.random() * 30) + 50) + '%';
    document.getElementById('weatherVisibility').textContent = (Math.floor(Math.random() * 5) + 8) + ' km';
    document.getElementById('weatherPressure').textContent = (Math.floor(Math.random() * 20) + 1000) + ' hPa';
    document.getElementById('weatherRain').textContent = Math.floor(Math.random() * 30) + '%';
    
    const uvLevels = ['Нисък', 'Среден', 'Висок'];
    document.getElementById('weatherUV').textContent = uvLevels[Math.floor(Math.random() * uvLevels.length)];
}

function simulateAvailabilityChanges() {
    parkingData.forEach(parking => {
        if (Math.random() < 0.1) {
            const change = Math.random() < 0.5 ? 1 : -1;
            const oldAvailable = parking.availableSpots;
            
            parking.availableSpots = Math.max(0, Math.min(parking.totalSpots, parking.availableSpots + change));
            
            if (parking.availableSpots === 0) {
                parking.status = 'full';
            } else if (parking.availableSpots === parking.totalSpots) {
                parking.status = 'available';
            } else if (parking.status === 'full' && parking.availableSpots > 0) {
                parking.status = 'available';
                showNotification(`🎉 ${parking.name} вече има свободни места!`, 'success');
            }
            
            if (oldAvailable === 0 && parking.availableSpots > 0) {
                showNotification(`🅿️ Свободно място в ${parking.name}!`, 'success');
            }
        }
    });
    
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab && activeTab.id === 'map') {
        renderParkingOnMap();
    } else if (activeTab && activeTab.id === 'parking-list') {
        loadAllParkings();
    }
}

// Navigation and routing
function populateNavigationSelect() {
    const sel = document.getElementById('navigateParkingSelect');
    if (!sel) return;
    sel.innerHTML = '';
    parkingData.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.name} — ${p.location}`;
        sel.appendChild(opt);
    });
}

function parseLatLngInput(input) {
    if (!input) return null;
    const parts = input.split(',').map(s => s.trim());
    if (parts.length !== 2) return null;
    const lat = parseFloat(parts[0]);
    const lng = parseFloat(parts[1]);
    if (isNaN(lat) || isNaN(lng)) return null;
    return { lat, lng };
}

function clearRoute() {
    try {
        if (routeLine && leafletMap) {
            leafletMap.removeLayer(routeLine);
            routeLine = null;
        }
        if (routeStartMarker && leafletMap) {
            leafletMap.removeLayer(routeStartMarker);
            routeStartMarker = null;
        }
        if (routeEndMarker && leafletMap) {
            leafletMap.removeLayer(routeEndMarker);
            routeEndMarker = null;
        }
    } catch (e) {
        console.warn('Error clearing route', e);
    }
}

function startNavigationFromInput() {
    const input = document.getElementById('manualLocationInput');
    const select = document.getElementById('navigateParkingSelect');
    if (!select) return;

    let source = null;
    if (input && input.value.trim()) {
        source = parseLatLngInput(input.value.trim());
        if (!source) {
            showNotification('Въведи коректни координати в формат lat,lng', 'error');
            return;
        }
    } else if (currentLocation) {
        source = { lat: currentLocation.lat, lng: currentLocation.lng };
    } else {
        showNotification('Нямаме текуща локация. Въведи координати.', 'error');
        return;
    }

    const parkingId = parseInt(select.value, 10);
    const parking = parkingData.find(p => p.id === parkingId);
    if (!parking) {
        showNotification('Избери валиден паркинг', 'error');
        return;
    }

    clearRoute();

    requestRouteAndDraw({ lat: source.lat, lng: source.lng }, { lat: parking.coordinates.lat, lng: parking.coordinates.lng }, parking.name);
}

async function requestRouteAndDraw(start, end, parkingName) {
    clearRoute();
    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('Routing failed');
        const data = await resp.json();
        if (!data.routes || !data.routes.length) throw new Error('No route');

        const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
        routeLine = L.polyline(coords, { color: '#2980b9', weight: 5 }).addTo(leafletMap);

        const startIcon = L.divIcon({ className: 'route-start-icon', html: '<div style="width:18px;height:18px;background:#3498DB;border-radius:50%;border:3px solid #fff"></div>', iconSize: [18,18], iconAnchor: [9,9] });
        const endIcon = L.divIcon({ className: 'route-end-icon', html: '<div style="width:18px;height:18px;background:#2ecc71;border-radius:50%;border:3px solid #fff"></div>', iconSize: [18,18], iconAnchor: [9,9] });

        routeStartMarker = L.marker([start.lat, start.lng], { icon: startIcon }).addTo(leafletMap).bindPopup('Start');
        routeEndMarker = L.marker([end.lat, end.lng], { icon: endIcon }).addTo(leafletMap).bindPopup(parkingName || 'Destination');

        const dist = (data.routes[0].distance / 1000).toFixed(2);
        const durationMin = Math.round(data.routes[0].duration / 60);
        routeLine.bindPopup(`<strong>${parkingName}</strong><br>Разстояние: ${dist} km<br>Приблизително време: ${durationMin} мин.`).openPopup();

        leafletMap.fitBounds(routeLine.getBounds().pad(0.15));
    } catch (e) {
        console.warn('Routing error', e);
        routeLine = L.polyline([[start.lat, start.lng], [end.lat, end.lng]], { color: '#2980b9', weight: 4, dashArray: '6,6' }).addTo(leafletMap);
        leafletMap.setView([end.lat, end.lng], 14);
    }
}

// Geocoding
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function geocodeParking(parking) {
    try {
        const query = encodeURIComponent(`${parking.name} ${parking.location} Burgas`);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`;
        const resp = await fetch(url, { headers: { 'Accept-Language': 'bg' } });
        if (!resp.ok) return null;
        const data = await resp.json();
        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            const coord = { lat, lng: lon };
            // ensure geocoded result lies within Burgas bound
            if (coord.lat >= 42.45 && coord.lat <= 42.60 && coord.lng >= 27.35 && coord.lng <= 27.60) {
                return coord;
            }
            return null;
        }
        return null;
    } catch (e) {
        console.warn('Geocode error', e);
        return null;
    }
}

async function geocodeAllParkings() {
    const btn = document.getElementById('geocodeParkingsBtn');
    if (btn) { btn.disabled = true; btn.textContent = 'Обновявам...'; }
    for (let i = 0; i < parkingData.length; i++) {
        const p = parkingData[i];
        const result = await geocodeParking(p);
        if (result) {
            p.coordinates.lat = result.lat;
            p.coordinates.lng = result.lng;
        }
        await sleep(1100);
    }
    if (btn) { btn.disabled = false; btn.textContent = 'Обнови координати на всички паркинги'; }
    showNotification('Координатите са актуализирани', 'success');
    localStorage.setItem('parkingData', JSON.stringify(parkingData));
    renderParkingOnMap();
}
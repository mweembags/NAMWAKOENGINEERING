document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    const map = L.map('travelMap').setView([35.8617, 104.1954], 4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Hardcoded fallback data
    const fallbackLocations = [
        {
            name: "Beijing",
            coords: [39.9042, 116.4074],
            description: "Visited the Great Wall in 2025",
            image: "images/beijing.jpg"
        },
        {
            name: "Shanghai",
            coords: [31.2304, 121.4737],
            description: "Explored The Bund in 2025",
            image: "images/shanghai.jpg"
        },
        {
            name:"Victoria Falls in 2024",
            coords:[17.9243, 25.8536],
            description:"Explored The Smoke That Thurnders",
            image:"images/Victoria Falls.jpg"
        },
        {
            name:"Addis Ababa in 2024",
            coords:[8.9838, 38.7963],
            description:"to and from china",
            image:"images/Addis Ababa.jpg"
        }
    ];

    // Function to render locations
    function renderLocations(locations) {
        const gallery = document.querySelector('.gallery-container');
        gallery.innerHTML = '';
        
        locations.forEach(location => {
            // Add map marker
            const marker = L.marker(location.coords).addTo(map)
                .bindPopup(`
                    <h3>${location.name}</h3>
                    <p>${location.description}</p>
                    <img src="${location.image}" width="200" loading="lazy">
                `);
            
            // Add gallery item
            gallery.innerHTML += `
                <div class="gallery-item">
                    <img src="${location.image}" 
                         alt="${location.name}" 
                         loading="lazy"
                         onclick="openModal('${location.image}', '${location.name} - ${location.description}')">
                    <div class="gallery-caption">
                        <h3>${location.name}</h3>
                        <p>${location.description}</p>
                    </div>
                </div>
            `;
        });
    }

    // Try loading from JSON first
    fetch('data/locations.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            renderLocations(data.locations || data);
        })
        .catch(error => {
            console.error('Error loading locations:', error);
            renderLocations(fallbackLocations);
        });
});

// Modal functions (must be global)
function openModal(imgSrc, captionText) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('caption');
    
    modal.style.display = "block";
    modalImg.src = imgSrc;
    caption.innerHTML = captionText;
}

function closeModal() {
    document.getElementById('imageModal').style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
};
fetch('data/locations.json')
    .then(response => {
        console.log('HTTP status:', response.status); // Should be 200
        return response.json();
    })
    .then(data => {
        console.log('Loaded locations:', data); // Check if data appears
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });
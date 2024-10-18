// Controleer of het script geladen is
console.log("Script geladen!");

// Toon de modal bij het laden van de pagina
window.onload = function() {
    var modal = document.getElementById("introModal");
    var closeModalBtn = document.getElementById("closeModalBtn");

    // Toon de modal
    modal.style.display = "flex";

    // Sluit de modal wanneer op het kruisje wordt geklikt
    closeModalBtn.onclick = function() {
        modal.style.display = "none";
    };

    // Sluit de modal wanneer er buiten de modal wordt geklikt
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
};

// Probeer de kaart te initialiseren met CartoDB Positron stijl
var map = L.map('map').setView([52.3676, 4.9041], 13);  // Amsterdam coördinaten
console.log("Kaart succesvol geïnitialiseerd!");

// Voeg CartoDB Positron tegels toe aan de kaart
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);
console.log("Tegels succesvol geladen!");

// Functie om de kleur van de marker aan te passen
function createCustomIcon(isListened) {
    const color = isListened ? "#00D578" : "#4680FF"; // Groen als 80% beluisterd, anders rood
    return L.divIcon({
        className: 'custom-icon',
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="38" viewBox="0 0 37 57" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.3242 55.7188C22.9134 50.087 37 27.4156 37 18.5C37 8.28273 28.7173 0 18.5 0C8.28273 0 0 8.28273 0 18.5C0 27.4156 14.0866 50.087 17.6758 55.7188C18.0633 56.3269 18.9367 56.3269 19.3242 55.7188ZM18.5 26C23.1944 26 27 22.1944 27 17.5C27 12.8056 23.1944 9 18.5 9C13.8056 9 10 12.8056 10 17.5C10 22.1944 13.8056 26 18.5 26Z" fill="${color}"/>
</svg>`,
        iconSize: [37, 57],
        iconAnchor: [18.5, 57],
        popupAnchor: [0, -57]
    });
}

// Functie om de audio status op te slaan en op te halen uit localStorage
function saveAudioProgress(id, progress) {
    localStorage.setItem(`audioProgress-${id}`, progress);
}

function getAudioProgress(id) {
    return localStorage.getItem(`audioProgress-${id}`) || 0;
}

// Array van locaties met coördinaten, titels, beschrijvingen en audiobestanden
var locations = [
    {
        coords: [52.36788947447257, 4.927909044946539],
        title: "Akira",
        description: "Speeltuin",
        audio: "audio/Akira_Speeltuin.mp3"
    },
    {
        coords: [52.35891108977598, 4.916877846358598],
        title: "Anouke",
        description: "OLVG Oost",
        audio: "audio/Anouke_OlvgOost.mp3"
    },
    {
        coords: [52.35535985240956, 4.882544583793801],
        title: "Bernadette",
        description: "Moreelsestraat 37-3",
        audio: "audio/Bernadette_MOREELSESTRAAT37-3.mp3"
    },
    {
        coords: [52.37391331108436, 4.905679742071584],
        title: "Claudia",
        description: "Prins Hendrikkade 134",
        audio: "audio/Claudia_PrinsHendrikkade134.mp3"
    },
    {
        coords: [52.347208235650655, 4.848759408922508],
        title: "Ema",
        description: "Huis te Vraag",
        audio: "audio/Ema_HuisTeVraag.mp3"
    },
    {
        coords: [52.37195188430046, 4.893796888686989],
        title: "Esra",
        description: "Bar Jones",
        audio: "audio/Esra_BarJones.mp3"
    },
    {
        coords: [52.363610125955944, 4.902367917272315],
        title: "Floor",
        description: "Magere Brug",
        audio: "audio/Floor_MagereBrug.mp3"
    },
    {
        coords: [52.36861081465069, 4.901764625741062],
        title: "Fred",
        description: "Waterlooplein",
        audio: "audio/Fred_Waterloopplein.mp3"
    },
    {
        coords: [52.37810417557276, 4.912348566869902],
        title: "Isabel",
        description: "Bimhuis Schommels",
        audio: "audio/Isabel_SchommelsBimhuis.mp3"
    },
    {
        coords: [52.38584012600186, 4.870095231170909],
        title: "Jip",
        description: "Westerpark",
        audio: "audio/Jip_Westerpark.mp3"
    },
    {
        coords: [51.920587712052495, 4.476906148199313],
        title: "Judith & Sander",
        description: "Bram Ladage Lijnbaan",
        audio: "audio/Judith_Sander_BramLadage.mp3"
    },
    {
        coords: [52.36947604188552, 4.920859554958445],
        title: "Mara",
        description: "Oostenburgergracht 1F",
        audio: "audio/Mara_Oostenburgergracht.mp3"
    },
    {
        coords: [52.38065732817663, 4.899251428527565],
        title: "Marieke",
        description: "Veerpontjes centraal",
        audio: "audio/Marieke_PontCentraal.mp3"
    },
    {
        coords: [52.36533585453219, 4.9189727081705],
        title: "Maud S",
        description: "Artis Aldabra reuzenschildpad",
        audio: "audio/Maud_Artis.mp3"
    },
    {
        coords: [51.91839965130931, 4.488677687225997],
        title: "Maud B",
        description: "Willem De Kooning de Tent",
        audio: "audio/Maud_WillemdeKooning-Tent.mp3"
    },
    {
        coords: [52.36638457190455, 4.9212356972858435],
        title: "Mick",
        description: "Entrepotdok, tussen 140 en 148. Aan de kade. Op een stuk hout",
        audio: "audio/Mick_Entrepotdok140148.mp3"
    },
    {
        coords: [52.37045982559046, 4.898563708341952],
        title: "Mike",
        description: "Cafe de Engelbewaarder",
        audio: "audio/Mike_Oostenburgergracht.mp3"
    },
    {
        coords: [52.36939342176246, 4.8960417629662665],
        title: "Nash",
        description: "De Binnentuin van Oudemanhuispoort",
        audio: "audio/Nash_Oudemanhuispoort.mp3"
    },
    {
        coords: [52.35293804093391, 4.9157940549574075],
        title: "Rasmus",
        description: "BOOST Amsterdam",
        audio: "audio/Rasmus_Boost.mp3"
    },
    {
        coords: [52.36096216109114, 4.876792573941883],
        title: "Yanna",
        description: "De Vondelbunker",
        audio: "audio/Yanna_Vondelbunker.mp3"
    },
    {
        coords: [52.381313333403476, 4.934214555900616],
        title: "Yurhan",
        description: "Het oostpontje",
        audio: "audio/Yurhan_Oostpont.mp3"
    }
];

// Voeg markers toe met aangepaste SVG en audiocontrollers
locations.forEach(function(location) {
    // Haal de voortgang van de audio op uit localStorage
    const progress = getAudioProgress(location.coords[0]);
    const isListened = progress >= 80; // Als 80% of meer is beluisterd

    // Voeg een marker toe met de aangepaste kleur op basis van de luisterstatus
    var marker = L.marker(location.coords, { icon: createCustomIcon(isListened) }).addTo(map);
    console.log("Marker toegevoegd op coördinaten:", location.coords);

    // HTML inhoud voor de pop-up
    var popupContent = `
        <div class="popup-container">
            <h2>${location.title}</h2>
            <p>${location.description}</p>
            <audio id="audio-${location.coords[0]}" src="${location.audio}" preload="auto"></audio>
            <div class="audio-controls">
                <button class="play-btn" onclick="playPause('${location.coords[0]}')">Play</button>
                <input type="range" class="slider" id="slider-${location.coords[0]}" value="0" max="100" onchange="seekAudio('${location.coords[0]}')">
            </div>
        </div>
    `;

    // Voeg pop-up toe aan de marker
    marker.bindPopup(popupContent);

    // Event bij openen van de pop-up om slider te beheren
    marker.on('popupopen', function() {
        var audio = document.getElementById(`audio-${location.coords[0]}`);
        var slider = document.getElementById(`slider-${location.coords[0]}`);

        // Event voor het bijwerken van de slider voortgang
        audio.ontimeupdate = function() {
            var value = (audio.currentTime / audio.duration) * 100;
            slider.value = value || 0;

            // Sla de voortgang op in localStorage
            saveAudioProgress(location.coords[0], value);

            // Verander de kleur van de marker als 80% is beluisterd
            if (value >= 80) {
                marker.setIcon(createCustomIcon(true)); // Zet de marker op groen
            }
        };
    });
});

// Functie om play/pause van audio te beheren
function playPause(id) {
    var audio = document.getElementById(`audio-${id}`);
    var playButton = document.querySelector(`.play-btn`);

    if (audio.paused) {
        audio.play();
        playButton.textContent = 'Pause';
    } else {
        audio.pause();
        playButton.textContent = 'Play';
    }
}

// Functie om audio te zoeken met slider
function seekAudio(id) {
    var audio = document.getElementById(`audio-${id}`);
    var slider = document.getElementById(`slider-${id}`);

    var seekTime = (slider.value / 100) * audio.duration;
    audio.currentTime = seekTime;
}


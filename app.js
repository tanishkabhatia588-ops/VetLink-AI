// VetLink AI Dashboard Simulation Script

// Diagnostic Test Case Data
const scanCases = {
    dog_mange: {
        image: "dog_skin_mange.png",
        condition: "Sarcoptic Mange (Possible)",
        confidence: 88,
        firstAid: "1. Isolate the dog from other pets immediately to prevent contagion.<br>2. Wash bedding in hot water.<br>3. Clean the irritated skin using a mild, vet-approved antiseptic solution.<br>4. Schedule a physical checkup for anti-parasitic treatment (e.g., Ivermectin or Selamectin)."
    },
    cat_dermatitis: {
        image: "cat_ear_scabs.png",
        condition: "Miliary Dermatitis (Allergic)",
        confidence: 94,
        firstAid: "1. Check the cat's fur for flea dirt or live fleas using a fine comb.<br>2. Do not scratch or peel scabs off the ear margins to avoid secondary bacterial infections.<br>3. Administer a vet-prescribed spot-on flea treatment.<br>4. Avoid self-treatment with random human creams."
    }
};

// Chatbot mock QA database
const chatResponses = {
    "dog ate grape": "⚠️ EMERGENCY: Grapes and raisins are highly toxic to dogs and can cause sudden kidney failure. Inducing vomiting might be required if eaten recently. Please seek immediate physical veterinary attention! Do not wait for symptoms to appear.",
    "ticks cat": "🐱 Ticks on Cats: Use a tick removal tool or fine-point tweezers. Grasp the tick close to the skin and pull straight out with steady pressure. Clean the area with antiseptic. Watch for signs of lethargy or fever over the next few days.",
    "puppy vaccines": "🐶 Puppy Vaccination Schedule: At 6-8 weeks, puppies need their first DHPP vaccine (Distemper, Hepatitis, Parvovirus, Parainfluenza). Booster doses are given at 12 and 16 weeks, alongside Rabies vaccination."
};

// Simulated Image Scanner
function runSimulatedScan(caseType) {
    const scanFrame = document.getElementById('scanFrame');
    const scanPlaceholder = document.getElementById('scanPlaceholder');
    const scanImage = document.getElementById('scanImage');
    const scanLine = document.getElementById('scanLine');
    const resultsBox = document.getElementById('resultsBox');
    
    // Reset views
    resultsBox.style.display = 'none';
    scanPlaceholder.style.display = 'none';
    scanLine.style.display = 'block';
    
    // Load Case Data
    const data = scanCases[caseType];
    scanImage.src = data.image;
    scanImage.style.display = 'block';
    
    // Trigger Scanning Overlay Loop for 2.5 seconds
    setTimeout(() => {
        scanLine.style.display = 'none';
        
        // Show Results
        resultsBox.style.display = 'block';
        document.getElementById('predictedCondition').innerText = data.condition;
        document.getElementById('firstAidText').innerHTML = data.firstAid;
        
        // Animate Circle Ring
        animateConfidenceRing(data.confidence);
    }, 2500);
}

function animateConfidenceRing(targetScore) {
    const circle = document.getElementById('confidencePath');
    const displayVal = document.getElementById('confidenceVal');
    let currentScore = 0;
    
    const interval = setInterval(() => {
        if (currentScore >= targetScore) {
            clearInterval(interval);
        } else {
            currentScore++;
            circle.setAttribute('stroke-dasharray', `${currentScore}, 100`);
            displayVal.innerText = `${currentScore}%`;
        }
    }, 15);
}

// SOS Trigger Dispatcher
function triggerSOS() {
    const btn = document.getElementById('sosBtn');
    const details = document.getElementById('sosDetails');
    const mapPin = document.getElementById('mapSosPin');
    
    btn.style.transform = "scale(0.9)";
    setTimeout(() => {
        btn.style.transform = "scale(1)";
    }, 150);
    
    // Reveal Info Panels
    details.style.display = 'block';
    mapPin.style.display = 'block';
    
    // Auto-scroll log
    const log = document.getElementById('dispatchLog');
    log.innerHTML = `
        <div class="log-item"><span>[${getCurrentTime()}]</span> SOS alert registered by GPS.</div>
        <div class="log-item"><span>[${getCurrentTime(3)}]</span> Dispatch notification sent to local NGO network.</div>
        <div class="log-item class-active"><span>[${getCurrentTime(7)}]</span> NGO "Jeev Aashraya" dispatching medical volunteer.</div>
    `;
}

function getCurrentTime(addSeconds = 0) {
    const d = new Date();
    d.setSeconds(d.getSeconds() + addSeconds);
    return d.toTimeString().split(' ')[0];
}

// Virtual Vet Chatbot
function askChatbot(promptText) {
    document.getElementById('chatInput').value = promptText;
    sendChatMsg();
}

function handleChatKey(event) {
    if (event.key === 'Enter') {
        sendChatMsg();
    }
}

function sendChatMsg() {
    const input = document.getElementById('chatInput');
    const query = input.value.trim();
    if (!query) return;
    
    appendMessage(query, 'outgoing');
    input.value = '';
    
    // Simulate AI response stream
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        
        let response = "🐾 Thank you for reaching out. I'm analyzing your query. For standard care, check our veterinary indexes. Could you tell me more about the animal's age or signs of pain?";
        
        // Match simple keywords
        const normalizedQuery = query.toLowerCase();
        if (normalizedQuery.includes('grape') || normalizedQuery.includes('raisin')) {
            response = chatResponses["dog ate grape"];
        } else if (normalizedQuery.includes('tick') || normalizedQuery.includes('ticks')) {
            response = chatResponses["ticks cat"];
        } else if (normalizedQuery.includes('vaccin') || normalizedQuery.includes('puppy')) {
            response = chatResponses["puppy vaccines"];
        }
        
        appendMessage(response, 'incoming');
    }, 1200);
}

function appendMessage(text, direction) {
    const chatContainer = document.getElementById('chatContainer');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${direction}`;
    
    const avatar = direction === 'outgoing' ? '👤' : '🐾';
    
    msgDiv.innerHTML = `
        <div class="avatar">${avatar}</div>
        <div class="msg-bubble">${text}</div>
    `;
    
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
    const chatContainer = document.getElementById('chatContainer');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message incoming typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="avatar">🐾</div>
        <div class="msg-bubble">Thinking...</div>
    `;
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// Maps Pin Overlay Handler
function showMapPinDetails(title, subtitle, extra) {
    const overlay = document.getElementById('mapDetailsOverlay');
    overlay.innerHTML = `
        <h4>${title}</h4>
        <p>${subtitle} &bull; <strong class="accent-text">${extra}</strong></p>
    `;
}

# VetLink AI: AI-Powered Animal Healthcare & Stray Rescue Assistant

![VetLink AI Banner](https://img.shields.io/badge/VetLink_AI-v1.0-00f0ff?style=for-the-badge&logo=shield)
![BCA Major Project](https://img.shields.io/badge/BCA_Major_Project-2026-ff007a?style=for-the-badge)
![FastAPI + React Native](https://img.shields.io/badge/Stack-FastAPI_%7C_React_Native_%7C_Supabase-10b981?style=for-the-badge)

VetLink AI is an integrated AI-powered healthcare ecosystem designed to provide instant medical triage for pet owners and a real-time emergency dispatch system for stray animals.

---

## 🌟 Key Features

* 🔬 **AI Disease Classifier (Photo Scan)**: Multimodal AI vision model (Gemini API / MobileNetV2) to classify common skin lesions and skin conditions with confidence scoring.
* 🚨 **Real-Time SOS Emergency Broadcast**: One-tap emergency alert that broadcasts GPS coordinates to nearby NGOs and volunteers via PostGIS spatial queries.
* 💬 **Virtual Vet AI Chatbot**: Conversational AI providing first-aid guidance, nutrition advice, and symptom checking.
* 🗺️ **Geospatial Veterinary & NGO Directory**: Interactive map locating clinical centers and rescue hubs.
* 📁 **Pet Profile & Vaccine Reminders**: Manage animal age, weight, breed, and vaccination history.

---

## 🏗️ Software Architecture

```
                               ┌────────────────────────────────┐
                               │   Mobile App (React Native)    │
                               │   Web Portal (React Dashboard) │
                               └───────────────┬────────────────┘
                                               │ HTTPS / WSS
                               ┌───────────────▼────────────────┐
                               │   FastAPI API Gateway Router   │
                               └───────┬───────────────┬────────┘
                                       │               │
                      ┌────────────────▼┐             ┌▼─────────────────┐
                      │ Supabase Postgres│             │ AI Engine        │
                      │  + PostGIS Geo   │             │ (Gemini / Librosa│
                      └─────────────────┘             └──────────────────┘
```

---

## 📂 Repository Structure

```text
vetlink-ai/
├── index.html                  # Interactive Dashboard Mockup
├── style.css                   # Glassmorphic Dark UI Theme
├── app.js                      # Interactive Dashboard Simulator
├── blueprint.md                # 5-Month Development & Academic Blueprint
├── dog_skin_mange.png          # Sample Medical Scan Dataset Image
├── cat_ear_scabs.png           # Sample Medical Scan Dataset Image
└── README.md                   # Project Documentation
```

---

## 🚀 Quick Start (Local Demo)

1. Clone or download this repository.
2. Open `index.html` directly in any web browser (Chrome, Firefox, Edge).
3. Test the interactive modules:
   * Click **Test Case 1: Dog Skin Issue** to run the simulated AI Scanner.
   * Click the **SOS** button to simulate broadcasting emergency GPS alerts.
   * Click quick prompt chips in the **AI Vet Chat** to interact with the chatbot.

---

## 🎓 Academic Project Roadmap & Setup

For full 5-month development roadmap, database ER diagrams, DFDs, sequence diagrams, and Tech Expo presentation strategies, refer to [`blueprint.md`](./blueprint.md).

---

## 👤 Author & Credits

* **GitHub Profile**: [@tanishkabhatia588-ops](https://github.com/tanishkabhatia588-ops)
* **Project**: BCA Major Project 2026

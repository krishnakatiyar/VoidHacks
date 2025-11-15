# NeuroScribe AI

**Pioneering Early Alzheimer's Detection with AI**

NeuroScribe AI is an advanced, AI-powered web application designed for medical professionals. It provides a streamlined interface for doctors to submit patient clinical data and MRI scans for early Alzheimer's disease detection analysis. The application leverages a powerful AI model for accurate predictions and integrates the Gemini API to generate insightful, easy-to-understand clinical summaries.

![NeuroScribe AI Dashboard Screenshot](https://storage.googleapis.com/aistudio-hosting/workspace-home/4a29a39a-58b2-4b67-a510-53e30f145f47/preview_image.png)

---

## ✨ Features

- **Secure Authentication:** A clean and simple login interface for authorized medical personnel.
- **Patient Dashboard:** An intuitive dashboard to manage, view, and track all patient records and their analysis statuses.
- **Comprehensive Patient Submission:** A detailed form to submit new patient records, including key clinical metrics and MRI/CT scan files.
- **Real-Time Status Updates:** Patient records are updated in real-time, moving from `Processing` to `Complete` or `Error` as the analysis finishes.
- **AI-Powered Prediction:** A mock AI model backend simulates the prediction of a patient's cognitive status (e.g., *Non Demented, Mild Demented*).
- **Gemini-Generated Summaries:** Integrates with the Google Gemini API to automatically generate concise summaries of clinical data, highlighting potential risk factors for medical review.
- **Dynamic Search & Filtering:** Easily search for patients by name and filter the list by their analysis status (All, Complete, Processing, Error).
- **Responsive & Modern UI:** Built with Tailwind CSS for a fully responsive, accessible, and aesthetically pleasing user experience on any device.
- **Expandable Patient Details:** Click on any patient to view an expanded card with detailed clinical data, the Gemini summary, and the final prediction.

---

## 🛠️ Technology Stack

This project is a modern frontend application built with a focus on performance, developer experience, and a great user interface.

- **Frontend Framework:** [**React**](https://react.dev/) (v19) with TypeScript
- **Live Transpilation:** [**Babel Standalone**](https://babeljs.io/docs/babel-standalone) to compile JSX/TSX directly in the browser, removing the need for a build step in local development.
- **Styling:** [**Tailwind CSS**](https://tailwindcss.com/) for a utility-first CSS workflow.
- **AI Integration:** [**Google Gemini API**](https://ai.google.dev/) (`@google/genai`) for generating clinical summaries.
- **Icons:** A custom set of SVG icons for a crisp and consistent look.
- **Backend Simulation:** A sophisticated mock API (`services/mockApi.ts`) is used to simulate asynchronous backend processes, including:
  - Fetching and adding patient data.
  - Simulating a processing delay for AI analysis.
  - Pushing real-time updates to the frontend using a subscription model.

---

## 🚀 Getting Started

This application is configured to run directly in the browser without any build steps.

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
- An internet connection.
- A simple local web server to serve the files.

### Environment Variables

The application requires a Google Gemini API key to function correctly. This key must be available as an environment variable:

- `API_KEY`: Your secret API key for the Google Gemini service.

The application code uses `process.env.API_KEY` to access this variable, assuming it's injected by the hosting environment.

### Running Locally

This project is configured to run directly in the browser without any complex build steps. However, you **must serve the files from a local web server** due to browser security policies (CORS). Opening the `index.html` file directly from your filesystem (`file://...`) will not work.

1.  **Serve the files:** Open your terminal in the project's root directory and use one of the following commands to start a simple web server.

    *   **If you have Python 3:**
        ```bash
        python -m http.server
        ```

    *   **If you have Node.js and `serve`:**
        ```bash
        # Install serve globally if you haven't already: npm install -g serve
        serve .
        ```
    *   **Using VS Code:** The [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) is a great one-click option.

2.  **Open in browser:** Once the server is running, it will give you a local address. Open your web browser and navigate to it. It will typically be:
    *   `http://localhost:8000`
    *   `http://localhost:3000`
    *   `http://127.0.0.1:5500`

---

## 📂 Project Structure

The project is organized into a logical and maintainable structure:

```
.
├── index.html                # Main HTML entry point
├── index.tsx                 # React application root
├── App.tsx                   # Main app component (handles routing & auth)
├── metadata.json             # Application metadata
├── README.md                 # This file
├── types.ts                  # Core TypeScript type definitions (Patient, Status, etc.)
│
├── components/
│   ├── Dashboard.tsx         # The main dashboard view after login
│   └── ... (other components)
│
└── services/
    ├── geminiService.ts      # Service for interacting with the Gemini API
    └── mockApi.ts            # Simulates all backend API calls and data flow
```

---

## 📄 License

This project is licensed under the MIT License.

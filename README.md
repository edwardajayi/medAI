<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1jTcylig_HBQQAdRP0rxmpqucEBNOSm-A

# MediBot AI

A professional and intuitive web application prototype for healthcare, featuring distinct interfaces for doctors and patients to manage medical information and interact with AI-powered tools.

## Features

-   **Dual-View Interface**: Toggle between a comprehensive 'Doctor View' and a simplified 'Patient View'.
-   **Interactive Dashboard**: Clean, modern UI with interactive components for a seamless user experience.
-   **Patient Management (Doctor View)**: A three-column layout to view a patient queue, detailed patient records, and AI-powered tools.
-   **Personal Health Hub (Patient View)**: A two-column layout displaying key health metrics and a personal chat interface.
-   **Simulated AI Chatbot**: Interactive chat functionality to ask questions about medical records (simulated responses, no API key required).
-   **Responsive Design**: A layout that adapts to different screen sizes.

## Technology Stack

-   **React**: For building the user interface.
-   **TypeScript**: For static typing and improved developer experience.
-   **Tailwind CSS**: For utility-first styling.
-   **ES Modules**: Natively supported in the browser, loaded via an import map.

## Prerequisites

To run this application locally, you will need:

1.  A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
2.  A local web server. This is necessary because the application uses ES modules (`<script type="module">`), which browsers block for security reasons when opened directly from the local file system (`file://` protocol).

## Getting Started

Follow these steps to set up and run the project on your local machine.

### 1. Set Up the Project Files

1.  Create a new directory on your computer for the project. Let's call it `medibot-ai`.
    ```bash
    mkdir medibot-ai
    cd medibot-ai
    ```

2.  Inside this directory, create the files and folders as structured below, and copy the provided code for each file into it.

    **File Structure:**
    ```
    medibot-ai/
    ├── App.tsx
    ├── constants.ts
    ├── index.html
    ├── index.tsx
    ├── metadata.json
    ├── types.ts
    ├── components/
    │   ├── Header.tsx
    │   └── Icons.tsx
    └── views/
        ├── DoctorView.tsx
        └── PatientView.tsx
    ```

### 2. Run the Local Server

Once the files are in place, you need to start a local web server from the root of your `medibot-ai` directory. Here are three popular and easy ways to do this:

#### Option A: Using Python

If you have Python installed, you can use its built-in HTTP server.

1.  Open your terminal or command prompt.
2.  Navigate to the `medibot-ai` directory.
3.  Run the following command (for Python 3):
    ```bash
    python -m http.server
    ```
    (If you are using Python 2, use `python -m SimpleHTTPServer`).
4.  The server will start, typically on port `8000`.

#### Option B: Using Node.js and `serve`

If you have Node.js installed, you can use the `serve` package.

1.  Open your terminal or command prompt.
2.  Navigate to the `medibot-ai` directory.
3.  Run the following command to install and run `serve`:
    ```bash
    npx serve
    ```
4.  The server will start and provide you with a local address, typically on port `3000`.

#### Option C: Using VS Code Live Server Extension

If you are using Visual Studio Code as your editor:

1.  Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension from the VS Code Marketplace.
2.  Open the `medibot-ai` directory in VS Code.
3.  Right-click on the `index.html` file in the file explorer and select **Open with Live Server**.
4.  This will automatically start a server and open the application in your default browser.

### 3. View the Application

After starting the server, open your web browser and navigate to the address provided by your server. It will usually be one of the following:

-   `http://localhost:8000` (for Python server)
-   `http://localhost:3000` (for `npx serve`)
-   `http://127.0.0.1:5500` (for VS Code Live Server, port may vary)

You should now see the MediBot AI application running in your browser!



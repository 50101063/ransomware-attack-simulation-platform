# Frontend Application

This folder contains the source code for the Ransomware Attack Simulation Platform frontend.

## Technologies Used
- React 18.x
- Vite 5.x
- Material-UI (MUI) 5.x
- Axios 1.x

## Setup and Execution Instructions

1.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically be available at `http://localhost:5173` (or another port if 5173 is in use).

4.  **Build for production**:
    ```bash
    npm run build
    # or
    yarn build
    ```
    This will create a `dist` folder with the production-ready static files.

## Folder Structure

```
frontend/
├── public/
│   └── ... (static assets)
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── index.js
│   └── ... (other source files)
├── .env.example
├── package.json
├── vite.config.js
└── README.md
```

## Integration with Backend

The frontend communicates with the backend API via HTTP requests. Ensure the backend service is running and accessible at the configured API endpoint (e.g., `http://localhost:3000/api/v1`). The API endpoint can be configured in the frontend environment variables (e.g., in a `.env` file).

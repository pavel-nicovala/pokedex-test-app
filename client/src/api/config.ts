/**
 * Base URL for the backend API. Empty string = same origin (e.g. when served with the server).
 * Set REACT_APP_API_URL when deploying frontend and backend separately (e.g. GitHub Pages + Render).
 */
export const API_BASE = process.env.REACT_APP_API_URL ?? "";

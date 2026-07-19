import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

import './index.css'
import './styles/base.css';
import './styles/typography.css';
import './styles/buttons.css';
import './styles/forms.css';
import './styles/navbar.css';
import './styles/cards.css';
import './styles/pages.css';
import './styles/utilities.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
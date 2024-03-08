import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './languages/english.json';
import urTranslation from './languages/urdu.json';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ur: {
        translation: urTranslation,
      },
    },
    fallbackLng: 'en', // Default language
    debug: true, // Enable debug mode
    interpolation: {
      escapeValue: false, // Not needed for React
    },
  });



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


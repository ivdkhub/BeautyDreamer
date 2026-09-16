# BeautyDreamer Web App

Sito web completo per BeautyDreamer - Manicure & Nail Art Specialist di Chiara Lulli.
Progettato e sviluppato con Next.js 15, React, Tailwind CSS e TypeScript.

## Requisiti

- Node.js (versione 18.x o superiore raccomandata)
- npm

## Come avviare il progetto in locale

1. Assicurati di essere nella cartella del progetto:
   ```bash
   cd "C:\Spazio di lavoro\ivdk\Siti\beautydreamer-web"
   ```

2. Installa le dipendenze (se non lo hai già fatto):
   ```bash
   npm install
   ```

3. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```

4. Apri il browser all'indirizzo:
   [http://localhost:3000](http://localhost:3000)

## Struttura del sito

- **Home (`/`)**: Presentazione, video hero, servizi in evidenza.
- **Su di Me (`/about`)**: Storia di Chiara Lulli e filosofia del salone.
- **Servizi (`/services`)**: Listino completo dei trattamenti.
- **Prima e Dopo (`/portfolio`)**: Galleria interattiva con filtri.
- **Blog (`/blog`)**: Articoli e consigli di bellezza.
- **FAQ (`/faq`)**: Domande frequenti.
- **Prenota Ora (`/book`)**: Modulo interattivo per la prenotazione appuntamenti.
- **Admin Dashboard (`/admin`)**: Area riservata per la gestione.
  - *Demo Username:* admin@beautydreamer.it
  - *Demo Password:* AdminBeauty2026!

## Note sullo Sviluppo

- **Asset:** Le immagini e i video forniti sono stati organizzati nella cartella `public/assets/`.
- **Stile:** I colori, il font Playfair Display (per titoli) e Montserrat (per i testi) sono configurati globalmente e gestiti tramite classi utility in Tailwind CSS v4 in `src/app/globals.css`.
- **SEO & Prestazioni:** I metatag base e per Open Graph (social sharing) sono configurati nel `RootLayout`. Le immagini utilizzano il componente `<Image>` di Next.js per l'ottimizzazione e il lazy loading automatico.

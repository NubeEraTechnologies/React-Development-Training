# React Mini Project – Search + Details App

A small React mini project that teaches Routing + API Fetch + Component structure.

---

## What this project covers

- React Router (multiple pages without reload)
- Live API call using Axios
- Search bar input
- Display list of products with cards
- Product details page using route params
- Simple UI styling

---

## Live API used

We use free DummyJSON API:

- Search → https://dummyjson.com/products/search?q=phone
- Get by ID → https://dummyjson.com/products/1

---

## Requirements

- Node 16+ (you have Node 22 so perfect)
- npm

---

## Setup commands

```bash
npm create vite@latest react-mini -- --template react
cd react-mini
npm install
npm install react-router-dom axios
npm run dev
```

---

## Folder structure to follow

```
src/
  pages/
    Home.jsx
    Search.jsx
    ProductDetails.jsx
    pages.css
  services/
    api.js
  App.jsx
  main.jsx
```

---

## Key Features

| Feature | File |
|---|---|
| Routing pages | App.jsx |
| Search fetch | Search.jsx |
| Click item → open Details page | ProductDetails.jsx |
| API logic separated | services/api.js |
| Styling of pages | pages.css |

---

## Important React Concepts used

| Concept | In this project |
|---|---|
| useState | text input, data list |
| useParams | read product id from URL |
| Link | navigation without reload |
| BrowserRouter | enables routing |
| Axios | data fetch |

---

## Summary for trainers

This is enough React content to teach:

1. Creating app
2. Routing
3. Calling API
4. Showing results
5. Details page

This matches **real company style React**.

---

## Next optional enhancements

- add loader spinner
- add pagination
- add dark mode
- add search suggestions
- deploy to Netlify

---

END ✅

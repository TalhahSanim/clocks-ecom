# Vibe Check App (Parralel Clocks Store)

A React + Firebase store built for Week 9 of *Apply Different Language Skills*.
Users can sign up, log in, browse the live product inventory (Firestore), and
admins can seed or delete products.

## Tech stack

- React 19 + React Router 7
- Vite 8
- Firebase (Firestore) for products, `bcryptjs` for password hashing
- `react-icons` for the nav icons

## Getting started

```bash
npm install
npm run dev
```

| Script            | What it does                      |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the dev server with HMR     |
| `npm run build`   | Production build into `dist/`     |
| `npm run preview` | Serve the production build        |
| `npm run lint`    | Run ESLint                        |

## Project structure

```
src/
├── api/          # Firebase calls (auth.js, products.js)
├── components/   # Nav, ProductList, AddProductButton, ProtectedRoute
├── context/      # AuthContext + useAuth hook
├── pages/        # Route pages (Home, About, Login, Signup, Users, Products…)
├── App.jsx       # Routes + layout
├── index.css     # Global styles (variables, body, headings)
└── main.jsx      # Entry point
```

## Guides

- [Moving the CSS into CSS Modules](CSS_MODULES_GUIDE.md)

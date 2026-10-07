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

---

# Guide: moving the CSS into CSS Modules

## Why bother?

Plain `.css` files in Vite are **global**. Importing `Login.css` inside
`LoginPage.jsx` does *not* scope it to that page — once loaded, its rules apply
to the whole app. This project already has bugs because of that:

- `Login.css` and `Signup.css` both style the bare `input` and `button`
  elements with **different** values (`margin-bottom: 10px` vs `50px`,
  `border-radius: 0.3rem` vs `3.3rem`). Whichever file loaded last wins, so the
  Login form changes appearance after you visit Signup.
- Those `button` rules also restyle every other button in the app (Logout,
  Buy 1, Add to Cart…).
- Class names like `.active`, `.product`, `.nav` can clash with any library or
  future component that uses the same name.

**CSS Modules** fix this. A file named `Something.module.css` is scoped: Vite
renames each class to something unique (e.g. `.nav` → `._nav_x7k2a_1`) and
gives you a JavaScript object to look the names up. Vite supports this out of
the box — **no install or config needed**.

## The plan

| File today                | Becomes                          | Used by             |
| ------------------------- | -------------------------------- | ------------------- |
| `src/index.css`           | stays **global** (keep as is)    | `main.jsx`          |
| `src/App.css`             | `src/App.module.css`             | `App.jsx`           |
| `components/Nav.css`      | `components/Nav.module.css`      | `Nav.jsx`           |
| `pages/Login.css`         | `pages/Login.module.css`         | `LoginPage.jsx`     |
| `pages/Signup.css`        | `pages/Signup.module.css`        | `SignupPage.jsx`    |
| `pages/Users.css`         | `pages/Users.module.css`         | `Users.jsx`         |
| *(new)*                   | `styles/Form.module.css`         | Login + Signup      |

Do it **one file at a time**, and check the page in the browser after each step.

---

## Step 1 — Decide what stays global

`index.css` holds things that *should* be global: CSS variables on `:root`,
`body`, and the default `h1`/`h2`/`code` styles. Leave it as a normal file
imported once in `main.jsx`.

Rule of thumb:

- **Global (`index.css`)** — variables, resets, `body`, base element styles.
- **Module (`*.module.css`)** — anything that belongs to one component or page.

### Remove the Vite default CSS from `index.css`

`index.css` still has styles left over from the Vite starter template. Nothing
in the app uses them, so you can delete them without changing how anything
looks:

1. **Unused variables** — delete these from **both** `:root` and the
   `@media (prefers-color-scheme: dark)` block:
   `--accent`, `--accent-bg`, `--accent-border`, `--social-bg`, `--shadow`,
   `--code-bg`, `--border`.
2. **`#social .button-icon { … }`** — styles the Vite welcome page, which this
   app doesn't have. Delete it (it's inside the dark-mode block).
3. **`code, code { … }`** — no page uses a `<code>` tag. Delete it.
4. **Commented-out Vite code** — the `/* #root { … } */` block and the
   `/* --heading: …; --mono: … */` comment.
5. **`font-family: var(--heading);`** in the `h1, h2` rule — `--heading` doesn't
   exist, so this line does nothing (headings already inherit Scope Sans from
   `body`). Delete it.
6. **Two `body { }` blocks** — merge them into one:
   ```css
   body {
     margin: 0;
     padding: 0;
     font-family: "Scope Sans", sans-serif;
     background-color: rgb(157, 234, 214);
   }
   ```

**Keep:** `--text`, `--text-h`, `--bg`, `--sans`, the dark-mode `--text` /
`--text-h` colours, and the `h1` sizes (the Users and User Detail headings rely
on them).

Check afterwards with:

```bash
grep -rn "accent\|social\|code-bg\|--shadow\|--border\|--heading" src
```

It should print nothing.

### Fix the font import

```css
/* index.css — this URL doesn't load a font, it's just the Google homepage */
@import url("https://googleapis.com");
```

Replace it with the real Google Fonts link for the font you want.

## Step 2 — Learn the three rules of CSS Modules

1. **Rename** the file to end in `.module.css`.
2. **Import it as an object**:
   ```jsx
   import styles from "./Nav.module.css";
   ```
3. **Use the object for class names**:
   ```jsx
   <nav className={styles.nav}>        {/* was className="nav" */}
   ```

Things to know:

- Kebab-case names need bracket syntax: `styles["login-page"]`. It's easier to
  rename classes to camelCase (`.loginPage`) so you can write `styles.loginPage`.
- Only **class** selectors are renamed. Element selectors (`input`, `button`)
  and IDs (`#signup-email`) inside a module are **still global**. So inside a
  module, always style through a class.
- Combine classes with a template string:
  ```jsx
  className={`${styles.card} ${styles.highlighted}`}
  ```

## Step 3 — Start small: `App.css` → `App.module.css`

1. Rename `src/App.css` to `src/App.module.css` (contents unchanged — `.navBar`
   is already camelCase).
2. In `App.jsx`:

   ```jsx
   // before
   import "./App.css";
   <div className="navBar">

   // after
   import styles from "./App.module.css";
   <div className={styles.navBar}>
   ```

3. `className="cont"` and `className="authStatus"` have no CSS rules — delete
   them or add rules for them to `App.module.css`.
4. Run `npm run dev` and check the header still has its background image.

## Step 4 — `Nav.css` → `Nav.module.css` (handling `NavLink`)

1. Rename the file. The CSS can stay the same:

   ```css
   .nav { /* … */ }
   .nav a { /* … */ }          /* element selector nested under a class = fine */
   .nav a.active { /* … */ }
   .nav a.inactive { /* … */ }
   .navTitle { color: #6fd4c8; }
   ```

2. In `Nav.jsx`, `NavLink` builds the class with a function. Return the module
   names instead of plain strings. To avoid repeating it six times, make a
   helper:

   ```jsx
   import styles from "./Nav.module.css";

   const linkClass = ({ isActive }) =>
     isActive ? styles.active : styles.inactive;

   function Nav() {
     return (
       <>
         <nav className={styles.nav}>
           <NavLink to="/" end className={linkClass}>
             <TbHomeFilled /> Home
           </NavLink>
           <NavLink to="/about" className={linkClass}>
             <FcAbout /> About
           </NavLink>
           {/* …same for the rest */}
         </nav>
         <h1 className={styles.navTitle}>Parralel Clocks</h1>
       </>
     );
   }
   ```

3. Move the inline styles into the module while you're here. For example the
   big `style={{ fontSize: "6rem", … }}` on the `<h1>` becomes:

   ```css
   .navTitle {
     color: #6fd4c8;
     font-size: 6rem;
     text-align: left;
     margin: 8rem 0 10rem;
     text-shadow: 4px 2px 2px rgba(0, 0, 0, 0.5);
     position: relative;
   }
   ```

   Do the same for `style={{ marginBottom: "2rem" }}` on `<nav>` (add it to
   `.nav`), the hero `<img>` (`.heroImage`) and the tagline `<h2>`
   (`.tagline`).

## Step 5 — Pull the shared form styles into one module

Login and Signup share almost the same input/button styles. Instead of copying
them twice, create **`src/styles/Form.module.css`** and turn the bare element
selectors into classes:

```css
/* src/styles/Form.module.css */
.page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 150px;
  padding: 10rem;
  border-radius: 2rem;
  box-shadow: 0 2px 8px rgb(145, 255, 255);
}

.title {
  color: #fff;
  font-weight: 100;
  letter-spacing: 1.1rem;
  padding: 1rem;
  border-bottom: 3px solid rgb(162, 255, 162);
}

.label {
  display: none;
}

.input {
  margin-bottom: 10px;
  padding: 20px;
  width: 100%;
  background: #c8f0e3;
  border: none;
  border-bottom: 4px solid rgb(56, 182, 149);
  border-radius: 0.3rem;
  text-align: center;
  font: inherit;
  color: rgb(17, 104, 104);
}

.input:focus {
  outline: 5px solid rgb(45, 172, 163);
}

.button {
  margin-top: 2rem;
  padding: 1.5rem 3rem;
  background: rgba(110, 227, 192, 0.68);
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 1.2rem;
  cursor: pointer;
}

.error {
  color: red;
}
```

Notice the `#signup-email` / `#signup-password` ID rules are gone — their
styles moved into `.input`. IDs should be used for `htmlFor`/`id` pairing, not
for styling.

## Step 6 — Page modules that extend the shared one (`composes`)

Each page only needs what's *different*. Use `composes` to inherit from the
shared module:

```css
/* src/pages/Login.module.css */
.form {
  composes: form from "../styles/Form.module.css";
  background-color: rgb(80, 176, 170);
}
```

```css
/* src/pages/Signup.module.css */
.form {
  composes: form from "../styles/Form.module.css";
  background-color: rgb(98, 208, 201);
}

.input {
  composes: input from "../styles/Form.module.css";
  margin-bottom: 50px;
  border-radius: 3.3rem;
}
```

Then in `LoginPage.jsx`:

```jsx
import form from "../styles/Form.module.css";
import styles from "./Login.module.css";

<div className={form.page}>
  <form onSubmit={handleSubmit} className={styles.form}>
    <h1 className={form.title}>Login</h1>
    {errorMessage && <p className={form.error}>{errorMessage}</p>}

    <label htmlFor="login-email" className={form.label}>Email</label>
    <input id="login-email" className={form.input} /* …props */ />

    <label htmlFor="login-password" className={form.label}>Password</label>
    <input id="login-password" className={form.input} /* …props */ />

    <button type="submit" className={form.button}>Login</button>
  </form>
</div>
```

Do the same in `SignupPage.jsx`, using `styles.input` instead of `form.input`.

> Tip: Login currently reuses the IDs `signup-email` / `signup-password`.
> Rename them to `login-…` so the IDs are unique per page.

Delete `Login.css` and `Signup.css` once both pages look right.

## Step 7 — `Users.css` → `Users.module.css`

1. Rename the file. `.productList` and `.product` are already camelCase.
2. Move the inline styles in `Users.jsx` into the module:

   ```css
   .userList {
     list-style: none;
     font-size: 3rem;
     line-height: 1.6;
     display: flex;
     align-items: center;
     justify-content: space-around;
   }

   .userLink {
     text-decoration: none;
   }

   .productList {
     list-style: none;
     padding: 0;
     margin: 0;
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
     align-items: center;
     gap: 16px;
   }

   .product {
     /* existing rules… then the old inline ones: */
     padding: 2rem;
     background-color: rgb(86, 193, 168);
     color: rgb(146, 243, 217);
     font-size: 1.5rem;
     font-weight: bold;
   }

   .productImage {
     width: 100%;
     border-radius: 2rem;
   }
   ```

3. Update the JSX:

   ```jsx
   import styles from "./Users.module.css";

   <ul className={styles.userList}>…</ul>
   <ul className={styles.productList}>
     <li key={product.id} className={styles.product}>
       <img src={product.imgurl} alt={product.name} className={styles.productImage} />
   ```

   (Adding `alt` also clears an accessibility warning.)

## Step 8 — Give components without CSS their own module

These files only use inline `style={{…}}` objects. Create a module next to each
one and move the styles across, the same way as above:

| Component              | New module                            | Suggested classes                     |
| ---------------------- | ------------------------------------- | ------------------------------------- |
| `ProductList.jsx`      | `components/ProductList.module.css`   | `.list`, `.panel`, `.item`, `.buyButton`, `.deleteButton` |
| `AddProductButton.jsx` | `components/AddProductButton.module.css` | `.button`                          |
| `Home.jsx`             | `pages/Home.module.css`               | `.hero`, `.heading`, `.quote`, `.cta` |
| `About.jsx`            | `pages/About.module.css`              | `.title`, `.intro`                    |
| `ProductsPage.jsx`     | `pages/ProductsPage.module.css`       | `.heading`                            |
| `App.jsx` (AuthStatus) | add to `App.module.css`               | `.loading`, `.loggedOut`, `.welcome`, `.logoutButton` |

Keep inline styles only for values that are **calculated at runtime** (e.g. a
width from state). Fixed values belong in CSS.

## Step 9 — (Optional) Let Vite convert kebab-case for you

If you'd rather keep `.login-page` in the CSS but write `styles.loginPage` in
JSX, add this to `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
});
```

## Step 10 — Check your work

1. Search for leftover global imports — this should only list `index.css` in
   `main.jsx`:
   ```bash
   grep -rn 'import "\..*\.css"' src
   ```
2. Search for leftover inline styles you meant to move:
   ```bash
   grep -rn "style={{" src
   ```
3. `npm run lint` and `npm run build` should pass with no errors.
4. Click through every page — especially go **Signup → Login** and check the
   inputs no longer change size. That was the global-CSS bug this whole guide
   fixes.
5. In DevTools, inspect an element: class names should look like
   `_nav_x7k2a_1`. That's how you know the module is working.

## Final structure

```
src/
├── styles/
│   └── Form.module.css
├── components/
│   ├── Nav.jsx               + Nav.module.css
│   ├── ProductList.jsx       + ProductList.module.css
│   └── AddProductButton.jsx  + AddProductButton.module.css
├── pages/
│   ├── LoginPage.jsx         + Login.module.css
│   ├── SignupPage.jsx        + Signup.module.css
│   ├── Users.jsx             + Users.module.css
│   ├── Home.jsx              + Home.module.css
│   └── …
├── App.jsx                   + App.module.css
└── index.css                 (global only)
```

Each component now owns its styles: open the `.jsx`, and the `.module.css` next
to it is the only CSS that can affect it.

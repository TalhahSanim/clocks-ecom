# Guide: Moving the CSS into CSS Modules

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
looks. Work through the file from top to bottom, finding each block by what
it contains.

#### 1. Delete the first `body` block

It gets merged into the second `body` block in change 5.

```css
/* DELETE */
body {
  font-family: "Scope Sans", sans-serif;
}
```

#### 2. Delete the unused variables and comments inside `:root`

Delete each of these. Keep `--text`, `--text-h`, `--bg` and `--sans`, which sit
between them.

```css
/* DELETE — old commented-out background */
  /* --bg: linear-gradient(to right, #175a45, #abc); */

/* DELETE — Vite starter variables, nothing uses them */
  --code-bg: #8f8b6f;
  --accent: #aa3bff;
  --accent-bg: rgba(170, 59, 255, 0.1);
  --accent-border: rgba(170, 59, 255, 0.5);
  --social-bg: rgba(244, 243, 236, 0.5);
  --shadow:
    rgba(0, 0, 0, 0.8) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;

/* DELETE — old commented-out gradient */
  /* linear-gradient(
      180deg,
      rgba(213, 247, 232, 1) 0%,
      rgb(39, 141, 147) 70%
    ); */

/* DELETE — commented-out Vite fonts */
  /* --heading: system-ui, "Segoe UI", Roboto, sans-serif;
  --mono: ui-monospace, Consolas, monospace; */
```

Leave the rest of `:root` as it is (the `font:`, `color-scheme:`, `color:`, `background:` lines and so on).

#### 3. Trim the existing dark-mode block

You already have this block, so don't add a new one. Delete the lines marked
below and keep the rest. The deleted lines are all for the Vite starter, like
`#social .button-icon`, which styles the Vite welcome page this app doesn't
have.

```css
@media (prefers-color-scheme: dark) {                  /* keep */
  :root {                                              /* keep */
    --text: #7fa8ef;                                   /* keep */
    --text-h: #f3f4f6;                                 /* keep */
    background: rgb(39, 141, 147);                     /* DELETE */

    /* --bg: linear-gradient(to right, #60c1a7, #abc); */           /* DELETE */

    /* --bg: linear-gradient(to right, #17215a, rgb(217, 233, 249)); */ /* DELETE */
    --border: #2e303a;                                 /* DELETE */
    --code-bg: #1f2028;                                /* DELETE */
    --accent: #c084fc;                                 /* DELETE */
    --accent-bg: rgba(192, 132, 252, 0.15);            /* DELETE */
    --accent-border: rgba(192, 132, 252, 0.5);         /* DELETE */
    --social-bg: rgba(47, 48, 58, 0.5);                /* DELETE */
    --shadow:                                          /* DELETE */
      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px; /* DELETE */
  }                                                    /* keep */

  #social .button-icon {                               /* DELETE */
    filter: invert(1) brightness(2);                   /* DELETE */
  }                                                    /* DELETE */
}                                                      /* keep */
```

When you're done, the block is just this:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --text: #7fa8ef;
    --text-h: #f3f4f6;
  }
}
```

(`background: rgb(39, 141, 147);` can go because `:root` already sets the same
colour through `--bg`.)

> Don't want dark mode at all? Delete the whole `@media (prefers-color-scheme: dark)` block instead, and in
> `:root` change `color-scheme: light dark;` to `color-scheme: light;`.

#### 4. Delete the commented-out `#root` block

```css
/* DELETE */
/* #root {
  width: 80vw;
  ...
  box-sizing: border-box;
} */
```

#### 5. Add the font to the remaining `body` block

```css
/* CHANGE TO */
body {
  margin: 0;
  padding: 0;
  font-family: "Scope Sans", sans-serif;
  background-color: rgb(157, 234, 214);
}
```

#### 6. Delete `font-family: var(--heading);` from `h1, h2`

`--heading` doesn't exist (you deleted its comment in change 2), so this line
does nothing. Headings already get Scope Sans from `body`.

```css
h1,
h2 {
  font-family: var(--heading); /* DELETE this line */
  font-weight: 500;
  color: var(--text-h);
}
```

Keep the `h1 { … }` block. The Users and User Detail headings
rely on it.

#### 7. Delete the `code` block

No page uses a `<code>` tag.

```css
/* DELETE */
code,
code {
  font-size: 15px;
  line-height: 135%;
  padding: 4px 8px;
  background: var(--code-bg);
}
```

#### 8. Fix the font import

```css
/* this URL doesn't load a font, it's just the Google homepage */
@import url("https://googleapis.com");
```

Find your font on [fonts.google.com](https://fonts.google.com), click
**Get font → Get embed code → @import**, and paste that URL in instead. If
"Scope Sans" isn't on Google Fonts, pick a font that is and update the
`font-family` and `--sans` lines to match.

#### Finished `index.css`

After all eight changes, the file should look like this (with your real font
URL in the `@import` line):

```css
/* index.css */
@import url("https://fonts.googleapis.com/css2?family=YOUR+FONT&display=swap");

:root {
  --text: #393a54;
  --text-h: #08060d;
  --bg: rgb(39, 141, 147);
  --sans: "Scope Sans";

  font: 18px/145% var(--sans);
  letter-spacing: 0.18px;
  color-scheme: light dark;
  color: var(--text);
  background: var(--bg);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: #7fa8ef;
    --text-h: #f3f4f6;
  }
}

body {
  margin: 0;
  padding: 0;
  font-family: "Scope Sans", sans-serif;
  background-color: rgb(157, 234, 214);
}

h1,
h2 {
  font-weight: 500;
  color: var(--text-h);
}

h1 {
  font-size: 56px;
  letter-spacing: -1.68px;
  margin: 32px 0;
  @media (max-width: 1024px) {
    font-size: 36px;
    margin: 20px 0;
  }
}
```

Check afterwards with this command in **Git Bash** (`grep` doesn't exist in
PowerShell):

```bash
grep -rn "accent\|social\|code-bg\|--shadow\|--border\|--heading" src
```

It should print nothing.

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

### How to move an inline style into a stylesheet

Most of the steps below also move `style={{ … }}` objects out of the JSX and
into the `.module.css` file. It's the same four moves every time:

1. **Make up a class name** that says what the element is (`.title`,
   `.buyButton`), and add an empty rule for it in the module.
2. **Copy each property across**, converting it from JavaScript to CSS:

   | Inline style (JS)               | Stylesheet (CSS)             | Rule                              |
   | ------------------------------- | ---------------------------- | --------------------------------- |
   | `backgroundColor: "red",`       | `background-color: red;`     | camelCase → kebab-case            |
   | `padding: "2rem",`              | `padding: 2rem;`             | drop the quotes                   |
   | `,` at the end                  | `;` at the end               | comma → semicolon                 |
   | `padding: 20,` (a bare number)  | `padding: 20px;`             | bare numbers mean px, so add `px` |
   | `fontWeight: "600",`            | `font-weight: 600;`          |                                   |

3. **Delete the whole `style={{ … }}`** from the JSX.
4. **Add the class** in its place: `className={styles.title}`.

Example:

```jsx
// before
<h2 style={{ color: "white", textAlign: "center" }}>Hello</h2>

// after
<h2 className={styles.heading}>Hello</h2>
```

```css
.heading {
  color: white;
  text-align: center;
}
```

Keep inline styles only for values **calculated while the app runs** (for
example a width from state). Fixed values belong in CSS.

## Step 3 — Start small: `App.css` → `App.module.css`

1. Rename `src/App.css` to `src/App.module.css` (contents unchanged — `.navBar`
   is already camelCase). Use a lowercase `m`: `App.Module.css` won't work.
2. In `App.jsx`:

   ```jsx
   // before
   import "./App.css";
   <div className="navBar">

   // after
   import styles from "./App.module.css";
   <div className={styles.navBar}>
   ```

3. `className="cont"` has no CSS rule. Delete it.
4. Run `npm run dev` and check the header still has its background image.
5. **Move the inline styles in `AuthStatus`.** Add these to `App.module.css`:

   ```css
   .loading {
     font-weight: bold;
     color: #007;
   }

   /* "You are not Logged In!" (a <span> with the authStatus class) */
   span.authStatus {
     color: red;
   }

   /* "Welcome, …" (an <h3> with the authStatus class) */
   h3.authStatus {
     color: white;
     font-weight: lighter;
     font-size: 3rem;
   }

   .logoutButton {
     display: block;
     padding: 20px;
     border: none;
     background-color: rgb(63, 137, 115);
     color: white;
     text-align: right;
     border-radius: 8px;
     cursor: pointer;
     font-weight: 600;
   }
   ```

   The `<span>` and the `<h3>` both keep their `authStatus` class name, but
   need different styles. `span.authStatus` means "a `<span>` that has the
   `authStatus` class", so the tag name tells the two apart.

6. **Use the new classes in `AuthStatus` (in `App.jsx`).** Adding the CSS
   isn't enough on its own: each element has to point at its class. For each
   of the four elements, **replace** the `style={{ … }}` with a `className`.
   Don't just delete the style.

   **a) The loading `<h3>`**

   ```jsx
   // before
   <h3 style={{ fontWeight: "bold", color: "#007" }}>
     Checking Login Status...
   </h3>

   // after
   <h3 className={styles.loading}>
     Checking Login Status...
   </h3>
   ```

   **b) The "not logged in" `<span>`**

   ```jsx
   // before
   <span className="authStatus" style={{ color: "red" }}>
     You are not Logged In!
   </span>

   // after
   <span className={styles.authStatus}>
     You are not Logged In!
   </span>
   ```

   **c) The welcome `<h3>`**

   ```jsx
   // before
   <h3
     className="authStatus"
     style={{ color: "white", fontWeight: "lighter", fontSize: "3rem" }}
   >
     Welcome, {user.name}
   </h3>

   // after
   <h3 className={styles.authStatus}>
     Welcome, {user.name}
   </h3>
   ```

   **d) The Logout `<button>`**

   ```jsx
   // before
   <button
     style={{
       display: "block",
       padding: "20px",
       /* …7 more lines… */
     }}
     onClick={logout}
   >
     Logout
   </button>

   // after
   <button className={styles.logoutButton} onClick={logout}>
     Logout
   </button>
   ```

   After this step, `App.jsx` should have no `style={{` left, and each class in
   `App.module.css` (`navBar`, `loading`, `authStatus`, `logoutButton`) should
   appear as `styles.…` somewhere in `App.jsx`.

## Step 4 — `Nav.css` → `Nav.module.css` (handling `NavLink`)

1. Rename the file. The CSS can stay the same:

   ```css
   .nav { /* … */ }
   .nav a { /* … */ }          /* element selector nested under a class = fine */
   .nav a.active { /* … */ }
   .nav a.inactive { /* … */ }
   .navTitle { color: #6fd4c8; }
   ```

2. **Change line 2's import** from `import "./Nav.css";` to:

   ```jsx
   import styles from "./Nav.module.css";
   ```

3. **Fix the `NavLink` classes with a `linkClass` helper.**

   Right now each of the six `NavLink`s has this:

   ```jsx
   className={({ isActive }) => (isActive ? "active" : "inactive")}
   ```

   `NavLink` lets `className` be a **function**. React Router calls it with
   `isActive` (`true` when the link points to the page you're on), and
   whatever it returns becomes the class. So the current page's link gets
   `"active"` and the others get `"inactive"`.

   With CSS Modules, the plain strings `"active"` / `"inactive"` no longer
   match anything (Vite renamed those classes), so the function must return
   `styles.active` / `styles.inactive` instead.

   Rather than change that in six places, write the function **once**, give it
   a name (`linkClass`), and pass the name to every `NavLink`. Put it above
   `function Nav()`:

   ```jsx
   const linkClass = ({ isActive }) =>
     isActive ? styles.active : styles.inactive;
   ```

   Then on each `NavLink`, replace the whole `className={({ isActive }) => …}`
   with `className={linkClass}`. Don't put `()` after it: you're handing the
   function to `NavLink` so it can call it, not calling it yourself.

   The full result:

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

4. **Move the inline styles.** `Nav.jsx` has six. Change `Nav.module.css` like
   this:

   ```css
   /* ADD to the existing .nav rule (from <nav style={{ marginBottom: "2rem" }}>) */
   .nav {
     /* …existing rules… */
     margin-bottom: 2rem;
   }

   /* CHANGE .navTitle (from the <h1> style) */
   .navTitle {
     color: #6fd4c8;
     font-size: 6rem;
     text-align: left;
     margin: 8rem 0 10rem;
     text-shadow: 4px 2px 2px rgba(0, 0, 0, 0.5);
     position: relative;
   }

   /* NEW (from the Login icon) */
   .loginIcon {
     color: white;
   }

   /* NEW (from the <img> style) */
   .heroImage {
     width: 200px;
     border-radius: 20px;
   }

   /* NEW (from the <h2> style) */
   .tagline {
     text-align: right;
     color: white;
     font-style: italic;
   }
   ```

   Then update the JSX:

   ```jsx
   <nav className={styles.nav}>

   <RiLoginBoxFill className={styles.loginIcon} size="1rem" />

   <h1 className={styles.navTitle}>Parralel Clocks</h1>

   <img src="https://images.unsplash.com/…" alt="" className={styles.heroImage} />

   <h2 className={styles.tagline}>Timeless design, delivered on time.</h2>
   ```

   - On the `<img>`, also delete `width="600px"`. The inline `width: "200px"`
     was overriding it anyway, so it did nothing.
   - **Delete** the empty `<div style={{ display: "flex", … }}></div>` under
     the `<h2>`. It has nothing inside it, so it shows nothing.
   - The commented-out `{/* … */}` blocks have inline styles too. Delete them
     if you don't need them, so they don't turn up in the Step 10 search.

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

> **Heads up: other buttons will change.** The bare `button { … }` rules in
> `Login.css` and `Signup.css` were styling *every* button in the app. Once you
> delete those files, these buttons lose that styling:
>
> - **Add to Cart** in `Users.jsx`: give it a class in Step 7.
> - **Logout** in `App.jsx`: it has its own inline styles, so it mostly looks
>   the same, but its text gets smaller. Moved to `.logoutButton` in Step 3;
>   add `font-size: 1.2rem;` there if it looks too small.
> - **Buy / Delete** in `ProductList.jsx`: fixed in Step 8.
> - **Back to All Users!** in `UserDetail.jsx`: fixed in Step 8.
>
> Also, the Login button used `font-weight: 100` and `border-radius: 1.2rem`,
> while Signup used `600` and `1.1rem`. `Form.module.css` uses `600` and
> `1.2rem`, so the Login button gets bolder. Override `.button` in
> `Login.module.css` if you want the old look back.

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

   /* Add to Cart: used to get these from the global button rule in Login.css */
   .button {
     composes: button from "../styles/Form.module.css";
   }
   ```

3. Update the JSX:

   ```jsx
   import styles from "./Users.module.css";

   <ul className={styles.userList}>…</ul>
   <ul className={styles.productList}>
     <li key={product.id} className={styles.product}>
       <img src={product.imgurl} alt={product.name} className={styles.productImage} />
       …
       <button className={styles.button} onClick={() => onCartAdd(product.name)}>
         Add to Cart
       </button>
   ```

   Then delete every `style={{ … }}` you moved, and delete `Users.css`.

   (Adding `alt` also clears an accessibility warning.)

## Step 8 — Give components without CSS their own module

These files only use inline `style={{…}}` objects. For each one: create the new
`.module.css` file next to it, paste in the CSS shown, add the `import`, then
swap each `style={{ … }}` for the `className` shown (see "How to move an inline
style" in Step 2).

### `components/ProductList.jsx` → new `components/ProductList.module.css`

```css
.list {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.panel {
  background-color: #439899;
  padding: 15rem;
  box-shadow: 0 2px 5px #443df5;
  border-radius: 2rem;
}

.heading {
  color: white;
}

.item {
  color: white;
}

.buyButton,
.deleteButton {
  padding: 22px;
  border: none;
  border-radius: 5px;
  margin: 20px;
}

.buyButton {
  display: inline-block;
  background-color: rgb(35, 155, 35);
}

.deleteButton {
  background-color: maroon;
}
```

```jsx
import styles from "./ProductList.module.css";

<ul className={styles.list}>
  <div className={styles.panel}>
    <h2 className={styles.heading}>Product Inventory</h2>
    {products.map((product) => (
      <div key={product.id}>
        <li className={styles.item}>…</li>
        <button className={styles.buyButton} onClick={…}>Buy 1</button>
        <button className={styles.deleteButton} onClick={…}>Delete 1</button>
      </div>
    ))}
  </div>
</ul>
```

- Delete the empty `style={{}}` on the `<div>` inside `.map`.
- Move `key={product.id}` from the `<li>` to that `<div>`. React needs the key
  on the **outermost** element returned by `.map`. Otherwise you get a
  "unique key" warning in the console.

### `components/AddProductButton.jsx` → new `components/AddProductButton.module.css`

```css
.button {
  padding: 22px;
  background-color: rgb(51, 177, 164);
  box-shadow: 2px 2px 2px rgb(170, 201, 204);
  margin-bottom: 5px;
  border: none;
  border-radius: 5px;
}
```

```jsx
import styles from "./AddProductButton.module.css";

<button className={styles.button} onClick={() => seedProducts()}>
  Seed DataBase
</button>
```

### `components/ProtectedRoute.jsx` → new `components/ProtectedRoute.module.css`

```css
.loading {
  color: rgb(225, 202, 111);
}
```

```jsx
import styles from "./ProtectedRoute.module.css";

<h3 className={styles.loading}>Checking login Status...</h3>
```

### `pages/Home.jsx` → new `pages/Home.module.css`

```css
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.heading,
.quote {
  color: white;
  text-align: center;
}

.cta {
  display: inline-block;
  margin-top: 2rem;
  padding: 1.2rem;
  background-color: rgb(49, 188, 153);
  color: rgb(173, 251, 230);
  font-weight: bolder;
  text-decoration: none;
  border-radius: 0.3rem;
}
```

```jsx
import styles from "./Home.module.css";

<div className={styles.hero}>
  <h2 className={styles.heading}>Pure style, zero effort</h2>
  <blockquote className={styles.quote}>…</blockquote>
  <Link to="/products" className={styles.cta}>Browse Now</Link>
</div>
```

- `className="page"` has no CSS anywhere. Delete it (`styles.hero` replaces it).
- The `<Link>` had no `to`, so it went nowhere. Add `to="/products"`.

### `pages/About.jsx` → new `pages/About.module.css`

```css
.title {
  width: 66rem;
  font-size: 4rem;
  padding: 4rem;
  margin: 0 auto;
}

.intro {
  font-size: 2rem;
  color: rgb(154, 250, 255);
}
```

```jsx
import styles from "./About.module.css";

<div>
  <h1 className={styles.title}>About | Parralel Store</h1>
  <p className={styles.intro}>Welcome to About Page</p>
</div>
```

- Delete `className="page"` here too. It has no CSS.

### `pages/ProductsPage.jsx` → new `pages/ProductsPage.module.css`

```css
.heading {
  color: white;
  font-size: 2rem;
  margin-bottom: 2rem;
}
```

```jsx
import styles from "./ProductsPage.module.css";

<h2 className={styles.heading}>Store Admin</h2>
```

### `pages/UserDetail.jsx`

This page has no inline styles, but its **Back to All Users!** button was
styled by the global `button` rule you deleted in Step 6. Reuse the shared form
button so it looks the same as before:

```jsx
import form from "../styles/Form.module.css";

<button className={form.button} onClick={() => navigate("/users")}>
  Back to All Users!
</button>
```

Also delete `className="page"` on its `<div>`. It has no CSS.

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

Run the `grep` commands below in **Git Bash**, not PowerShell.

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
│   ├── AddProductButton.jsx  + AddProductButton.module.css
│   └── ProtectedRoute.jsx    + ProtectedRoute.module.css
├── pages/
│   ├── LoginPage.jsx         + Login.module.css
│   ├── SignupPage.jsx        + Signup.module.css
│   ├── Users.jsx             + Users.module.css
│   ├── Home.jsx              + Home.module.css
│   ├── About.jsx             + About.module.css
│   ├── ProductsPage.jsx      + ProductsPage.module.css
│   └── UserDetail.jsx        (uses Form.module.css)
├── App.jsx                   + App.module.css
└── index.css                 (global only)
```

Each component now owns its styles: open the `.jsx`, and the `.module.css` next
to it is the only CSS that can affect it.

# mid2Front — Users

A small React users app (Create React App, React 19). Users come from
the public [DummyJSON](https://dummyjson.com) API, and you can add your
own users locally.

## What it does

- **Users list** — cards with photo, name, age, email, username and
  phone, loaded from `https://dummyjson.com/users`
- **Search by name** — filters by first or last name, debounced by
  500 ms (`useDebounce`), so typing does not re-filter on every keystroke
- **Add a user** — a sidebar form (first name, last name, email, age)
  with validation: names are required, email must contain `@`, age must
  be greater than 0. A valid user is prepended to the list with
  `id: Date.now()`; it lives only in React state and is not sent to the
  server, so a reload drops it
- Loading, error, "No users available" and "No users found" states

## Structure

```
src/
  App.js                      renders UsersPage
  pages/
    UsersPage.jsx             search + list layout
  components/
    UserCard/                 one user card
    UserForm/                 add-user form + validation
  context/
    UserContext.jsx           UserProvider: fetches users, holds the list, addUser
  hooks/
    useFetch.js               generic fetch hook (data / loading / error)
    useDebounce.js            debounced value hook
  index.js / index.css        entry point / styles
```

## Run

```bash
npm install
npm start     # http://localhost:3000
npm test      # test runner (watch mode)
npm run build # production build into build/
```

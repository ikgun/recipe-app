# Recipe Search App

A modern, mobile-friendly React app to browse, search, and add recipes — built with `@tanstack/react-router` and React hooks.

---

## Features

* **Search recipes** by keyword with instant navigation to results.
* **View recipe details** with ingredients and instructions.
* **Add new recipes** through a user-friendly form.
* **Responsive design** optimized for both desktop and mobile.
* **Loading and error states** for seamless user experience.

---

## Tech Stack

* React 18+
* TypeScript
* [@tanstack/react-router](https://tanstack.com/router) for routing
* Tailwind CSS for styling
* React Query / custom hooks for data fetching
* React Toastify for notifications

---

## Usage

* Use the search bar on the homepage to search for recipes.
* Browse all recipes from the "All Recipes" page.
* View detailed recipe info by clicking on a recipe.
* Add your own recipes via the "Add Recipe" page.
* Edit recipes from their detail pages.

---

## Folder Structure

```
src/
├── components/      # Reusable UI components (SearchBar, RecipeCard, etc.)
├── hooks/           # Custom React hooks for API/data fetching
├── routes/          # Route components configured with tanstack/router
├── pages/           # Page-level components (Home, SearchResult, RecipeDetail)
├── styles/          # TailwindCSS and global styles
└── App.tsx          # Root app component
```

---



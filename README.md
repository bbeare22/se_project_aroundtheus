# 🗺️ Around the U.S. — Interactive Photo Gallery

A responsive, interactive photo-sharing project built with **vanilla JavaScript**, **HTML**, and **CSS** using the **BEM methodology**.  
Developed as part of the **TripleTen Software Engineering Program**.

---

## 🌟 Overview

This project simulates a simple social-style photo gallery where users can:
- Edit their profile name and description  
- Add new photo cards with title and image  
- Like or remove existing cards  
- View images in a modal popup  

---

## 🧱 Project Architecture

Built with an object-oriented modular structure using ES6 classes for scalability and reusability.

**Key modules:**
- `Card.js` — Handles card creation, rendering, likes, and deletion  
- `FormValidator.js` — Manages form validation and input feedback  
- `Popup.js` — Base class for modal popups  
- `PopupWithForm.js` — Extends popup for forms (edit/add)  
- `PopupWithImage.js` — Extends popup for viewing full-size images  
- `UserInfo.js` — Manages and renders user profile information  
- `Section.js` — Handles rendering lists of items (cards)  

---

## 🧰 Tech Stack

- **JavaScript (ES6 Modules)**  
- **HTML5 / CSS3**  
- **BEM (Block, Element, Modifier)**  
- **Webpack** for bundling  
- **PostCSS + Autoprefixer**  
- **Babel** for ES6 transpilation  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/bbeare22/se_project_aroundtheus
cd se_project_aroundtheus-main
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run the Development Server
```bash
npm run dev
```

### 4️⃣ Build for Production
```bash
npm run build
```

---

## 🧩 Project Structure

```
se_project_aroundtheus-main/
├── src/
│   ├── index.html
│   ├── pages/
│   │   ├── index.css
│   │   └── index.js
│   ├── blocks/           # BEM CSS files
│   ├── components/       # JS classes (Card, Popup, FormValidator, etc.)
│   ├── images/           # Assets and icons
│   ├── utils/            # Constants
│   └── vendor/           # Fonts and normalize.css
├── package.json
├── webpack.config.js
└── README.md
```

---

## 🎨 Features

- **Responsive design** (optimized for mobile, tablet, and desktop)  
- **Reusable form and popup components**  
- **Dynamic rendering of photo cards**  
- **Client-side validation for all forms**  
- **Modular and maintainable codebase**  

---

## 📜 Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production bundle |

---

## 🧩 Technologies Used

| Tool | Purpose |
|------|----------|
| Webpack | Module bundler |
| Babel | JavaScript transpilation |
| PostCSS | CSS post-processing |
| Autoprefixer | Vendor prefix management |
| CSSNano | CSS minification |
| HTML Webpack Plugin | HTML template handling |

---

## 💡 Future Improvements

- Add API integration for saving user data and cards  
- Add persistent storage (localStorage or backend)  
- Implement real user authentication  
- Animate transitions between popups  

---

✨ *Around the U.S. — Explore, share, and connect through photos.*

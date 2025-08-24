# E-Commerce Client

A modern e-commerce application built with React, Vite, and Tailwind CSS.

## Features

- 🛍️ Product browsing and search
- 🛒 Shopping cart functionality
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast development with Vite

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Tailwind CSS Configuration

This project uses Tailwind CSS v4 with a custom configuration:

- **Custom colors**: Primary color palette with blue variants
- **Custom animations**: fadeIn, slideUp, and spin animations
- **Custom components**: Button, card, and input field styles
- **Responsive design**: Mobile-first approach with breakpoints

### Custom CSS Classes

- `.btn` - Primary button with hover effects
- `.btn-outline` - Outline button variant
- `.card` - Card component with shadows and hover effects
- `.input-field` - Styled input fields with focus states

### Custom Animations

- `.animate-fade-in` - Fade in animation
- `.animate-slide-up` - Slide up animation
- `.animate-spin` - Spinning loader animation

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Footer component
│   ├── ProductCard.jsx # Product display card
│   └── Search.jsx      # Search functionality
├── pages/              # Page components
│   ├── Home.jsx        # Home page with products
│   ├── ProductDetail.jsx # Product detail page
│   └── Cart.jsx        # Shopping cart page
├── assets/             # Static assets
│   └── images/         # Product images
├── App.jsx             # Main app component
├── main.jsx            # App entry point
├── index.css           # Global styles and Tailwind imports
└── App.css             # Custom component styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Backend API

This client connects to a Node.js backend API running on `http://localhost:8000`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

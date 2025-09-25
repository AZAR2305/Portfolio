# 🚀 Thameemul Azarudeen - 3D Portfolio Website

A modern, futuristic, and interactive 3D personal portfolio website showcasing blockchain and Web3 development expertise. Built with React, Three.js, and styled-components for an immersive user experience.

## ✨ Features

### 🎯 Interactive 3D Sections
- **Hero Section**: Fullscreen 3D scene with floating blockchain nodes, animated character, and particle effects
- **About/Skills Section**: 3D skill sphere with interconnected nodes representing technical expertise
- **Projects Section**: 3D project cards with hover animations and detailed modals
- **Experience Section**: Timeline with floating 3D blocks representing career progression
- **Contact Section**: Interactive form with 3D background animations and Web3 wallet integration

### 🎨 Visual Design
- **Dark Neon Theme**: Cyberpunk-inspired color scheme with cyan, purple, and pink accents
- **Futuristic Typography**: Orbitron and Rajdhani fonts for a modern tech aesthetic
- **Glass Morphism**: Translucent elements with backdrop blur effects
- **Smooth Animations**: Framer Motion animations with scroll-triggered reveals
- **Responsive Design**: Optimized for all device sizes

### 🔧 Technical Implementation
- **React 18**: Modern React with hooks and functional components
- **Three.js**: 3D graphics and animations using React Three Fiber
- **Styled Components**: CSS-in-JS with theme provider
- **Framer Motion**: Advanced animations and page transitions
- **Web3 Integration**: MetaMask wallet connection functionality

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Quick Start
```bash
# Clone the repository
git clone https://github.com/thameemul/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development Server
The development server will start at `http://localhost:5173` with hot reload enabled.

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── vite.svg
│   └── index.html
├── src/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.jsx          # Landing section with 3D character
│   │   │   ├── About.jsx         # Skills and about with 3D sphere
│   │   │   ├── Projects.jsx      # Project showcase with 3D cards
│   │   │   ├── Experience.jsx    # Career timeline with 3D blocks
│   │   │   └── Contact.jsx       # Contact form with 3D background
│   │   ├── 3d/                   # 3D components and models
│   │   └── LoadingScreen.jsx     # Loading animation
│   ├── styles/
│   │   └── GlobalStyles.js       # Theme and global styles
│   ├── assets/
│   │   └── models/              # 3D model files (GLTF/GLB)
│   ├── hooks/                   # Custom React hooks
│   ├── App.jsx                  # Main application component
│   └── main.jsx                 # Entry point
├── .github/
│   └── copilot-instructions.md  # GitHub Copilot instructions
├── package.json
├── vite.config.js
└── README.md
```

## 🎮 Interactive Features

### 3D Character (Hero Section)
- Realistic proportions with casual-futuristic styling
- Idle animations: breathing, subtle movements
- Tech accessories: AR glasses, holographic interface
- Mouse parallax interaction

### Skill Sphere (About Section)
- Interactive 3D sphere with skill nodes
- Blockchain-style connections between technologies
- Hover effects with node highlighting
- Smooth rotation animations

### Project Cards (Projects Section)
- 3D depth perspective with hover lift effects
- Modal overlays with detailed project information
- Live preview integration
- Technology stack visualization

### Experience Timeline (Experience Section)
- 3D blocks representing career milestones
- Scroll-triggered animations
- Hover interactions with detailed information
- Progressive career visualization

### Contact Form (Contact Section)
- Web3 wallet connection (MetaMask)
- Interactive form fields with focus animations
- 3D particle background
- Real-time form validation

## 🌈 Color Palette

```css
Primary Colors:
- Neon Cyan: #00f5ff
- Electric Purple: #8a2be2
- Hot Pink: #ff1493
- Deep Blue: #00bfff
- Violet: #9400d3

Background Colors:
- Pure Black: #0a0a0a
- Dark Gray: #1a1a1a
- Navy: #1a1a2e
- Darker Navy: #16213e
```

## 🔧 Customization

### Modifying 3D Models
1. Export 3D models in GLTF/GLB format
2. Place models in `src/assets/models/`
3. Import and use in respective components
4. Adjust scaling and positioning as needed

### Updating Content
- **Personal Info**: Edit text content in component files
- **Projects**: Update project data arrays in `Projects.jsx`
- **Experience**: Modify experience data in `Experience.jsx`
- **Skills**: Update skills array in `About.jsx`

### Theme Customization
Edit `src/styles/GlobalStyles.js` to modify:
- Color scheme
- Typography
- Spacing and layout
- Animation timings

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

3D elements are optimized for mobile with reduced complexity and adjusted camera positions.

## 🚀 Performance Optimization

- **Lazy Loading**: Components loaded on demand
- **3D Model Optimization**: Low-poly models for better performance
- **Texture Compression**: Optimized image assets
- **Code Splitting**: Dynamic imports for better loading times
- **Caching**: Service worker for offline capability

## 🔗 Deployment

### Netlify/Vercel
```bash
# Build the project
npm run build

# Deploy the dist folder
```

### GitHub Pages
```bash
npm run build
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

**Thameemul Azarudeen**
- Email: thameemul.dev@gmail.com
- GitHub: [@thameemul](https://github.com/thameemul)
- LinkedIn: [thameemul](https://linkedin.com/in/thameemul)
- Portfolio: [Live Demo](https://your-domain.com)

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) - 3D graphics library
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - React renderer for Three.js
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Styled Components](https://styled-components.com/) - CSS-in-JS styling
- [Vite](https://vitejs.dev/) - Build tool and development server

---

⭐ **Star this repository if you found it helpful!**

🔮 **Built with passion for the future of Web3**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

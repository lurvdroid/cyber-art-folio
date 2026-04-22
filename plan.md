# Project Plan - Lurvdroid Portfolio

Create a visually striking, futuristic personal portfolio for Lurvdroid, a creative tech specialist.

## Design Concept
- **Theme**: Cyberpunk/Minimal Futuristic. Deep black backgrounds with neon cyan and purple accents.
- **Animations**: Framer Motion for scroll reveals, hover effects, and a custom particle background.
- **Typography**: Bold, tech-inspired headings (Space Grotesk if possible, or Inter with custom styling).

## Implementation Steps

### 1. Setup & Configuration
- Configure Tailwind with custom colors:
  - `cyber-cyan`: #00FFFF
  - `cyber-purple`: #BB86FC
  - `cyber-black`: #050505
- Setup `framer-motion` for animations.
- Use `lucide-react` for icons.

### 2. Core Components
- **Navbar**: Sticky, glassmorphism effect, neon glow on active links.
- **HeroSection**: High impact, background image with overlay, animated tagline.
- **AboutSection**: Bio with skill tags and a creative layout.
- **ServicesSection**: Category cards with neon borders and icons.
- **PortfolioSection**: Filterable grid (Tech, Marketing, Art) using generated images.
- **ContactSection**: Form with neon validation styles and social links.
- **Footer**: Minimalist with social icons.

### 3. Special Features
- Custom cursor (optional, if time permits).
- Subtle grid background or particle effect using CSS/Framer Motion.
- Sonner for form submission notifications.

### 4. Refinement
- Mobile-first responsiveness check.
- Performance optimization (lazy loading images).
- Final build validation.

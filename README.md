# Vlad Coșa - Cabinet Individual de Psihologie

A sleek, minimalist website for a professional psychology practice built with **portability** and **elegance** in mind.

## 🎨 Design Philosophy

- **Minimalist & Editorial**: Generous white space, calm aesthetics
- **Typography**: Crimson Pro (Serif) for headings + Inter (Sans-serif) for body text
- **Color Palette**: Muted earthy tones (Sage, Cream, Slate)
- **Professional**: High-converting design focused on trust and empathy

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom configuration
- **Containerization**: Docker + Docker Compose
- **Web Server**: Nginx (Alpine)
- **Reverse Proxy**: Ready for Nginx Proxy Manager / Traefik + Let's Encrypt

## 📁 Project Structure

```
vladcosa.ro/
├── src/
│   ├── components/
│   │   ├── Hero.jsx           # Landing hero section
│   │   ├── About.jsx          # About & qualifications
│   │   ├── Services.jsx       # Services offered
│   │   ├── Contact.jsx        # Contact information
│   │   └── Footer.jsx         # Footer with legal name
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # React entry point
│   └── index.css              # Tailwind directives
├── Dockerfile                 # Multi-stage Docker build
├── docker-compose.yml         # Container orchestration
├── nginx.conf                 # Nginx configuration
├── tailwind.config.js         # Custom Tailwind theme
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies
└── .env.example               # Environment variables template
```

## 🐳 Docker Deployment

### Quick Start

1. **Clone and configure**:
   ```bash
   cd /home/popo5000/Websites/vladcosa.ro
   cp .env.example .env
   # Edit .env with your details
   ```

2. **Build and run**:
   ```bash
   docker-compose up -d --build
   ```

3. **Access the site**:
   - Local: http://localhost:3000
   - Production: Configure your reverse proxy to point to port 3000

### Portability Features

✅ **No cloud-proprietary services** - Works on any Docker host  
✅ **Standard environment variables** - Easy configuration via `.env`  
✅ **Volume mapping ready** - Uncomment database volumes if needed  
✅ **Move anywhere** - Copy folder to new server and run `docker-compose up`

## 🔧 Development

### Local Development (without Docker)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_SITE_NAME="Vlad Coșa - Psiholog"
VITE_DOMAIN=vladcosa.ro
VITE_EMAIL=contact@vladcosa.ro
VITE_PHONE="+40 XXX XXX XXX"
```

## 🌐 Production Setup with Reverse Proxy

### Nginx Proxy Manager

1. Add a new Proxy Host
2. **Domain Names**: `vladcosa.ro`, `www.vladcosa.ro`
3. **Forward Hostname/IP**: `vladcosa-psychology` (container name) or your server IP
4. **Forward Port**: `3000`
5. Enable **SSL** with Let's Encrypt
6. Enable **Force SSL** and **HTTP/2**

### Traefik (Alternative)

The `docker-compose.yml` includes Traefik labels. Ensure Traefik is running:

```yaml
# Labels already included in docker-compose.yml
- "traefik.enable=true"
- "traefik.http.routers.vladcosa.rule=Host(`vladcosa.ro`) || Host(`www.vladcosa.ro`)"
- "traefik.http.routers.vladcosa.entrypoints=websecure"
- "traefik.http.routers.vladcosa.tls.certresolver=letsencrypt"
```

## 📊 Future Database Setup

If you need a database (for appointments, contact forms, etc.):

1. Uncomment the database section in `docker-compose.yml`
2. Set `DB_PASSWORD` in your `.env` file
3. Rebuild: `docker-compose up -d --build`

Data will persist in Docker volumes that move with the project.

## 🎯 Key Features

- ✨ **Responsive Design**: Mobile-first, works on all devices
- ⚡ **Fast Loading**: Optimized Vite build, Nginx compression
- 🔒 **Security Headers**: XSS protection, frame options, content-type sniffing prevention
- 🏥 **Health Checks**: Built-in container health monitoring
- 📱 **SEO Ready**: Semantic HTML, meta tags, proper heading structure
- ♿ **Accessible**: WCAG-compliant color contrasts and markup

## 🎨 Customization

### Colors

Edit [tailwind.config.js](tailwind.config.js) to modify the color palette:

```javascript
colors: {
  sage: { ... },    // Primary brand color
  cream: { ... },   // Background/neutral
  slate: { ... },   // Text/accents
}
```

### Typography

Google Fonts are loaded in [index.html](index.html):
- **Crimson Pro** (Serif) - Headings
- **Inter** (Sans-serif) - Body text

### Content

Replace placeholder content in:
- [src/components/Hero.jsx](src/components/Hero.jsx) - Add professional photo
- [src/components/About.jsx](src/components/About.jsx) - Update qualifications
- [src/components/Contact.jsx](src/components/Contact.jsx) - Add real phone/email/location

## 📝 Legal Compliance

The full legal name **"Coșa Vlad - Cabinet Individual de Psihologie"** is displayed in the footer as required, while the rest of the site uses the more approachable "Vlad Coșa" branding.

## 🚢 Moving to Production

1. **Copy the entire folder** to your production server
2. Ensure Docker and Docker Compose are installed
3. Update `.env` with production values
4. Run: `docker-compose up -d --build`
5. Configure your reverse proxy (Nginx Proxy Manager/Traefik)
6. Done! No cloud dependencies, fully portable.

## 📄 License

© 2026 Coșa Vlad - Cabinet Individual de Psihologie. All rights reserved.

---

**Built with care for mental health professionals** 💚

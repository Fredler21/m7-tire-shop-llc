# 🛠️ M7 Tire Shop LLC - Website V1

Professional automotive services website built with modern web technologies.

## 🎯 Overview

M7 Tire Shop LLC is a full-featured website for a professional mechanical shop, enabling customers to:
- Browse services and pricing
- Book appointments online
- Get estimates
- Contact the shop
- Read customer reviews

This is **Version 1 (MVP)** of a 3-phase product roadmap. See [prd.md](./prd.md) for the complete product roadmap.

---

## ✨ Features

### 🏠 Homepage
- Eye-catching hero section with call-to-action
- Featured services preview
- "Why Choose Us" section with benefits
- Customer reviews carousel
- Email newsletter signup area

### 🔧 Services Page
Complete service catalog with:
- Oil Change ($45+)
- Tire Services ($60+)
- Brake Repair ($150+)
- Engine Diagnostics ($85+)
- Battery Replacement ($50+)
- Body Shop ($200+)

Each service includes:
- Professional 4K images (from Unsplash)
- Description
- Starting price
- Direct booking link

### 📅 Booking System
Simple appointment booking with:
- Service selection
- Date and time picker
- Customer information form
- Additional notes field
- Confirmation notifications

### 📞 Contact Page
Multiple contact methods:
- Phone number
- Email address
- Physical location with Google Maps embed
- Contact form
- Business hours

### ⭐ Reviews Section
- Customer testimonials carousel
- 5-star ratings
- Auto-rotating reviews
- Navigation controls

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 16.2.4 with TypeScript and App Router
- **Styling**: Tailwind CSS
- **Components**: React 19 with custom components
- **Notifications**: React Hot Toast
- **Carousel**: Swiper.js
- **API Integration**: Gemini API (for future AI features)
- **Environment**: Node.js with npm

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Fredler21/m7-tire-shop-llc.git
cd m7-tire-shop-llc
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create `.env.local` file:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Follow the prompts to connect your GitHub repository and deploy.

### Docker Deployment

```bash
docker build -t m7-tire-shop .
docker run -p 3000:3000 m7-tire-shop
```

### Manual Deployment

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
m7-tire-shop-llc/
├── app/
│   ├── api/
│   │   ├── bookings/route.ts       # Booking API endpoint
│   │   └── contact/route.ts        # Contact form API endpoint
│   ├── components/
│   │   ├── Header.tsx              # Navigation header
│   │   ├── Footer.tsx              # Footer
│   │   ├── ServiceCard.tsx         # Service display card
│   │   ├── BookingForm.tsx         # Booking form component
│   │   ├── ContactForm.tsx         # Contact form component
│   │   └── ReviewsSection.tsx      # Reviews carousel
│   ├── booking/page.tsx            # Booking page
│   ├── contact/page.tsx            # Contact page
│   ├── services/page.tsx           # Services page
│   ├── page.tsx                    # Home page
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
├── lib/
│   ├── types.ts                    # TypeScript interfaces
│   └── gemini.ts                   # Gemini API utilities
├── public/
│   └── images/                     # Static images
├── .env.local                      # Environment variables
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies
```

---

## 🎨 Design

- **Color Scheme**: Dark theme (Gray-900 background) with Orange accent (#F97316)
- **Responsive**: Mobile-first design, fully responsive on all devices
- **Performance**: Optimized images, lazy loading, fast load times
- **Accessibility**: Semantic HTML, proper contrast ratios

---

## 🔄 Booking Flow

1. User clicks "Book Now" button
2. Selects service from dropdown
3. Chooses date (tomorrow or later)
4. Selects available time slot
5. Enters personal information
6. Adds optional notes
7. Submits booking
8. Receives confirmation toast notification
9. Email confirmation sent (future integration)

---

## 📧 Contact Form Flow

1. User fills out contact form
2. Provides name, email, phone, subject, message
3. Submits form
4. Receives success notification
5. Backend sends email notification (future integration)

---

## 🔐 Security

- Environment variables for sensitive data
- Input validation on forms
- CORS-ready API endpoints
- No exposed API keys in client code

---

## 📊 API Endpoints

### POST /api/bookings
Create a new appointment booking.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "carModel": "Honda Civic",
  "service": "Oil Change",
  "date": "2024-12-25",
  "time": "10:00 AM",
  "notes": "Check for oil leak"
}
```

**Response:**
```json
{
  "id": "1703534400000",
  "status": "pending",
  "createdAt": "2024-12-25T10:00:00Z",
  ...
}
```

### POST /api/contact
Send a contact message.

**Request:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "(555) 987-6543",
  "subject": "Question about services",
  "message": "Do you offer..."
}
```

**Response:**
```json
{
  "message": "Message received. We will contact you soon."
}
```

---

## 🚀 V2 Roadmap (Coming Soon)

- Customer dashboard
- Live booking availability
- Service status tracking
- Admin dashboard
- Email notifications
- SMS reminders (Twilio integration)
- Online estimates

See [prd.md](./prd.md) for complete roadmap and future plans.

---

## 💡 Features to Add

### Immediate (Before V2)
- [ ] Email confirmation integration
- [ ] SMS notifications
- [ ] Google Analytics
- [ ] SEO optimization
- [ ] Sitemap/robots.txt
- [ ] Privacy policy page
- [ ] Terms of service page

### V2 Features
- [ ] Customer accounts
- [ ] Booking history
- [ ] Real-time availability
- [ ] Payment integration (Stripe)
- [ ] Email reminders

### V3 Features
- [ ] AI diagnostics assistant
- [ ] Photo-based estimates
- [ ] Multi-service bundles
- [ ] Loyalty program
- [ ] Fleet management
- [ ] Blog/SEO content

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code quality
npm run lint         # Run ESLint
npm run format       # Format with Prettier (if configured)
```

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📄 License

Private project for M7 Tire Shop LLC

---

## 📧 Support

**Email**: info@m7tirshop.com  
**Phone**: (555) 123-4567  
**Address**: 123 Main Street, City, State 12345

---

## 🙏 Credits

- Unsplash for high-quality automotive images
- Next.js and Vercel for fantastic framework
- Tailwind CSS for utility-first styling
- React community for amazing tools and libraries

---

**Version**: 1.0.0  
**Last Updated**: April 2024  
**Status**: ✅ Production Ready

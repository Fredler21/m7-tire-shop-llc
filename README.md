# 🛞 M7 Tire Shop LLC — Website

The official website for M7 Tire Shop LLC — a professional automotive shop where customers can explore services, book appointments, and get in touch with the team.

---

## 🌟 What's on the Site

### 🏠 Homepage
- Full-screen image slider showcasing our services
- Services preview with grayscale-to-color hover/touch effect
- "Why Choose Us" highlights and a 3-step process flow
- Quick booking form
- Customer reviews

### 🔧 Services Page
Browse all 6 services — each card links to a full detail page:
- 🛢️ Oil Change — from $45
- 🔄 Tire Services — from $60
- 🛑 Brake Repair — from $150
- 🔍 Engine Diagnostics — from $85
- 🔋 Battery Replacement — from $50
- 🎨 Body Shop — from $200

Each detail page includes a description, what's included, duration, warranty, FAQs, and a direct booking button.

### 📅 Booking Page
Fill out a quick form to schedule your appointment. Pick a service, date, time, and your contact info — we confirm within 24 hours.

### 📞 Contact Page
Reach us by phone, email, or the contact form. Includes a map and business hours.

---

## 🎨 Design

- 🌑 Dark navy theme with cyan accent color
- 📱 Fully responsive — works on phones, tablets, and desktop
- ✨ Premium service card effect: grayscale → full color on touch/hover
- 🪟 Glass-morphism cards and overlays throughout

---

## 🛠️ Tech Stack

- ⚡ **Next.js 16** with TypeScript and App Router
- 🎨 **Tailwind CSS v4** for styling
- ⚛️ **React 19** with custom components
- 🤖 **Google Gemini API** for AI-generated images

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
│   │   ├── HeroSlider.tsx          # Homepage image slider
│   │   ├── ServiceCard.tsx         # Service card with color reveal
│   │   ├── BookingForm.tsx         # Booking form
│   │   ├── ContactForm.tsx         # Contact form
│   │   └── ReviewsSection.tsx      # Customer reviews
│   ├── services/
│   │   ├── page.tsx                # Services listing page
│   │   └── [id]/page.tsx           # Individual service detail page
│   ├── booking/page.tsx            # Booking page
│   ├── contact/page.tsx            # Contact page
│   ├── page.tsx                    # Home page
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
├── lib/
│   ├── services-data.ts            # All service content (shared)
│   ├── types.ts                    # TypeScript types
│   └── gemini.ts                   # Gemini API utilities
├── public/
│   └── images/                     # Service images
└── package.json
```

---

## 💻 Running Locally

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment

Deploy instantly on Vercel (recommended). Connect the GitHub repository and it deploys automatically on every push to `main`.

---

## 🗺️ Booking Flow

1. 🖱️ Click **Book Appointment** anywhere on the site
2. 🔧 Select your service
3. 📅 Pick a date and time
4. 📝 Enter your name, phone, email, and car model
5. ✅ Submit — we confirm within 24 hours

---

## 🔮 Coming Soon (V2)

- 📊 Admin dashboard
- 📬 Email and SMS confirmations
- 🗓️ Live availability calendar
- 🧾 Online estimates
- 👤 Customer accounts

See [prd.md](./prd.md) for the full product roadmap.

---

## � License

This project is **proprietary and private**. All rights reserved by M7 Tire Shop LLC.

No permission is granted to copy, use, modify, or distribute this code without explicit written authorization. See [LICENSE](./LICENSE) for full terms.


# VitaMend - Medicine Redistribution Platform

<p align="center">
  <img src="public/icons/icon-512x512.png" alt="VitaMend Logo" width="200" />
</p>

<p align="center">
  <strong>Reviving Medicines, Restoring Lives</strong>
</p>

<p align="center">
  <a href="https://vitamend.com">Website</a> •
  <a href="https://vitamend.com/docs">Documentation</a> •
  <a href="https://vitamend.com/api-docs">API Reference</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

---

## 🌟 Overview

VitaMend is a comprehensive platform for collecting, verifying, and redistributing unused medicines to underserved communities. Our mission is to reduce medical waste while making healthcare more accessible to those in need.

### Key Features

- 🏥 **Medicine Donation Management**: Easy donation submission and tracking
- 👥 **Volunteer Coordination**: Connect volunteers with collection and verification tasks
- 🔍 **AI-powered Medicine Verification**: Ensure medicine quality and safety
- 📊 **Impact Tracking**: Monitor the environmental and social impact of donations
- 🛒 **Subsidized Medicine Marketplace**: Make verified medicines accessible to those in need
- 👨‍💼 **Admin Dashboard**: Comprehensive management tools
- 📱 **Progressive Web App**: Works offline and on mobile devices
- 🔐 **Secure Authentication**: Protect user data and privacy

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+
- MongoDB database
- Google OAuth credentials (optional)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/vitamend.git
cd vitamend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Fill in your environment variables in `.env.local`:

\`\`\`env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
\`\`\`

4. Seed the database (optional):
\`\`\`bash
npm run seed
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## 💻 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Storage**: Vercel Blob Storage
- **AI/ML**: Custom OCR and medicine verification
- **PWA**: next-pwa for offline capabilities
- **API**: REST and GraphQL endpoints

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Created By

Developed with ❤️ by Rachit

---

For support or inquiries, please contact us at support@vitamend.com
\`\`\`

Let's update the footer in the layout.tsx file to include Rachit's copyright:

```typescriptreact file="app/layout.tsx"
[v0-no-op-code-block-prefix]import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import { SessionProvider } from "@/components/session-provider"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VitaMend - Medicine Donation Platform",
  description: "Connect unused medicines with those in need",
  manifest: "/manifest.json",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1a472a" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ErrorBoundary>
              <div className="flex min-h-screen flex-col">
                <Navigation />
                <main className="flex-1">{children}</main>
                <footer className="border-t py-6 md:py-0">
                  <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                      &copy; {new Date().getFullYear()} VitaMend. Developed by Rachit. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                      <a href="/legal/terms" className="text-sm text-muted-foreground hover:underline">
                        Terms
                      </a>
                      <a href="/legal/privacy" className="text-sm text-muted-foreground hover:underline">
                        Privacy
                      </a>
                      <a href="/transparency" className="text-sm text-muted-foreground hover:underline">
                        Transparency
                      </a>
                    </div>
                  </div>
                </footer>
              </div>
            </ErrorBoundary>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = "https://www.lakshyakhanna.xyz";
const SITE_TITLE = "Lakshya Khanna — The Quiet Engineer";
const SITE_DESCRIPTION =
  "Portfolio of Lakshya Khanna — full-stack engineer working at the seams of AI, audio, and infrastructure. Seven years across React, TypeScript, Python, FastAPI, and Whisper AI pipelines.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Lakshya Khanna",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Lakshya Khanna",
    "full-stack engineer",
    "full-stack developer India",
    "Next.js developer",
    "React developer",
    "Python FastAPI engineer",
    "Whisper AI",
    "speech-to-text engineer",
    "AI tooling",
    "offshore engineer India",
    "remote contractor",
    "monitoring systems",
    "Dehradun developer",
  ],
  authors: [{ name: "Lakshya Khanna", url: SITE_URL }],
  creator: "Lakshya Khanna",
  publisher: "Lakshya Khanna",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@lakshyak789",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "MnMiMMzFH6xlNTqVghjXRcOogkcU59eqJPLaCw1NTX8",
  },
  category: "technology",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lakshya Khanna",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: "Full-Stack Engineer",
  description:
    "Full-stack engineer working at the seams of AI, audio, and infrastructure.",
  email: "mailto:Lakshyak789@gmail.com",
  telephone: "+91-94101-40226",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dehradun",
    addressRegion: "Uttarakhand",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/lakshyak789",
    "https://www.linkedin.com/in/lakshya-khanna-8b861754/",
    "https://lakshya.space",
  ],
  worksFor: {
    "@type": "Organization",
    name: "CS Technology LLC",
  },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "FastAPI",
    "Django",
    "Go",
    "PostgreSQL",
    "Whisper AI",
    "Speech-to-text pipelines",
    "AWS",
    "Docker",
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Chandigarh Engineering College",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Lovely Professional University",
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: SITE_TITLE,
  description: SITE_DESCRIPTION,
  author: { "@type": "Person", name: "Lakshya Khanna" },
  inLanguage: "en",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}

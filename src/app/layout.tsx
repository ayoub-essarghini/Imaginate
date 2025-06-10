import type { Metadata } from "next";
import {  Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Imaginate - AI Image Generation',
  authors: [
    {
      name: 'Ayoub Es-Sarghini',
      url: 'https://ayoub-es-sarghini.netlify.app/',
    },
  ],
  keywords: ['AI', 'Image Generation', 'Text to Image', 'Imaginate', 'AI Art', 'Generative AI', 'AI Images','create images from text', 'AI art generator'],

  description: 'Generate stunning AI images from text prompts',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
         <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img src="/my_logo.svg" alt="AI Headshot Platform" className="h-14 w-auto" />
              {/* <span className="ml-2 text-xl font-bold text-white">Imaginate</span> */}
            </a>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-white/80 hover:text-white transition-colors">Home</a>
              <a href="/gallery" className="text-white/80 hover:text-white transition-colors">Gallery</a>
              <a href="/pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a>
              <a href="/login" className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-500 transition-colors">Login</a>
            </nav>
            <button className="md:hidden text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>
         <main className="pt-8">
          {children}
        </main>
      </body>
    </html>
  );
}

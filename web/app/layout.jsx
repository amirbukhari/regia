import './billing.css';

export const metadata = {
  title: 'delonix — Enterprise Billing Console',
  description:
    'delonix — a simple, sustainable, scalable enterprise billing system: subscriptions, usage metering, invoicing, dunning, revenue recognition and tax.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 48'><path d='M20 44 C20 44 6 34 8 20 C9 12 16 6 22 4 C18 14 14 24 17 34 C18 38 20 41 23 44 Z' fill='white'/><path d='M23 44 C23 44 34 32 30 18 C28 10 20 5 14 4 C19 14 24 24 23 34 C22 39 21 41 19 44 Z' fill='%232563eb'/></svg>",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Plus+Jakarta+Sans:wght@300..800&display=swap"
          rel="stylesheet"
        />
        {/* apply the saved theme before first paint (mockup does this in js/theme.js) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(()=>{try{document.documentElement.dataset.theme=localStorage.getItem('dlx-theme')||'ember';}catch(e){document.documentElement.dataset.theme='ember';}})();",
          }}
        />
        {children}
      </body>
    </html>
  );
}

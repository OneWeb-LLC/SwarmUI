import './globals.css';

export const metadata = {
  title: 'SwarmUI — OWeb Satellite',
  description: 'Modular AI media generation with shared OneID from OWeb.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

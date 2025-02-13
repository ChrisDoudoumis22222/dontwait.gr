export const metadata = {
  title: 'Dontwait.gr',
  description: 'Αναβάθμησε την επειχηρησεί σου',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Load Tailwind via CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}

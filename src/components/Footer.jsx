export default function Footer() {
  return (
    <footer className="border-t border-[#002654]/50 py-8 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[#fed136] font-black text-xl tracking-tight">GK.</span>
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Godbless Kaaya. All rights reserved.
        </p>
        <a
          href="mailto:godblessgkaaya@gmail.com"
          className="text-gray-500 hover:text-[#fed136] transition-colors text-sm"
        >
          godblessgkaaya@gmail.com
        </a>
      </div>
    </footer>
  )
}

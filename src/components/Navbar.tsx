import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-14 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-7xl rounded-full bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border border-slate-200/50 transition-all duration-300">
            <div className="mx-auto flex h-20 items-center justify-between px-6 lg:px-8">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src="/logo.png"
                            alt="Health Link Logo"
                            width={48}
                            height={48}
                            className="object-contain"
                        />
                    </div>
                    <span className="text-3xl font-extrabold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-sky-600 drop-shadow-sm">Health Link</span>
                </Link>

                {/* Center Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {[
                        { name: 'Home', path: '/' },
                        { name: 'About Us', path: '/about' },
                        { name: 'Contact Us', path: '/contact' }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className="relative text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all hover:after:w-full"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <Link href="/signin" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">
                        Sign in
                    </Link>
                    <Link
                        href="/services/telemedicine/register"
                        className="rounded-full bg-gradient-to-r from-sky-600 to-sky-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/40 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition-all duration-300"
                    >
                        Register now
                    </Link>
                </div>
            </div>
        </nav>
    );
}

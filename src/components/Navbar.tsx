
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md transition-all">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md">
                        {/* Using a placeholder if image is missing, or actual path */}
                        <Image
                            src="/logo.png"
                            alt="Health Link Logo"
                            width={48}
                            height={48}
                            className="object-contain"
                        />
                    </div>
                    <span className="text-3xl font-extrabold tracking-tight text-[#002f6c]">Health Link</span>
                </Link>

                {/* Center Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">
                        Home
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">
                        About Us
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">
                        Contact Us
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <Link href="/signin" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">
                        Sign in
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition-all"
                    >
                        Register now
                    </Link>
                </div>
            </div>
        </nav>
    );
}

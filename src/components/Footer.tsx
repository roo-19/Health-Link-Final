import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2">
                    <span className="text-sm text-slate-500">Sinhala | Tamil | English</span>
                </div>
                <div className="mt-8 md:order-1 md:mt-0">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-4">
                        <Link href="/" className="text-lg font-bold text-slate-900">Health Link <span className="text-xs font-normal text-slate-500 ml-1">Empowering Healing</span></Link>
                        <nav className="flex gap-4">
                            <Link href="/about" className="text-sm text-slate-500 hover:text-slate-900">About Us</Link>
                            <Link href="/contact" className="text-sm text-slate-500 hover:text-slate-900">Contact Us</Link>
                            <Link href="/privacy" className="text-sm text-slate-500 hover:text-slate-900">Privacy</Link>
                            <Link href="/terms" className="text-sm text-slate-500 hover:text-slate-900">Terms</Link>
                        </nav>
                    </div>
                    <p className="text-center text-xs leading-5 text-slate-500 md:text-left">
                        &copy; {new Date().getFullYear()} Health Link. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

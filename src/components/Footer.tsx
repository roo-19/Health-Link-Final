import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200/60 pb-8 pt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            Health Link
                        </Link>
                        <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                            Empowering healing by bringing expert medical care directly to you, anytime, anywhere.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Company</h3>
                        <Link href="/about" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">About Us</Link>
                        <Link href="/contact" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Contact Us</Link>
                        <Link href="/careers" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Careers</Link>
                    </div>

                    {/* Legal & Language */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Legal</h3>
                        <Link href="/privacy" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Terms of Service</Link>
                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200/50 text-xs font-medium text-slate-600 w-fit">
                            <span>🌍 Sinhala | Tamil | English</span>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs leading-5 text-slate-500">
                        &copy; {new Date().getFullYear()} Health Link. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#FAF8F5] border-t border-[#002B9A]/10 pb-12 pt-20">
            <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                    
                    {/* Brand Section */}
                    <div className="flex flex-col gap-4 md:col-span-6">
                        <Link href="/" className="text-2xl font-extrabold text-primary tracking-tight font-serif">
                            Health Link
                        </Link>
                        <p className="text-sm text-slate-600 max-w-sm leading-relaxed font-light">
                            Empowering healing by bridging expert medical care and holistic wellness directly to your life. Available round-the-clock.
                        </p>
                        <div className="mt-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent border border-secondary/10 text-xs font-semibold text-secondary w-fit">
                            <span>🌍 Sinhala | Tamil | English</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-3 md:col-span-3">
                        <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Company</h3>
                        <Link href="/about" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">About Us</Link>
                        <Link href="/community" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">Community</Link>
                        <Link href="/contact" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">Contact Us</Link>
                        <Link href="/careers" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">Careers</Link>
                        <Link href="/doctor/register" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">Join as Doctor</Link>
                    </div>

                    {/* Legal & Language */}
                    <div className="flex flex-col gap-3 md:col-span-3">
                        <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Legal</h3>
                        <Link href="/privacy" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">Privacy Policy</Link>
                        <Link href="/terms" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">Terms of Service</Link>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-400 font-medium">
                        &copy; {new Date().getFullYear()} Health Link Pvt Ltd. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

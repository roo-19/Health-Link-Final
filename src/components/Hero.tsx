import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative h-[600px] w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/hero1.png"
                    alt="Healthcare Professional"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
            </div>

            {/* Hero Content */}
            <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                        Empowering <br />
                        <span className="text-sky-400">Healing</span>
                    </h1>
                    <p className="mt-6 max-w-lg text-xl text-slate-100">
                        Bridging western medicine and traditional healing to provide a truly personalized care journey.
                    </p>
                    <div className="mt-10 flex flex-col gap-y-4">
                        <div className="flex items-center gap-x-6">
                            <Link
                                href="/register"
                                className="rounded-full bg-sky-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition-all"
                            >
                                Get care now
                            </Link>
                            <Link href="/about" className="text-sm font-semibold leading-6 text-white hover:text-sky-300 transition-colors">
                                Learn more <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* TODO: replace hero image with integrated-self concept (holistic + modern medicine blend). */}
        </section>
    );
}

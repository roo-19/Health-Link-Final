import Image from "next/image";
import Navbar from "@/components/Navbar";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const values = [
  {
    title: "Compassionate Care",
    description: "Our approach is rooted in empathy, treating every patient like family, prioritizing their emotional and physical well-being above all.",
    image: "/benefits_home_care.png",
  },
  {
    title: "Innovative Technology",
    description: "We harness the power of modern telemedicine and digital health tools to provide seamless, accessible care anytime, anywhere.",
    image: "/doctorscaring.jpg",
  },
  {
    title: "Holistic Healing",
    description: "Integrating traditional medicine with holistic individual practices to deliver comprehensive care that nourishes the body, mind, and spirit.",
    image: "/benefits_integrated_healing.png",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900 border-b border-slate-800">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/aboutushero.png"
            alt="About Us Hero"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/70 to-slate-900"></div>
        </div>

        {/* Glowing Orbs for the Hero background */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-1.5 text-sm font-medium text-sky-300 mb-8 backdrop-blur-sm self-center">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Discover the Health Link Difference
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mx-auto max-w-4xl mb-6 leading-tight">
            Pioneering the Future of <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Digital Healthcare</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl leading-8 text-slate-300 font-light">
            Health Link was founded on the belief that quality healthcare should be universally accessible, deeply empathetic, and seamlessly integrated into every individual's life. We are on a mission to reshape the medical and wellness landscape.
          </p>
        </div>
      </section>

      {/* Our Story / Mission Section */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] bg-sky-50 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px] opacity-60"></div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Story Image Area - Beautiful Presentation of Logo */}
            <div className="relative order-2 lg:order-1 perspective-1000">
              {/* Abstract structural shapes */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-sky-100 to-indigo-50 rounded-[40px] transform -rotate-3 border border-sky-200/50 shadow-inner"></div>
              <div className="absolute -inset-2 bg-slate-50/50 rounded-[35px] transform rotate-2 backdrop-blur-sm border border-white"></div>
              
              <div className="relative rounded-3xl bg-white shadow-2xl shadow-slate-200/50 p-8 sm:p-16 border border-slate-100/80 flex aspect-square items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-slate-50/20 z-0"></div>
                <Image
                  src="/logo.png"
                  alt="Health Link Logo"
                  width={340}
                  height={340}
                  className="object-contain drop-shadow-2xl opacity-90 mix-blend-multiply transform transition-all duration-700 group-hover:scale-105 z-10"
                />
              </div>
            </div>

            {/* Story Text Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-base font-semibold leading-7 tracking-wide uppercase text-sky-600">Our Story</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3rem] leading-none mb-6">
                Connecting you to care that feels <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">like home.</span>
              </p>
              
              <div className="space-y-6 text-lg leading-8 text-slate-600 font-light">
                <p>
                  It started with a simple, unifying vision: to eliminate the logistical and geographic barriers communicating between patients and high-quality, compassionate care. Years ago, we recognized a significant gap in the healthcare system — an alarming lack of personalization and technological accessibility.
                </p>
                <p>
                  Today, Health Link stands as a premier digital platform offering an array of comprehensive, inter-connected services from primary Telemedicine and Clinical Psychology to specialized Spiritual Care. Our network of vetted, experienced professionals is absolutely dedicated to fostering a healthier, more connected world.
                </p>
              </div>

              {/* Stats / Numbers representation */}
              <div className="mt-12 flex gap-4 sm:gap-6">
                <div className="flex-1 bg-gradient-to-br from-sky-50 flex flex-col justify-center items-center to-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm group transition-all duration-300 hover:shadow-md hover:border-sky-200 hover:-translate-y-1">
                  <div className="text-4xl sm:text-5xl font-black text-sky-600 tracking-tight transition-transform duration-500 group-hover:scale-110">10k+</div>
                  <div className="mt-3 text-sm font-semibold text-sky-900/70 border-t border-sky-100 pt-3 text-center w-full">Patients Served</div>
                </div>
                <div className="flex-1 bg-gradient-to-br from-indigo-50 flex flex-col justify-center items-center to-white rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-sm group transition-all duration-300 hover:shadow-md hover:border-indigo-200 hover:-translate-y-1">
                  <div className="text-4xl sm:text-5xl font-black text-indigo-600 tracking-tight transition-transform duration-500 group-hover:scale-110">99%</div>
                  <div className="mt-3 text-sm font-semibold text-indigo-900/70 border-t border-indigo-100 pt-3 text-center w-full">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / Pillars Section */}
      <section className="py-24 sm:py-32 bg-slate-50 relative border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-2xl text-center mb-16 px-4">
            <h2 className="text-base font-semibold leading-7 tracking-wide uppercase text-indigo-600">Our Core Pillars</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mb-6">
              What drives our mission
            </p>
            <p className="text-lg leading-8 text-slate-600 font-light max-w-xl mx-auto">
              We stand by fundamental pillars, ensuring every interaction via Health Link enriches your journey towards optimal health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {values.map((value, idx) => (
              <div key={idx} className="group relative bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 border border-slate-100/60 overflow-hidden flex flex-col">
                {/* Decorative top border highlight */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                
                <div className="relative mb-8 h-56 w-full overflow-hidden rounded-2xl bg-slate-100">
                  <div className="absolute inset-0 bg-slate-900/5 z-10 rounded-2xl mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0"></div>
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-cover transform transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Subtle inner shadow overlay */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl z-20 pointer-events-none"></div>
                </div>
                
                <div className="flex-1 flex flex-col relative z-20">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-light">
                    {value.description}
                  </p>
                </div>
                
                {/* Visual subtle cue in bottom right */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-sky-50 to-indigo-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}

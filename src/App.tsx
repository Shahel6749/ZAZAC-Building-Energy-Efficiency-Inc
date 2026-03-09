import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PhoneCall,
  MapPin,
  Mail,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Clock,
  Wrench,
  Snowflake,
  Wind,
  ThermometerSnowflake,
  BadgeCheck,
  Star,
  ArrowRight,
  Leaf,
  Calendar,
  User,
  BookOpen,
  Facebook,
  Instagram
} from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide navbar when within the hero (top 80px), show it after
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneDisplay = "403-926-2549";
  const phoneTel = "tel:4039262549";
  const email = "sebastien@zazac.ca";
  const address = "1430 22 Ave NW, Calgary, AB T2M 1P8";

  const submitContactForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Explicitly structure the payload for perfectly clean mapping in Make.com & Google Sheets
    const payload = {
      first_name: formData.get("firstName")?.toString() || "",
      last_name: formData.get("lastName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      service_type: formData.get("serviceType")?.toString() || "",
      service_address: formData.get("serviceAddress")?.toString() || "",
      message: formData.get("message")?.toString() || "",
      timestamp: new Date().toISOString(),
      source: "ZAZAC Website Request"
    };

    try {
      await fetch("https://hook.us2.make.com/g7pm3to1oqhhs2odpnj1iopber1lqg2r", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      alert("Message sent successfully! We'll be in touch shortly.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      alert("Thanks for reaching out! We'll contact you soon.");
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="relative font-sans text-ink bg-slate-50 overflow-hidden">
      {/* 1. Skip Link */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white p-4 z-50 rounded-md">
        Skip to main content
      </a>

      {/* 2. Navigation - Scroll-Aware */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: scrolled ? 0 : -100,
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? 'auto' : 'none',
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 h-20 sm:h-24 flex items-center justify-between">
          <a href="#main" className="flex-shrink-0" aria-label="ZAZAC Homepage">
            <img src="/zazac-logo.png" alt="ZAZAC Building Energy Efficiency Inc." loading="eager" className="h-12 sm:h-16 lg:h-[4.5rem] w-auto object-contain" />
          </a>

          <nav aria-label="Main navigation" className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#services" className="hover:text-primary transition-colors py-2">Services</a>
            <a href="#about" className="hover:text-primary transition-colors py-2">About</a>
            <a href="#reviews" className="hover:text-primary transition-colors py-2">Reviews</a>
            <a href="#contact" className="hover:text-primary transition-colors py-2">Contact</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="text-right leading-tight">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">24/7 Emergency</div>
              <a href={phoneTel} className="font-display font-bold text-xl text-primary hover:text-primary-dark transition-colors">
                {phoneDisplay}
              </a>
            </div>
            <a href="#contact" className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-[0_10px_20px_rgba(29,116,180,0.3)] transition-all transform hover:-translate-y-1 group flex items-center gap-2">
              Book Now <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <button
            className="md:hidden p-2 text-dark bg-slate-100 rounded-md active:bg-slate-200 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200/50 overflow-hidden shadow-xl"
            >
              <div className="flex flex-col p-4 gap-4 pb-6">
                <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-lg border-b border-slate-100 pb-2">Services</a>
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-lg border-b border-slate-100 pb-2">About</a>
                <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-lg border-b border-slate-100 pb-2">Reviews</a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-lg border-b border-slate-100 pb-2">Contact</a>
                <a href={phoneTel} className="bg-slate-100 text-center py-3 rounded-md font-bold text-primary mt-2 flex justify-center items-center gap-2">
                  <PhoneCall size={18} /> {phoneDisplay}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main id="main">
        {/* 3. Hero (Ultra-Premium Aesthetic with 3D Touches) */}
        <section className="relative min-h-[90vh] flex items-center pt-24 pb-24 overflow-hidden [perspective:1200px] bg-slate-900">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2000&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
          </div>

          {/* Glowing Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/50 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
          />

          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[1.2fr,1fr] gap-12 items-center relative z-10 w-full">

            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sky-200 font-medium text-sm mb-8 shadow-[0_0_20px_rgba(29,116,180,0.3)]"
              >
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse shadow-[0_0_10px_#60a5fa]" />
                <span className="tracking-wide uppercase">24/7 Calgary Emergency Repair</span>
                <span className="bg-white/10 h-4 w-[1px] mx-1"></span>
                <span className="text-white/70 hidden sm:inline">Top Rated Since 2017</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl lg:text-7xl font-display font-black leading-[1.05] tracking-tight mb-6 text-white"
              >
                Engineered for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-primary drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">Maximum Energy</span> <br />
                Efficiency.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg lg:text-xl text-slate-300 mb-10 leading-relaxed font-light"
              >
                Industrial-grade HVAC and refrigeration solutions designed to keep Calgary businesses completely chill and homes perfectly tight.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-5"
              >
                <a href="#contact" className="group relative inline-flex justify-center items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-primary-dark hover:to-blue-700 transition-all shadow-[0_0_30px_rgba(29,116,180,0.4)] overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-2">Request Service <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
                </a>
                <a href={phoneTel} className="inline-flex justify-center items-center gap-3 bg-white/5 border border-white/20 backdrop-blur-md text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 hover:border-white/30 transition-all">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <PhoneCall size={18} className="text-sky-400" />
                  </div>
                  {phoneDisplay}
                </a>
              </motion.div>
            </div>

            {/* 3D Floating Isometric Interface */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="relative hidden lg:block transform-gpu [transform-style:preserve-3d]"
              style={{
                transform: "rotateX(15deg) rotateY(-15deg)",
              }}
            >
              {/* Main Glass Card */}
              <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative bg-slate-800/40 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10 flex flex-col justify-center items-center text-center overflow-hidden"
                style={{ transform: "translateZ(50px)" }}
              >
                {/* Glossy reflection highlight */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent transform -skew-y-12 -translate-y-10" />

                <div className="w-24 h-24 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-[0_0_30px_rgba(56,189,248,0.5)] transform -rotate-3 hover:rotate-0 transition-transform">
                  <Snowflake size={40} strokeWidth={2} />
                </div>
                <h3 className="font-display font-bold text-3xl mb-2 text-white">Commercial Cooling</h3>
                <p className="text-sky-200">Zero downtime refrigeration for high-paced Calgary kitchens.</p>
              </motion.div>

              {/* Floating review badge */}
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute -top-10 -right-10 bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-700 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center gap-5 z-20"
                style={{ transform: "translateZ(100px)" }}
              >
                <div className="flex -space-x-3">
                  {[...Array(3)].map((_, i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i + 11}`} alt="Customer" className={`w-12 h-12 rounded-full border-2 border-slate-800 object-cover`} style={{ zIndex: 3 - i }} />
                  ))}
                </div>
                <div>
                  <div className="flex text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="font-bold text-sm text-white">120+ Five-Star</p>
                  <p className="text-xs text-sky-300">Google Reviews</p>
                </div>
              </motion.div>

              {/* Floating rapid response badge */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 -left-16 bg-gradient-to-r from-blue-600 to-primary p-5 rounded-2xl shadow-[0_20px_40px_rgba(29,116,180,0.5)] flex items-center gap-4 z-20 text-white"
                style={{ transform: "translateZ(80px)" }}
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-inner">
                  <Clock size={28} />
                </div>
                <div>
                  <p className="font-display font-bold text-xl leading-tight">1 Hour</p>
                  <p className="text-sm text-sky-100 font-medium tracking-wide">Emergency Response</p>
                </div>
              </motion.div>

              {/* Blueprint Decorative Layer */}
              <div
                className="absolute inset-0 border border-sky-400/20 rounded-3xl z-0"
                style={{ transform: "translateZ(-30px) scale(0.95)" }}
              >
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-md" />
              </div>
            </motion.div>

          </div>
        </section>

        {/* 4. Trust Bar */}
        <section className="bg-white border-y border-slate-200 py-8 relative z-20">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-6 md:gap-4 opacity-80 font-semibold text-slate-600">
            <div className="flex items-center gap-2"><ShieldCheck className="text-primary" size={24} /> Licensed & Insured</div>
            <div className="flex items-center gap-2"><Clock className="text-primary" size={24} /> 24/7 Availability</div>
            <div className="flex items-center gap-2"><Star className="text-primary" fill="currentColor" size={24} /> 120+ 5-Star Reviews</div>
            <div className="flex items-center gap-2"><BadgeCheck className="text-primary" size={24} /> Transparent Pricing</div>
            <div className="flex items-center gap-2"><ThermometerSnowflake className="text-primary" size={24} /> All HVAC Makes</div>
          </div>
        </section>

        {/* 5. Services - PRO MAX UPGRADE */}
        <section id="services" className="py-32 bg-slate-50 relative overflow-hidden [perspective:2000px]">
          {/* Subtle architectural background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          {/* Ambient Lighting & Background Geometry */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-[100%] blur-[120px] pointer-events-none mix-blend-multiply opacity-60"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-400/5 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-20 transform-gpu"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-slate-200 text-primary font-bold tracking-widest uppercase text-xs mb-6 shadow-sm">
                Our Expertise
              </div>
              <h3 className="font-display text-5xl md:text-6xl font-black text-dark mb-6 tracking-tight leading-[1.1]">
                Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">Climate solutions</span>
              </h3>
              <p className="text-slate-600 text-xl font-light leading-relaxed">Whether it's a scorching summer day or a bitter Calgary winter, we have the tools and experience to keep you comfortable.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Air Conditioning",
                  icon: <Snowflake size={32} className="text-white drop-shadow-md" />,
                  desc: "Installation, repair, and maintenance of all AC systems to keep you chill.",
                  bullets: ["Rapid Repairs", "New Installations", "Annual Tune-ups", "Freon Recharging"]
                },
                {
                  title: "Commercial Refrigeration",
                  icon: <ThermometerSnowflake size={32} className="text-white drop-shadow-md" />,
                  desc: "Specialized service for restaurants and businesses. Walk-in coolers & freezers.",
                  bullets: ["Walk-in Coolers", "Display Fridges", "Emergency Service", "Preventative Care"]
                },
                {
                  title: "Furnace & Heating",
                  icon: <Wrench size={32} className="text-white drop-shadow-md" />,
                  desc: "Don't get left in the cold. Complete furnace diagnostics and rapid repair.",
                  bullets: ["Furnace Repair", "No-Heat Emergencies", "Thermostat Setup", "Boiler Service"]
                },
                {
                  title: "Ventilation & Air",
                  icon: <Wind size={32} className="text-white drop-shadow-md" />,
                  desc: "Make-up air units, exhaust systems, and indoor quality improvements.",
                  bullets: ["Make-up Air Units", "Duct Servicing", "Exhaust Fans", "Air Purification"]
                }
              ].map((service, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{
                    scale: 1.05,
                    translateZ: 50,
                    rotateX: idx % 2 === 0 ? 5 : -5,
                    rotateY: idx < 2 ? -5 : 5
                  }}
                  className="relative p-[1px] rounded-[2rem] group cursor-default transform-gpu h-full"
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <a href="#contact" className="relative bg-white/80 backdrop-blur-xl p-8 rounded-[31px] h-full flex flex-col border border-slate-200 shadow-[0_15px_30px_rgba(0,0,0,0.04)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.08),0_0_40px_rgba(29,116,180,0.1)] transition-shadow duration-500 overflow-hidden block">

                    {/* Hover Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_forwards] pointer-events-none"></div>

                    {/* Massive background watermark icon */}
                    <div className="absolute -bottom-10 -right-10 text-slate-100 opacity-[0.4] group-hover:opacity-[0.8] group-hover:text-primary/5 transition-colors duration-500 transform-gpu rotate-12 scale-[3] pointer-events-none z-0">
                      {service.icon}
                    </div>

                    <div className="w-16 h-16 rounded-[1.2rem] bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center mb-8 relative z-10 shadow-[0_10px_20px_rgba(29,116,180,0.3)] border border-white/20" style={{ transform: "translateZ(30px)" }}>
                      {service.icon}
                    </div>

                    <h4 className="font-display font-bold text-2xl mb-3 text-dark relative z-10 tracking-tight" style={{ transform: "translateZ(25px)" }}>{service.title}</h4>
                    <p className="text-slate-600 mb-8 relative z-10 flex-grow font-light leading-relaxed" style={{ transform: "translateZ(20px)" }}>{service.desc}</p>

                    <ul className="space-y-3 relative z-10 border-t border-slate-100 pt-6 mb-8" style={{ transform: "translateZ(35px)" }}>
                      {service.bullets.map((b, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-700 font-semibold group/li">
                          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center group-hover/li:bg-sky-100 group-hover/li:text-sky-500 transition-colors border border-slate-200 group-hover/li:border-sky-300">
                            <ArrowRight size={10} className="text-primary group-hover/li:translate-x-0.5 transition-transform" />
                          </div>
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Call to action button */}
                    <div className="mt-auto relative z-10 flex items-center justify-between bg-slate-50 border border-slate-100 rounded-2xl p-4 group-hover:bg-primary group-hover:border-primary transition-colors duration-500 shadow-sm" style={{ transform: "translateZ(45px)" }}>
                      <span className="font-bold text-slate-700 group-hover:text-white transition-colors duration-500 text-sm tracking-wide">Book Service</span>
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        <ArrowRight size={14} className="text-primary group-hover:-rotate-45 transition-transform duration-500" />
                      </div>
                    </div>

                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. How We Work */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">Simple Process</h2>
                <h3 className="font-display text-4xl font-extrabold text-dark mb-6">How We Get Your System Running</h3>
                <p className="text-slate-600 text-lg mb-10 leading-relaxed">We respect your time and property. Our streamlined process ensures your HVAC or refrigeration issue is solved with zero hassle.</p>

                <div className="space-y-6 relative [perspective:1000px] mt-8">
                  {/* Glowing 3D Connecting Line */}
                  <div className="absolute left-[30px] top-10 bottom-10 w-1 bg-gradient-to-b from-primary/40 via-blue-500/20 to-transparent z-0 rounded-full shadow-[0_0_15px_rgba(29,116,180,0.5)]"></div>

                  {[
                    { title: "Reach Out", desc: "Call us anytime 24/7 or fill out our quick online form. We respond rapidly to emergencies." },
                    { title: "Expert Diagnosis", desc: "Our technicians arrive fully equipped to inspect, diagnose, and provide a clear, upfront quote on your outdoor or indoor unit." },
                    { title: "Precision Repair", desc: "We fix it right the first time using commercial-grade parts, then test the system to ensure maximum efficiency." }
                  ].map((step, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03, translateZ: 30, rotateX: 5, rotateY: -5 }}
                      className="relative z-10 flex gap-5 bg-white p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-slate-100 group cursor-default"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.04] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Interactive 3D Number Block */}
                      <div
                        className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center font-display font-black text-2xl shadow-[0_15px_30px_rgba(29,116,180,0.4)] relative overflow-hidden group-hover:shadow-[0_20px_40px_rgba(29,116,180,0.6)] transition-all duration-300"
                        style={{ transform: "translateZ(20px)" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_forwards]"></div>
                        {idx + 1}
                      </div>

                      {/* Text content lifted in Z-space */}
                      <div className="relative pt-1" style={{ transform: "translateZ(15px)" }}>
                        <h4 className="font-display font-bold text-xl mb-2 text-slate-800 group-hover:text-primary transition-colors tracking-tight">{step.title}</h4>
                        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative hidden lg:block [perspective:1500px]"
              >
                {/* Decorative background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                <div className="relative h-[550px] w-[115%] -ml-[5%] mt-12 transform-gpu" style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}>

                  {/* Backdrop shadow plate for immense depth */}
                  <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-[60px] translate-y-10 translate-x-10 -z-20 mix-blend-multiply"></div>
                  <div className="absolute inset-0 bg-slate-400/30 rounded-[2.5rem] blur-[40px] translate-y-20 -z-10 mix-blend-multiply flex items-center justify-center"></div>

                  {/* Main Image Plate - 3D Hover & Shimmer Frame */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.25)] bg-white p-2 overflow-visible z-10 group"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                      <img
                        src="https://comfortzoneofnf.com/wp-content/smush-webp/2024/04/Cover_Comfort-Zone-25-scaled.jpg.webp"
                        alt="Professional HVAC technician repairing an outdoor air conditioning condenser unit"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[2000ms] ease-out brightness-105 contrast-105"
                      />
                      {/* Subtle aesthetic tint */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#1d74b4]/30 via-transparent to-transparent mix-blend-multiply opacity-60"></div>

                      {/* Interactive light reflection sweep on the image */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_forwards] pointer-events-none"></div>
                    </div>
                  </motion.div>

                  {/* Floating Element 1 - Bottom Left */}
                  <motion.div
                    animate={{ y: [15, -15, 15] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-10 -left-16 bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-[0_30px_60px_rgba(29,116,180,0.25)] flex items-center gap-5 z-20 border border-white/50"
                    style={{ transform: "translateZ(100px)" }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(29,116,180,0.3)] border border-white/20">
                      <Wrench size={32} className="text-white drop-shadow-md" />
                    </div>
                    <div>
                      <p className="font-display font-black text-3xl text-slate-800 tracking-tight">Expert</p>
                      <p className="text-sm text-primary font-bold tracking-wide uppercase">HVAC Repairs</p>
                    </div>
                  </motion.div>

                  {/* Floating Element 2 - Top Right */}
                  <motion.div
                    animate={{ y: [-8, 8, -8] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2.5 }}
                    className="absolute top-10 -right-12 bg-[#0f172a]/95 backdrop-blur-xl p-5 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center z-20 border border-slate-700 w-36"
                    style={{ transform: "translateZ(120px)" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-3xl pointer-events-none"></div>
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white mb-3 shadow-[0_0_20px_rgba(52,211,153,0.5)] relative z-10 border border-white/20">
                      <ShieldCheck size={28} className="drop-shadow-md" />
                    </div>
                    <p className="font-display font-bold text-[1.1rem] text-white relative z-10 text-center leading-tight mb-1 tracking-tight">Guaranteed</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center relative z-10">Performance</p>
                  </motion.div>

                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 7. About */}
        {/* 7. About - PRO MAX AESTHETIC UPGRADE */}
        <section id="about" className="py-24 bg-[#0a0f18] text-white relative overflow-hidden">
          {/* Massive Watermark Typography */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden pointer-events-none z-0 select-none opacity-40 mix-blend-screen isolate text-center">
            <h2 className="text-[12rem] md:text-[20rem] font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white/5 to-transparent leading-none tracking-tighter w-full">
              EXPERTISE
            </h2>
          </div>

          {/* Ambient Volumetric Lighting */}
          <div className="absolute top-0 right-[-10%] w-[50%] h-[600px] bg-primary/20 rounded-full blur-[150px] -z-0 mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[400px] bg-sky-600/10 rounded-full blur-[120px] -z-0 mix-blend-screen pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 z-10 relative">
            <div className="grid lg:grid-cols-[1fr,1.1fr] gap-16 lg:gap-24 items-center">

              {/* Advanced 3D Bento Box Floating Layout */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="order-2 lg:order-1 relative [perspective:1500px] w-full max-w-lg mx-auto"
              >
                <div
                  className="grid grid-cols-2 gap-4 transform-gpu"
                  style={{ transform: "rotateX(8deg) rotateY(12deg) translateZ(0)" }}
                >
                  {/* Tall Full-height Card (Founder/Experience) */}
                  <motion.div
                    whileHover={{ scale: 1.02, translateZ: 30 }}
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ y: { repeat: Infinity, duration: 8, ease: "easeInOut" } }}
                    className="col-span-1 row-span-2 relative bg-gradient-to-b from-[#141d2e] to-[#0d1421] p-6 rounded-3xl border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.6)] group overflow-hidden flex flex-col justify-between"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-sky-400/10 to-transparent"></div>
                    <div>
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(29,116,180,0.4)]">
                        <BadgeCheck size={28} className="text-white" />
                      </div>
                      <h4 className="font-display font-black text-5xl text-white mb-2 tracking-tight drop-shadow-lg">15+</h4>
                      <p className="text-slate-400 font-medium text-sm leading-snug">Years Combined Experience</p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                      <p className="text-xs text-sky-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                        Founder
                      </p>
                      <h5 className="font-display text-white font-bold text-xl mb-1">Sebastien ZAZAC</h5>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">Paris & Calgary<br />Industry Expert</p>
                    </div>
                  </motion.div>

                  {/* Top Right Card (C.E.T) */}
                  <motion.div
                    whileHover={{ scale: 1.05, translateZ: 40 }}
                    animate={{ y: [4, -4, 4] }}
                    transition={{ y: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
                    className="col-span-1 relative bg-slate-800/40 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] group overflow-hidden flex flex-col justify-center"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_forwards] pointer-events-none"></div>
                    <h4 className="font-display font-black text-3xl text-white mb-2 group-hover:text-primary-300 transition-colors drop-shadow-md">C.E.T.</h4>
                    <p className="text-slate-400 font-medium text-xs leading-snug">Certified French Engineering Tech</p>
                  </motion.div>

                  {/* Bottom Right Card (Red Seal) */}
                  <motion.div
                    whileHover={{ scale: 1.05, translateZ: 40 }}
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 } }}
                    className="col-span-1 relative bg-slate-800/40 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] group overflow-hidden flex flex-col justify-center"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_forwards] pointer-events-none"></div>
                    <h4 className="font-display font-black text-3xl text-white mb-2 group-hover:text-primary-300 transition-colors drop-shadow-md">Red Seal</h4>
                    <p className="text-slate-400 font-medium text-xs leading-snug">Certified Canadian Journeyman</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Side Info */}
              <div className="order-1 lg:order-2 space-y-8 relative z-10">
                <div>
                  <h2 className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-sky-300 font-bold tracking-widest uppercase text-xs mb-6 shadow-[0_0_15px_rgba(29,116,180,0.3)]">
                    About ZAZAC
                  </h2>
                  <h3 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
                    Built on Trust,<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-primary drop-shadow-[0_0_20px_rgba(56,189,248,0.2)]">Fueled by Expertise.</span>
                  </h3>
                </div>

                <div className="space-y-5 text-slate-300 text-lg leading-relaxed font-light border-l-2 border-primary/30 pl-6">
                  <p>
                    ZAZAC Building Energy Efficiency Inc. is a specialized Calgary service company explicitly focused on the highest standard of <span className="text-white font-semibold tracking-wide">HVAC/R (Heating, Ventilation, Air Conditioning and Refrigeration)</span> maintenance and installation.
                  </p>
                  <p>
                    We are the ideal partner for managers and owners wishing to radically increase the profitability of their buildings by setting up proven energy accountability strategies.
                  </p>
                </div>

                {/* Cyberpunk style animated border card */}
                <div className="relative p-[1px] rounded-2xl overflow-hidden group shadow-2xl">
                  {/* Rotating gradient border pseudo-element (simulated with opacity) */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-sky-300 to-blue-600 rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500 animate-[shimmer_4s_infinite_linear] bg-[length:200%_auto]"></div>

                  <div className="relative bg-[#0a0f18] rounded-2xl p-6 lg:p-8 h-full backdrop-blur-xl border border-transparent">
                    <h4 className="text-white font-display font-medium text-xl mb-6 flex items-center gap-3">
                      <ShieldCheck className="text-sky-400" size={24} /> Our Ironclad Commitment:
                    </h4>
                    <ul className="space-y-4">
                      {[
                        "Eliminating energy waste completely.",
                        "Increasing the energy performance of your equipment.",
                        "Reducing operation costs & increasing system life expectancy.",
                        "Achieving all this without sacrificing your comfort."
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div className="relative mt-1.5 flex items-center justify-center shrink-0">
                            <div className="w-2 h-2 rounded-full bg-sky-400 z-10"></div>
                            <div className="absolute w-4 h-4 rounded-full bg-sky-400/30 animate-ping"></div>
                          </div>
                          <span className="text-slate-300 font-medium text-base leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="inline-flex items-center gap-5 p-4 rounded-xl relative overflow-hidden group border border-white/5 bg-white/5 backdrop-blur-sm cursor-default hover:bg-white/10 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-10 h-10 rounded-full bg-green-400/10 flex items-center justify-center relative z-10 group-hover:bg-green-400/20 transition-colors">
                    <Leaf className="text-green-400" size={20} />
                  </div>
                  <div className="h-10 w-px bg-white/20 relative z-10"></div>
                  <span className="font-display font-bold text-xl text-white tracking-wide relative z-10">
                    Going <span className="text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.4)] drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">Green</span> is a Given.
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 8. Reviews - PRO MAX UPGRADE (Light Mode Variant) */}
        <section id="reviews" className="py-32 bg-slate-50 relative overflow-hidden [perspective:2000px]">
          {/* Volumetric ambient backgrounds for Light Theme */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 rounded-[100%] blur-[120px] pointer-events-none mix-blend-multiply opacity-50"></div>
          <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-20 transform-gpu"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="inline-flex items-center gap-2 mb-8 bg-amber-50 border border-amber-200/50 px-5 py-2 rounded-full shadow-sm">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
                </div>
                <span className="text-amber-600 font-bold text-sm tracking-widest uppercase ml-2">5.0 Star Rated on Google</span>
              </div>
              <h3 className="font-display text-5xl md:text-6xl font-black text-dark mb-6 tracking-tight leading-[1.1]">
                What Calgary Says
              </h3>
              <p className="text-slate-600 text-xl font-light leading-relaxed">Join over 120+ local businesses and homeowners who trust ZAZAC for their most critical HVAC/R needs.</p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8">
              {[
                {
                  name: "Uttamdeep Kaur",
                  time: "3 weeks ago",
                  text: "After years of struggle and millions of excuses from different guys we finally Got zazac to look at our cooler. They fixed our problem within one hour ! World champion Highly recommend"
                },
                {
                  name: "Arsh Hari",
                  time: "3 weeks ago",
                  text: "Hii there today I met this amazing guys regarding my store walkin cooler in subway the guys are the best service around the whole calgary recomdent them"
                },
                {
                  name: "SS106 Aperitivo Bar",
                  time: "11 months ago",
                  text: "Zazac is the best when it comes to refrigeration repairs. The respond right away and always helps us when we need. Alex & Sebastian are professional, clean and very knowledgable."
                },
                {
                  name: "Kathryn Aghakhani",
                  time: "2 years ago",
                  badge: "Little Caesars Owners",
                  text: "Great experience. Zazac was fast, knowledgeable, and thorough, which is amazing given this was a very early morning emergency call. Highly recommended. We are Little Caesars owners and having a dependable technician, who is prompt and … More"
                },
                {
                  name: "Ervin Bushi",
                  time: "2 years ago",
                  badge: "Local Guide",
                  text: "Been using Zazac for 10 years. Hands down, the best! Amazing company! Fast, efficient service: they show up when you need them, every time! Reasonable pricing & quality work! Wouldn't trust anybody else!"
                }
              ].map((review, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{
                    scale: 1.05,
                    translateZ: 60,
                    rotateX: idx % 2 === 0 ? 3 : -3,
                    rotateY: idx % 3 === 0 ? -3 : 3
                  }}
                  className={`relative p-[1px] rounded-3xl group cursor-default transform-gpu ${idx < 3 ? 'w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)]' : 'w-full md:w-[calc(50%-1rem)] lg:w-[calc(45%-1rem)]'}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative bg-white/90 backdrop-blur-2xl p-8 rounded-[23px] h-full flex flex-col border border-slate-200 shadow-[0_15px_30px_rgba(0,0,0,0.03)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.08),0_0_30px_rgba(29,116,180,0.1)] transition-shadow duration-500 overflow-hidden">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_forwards] pointer-events-none"></div>

                    {/* Massive quote mark watermark */}
                    <div className="absolute -top-6 -right-2 text-[12rem] font-serif font-black text-slate-100 leading-none pointer-events-none group-hover:text-primary/[0.05] transition-colors duration-500 transform-gpu rotate-12">"</div>

                    <div className="flex gap-1 mb-6 relative z-10" style={{ transform: "translateZ(20px)" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className="text-amber-400 drop-shadow-sm" fill="currentColor" />
                      ))}
                    </div>

                    <p className="text-slate-600 font-medium text-lg leading-relaxed mb-10 relative z-10 flex-grow" style={{ transform: "translateZ(30px)" }}>"{review.text}"</p>

                    <div className="relative z-10 border-t border-slate-100 pt-6 mt-auto flex items-center justify-between" style={{ transform: "translateZ(25px)" }}>
                      <div>
                        <h4 className="font-display font-bold text-dark tracking-wide text-[1.1rem] mb-1">{review.name}</h4>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{review.badge || "Verified Customer"}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-bold bg-slate-50 px-3 py-1.5 rounded-full whitespace-nowrap border border-slate-100">{review.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 text-center relative z-20"
            >
              <a href="https://maps.app.goo.gl/r6Hn1p7WezYk1" target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm px-10 py-5 rounded-full font-bold text-dark transition-all transform hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.06),0_0_20px_rgba(29,116,180,0.1)] group">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-6 h-6 transition-all" />
                <span className="text-lg tracking-wide">Read all 120+ reviews on Google</span>
                <ArrowRight size={20} className="text-primary group-hover:translate-x-2 group-hover:scale-110 transition-transform" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* 9. CTA Banner - PRO MAX UPGRADE */}
        <section className="relative py-32 px-4 overflow-hidden [perspective:2000px]">
          {/* Deep dark gradient background */}
          <div className="absolute inset-0 bg-slate-950"></div>

          {/* Ambient glowing radial flares */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-70"></div>
          <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

          {/* Grid Pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_100%,transparent_100%)]"></div>

          <div className="relative z-10 max-w-5xl mx-auto flex items-center justify-center transform-gpu">

            {/* 3D Glassmorphic Action Panel */}
            <motion.div
              initial={{ opacity: 0, rotateX: 10, y: 50 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full rounded-[2.5rem] bg-slate-900/60 backdrop-blur-3xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] p-10 md:p-16 text-center transform-gpu overflow-hidden group"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Internal glowing shimmer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_forwards] pointer-events-none"></div>

              {/* Pulsing Emergency Indicator */}
              <div className="inline-flex items-center gap-3 mb-8 bg-red-500/10 border border-red-500/20 px-5 py-2 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.2)] relative" style={{ transform: "translateZ(40px)" }}>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,1)]"></span>
                </span>
                <span className="text-red-400 font-bold text-sm tracking-widest uppercase">24/7 Priority Dispatch</span>
              </div>

              <motion.h2
                className="font-display font-black text-5xl md:text-6xl text-white mb-6 tracking-tight leading-[1.1] drop-shadow-xl"
                style={{ transform: "translateZ(50px)" }}
              >
                HVAC or Refrigeration <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300 drop-shadow-[0_0_15px_rgba(248,113,113,0.3)]">Emergency?</span>
              </motion.h2>

              <motion.p
                className="text-slate-300 text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10"
                style={{ transform: "translateZ(30px)" }}
              >
                Don't wait for business hours. We provide rapid-response solutions across Calgary to protect your property and inventory.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row justify-center items-center gap-6"
                style={{ transform: "translateZ(60px)" }}
              >
                <a href={phoneTel} className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-[1.1rem] hover:shadow-[0_15px_30px_rgba(29,116,180,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all hover:-translate-y-1 transform border border-transparent hover:border-white/20">
                  <PhoneCall size={20} className="animate-pulse" />
                  Call {phoneDisplay} Now
                </a>
                <a href="#contact" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-bold text-[1.1rem] transition-all hover:-translate-y-1 transform border border-white/10 backdrop-blur-md hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
                  Schedule Non-Emergency
                  <ArrowRight size={20} className="text-primary-300" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 10. Service Area - PRO MAX UPGRADE */}
        <section className="py-32 bg-slate-50 relative overflow-hidden [perspective:2000px]">
          {/* Subtle architectural background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none mix-blend-multiply"></div>

          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center lg:items-start relative z-10">

            {/* Left Column: Text & Tags */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-20"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-slate-200 text-primary font-bold tracking-widest uppercase text-xs mb-6 shadow-sm">
                Where We Serve
              </div>
              <h3 className="font-display text-5xl lg:text-6xl font-black text-dark mb-8 tracking-tight leading-[1.1]">
                Locals Serving <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">Calgary</span>
              </h3>

              <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-8 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.04)] mb-10 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 bg-gradient-to-b from-primary via-sky-400 to-transparent h-full"></div>
                <p className="text-slate-600 text-xl font-light leading-relaxed">
                  Based in NW Calgary, ZAZAC Building Energy Efficiency operates across the entire city and surrounding areas. We know local building codes, weather extremes, and regional climate challenges inside and out.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {["NW Calgary", "Downtown Calgary", "SW Calgary", "SE Calgary", "NE Calgary", "Airdrie", "Chestermere", "Okotoks"].map((area, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -5, rotateZ: Math.random() > 0.5 ? 2 : -2 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-sky-400 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center gap-2 bg-white text-slate-700 px-6 py-3 rounded-full text-sm font-bold border border-slate-200 shadow-sm group-hover:border-transparent group-hover:text-primary transition-colors cursor-default">
                      <MapPin size={16} className="text-primary group-hover:animate-bounce" />
                      {area}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: 3D Map Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02, transition: { duration: 0.5 } }}
              className="relative rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] border-8 border-white ring-1 ring-slate-200 transform-gpu h-[400px] lg:h-[480px] w-full lg:mt-[210px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Internal depth shadow */}
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.2)] pointer-events-none z-10 rounded-[2rem]"></div>

              {/* Glassmorphic Map Overlay (disappears on hover so user can interact) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent pointer-events-none z-10 opacity-100 transition-opacity duration-500 rounded-[2rem]"></div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2506.9457691844846!2d-114.09657432301192!3d51.07255114237675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5371655b9fcfd015%3A0xa7339604a2d9cd9c!2sZAZAC%20Building%20Energy%20Efficiency%20Inc.!5e0!3m2!1sen!2sbd!4v1773037756306!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location for ZAZAC"
                className="absolute inset-0 scale-[1.02]" // Slight scale to hide iframe borders
              ></iframe>
            </motion.div>
          </div>
        </section>

        {/* 11. FAQ & Insights (Blog) - PRO MAX UPGRADE */}
        <section className="py-32 bg-slate-100 relative overflow-hidden [perspective:2000px]">
          {/* Subtle architectural background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-20 transform-gpu"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-slate-200 text-primary font-bold tracking-widest uppercase text-xs mb-6 shadow-sm">
                Industry Insights
              </div>
              <h3 className="font-display text-5xl md:text-6xl font-black text-dark mb-6 tracking-tight leading-[1.1]">
                Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">Base</span>
              </h3>
              <p className="text-slate-600 text-xl font-light leading-relaxed">
                Stay informed with our latest tips, guides, and expert advice on keeping your systems running at peak efficiency.
              </p>
            </motion.div>

            {/* 3D Bento Grid for Insights */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Choosing the Best Air Conditioning Services in Calgary",
                  date: "Jan 12, 2023",
                  excerpt: "It can be overwhelming when looking at all of the options for air conditioning services in Calgary. There are many factors to consider when choosing the right service...",
                  author: "Cathie Dunklee-Donnell"
                },
                {
                  title: "Clean Ducts Will Help Your HVAC System be More Efficient",
                  date: "Nov 29, 2022",
                  excerpt: "It's important to have clean ducts so that your HVAC system can function more efficiently. Your HVAC will run night and day during a cold snap. Ducts are a crucial part...",
                  author: "Cathie Dunklee-Donnell"
                },
                {
                  title: "5 Ways to Help Your HVAC Run Smoothly During a Cold Snap",
                  date: "Nov 9, 2022",
                  excerpt: "Your HVAC system bears the brunt of the cold weather and runs almost continuously during a cold snap. It's no wonder that it seems to break down or quit after working...",
                  author: "Cathie Dunklee-Donnell"
                },
                {
                  title: "How to Get Your HVAC System Ready for the Fall",
                  date: "Sep 7, 2022",
                  excerpt: "The summer is ending and the nights are beginning to feel chilly. It's almost time to turn on the furnace and warm up your home. It's important to make sure that your...",
                  author: "Cathie Dunklee-Donnell"
                },
                {
                  title: "What You Should Know about Air Conditioning",
                  date: "Jul 15, 2022",
                  excerpt: "It's that time of year again! The sun is shining and Calgarians are feeling the heat! Do you find that your home or business is stuffy and uncomfortable? A good quality...",
                  author: "Cathie Dunklee-Donnell"
                },
                {
                  title: "What Should I Know About HVAC?",
                  date: "May 25, 2022",
                  excerpt: "What is HVAC? HVAC stands for Heating, Ventilation, and Air Conditioning. This system keeps you feeling warm during the long Calgary, AB winters and keeps you cool...",
                  author: "Cathie Dunklee-Donnell"
                }
              ].map((post, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{
                    scale: 1.03,
                    translateZ: 40,
                    rotateX: 2,
                    rotateY: idx % 2 === 0 ? -2 : 2
                  }}
                  className="group relative cursor-pointer transform-gpu [transform-style:preserve-3d] h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-500"></div>

                  <div className="relative bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] h-full flex flex-col border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.03)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.08),0_0_30px_rgba(29,116,180,0.1)] transition-all duration-500 overflow-hidden">

                    {/* Glossy corner highlight */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-bl from-white/80 to-transparent rounded-full rotate-45 transform-gpu pointer-events-none mix-blend-overlay opacity-50"></div>

                    {/* Background floating icon */}
                    <div className="absolute -right-6 bottom-16 text-slate-100 opacity-[0.3] group-hover:opacity-[0.6] group-hover:text-primary/5 transition-colors duration-500 scale-[2.5] transform-gpu -rotate-12 pointer-events-none">
                      <BookOpen size={48} />
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider relative z-10" style={{ transform: "translateZ(10px)" }}>
                      <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full text-primary shadow-sm border border-slate-200/50">
                        <Calendar size={12} /> {post.date}
                      </span>
                    </div>

                    <h4 className="font-display font-extrabold text-2xl text-dark mb-4 leading-tight group-hover:text-primary transition-colors duration-300 relative z-10" style={{ transform: "translateZ(20px)" }}>
                      {post.title}
                    </h4>

                    <p className="text-slate-600 font-light leading-relaxed mb-8 flex-grow relative z-10" style={{ transform: "translateZ(15px)" }}>
                      {post.excerpt}
                    </p>

                    {/* Footer / Author section */}
                    <div className="mt-auto pt-6 border-t border-slate-200/60 flex items-center justify-between relative z-10" style={{ transform: "translateZ(25px)" }}>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-200 to-blue-200 flex items-center justify-center text-primary border border-white shadow-sm">
                          <User size={14} />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{post.author}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-slate-400">
                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. Contact Section - PRO MAX UPGRADE */}
        <section id="contact" className="py-32 bg-dark relative overflow-hidden [perspective:2000px]">

          {/* Dynamic Mesh Web Background (Replacing the rigid grid) */}
          <div className="absolute inset-0 z-0">
            {/* Deep Volumetric Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] bg-primary/20 rounded-full blur-[150px] mix-blend-screen"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-sky-400/15 rounded-full blur-[150px] mix-blend-screen"></div>
            <div className="absolute top-[30%] right-[15%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"></div>

            {/* Elegant Tech Dot Pattern instead of heavy lines */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_2px,transparent_2px)] bg-[size:40px_40px] opacity-80 pointer-events-none"></div>

            {/* Floating Glass Accent Rings */}
            <div className="absolute top-[15%] left-[5%] w-64 h-64 border-[1px] border-white/5 rounded-full opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] border-[1px] border-white/5 rounded-full opacity-30 pointer-events-none"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 relative z-10">

            {/* Left Contact Info Text Box */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:pt-12 relative z-20"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sky-400 font-bold tracking-widest uppercase text-xs mb-6 shadow-sm backdrop-blur-md">
                Get In Touch
              </div>
              <h3 className="font-display text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight leading-[1.1]">
                Let's Fix The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-sky-300">Problem</span>
              </h3>
              <p className="text-slate-400 mb-12 text-xl font-light leading-relaxed">
                Reach out to the ZAZAC team today. Fill out the form or give us a call for immediate assistance across Calgary.
              </p>

              <div className="space-y-6">
                {[
                  { icon: <PhoneCall size={24} />, title: "Phone", content: phoneDisplay, link: phoneTel },
                  { icon: <Mail size={24} />, title: "Email", content: email, link: `mailto:${email}` },
                  { icon: <MapPin size={24} />, title: "Headquarters", content: address, link: `https://maps.google.com/?q=${encodeURIComponent(address)}` }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02, x: 10, backgroundColor: "rgba(255,255,255,0.1)" }}
                    className="flex gap-5 items-center bg-white/5 border border-white/10 p-6 rounded-[1.5rem] backdrop-blur-md transition-all group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-sky-400 border border-white/10 shadow-[inner_0_0_20px_rgba(255,255,255,0.05)] group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all transform-gpu">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-400 uppercase tracking-wider mb-1">{item.title}</h4>
                      {item.link !== "#" ? (
                        <a href={item.link} className="text-white hover:text-sky-300 transition-colors text-xl font-display font-bold">{item.content}</a>
                      ) : (
                        <p className="text-white text-lg font-light leading-relaxed">{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Form 3D Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ rotateY: -2, rotateX: 2, scale: 1.02 }}
              className="bg-slate-900/60 backdrop-blur-3xl p-10 md:p-14 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)] border border-white/10 mt-0 lg:mt-6 relative [transform-style:preserve-3d] transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-[2.5rem] pointer-events-none"></div>

              <h3 className="font-display text-3xl font-bold mb-8 text-white relative z-10" style={{ transform: "translateZ(30px)" }}>Request Service Form</h3>

              <form onSubmit={submitContactForm} className="space-y-5 relative z-10" style={{ transform: "translateZ(40px)" }}>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label htmlFor="firstName" className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">First Name</label>
                    <input type="text" id="firstName" name="firstName" required className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all text-white placeholder:text-slate-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" placeholder="John" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="lastName" className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Last Name</label>
                    <input type="text" id="lastName" name="lastName" required className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all text-white placeholder:text-slate-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" placeholder="Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                    <input type="email" id="email" name="email" required className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all text-white placeholder:text-slate-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Phone Number</label>
                    <input type="tel" id="phone" name="phone" required className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all text-white placeholder:text-slate-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" placeholder="(403) 555-0123" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="serviceType" className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Service Required</label>
                  <select id="serviceType" name="serviceType" required className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all text-white placeholder:text-slate-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] appearance-none cursor-pointer">
                    <option value="" disabled selected>Select a service...</option>
                    <option value="Commercial Refrigeration">Commercial Refrigeration / Coolers</option>
                    <option value="Air Conditioning">Air Conditioning Install / Repair</option>
                    <option value="Furnace / Heating">Furnace & Heating Systems</option>
                    <option value="Ventilation / Make-up Air">Ventilation & Make-up Air</option>
                    <option value="Emergency Support">Other / Emergency</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="serviceAddress" className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Service Address (Calgary & Area)</label>
                  <input type="text" id="serviceAddress" name="serviceAddress" required className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all text-white placeholder:text-slate-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" placeholder="Enter street address" />
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">How can we help?</label>
                  <textarea id="message" name="message" rows={4} required className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all text-white placeholder:text-slate-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] resize-none" placeholder="Describe the issue you're experiencing..."></textarea>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-primary to-blue-600 text-white py-5 rounded-xl font-bold text-lg hover:shadow-[0_15px_30px_rgba(29,116,180,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 mt-4 border border-transparent hover:border-white/20 group">
                  Send Request
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                    <ArrowRight size={16} className="text-white group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </span>
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      {/* 13. Footer - PRO MAX UPGRADE */}
      <footer role="contentinfo" className="bg-slate-950 text-slate-400 py-20 relative overflow-hidden border-t border-white/5">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-sky-400/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 relative z-10">

          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a href="#main" className="inline-block bg-white rounded-[1.2rem] mb-8 shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all transform hover:-translate-y-1 overflow-hidden group border border-slate-200">
              {/* Full white background container ensures the logo fills the bounding box perfectly without looking disjointed */}
              <div className="px-6 py-4 h-full flex justify-center items-center bg-white group-hover:bg-slate-50 transition-colors">
                <img src="/zazac-logo.png" alt="ZAZAC Logo" loading="lazy" className="h-[76px] w-auto object-contain" />
              </div>
            </a>
            <p className="text-slate-400 text-lg font-light mb-8 leading-relaxed pr-4">
              Calgary's trusted experts in heating, ventilation, air conditioning, and commercial refrigeration solutions.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=100068391416586#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_0_20px_rgba(24,119,242,0.4)] transition-all transform hover:-translate-y-1">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-orange-500 hover:via-pink-500 hover:to-purple-500 hover:border-transparent hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all transform hover:-translate-y-1">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Services Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 font-display text-lg tracking-wide">Services</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#services" className="hover:text-sky-300 hover:translate-x-1 transition-all inline-block">Commercial Refrigeration</a></li>
              <li><a href="#services" className="hover:text-sky-300 hover:translate-x-1 transition-all inline-block">Air Conditioning Repair</a></li>
              <li><a href="#services" className="hover:text-sky-300 hover:translate-x-1 transition-all inline-block">Furnace Installation</a></li>
              <li><a href="#services" className="hover:text-sky-300 hover:translate-x-1 transition-all inline-block">Ventilation Systems</a></li>
              <li><a href="#services" className="hover:text-sky-300 hover:translate-x-1 transition-all inline-block">24/7 HVAC Emergency</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 font-display text-lg tracking-wide">Company</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#about" className="hover:text-sky-300 hover:translate-x-1 transition-all inline-block">About Us</a></li>
              <li><a href="#reviews" className="hover:text-sky-300 hover:translate-x-1 transition-all inline-block">Customer Reviews</a></li>
              <li><a href="#contact" className="hover:text-sky-300 hover:translate-x-1 transition-all inline-block">Contact Us</a></li>
              <li><a href="#main" className="hover:text-sky-300 hover:translate-x-1 transition-all inline-block">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6 font-display text-lg tracking-wide">Contact</h4>
            <ul className="space-y-5 text-slate-400">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <MapPin size={18} className="text-sky-400" />
                </div>
                <span className="mt-1.5 leading-relaxed hover:text-white transition-colors cursor-pointer">{address}<br />Canada</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 group-hover:border-sky-400/50 transition-all">
                  <PhoneCall size={18} className="text-sky-400 group-hover:scale-110 transition-transform" />
                </div>
                <a href={phoneTel} className="hover:text-white transition-colors mt-0.5">{phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 group-hover:border-sky-400/50 transition-all">
                  <Mail size={18} className="text-sky-400 group-hover:scale-110 transition-transform" />
                </div>
                <a href={`mailto:${email}`} className="hover:text-white transition-colors mt-0.5">{email}</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/10 text-center text-sm text-slate-500 relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} ZAZAC Building Energy Efficiency Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#main" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#main" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

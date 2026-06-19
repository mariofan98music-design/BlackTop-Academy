import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { teachers, students } from "../data";
import logoImg from "../../imports/IMG_8462.JPG";

const stats = [
  { label: "Teachers", value: "2" },
  { label: "Students", value: "16" },
  { label: "Boys", value: "9" },
  { label: "Girls", value: "8" },
  { label: "Girl Spot Open", value: "1" },
];

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY, currentTarget } = e as MouseEvent & { currentTarget: HTMLElement };
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((clientY - rect.top) / rect.height - 0.5) * 20;
      heroRef.current.style.setProperty("--tilt-x", `${y}deg`);
      heroRef.current.style.setProperty("--tilt-y", `${-x}deg`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(212,175,55,0.12) 0%, transparent 70%), #0a0a0a",
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Animated orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl animate-pulse"
          style={{ background: "#D4AF37" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-5 blur-3xl animate-pulse"
          style={{ background: "#D4AF37", animationDelay: "1.5s" }}
        />

        <div ref={heroRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <div
              className="mx-auto overflow-hidden rounded-2xl"
              style={{
                width: "clamp(260px, 55vw, 480px)",
                aspectRatio: "1 / 1",
                filter: "drop-shadow(0 0 40px rgba(212,175,55,0.35)) drop-shadow(0 8px 24px rgba(0,0,0,0.8))",
              }}
            >
              <img
                src={logoImg}
                alt="Blacktop Academy — New Chapter Same Hustle"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center bottom",
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="w-24 h-px mx-auto mb-8"
            style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(240,234,214,0.65)", fontFamily: "'Inter', sans-serif" }}
          >
            The premier streaming academy for the next generation of content creators.
            Learn, grow, and build your brand with elite mentorship and a community
            that pushes you to your peak.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/apply"
              className="px-10 py-4 text-sm tracking-widest font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: "0.2em",
                background: "linear-gradient(135deg, #D4AF37, #f0d060)",
                color: "#0a0a0a",
                borderRadius: "6px",
                boxShadow: "0 0 30px rgba(212,175,55,0.3)",
              }}
            >
              APPLY NOW
            </Link>
            <Link
              to="/teachers"
              className="px-10 py-4 text-sm tracking-widest transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: "0.2em",
                background: "transparent",
                color: "#D4AF37",
                border: "1px solid rgba(212,175,55,0.5)",
                borderRadius: "6px",
              }}
            >
              MEET THE TEAM
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span
            className="text-xs tracking-widest"
            style={{ color: "rgba(212,175,55,0.4)", fontFamily: "'Rajdhani', sans-serif" }}
          >
            SCROLL
          </span>
          <div className="w-px h-8 overflow-hidden" style={{ background: "rgba(212,175,55,0.2)" }}>
            <motion.div
              className="w-full h-full"
              style={{ background: "#D4AF37" }}
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: "#D4AF37", fontFamily: "'Rajdhani', sans-serif" }}
            >
              Academy Stats
            </p>
            <h2
              className="text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              By the Numbers
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center p-6 rounded-xl"
                style={{
                  background: "rgba(18,18,18,0.85)",
                  border: "1px solid rgba(212,175,55,0.15)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  className="mb-2"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #D4AF37, #f0d060)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "rgba(240,234,214,0.5)", fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: "#D4AF37", fontFamily: "'Rajdhani', sans-serif" }}
            >
              Our Mission
            </p>
            <h2
              className="mb-6 leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#f0ead6",
              }}
            >
              Where Creators
              <br />
              <span style={{ color: "#D4AF37" }}>Become Icons</span>
            </h2>
            <p
              className="leading-relaxed mb-6"
              style={{ color: "rgba(240,234,214,0.6)", fontFamily: "'Inter', sans-serif" }}
            >
              Blacktop Academy is more than a community — it's a full creative incubator.
              We pair raw talent with elite mentorship to produce streamers and content
              creators who don't just grow — they dominate.
            </p>
            <p
              className="leading-relaxed"
              style={{ color: "rgba(240,234,214,0.6)", fontFamily: "'Inter', sans-serif" }}
            >
              From strategy and branding to production quality and audience psychology,
              our curriculum covers everything you need to build a lasting presence
              in the creator economy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: "🎯", title: "Strategic Growth", desc: "Learn proven frameworks to grow your audience organically and consistently." },
              { icon: "🎥", title: "Production Quality", desc: "Elevate your stream with professional-grade production techniques." },
              { icon: "💼", title: "Brand Deals", desc: "Understand how to attract and negotiate partnerships that match your brand." },
              { icon: "🤝", title: "Community", desc: "Join a tight-knit network of creators who lift each other up." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(18,18,18,0.85)",
                  border: "1px solid rgba(212,175,55,0.12)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4
                  className="mb-2"
                  style={{ fontFamily: "'Rajdhani', sans-serif", color: "#D4AF37", letterSpacing: "0.05em" }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(240,234,214,0.45)", fontFamily: "'Inter', sans-serif" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured teachers */}
      <section
        className="py-24 px-6"
        style={{ borderTop: "1px solid rgba(212,175,55,0.1)", background: "rgba(14,14,14,0.8)" }}
      >
        <div className="max-w-5xl mx-auto text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: "#D4AF37", fontFamily: "'Rajdhani', sans-serif" }}
            >
              Lead Mentors
            </p>
            <h2
              style={{ fontFamily: "'Playfair Display', serif", color: "#f0ead6", fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              Meet the Teachers
            </h2>
          </motion.div>
        </div>
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
          {teachers.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link
                to={`/teachers/${t.id}`}
                className="group block p-8 rounded-xl text-center transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: "rgba(18,18,18,0.85)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #f0d060)",
                    fontFamily: "'Playfair Display', serif",
                    color: "#0a0a0a",
                  }}
                >
                  {t.name.charAt(0)}
                </div>
                <h3
                  className="mb-1 group-hover:text-yellow-400 transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#f0ead6" }}
                >
                  {t.name}
                </h3>
                <p
                  className="text-xs tracking-widest uppercase mb-3"
                  style={{ color: "#D4AF37", fontFamily: "'Rajdhani', sans-serif" }}
                >
                  Teacher
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(240,234,214,0.45)", fontFamily: "'Inter', sans-serif" }}
                >
                  {t.bio.slice(0, 100)}…
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            to="/students"
            className="inline-block px-8 py-3 text-xs tracking-widest transition-all duration-200 hover:scale-105"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: "0.2em",
              border: "1px solid rgba(212,175,55,0.35)",
              color: "#D4AF37",
              borderRadius: "6px",
            }}
          >
            VIEW ALL STUDENTS ({students.length})
          </Link>
        </motion.div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-28 px-6 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(10,10,10,0) 50%, rgba(212,175,55,0.08) 100%)",
          borderTop: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "#D4AF37", fontFamily: "'Rajdhani', sans-serif" }}
          >
            Limited Spots Available
          </p>
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "#f0ead6",
            }}
          >
            Ready to Level Up?
          </h2>
          <p
            className="max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: "rgba(240,234,214,0.55)", fontFamily: "'Inter', sans-serif" }}
          >
            Only 1 girl spot remaining. Applications are reviewed by our mentors personally.
            Don't miss your chance to join the most exclusive creator academy on the internet.
          </p>
          <Link
            to="/apply"
            className="inline-block px-12 py-5 text-sm tracking-widest font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: "0.25em",
              background: "linear-gradient(135deg, #D4AF37, #f0d060)",
              color: "#0a0a0a",
              borderRadius: "6px",
              boxShadow: "0 0 40px rgba(212,175,55,0.4)",
            }}
          >
            APPLY TO BLACKTOP ACADEMY
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className="py-10 px-6 text-center"
        style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}
      >
        <p
          className="text-xs tracking-widest"
          style={{ color: "rgba(240,234,214,0.25)", fontFamily: "'Rajdhani', sans-serif" }}
        >
          © 2025 BLACKTOP ACADEMY — ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
}

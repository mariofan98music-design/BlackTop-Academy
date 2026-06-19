import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import logoImg from "../../imports/IMG_8462.JPG";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/teachers", label: "Teachers" },
    { to: "/students", label: "Students" },
    { to: "/apply", label: "Apply" },
  ];

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(10,10,10,0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.2)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div
            className="overflow-hidden rounded-lg"
            style={{ width: "40px", height: "40px", flexShrink: 0 }}
          >
            <img
              src={logoImg}
              alt="Blacktop Academy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center bottom",
                filter: "drop-shadow(0 0 6px rgba(212,175,55,0.35))",
              }}
            />
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative text-sm tracking-widest transition-colors duration-200"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: "0.18em",
                color: isActive(link.to) ? "#D4AF37" : "rgba(240,234,214,0.7)",
              }}
            >
              {link.label}
              {isActive(link.to) && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: "#D4AF37" }}
                />
              )}
            </Link>
          ))}
          <Link
            to="/apply"
            className="px-5 py-2 text-sm tracking-widest transition-all duration-200 hover:scale-105"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: "0.18em",
              background: "linear-gradient(135deg, #D4AF37, #f0d060)",
              color: "#0a0a0a",
              borderRadius: "4px",
              fontWeight: 700,
            }}
          >
            APPLY NOW
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: "#D4AF37",
                transform:
                  menuOpen && i === 0
                    ? "translateY(8px) rotate(45deg)"
                    : menuOpen && i === 2
                    ? "translateY(-8px) rotate(-45deg)"
                    : menuOpen && i === 1
                    ? "scaleX(0)"
                    : "none",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: "rgba(10,10,10,0.97)", borderTop: "1px solid rgba(212,175,55,0.15)" }}
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm tracking-widest py-2"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: "0.18em",
                color: isActive(link.to) ? "#D4AF37" : "rgba(240,234,214,0.7)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

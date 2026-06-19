import { motion } from "motion/react";
import { teachers } from "../data";
import { MemberCard } from "../components/MemberCard";

export function TeachersPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-6" style={{ background: "#0a0a0a" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "#D4AF37", fontFamily: "'Rajdhani', sans-serif" }}
          >
            Lead Mentors
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 900,
              background: "linear-gradient(135deg, #f0ead6 0%, #D4AF37 60%, #f0d060 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            The Teachers
          </h1>
          <div
            className="w-16 h-px mx-auto mt-6"
            style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
          />
          <p
            className="mt-6 max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(240,234,214,0.5)", fontFamily: "'Inter', sans-serif" }}
          >
            Blacktop Academy's mentors are active creators who bring real experience and
            elite-level knowledge to every student they guide.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {teachers.map((teacher, i) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <MemberCard member={teacher} basePath="/teachers" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

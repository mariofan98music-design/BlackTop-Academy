import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { supabase } from "../lib/api";
import { MemberCard } from "../components/MemberCard";

type Student = {
  id: string;
  displayName?: string;
  photoUrl?: string;
  gender?: string;
};

export function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function loadStudents() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "student");

      if (error) {
        console.log("Supabase error:", error);
        setStudents([]);
        return;
      }

      setStudents(data ?? []);
    } catch (err) {
      console.log("Crash loading students:", err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }

  loadStudents();
}, []);

  const safeStudents = Array.isArray(students) ? students : [];

  const boys = safeStudents.filter((s) => s.gender === "boy");
  const girls = safeStudents.filter((s) => s.gender === "girl");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading students...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pt-28 pb-24 px-6"
      style={{ background: "#0a0a0a" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
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
            Class Roster
          </p>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 900,
              background:
                "linear-gradient(135deg, #f0ead6 0%, #D4AF37 60%, #f0d060 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The Students
          </h1>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {safeStudents.map((student, i) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <MemberCard member={student} basePath="/students" />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
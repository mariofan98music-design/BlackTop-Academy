import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Pencil, LogOut, LogIn } from "lucide-react";
import { allMembers } from "../data";
import { apiGetProfile } from "../lib/api";
import { useAuth } from "../lib/auth";
import { LoginModal } from "../components/LoginModal";
import { ProfileEditModal } from "../components/ProfileEditModal";

const gradientMap: Record<string, string> = {
  jadyn: "linear-gradient(135deg, #d97706, #fbbf24)",
  blake: "linear-gradient(135deg, #ea580c, #fbbf24)",
  jeremiah: "linear-gradient(135deg, #1d4ed8, #06b6d4)",
  cassy: "linear-gradient(135deg, #db2777, #fb7185)",
  kamo: "linear-gradient(135deg, #15803d, #34d399)",
  cory: "linear-gradient(135deg, #6d28d9, #a78bfa)",
  dee: "linear-gradient(135deg, #c026d3, #f472b6)",
  payhten: "linear-gradient(135deg, #0d9488, #67e8f9)",
  sean: "linear-gradient(135deg, #0369a1, #60a5fa)",
  t2: "linear-gradient(135deg, #b91c1c, #fb923c)",
  latte: "linear-gradient(135deg, #d97706, #fde68a)",
  nevaeh: "linear-gradient(135deg, #4338ca, #c4b5fd)",
  mooda: "linear-gradient(135deg, #4d7c0f, #86efac)",
  jb: "linear-gradient(135deg, #be185d, #f9a8d4)",
  james: "linear-gradient(135deg, #0e7490, #7dd3fc)",
  dynm: "linear-gradient(135deg, #c2410c, #fca5a1)",
  rasalynn: "linear-gradient(135deg, #7c3aed, #e879f9)",
  maleria: "linear-gradient(135deg, #047857, #5eead4)",
};

interface LiveProfile {
  bio?: string;
  goals?: string;
  platform?: string;
  photoUrl?: string;
  socials?: { label: string; url: string }[];
  displayName?: string;
}

export function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { isOwner, logout, memberId } = useAuth();
  const member = allMembers.find((m) => m.id === id);

  const [liveProfile, setLiveProfile] = useState<LiveProfile | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (!id) return;
    apiGetProfile(id).then((p) => setLiveProfile(p ?? {})).catch(() => {});
  }, [id]);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }}>
        <div className="text-center">
          <p style={{ color: "#D4AF37", fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>
            Profile not found
          </p>
          <Link to="/" className="mt-4 inline-block text-xs tracking-widest"
            style={{ color: "rgba(240,234,214,0.5)", fontFamily: "'Rajdhani', sans-serif" }}>
            ← BACK HOME
          </Link>
        </div>
      </div>
    );
  }

  const bg = gradientMap[member.id] || "linear-gradient(135deg, #D4AF37, #f0d060)";
  const backPath = member.role === "teacher" ? "/teachers" : "/students";
  const backLabel = member.role === "teacher" ? "← BACK TO TEACHERS" : "← BACK TO STUDENTS";
  const owned = isOwner(member.id);

  // Merge static data with live overrides
  const displayName = liveProfile?.displayName || member.name;
  const bio = liveProfile?.bio || member.bio;
  const goals = liveProfile?.goals || member.goals;
  const platform = liveProfile?.platform || member.platform;
  const socials = liveProfile?.socials ?? member.socials;
  const photoUrl = liveProfile?.photoUrl;

  const editData = {
    bio,
    goals,
    platform: platform ?? "",
    photoUrl: photoUrl ?? "",
    socials,
    displayName,
  };

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      {/* Banner */}
      <div className="h-64 sm:h-80 relative overflow-hidden" style={{ background: bg }}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(0,0,0,0.1) 12px, rgba(0,0,0,0.1) 13px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />

        <Link to={backPath}
          className="absolute top-24 left-6 text-xs tracking-widest flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.15em" }}>
          {backLabel}
        </Link>

        {/* Auth controls */}
        <div className="absolute top-24 right-6 flex items-center gap-2">
          <div
            className="px-3 py-1.5 rounded-full text-xs tracking-widest uppercase"
            style={{
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.8)",
              fontFamily: "'Rajdhani', sans-serif",
              backdropFilter: "blur(8px)",
            }}
          >
            {member.role}
          </div>
          {owned ? (
            <>
              <button
                onClick={() => setShowEdit(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs tracking-widest uppercase transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #f0d060)",
                  color: "#0a0a0a",
                  fontFamily: "'Rajdhani', sans-serif",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                }}
              >
                <Pencil size={11} /> EDIT PROFILE
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs transition-all hover:opacity-70"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(8px)",
                  cursor: "pointer",
                }}
                title="Log out"
              >
                <LogOut size={12} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs tracking-widest uppercase transition-all hover:opacity-80"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(212,175,55,0.3)",
                color: "#D4AF37",
                fontFamily: "'Rajdhani', sans-serif",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
                letterSpacing: "0.1em",
              }}
            >
              <LogIn size={11} /> MEMBER LOGIN
            </button>
          )}
        </div>
      </div>

      {/* Profile content */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative -mt-16 mb-8 flex flex-col items-center"
        >
          {/* Avatar */}
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={displayName}
              className="w-28 h-28 rounded-full object-cover shadow-2xl"
              style={{
                border: "4px solid #0a0a0a",
                boxShadow: "0 0 40px rgba(212,175,55,0.2)",
              }}
            />
          ) : (
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl"
              style={{
                background: bg,
                border: "4px solid #0a0a0a",
                color: "rgba(0,0,0,0.7)",
                fontFamily: "'Playfair Display', serif",
                boxShadow: "0 0 40px rgba(212,175,55,0.2)",
              }}
            >
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}

          <h1
            className="mt-5 text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              background: "linear-gradient(135deg, #f0ead6, #D4AF37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {displayName}
          </h1>

          <p className="text-xs tracking-[0.3em] uppercase mt-2"
            style={{ color: "#D4AF37", fontFamily: "'Rajdhani', sans-serif" }}>
            {member.role} · Blacktop Academy
          </p>

          {platform && (
            <p className="text-sm mt-2"
              style={{ color: "rgba(240,234,214,0.4)", fontFamily: "'Inter', sans-serif" }}>
              {platform}
            </p>
          )}

          <div className="w-16 h-px mt-6"
            style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
        </motion.div>

        <div className="grid gap-6">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-7 rounded-xl"
            style={{ background: "rgba(18,18,18,0.85)", border: "1px solid rgba(212,175,55,0.15)", backdropFilter: "blur(12px)" }}
          >
            <h2 className="mb-4 text-xs tracking-widest uppercase"
              style={{ color: "#D4AF37", fontFamily: "'Rajdhani', sans-serif" }}>
              Biography
            </h2>
            <p className="leading-relaxed"
              style={{ color: "rgba(240,234,214,0.65)", fontFamily: "'Inter', sans-serif" }}>
              {bio}
            </p>
          </motion.div>

          {/* Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="p-7 rounded-xl"
            style={{ background: "rgba(18,18,18,0.85)", border: "1px solid rgba(212,175,55,0.15)", backdropFilter: "blur(12px)" }}
          >
            <h2 className="mb-4 text-xs tracking-widest uppercase"
              style={{ color: "#D4AF37", fontFamily: "'Rajdhani', sans-serif" }}>
              Streaming Goals & Interests
            </h2>
            <p className="leading-relaxed"
              style={{ color: "rgba(240,234,214,0.65)", fontFamily: "'Inter', sans-serif" }}>
              {goals}
            </p>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="p-7 rounded-xl"
            style={{ background: "rgba(18,18,18,0.85)", border: "1px solid rgba(212,175,55,0.15)", backdropFilter: "blur(12px)" }}
          >
            <h2 className="mb-4 text-xs tracking-widest uppercase"
              style={{ color: "#D4AF37", fontFamily: "'Rajdhani', sans-serif" }}>
              Social Media
            </h2>
            {socials.length === 0 ? (
              <p className="text-sm"
                style={{ color: "rgba(240,234,214,0.3)", fontFamily: "'Inter', sans-serif" }}>
                {owned ? "Click \"Edit Profile\" to add your social links." : "Social links coming soon."}
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 text-xs tracking-widest rounded transition-all hover:scale-105"
                    style={{
                      background: "rgba(212,175,55,0.12)",
                      border: "1px solid rgba(212,175,55,0.25)",
                      color: "#D4AF37",
                      fontFamily: "'Rajdhani', sans-serif",
                    }}>
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {showLogin && (
        <LoginModal
          memberId={member.id}
          memberName={member.name}
          onClose={() => setShowLogin(false)}
        />
      )}

      {showEdit && owned && (
        <ProfileEditModal
          memberId={member.id}
          current={editData}
          onClose={() => setShowEdit(false)}
          onSaved={(updated) => {
            setLiveProfile((prev) => ({ ...prev, ...updated }));
          }}
        />
      )}
    </div>
  );
}

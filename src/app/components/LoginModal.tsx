import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { apiLogin } from "../lib/api";
import { useAuth } from "../lib/auth";

interface Props {
  memberId: string;
  memberName: string;
  onClose: () => void;
}

export function LoginModal({ memberId, memberName, onClose }: Props) {
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ USE USERNAME DIRECTLY (NO EMAIL CONVERSION)
      const { token, id } = await apiLogin(memberId, password);

      login(token, id);
      onClose();
    } catch (err: any) {
      setError(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(6px)",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm rounded-2xl p-8"
          style={{
            background: "rgba(18,18,18,0.97)",
            border: "1px solid rgba(212,175,55,0.25)",
            boxShadow: "0 0 60px rgba(212,175,55,0.1)",
          }}
        >
          {/* HEADER */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-1"
                style={{
                  color: "#D4AF37",
                  fontFamily: "'Rajdhani', sans-serif",
                }}
              >
                Member Login
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#f0ead6",
                  fontSize: "1.4rem",
                }}
              >
                {memberName}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="text-white/30 hover:text-white/70 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                className="block text-xs tracking-widest uppercase mb-2"
                style={{
                  color: "rgba(212,175,55,0.7)",
                  fontFamily: "'Rajdhani', sans-serif",
                }}
              >
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoFocus
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  borderRadius: "8px",
                  padding: "11px 14px",
                  color: "#f0ead6",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />

              <p
                className="text-xs mt-1.5"
                style={{
                  color: "rgba(240,234,214,0.3)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Username login (no email required)
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <p
                className="text-xs"
                style={{
                  color: "#c0392b",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {error}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading || !password}
              className="py-3 text-sm tracking-widest font-bold transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: "0.2em",
                background: "linear-gradient(135deg, #D4AF37, #f0d060)",
                color: "#0a0a0a",
                borderRadius: "8px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "SIGNING IN…" : "SIGN IN"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
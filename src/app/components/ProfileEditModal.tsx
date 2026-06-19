import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Trash2 } from "lucide-react";
import { apiUpdateProfile, apiChangePassword } from "../lib/api";
import { useAuth } from "../lib/auth";

interface Social {
  label: string;
  url: string;
}

interface ProfileData {
  bio: string;
  goals: string;
  platform: string;
  photoUrl: string;
  socials: Social[];
  displayName: string;
}

interface Props {
  memberId: string;
  current: ProfileData;
  onClose: () => void;
  onSaved: (updated: ProfileData) => void;
}

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(212,175,55,0.2)",
  borderRadius: "8px",
  padding: "10px 14px",
  color: "#f0ead6",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.875rem",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.65rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  marginBottom: "6px",
  color: "rgba(212,175,55,0.7)",
  fontFamily: "'Rajdhani', sans-serif",
};

export function ProfileEditModal({ memberId, current, onClose, onSaved }: Props) {
  const { token } = useAuth();

  const [tab, setTab] = useState<"profile" | "password">("profile");

  const [form, setForm] = useState<ProfileData>({ ...current });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [curPw, setCurPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);

  const set = (key: keyof ProfileData, val: any) =>
    setForm((f) => ({ ...f, [key]: val }));

  const updateSocial = (i: number, field: keyof Social, val: string) => {
    const next = [...form.socials];
    next[i] = { ...next[i], [field]: val };
    set("socials", next);
  };

  const addSocial = () =>
    set("socials", [...form.socials, { label: "", url: "" }]);

  const removeSocial = (i: number) =>
    set("socials", form.socials.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setSaveError("");
    setSaving(true);
    try {
      await apiUpdateProfile(memberId, token!, form);
      onSaved(form);
      onClose();
    } catch (err: any) {
      setSaveError(err.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");
    setPwSuccess(false);

    if (newPw !== confirmPw) return setPwError("Passwords don't match");
    if (newPw.length < 4)
      return setPwError("Password must be at least 4 characters");

    setPwSaving(true);
    try {
      await apiChangePassword(token!, curPw, newPw);
      setPwSuccess(true);
      setCurPw("");
      setNewPw("");
      setConfirmPw("");
    } catch (err: any) {
      setPwError(err.message ?? "Failed to change password");
    } finally {
      setPwSaving(false);
    }
  };

  const tabs = [
    { id: "profile" as const, label: "EDIT PROFILE" },
    { id: "password" as const, label: "CHANGE PASSWORD" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          background: "rgba(0,0,0,0.8)",
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
          className="w-full max-w-lg rounded-2xl flex flex-col"
          style={{
            background: "rgba(18,18,18,0.98)",
            border: "1px solid rgba(212,175,55,0.25)",
            boxShadow: "0 0 80px rgba(212,175,55,0.12)",
            maxHeight: "90vh",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-7 pt-6 pb-4"
            style={{ borderBottom: "1px solid rgba(212,175,55,0.1)" }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#f0ead6",
                fontSize: "1.2rem",
              }}
            >
              Edit Profile
            </h2>

            <button
              onClick={onClose}
              className="text-white/30 hover:text-white/70 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex px-7 pt-4 gap-4">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="text-xs tracking-widest pb-2 transition-all"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  letterSpacing: "0.15em",
                  color:
                    tab === t.id
                      ? "#D4AF37"
                      : "rgba(240,234,214,0.3)",
                  background: "none",
                  border: "none",
                  borderBottom:
                    tab === t.id
                      ? "1px solid #D4AF37"
                      : "1px solid transparent",
                  cursor: "pointer",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1 px-7 py-5 flex flex-col gap-4">
            {tab === "profile" ? (
              <>
                <div>
                  <label style={labelStyle}>Display Name</label>
                  <input
                    style={inputStyle}
                    value={form.displayName}
                    onChange={(e) =>
                      set("displayName", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label style={labelStyle}>Photo URL</label>
                  <input
                    style={inputStyle}
                    value={form.photoUrl}
                    onChange={(e) =>
                      set("photoUrl", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label style={labelStyle}>Platform</label>
                  <input
                    style={inputStyle}
                    value={form.platform}
                    onChange={(e) =>
                      set("platform", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label style={labelStyle}>Bio</label>
                  <textarea
                    style={{ ...inputStyle, resize: "vertical" }}
                    rows={3}
                    value={form.bio}
                    onChange={(e) => set("bio", e.target.value)}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Goals</label>
                  <textarea
                    style={{ ...inputStyle, resize: "vertical" }}
                    rows={3}
                    value={form.goals}
                    onChange={(e) => set("goals", e.target.value)}
                  />
                </div>

                {/* Socials */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label style={labelStyle}>Social Links</label>

                    <button
                      onClick={addSocial}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#D4AF37",
                        cursor: "pointer",
                      }}
                    >
                      <Plus size={14} /> ADD
                    </button>
                  </div>

                  {form.socials.map((s, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        style={{ ...inputStyle, width: "35%" }}
                        placeholder="Label"
                        value={s.label}
                        onChange={(e) =>
                          updateSocial(i, "label", e.target.value)
                        }
                      />

                      <input
                        style={{ ...inputStyle, flex: 1 }}
                        placeholder="URL"
                        value={s.url}
                        onChange={(e) =>
                          updateSocial(i, "url", e.target.value)
                        }
                      />

                      <button
                        onClick={() => removeSocial(i)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#fff",
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {saveError && (
                  <p style={{ color: "red" }}>{saveError}</p>
                )}
              </>
            ) : (
              <form onSubmit={handleChangePassword}>
                <p>Password section here</p>
              </form>
            )}
          </div>

          {/* Footer */}
          {tab === "profile" && (
            <div
              className="px-7 py-4 flex justify-end gap-3"
              style={{
                borderTop: "1px solid rgba(212,175,55,0.1)",
              }}
            >
              <button onClick={onClose}>Cancel</button>

              <button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
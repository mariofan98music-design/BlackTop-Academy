import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";

interface FormData {
  streamerName: string;
  age: string;
  gender: string;
  discord: string;
  platform: string;
  handle: string;
  followers: string;
  why: string;
  goals: string;
}

// Paste your Discord webhook URL here:
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1517288585785643111/SbKokfu_3_KlXBm0nIFjrL8pmn8bk3TD0i_DHh5m-jb17S0iSoR8dGsholsvZ27xvyY0";

export function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitError("");
    const embed = {
      username: "Blacktop Academy",
      embeds: [
        {
          title: "🏀 New Academy Application",
          color: 0xD4AF37,
          fields: [
            { name: "Streamer Name", value: data.streamerName, inline: true },
            { name: "Age", value: data.age, inline: true },
            { name: "Gender", value: data.gender, inline: true },
            { name: "Discord", value: data.discord, inline: true },
            { name: "Platform", value: data.platform, inline: true },
            { name: "Handle", value: data.handle, inline: true },
            { name: "Followers / Subs", value: data.followers || "Not specified", inline: true },
            { name: "Why they want to join", value: data.why },
            { name: "Creator Goals", value: data.goals },
          ],
          timestamp: new Date().toISOString(),
          footer: { text: "Blacktop Academy Applications" },
        },
      ],
    };

    try {
      const res = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(embed),
      });
      if (!res.ok) throw new Error(`Discord error: ${res.status}`);
      setSubmitted(true);
    } catch (err) {
      setSubmitError("Failed to submit. Please try again or contact us on Discord directly.");
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(212,175,55,0.2)",
    color: "#f0ead6",
    borderRadius: "8px",
    padding: "12px 16px",
    width: "100%",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.7rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    marginBottom: "8px",
    color: "rgba(212,175,55,0.8)",
    fontFamily: "'Rajdhani', sans-serif",
  };

  const errorStyle = {
    fontSize: "0.7rem",
    color: "#c0392b",
    marginTop: "4px",
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-6" style={{ background: "#0a0a0a" }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "#D4AF37", fontFamily: "'Rajdhani', sans-serif" }}
          >
            Join the Academy
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
            Apply Now
          </h1>
          <div
            className="w-16 h-px mx-auto mt-6"
            style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
          />
          <p
            className="mt-6 leading-relaxed"
            style={{ color: "rgba(240,234,214,0.45)", fontFamily: "'Inter', sans-serif" }}
          >
            Applications are reviewed personally by our mentors. We accept creators
            of all levels — what matters is drive, consistency, and passion.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16 px-8 rounded-2xl"
              style={{
                background: "rgba(18,18,18,0.9)",
                border: "1px solid rgba(212,175,55,0.3)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 60px rgba(212,175,55,0.1)",
              }}
            >
              <div
                className="text-5xl mb-6"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #f0d060)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ✦
              </div>
              <h2
                className="mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  color: "#f0ead6",
                }}
              >
                Application Received
              </h2>
              <p
                className="leading-relaxed"
                style={{ color: "rgba(240,234,214,0.55)", fontFamily: "'Inter', sans-serif" }}
              >
                Thank you for applying to Blacktop Academy. Our mentors will review
                your application and reach out via Discord within 48–72 hours.
              </p>
              <p
                className="mt-4 text-sm"
                style={{ color: "#D4AF37", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.1em" }}
              >
                Stay ready. The court is calling.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl p-8 sm:p-10 flex flex-col gap-6"
              style={{
                background: "rgba(18,18,18,0.85)",
                border: "1px solid rgba(212,175,55,0.15)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>Streamer Name *</label>
                  <input
                    {...register("streamerName", { required: "Required" })}
                    placeholder="Your stream name"
                    style={inputStyle}
                  />
                  {errors.streamerName && <p style={errorStyle}>{errors.streamerName.message}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Age *</label>
                  <input
                    {...register("age", { required: "Required" })}
                    placeholder="Your age"
                    type="number"
                    min={13}
                    style={inputStyle}
                  />
                  {errors.age && <p style={errorStyle}>{errors.age.message}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>Gender *</label>
                  {/* using native select: no kit available for select component */}
                  <select
                    {...register("gender", { required: "Required" })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="" style={{ background: "#141414" }}>Select gender</option>
                    <option value="male" style={{ background: "#141414" }}>Male</option>
                    <option value="female" style={{ background: "#141414" }}>Female</option>
                    <option value="nonbinary" style={{ background: "#141414" }}>Non-binary</option>
                    <option value="other" style={{ background: "#141414" }}>Other / Prefer not to say</option>
                  </select>
                  {errors.gender && <p style={errorStyle}>{errors.gender.message}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Discord Username *</label>
                  <input
                    {...register("discord", { required: "Required" })}
                    placeholder="username#0000"
                    style={inputStyle}
                  />
                  {errors.discord && <p style={errorStyle}>{errors.discord.message}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>Primary Platform *</label>
                  <select
                    {...register("platform", { required: "Required" })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="" style={{ background: "#141414" }}>Select platform</option>
                    <option value="twitch" style={{ background: "#141414" }}>Twitch</option>
                    <option value="youtube" style={{ background: "#141414" }}>YouTube</option>
                    <option value="tiktok" style={{ background: "#141414" }}>TikTok</option>
                    <option value="instagram" style={{ background: "#141414" }}>Instagram</option>
                    <option value="kick" style={{ background: "#141414" }}>Kick</option>
                    <option value="other" style={{ background: "#141414" }}>Other</option>
                  </select>
                  {errors.platform && <p style={errorStyle}>{errors.platform.message}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Username / Handle *</label>
                  <input
                    {...register("handle", { required: "Required" })}
                    placeholder="@yourusername"
                    style={inputStyle}
                  />
                  {errors.handle && <p style={errorStyle}>{errors.handle.message}</p>}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Followers / Subscribers</label>
                <input
                  {...register("followers")}
                  placeholder="e.g. 500, 2.4k, just starting out"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Why do you want to join Blacktop Academy? *</label>
                <textarea
                  {...register("why", { required: "Required", minLength: { value: 30, message: "Please write at least 30 characters" } })}
                  placeholder="Tell us what draws you to the academy and what you hope to gain..."
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
                {errors.why && <p style={errorStyle}>{errors.why.message}</p>}
              </div>

              <div>
                <label style={labelStyle}>Your Goals as a Creator *</label>
                <textarea
                  {...register("goals", { required: "Required", minLength: { value: 30, message: "Please write at least 30 characters" } })}
                  placeholder="Where do you see yourself in 1 year? What does success look like for you?"
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
                {errors.goals && <p style={errorStyle}>{errors.goals.message}</p>}
              </div>

              {submitError && (
                <p
                  className="text-sm text-center"
                  style={{ color: "#c0392b", fontFamily: "'Inter', sans-serif" }}
                >
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 py-4 text-sm tracking-widest font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  letterSpacing: "0.25em",
                  background: isSubmitting
                    ? "rgba(212,175,55,0.5)"
                    : "linear-gradient(135deg, #D4AF37, #f0d060)",
                  color: "#0a0a0a",
                  borderRadius: "8px",
                  border: "none",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  boxShadow: isSubmitting ? "none" : "0 0 30px rgba(212,175,55,0.3)",
                }}
              >
                {isSubmitting ? "SUBMITTING…" : "SUBMIT APPLICATION"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

import { BrowserRouter, Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { TeachersPage } from "./pages/TeachersPage";
import { StudentsPage } from "./pages/StudentsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ApplyPage } from "./pages/ApplyPage";
import { AuthProvider } from "./lib/auth";

export default function App() {
  /* MARKER-MAKE-KIT-INVOKED */
  return (
    <AuthProvider>
    <BrowserRouter>
      <div className="min-h-screen" style={{ background: "#0a0a0a", fontFamily: "'Inter', sans-serif" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/teachers/:id" element={<ProfilePage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/students/:id" element={<ProfilePage />} />
          <Route path="/apply" element={<ApplyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
    </AuthProvider>
  );
}

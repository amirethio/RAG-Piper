import { useState } from "react";
import Logo from "../assets/logo2.png";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import axiosAPI from "../API/axiosInstance";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth(); // get user from context

  const handleLogout = async () => {
    try {
      await axiosAPI.post("/auth/logout");
    } catch (err) {
      console.warn("Backend logout failed:", err);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  const AuthButtons = () => {
    if (!user?.id)
      return (
        <>
          <a
            href="/login"
            className="rounded-lg border border-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary hover:text-card"
          >
            Login
          </a>
          <a
            href="/signup"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110"
          >
            Sign Up
          </a>
        </>
      );

    if (user.role === "admin")
      return (
        <>
          <a
            href="/admin"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm text-card hover:brightness-110"
          >
            Admin Panel
          </a>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-red-500 px-4 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-card"
          >
            Logout
          </button>
        </>
      );

    return (
      <>
        <span className="text-sm text-muted-foreground px-3 py-2">
          Welcome, {user.name || user.email}
        </span>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-red-500 px-4 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-card"
        >
          Logout
        </button>
      </>
    );
  };

  const sections = ["about", "features", "technology", "team", "contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-md bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 text-xl font-bold text-foreground"
        >
          <img src={Logo} className="w-10" />
          <span>
            Pied<span className="text-primary">Piper</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {sections.map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <AuthButtons />
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
        >
          {mobileOpen ? (
            <IoClose className="h-6 w-6" />
          ) : (
            <IoMdMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-muted-foreground hover:text-primary"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
            <li>
              <div onClick={() => setMobileOpen(false)}>
                <AuthButtons />
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

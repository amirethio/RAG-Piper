import { useState } from "react";
import Logo from "../assets/logo2.png";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { logout } from "./../services/auth.service";
import { useNavigate , Link } from "react-router";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, setUser } = useAuth(); 
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await logout();
      setUser(null);
      navigate("/login");
    } catch (err) {
      navigate("/login");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-md bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-foreground"
        >
          <img src={Logo} className="w-10" />
          <span>
            Pied<span className="text-primary">Piper</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link
              to="#about"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="#features"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              to="#technology"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Technology
            </Link>
          </li>
          <li>
            <Link
              to="#team"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Team
            </Link>
          </li>
          <li>
            <Link
              to="#contact"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Auth buttons / conditional rendering */}
        <div className="hidden md:flex items-center gap-3">
          {user?.id ? (
            <>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="rounded-lg bg-emerald-500 px-4 py-2 text-sm text-card hover:brightness-110"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="rounded-lg border border-red-500 px-4 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-card"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110"
              >
                Login
              </Link>
            </>
          )}
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
            <li>
              <Link
                to="#about"
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="#features"
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="#technology"
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                Technology
              </Link>
            </li>
            <li>
              <Link
                to="#team"
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                to="#contact"
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                Contact
              </Link>
            </li>
            <li>
              {!user?.id ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg border border-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary hover:text-card"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : user.role === "admin" ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg bg-emerald-500 px-4 py-2 text-sm text-card hover:brightness-110"
                  >
                    Admin Panel
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="rounded-lg border border-red-500 px-4 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-card"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-muted-foreground px-3 py-2">
                    Welcome, {user.name || user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="rounded-lg border border-red-500 px-4 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-card"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

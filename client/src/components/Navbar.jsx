import { useState } from "react";
import Logo from "../assets/logo2.png";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Technology", href: "#technology" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="flex items-center gap-2 text-xl font-bold text-foreground"
        >
          <img src={Logo} className="w-10" />
          <span>
            Pied<span className="text-primary">Piper</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 md:inline-block"
        >
          Get Early Access
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <IoClose className="h-6 w-6" />
          ) : (
            <IoMdMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-block rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110"
              >
                Get Early Access
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

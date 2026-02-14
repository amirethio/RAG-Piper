// File: Footer.jsx
import { FaGithub } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FiLinkedin } from "react-icons/fi";
import Logo from "../assets/logo2.png";

const Footer = () => {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Logo / Description */}
          <div className="md:col-span-1">
            <a
              href="#"
              className="flex items-center gap-2 text-lg font-bold text-foreground"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md">
                <img src={Logo} alt="PiedPiper Logo" />
              </span>
              <span>
                Pied<span className="text-primary">Piper</span>
              </span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Decentralized compression for the new internet.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Product
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Technology
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Company
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Legal
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            2026 PiedPiper, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="Twitter"
            >
              <CiTwitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

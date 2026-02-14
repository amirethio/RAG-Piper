// File: Team.jsx
import { FaGithub } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FiLinkedin } from "react-icons/fi";
import Richard from "../assets/Richard.png";
import Gilfoyle from "../assets/Gilfoyle.png";
import Jared from "../assets/Jared.png";
import Dinesh from "../assets/Dinesh.png";

const Team = () => {
  return (
    <section id="team" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 font-mono text-sm font-bold uppercase tracking-wider text-primary">
            Our Team
          </p>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            The Minds Behind PiedPiper
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            A small team of brilliant engineers and operators building the
            future of data compression from a house in Palo Alto.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Richard */}
          <div className="group rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/50">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 font-mono text-xl font-bold text-primary transition-colors duration-300 group-hover:bg-primary/20">
              <img src={Richard} alt="Richard Hendricks" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Richard Hendricks
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-primary">
              CEO & Founder
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Visionary engineer who discovered the middle-out algorithm. Former
              Hooli employee turned compression revolutionary.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <CiTwitter className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
              <FaGithub className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
              <FiLinkedin className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Gilfoyle */}
          <div className="group rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/50">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 font-mono text-xl font-bold text-primary transition-colors duration-300 group-hover:bg-primary/20">
              <img src={Gilfoyle} alt="Bertram Gilfoyle" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Bertram Gilfoyle
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-primary">
              VP of Architecture
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Systems architect and security expert. Designed PiedPiper's
              decentralized infrastructure from scratch. Prefers servers over
              people.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <CiTwitter className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
              <FaGithub className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
              <FiLinkedin className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Dinesh */}
          <div className="group rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/50">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 font-mono text-xl font-bold text-primary transition-colors duration-300 group-hover:bg-primary/20">
              <img src={Dinesh} alt="Dinesh Chugtai" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Dinesh Chugtai
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-primary">
              Lead Engineer
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Full-stack developer responsible for PiedPiper's core API layer
              and real-time streaming pipeline. Competitive by nature.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <CiTwitter className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
              <FaGithub className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
              <FiLinkedin className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Jared */}
          <div className="group rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/50">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 font-mono text-xl font-bold text-primary transition-colors duration-300 group-hover:bg-primary/20">
              <img src={Jared} alt="Jared Dunn" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Jared Dunn
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-primary">
              COO
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Operational mastermind who keeps PiedPiper running. Former Hooli
              Head of Business Development. Believes in the mission.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <CiTwitter className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
              <FaGithub className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
              <FiLinkedin className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;

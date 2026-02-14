import { FiCpu, FiActivity } from "react-icons/fi";
import { CiCloudOn } from "react-icons/ci";
import { GoDatabase } from "react-icons/go";

const Feature = () => {
  return (
    <section id="features" className="relative px-6 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 font-mono text-sm font-bold uppercase tracking-wider text-primary">
            Features
          </p>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Built for the Future of Data
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Every feature is designed from the ground up to handle the scale and
            speed demands of modern infrastructure.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50">
            <div className="flex items-start justify-between">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                <FiCpu className="h-6 w-6" />
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-bold text-primary">
                  &lt; 1ms
                </div>
                <div className="text-xs text-muted-foreground">Latency</div>
              </div>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-foreground">
              Real-Time Compression
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Process and compress data streams in real time with
              sub-millisecond latency. No buffering, no delays, just pure
              throughput.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50">
            <div className="flex items-start justify-between">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                <CiCloudOn className="h-6 w-6" />
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-bold text-primary">
                  100%
                </div>
                <div className="text-xs text-muted-foreground">
                  Platform Agnostic
                </div>
              </div>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-foreground">
              Cloud-Native Architecture
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Deploy anywhere. PidPiper runs seamlessly across AWS, GCP, Azure,
              and bare metal. One API, every environment.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50">
            <div className="flex items-start justify-between">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                <GoDatabase className="h-6 w-6" />
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-bold text-primary">
                  10PB+
                </div>
                <div className="text-xs text-muted-foreground">
                  Tested Volume
                </div>
              </div>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-foreground">
              Infinite Scalability
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Our mesh network scales horizontally without limits. As your data
              grows, PidPiper grows with it. No performance degradation, ever.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50">
            <div className="flex items-start justify-between">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                <FiActivity className="h-6 w-6" />
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-bold text-primary">
                  37%
                </div>
                <div className="text-xs text-muted-foreground">
                  Better Ratios
                </div>
              </div>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-foreground">
              Smart Optimization
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Machine learning models analyze your data patterns in real time
              and dynamically tune compression parameters for optimal results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;

interface WaveSectionProps {
  children: React.ReactNode;
  waveTop?: boolean;
  waveBottom?: boolean;
  className?: string;
  id?: string;
}

export function WaveSection({ children, waveTop = false, waveBottom = false, className = '', id }: WaveSectionProps) {
  return (
    <section id={id} className={`relative ${className}`}>
      {/* Top Wave */}
      {waveTop && (
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
          {/* <svg
            className="relative block w-full h-[60px] md:h-[100px]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-slate-900/20"
            ></path>
          </svg> */}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Bottom Wave */}
      {waveBottom && (
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          {/* <svg
            className="relative block w-full h-[60px] md:h-[100px]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-slate-900/20"
            ></path>
          </svg> */}
        </div>
      )}
    </section>
  );
}
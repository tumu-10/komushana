import mark from "@/assets/komushana-mark.png";

export const BRAND_MARK = mark;

export function BrandMark({ className = "", alt = "" }: { className?: string; alt?: string }) {
  return (
    <img
      src={mark}
      alt={alt}
      width={512}
      height={512}
      draggable={false}
      className={`select-none object-contain ${className}`}
    />
  );
}

/** Two-line wordmark set to echo the logo lockup: heavy caps over a wide-tracked line. */
export function Wordmark({ className = "", small = false }: { className?: string; small?: boolean }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span
        className={`font-sans font-extrabold uppercase tracking-[0.08em] ${small ? "text-[0.95rem]" : "text-lg"}`}
      >
        Komushana
      </span>
      <span
        className={`mt-1 font-sans font-medium uppercase text-lilac ${
          small ? "text-[0.5rem] tracking-[0.5em]" : "text-[0.6rem] tracking-[0.52em]"
        }`}
      >
        Consultancy
      </span>
    </span>
  );
}

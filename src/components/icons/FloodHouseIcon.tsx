export function FloodHouseIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 11 L12 4 L21 11" />
      <path d="M6 9.5 V15" />
      <path d="M18 9.5 V15" />
      <path d="M2 16 Q4.5 13.5 7 16 T12 16 T17 16 T22 16" />
      <path d="M2 19.5 Q4.5 17 7 19.5 T12 19.5 T17 19.5 T22 19.5" />
    </svg>
  );
}

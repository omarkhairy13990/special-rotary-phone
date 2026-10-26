import { markShapes } from '@/lib/signature'

/** The fixed MASAM master mark. Mirrors in Arabic so the filtering flow follows the reading direction. */
export function Mark({ rtl = false, size = 28, mono = false }: { rtl?: boolean; size?: number; mono?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      {markShapes(rtl).map((d, i) => (
        <circle key={i} cx={d.cx.toFixed(2)} cy={d.cy.toFixed(2)} r={d.r.toFixed(2)} fill={d.core && !mono ? 'var(--signal)' : 'currentColor'} />
      ))}
    </svg>
  )
}

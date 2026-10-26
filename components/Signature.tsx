import { signatureShapes, type WaterSample } from '@/lib/signature'

/** Draws the water signature for one analysis. Pure SVG, so it renders on the server and in the Lab alike. */
export function Signature({ sample, label, className }: { sample: WaterSample; label?: string; className?: string }) {
  const { shapes, coreAlert } = signatureShapes(sample)
  return (
    <svg viewBox="0 0 140 140" className={className} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {shapes.map((s, i) =>
        s.kind === 'circle' ? (
          <circle key={i} cx={s.cx.toFixed(2)} cy={s.cy.toFixed(2)} r={s.r.toFixed(2)} fill={s.core ? (coreAlert ? 'var(--signal)' : 'var(--accent-on-band)') : 'currentColor'} />
        ) : (
          <rect key={i} x={s.x.toFixed(2)} y={s.y.toFixed(2)} width={s.size.toFixed(2)} height={s.size.toFixed(2)} rx={s.rx.toFixed(1)} transform={`rotate(${s.rotate} ${s.cx.toFixed(2)} ${s.cy.toFixed(2)})`} fill="currentColor" />
        ),
      )}
    </svg>
  )
}

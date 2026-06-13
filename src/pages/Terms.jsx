import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
        <ArrowLeft size={16} /> Back to home
      </Link>
      <h1 className="mt-8 font-display text-4xl font-bold">Terms of Service</h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">Last updated June 2026</p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-muted">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Agreement</h2>
          <p className="mt-3">
            By engaging Apex Websites for design or development services, you agree to these terms. Specific project scope,
            timelines, and fees are confirmed in a separate written proposal for each engagement.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Scope & deliverables</h2>
          <p className="mt-3">
            Work is delivered according to the scope agreed in your proposal. Additional requests outside that scope may
            adjust the timeline and cost, which we will always confirm with you in advance.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Payment</h2>
          <p className="mt-3">
            Projects typically begin with a deposit, with the balance due on completion. Care and hosting plans are billed
            on a recurring basis and may be cancelled with notice as set out in your plan.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Ownership</h2>
          <p className="mt-3">
            On final payment, ownership of the completed website and its custom assets transfers to you. We may showcase the
            finished work in our portfolio unless otherwise agreed in writing.
          </p>
        </section>
      </div>
    </div>
  )
}

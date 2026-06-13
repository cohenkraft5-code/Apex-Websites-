import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
        <ArrowLeft size={16} /> Back to home
      </Link>
      <h1 className="mt-8 font-display text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">Last updated June 2026</p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-muted">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Overview</h2>
          <p className="mt-3">
            Apex Websites (“we”, “us”) respects your privacy. This policy explains what information we collect when you
            visit our site or contact us, and how we use it. We only collect what we need to respond to your enquiry and
            improve our service.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Information we collect</h2>
          <p className="mt-3">
            When you submit our contact form we collect the name, email, phone number, business name, and project details
            you provide. We may also collect anonymous analytics such as pages visited and device type.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">How we use it</h2>
          <p className="mt-3">
            We use your information solely to respond to your enquiry, prepare proposals, and deliver services you request.
            We never sell your data, and we only share it with trusted providers required to operate our business.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Your rights</h2>
          <p className="mt-3">
            You may request access to, correction of, or deletion of your personal data at any time by emailing
            <a href="mailto:hello@apexwebsites.com" className="text-primary"> hello@apexwebsites.com</a>.
          </p>
        </section>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Menu, X, Check, Star, ArrowUpRight, ArrowRight, Phone,
  Gauge, Search, Layers, Wrench, CalendarCheck, Infinity as InfinityIcon,
  Sparkles, MousePointerClick, Quote, Mail,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

/* ------------------------------------------------------------------ */
/*  Brand constants — Cohen's real funnel: free demo → $150 flat       */
/* ------------------------------------------------------------------ */

const EMAIL = 'cohen@apexsiteai.com'
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("I'd like a free demo site")}&body=${encodeURIComponent("Hi Cohen,\n\nI run [business name] in [city] — we do [what you do]. I'd love to see a free demo of what my site could look like.\n\nThanks!")}`
const INSTAGRAM = 'https://www.instagram.com/apexwebsites0/'
const HANDLE = '@apexwebsites0'
const PRICE = '$150'

/* ------------------------------------------------------------------ */
/*  Motion primitives                                                  */
/* ------------------------------------------------------------------ */

function useMagnetic(strength = 0.3) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return
    let raf = 0
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * strength
      const y = (e.clientY - (r.top + r.height / 2)) * strength
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => { el.style.transform = `translate(${x}px, ${y}px)` })
    }
    const reset = () => { cancelAnimationFrame(raf); el.style.transform = 'translate(0,0)' }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', reset)
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', reset); cancelAnimationFrame(raf) }
  }, [strength])
  return ref
}

function useSpotlight() {
  const ref = useRef(null)
  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return { ref, onMouseMove }
}

function SpotCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const { ref, onMouseMove } = useSpotlight()
  return (
    <Tag ref={ref} onMouseMove={onMouseMove} className={`spot ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/*  Brand marks                                                        */
/* ------------------------------------------------------------------ */

function PeakMark({ size = 30, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <rect x="1" y="1" width="38" height="38" rx="9" fill="#17150F" />
      <path d="M20 9 L31 31 H25.5 L20 19 L14.5 31 H9 Z" fill="#1B33E0" />
      <path d="M20 9 L31 31 H25.5 L20 19 Z" fill="#5E73FF" />
    </svg>
  )
}

function Logo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Apex Websites home">
      <PeakMark size={32} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-semibold tracking-[-0.01em] text-ink">Apex Websites</span>
        <span className="font-mono text-[8.5px] tracking-[0.32em] text-muted">DESIGN STUDIO</span>
      </span>
    </Link>
  )
}

function InstagramIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" />
      <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" />
    </svg>
  )
}

/* Primary CTA — opens an email to Cohen asking for a free demo */
function DemoButton({ children = 'Get my free demo', size = 'lg', className = '' }) {
  const pad = size === 'lg' ? 'pl-7 pr-2.5 py-3 text-[15px]' : 'pl-5 pr-2 py-2.5 text-sm'
  const mag = useMagnetic(0.28)
  return (
    <a ref={mag} href={MAILTO} className={`btn-primary magnetic ${pad} ${className}`}>
      <span className="inline-flex items-center gap-2">{children}</span>
      <span className="arrow-pill h-7 w-7"><ArrowRight size={15} strokeWidth={2.4} /></span>
    </a>
  )
}

function Label({ children, className = '' }) {
  return (
    <span className={`label ${className}`}><span className="label-dot" /> {children}</span>
  )
}

/* ------------------------------------------------------------------ */
/*  Faux small-business site preview — the proof, rendered in CSS      */
/* ------------------------------------------------------------------ */

function BrowserMock({ accent = '#1B33E0', name = 'Summit Plumbing', tag = 'PLUMBING', headline = 'Fast, reliable plumbing — done right.', tint = '#EAF0FF', className = '' }) {
  return (
    <div className={`browser ${className}`}>
      {/* chrome */}
      <div className="flex items-center gap-2 border-b border-black/5 bg-[#F6F3EE] px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5C0BC]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#EAD9B0]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#BFD9C0]" />
        <span className="ml-3 hidden flex-1 truncate rounded-md bg-white px-2.5 py-1 text-[9px] text-neutral-400 sm:block">
          {name.toLowerCase().replace(/\s+/g, '')}.com
        </span>
      </div>
      {/* faux site */}
      <div className="bg-white text-neutral-900">
        {/* top bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-4 w-4 rounded" style={{ background: accent }} />
            <span className="text-[10px] font-bold tracking-tight">{name}</span>
          </div>
          <div className="hidden items-center gap-3 text-[8px] font-medium text-neutral-500 sm:flex">
            <span>Services</span><span>About</span><span>Reviews</span>
          </div>
          <span className="flex items-center gap-1 rounded-full px-2 py-1 text-[8px] font-bold text-white" style={{ background: accent }}>
            <Phone size={8} /> Call now
          </span>
        </div>
        {/* hero */}
        <div className="px-4 pb-4 pt-2" style={{ background: tint }}>
          <span className="inline-block rounded-full bg-white/70 px-2 py-0.5 text-[7px] font-bold uppercase tracking-wider" style={{ color: accent }}>
            {tag} · LICENSED &amp; INSURED
          </span>
          <p className="mt-2 max-w-[16rem] text-[15px] font-extrabold leading-tight tracking-tight">{headline}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-md px-2.5 py-1 text-[8px] font-bold text-white" style={{ background: accent }}>Get a free quote</span>
            <span className="rounded-md border border-neutral-300 px-2.5 py-1 text-[8px] font-semibold text-neutral-600">★ 4.9 · 120 reviews</span>
          </div>
        </div>
        {/* service chips */}
        <div className="grid grid-cols-3 gap-2 px-4 py-3">
          {['Repairs', 'Install', 'Emergency'].map((s) => (
            <div key={s} className="rounded-md border border-neutral-200 p-2">
              <span className="block h-1 w-5 rounded-full" style={{ background: accent }} />
              <span className="mt-1.5 block text-[8px] font-semibold text-neutral-700">{s}</span>
              <span className="mt-0.5 block h-1 w-full rounded-full bg-neutral-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'What you get', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 px-4">
        <nav className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${scrolled ? 'glass' : 'border border-transparent'}`}>
          <Logo />
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-ink">{l.label}</a>
            ))}
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <DemoButton size="sm">Free demo</DemoButton>
          </div>
          <button onClick={() => setOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden" aria-label="Open menu">
            <Menu size={22} />
          </button>
        </nav>
      </header>

      <div className={`fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <div className="flex items-center justify-between px-6 pt-6">
          <Logo />
          <button onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full text-ink" aria-label="Close menu"><X size={24} /></button>
        </div>
        <div className="mt-10 flex flex-col gap-1 px-6">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-divider py-4 font-display text-3xl font-semibold text-ink">{l.label}</a>
          ))}
          <div className="mt-7" onClick={() => setOpen(false)}><DemoButton className="w-full">Get my free demo</DemoButton></div>
        </div>
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const root = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.h-rev', { y: 30, autoAlpha: 0, filter: 'blur(8px)', duration: 0.9, stagger: 0.11 })
        .from('.h-cta', { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
        .from('.h-art', { y: 40, autoAlpha: 0, scale: 0.96, duration: 1.1, ease: 'power3.out' }, '-=0.7')
        .from('.h-meta', { autoAlpha: 0, y: 10, duration: 0.6, stagger: 0.06 }, '-=0.5')
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg radial-fade" />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-[110px]" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-32 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24 lg:pt-40">
        {/* copy */}
        <div>
          <div className="h-rev"><Label>For local service businesses</Label></div>
          <h1 className="h-rev mt-6 font-display text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.02em] text-balance sm:text-[3.7rem] lg:text-[4.1rem]">
            The website your business <span className="italic font-normal text-shimmer">should</span> already have.
          </h1>
          <p className="h-rev mt-6 max-w-lg text-[16px] leading-relaxed text-ink-soft text-pretty">
            We design fast, custom websites for plumbers, contractors, clinics, salons and local trades.
            Here's the part nobody else does: <span className="font-semibold text-ink">we build you a real demo first — completely free.</span> You
            only pay if you love it. {PRICE} flat, lifetime edits.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <div className="h-cta"><DemoButton>Get my free demo</DemoButton></div>
            <a href="#work" className="h-cta btn-ghost group pl-6 pr-2.5 py-3 text-[15px] font-semibold">
              See the work
              <span className="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-ink/[0.06] text-ink transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={15} strokeWidth={2.4} />
              </span>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <span className="h-meta inline-flex items-center gap-2">
              <span className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-primary text-primary" />)}</span>
              Loved by owners
            </span>
            <span className="h-meta inline-flex items-center gap-2"><Check size={14} className="text-primary" /> Free demo, no commitment</span>
            <span className="h-meta inline-flex items-center gap-2"><Gauge size={14} className="text-primary" /> Live in days, not months</span>
          </div>
        </div>

        {/* art — floating browser preview */}
        <div className="h-art relative">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent blur-2xl" />
          <div className="animate-float-slow">
            <BrowserMock />
          </div>
          {/* floating proof chips */}
          <div className="absolute -left-3 bottom-6 flex items-center gap-2 rounded-full border border-divider bg-background/90 px-3 py-2 shadow-lg backdrop-blur sm:-left-8">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary"><Gauge size={14} /></span>
            <span className="text-[11px] font-semibold text-ink">98 / 100 speed</span>
          </div>
          <div className="absolute -right-2 top-8 flex items-center gap-2 rounded-full border border-divider bg-background/90 px-3 py-2 shadow-lg backdrop-blur sm:-right-6">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent"><Sparkles size={14} /></span>
            <span className="text-[11px] font-semibold text-ink">Built free, first</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Trades marquee                                                     */
/* ------------------------------------------------------------------ */

function TradesMarquee() {
  const trades = ['PLUMBING', 'HVAC', 'ROOFING', 'DENTAL', 'LANDSCAPING', 'AUTO REPAIR', 'ELECTRICAL', 'SALONS', 'LAW FIRMS', 'CLEANING', 'FITNESS', 'CONTRACTORS', 'CAFÉS', 'REAL ESTATE']
  const row = [...trades, ...trades]
  return (
    <section className="border-y border-divider bg-deep py-5">
      <div className="mx-auto mb-4 max-w-6xl px-5">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.28em] text-muted">Built for the businesses people search for every day</p>
      </div>
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee gap-8">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-8 font-display text-lg font-medium text-ink/40">
              {t}<span className="text-primary/50">▲</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Why — value cards                                                  */
/* ------------------------------------------------------------------ */

function Why() {
  const root = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-card', {
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
        y: 40, autoAlpha: 0, filter: 'blur(8px)', duration: 0.8, stagger: 0.14, ease: 'power3.out',
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const cards = [
    { icon: Sparkles, title: 'You see it before you pay', body: 'Most agencies make you sign and wait. We flip it — we build a real, working demo of your site first, free. No risk, no guessing what you’ll get.' },
    { icon: Layers, title: 'Custom-built, never a template', body: 'Every site is designed from scratch around your trade, your area, and the customers you want — not a theme 500 other businesses already use.' },
    { icon: Search, title: 'Found on Google, fast on phones', body: 'Tuned to load in under a second and show up when locals search “near me.” 90+ speed scores, mobile-first, Google Business ready.' },
  ]

  return (
    <section ref={root} className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div className="max-w-2xl">
        <Label>Why owners pick Apex</Label>
        <h2 className="mt-5 font-display text-[2.1rem] font-semibold tracking-[-0.01em] sm:text-5xl text-balance">
          A website that actually brings the phone calls.
        </h2>
        <p className="mt-4 max-w-xl text-ink-soft">
          Your customers judge you online before they ever call. We make sure that first impression looks like the best business in town.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {cards.map(({ icon: Icon, title, body }) => (
          <SpotCard key={title} className="why-card card card-lift p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon size={20} /></span>
            <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">{body}</p>
          </SpotCard>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Stats — count up                                                   */
/* ------------------------------------------------------------------ */

function CountUp({ to, suffix = '', prefix = '', decimals = 0 }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let started = false
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true
          const dur = 1600
          let start
          const step = (t) => {
            if (!start) start = t
            const p = Math.min((t - start) / dur, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setVal(to * eased)
            if (p < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>
}

function Stats() {
  const stats = [
    { node: <CountUp to={150} prefix="$" />, label: 'Flat price', sub: 'Everything in. No upsells, ever.' },
    { node: <CountUp to={98} />, label: 'Avg. speed score', sub: 'Fast sites rank — and convert.' },
    { node: <><CountUp to={0} prefix="$" />0</>, label: 'To see your demo', sub: 'We build it before you pay.' },
    { node: <CountUp to={100} suffix="%" />, label: 'Custom designed', sub: 'No templates. No exceptions.' },
  ]
  return (
    <section className="border-y border-divider bg-deep">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-background px-6 py-12 text-center">
            <div className="font-display text-5xl font-semibold tracking-tight text-cobalt sm:text-6xl">{s.node}</div>
            <div className="mt-3 font-display text-sm font-semibold text-ink">{s.label}</div>
            <div className="mt-1 text-xs text-muted">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Process — Cohen's real model                                       */
/* ------------------------------------------------------------------ */

function Process() {
  const root = useRef(null)
  const steps = [
    { n: '01', icon: Search, title: 'We study your business', body: 'We look at your current site (or lack of one), your competitors, and what your customers actually search for. No meeting required.' },
    { n: '02', icon: Sparkles, title: 'We build your demo — free', body: 'Within a few days you get a real, live preview of your new site, built specifically for you. Not a mockup. The real thing.' },
    { n: '03', icon: CalendarCheck, title: 'You love it, we launch', body: `Want it? It's ${PRICE} flat. We set up your domain, put it live, and handle edits for life. Don't want it? No hard feelings, no cost.` },
  ]
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.proc-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: { trigger: card, start: 'top 18%', end: 'bottom 18%', scrub: true },
          scale: 0.94, opacity: 0.4, ease: 'none',
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={root} className="mx-auto max-w-4xl px-5 py-20 sm:py-28">
      <div className="mb-12 text-center">
        <Label className="justify-center">How it works</Label>
        <h2 className="mt-5 font-display text-[2.1rem] font-semibold tracking-[-0.01em] sm:text-5xl text-balance">
          The demo comes first. Always.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-ink-soft">No deposits, no contracts to see what you'd get. Here's the whole process.</p>
      </div>

      <div className="space-y-5">
        {steps.map(({ n, icon: Icon, title, body }) => (
          <SpotCard key={n} className="proc-card card sticky top-24 p-8 sm:p-11">
            <div className="absolute right-7 top-5 font-display text-8xl font-semibold text-primary/[0.07]">{n}</div>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15"><Icon size={22} /></span>
            <h3 className="mt-6 font-display text-2xl font-semibold sm:text-3xl">{title}</h3>
            <p className="mt-3 max-w-lg text-ink-soft">{body}</p>
          </SpotCard>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Work — showcase of mock previews                                   */
/* ------------------------------------------------------------------ */

function Work() {
  const root = useRef(null)
  const shots = [
    { accent: '#1B33E0', name: 'Summit Plumbing', tag: 'PLUMBING', tint: '#EAF0FF', headline: 'Fast, reliable plumbing — done right.' },
    { accent: '#0E8F5E', name: 'EverGreen Lawn Co', tag: 'LANDSCAPING', tint: '#E8F6EE', headline: 'A yard the whole street notices.' },
    { accent: '#C2410C', name: 'Northside Auto', tag: 'AUTO REPAIR', tint: '#FCEEE6', headline: 'Honest repairs, back on the road today.' },
    { accent: '#7C3AED', name: 'Lumine Dental', tag: 'DENTAL', tint: '#F1EBFE', headline: 'A brighter smile starts here.' },
  ]
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-item', {
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
        y: 44, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={root} className="border-y border-divider bg-deep">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <Label>A taste of the work</Label>
            <h2 className="mt-5 font-display text-[2.1rem] font-semibold tracking-[-0.01em] sm:text-5xl text-balance">
              Sites that look like the best shop in town.
            </h2>
          </div>
          <a href={MAILTO} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5">
            <Mail size={15} /> Get one built for you, free
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {shots.map((s) => (
            <div key={s.name} className="work-item transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5">
              <BrowserMock {...s} />
              <div className="mt-3 flex items-center justify-between px-1">
                <span className="font-display text-sm font-semibold text-ink">{s.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{s.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Services — what you get                                            */
/* ------------------------------------------------------------------ */

function Services() {
  const root = useRef(null)
  const services = [
    { icon: Layers, title: 'Custom design', body: 'A site designed from a blank canvas around your trade and brand — never a recycled template.' },
    { icon: Gauge, title: 'Built for speed', body: 'Hand-tuned to load in under a second. Fast sites rank higher and lose fewer customers.' },
    { icon: Search, title: 'Local SEO & Google', body: 'Set up to show when locals search "near me" — Google Business, maps and reviews dialled in.' },
    { icon: Wrench, title: 'Booking & contact', body: 'Click-to-call, quote forms, and booking so customers reach you in one tap from their phone.' },
    { icon: Sparkles, title: 'Branding polish', body: 'Logo cleanup, colors and a consistent look that makes you appear established and trusted.' },
    { icon: InfinityIcon, title: 'Lifetime edits', body: 'New hours, new photos, new service? Just email me. Free edits for the life of your site.' },
  ]
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc', {
        scrollTrigger: { trigger: root.current, start: 'top 74%' },
        y: 30, autoAlpha: 0, duration: 0.6, stagger: 0.07, ease: 'power2.out',
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={root} className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div className="mb-12 max-w-xl">
        <Label>Everything included</Label>
        <h2 className="mt-5 font-display text-[2.1rem] font-semibold tracking-[-0.01em] sm:text-5xl text-balance">
          One price. The whole thing.
        </h2>
      </div>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-divider bg-divider sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, title, body }) => (
          <SpotCard key={title} className="svc group cursor-default bg-background p-7 transition-colors duration-500 hover:bg-surface">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-background">
                <Icon size={20} />
              </span>
              <ArrowUpRight size={18} className="text-muted transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{body}</p>
          </SpotCard>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Pricing                                                            */
/* ------------------------------------------------------------------ */

function Pricing() {
  const features = [
    'A free custom demo before you decide',
    '100% custom design — no templates',
    'Mobile-first & lightning fast (90+ speed)',
    'Local SEO & Google Business setup',
    'Click-to-call, quote forms & booking',
    'Your own custom domain, set up for you',
    'Lifetime support & free edits, forever',
  ]
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div className="mb-14 text-center">
        <Label className="justify-center">Simple pricing</Label>
        <h2 className="mt-5 font-display text-[2.1rem] font-semibold tracking-[-0.01em] sm:text-5xl text-balance">
          One flat price. <span className="text-cobalt">Everything in.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-soft">
          And you see the whole thing — built for you — before a single dollar changes hands.
        </p>
      </div>

      <div className="mx-auto max-w-md">
        <div className="card relative flex flex-col p-9 ring-1 ring-primary/20">
          <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-primary px-4 py-1 font-mono text-[10px] uppercase tracking-widest text-background shadow-lg">
            Free demo first
          </span>
          <div className="text-center">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">The Apex Site</div>
            <div className="mt-4 flex items-end justify-center gap-1.5">
              <span className="font-display text-6xl font-semibold text-cobalt">{PRICE}</span>
              <span className="mb-2 text-sm text-muted">one-time</span>
            </div>
            <div className="mt-1 text-sm text-ink-soft">Custom domain &amp; lifetime edits included</div>
          </div>
          <div className="my-7 h-px bg-divider" />
          <ul className="space-y-3.5">
            {features.map((f, i) => (
              <li key={f} className="flex items-start gap-2.5 text-[14.5px] text-ink-soft">
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${i === 0 ? 'bg-accent/15 text-accent' : 'bg-primary/10 text-primary'}`}><Check size={13} /></span>
                <span className={i === 0 ? 'font-semibold text-ink' : ''}>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9"><DemoButton className="w-full">Get my free demo</DemoButton></div>
          <p className="mt-3 text-center text-xs text-muted">No deposit. No contract to see it.</p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */

function Testimonials() {
  const root = useRef(null)
  const quotes = [
    { q: 'I had no website at all. Cohen sent me a finished demo two days later — I just said yes. Calls went up almost immediately.', name: 'Mike R.', role: 'Owner, Summit Plumbing' },
    { q: 'My old site looked like it was from 2009. The new one loads instantly and actually shows up on Google now. Worth way more than I paid.', name: 'Elena V.', role: 'Owner, EverGreen Lawn Co' },
    { q: 'What sold me was seeing it first. No pushy sales call — just a real site built for my shop. Easiest decision I’ve made for the business.', name: 'Darnell K.', role: 'Northside Auto' },
  ]
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tst', {
        scrollTrigger: { trigger: root.current, start: 'top 76%' },
        y: 34, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} className="border-y border-divider bg-deep">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="mb-12 text-center">
          <Label className="justify-center">From business owners</Label>
          <h2 className="mt-5 font-display text-[2.1rem] font-semibold tracking-[-0.01em] sm:text-5xl text-balance">
            They saw it first. Then they said yes.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {quotes.map((t) => (
            <SpotCard as="figure" key={t.name} className="tst card card-lift flex flex-col p-7">
              <Quote size={26} className="text-primary/40" />
              <div className="mt-3 flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-primary text-primary" />)}</div>
              <blockquote className="mt-4 flex-1 text-pretty text-[15px] leading-relaxed text-ink-soft">"{t.q}"</blockquote>
              <figcaption className="mt-6 border-t border-divider pt-4">
                <div className="font-display text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted">{t.role}</div>
              </figcaption>
            </SpotCard>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Contact / CTA                                                      */
/* ------------------------------------------------------------------ */

function Contact() {
  const mag = useMagnetic(0.25)
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div className="band-night relative overflow-hidden rounded-5xl">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/30 blur-[120px]" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-accent/15 blur-[120px]" />
        <div className="relative px-7 py-16 text-center sm:px-14 sm:py-20">
          <span className="label justify-center text-primary-light"><span className="h-1.5 w-1.5 rounded-full bg-primary-light" /> Let's build it</span>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-[2.3rem] font-semibold leading-[1.05] tracking-[-0.01em] sm:text-5xl text-balance">
            See your new website — <span className="italic font-normal text-primary-light">before</span> you pay a cent.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-muted">
            Tell me your business name and what you do. I'll build a real demo and send it over — free. If you love it, it's {PRICE} to launch with lifetime edits.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a ref={mag} href={MAILTO} className="btn-primary magnetic pl-7 pr-2.5 py-3.5 text-base">
              <span className="inline-flex items-center gap-2.5"><Mail size={19} /> Email me for a free demo</span>
              <span className="arrow-pill h-8 w-8"><ArrowRight size={17} strokeWidth={2.4} /></span>
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-6 py-3.5 text-base font-semibold text-background transition-colors hover:bg-white/5">
              <InstagramIcon size={18} /> Or DM on Instagram
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
            <a href={MAILTO} className="inline-flex items-center gap-1.5 font-medium text-background/90 transition-colors hover:text-primary-light">
              <Mail size={15} /> {EMAIL}
            </a>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-400 ring-pulse" /> Taking new clients now</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  const cols = [
    { title: 'Explore', links: [
      { l: 'The work', href: '#work' },
      { l: 'Process', href: '#process' },
      { l: 'What you get', href: '#services' },
      { l: `Pricing — ${PRICE}`, href: '#pricing' },
    ] },
    { title: 'Get started', links: [
      { l: 'Get a free demo', href: MAILTO, ext: true },
      { l: 'Instagram', href: INSTAGRAM, ext: true },
    ] },
    { title: 'Legal', links: [
      { l: 'Privacy', href: '/privacy', route: true },
      { l: 'Terms', href: '/terms', route: true },
    ] },
  ]
  return (
    <footer className="border-t border-divider bg-deep">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft">
              Custom websites for local service businesses. We build your demo first, free — you only pay if you love it. {PRICE} flat, lifetime edits.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-divider px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 ring-pulse" />
              <span className="font-mono text-[11px] tracking-wider text-muted">Taking new clients now</span>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((item) => (
                  <li key={item.l}>
                    {item.route ? (
                      <Link to={item.href} className="text-sm text-ink-soft transition-colors hover:text-ink">{item.l}</Link>
                    ) : (
                      <a href={item.href} target={item.ext ? '_blank' : undefined} rel={item.ext ? 'noopener noreferrer' : undefined} className="text-sm text-ink-soft transition-colors hover:text-ink">{item.l}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-divider pt-7 sm:flex-row">
          <p className="text-xs text-muted">© {new Date().getFullYear()} Apex Websites. All rights reserved.</p>
          <p className="font-mono text-[11px] tracking-wider text-muted">Designed &amp; built in-house · Reach the apex.</p>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function App() {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="relative overflow-x-hidden">
      <div className="grain" />
      <Navbar />
      <main>
        <Hero />
        <TradesMarquee />
        <Why />
        <Stats />
        <Process />
        <Work />
        <Services />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

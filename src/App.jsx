import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Menu, X, Check, Star, Zap, Gauge,
  PenTool, UtensilsCrossed, CalendarCheck, MapPin, Sparkles, Infinity as InfinityIcon, MousePointer2,
  Layers, Rocket, Quote, Globe, MessageCircle, ChevronRight, ArrowUpRight,
} from 'lucide-react'
import { SplineScene } from '@/components/ui/spline'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'

gsap.registerPlugin(ScrollTrigger)
// Don't recalc ScrollTriggers when the mobile URL bar shows/hides — prevents jumpy scrubbing.
ScrollTrigger.config({ ignoreMobileResize: true })

const GOLD = '#D4AF37'
const INSTAGRAM = 'https://www.instagram.com/apexwebsites0/'
const HANDLE = '@apexwebsites0'

/* ------------------------------------------------------------------ */
/*  Motion primitives — cursor magnetism + spotlight border tracking   */
/* ------------------------------------------------------------------ */

/* Pulls an element gently toward the cursor (real magnetic-button physics). */
function useMagnetic(strength = 0.4) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return // skip on touch
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

/* Feeds the cursor position into --mx/--my so a .spot-card border can ignite. */
function useSpotlight() {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return { ref, onMove }
}

/* A card whose gold hairline lights up under the cursor. */
function SpotlightCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const { ref, onMove } = useSpotlight()
  return (
    <Tag ref={ref} onMouseMove={onMove} className={`spot-card ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

/* Instagram brand glyph — supplied artwork, recoloured via currentColor */
function InstagramIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" />
      <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" />
    </svg>
  )
}

/* The single most-used button: order/message via Instagram.
   Cursor-magnetic, with a nested "button-in-button" trailing arrow. */
function IgButton({ children, size = 'lg', className = '', icon = 14, arrow = true }) {
  const pad = size === 'lg' ? 'pl-7 pr-3 py-2.5 text-sm' : 'pl-5 pr-2 py-2 text-sm'
  const magRef = useMagnetic(0.35)
  return (
    <a
      ref={magRef}
      href={INSTAGRAM}
      target="_blank"
      rel="noopener noreferrer"
      className={`magnetic-btn ig-gradient ig-glow flex w-full items-center justify-center gap-3 rounded-full font-semibold text-white ${pad} ${className}`}
    >
      <span className="inline-flex items-center gap-2"><InstagramIcon size={icon} /> {children}</span>
      {arrow && <span className="icon-pill"><ArrowUpRight size={15} strokeWidth={2.4} /></span>}
    </a>
  )
}

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

function Eyebrow({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-primary/90 ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
      {children}
    </span>
  )
}

function Logo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Apex Websites home">
      <img src="/apex-logo.png" alt="Apex Websites" className="h-9 w-9 rounded-md object-cover" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-[0.16em] text-ink">APEX</span>
        <span className="font-mono text-[8px] tracking-[0.42em] text-primary/80">WEBSITES</span>
      </span>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled ? 'glass gold-glow' : 'border border-transparent'
          }`}
        >
          <Logo />
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-muted transition-colors duration-200 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <IgButton size="sm" icon={15} arrow={false}>Order on Instagram</IgButton>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-deep/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-7">
          <Logo />
          <button
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mt-12 flex flex-col gap-2 px-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-divider py-4 font-display text-3xl font-semibold text-ink"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-6" onClick={() => setOpen(false)}>
            <IgButton icon={18}>Order on Instagram</IgButton>
          </div>
        </div>
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Hero — bespoke gold particle-network "apex mesh" canvas            */
/* ------------------------------------------------------------------ */

function ApexMeshCanvas() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches

    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)
    const density = isMobile ? 26000 : 16000   // higher number = fewer dots
    const maxCount = isMobile ? 46 : 96
    const linkDist = isMobile ? 108 : 140

    let w = 0, h = 0
    let points = []
    let raf = 0
    let running = true
    let lastW = -1

    const seed = () => {
      const count = Math.min(maxCount, Math.floor((w * h) / density))
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.6,
      }))
    }

    // Re-seed ONLY when width actually changes. Mobile address-bar show/hide
    // fires resize with a changed HEIGHT — reseeding there caused the glitch.
    const resize = (force) => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width; h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (force || Math.abs(w - lastW) > 1) {
        lastW = w
        seed()
      } else {
        for (const p of points) {
          if (p.x > w) p.x = w
          if (p.y > h) p.y = h
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of points) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        if (!isMobile) {
          const dx = mouse.current.x - p.x
          const dy = mouse.current.y - p.y
          const d = Math.hypot(dx, dy)
          if (d < 170 && d > 0.1) {
            p.x += (dx / d) * 0.4
            p.y += (dy / d) * 0.4
          }
        }
      }
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < linkDist) {
            ctx.strokeStyle = `rgba(212,175,55,${(1 - dist / linkDist) * 0.38})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const p of points) {
        ctx.fillStyle = 'rgba(244,215,126,0.9)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      if (running) draw()
      raf = requestAnimationFrame(loop)
    }

    resize(true)
    if (reduce) draw()
    else loop()

    let rt
    const onResize = () => {
      clearTimeout(rt)
      rt = setTimeout(() => { resize(false); if (reduce) draw() }, 160)
    }
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    // Pause the loop when the hero scrolls out of view (saves battery on mobile).
    const io = new IntersectionObserver(([entry]) => { running = entry.isIntersecting }, { threshold: 0 })
    io.observe(canvas)

    window.addEventListener('resize', onResize)
    if (!isMobile) window.addEventListener('mousemove', onMove)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(rt)
      io.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
}

function Hero() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-rev', { y: 34, autoAlpha: 0, filter: 'blur(10px)', duration: 1, stagger: 0.13 })
        .from('.hero-cta', { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, '-=0.45')
        .from('.hero-stat', { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, '-=0.3')
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden">
      {/* layered background */}
      <div className="absolute inset-0 grid-bg radial-fade" />
      <div className="absolute inset-0">
        <ApexMeshCanvas />
      </div>
      {/* big apex glyph watermark */}
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-auto -translate-x-1/2 -translate-y-[46%] opacity-[0.06]"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <path d="M50 14 L84 84 H66 L50 46 L34 84 H16 Z" stroke={GOLD} strokeWidth="0.6" />
      </svg>
      {/* aurora mesh — cinematic ambient depth */}
      <div className="aurora aurora-drift -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 bg-primary/15" />
      <div className="aurora aurora-drift left-[8%] top-[30%] h-[320px] w-[320px] bg-[#A67C1A]/20" style={{ animationDelay: '-7s' }} />
      <div className="aurora aurora-drift right-[6%] top-[44%] h-[300px] w-[300px] bg-[#962FBF]/12" style={{ animationDelay: '-14s' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-5 pt-28 pb-20 text-center">
        <div className="hero-rev">
          <Eyebrow className="justify-center">Web design studio · for restaurants &amp; local business</Eyebrow>
        </div>

        <h1 className="hero-rev mt-8 font-display text-[2.85rem] font-extrabold leading-[1.04] tracking-[-0.02em] text-balance sm:text-[4.4rem] sm:leading-[0.98] md:text-[5.25rem]">
          Websites that fill
          <br className="hidden sm:block" /> tables &amp; reach the{' '}
          <span className="gold-shimmer italic font-serif">apex</span>.
        </h1>

        <p className="hero-rev mx-auto mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-muted sm:mt-7 sm:text-lg">
          Beautiful, conversion-built websites for restaurants, cafés, salons and local businesses — menus,
          bookings and the works. Just <span className="text-ink font-medium">$100</span>, live in under a day, with
          your own custom domain and <span className="text-ink font-medium">lifetime support &amp; edits</span> included.
        </p>

        <div className="mt-9 flex w-full max-w-sm flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
          <div className="hero-cta">
            <IgButton icon={16}>Order on Instagram — $100</IgButton>
          </div>
          <a
            href="#work"
            className="hero-cta group flex items-center justify-center gap-3 rounded-full gold-border bg-white/[0.02] py-2.5 pl-7 pr-3 text-sm font-semibold text-ink transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-surface"
          >
            See what we build
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={15} strokeWidth={2.4} />
            </span>
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted sm:mt-14 sm:gap-x-8">
          <span className="hero-stat inline-flex items-center gap-2">
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-primary text-primary" />
              ))}
            </span>
            4.9 average rating
          </span>
          <span className="hero-stat inline-flex items-center gap-2"><Check size={14} className="text-primary" /> 240+ local businesses online</span>
          <span className="hero-stat inline-flex items-center gap-2"><Zap size={14} className="text-primary" /> Live in under 24 hours</span>
          <span className="hero-stat inline-flex items-center gap-2"><InfinityIcon size={14} className="text-primary" /> Lifetime support</span>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Marquee trust strip                                                */
/* ------------------------------------------------------------------ */

function Marquee() {
  const items = [
    'FULLY CUSTOM', 'ONLINE MENUS', 'RESERVATIONS', 'JUST $100', 'CUSTOM DOMAIN', 'LOCAL SEO',
    'LIFETIME SUPPORT', 'LIVE IN UNDER A DAY', 'FREE EDITS', 'GOOGLE-READY',
  ]
  const row = [...items, ...items]
  return (
    <section className="border-y border-divider bg-deep py-5">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee gap-10">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-10 font-mono text-xs tracking-[0.28em] text-muted">
              {t}
              <span className="text-primary/50">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Features — 3 interactive cards                                     */
/* ------------------------------------------------------------------ */

function ShuffleCard() {
  const [order, setOrder] = useState([0, 1, 2])
  useEffect(() => {
    const id = setInterval(() => setOrder((o) => [o[2], o[0], o[1]]), 2200)
    return () => clearInterval(id)
  }, [])
  const shots = [
    { tag: 'Restaurant site', bar: 'w-3/4' },
    { tag: 'Online menu', bar: 'w-1/2' },
    { tag: 'Bookings', bar: 'w-2/3' },
  ]
  return (
    <div className="relative h-44 [perspective:1000px]">
      {order.map((idx, pos) => (
        <div
          key={idx}
          className="absolute left-1/2 top-2 h-36 w-[78%] -translate-x-1/2 rounded-xl border border-divider bg-surface-2 p-3 transition-all duration-700 ease-out"
          style={{
            transform: `translate(-50%, ${pos * 14}px) scale(${1 - pos * 0.07})`,
            zIndex: 10 - pos,
            opacity: 1 - pos * 0.22,
          }}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent/40" />
            <span className="h-2 w-2 rounded-full bg-accent/40" />
            <span className="h-2 w-2 rounded-full bg-primary/60" />
            <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-muted">{shots[idx].tag}</span>
          </div>
          <div className="mt-3 h-10 rounded-md bg-gradient-to-br from-primary/25 to-transparent" />
          <div className={`mt-2 h-2 rounded-full bg-primary/50 ${shots[idx].bar}`} />
          <div className="mt-1.5 h-2 w-1/3 rounded-full bg-muted/30" />
        </div>
      ))}
    </div>
  )
}

function CodeRainCard() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const glyphs = '01<>/{}=$#●▲'
    const cols = 11
    el.innerHTML = ''
    const spans = []
    for (let i = 0; i < cols; i++) {
      const s = document.createElement('span')
      s.style.cssText = `position:absolute;top:-20px;left:${(i / cols) * 100}%;font-family:'JetBrains Mono',monospace;font-size:11px;color:${GOLD};`
      el.appendChild(s)
      spans.push(s)
    }
    let raf
    const state = spans.map(() => ({ y: Math.random() * -160, sp: 0.6 + Math.random() * 1.4 }))
    const tick = () => {
      spans.forEach((s, i) => {
        state[i].y += state[i].sp
        if (state[i].y > 180) { state[i].y = -20; state[i].sp = 0.6 + Math.random() * 1.4 }
        s.style.transform = `translateY(${state[i].y}px)`
        s.style.opacity = String(0.25 + Math.random() * 0.6)
        s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)]
      })
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div className="relative h-44 overflow-hidden rounded-xl border border-divider bg-deep">
      <div ref={ref} className="absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full glass px-4 py-2 font-mono text-2xl font-bold text-primary">98<span className="text-sm text-muted">/100</span></div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-deep to-transparent" />
    </div>
  )
}

function SchedulerCard() {
  const days = ['9a', '11a', '1p', '4p', 'Live']
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % 5), 1100)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative h-44 rounded-xl border border-divider bg-surface-2 p-4">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted">Launch timeline</div>
      <div className="mt-4 flex items-end justify-between gap-2">
        {days.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={`w-full rounded-md transition-all duration-500 ${i <= active ? 'bg-primary' : 'bg-divider'}`}
              style={{ height: `${20 + i * 14}px` }}
            />
            <span className={`font-mono text-[10px] ${i === active ? 'text-primary' : 'text-muted'}`}>{d}</span>
          </div>
        ))}
      </div>
      <MousePointer2
        size={18}
        className="absolute text-ink transition-all duration-500 drop-shadow"
        style={{ left: `${14 + active * 17}%`, bottom: `${28 + active * 12}px` }}
      />
      <div className="mt-3 flex items-center gap-1.5 text-xs text-primary">
        <Rocket size={13} /> Live in under 24 hours
      </div>
    </div>
  )
}

function Features() {
  const root = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feat-card', {
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
        y: 48, autoAlpha: 0, filter: 'blur(8px)', duration: 0.9, stagger: 0.15, ease: 'power3.out',
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const cards = [
    { Comp: ShuffleCard, icon: Layers, title: '100% custom design', body: 'No templates. Every site is built from scratch around your venue — mouth-watering photos, clear menus, and zero clutter.' },
    { Comp: CodeRainCard, icon: Gauge, title: 'Engineered for speed', body: 'Hand-tuned code and modern stacks ship 90+ Lighthouse scores. Fast sites rank higher on Google and get more bookings.' },
    { Comp: SchedulerCard, icon: Rocket, title: 'Live in under a day', body: 'Send one DM on Instagram and we get you online fast — most custom sites go live within 24 hours, domain and all.' },
  ]

  return (
    <section ref={root} className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div className="max-w-2xl">
        <Eyebrow>Why Apex</Eyebrow>
        <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
          A website should work as hard as your kitchen.
        </h2>
        <p className="mt-4 text-muted">
          We blend strategy, design, and engineering into one tight team — so the result looks premium and brings real customers through the door.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cards.map(({ Comp, icon: Icon, title, body }) => (
          <SpotlightCard key={title} className="feat-card bezel transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5">
            <div className="bezel-core p-5">
              <Comp />
              <div className="mt-5 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={17} />
                </span>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{body}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Pillars — animated count-up stats                                  */
/* ------------------------------------------------------------------ */

function CountUp({ to, suffix = '', decimals = 0 }) {
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
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>
}

function Pillars() {
  const stats = [
    { to: 240, suffix: '+', label: 'Websites designed & shipped', sub: 'Restaurants, cafés & local trades' },
    { to: 98, suffix: '', label: 'Average Lighthouse score', sub: 'Speed your customers feel' },
    { to: 24, suffix: 'h', label: 'Average time to launch', sub: 'Most sites live the same day' },
  ]
  return (
    <section className="border-y border-divider bg-deep">
      <div className="mx-auto grid max-w-6xl gap-px overflow-hidden sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-background px-6 py-14 text-center">
            <div className="gradient-text font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
              <CountUp to={s.to} suffix={s.suffix} />
            </div>
            <div className="mt-3 font-display text-sm font-semibold text-ink">{s.label}</div>
            <div className="mt-1 text-xs text-muted">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Process — sticky-stack scrub                                       */
/* ------------------------------------------------------------------ */

function Process() {
  const root = useRef(null)
  const steps = [
    { n: '01', title: 'Send us a DM on Instagram', body: `Message ${HANDLE} and tell us about your business and what you need — it’s a flat $100, no surprises.`, icon: InstagramIcon },
    { n: '02', title: 'We design & build it', body: 'We craft your fully custom site — menu, ordering, bookings, anything — built fast and reviewed with you until it’s exactly right.', icon: PenTool },
    { n: '03', title: 'Launch + lifetime support', body: 'We set up your own custom domain, launch your site, and stick around forever with free edits and lifetime support.', icon: Rocket },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.proc-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 16%',
            end: 'bottom 16%',
            scrub: true,
          },
          scale: 0.92,
          filter: 'blur(3px)',
          opacity: 0.35,
          ease: 'none',
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={root} className="mx-auto max-w-4xl px-5 py-20 sm:py-28">
      <div className="mb-14 text-center">
        <Eyebrow className="justify-center">How we work</Eyebrow>
        <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
          Three steps to the summit.
        </h2>
      </div>

      <div className="space-y-6">
        {steps.map(({ n, title, body, icon: Icon }) => (
          <SpotlightCard key={n} className="proc-card bezel sticky top-24 gold-glow">
            <div className="bezel-core p-8 sm:p-11">
              <div className="absolute right-7 top-6 font-display text-8xl font-extrabold text-primary/[0.08]">{n}</div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Icon size={22} />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold sm:text-3xl">{title}</h3>
              <p className="mt-3 max-w-lg text-muted">{body}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Interactive 3D — integrated Spline component                       */
/* ------------------------------------------------------------------ */

/* Lightweight CSS fallback shown instead of the heavy 3D scene on phones */
function OrbitFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute h-36 w-36 rounded-full bg-primary/20 blur-2xl" />
      <div className="absolute h-40 w-40 rounded-full border border-primary/25 animate-spin-slow" />
      <div
        className="absolute h-60 w-60 rounded-full border border-dashed border-primary/15"
        style={{ animation: 'spin 26s linear infinite reverse' }}
      />
      <svg viewBox="0 0 100 100" className="relative h-20 w-20 animate-float" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="orbitg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F4D77E" />
            <stop offset="1" stopColor="#A67C1A" />
          </linearGradient>
        </defs>
        <path d="M50 16 L82 82 H64 L50 48 L36 82 H18 Z" fill="url(#orbitg)" />
      </svg>
      <span className="absolute left-10 top-12 h-1.5 w-1.5 rounded-full bg-primary/70 animate-float" />
      <span className="absolute bottom-14 right-12 h-1 w-1 rounded-full bg-primary-light/70 animate-pulse-slow" />
    </div>
  )
}

function Interactive3D() {
  // The Spline robot is a ~2MB WebGL scene — only load it on tablet/desktop.
  const [show3D, setShow3D] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setShow3D(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div className="mb-8 max-w-2xl sm:mb-10">
        <Eyebrow>Built to feel alive</Eyebrow>
        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl text-balance">
          We don’t just build pages. We build experiences.
        </h2>
        <p className="mt-4 text-muted">
          Interactive motion and micro-interactions that make hungry visitors stop scrolling — and remember your name when they’re deciding where to eat.
        </p>
      </div>

      <Card className="relative w-full overflow-hidden border-divider bg-black/[0.96] md:h-[520px]">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#D4AF37" />
        <div className="flex h-full flex-col md:flex-row">
          {/* Copy */}
          <div className="relative z-10 flex flex-1 flex-col justify-center p-7 sm:p-10">
            <h3 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text font-display text-2xl font-bold text-transparent sm:text-4xl">
              Interactive by design
            </h3>
            <p className="mt-4 max-w-md text-[15px] text-neutral-300 sm:text-base">
              Immersive 3D scenes, scroll-driven storytelling, and tactile motion — the kind of detail that turns a
              first-time visitor into a regular who remembers your venue.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 sm:mt-7">
              {['3D & WebGL', 'Scroll motion', 'Micro-interactions'].map((t) => (
                <span key={t} className="rounded-full border border-primary/25 px-3 py-1.5 font-mono text-[11px] tracking-wider text-primary">
                  {t}
                </span>
              ))}
            </div>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3 sm:mt-8">
              <InstagramIcon size={15} /> Bring my brand to life
            </a>
          </div>
          {/* 3D scene (desktop) or fallback (mobile) */}
          <div className="relative h-64 w-full md:h-full md:flex-1">
            {show3D ? (
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="h-full w-full"
              />
            ) : (
              <OrbitFallback />
            )}
          </div>
        </div>
      </Card>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Services grid                                                      */
/* ------------------------------------------------------------------ */

function Services() {
  const root = useRef(null)
  const services = [
    { icon: PenTool, title: '100% Custom Web Design', body: 'No templates, ever. Bespoke, appetite-driving websites built from a blank canvas around your venue and brand.' },
    { icon: UtensilsCrossed, title: 'Online Menus & Ordering', body: 'Beautiful digital menus and ordering that send hungry customers straight to checkout — or your kitchen.' },
    { icon: CalendarCheck, title: 'Reservations & Bookings', body: 'Let guests reserve a table or book an appointment in seconds, right from their phone — no phone tag.' },
    { icon: MapPin, title: 'Local SEO & Google', body: 'Show up when locals search “near me.” Google Business, maps, and reviews dialled in so they find you first.' },
    { icon: Sparkles, title: 'Branding & Identity', body: 'Logos, colour systems, and visual identity that make your spot look established, trusted, and worth visiting.' },
    { icon: InfinityIcon, title: 'Lifetime Support & Edits', body: 'New menu, new hours, new photos? Just send a DM. Free edits and support for the life of your site.' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
        y: 34, autoAlpha: 0, filter: 'blur(6px)', duration: 0.6, stagger: 0.07, ease: 'power2.out',
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={root} className="border-y border-divider bg-deep">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <Eyebrow>What we do</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Everything your business needs to win locally.
            </h2>
          </div>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
            <InstagramIcon size={15} /> Order yours on Instagram
          </a>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-divider bg-divider sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, body }) => (
            <SpotlightCard key={title} className="svc-tile group cursor-pointer bg-background p-7 transition-colors duration-500 hover:bg-surface">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-primary group-hover:text-background group-hover:-translate-y-0.5">
                  <Icon size={20} />
                </div>
                <ArrowUpRight size={18} className="text-muted transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Pricing                                                            */
/* ------------------------------------------------------------------ */

function Pricing() {
  const features = [
    '100% custom design — no templates',
    'Online menu, ordering or bookings built in',
    'Your own custom domain, set up for you',
    'Mobile-first & lightning fast (90+ Lighthouse)',
    'Local SEO & Google Business ready',
    'Live in under 24 hours',
    'Lifetime support & free edits, forever',
  ]
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div className="mb-14 text-center">
        <Eyebrow className="justify-center">One simple price</Eyebrow>
        <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
          One flat price. <span className="gradient-text">Everything included.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          No packages, no upsells, no surprises. A complete, fully custom website — built, launched, and supported for life.
        </p>
      </div>

      <div className="mx-auto max-w-md">
        <div className="conic-ring relative flex flex-col rounded-[2rem] bg-surface p-9 gold-glow ring-1 ring-primary/30">
          <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-primary px-4 py-1 font-mono text-[10px] uppercase tracking-widest text-background shadow-[0_8px_24px_-6px_rgba(212,175,55,0.7)]">
            Everything, for every venue
          </span>
          <div className="text-center">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">The Apex Site</div>
            <div className="mt-4 flex items-end justify-center gap-1">
              <span className="font-display text-6xl font-extrabold gradient-text">$100</span>
              <span className="mb-2 text-sm text-muted">one-time</span>
            </div>
            <div className="mt-1 text-sm text-muted">Custom domain &amp; lifetime support included</div>
          </div>
          <div className="my-7 h-px bg-divider" />
          <ul className="space-y-3.5">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-ink/90">
                <Check size={16} className="mt-0.5 shrink-0 text-primary" /> {f}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <IgButton icon={16}>Order on Instagram — $100</IgButton>
          </div>
          <p className="mt-3 text-center text-xs text-muted">DM us {HANDLE} and we’ll get started.</p>
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
    { q: 'I sent one DM at night and had a stunning custom site for my restaurant live the next day. For $100 it’s unreal — and they still do my edits for free.', name: 'Priya Shah', role: 'Owner, Saffron Kitchen' },
    { q: 'Our café finally has online ordering that actually looks good. Pickup orders are up 40% and the site loads instantly.', name: 'Marco Bianchi', role: 'Owner, Crema Coffee House' },
    { q: 'Booked solid since the new site went up. Easiest process ever — I just messaged them on Instagram, told them what I wanted, done.', name: 'Daniel Okafor', role: 'Director, NorthStar Dental' },
  ]
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tst-card', {
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
        y: 36, autoAlpha: 0, filter: 'blur(6px)', duration: 0.7, stagger: 0.12, ease: 'power2.out',
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} className="border-y border-divider bg-deep">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="mb-12 text-center">
          <Eyebrow className="justify-center">Loved by business owners</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
            Results our clients can measure.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {quotes.map((t) => (
            <SpotlightCard as="figure" key={t.name} className="tst-card flex flex-col rounded-2xl border border-divider bg-surface p-7 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
              <Quote size={26} className="text-primary/50" />
              <div className="mt-3 flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-primary text-primary" />)}
              </div>
              <blockquote className="mt-4 flex-1 text-pretty text-[15px] leading-relaxed text-ink/90">“{t.q}”</blockquote>
              <figcaption className="mt-6 border-t border-divider pt-4">
                <div className="font-display text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted">{t.role}</div>
              </figcaption>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

function Contact() {
  const ctaRef = useMagnetic(0.3)
  const steps = [
    { icon: InstagramIcon, title: 'Send us a DM', body: `Tap the button below to open our Instagram and message ${HANDLE} — it’s free and takes a few seconds.` },
    { icon: MessageCircle, title: 'Tell us what you need', body: 'Share your business and what you want. Pay your $100 right there in the chat — no forms, no calls.' },
    { icon: Rocket, title: 'We build & launch', body: 'We design your custom site, set up your domain, and get you live — usually within 24 hours.' },
  ]

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <div className="relative overflow-hidden rounded-4xl border border-divider bg-surface">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-[120px]" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#D62976]/15 blur-[120px]" />
        <div className="relative grid-bg p-9 text-center sm:p-14">
          <div className="flex justify-center">
            <Eyebrow>Get started</Eyebrow>
          </div>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
            Everything happens on <span className="ig-text">Instagram.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            No forms, no back-and-forth emails. DM us on Instagram, tell us what you need, and we’ll take it from there —
            your custom site is just $100 with lifetime support.
          </p>

          {/* Steps */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="relative rounded-2xl border border-divider bg-background/60 p-6 text-left">
                <span className="absolute right-4 top-3 font-display text-4xl font-extrabold text-primary/10">{i + 1}</span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <a
            ref={ctaRef}
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn ig-gradient ig-glow mx-auto mt-12 inline-flex w-fit items-center gap-3 rounded-full py-3 pl-8 pr-3.5 text-base font-semibold text-white"
          >
            <span className="inline-flex items-center gap-2.5"><InstagramIcon size={20} /> Message us on Instagram</span>
            <span className="icon-pill h-8 w-8"><ArrowUpRight size={17} strokeWidth={2.4} /></span>
          </a>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted">
            <span>Or find us at</span>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-ink transition-colors hover:text-primary"
            >
              <InstagramIcon size={16} /> {HANDLE}
            </a>
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
    { title: 'What we do', links: [
      { l: 'Custom Web Design', href: '#services' },
      { l: 'Online Menus & Ordering', href: '#services' },
      { l: 'Local SEO & Google', href: '#services' },
      { l: 'Lifetime Support', href: '#services' },
    ] },
    { title: 'Explore', links: [
      { l: 'Our Work', href: '#work' },
      { l: 'Process', href: '#process' },
      { l: 'Pricing — $100', href: '#pricing' },
    ] },
    { title: 'Legal', links: [
      { l: 'Privacy', href: '/privacy', route: true },
      { l: 'Terms', href: '/terms', route: true },
    ] },
  ]
  return (
    <footer className="border-t border-divider bg-deep">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Fully custom web design for restaurants, cafés &amp; local businesses — just $100, your own domain, lifetime support. Everything starts with a DM on Instagram.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-divider px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 ring-pulse" />
              <span className="font-mono text-[11px] tracking-wider text-muted">Taking new orders now</span>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-divider text-muted transition-colors hover:border-primary/40 hover:text-primary"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-muted transition-colors hover:text-ink"
              >
                {HANDLE}
              </a>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((item) => (
                  <li key={item.l}>
                    {item.route ? (
                      <Link to={item.href} className="text-sm text-muted transition-colors hover:text-ink">{item.l}</Link>
                    ) : (
                      <a href={item.href} className="text-sm text-muted transition-colors hover:text-ink">{item.l}</a>
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
    // refresh ScrollTrigger after layout settles (fonts/images)
    const id = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="relative overflow-x-hidden">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <Pillars />
        <Process />
        <Interactive3D />
        <Services />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

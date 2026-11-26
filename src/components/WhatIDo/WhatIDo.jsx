import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { hero, services } from './data'
import './whatIDo.css'

gsap.registerPlugin(ScrollTrigger)

// Global config: prevent iOS rubber-band / address-bar resize from firing ST recalcs
ScrollTrigger.config({ ignoreMobileResize: true })

const Scene = lazy(() => import('./Scene'))

function webglOK() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function WhatIDo() {
  const root = useRef(null)
  const progress = useRef(0)
  const [mode, setMode] = useState('pending')
  const [inView, setInView] = useState(true)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setMode(reduce || !webglOK() ? 'static' : '3d')
  }, [])

  // Render loop only runs while the section is near the screen
  useEffect(() => {
    if (mode !== '3d') return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '200px' })
    if (root.current) io.observe(root.current)
    return () => io.disconnect()
  }, [mode])

  useLayoutEffect(() => {
    if (mode !== '3d' || !root.current) return

    const navH = () => document.querySelector('.header')?.offsetHeight || 74

    // Use gsap.matchMedia to split desktop (pinned) vs mobile (simple fade-up)
    const mm = gsap.matchMedia()

    // ── DESKTOP ≥ 768px: existing pinned scrub timeline ─────────────────────
    mm.add('(min-width: 768px)', () => {
      // Ensure no ancestor has overflow:hidden that breaks sticky/pinning
      const restored = []
      for (let el = root.current.parentElement; el; el = el.parentElement) {
        const cs = getComputedStyle(el)
        const bad = [cs.overflowX, cs.overflowY].some((v) => ['hidden', 'auto', 'scroll'].includes(v))
        const scroller = el !== document.body && el !== document.documentElement && el.scrollHeight > el.clientHeight + 5
        if (bad && !scroller) {
          restored.push([el, el.style.overflowX, el.style.overflowY])
          el.style.overflowX = 'clip'
          el.style.overflowY = 'visible'
        }
      }

      const ctx = gsap.context(() => {
        const q = gsap.utils.selector(root.current)

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: () => `top ${navH()}px`,
            end: '+=500%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              progress.current = self.progress
            },
          },
        })

        tl.to(q('.wid-row1'), {
          yPercent: -130,
          opacity: 0,
          duration: 0.14,
          ease: 'power1.inOut',
        }, 0)
        .to({}, { duration: 0.86 }, 0.14)

        document.fonts?.ready.then(() => ScrollTrigger.refresh())
      }, root)

      return () => {
        ctx.revert()
        restored.forEach(([el, x, y]) => {
          el.style.overflowX = x
          el.style.overflowY = y
        })
      }
    })

    // ── MOBILE < 768px: no pin, no scrub — simple vertical stack ────────────
    mm.add('(max-width: 767px)', () => {
      // On mobile we don't use the 3D canvas; animate the mobile cards directly.
      // The mobile cards are rendered by the JSX below when isMobile is detected.
      // We just need a ScrollTrigger for the section heading.
      const ctx = gsap.context(() => {
        const q = gsap.utils.selector(root.current)

        // Fade up the header once
        gsap.from(q('.wid-row1'), {
          opacity: 0,
          y: 32,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: q('.wid-row1'),
            start: 'top 88%',
            once: true,
          },
        })

        // Fade up each mobile card once
        q('.wid-mobile-card').forEach((card, i) => {
          gsap.from(card, {
            opacity: 0,
            y: 48,
            duration: 0.55,
            ease: 'power2.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true,
            },
          })
        })
      }, root)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [mode])

  // ── STATIC fallback (reduced-motion / no WebGL) ──────────────────────────
  if (mode === 'static') {
    return (
      <section ref={root} id="services" className="wid wid--static" aria-label="What I do">
        <div className="wid-pinned wid-pinned--static">
          <div className="wid-row1">
            <div className="wid-head">
              <p className="wid-label"><span>{hero.label}</span></p>
              <h2 className="wid-title">
                Building scalable <br />
                backends into <em>{hero.headlineEm}</em>{hero.headlineAfter}
              </h2>
            </div>
          </div>

          <div className="wid-stage">
            <ul className="wid-static-list">
              {services.map((s, i) => (
                <li key={s.id} className="wid-item is-active">
                  <div className="wid-meta"><span>/ 0{i + 1}</span><i /></div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    )
  }

  // ── MOBILE 3D-capable: render plain vertical card stack ──────────────────
  if (mode === '3d' && isMobile) {
    return (
      <section ref={root} id="services" className="wid wid--mobile-stack" aria-label="What I do">
        <div className="wid-row1">
          <div className="wid-head">
            <div className="wid-label">
              <span>{hero.label}</span>
            </div>
            <h2 className="wid-title">
              Building scalable <br />
              backends into <em>{hero.headlineEm}</em>{hero.headlineAfter}
            </h2>
          </div>
        </div>

        <ul className="wid-mobile-list" aria-label="Services">
          {services.map((s, i) => (
            <li key={s.id} className="wid-mobile-card">
              <div className="wid-meta"><span>/ 0{i + 1}</span><i /></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  // ── DESKTOP 3D canvas ────────────────────────────────────────────────────
  return (
    <section ref={root} id="services" className="wid" aria-label="What I do">
      <div className="wid-pinned">
        {/* Full-Page Stage: 3D canvas fills the entire screen */}
        <div className="wid-stage">
          {mode === '3d' && (
            <div className="wid-canvas">
              <Suspense fallback={null}>
                <Scene progress={progress} active={inView} isMobile={false} />
              </Suspense>
            </div>
          )}
          <div className="wid-vignette" />
        </div>

        {/* Heading: Eyebrow and Heading at top, smoothly slides up out of view on scroll */}
        <div className="wid-row1">
          <div className="wid-head">
            <div className="wid-label">
              <span>{hero.label}</span>
            </div>
            <h2 className="wid-title">
              Building scalable <br />
              backends into <em>{hero.headlineEm}</em>{hero.headlineAfter}
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

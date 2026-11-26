import { useEffect, useRef } from "react";
import "./ServicesMobile.css";

const MOBILE_SERVICES = [
  {
    id: "fullstack",
    num: "/ 01",
    title: "Full-Stack Web Apps",
    desc: "Complete web products with Laravel and React, from the MySQL database and REST APIs to a clean, responsive interface.",
    tags: ["Laravel", "React", "MySQL"],
  },
  {
    id: "backend",
    num: "/ 02",
    title: "Backend and REST APIs",
    desc: "Secure Laravel and PHP backends with well-structured MySQL schemas and clean REST APIs.",
    tags: ["PHP", "Sanctum", "REST"],
  },
  {
    id: "realtime",
    num: "/ 03",
    title: "Real-time Systems",
    desc: "Live chat, events and calling with Laravel Reverb, WebSockets and WebRTC.",
    tags: ["Reverb", "WebSockets", "WebRTC"],
  },
  {
    id: "payments",
    num: "/ 04",
    title: "SaaS and Invoicing Platforms",
    desc: "SaaS-style products such as invoicing platforms, with role-based access control from the database to the interface.",
    tags: ["Multi-tenant", "RBAC", "Stripe"],
  },
];

export default function ServicesMobile() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll(".sm-reveal"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleBatch = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => items.indexOf(a.target) - items.indexOf(b.target));

        visibleBatch.forEach((entry, idx) => {
          entry.target.style.transitionDelay = `${idx * 110}ms`;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="sm-section"
      aria-label="What I do"
    >
      <header className="sm-header sm-reveal">
        <p className="sm-eyebrow">WHAT I DO</p>
        <h2 className="sm-title">
          Building scalable backends into <em>reality</em>.
        </h2>
      </header>

      <ul className="sm-list" aria-label="Services">
        {MOBILE_SERVICES.map((item) => (
          <li key={item.id} className="sm-card sm-reveal">
            <div className="sm-card-top">
              <span className="sm-num">{item.num}</span>
              <span className="sm-dot" aria-hidden="true" />
            </div>
            <h3 className="sm-card-title">{item.title}</h3>
            <p className="sm-card-desc">{item.desc}</p>
            <ul className="sm-tags" aria-label={`${item.title} technologies`}>
              {item.tags.map((tag) => (
                <li key={tag} className="sm-tag">
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

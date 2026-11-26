import { useEffect, useRef } from "react";
import "./FrameBackground.css";

const TOTAL_FRAMES = 190;
const END_ID = "services";

function getFrameUrl(index) {
  const n = String(index + 1).padStart(3, "0");
  return `/frames/ezgif-frame-${n}.webp`;
}

export default function FrameBackground() {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const images = new Array(TOTAL_FRAMES);
    const loaded = new Uint8Array(TOTAL_FRAMES);

    let targetProgress = 0;
    let currentProgress = 0;
    let lastRenderedFrame = -1;
    let needsRedraw = true;
    let animId = 0;

    // Quality: Canvas sized to innerWidth/innerHeight x devicePixelRatio (capped at 2.0 on mobile, 2.5 on desktop)
    const resizeCanvas = () => {
      const isMobile =
        window.innerWidth <= 768 ||
        (window.innerWidth / window.innerHeight < 1.0 && window.innerWidth <= 1024);
      const maxDpr = isMobile ? 2.0 : 2.5;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      needsRedraw = true;
      if (lastRenderedFrame !== -1) {
        drawFrame(lastRenderedFrame);
      }
    };

    // Find current or nearest loaded image to prevent flickering
    const getLoadedImage = (idx) => {
      if (loaded[idx]) return images[idx];

      let bestIdx = -1;
      let bestDist = Infinity;

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (loaded[i]) {
          const dist = Math.abs(i - idx);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = i;
          }
        }
      }

      return bestIdx !== -1 ? images[bestIdx] : null;
    };

    // Draw frame: on mobile uses custom top-anchored layout with face centering and bottom fade;
    // on desktop uses cover-fit with watermark cropping.
    const drawFrame = (idx) => {
      const img = getLoadedImage(idx);
      if (!img || !img.naturalWidth) return false;

      const cw = canvas.width;
      const ch = canvas.height;
      if (!cw || !ch) return false;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const isMobile =
        window.innerWidth <= 768 ||
        (window.innerWidth / window.innerHeight < 1.0 && window.innerWidth <= 1024);

      if (isMobile) {
        // 1. Fill entire canvas with dark background #09050b first
        ctx.fillStyle = "#09050b";
        ctx.fillRect(0, 0, cw, ch);

        // 2. Scale frame so height is about 58% of canvas height, keeping aspect ratio
        const scale = (ch * 0.58) / ih;
        const dw = iw * scale;
        const dh = ch * 0.58;

        // 3. Center horizontally on face (around 51.5% of frame width)
        const dx = cw / 2 - dw * 0.515;

        // 4. Place near top, just below navbar: dy = ch * 0.07
        const dy = ch * 0.07;

        // 5. Draw full uncropped frame: face completely visible (both eyes, full head, shoulders)
        ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);

        // 6. Fade bottom edge of picture into dark background with vertical gradient
        //    (transparent at about 45% canvas height to #09050b at about 66%)
        const grad = ctx.createLinearGradient(0, ch * 0.45, 0, ch * 0.66);
        grad.addColorStop(0, "rgba(9, 5, 11, 0)");
        grad.addColorStop(1, "#09050b");
        ctx.fillStyle = grad;
        ctx.fillRect(0, ch * 0.45, cw, ch * 0.21);

        // 7. Solid #09050b below 66% canvas height
        ctx.fillStyle = "#09050b";
        ctx.fillRect(0, ch * 0.66 - 1, cw, ch - ch * 0.66 + 2);

        // 8. Soft side fades if photo does not span entire width (e.g. landscape mobile)
        if (dx > 0) {
          const leftGrad = ctx.createLinearGradient(dx, 0, dx + dw * 0.08, 0);
          leftGrad.addColorStop(0, "#09050b");
          leftGrad.addColorStop(1, "rgba(9, 5, 11, 0)");
          ctx.fillStyle = leftGrad;
          ctx.fillRect(dx - 1, dy, dw * 0.08 + 2, dh);

          const rightGrad = ctx.createLinearGradient(dx + dw - dw * 0.08, 0, dx + dw, 0);
          rightGrad.addColorStop(0, "rgba(9, 5, 11, 0)");
          rightGrad.addColorStop(1, "#09050b");
          ctx.fillStyle = rightGrad;
          ctx.fillRect(dx + dw - dw * 0.08 - 1, dy, dw * 0.08 + 2, dh);
        }

        return true;
      }

      // DESKTOP: (screens > 768px): Exact existing cover-fit with top watermark crop
      const sx = 0;
      const sy = Math.round(ih * 0.089);
      const sw = iw;
      const sh = ih - sy;

      const canvasRatio = cw / ch;
      const imageRatio = sw / sh;

      let dw, dh, dx, dy;

      if (canvasRatio > imageRatio) {
        dw = cw;
        dh = cw / imageRatio;
        dx = 0;
        dy = (ch - dh) / 2;
      } else {
        dh = ch;
        dw = ch * imageRatio;
        dx = (cw - dw) / 2;
        dy = (ch - dh) * 0.22;
      }

      dy += ch * 0.11;
      dy = Math.max(ch - dh, Math.min(0, dy));

      ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
      return true;
    };

    // Animation runs through Hero, About, and ALL of "What I do" (including its 500% pin),
    // and becomes static (freezes on frame 190) once "What I do" ends and Projects begins.
    const calculateProgress = () => {
      const scrollY = window.scrollY;
      let endScroll = 0;

      // The true end of "What I do" is the top of the next section (#skills-root or #skills)
      // which sits below GSAP's pin-spacer in the document flow.
      const nextSection =
        document.getElementById("skills-root") ||
        document.getElementById("skills") ||
        document.getElementById("projects-root") ||
        document.getElementById("projects");
      if (nextSection) {
        const nextTop = nextSection.getBoundingClientRect().top + scrollY;
        endScroll = nextTop - window.innerHeight;
      }

      // Fallback: check pin-spacer of #services
      if (endScroll <= 0) {
        const servicesEl = document.getElementById(END_ID);
        const pinSpacer = servicesEl?.closest(".pin-spacer") || servicesEl?.parentElement;
        if (pinSpacer && pinSpacer !== document.body) {
          const spacerBottom = pinSpacer.getBoundingClientRect().bottom + scrollY;
          endScroll = spacerBottom - window.innerHeight;
        }
      }

      // Fallback: unpinned #services or scrollable height
      if (endScroll <= 0) {
        const endSection = document.getElementById(END_ID) || document.getElementById("services-root");
        if (endSection) {
          const rect = endSection.getBoundingClientRect();
          endScroll = rect.bottom + scrollY - window.innerHeight;
        }
      }

      if (endScroll <= 0) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        endScroll = maxScroll > 0 ? maxScroll : 1;
      }

      // Clamped 0 to 1: stays static at 1 (final frame) after "What I do" ends
      return Math.min(1, Math.max(0, scrollY / endScroll));
    };

    // Always compute from calculateProgress() (ignore any e.progress from other scroll libraries)
    const handleScroll = () => {
      targetProgress = calculateProgress();
    };

    // Dynamic readability overlay on mobile: smoothly darkens background as user scrolls past hero
    const updateMobileOverlay = () => {
      if (!overlayRef.current) return;
      const isMobile =
        window.innerWidth <= 768 ||
        (window.innerWidth / window.innerHeight < 1.0 && window.innerWidth <= 1024);
      if (isMobile) {
        const scrollY = window.scrollY;
        const maxScroll = window.innerHeight * 0.9;
        const opacity = Math.min(0.7, Math.max(0, (scrollY / (maxScroll || 1)) * 0.7));
        overlayRef.current.style.opacity = opacity.toFixed(3);
      } else {
        overlayRef.current.style.opacity = "0";
      }
    };

    // Animation Loop with lerp for silky smooth transitions
    const tick = () => {
      updateMobileOverlay();

      currentProgress += (targetProgress - currentProgress) * 0.12;

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1)))
      );

      if (frameIndex !== lastRenderedFrame || needsRedraw) {
        const ok = drawFrame(frameIndex);
        if (ok) {
          lastRenderedFrame = frameIndex;
          needsRedraw = false;
        }
      }

      animId = requestAnimationFrame(tick);
    };

    // Load single frame helper
    const loadSingleFrame = (i) => {
      return new Promise((resolve) => {
        if (images[i] && loaded[i]) return resolve(images[i]);

        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          images[i] = img;
          loaded[i] = 1;
          needsRedraw = true;
          if (lastRenderedFrame === -1) {
            drawFrame(i);
            lastRenderedFrame = i;
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    };

    // Staged eager preloader:
    // 1. Frame 1 first immediately
    // 2. Keyframes spaced out for instant scrub readiness
    // 3. Batch preload all remaining frames
    const preloadAllFrames = async () => {
      // 1. First frame immediately
      const firstImg = await loadSingleFrame(0);
      if (firstImg) {
        drawFrame(0);
        lastRenderedFrame = 0;
        needsRedraw = false;
      }

      // 2. Keyframes spaced out every 5 frames
      const keyframes = [];
      for (let i = 4; i < TOTAL_FRAMES; i += 5) {
        keyframes.push(loadSingleFrame(i));
      }
      await Promise.all(keyframes);

      // 3. Remaining frames in batches
      const batchSize = 16;
      const remaining = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!loaded[i]) {
          remaining.push(i);
        }
      }

      for (let b = 0; b < remaining.length; b += batchSize) {
        const chunk = remaining.slice(b, b + batchSize);
        await Promise.all(chunk.map((idx) => loadSingleFrame(idx)));
      }
    };

    const onResize = () => {
      resizeCanvas();
      handleScroll();
      updateMobileOverlay();
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Connect to Lenis smooth scroll if available (always call handleScroll)
    if (window.lenis) {
      window.lenis.on("scroll", handleScroll);
    }

    resizeCanvas();
    updateMobileOverlay();
    targetProgress = calculateProgress();
    currentProgress = targetProgress;
    preloadAllFrames();
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", handleScroll);
      if (window.lenis) {
        window.lenis.off("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="fb-root" aria-hidden="true">
      <canvas ref={canvasRef} className="fb-canvas" />
      <div className="fb-shade" />
      <div ref={overlayRef} className="fb-scroll-overlay" />
    </div>
  );
}

const header = document.querySelector("[data-header]");
const revealNodes = document.querySelectorAll(".reveal");
const videos = document.querySelectorAll("video");
const contactForm = document.querySelector("[data-contact-form]");
const membrane = document.querySelector("[data-membrane]");
const membraneCanvas = document.querySelector("[data-membrane-canvas]");
const membraneRevealNodes = document.querySelectorAll("[data-membrane] [data-reveal]");
const hero = document.querySelector("[data-hero]");
const heroFrame = document.querySelector("[data-hero-frame]");
const heroCopy = document.querySelector("[data-hero-copy]");
const heroEyebrow = document.querySelector("[data-hero-eyebrow]");
const heroTitle = document.querySelector("[data-hero-title]");
const heroLead = document.querySelector("[data-hero-lead]");
const heroSide = document.querySelector("[data-hero-side]");
const heroActions = document.querySelectorAll("[data-hero-actions] .button");
const heroCue = document.querySelector("[data-hero-cue]");
const heroGradient = document.querySelector("[data-hero-gradient]");
const heroNoise = document.querySelector("[data-hero-noise]");
const heroVideo = document.querySelector(".hero-video");
const folio = document.querySelector("[data-folio]");
const folioTitleStrip = document.querySelector("[data-folio-title-strip]");
const folioImageStrip = document.querySelector("[data-folio-image-strip]");
const folioCursor = document.querySelector("[data-folio-cursor]");
const folioDetail = document.querySelector("[data-folio-detail]");
const folioDetailTitle = document.querySelector("[data-folio-detail-title]");
const folioDetailSummary = document.querySelector("[data-folio-detail-summary]");
const folioDetailImage = document.querySelector("[data-folio-detail-image]");
const folioCloseButtons = document.querySelectorAll("[data-folio-close]");
const folioInlineTitle = document.querySelector("[data-folio-inline-title]");
const folioInlineSummary = document.querySelector("[data-folio-inline-summary]");
const servicesGallery = document.querySelector("[data-services-gallery]");
const serviceVisuals = document.querySelectorAll("[data-service-visual]");
const servicePrevious = document.querySelector("[data-service-prev]");
const serviceNext = document.querySelector("[data-service-next]");
const serviceDetail = document.querySelector("[data-service-detail]");
const serviceDetailClose = document.querySelector("[data-service-detail-close]");
const detailTitle = document.querySelector("[data-detail-title]");
const detailMeta = document.querySelector("[data-detail-meta]");
const detailDescription = document.querySelector("[data-detail-description]");
const detailProof = document.querySelector("[data-detail-proof]");
const detailImage = document.querySelector("[data-detail-image]");
const clients = document.querySelector("#clients");
const clientsHeading = document.querySelector("[data-clients-heading]");
const clientsWords = document.querySelectorAll("[data-clients-word]");
const whyHafatScroll = document.querySelector(".why-hafat-scroll");

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const whyColors = [
  [255, 106, 26],
  [244, 180, 0],
  [122, 122, 46],
  [40, 32, 0]
];

const mixColor = (from, to, amount) => from.map((channel, index) => (
  Math.round(channel + (to[index] - channel) * amount)
));

const syncWhyHafatColor = () => {
  if (!whyHafatScroll) return;

  const rect = whyHafatScroll.getBoundingClientRect();
  const scrollable = Math.max(1, rect.height - window.innerHeight);
  const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
  const scaled = progress * (whyColors.length - 1);
  const index = Math.min(whyColors.length - 2, Math.floor(scaled));
  const localProgress = scaled - index;
  const [r, g, b] = mixColor(whyColors[index], whyColors[index + 1], localProgress);

  whyHafatScroll.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealNodes.forEach((node) => revealObserver.observe(node));

const initMembrane = () => {
  if (!membrane || !membraneCanvas) {
    return;
  }

  const ctx = membraneCanvas.getContext("2d");

  if (!ctx) {
    return;
  }

  const COLS = 50;
  const ROWS = 30;
  const SPRING = 0.025;
  const DAMPING = 0.93;
  const SPREAD = 0.18;
  const vertices = [];
  const mouse = {
    x: -9999,
    y: -9999,
    inside: false,
    pressing: false
  };
  let width = 0;
  let height = 0;
  let frameId = 0;

  const vertexIndex = (col, row) => row * COLS + col;

  const resetVertices = () => {
    vertices.length = 0;
    const xGap = width / (COLS - 1);
    const yGap = height / (ROWS - 1);

    for (let row = 0; row < ROWS; row += 1) {
      for (let col = 0; col < COLS; col += 1) {
        const x = col * xGap;
        const y = row * yGap;
        vertices.push({
          col,
          row,
          x,
          y,
          restX: x,
          restY: y,
          vx: 0,
          vy: 0,
          offsetZ: 0,
          velZ: 0
        });
      }
    }
  };

  const resizeCanvas = () => {
    const rect = membrane.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = window.devicePixelRatio || 1;

    membraneCanvas.width = Math.round(width * dpr);
    membraneCanvas.height = Math.round(height * dpr);
    membraneCanvas.style.width = `${width}px`;
    membraneCanvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    resetVertices();
  };

  const applyImpulse = (radius, strength) => {
    vertices.forEach((vertex) => {
      const dx = vertex.x - mouse.x;
      const dy = vertex.y - mouse.y;
      const dist = Math.hypot(dx, dy);

      if (dist > radius) {
        return;
      }

      const safeDist = Math.max(dist, 0.001);
      const force = (1 - dist / radius) * strength;
      vertex.vx += (dx / safeDist) * force * 0.12;
      vertex.vy += (dy / safeDist) * force * 0.12;
      vertex.velZ += force * 0.4;
    });
  };

  const updatePhysics = (time) => {
    if (mouse.inside) {
      applyImpulse(mouse.pressing ? 200 : 130, mouse.pressing ? 30 : 15);
    }

    vertices.forEach((vertex) => {
      const breathe = Math.sin(time * 0.6 + vertex.col * 0.15 + vertex.row * 0.12) * 2;
      vertex.velZ += (breathe - vertex.offsetZ) * 0.002;

      vertex.vx += (vertex.restX - vertex.x) * SPRING;
      vertex.vy += (vertex.restY - vertex.y) * SPRING;
      vertex.velZ -= vertex.offsetZ * SPRING * 1.5;

      vertex.vx *= DAMPING;
      vertex.vy *= DAMPING;
      vertex.velZ *= DAMPING;

      vertex.x += vertex.vx;
      vertex.y += vertex.vy;
      vertex.offsetZ += vertex.velZ;
    });

    const zForces = new Array(vertices.length).fill(0);

    vertices.forEach((vertex, index) => {
      const neighbors = [
        vertex.col > 0 ? vertices[vertexIndex(vertex.col - 1, vertex.row)] : null,
        vertex.col < COLS - 1 ? vertices[vertexIndex(vertex.col + 1, vertex.row)] : null,
        vertex.row > 0 ? vertices[vertexIndex(vertex.col, vertex.row - 1)] : null,
        vertex.row < ROWS - 1 ? vertices[vertexIndex(vertex.col, vertex.row + 1)] : null
      ];

      neighbors.forEach((neighbor) => {
        if (neighbor) {
          zForces[index] += (neighbor.offsetZ - vertex.offsetZ) * SPREAD;
        }
      });
    });

    vertices.forEach((vertex, index) => {
      vertex.velZ += zForces[index];
    });
  };

  const getScreenY = (vertex) => vertex.y - vertex.offsetZ * 0.3;

  const drawLines = () => {
      ctx.strokeStyle = "rgba(255,248,237,0.04)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();

    for (let row = 0; row < ROWS; row += 1) {
      for (let col = 0; col < COLS; col += 1) {
        const vertex = vertices[vertexIndex(col, row)];
        if (col < COLS - 1) {
          const right = vertices[vertexIndex(col + 1, row)];
          ctx.moveTo(vertex.x, getScreenY(vertex));
          ctx.lineTo(right.x, getScreenY(right));
        }
        if (row < ROWS - 1) {
          const down = vertices[vertexIndex(col, row + 1)];
          ctx.moveTo(vertex.x, getScreenY(vertex));
          ctx.lineTo(down.x, getScreenY(down));
        }
      }
    }

    ctx.stroke();
  };

  const drawVertices = () => {
    const cx = width / 2;
    const cy = height / 2;
    const maxDist = Math.hypot(cx, cy);
    const zoneW = width * 0.35;
    const zoneH = height * 0.35;

    vertices.forEach((vertex) => {
      const distFromCenter = Math.hypot(vertex.restX - cx, vertex.restY - cy);
      const centerFactor = Math.pow(1 - Math.min(1, (distFromCenter / maxDist) * 1.4), 1.5);
      const displacement = Math.hypot(vertex.x - vertex.restX, vertex.y - vertex.restY, vertex.offsetZ);
        let r = 130 + (245 - 130) * centerFactor;
        let g = 130 + (235 - 130) * centerFactor;
        let b = 140 + (210 - 140) * centerFactor;

      if (displacement > 3) {
        const activeBlend = Math.min(1, displacement * 0.04);
        r += (255 - r) * activeBlend;
          g += (252 - g) * activeBlend;
          b += (245 - b) * activeBlend;
      }

      const size = 1 + centerFactor + (displacement > 0.5 ? displacement * 0.05 : 0);
        const baseAlpha = 0.06 + centerFactor * 0.18;
        const activeAlpha = displacement > 0.5 ? Math.min(0.9, displacement * 0.05) : 0;
      let alpha = Math.max(baseAlpha, activeAlpha);

      if (mouse.inside) {
        const ellipseDist = ((vertex.restX - cx) / zoneW) ** 2 + ((vertex.restY - cy) / zoneH) ** 2;
        if (ellipseDist < 1) {
          const dim = (1 - ellipseDist) * 0.7;
          alpha *= 1 - dim;
        }
      }

      const screenY = getScreenY(vertex);

      if (displacement > 1.5 || centerFactor > 0.4) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.16})`;
        ctx.arc(vertex.x, screenY, size + 6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.arc(vertex.x, screenY, size, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const render = (timeStamp) => {
    const time = timeStamp / 1000;
    ctx.clearRect(0, 0, width, height);
    updatePhysics(time);
    drawLines();
    drawVertices();
    frameId = window.requestAnimationFrame(render);
  };

  const syncMouse = (event) => {
    const rect = membrane.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
    mouse.inside = true;
  };

  const handleMouseLeave = () => {
    mouse.x = -9999;
    mouse.y = -9999;
    mouse.inside = false;
    mouse.pressing = false;
  };

  const handleMouseDown = (event) => {
    syncMouse(event);
    mouse.pressing = true;
    applyImpulse(200, 30);
  };

  const handleMouseUp = () => {
    mouse.pressing = false;
  };

  resizeCanvas();
  frameId = window.requestAnimationFrame(render);

  membrane.addEventListener("mousemove", syncMouse);
  membrane.addEventListener("mouseleave", handleMouseLeave);
  membrane.addEventListener("mousedown", handleMouseDown);
  membrane.addEventListener("mouseup", handleMouseUp);
  window.addEventListener("resize", resizeCanvas);

  if (typeof window.gsap !== "undefined") {
    const { gsap } = window;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.to(membraneCanvas, {
      opacity: 1,
      duration: reduceMotion ? 0 : 2,
      ease: "power2.inOut"
    });

    gsap.to(membraneRevealNodes, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: reduceMotion ? 0 : 1,
      ease: "power4.out",
      stagger: reduceMotion ? 0 : 0.13,
      delay: reduceMotion ? 0 : 0.5
    });
  } else {
    membraneCanvas.style.opacity = "1";
    membraneRevealNodes.forEach((node) => {
      node.style.opacity = "1";
      node.style.transform = "translateY(0) scale(1)";
      node.style.filter = "blur(0px)";
    });
  }

  window.addEventListener("pagehide", () => {
    window.cancelAnimationFrame(frameId);
    membrane.removeEventListener("mousemove", syncMouse);
    membrane.removeEventListener("mouseleave", handleMouseLeave);
    membrane.removeEventListener("mousedown", handleMouseDown);
    membrane.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("resize", resizeCanvas);
  }, { once: true });
};

initMembrane();

const initHeroAnimation = () => {
  if (
    !hero ||
    !heroFrame ||
    !heroCopy ||
    !heroEyebrow ||
    !heroTitle ||
    !heroLead ||
    !heroSide ||
    !heroGradient ||
    !heroNoise ||
    !heroVideo ||
    typeof window.gsap === "undefined" ||
    typeof window.ScrollTrigger === "undefined"
  ) {
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  gsap.set(heroFrame, { transformOrigin: "50% 50%" });
  gsap.set(heroVideo, {
    opacity: 0,
    scale: 1.18,
    filter: "brightness(0.7) saturate(0.82)"
  });
  gsap.set(heroGradient, { opacity: 0.28 });
  gsap.set(heroNoise, { opacity: 0 });
  gsap.set(heroEyebrow, {
    opacity: 0,
    y: 30,
    letterSpacing: "0.42em"
  });
  gsap.set(heroTitle, {
    opacity: 0,
    yPercent: 115,
    rotate: 2,
    transformOrigin: "0% 100%"
  });
  gsap.set([heroSide, heroLead], {
    opacity: 0,
    y: 44
  });
  gsap.set(heroActions, {
    opacity: 0,
    y: 28
  });

  if (heroCue) {
    gsap.set(heroCue, {
      opacity: 0,
      y: 24
    });
  }

  const entrance = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });

  entrance
    .from(heroFrame, {
      scale: 0.965,
      y: 28,
      duration: 1.2,
      ease: "power2.out"
    })
    .to(heroVideo, {
      opacity: 1,
      scale: 1.01,
      filter: "brightness(1) saturate(1)",
      duration: 1.3
    }, 0.08)
    .to(heroGradient, {
      opacity: 1,
      duration: 1.1
    }, 0.14)
    .to(heroNoise, {
      opacity: 0.7,
      duration: 0.9
    }, 0.18)
    .to(heroEyebrow, {
      opacity: 1,
      y: 0,
      letterSpacing: "0.18em",
      duration: 0.65
    }, 0.42)
    .to(heroTitle, {
      opacity: 1,
      yPercent: 0,
      rotate: 0,
      duration: 1
    }, 0.5)
    .to(heroSide, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, 0.9)
    .to(heroLead, {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, 1.05)
    .to(heroActions, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.55
    }, 1.35);

  if (heroCue) {
    entrance.to(heroCue, {
      opacity: 1,
      y: 0,
      duration: 0.55
    }, 1.35);
  }

  const heroScroll = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  })
    .to(heroVideo, {
      scale: 1.14,
      yPercent: 5,
      ease: "none"
    }, 0)
    .to(heroCopy, {
      yPercent: 13,
      ease: "none"
    }, 0)
    .to(heroGradient, {
      opacity: 0.72,
      ease: "none"
    }, 0);

  if (heroCue) {
    heroScroll.to(heroCue, {
      opacity: 0,
      yPercent: 55,
      ease: "none"
    }, 0);
  }

  gsap.to(heroTitle, {
    color: "#ff8b4d",
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  const refreshHero = () => ScrollTrigger.refresh();

  if (heroVideo.readyState >= 3) {
    refreshHero();
  } else {
    heroVideo.addEventListener("canplay", refreshHero, { once: true });
  }

  window.addEventListener("load", refreshHero, { once: true });
};

initHeroAnimation();

const initClientsAnimation = () => {
  if (
    !clients ||
    !clientsHeading ||
    !clientsWords.length ||
    typeof window.gsap === "undefined" ||
    typeof window.ScrollTrigger === "undefined"
  ) {
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  gsap.set(clientsHeading, { opacity: 1 });
  gsap.set(clientsWords, {
    color: "rgba(255, 248, 237, 0.24)",
    opacity: 0.34,
    y: 26,
    filter: "blur(3px)"
  });

  const clientsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: clients,
      start: "top 82%",
      end: "center 42%",
      scrub: true
    }
  });

  clientsWords.forEach((word, index) => {
    clientsTimeline.to(word, {
      color: "#fff8ed",
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "none"
    }, index * 0.44);
  });

  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
};

initClientsAnimation();

const initFolio = () => {
  if (!folio || !folioTitleStrip || !folioImageStrip || !folioDetail || !folioDetailImage) {
    return;
  }

  const items = [
    {
      title: "Reduce manual processes",
      client: "Efficiency",
      image: "assets/images/why-hafat/reduce-manual-process.jpg",
      summary: "Streamlined workflows that improve speed, consistency, and execution.",
    },
    {
      title: "Improve execution speed",
      client: "Delivery",
      image: "assets/images/why-hafat/improve-execution-speed.png",
      summary: "Faster delivery systems that help teams move from planning to publishing with fewer delays.",
    },
    {
      title: "Scale operations efficiently",
      client: "Systems",
      image: "assets/images/why-hafat/scale-operations.png",
      summary: "Flexible systems built to support business growth, evolving demands, and multiple moving workflows.",
    },
    {
      title: "Optimise with data",
      client: "Analytics",
      image: "assets/images/why-hafat/optimise-data.png",
      summary: "Performance insights and analytics that support better decisions and continuous improvement.",
    }
  ];
  const LOOP_COPIES = 3;
  const rendered = items.length * LOOP_COPIES;
  const posMin = items.length;
  const posMax = items.length * 2;
  const layouts = {
    desktop: {
      titleTopVh: 39,
      titleMidVh: 16,
      titleSlotVh: 9.4,
      titleFontVhMax: 3.4,
      titleFontVhMin: 3.05,
      imageWrapperTopVh: 39,
      imageWrapperMidViewportVh: 55,
      imageHeightVh: 40,
      imagePitchVh: 46,
      imageOffsetPx: 0,
      pixelsPerItem: 600
    },
    mobile: {
      titleTopVh: 25,
      titleMidVh: 13,
      titleSlotVh: 8.5,
      titleFontVhMax: 2.6,
      titleFontVhMin: 2.5,
      imageWrapperTopVh: 49,
      imageWrapperMidViewportVh: 62,
      imageHeightVh: 24,
      imagePitchVh: 28,
      imageOffsetPx: 0,
      pixelsPerItem: 120
    }
  };
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const titleRows = [];
  const titleHeadings = [];
  const subtitles = [];
  const imageSlots = [];
  const imageCards = [];
  const cursorTarget = { x: -120, y: -120 };
  const cursorRender = { x: -120, y: -120 };
  const state = {
    pos: posMin,
    target: posMin,
    activeRendered: posMin,
    activeLogical: 0,
    onSection: false,
    hoveringImage: false,
    detailOpen: false,
    navigating: false,
    entranceDone: true,
    hoveredLogical: null,
    raf: 0,
    touchY: 0,
    lastWheel: 0,
    layout: window.matchMedia("(max-width: 860px)").matches ? layouts.mobile : layouts.desktop,
    hiddenCard: null,
    hiddenTitle: null,
    sourceImageRect: null,
    sourceTitleRect: null,
    activeImageSrc: items[0].image
  };
  const navProxy = { value: posMin };
  let entranceTimeline = null;
  let previousBodyOverflow = "";

  const logicalIndex = (index) => ((index % items.length) + items.length) % items.length;
  const getMediaMarkup = (item) => item.image
    ? `<img src="${item.image}" alt="${item.title}" loading="lazy">`
    : `<span class="folio-image-placeholder">${item.client}</span>`;

  const renderItems = () => {
    const titleFragment = document.createDocumentFragment();
    const imageFragment = document.createDocumentFragment();

    for (let i = 0; i < rendered; i += 1) {
      const item = items[logicalIndex(i)];
      const titleRow = document.createElement("button");
      titleRow.className = "folio-title-row";
      titleRow.type = "button";
      titleRow.dataset.folioIndex = String(i);
      titleRow.innerHTML = `<h3>${item.title}</h3><span>${item.client}</span>`;
      titleFragment.appendChild(titleRow);
      titleRows.push(titleRow);
      titleHeadings.push(titleRow.querySelector("h3"));
      subtitles.push(titleRow.querySelector("span"));

      const slot = document.createElement("div");
      slot.className = "folio-image-slot";
      slot.dataset.folioIndex = String(i);
      slot.style.top = `${(rendered - 1 - i) * state.layout.imagePitchVh}dvh`;
      slot.style.height = `${state.layout.imagePitchVh}dvh`;
      slot.innerHTML = `
        <button class="folio-image-card" type="button" aria-label="Select ${item.title}">
          ${getMediaMarkup(item)}
        </button>
      `;
      imageFragment.appendChild(slot);
      imageSlots.push(slot);
      imageCards.push(slot.querySelector(".folio-image-card"));
    }

    folioTitleStrip.appendChild(titleFragment);
    folioImageStrip.appendChild(imageFragment);
  };

  const applyLayout = () => {
    const isMobile = window.matchMedia("(max-width: 860px)").matches;
    state.layout = isMobile ? layouts.mobile : layouts.desktop;
    titleRows.forEach((row) => {
      row.style.height = `${state.layout.titleSlotVh}dvh`;
    });
    imageSlots.forEach((slot, index) => {
      slot.style.top = `${(rendered - 1 - index) * state.layout.imagePitchVh}dvh`;
      slot.style.height = `${state.layout.imagePitchVh}dvh`;
    });
    imageCards.forEach((card) => {
      card.style.height = `${state.layout.imageHeightVh}dvh`;
    });
  };

  const updateDetailContent = (renderedIndex) => {
    const item = items[logicalIndex(renderedIndex)];
    state.activeImageSrc = item.image;
    if (folioInlineTitle) folioInlineTitle.textContent = item.title;
    if (folioInlineSummary) folioInlineSummary.textContent = item.summary;
    if (folioDetailTitle) folioDetailTitle.textContent = item.title;
    if (folioDetailSummary) folioDetailSummary.textContent = item.summary;
    folioDetailImage.innerHTML = getMediaMarkup(item);
  };

  const tick = () => {
    const now = performance.now();
    if (!state.navigating && !state.detailOpen && state.entranceDone && now - state.lastWheel > 90) {
      state.target = Math.round(state.target);
    }

    let next = Math.abs(state.target - state.pos) < 0.0005
      ? state.target
      : state.pos + (state.target - state.pos) * 0.14;

    while (next < posMin) {
      next += items.length;
      state.target += items.length;
    }
    while (next >= posMax) {
      next -= items.length;
      state.target -= items.length;
    }
    state.pos = next;

    const vh = window.innerHeight / 100;
    const layout = state.layout;
    const titleStripY = (layout.titleMidVh - (next + 0.5) * layout.titleSlotVh) * vh;
    const imageStripY = (
      layout.imageWrapperMidViewportVh
      - layout.imageWrapperTopVh
      - layout.imagePitchVh / 2
      - (rendered - 1) * layout.imagePitchVh
      + next * layout.imagePitchVh
    ) * vh + layout.imageOffsetPx;

    folioTitleStrip.style.transform = `translate3d(0, ${titleStripY.toFixed(2)}px, 0)`;
    folioImageStrip.style.transform = `translate3d(0, ${imageStripY.toFixed(2)}px, 0)`;

    for (let i = 0; i < rendered; i += 1) {
      const slot = imageSlots[i];
      const title = titleRows[i];
      const h3 = titleHeadings[i];
      const subtitle = subtitles[i];
      const dist = Math.abs(i - next);
      let opacity;
      let scale;

      if (dist < 0.5) {
        opacity = 1;
        scale = 1;
      } else {
        opacity = 0;
        scale = 0.96;
      }

      slot.style.opacity = opacity.toFixed(3);
      slot.style.transform = `scale(${scale.toFixed(4)})`;
      slot.classList.toggle("is-active", dist < 0.5);

      const tColor = Math.max(0, 1 - dist * 2);
      const tType = Math.max(0, 1 - dist * 0.55);
      const isHovered = state.hoveredLogical !== null && logicalIndex(i) === state.hoveredLogical;
      const weight = 420 + 200 * tType + (isHovered ? 80 : 0);
      const fontVh = layout.titleFontVhMin + (layout.titleFontVhMax - layout.titleFontVhMin) * tType;
      title.style.opacity = (0.7 + 0.3 * tColor).toFixed(3);
      title.style.color = tColor > 0 ? `rgba(255, 248, 237, ${(0.3 + 0.7 * tColor).toFixed(3)})` : "rgba(255, 248, 237, 0.28)";
      if (h3) {
        h3.style.fontSize = `${fontVh.toFixed(2)}dvh`;
        h3.style.fontVariationSettings = `"wght" ${weight.toFixed(0)}`;
        h3.style.fontWeight = String(Math.round(weight));
      }
      if (subtitle) {
        const subt = Math.max(0, 1 - dist * 2.8);
        subtitle.style.opacity = subt.toFixed(3);
        subtitle.style.transform = `translateX(${((1 - subt) * -10).toFixed(2)}px)`;
      }
    }

    const rounded = Math.max(0, Math.min(rendered - 1, Math.round(next)));
    if (rounded !== state.activeRendered) {
      state.activeRendered = rounded;
      state.activeLogical = logicalIndex(rounded);
      updateDetailContent(rounded);
    }

    if (folioCursor) {
      const visible = state.hoveringImage && state.onSection && !state.detailOpen;
      const lerp = visible ? 0.22 : 1;
      cursorRender.x += (cursorTarget.x - cursorRender.x) * lerp;
      cursorRender.y += (cursorTarget.y - cursorRender.y) * lerp;
      folioCursor.style.transform = `translate3d(${(cursorRender.x - 38).toFixed(2)}px, ${(cursorRender.y - 38).toFixed(2)}px, 0)`;
      folioCursor.style.opacity = visible ? "1" : "0";
    }

    state.raf = window.requestAnimationFrame(tick);
  };

  const setPositionImmediate = (value) => {
    let next = value;
    while (next < posMin) next += items.length;
    while (next >= posMax) next -= items.length;
    state.pos = next;
    state.target = next;
  };

  const skipEntrance = () => {
    if (state.entranceDone) return;
    if (entranceTimeline) entranceTimeline.kill();
    entranceTimeline = null;
    state.entranceDone = true;
    document.body.style.overflow = previousBodyOverflow;
  };

  const navigateTo = (renderedIndex, shouldOpen = false) => {
    if (state.detailOpen) return;
    skipEntrance();
    const currentLogical = logicalIndex(Math.round(state.pos));
    const clickedLogical = logicalIndex(renderedIndex);
    let delta = clickedLogical - currentLogical;
    if (delta > items.length / 2) delta -= items.length;
    if (delta < -items.length / 2) delta += items.length;

    if (Math.abs(delta) < 0.001) {
      state.target = Math.round(state.pos);
      if (shouldOpen) window.requestAnimationFrame(() => openDetail(state.activeRendered));
      return;
    }

    navProxy.value = state.pos;
    state.navigating = true;
    if (window.gsap) window.gsap.killTweensOf(navProxy);
    if (window.gsap) {
      window.gsap.to(navProxy, {
        value: state.pos + delta,
        duration: 0.85 + Math.abs(delta) * 0.11,
        ease: "power3.inOut",
        onUpdate: () => setPositionImmediate(navProxy.value),
        onComplete: () => {
          state.navigating = false;
          if (shouldOpen) window.requestAnimationFrame(() => openDetail(state.activeRendered));
        }
      });
    } else {
      setPositionImmediate(state.pos + delta);
      state.navigating = false;
      if (shouldOpen) openDetail(state.activeRendered);
    }
  };

  const openDetail = (renderedIndex) => {
    if (state.detailOpen) return;
    const card = imageCards[renderedIndex];
    const title = titleHeadings[renderedIndex];
    if (!card || !title) return;
    state.detailOpen = true;
    state.hiddenCard = card;
    state.hiddenTitle = title;
    state.sourceImageRect = card.getBoundingClientRect();
    state.sourceTitleRect = title.getBoundingClientRect();
    updateDetailContent(renderedIndex);
    card.style.visibility = "hidden";
    title.style.visibility = "hidden";
    folio.classList.add("is-detail-open");
    folioDetail.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-service-detail-open");

    const detailImageRect = folioDetailImage.getBoundingClientRect();
    const detailTitleRect = folioDetailTitle ? folioDetailTitle.getBoundingClientRect() : null;
    const revealNodes = folioDetail.querySelectorAll("[data-detail-reveal]");
    if (window.gsap) {
      const { gsap } = window;
      gsap.set(folioDetail.querySelector("[data-detail-scrim]"), { opacity: 0 });
      gsap.to(folioDetail.querySelector("[data-detail-scrim]"), { opacity: 1, duration: 0.45, ease: "power2.out" });
      gsap.fromTo(revealNodes, { y: 24, autoAlpha: 0, filter: "blur(8px)" }, {
        y: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.05,
        delay: 0.25
      });
      gsap.set(folioDetailImage, {
        x: state.sourceImageRect.left - detailImageRect.left,
        y: state.sourceImageRect.top - detailImageRect.top,
        scaleX: state.sourceImageRect.width / detailImageRect.width,
        scaleY: state.sourceImageRect.height / detailImageRect.height,
        transformOrigin: "top left"
      });
      gsap.to(folioDetailImage, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.95, ease: "power4.out" });
      if (folioDetailTitle && detailTitleRect) {
        gsap.set(folioDetailTitle, {
          x: state.sourceTitleRect.left - detailTitleRect.left,
          y: state.sourceTitleRect.top - detailTitleRect.top,
          scale: state.sourceTitleRect.height / detailTitleRect.height,
          transformOrigin: "top left"
        });
        gsap.to(folioDetailTitle, { x: 0, y: 0, scale: 1, duration: 0.95, ease: "power4.out" });
      }
    }
  };

  const closeDetail = () => {
    if (!state.detailOpen) return;
    const finalize = () => {
      if (state.hiddenCard) state.hiddenCard.style.visibility = "";
      if (state.hiddenTitle) state.hiddenTitle.style.visibility = "";
      state.hiddenCard = null;
      state.hiddenTitle = null;
      state.detailOpen = false;
      folio.classList.remove("is-detail-open");
      folioDetail.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-service-detail-open");
      if (window.gsap) window.gsap.set([folioDetailImage, folioDetailTitle], { clearProps: "transform" });
    };

    if (!window.gsap || !state.sourceImageRect) {
      finalize();
      return;
    }

    const { gsap } = window;
    const imageRect = folioDetailImage.getBoundingClientRect();
    const titleRect = folioDetailTitle ? folioDetailTitle.getBoundingClientRect() : null;
    gsap.to(folioDetail.querySelectorAll("[data-detail-reveal]"), {
      y: 14,
      autoAlpha: 0,
      filter: "blur(6px)",
      duration: 0.35,
      ease: "power3.in",
      stagger: 0.03
    });
    gsap.to(folioDetail.querySelector("[data-detail-scrim]"), { opacity: 0, duration: 0.55, delay: 0.25, ease: "power2.in" });
    gsap.to(folioDetailImage, {
      x: state.sourceImageRect.left - imageRect.left,
      y: state.sourceImageRect.top - imageRect.top,
      scaleX: state.sourceImageRect.width / imageRect.width,
      scaleY: state.sourceImageRect.height / imageRect.height,
      duration: 0.85,
      ease: "power3.inOut",
      delay: 0.05
    });
    if (folioDetailTitle && titleRect && state.sourceTitleRect) {
      gsap.to(folioDetailTitle, {
        x: state.sourceTitleRect.left - titleRect.left,
        y: state.sourceTitleRect.top - titleRect.top,
        scale: state.sourceTitleRect.height / titleRect.height,
        duration: 0.85,
        ease: "power3.inOut",
        delay: 0.05,
        onComplete: finalize
      });
    } else {
      window.setTimeout(finalize, 900);
    }
  };

  const onWheel = (event) => {
    if (!state.onSection || state.detailOpen) return;
    skipEntrance();
  };

  const onTouchStart = (event) => {
    const target = event.target instanceof HTMLElement ? event.target : null;
    if (state.detailOpen || target?.closest("[data-no-wheel]")) return;
    skipEntrance();
    state.touchY = event.touches[0]?.clientY || 0;
  };

  const onTouchMove = (event) => {
    const target = event.target instanceof HTMLElement ? event.target : null;
    if (state.detailOpen || target?.closest("[data-no-wheel]")) return;
    skipEntrance();
  };

  renderItems();
  applyLayout();
  updateDetailContent(posMin);

  titleRows.forEach((row, index) => {
    row.addEventListener("click", () => navigateTo(index, false));
    row.addEventListener("pointerenter", () => { state.hoveredLogical = logicalIndex(index); });
    row.addEventListener("pointerleave", () => { state.hoveredLogical = null; });
  });
  imageCards.forEach((card, index) => {
    card.addEventListener("click", () => navigateTo(index, false));
    card.addEventListener("pointerenter", () => { state.hoveringImage = true; });
    card.addEventListener("pointerleave", () => { state.hoveringImage = false; });
  });
  folio.addEventListener("pointerenter", () => { state.onSection = true; });
  folio.addEventListener("pointerleave", () => {
    state.onSection = false;
    state.hoveringImage = false;
  });
  folio.addEventListener("pointermove", (event) => {
    const rect = folio.getBoundingClientRect();
    cursorTarget.x = event.clientX - rect.left;
    cursorTarget.y = event.clientY - rect.top;
  });
  window.addEventListener("wheel", onWheel, { passive: false });
  folio.addEventListener("touchstart", onTouchStart, { passive: true });
  folio.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("resize", applyLayout);
  folioCloseButtons.forEach((button) => button.addEventListener("click", closeDetail));
  folioDetail.addEventListener("click", (event) => {
    if (event.target === folioDetail || event.target.matches("[data-detail-scrim]")) closeDetail();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDetail();
  });

  const startEntrance = () => {
    state.entranceDone = true;
    if (!prefersReducedMotion && window.gsap) {
      window.gsap.fromTo([folioTitleStrip, folioImageStrip, folio.querySelectorAll("[data-chrome]")], {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
        duration: 0.45,
        ease: "power2.out"
      });
    }
  };

  const entranceObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      startEntrance();
      entranceObserver.disconnect();
    }
  }, { threshold: 0.55 });
  entranceObserver.observe(folio);

  state.raf = window.requestAnimationFrame(tick);
};

initFolio();

const initServicesGallery = () => {
  if (!servicesGallery || !serviceVisuals.length) {
    return;
  }

  let activeIndex = 0;

  const setActiveService = (index) => {
    activeIndex = (index + serviceVisuals.length) % serviceVisuals.length;

    serviceVisuals.forEach((visual) => {
      const isActive = Number(visual.dataset.serviceIndex) === activeIndex;
      visual.classList.toggle("is-active", isActive);
      visual.setAttribute("aria-hidden", String(!isActive));
    });

  };

  const openDetail = (index) => {
    setActiveService(index);
    servicesGallery.classList.add("is-detail-open");
    document.body.classList.add("is-service-detail-open");

    if (serviceDetail) {
      serviceDetail.setAttribute("aria-hidden", "false");
    }
  };

  const closeDetail = () => {
    servicesGallery.classList.remove("is-detail-open");
    document.body.classList.remove("is-service-detail-open");

    if (serviceDetail) {
      serviceDetail.setAttribute("aria-hidden", "true");
    }
  };

  if (servicePrevious) {
    servicePrevious.addEventListener("click", () => setActiveService(activeIndex - 1));
  }

  if (serviceNext) {
    serviceNext.addEventListener("click", () => setActiveService(activeIndex + 1));
  }

  if (serviceDetailClose) {
    serviceDetailClose.addEventListener("click", closeDetail);
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDetail();
    }
  });

  setActiveService(activeIndex);
};

initServicesGallery();

videos.forEach((video) => {
  const markReady = () => video.classList.add("is-ready");

  if (video.readyState >= 3) {
    markReady();
  } else {
    video.addEventListener("canplay", markReady, { once: true });
  }
});

if (contactForm) {
  const status = contactForm.querySelector("[data-form-status]");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      status.textContent = "Please complete the required fields before sending.";
      status.classList.remove("is-success");
      status.classList.add("is-error");
      contactForm.reportValidity();
      return;
    }

    status.textContent = "Inquiry prepared. Connect a form service or email endpoint to send it live.";
    status.classList.remove("is-error");
    status.classList.add("is-success");
    contactForm.reset();
  });
}

window.addEventListener("scroll", syncHeader, { passive: true });
window.addEventListener("scroll", syncWhyHafatColor, { passive: true });
window.addEventListener("resize", syncWhyHafatColor);
syncHeader();
syncWhyHafatColor();

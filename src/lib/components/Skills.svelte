<script lang="ts">
  import { onMount } from "svelte";

  let el: HTMLElement;
  let visible = $state(false);

  const toolbox = [
    {
      label: "Frontend Development",
      icon: "⬜",
      desc: "Building fast, accessible UIs",
    },
    {
      label: "Responsive Design",
      icon: "📱",
      desc: "Pixel-perfect on every device",
    },
    {
      label: "Performance Optimization",
      icon: "⚡",
      desc: "Fast loads, smooth interactions",
    },
    {
      label: "Clean Code",
      icon: "✦",
      desc: "Readable, maintainable, scalable",
    },
    {
      label: "Problem Solving",
      icon: "◈",
      desc: "Breaking down complex challenges",
    },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) visible = true;
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<section id="skills" bind:this={el} class="skills" class:visible>
  <div class="skills-inner">
    <p class="section-label">My Toolbox</p>
    <h2 class="section-title">
      What I bring to the table<span class="accent-dot">.</span>
    </h2>

    <div class="toolbox-grid">
      {#each toolbox as item, i}
        <div class="tool-card glass" style="transition-delay: {i * 80}ms">
          <span class="tool-icon mono">{item.icon}</span>
          <h3 class="tool-label">{item.label}</h3>
          <p class="tool-desc">{item.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .skills {
    padding: 100px 24px;
    background: linear-gradient(
      to bottom,
      transparent,
      color-mix(in srgb, var(--accent) 3%, transparent),
      transparent
    );
  }

  .skills-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: var(--text);
    margin-top: 12px;
    margin-bottom: 48px;
    letter-spacing: -0.02em;
  }

  .toolbox-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }

  .tool-card {
    padding: 28px 20px;
    border-radius: 16px;
    text-align: center;
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.5s ease,
      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      border-color 0.2s,
      background 0.2s;
    cursor: default;
  }

  .skills.visible .tool-card {
    opacity: 1;
    transform: translateY(0);
  }

  .tool-card:hover {
    background: color-mix(in srgb, var(--accent) 6%, transparent);
    transform: translateY(-4px) !important;
  }

  .tool-icon {
    display: block;
    font-size: 1.5rem;
    margin-bottom: 14px;
    color: var(--accent);
  }

  .tool-label {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 8px;
    line-height: 1.3;
  }

  .tool-desc {
    font-size: 0.75rem;
    color: var(--text-muted);
    line-height: 1.5;
  }

  @media (max-width: 1024px) {
    .toolbox-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 640px) {
    .toolbox-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

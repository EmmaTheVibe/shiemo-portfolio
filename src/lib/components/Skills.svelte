<script lang="ts">
  import { onMount } from "svelte";
  import { animateStaggeredItems } from "$lib/utils/animations";

  let el: HTMLElement;

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
    if (!el) return;
    return animateStaggeredItems(el, {
      selector: ".tool-card",
      x: -24,
      scale: 0.96,
      duration: 0.7,
      stagger: 0.1,
    });
  });
</script>

<section id="skills" bind:this={el} class="skills">
  <div class="skills-inner">
    <p class="section-label">My Services</p>
    <h2 class="section-title">
      What I offer<span class="accent-dot">.</span>
    </h2>

    <div class="toolbox-grid">
      {#each toolbox as item}
        <div class="tool-card glass">
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
    max-width: 1440px;
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
    transition:
      transform 0.2s,
      border-color 0.2s,
      background 0.2s;
    cursor: default;
    will-change: opacity, transform;
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

<script lang="ts">
  import { onMount } from "svelte";

  let el: HTMLElement;
  let visible = $state(false);

  const techs = [
    { name: "Next.js", icon: "N" },
    { name: "React", icon: "⚛️" },
    { name: "Vue.js", icon: "V" },
    { name: "TypeScript", icon: "TS" },
    { name: "Svelte", icon: "S" },
    { name: "Tailwind CSS", icon: "~" },
    { name: "Node.js", icon: "⬡" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "MongoDB", icon: "🍃" },
    { name: "Git", icon: "⎇" },
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

<section id="about" bind:this={el} class="about" class:visible>
  <div class="about-inner">
    <div class="left">
      <p class="section-label">About Me</p>
      <p class="about-text">
        I'm passionate about building products that solve real problems and
        create meaningful impact. I focus on writing clean, efficient code and
        crafting seamless user experiences.
      </p>
      <p class="about-text" style="margin-top: 16px;">
        I enjoy transforming complex problems into simple, elegant and human
        centered solutions across SaaS, fintech, and edutech.
      </p>
      <a href="/contact" class="more-link">
        More about me
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          ><line x1="5" y1="12" x2="19" y2="12" /><polyline
            points="12 5 19 12 12 19"
          /></svg
        >
      </a>
    </div>

    <div class="right">
      <p class="section-label">Technologies I Work With</p>
      <div class="tech-grid">
        {#each techs as tech}
          <div class="tech-chip glass">
            <span class="tech-icon">{tech.icon}</span>
            {tech.name}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .about {
    padding: 100px 24px;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .about.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .about-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }

  .about-text {
    font-size: 1rem;
    color: var(--text-muted);
    line-height: 1.8;
    margin-top: 20px;
  }

  .more-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--accent);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 600;
    margin-top: 24px;
    transition: gap 0.2s;
  }

  .more-link:hover {
    gap: 10px;
  }

  .tech-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }

  .tech-chip {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-muted);
    transition: all 0.2s;
    cursor: default;
  }

  .tech-chip:hover {
    color: var(--text);
    background: color-mix(in srgb, var(--accent) 8%, transparent);
  }

  .tech-icon {
    font-size: 0.75rem;
    font-family: var(--font-mono);
    color: var(--accent);
    font-weight: 700;
  }

  @media (max-width: 768px) {
    .about-inner {
      grid-template-columns: 1fr;
      gap: 48px;
    }
  }
</style>

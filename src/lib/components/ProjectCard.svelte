<script lang="ts">
  import type { Project } from "$lib/data/projects";
  const { project } = $props<{ project: Project }>();
</script>

<article class="card glass">
  <div class="card-image">
    <img src={project.image} alt={project.title} loading="lazy" />
    <div class="image-overlay"></div>
  </div>

  <div class="card-body">
    <h3 class="card-title">{project.title}</h3>
    <p class="card-desc">{project.description}</p>

    <div class="tech-tags">
      {#each project.tech as t}
        <span class="tag mono">{t}</span>
      {/each}
    </div>

    <div class="card-links">
      <a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        class="card-link primary"
      >
        Live Demo
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          ><path
            d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
          /><polyline points="15 3 21 3 21 9" /><line
            x1="10"
            y1="14"
            x2="21"
            y2="3"
          /></svg
        >
      </a>
      {#if project.github}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          class="card-link"
        >
          GitHub
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            ><path
              d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
            /><polyline points="15 3 21 3 21 9" /><line
              x1="10"
              y1="14"
              x2="21"
              y2="3"
            /></svg
          >
        </a>
      {:else}
        <span class="card-link muted">Classified 🔒</span>
      {/if}
    </div>
  </div>
</article>

<style>
  .card {
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: default;
  }

  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px color-mix(in srgb, var(--accent) 12%, transparent);
  }

  .card-image {
    position: relative;
    height: 200px;
    overflow: hidden;
    background: var(--bg-2);
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .card:hover .card-image img {
    transform: scale(1.04);
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(7, 8, 15, 0.6)
    );
  }

  .card-body {
    padding: 24px;
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 10px;
  }

  .card-desc {
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.7;
    margin-bottom: 18px;
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }

  .tag {
    font-size: 0.7rem;
    padding: 4px 10px;
    background: color-mix(in srgb, var(--accent) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
    border-radius: 4px;
    color: var(--accent);
  }

  .card-links {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .card-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    color: var(--text-muted);
    transition: color 0.2s;
  }

  .card-link.primary {
    color: var(--accent);
  }

  .card-link:hover {
    color: var(--text);
  }

  .card-link.primary:hover {
    color: var(--accent-2);
  }

  .card-link.muted {
    color: var(--text-dim);
    cursor: default;
    font-size: 0.8rem;
  }
</style>

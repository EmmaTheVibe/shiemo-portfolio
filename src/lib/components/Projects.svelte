<script lang="ts">
  import { onMount } from "svelte";
  import { projects } from "$lib/data/projects";
  import { animateProjectCards } from "$lib/utils/animations";
  import ProjectCard from "./ProjectCard.svelte";

  const {
    limit = projects.length,
    showAllLink = false,
    label = "Featured Projects",
    title = "Things I've built",
    intro = "",
  } = $props<{
    limit?: number;
    showAllLink?: boolean;
    label?: string;
    title?: string;
    intro?: string;
  }>();

  let el: HTMLElement;
  let visibleProjects = $derived(projects.slice(0, limit));

  onMount(() => {
    if (!el) return;
    return animateProjectCards(el);
  });
</script>

<section id="projects" bind:this={el} class="projects">
  <div class="projects-inner">
    <div class="section-header">
      <p class="section-label">{label}</p>
      <h2 class="section-title">
        {title}<span class="accent-dot">.</span>
      </h2>
      {#if intro}
        <p class="section-intro">{intro}</p>
      {/if}
    </div>

    <div class="projects-grid">
      {#each visibleProjects as project}
        <div class="card-wrapper">
          <ProjectCard {project} />
        </div>
      {/each}
    </div>

    {#if showAllLink}
      <div class="projects-more">
        <a href="/projects" class="btn-secondary">See all projects</a>
      </div>
    {/if}
  </div>
</section>

<style>
  .projects {
    padding: 100px 24px;
  }

  .projects-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    margin-bottom: 48px;
  }

  .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: var(--text);
    margin-top: 12px;
    letter-spacing: -0.02em;
  }

  .section-intro {
    max-width: 620px;
    color: var(--text-muted);
    line-height: 1.7;
    margin-top: 14px;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .card-wrapper {
    will-change: opacity, transform;
  }

  .projects-more {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  @media (max-width: 1024px) {
    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

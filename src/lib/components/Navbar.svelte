<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { fly } from "svelte/transition";
  import { social } from "$lib/data/projects";
  import { tick } from "svelte";

  let menuOpen = $state(false);
  let scrolled = $state(false);
  let palette = $state("blue");
  let mounted = $state(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  const palettes = [
    {
      name: "blue",
      label: "Blue palette",
      accent: "#3b82f6",
      accent2: "#06b6d4",
      glow: "rgba(59, 130, 246, 0.15)",
      hover: "rgba(59, 130, 246, 0.4)",
    },
    {
      name: "green",
      label: "Green palette",
      accent: "#10b981",
      accent2: "#84cc16",
      glow: "rgba(16, 185, 129, 0.15)",
      hover: "rgba(16, 185, 129, 0.4)",
    },
    {
      name: "rose",
      label: "Rose palette",
      accent: "#f43f5e",
      accent2: "#f59e0b",
      glow: "rgba(244, 63, 94, 0.15)",
      hover: "rgba(244, 63, 94, 0.4)",
    },
  ];

  function handleScroll() {
    scrolled = window.scrollY > 40;
  }

  function closeMenu() {
    menuOpen = false;
  }

  function isActive(href: string) {
    if (href === "/") return page.url.pathname === "/";
    return (
      page.url.pathname === href || page.url.pathname.startsWith(`${href}/`)
    );
  }

  function applyPalette(name: string) {
    const selected = palettes.find((item) => item.name === name) ?? palettes[0];
    const root = document.documentElement;
    palette = selected.name;
    root.style.setProperty("--accent", selected.accent);
    root.style.setProperty("--accent-2", selected.accent2);
    root.style.setProperty("--accent-glow", selected.glow);
    root.style.setProperty("--border-hover", selected.hover);
    localStorage.setItem("portfolio-palette", selected.name);
  }

  onMount(() => {
    mounted = true;
    scrolled = window.scrollY > 40;
    applyPalette(localStorage.getItem("portfolio-palette") ?? "blue");
    window.addEventListener("scroll", handleScroll, { passive: true });
  });
</script>

<svelte:window onscroll={handleScroll} />

<nav class="navbar" class:scrolled>
  <div class="nav-inner">
    <a href="/" class="logo" onclick={closeMenu}>
      <span class="logo-box">OE</span>
    </a>

    <ul class="nav-links">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class:active-link={isActive(link.href)}
            aria-current={isActive(link.href) ? "page" : undefined}
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <div class="palette-toggle" aria-label="Color palette">
      {#each palettes as item}
        <button
          type="button"
          class:active={palette === item.name}
          style={`--swatch:${item.accent}`}
          aria-label={item.label}
          aria-pressed={palette === item.name}
          onclick={() => applyPalette(item.name)}
        ></button>
      {/each}
    </div>

    <a
      href={social.resume}
      target="_blank"
      rel="noopener noreferrer"
      class="resume-btn"
    >
      Resume
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        ><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline
          points="7 10 12 15 17 10"
        /><line x1="12" y1="15" x2="12" y2="3" /></svg
      >
    </a>

    <button
      class="hamburger"
      onclick={() => (menuOpen = !menuOpen)}
      aria-label="Toggle menu"
      aria-expanded={menuOpen}
      aria-controls="mobile-menu"
    >
      <span class:open={menuOpen}></span>
      <span class:open={menuOpen}></span>
      <span class:open={menuOpen}></span>
    </button>
  </div>

  {#if menuOpen}
    <div
      class="mobile-menu"
      id="mobile-menu"
      transition:fly={{ y: -12, duration: 220 }}
    >
      {#each links as link}
        <a
          href={link.href}
          onclick={closeMenu}
          class:active-link={isActive(link.href)}
          aria-current={isActive(link.href) ? "page" : undefined}
        >
          {link.label}
        </a>
      {/each}
      <div class="mobile-palette" aria-label="Color palette">
        {#each palettes as item}
          <button
            type="button"
            class:active={palette === item.name}
            style={`--swatch:${item.accent}`}
            aria-label={item.label}
            aria-pressed={palette === item.name}
            onclick={() => applyPalette(item.name)}
          ></button>
        {/each}
      </div>
      <a
        href={social.resume}
        target="_blank"
        rel="noopener noreferrer"
        class="resume-btn mobile-resume"
      >
        Resume
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          ><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline
            points="7 10 12 15 17 10"
          /><line x1="12" y1="15" x2="12" y2="3" /></svg
        >
      </a>
    </div>
  {/if}
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 20px 0;
    transition: all 0.3s ease;
  }

  .navbar.scrolled {
    background: rgba(7, 8, 15, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    padding: 14px 0;
  }

  .nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .logo {
    text-decoration: none;
    flex-shrink: 0;
  }

  .logo-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid var(--accent);
    border-radius: 6px;
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    transition: all 0.2s;
  }

  .logo-box:hover {
    background: var(--accent);
    color: white;
  }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 32px;
    margin: 0;
    padding: 0;
    flex: 1;
  }

  .nav-links a {
    text-decoration: none;
    color: var(--text-muted);
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.2s;
    position: relative;
  }

  .nav-links a::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--accent);
    transition: width 0.2s;
  }

  .nav-links a:hover {
    color: var(--text);
  }

  .nav-links a:hover::after,
  .nav-links a.active-link::after {
    width: 100%;
  }

  .nav-links a.active-link,
  .mobile-menu a.active-link {
    color: var(--text);
  }

  .resume-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    border: 1px solid var(--accent);
    border-radius: 6px;
    color: var(--accent);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 600;
    transition: all 0.2s;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .palette-toggle,
  .mobile-palette {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .palette-toggle button,
  .mobile-palette button {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--swatch);
    cursor: pointer;
    transition:
      transform 0.2s,
      box-shadow 0.2s,
      border-color 0.2s;
  }

  .palette-toggle button:hover,
  .palette-toggle button.active,
  .mobile-palette button:hover,
  .mobile-palette button.active {
    border-color: var(--text);
    box-shadow: 0 0 0 4px var(--accent-glow);
    transform: translateY(-1px);
  }

  .resume-btn:hover {
    background: var(--accent);
    color: white;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    margin-left: auto;
  }

  .hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--text);
    border-radius: 2px;
    transition: all 0.3s;
  }

  .mobile-menu {
    display: none;
    flex-direction: column;
    padding: 16px 24px 24px;
    gap: 4px;
    border-top: 1px solid var(--border);
    background: rgba(7, 8, 15, 0.97);
    transform-origin: top;
  }

  .mobile-menu a {
    text-decoration: none;
    color: var(--text-muted);
    padding: 12px 0;
    font-size: 1rem;
    font-weight: 500;
    border-bottom: 1px solid var(--border);
    transition: color 0.2s;
  }

  .mobile-menu a:hover {
    color: var(--text);
  }

  .mobile-palette {
    padding: 12px 0;
  }

  .mobile-resume {
    justify-content: center;
    margin-top: 8px;
    color: var(--accent) !important;
    border-bottom: 1px solid var(--accent) !important;
  }

  .mobile-resume:hover {
    color: white !important;
  }

  @media (max-width: 1200px) {
    .nav-inner {
      padding: 0 24px;
    }
  }

  @media (max-width: 768px) {
    .nav-links,
    .resume-btn,
    .palette-toggle {
      display: none;
    }
    .mobile-menu {
      display: flex;
    }
    .hamburger {
      display: flex;
    }
    .mobile-resume {
      display: flex;
    }
  }
</style>

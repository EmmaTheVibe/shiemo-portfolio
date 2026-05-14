<script lang="ts">
  import { social } from "$lib/data/projects";

  const { visible = false } = $props<{ visible?: boolean }>();
</script>

<div class="hero-content" class:visible>
  <div class="badge mono">
    <span class="badge-dot"></span>
    Software Developer
  </div>

  <h1 class="hero-name">
    <span class="greeting">Hello, I'm</span>
    Onagaumah<br />Emmanuel<span class="accent-dot">.</span>
  </h1>

  <p class="hero-bio">
    Software developer with experience across<br />
    SaaS (B2B &amp; B2C), fintech, and edutech.
  </p>

  <div class="hero-ctas">
    <a href="/projects" class="btn-primary">
      View My Work
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        ><line x1="5" y1="12" x2="19" y2="12" /><polyline
          points="12 5 19 12 12 19"
        /></svg
      >
    </a>
    <a href="/contact" class="btn-secondary">Get In Touch</a>
  </div>

  <div class="hero-social">
    <a
      href={social.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
        ><path
          d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
        /></svg
      >
    </a>
    <a
      href={social.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
        ><path
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        /></svg
      >
    </a>
    <a
      href={social.twitter}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter/X"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
        ><path
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        /></svg
      >
    </a>
    <a href={`mailto:${social.email}`} aria-label="Email">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        ><rect x="2" y="4" width="20" height="16" rx="2" /><path
          d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"
        /></svg
      >
    </a>
  </div>
</div>

<style>
  .hero-content {
    max-width: 600px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .hero-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border: 1px solid var(--border-hover);
    border-radius: 100px;
    font-size: 0.75rem;
    color: var(--accent);
    margin-bottom: 24px;
    background: var(--accent-glow);
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse 2s ease-in-out infinite;
  }

  .greeting {
    display: block;
    font-size: 1.1rem;
    font-weight: 400;
    color: var(--text-muted);
    margin-bottom: 8px;
  }

  .hero-name {
    font-size: clamp(1.8rem, 6vw, 4.5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--text);
    margin-bottom: 20px;
  }

  .hero-bio {
    font-size: 1.1rem;
    color: var(--text-muted);
    line-height: 1.7;
    margin-bottom: 36px;
  }

  .hero-ctas {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .hero-social {
    display: flex;
    gap: 20px;
  }

  .hero-social a {
    color: var(--text-muted);
    transition:
      color 0.2s,
      transform 0.2s;
  }

  .hero-social a:hover {
    color: var(--accent);
    transform: translateY(-2px);
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(0.8);
    }
  }

  @media (max-width: 900px) {
    .hero-ctas,
    .hero-social {
      justify-content: center;
    }
  }
</style>

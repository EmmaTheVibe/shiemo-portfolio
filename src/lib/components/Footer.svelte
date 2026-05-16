<script lang="ts">
  import { page } from "$app/state";

  const year = new Date().getFullYear();
  const links = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  function isActive(href: string) {
    if (href === "/") return page.url.pathname === "/";
    return (
      page.url.pathname === href || page.url.pathname.startsWith(`${href}/`)
    );
  }
</script>

<footer class="footer">
  <div class="footer-inner">
    <a href="/" class="logo-box mono">OE</a>

    <p class="footer-copy">
      © {year} Onagaumah Emmanuel. All rights reserved.
    </p>

    <nav class="footer-links" aria-label="Footer navigation">
      {#each links as link}
        <a
          href={link.href}
          class:active-link={isActive(link.href)}
          aria-current={isActive(link.href) ? "page" : undefined}
        >
          {link.label}
        </a>
      {/each}
    </nav>
  </div>
</footer>

<style>
  .footer {
    border-top: 1px solid var(--border);
    padding: 32px 24px;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
  }

  .footer-inner {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }

  .logo-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid var(--accent);
    border-radius: 6px;
    color: var(--accent);
    font-size: 0.75rem;
    text-decoration: none;
    transition: all 0.2s;
  }

  .logo-box:hover {
    background: var(--accent);
    color: white;
  }

  .footer-copy {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .footer-links {
    display: flex;
    gap: 24px;
  }

  .footer-links a {
    font-size: 0.8rem;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-links a:hover,
  .footer-links a.active-link {
    color: var(--text);
  }

  @media (max-width: 640px) {
    .footer-inner {
      justify-content: center;
      text-align: center;
    }
  }
</style>

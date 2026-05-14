<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { dev } from "$app/environment";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";

  injectAnalytics({ mode: dev ? "development" : "production" });

  const { children } = $props();
</script>

<svelte:head>
  <meta property="og:image" content="https://shiemo.dev/socials.jpg" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://shiemo.dev/og-image.jpg" />
</svelte:head>

<Navbar />

<main>
  {@render children()}
</main>

<Footer />

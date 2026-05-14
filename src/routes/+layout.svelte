<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { inject } from "@vercel/analytics";

  const { children } = $props();

  inject();
</script>

<Navbar />

<main>
  {@render children()}
</main>

<Footer />

<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";

  const { children } = $props();
</script>

<Navbar />

<main>
  {@render children()}
</main>

<Footer />

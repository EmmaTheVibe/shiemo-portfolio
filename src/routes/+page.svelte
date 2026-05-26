<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Terminal from '$lib/components/Terminal.svelte';
</script>

<svelte:head>
  <title>Onagaumah Emmanuel — Software Developer</title>
  <meta name="description" content="Software developer with experience across SaaS (B2B & B2C), fintech, and edutech." />
</svelte:head>

<Hero />
<About />
<Projects limit={3} showAllLink={true} featured={true} />
<Skills />
<Terminal />

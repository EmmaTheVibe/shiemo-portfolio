<script lang="ts">
  import { onMount } from "svelte";
  import HeroIntro from "./HeroIntro.svelte";
  import HeroVisual from "./HeroVisual.svelte";

  let visible = $state(false);

  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 100);
  });
</script>

<section id="home" class="hero">
  <div class="hero-inner">
    <HeroIntro {visible} />
    <HeroVisual {visible} />
  </div>

  <div class="scroll-hint" class:visible>
    <div class="scroll-line"></div>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 100px 24px 60px;
    position: relative;
  }

  .hero-inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 60px;
  }

  .scroll-hint {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 1s ease 1.5s;
  }

  .scroll-hint.visible {
    opacity: 1;
  }

  .scroll-line {
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, var(--accent), transparent);
    animation: scroll-pulse 2s ease-in-out infinite;
  }

  @keyframes scroll-pulse {
    0%,
    100% {
      opacity: 0.3;
      transform: scaleY(1);
    }
    50% {
      opacity: 1;
      transform: scaleY(1.1);
    }
  }

  @media (max-width: 900px) {
    .hero-inner {
      flex-direction: column;
      text-align: center;
    }
  }
</style>

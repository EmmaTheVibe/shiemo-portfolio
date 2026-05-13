<script lang="ts">
  import { onMount } from "svelte";
  import ContactForm from "./ContactForm.svelte";
  import ContactIntro from "./ContactIntro.svelte";

  let el: HTMLElement;
  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) visible = true;
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<section id="contact" bind:this={el} class="contact" class:visible>
  <div class="contact-inner">
    <ContactIntro />
    <ContactForm />
  </div>
</section>

<style>
  .contact {
    padding: 100px 24px;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .contact.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .contact-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
  }

  @media (max-width: 768px) {
    .contact-inner {
      grid-template-columns: 1fr;
      gap: 48px;
    }
  }
</style>

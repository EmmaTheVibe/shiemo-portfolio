<script lang="ts">
  const { visible = false } = $props<{ visible?: boolean }>();
</script>

<div class="hero-visual" class:visible>
  <div class="hex-glow"></div>
  <div class="hex-outer">
    <div class="hex-inner">
      <svg
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--accent)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    </div>
  </div>

  <div class="particle p1"></div>
  <div class="particle p2"></div>
  <div class="particle p3"></div>
  <div class="particle p4"></div>
</div>

<style>
  .hero-visual {
    flex-shrink: 0;
    position: relative;
    width: 360px;
    height: 360px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
  }

  .hero-visual.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .hex-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      color-mix(in srgb, var(--accent) 20%, transparent) 0%,
      transparent 70%
    );
    border-radius: 50%;
    animation: breathe 4s ease-in-out infinite;
  }

  .hex-outer {
    width: 240px;
    height: 240px;
    border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation:
      morph 8s ease-in-out infinite,
      spin 20s linear infinite;
    position: relative;
  }

  .hex-inner {
    width: 160px;
    height: 160px;
    background: color-mix(in srgb, var(--accent) 8%, transparent);
    border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: counter-spin 20s linear infinite;
    backdrop-filter: blur(10px);
  }

  .particle {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
  }

  .p1 {
    top: 40px;
    right: 60px;
    animation: float1 6s ease-in-out infinite;
    opacity: 0.8;
  }

  .p2 {
    bottom: 60px;
    left: 40px;
    animation: float2 7s ease-in-out infinite 1s;
    opacity: 0.5;
    width: 4px;
    height: 4px;
    background: var(--accent-2);
  }

  .p3 {
    top: 100px;
    left: 30px;
    animation: float3 5s ease-in-out infinite 0.5s;
    opacity: 0.6;
    width: 8px;
    height: 8px;
  }

  .p4 {
    bottom: 40px;
    right: 40px;
    animation: float1 8s ease-in-out infinite 2s;
    opacity: 0.4;
    width: 5px;
    height: 5px;
    background: var(--accent-2);
  }

  @keyframes breathe {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.1);
      opacity: 1;
    }
  }

  @keyframes morph {
    0%,
    100% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    }
    25% {
      border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
    }
    50% {
      border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
    }
    75% {
      border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes counter-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }

  @keyframes float1 {
    0%,
    100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(-10px, -15px);
    }
  }

  @keyframes float2 {
    0%,
    100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(12px, -10px);
    }
  }

  @keyframes float3 {
    0%,
    100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(8px, 12px);
    }
  }

  @media (max-width: 900px) {
    .hero-visual {
      width: 260px;
      height: 260px;
      order: -1;
    }

    .hex-outer {
      width: 180px;
      height: 180px;
    }

    .hex-inner {
      width: 120px;
      height: 120px;
    }
  }
</style>

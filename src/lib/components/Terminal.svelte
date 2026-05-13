<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import TerminalWindow from "./TerminalWindow.svelte";
  import {
    initialTerminalHistory,
    terminalCommands,
    type TerminalLine,
  } from "$lib/utils/terminal";

  let input = $state("");
  let history = $state<TerminalLine[]>([]);
  let terminalEl = $state<HTMLElement>();
  let sectionEl: HTMLElement;
  let displayedHint = $state("");
  let cmdHistory: string[] = [];
  let cmdHistoryIndex = -1;
  let hintTimer: ReturnType<typeof setTimeout> | undefined;
  let hintObserver: IntersectionObserver | undefined;
  let hintStarted = false;

  const hintText = "Type help to see what you can explore.";
  const hintPrefixLength = "Type ".length;
  const hintCommandLength = "help".length;
  const hintPrefix = $derived(
    displayedHint.slice(0, Math.min(displayedHint.length, hintPrefixLength)),
  );
  const hintCommand = $derived(
    displayedHint.slice(
      hintPrefixLength,
      Math.min(displayedHint.length, hintPrefixLength + hintCommandLength),
    ),
  );
  const hintSuffix = $derived(
    displayedHint.slice(hintPrefixLength + hintCommandLength),
  );

  function run() {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    cmdHistory = [input.trim(), ...cmdHistory.slice(0, 19)];
    cmdHistoryIndex = -1;
    history = [...history, { type: "cmd", text: `$ ${input.trim()}` }];

    if (cmd === "clear") {
      history = [];
    } else if (cmd in terminalCommands) {
      const lines = terminalCommands[cmd]();
      history = [
        ...history,
        ...lines.map((text) => ({ type: "output" as const, text })),
      ];
    } else {
      history = [
        ...history,
        {
          type: "error",
          text: `Command not found: '${cmd}'. Type 'help' for available commands.`,
        },
      ];
    }

    input = "";
    tick().then(() => {
      if (terminalEl) terminalEl.scrollTop = terminalEl.scrollHeight;
    });
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      run();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistoryIndex < cmdHistory.length - 1) {
        cmdHistoryIndex++;
        input = cmdHistory[cmdHistoryIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistoryIndex > 0) {
        cmdHistoryIndex--;
        input = cmdHistory[cmdHistoryIndex];
      } else {
        cmdHistoryIndex = -1;
        input = "";
      }
    }
  }

  function startHintTypewriter() {
    if (hintStarted) return;
    hintStarted = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches) {
      displayedHint = hintText;
      return;
    }

    let index = 0;

    function typeNextCharacter() {
      displayedHint = hintText.slice(0, index);
      index += 1;

      if (index <= hintText.length) {
        hintTimer = setTimeout(typeNextCharacter, 42);
      }
    }

    typeNextCharacter();
  }

  onMount(() => {
    history = initialTerminalHistory;

    hintObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        startHintTypewriter();
        hintObserver?.disconnect();
      },
      { threshold: 0.35, rootMargin: "0px 0px -80px 0px" },
    );

    if (sectionEl) hintObserver.observe(sectionEl);
  });

  onDestroy(() => {
    if (hintTimer) clearTimeout(hintTimer);
    hintObserver?.disconnect();
  });
</script>

<section id="terminal" bind:this={sectionEl} class="terminal-section">
  <div class="terminal-inner">
    <p class="section-label">Interactive</p>
    <h2 class="section-title">
      Try the terminal<span class="accent-dot">.</span>
    </h2>
    <p class="terminal-hint" aria-label={hintText}>
      <span aria-hidden="true">
        {hintPrefix}<code>{hintCommand}</code>{hintSuffix}<span
          class="hint-caret"
          class:done={displayedHint.length === hintText.length}
        ></span>
      </span>
    </p>

    <TerminalWindow
      {history}
      bind:input
      bind:terminalEl
      onKeydown={handleKeydown}
    />
  </div>
</section>

<style>
  .terminal-section {
    padding: 100px 24px;
  }

  .terminal-inner {
    max-width: 800px;
    margin: 0 auto;
  }

  .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: var(--text);
    margin-top: 12px;
    margin-bottom: 12px;
    letter-spacing: -0.02em;
  }

  .terminal-hint {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin-bottom: 32px;
    min-height: 1.6em;
  }

  .terminal-hint code {
    font-family: var(--font-mono);
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 10%, transparent);
    padding: 2px 8px;
    border-radius: 4px;
  }

  .hint-caret {
    display: inline-block;
    width: 1px;
    height: 1em;
    margin-left: 2px;
    background: var(--accent);
    vertical-align: -0.12em;
    animation: caret-blink 0.9s steps(2, start) infinite;
  }

  .hint-caret.done {
    opacity: 0;
    animation: none;
  }

  @keyframes caret-blink {
    0%,
    45% {
      opacity: 1;
    }
    46%,
    100% {
      opacity: 0;
    }
  }
</style>

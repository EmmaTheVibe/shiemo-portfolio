<script lang="ts">
  import { onMount, tick } from "svelte";
  import TerminalWindow from "./TerminalWindow.svelte";
  import {
    initialTerminalHistory,
    terminalCommands,
    type TerminalLine,
  } from "$lib/utils/terminal";

  let input = $state("");
  let history = $state<TerminalLine[]>([]);
  let terminalEl = $state<HTMLElement>();
  let cmdHistory: string[] = [];
  let cmdHistoryIndex = -1;

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

  onMount(() => {
    history = initialTerminalHistory;
  });
</script>

<section id="terminal" class="terminal-section">
  <div class="terminal-inner">
    <p class="section-label">Interactive</p>
    <h2 class="section-title">
      Try the terminal<span class="accent-dot">.</span>
    </h2>
    <p class="terminal-hint">
      Type <code>help</code> to see what you can explore.
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
  }

  .terminal-hint code {
    font-family: var(--font-mono);
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 10%, transparent);
    padding: 2px 8px;
    border-radius: 4px;
  }
</style>

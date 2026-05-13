<script lang="ts">
  import type { TerminalLine } from "$lib/utils/terminal";

  let {
    history,
    input = $bindable(""),
    terminalEl = $bindable<HTMLElement>(),
    onKeydown,
  } = $props<{
    history: TerminalLine[];
    input?: string;
    terminalEl?: HTMLElement;
    onKeydown: (event: KeyboardEvent) => void;
  }>();
</script>

<div class="terminal-window glass">
  <div class="terminal-bar">
    <div class="dots">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
    </div>
    <span class="terminal-title mono">emmanuel@portfolio ~ </span>
  </div>

  <div class="terminal-body" bind:this={terminalEl}>
    {#each history as line}
      <div class="terminal-line {line.type}">
        <span class="mono">{line.text}</span>
      </div>
    {/each}

    <div class="terminal-input-row">
      <span class="mono prompt">$ </span>
      <input
        bind:value={input}
        onkeydown={onKeydown}
        class="terminal-input mono"
        placeholder="type a command..."
        autocomplete="off"
        spellcheck="false"
        aria-label="Terminal input"
      />
    </div>
  </div>
</div>

<style>
  .terminal-window {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 0 60px color-mix(in srgb, var(--accent) 8%, transparent);
  }

  .terminal-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    background: rgba(255, 255, 255, 0.04);
    border-bottom: 1px solid var(--border);
  }

  .dots {
    display: flex;
    gap: 6px;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .dot.red {
    background: #ff5f57;
  }

  .dot.yellow {
    background: #ffbd2e;
  }

  .dot.green {
    background: #28c840;
  }

  .terminal-title {
    font-size: 0.8rem;
    color: var(--text-muted);
    flex: 1;
    text-align: center;
  }

  .terminal-body {
    padding: 24px;
    min-height: 320px;
    max-height: 420px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
  }

  .terminal-line {
    font-size: 0.82rem;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .terminal-line.cmd {
    color: var(--accent);
  }

  .terminal-line.output {
    color: #94a3b8;
  }

  .terminal-line.error {
    color: #f87171;
  }

  .terminal-line.info {
    color: #64748b;
  }

  .terminal-input-row {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
  }

  .prompt {
    color: var(--accent);
    font-size: 0.82rem;
    flex-shrink: 0;
  }

  .terminal-input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: var(--text);
    font-size: 0.82rem;
    caret-color: var(--accent);
  }

  .terminal-input::placeholder {
    color: var(--text-dim);
  }
</style>

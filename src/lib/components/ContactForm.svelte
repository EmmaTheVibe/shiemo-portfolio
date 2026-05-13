<script lang="ts">
  import { social } from "$lib/data/projects";

  let name = $state("");
  let email = $state("");
  let message = $state("");
  let status = $state<"idle" | "sending" | "sent" | "error">("idle");
  let errors = $state({ name: "", email: "", message: "" });

  function validate() {
    const next = { name: "", email: "", message: "" };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) {
      next.email = "Please enter your email.";
    } else if (!emailPattern.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!message.trim()) next.message = "Please enter a message.";

    errors = next;
    return !next.name && !next.email && !next.message;
  }

  function clearError(field: "name" | "email" | "message") {
    if (errors[field]) errors = { ...errors, [field]: "" };
    if (status === "error" || status === "sent") status = "idle";
  }

  async function handleSubmit() {
    if (!validate()) {
      status = "error";
      return;
    }

    status = "sending";
    const subject = encodeURIComponent(`Portfolio Contact from ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    );
    window.location.href = `mailto:${social.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      status = "sent";
      name = "";
      email = "";
      message = "";
    }, 800);
  }
</script>

<div class="contact-right glass">
  <form
    onsubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}
    novalidate
  >
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        type="text"
        bind:value={name}
        placeholder="Your name"
        required
        disabled={status === "sending"}
        aria-invalid={Boolean(errors.name)}
        aria-describedby={errors.name ? "name-error" : undefined}
        oninput={() => clearError("name")}
      />
      {#if errors.name}
        <p class="field-error" id="name-error">{errors.name}</p>
      {/if}
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        bind:value={email}
        placeholder="your@email.com"
        required
        disabled={status === "sending"}
        aria-invalid={Boolean(errors.email)}
        aria-describedby={errors.email ? "email-error" : undefined}
        oninput={() => clearError("email")}
      />
      {#if errors.email}
        <p class="field-error" id="email-error">{errors.email}</p>
      {/if}
    </div>

    <div class="form-group">
      <label for="message">Message</label>
      <textarea
        id="message"
        bind:value={message}
        placeholder="Tell me about your project..."
        rows="5"
        required
        disabled={status === "sending"}
        aria-invalid={Boolean(errors.message)}
        aria-describedby={errors.message ? "message-error" : undefined}
        oninput={() => clearError("message")}
      ></textarea>
      {#if errors.message}
        <p class="field-error" id="message-error">{errors.message}</p>
      {/if}
    </div>

    <button
      type="submit"
      class="btn-primary submit-btn"
      disabled={status === "sending" || status === "sent"}
    >
      {#if status === "idle"}
        Get In Touch
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          ><line x1="5" y1="12" x2="19" y2="12" /><polyline
            points="12 5 19 12 12 19"
          /></svg
        >
      {:else if status === "sending"}
        Opening mail client...
      {:else if status === "sent"}
        Message ready
      {:else if status === "error"}
        Check highlighted fields
      {/if}
    </button>
  </form>
</div>

<style>
  .contact-right {
    border-radius: 20px;
    padding: 36px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  input,
  textarea {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 16px;
    color: var(--text);
    font-family: var(--font-display);
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.2s;
    resize: none;
  }

  input:focus,
  textarea:focus {
    border-color: var(--accent);
  }

  input[aria-invalid="true"],
  textarea[aria-invalid="true"] {
    border-color: #f87171;
  }

  .field-error {
    color: #fca5a5;
    font-size: 0.78rem;
    line-height: 1.4;
  }

  input::placeholder,
  textarea::placeholder {
    color: var(--text-dim);
  }

  input:disabled,
  textarea:disabled {
    opacity: 0.5;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px #0d0f1a inset;
    -webkit-text-fill-color: var(--text);
    transition: background-color 5000s ease-in-out 0s;
  }

  .submit-btn {
    width: 100%;
    justify-content: center;
    padding: 14px;
  }
</style>

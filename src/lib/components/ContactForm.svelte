<script lang="ts">
  import emailjs from "@emailjs/browser";
  import { onDestroy } from "svelte";
  import {
    PUBLIC_EMAILJS_PUBLIC_KEY,
    PUBLIC_EMAILJS_SERVICE_ID,
    PUBLIC_EMAILJS_TEMPLATE_ID,
  } from "$env/static/public";

  let name = $state("");
  let email = $state("");
  let message = $state("");
  let status = $state<"idle" | "sending">("idle");
  let toast = $state<{ type: "success" | "error"; message: string } | null>(
    null,
  );
  let errors = $state({ name: "", email: "", message: "" });
  let toastTimeout: ReturnType<typeof setTimeout> | undefined;

  function showToast(type: "success" | "error", toastMessage: string) {
    if (toastTimeout) clearTimeout(toastTimeout);
    toast = { type, message: toastMessage };
    toastTimeout = setTimeout(() => {
      toast = null;
    }, 4200);
  }

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
  }

  async function handleSubmit() {
    if (!validate()) {
      showToast("error", "Please check the highlighted fields.");
      return;
    }

    status = "sending";

    try {
      await emailjs.send(
        PUBLIC_EMAILJS_SERVICE_ID,
        PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        },
        PUBLIC_EMAILJS_PUBLIC_KEY,
      );

      name = "";
      email = "";
      message = "";
      showToast("success", "Message sent. I'll get back to you soon.");
    } catch (error) {
      console.error("Email send error:", error);
      showToast("error", "Message failed to send. Please try again.");
    } finally {
      status = "idle";
    }
  }

  onDestroy(() => {
    if (toastTimeout) clearTimeout(toastTimeout);
  });
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
      disabled={status === "sending"}
    >
      {#if status === "sending"}
        Sending...
      {:else}
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
      {/if}
    </button>
  </form>

  {#if toast}
    <div
      class:success={toast.type === "success"}
      class="toast"
      role="status"
      aria-live="polite"
    >
      {toast.message}
    </div>
  {/if}
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

  .toast {
    margin-top: 18px;
    padding: 12px 14px;
    border: 1px solid color-mix(in srgb, #f87171 36%, transparent);
    border-radius: 8px;
    background: color-mix(in srgb, #f87171 12%, var(--bg-2));
    color: #fecaca;
    font-size: 0.82rem;
    line-height: 1.4;
    animation: toast-in 0.34s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.22);
  }

  .toast.success {
    border-color: color-mix(in srgb, #22c55e 36%, transparent);
    background: color-mix(in srgb, #22c55e 12%, var(--bg-2));
    color: #bbf7d0;
  }

  @keyframes toast-in {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
</style>

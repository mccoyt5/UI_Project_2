<script>
  import { Link } from "svelte-routing";
  import { fly } from "svelte/transition";
  export let url;
  export let icon;
  export let backgroundColor;
  export let hasNotification = false;
  const dismiss_notification = () => (hasNotification = false);
</script>

{#if hasNotification}
  <div
    in:fly={{ x: -25, duration: 1000 }}
    out:fly={{ x: -10, duration: 1000 }}
    class="notification-container"
    style="--bColor: {backgroundColor}"
  >
    <Link to={url}>
      <div class="notification-content-container">
        <img src={icon} class="notification-icon" alt="notification icon" />
        <slot class="notification-text" name="message"
          >No notification message provided!</slot
        >
      </div>
    </Link>
    <button class="dismiss" on:click={dismiss_notification}>x</button>
  </div>
{/if}

<style>
  .notification-container {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: -0.6%;
    left: -0.4%;
    border: 2px solid black;
    border-radius: 0%;
    padding: 0px 10px 0px 1px;
    background-color: var(--bColor);
  }

  .notification-content-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .dismiss {
    position:absolute;
    top: 0;
    right: 0;
    border-radius: 0%;
    font-size: x-small;
    padding: 0;
  }

  .notification-container :global(p) {
    font-size: medium;
    font-weight: 600;
    color: black;
    text-decoration: none;
    margin: 0;
    margin-right: 3px;
  }

  .notification-icon {
    color: black;
  }
</style>

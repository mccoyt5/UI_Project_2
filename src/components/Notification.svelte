<!-- Notification.svelte -->
<script>
  import { Link } from "svelte-routing";
  export let icon;
  export let hasNotification = false;
</script>

{#if hasNotification}
  <Link to="/nutrients-level">
    <img src={icon} class="notification-icon" alt="notification icon" />
  </Link>
{/if}

<style>
  .notification-icon {
    width: 15rem;
  }
</style>

<!-- Notification.svelte -->
<script>
  import { Link } from "svelte-routing";
  import { fly } from "svelte/transition";
  export let url;
  export let icon;
  export let hasNotification = false;
</script>

{#if hasNotification}
<Link to={url}>
  <div in:fly={{x: -25, duration: 1000}} class="notification-container">
        <img src={icon} class="notification-icon" alt="notification icon" />
        <p>Plant needs attention!</p>
    </div>
  </Link>
{/if}

<style>
  .notification-container {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 3%;
    left: 1%;
    border: 2px solid black;
    padding: 1px 10px 1px 1px;
    background-color: #7c7c7c;
  }

  .notification-container p {
    font-size: small;
    font-style: italic;
    color: black;
    text-decoration: none;
  }

  .notification-icon {
    color: black;
    /* width: 15rem; */
  }
</style>

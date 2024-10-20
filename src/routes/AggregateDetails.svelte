<script>
    export let aggregateData;
</script>

<div class="notification-details">
    <div class="icon-container">
        <div class="triangle">
            <span class="plant-icon"></span>
        </div>
    </div>
    <div class="info-container">
        <p>{aggregateData.message}</p>
    </div>
</div>

<style>
    .notification-details {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .icon-container {
        margin-bottom: 1rem;
    }
    .triangle {
        width: 0;
        height: 0;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-bottom: 100px solid #f0f0f0;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .plant-icon {
        position: absolute;
        top: 50%;
        font-size: 2rem;
    }
    .info-container {
        text-align: center;
    }
</style>

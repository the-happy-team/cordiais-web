<script lang="ts">
  import Modal from "./Modal.svelte";

  const handleClick = (e) => {
    e.stopPropagation();
  };
</script>

<Modal on:close>
  <div class="about-modal" on:click={handleClick}>ABOUT</div>
</Modal>

<style lang="scss">
  .about-modal {
    position: relative;
    width: 50%;
    height: 90%;
    top: 5%;
    margin-left: 33%;
    right: 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #fff;
    overflow-y: hidden;
  }
</style>

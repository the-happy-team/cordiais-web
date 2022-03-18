<script lang="ts">
  import Modal from "./Modal.svelte";

  export let showContact = false;

  const handleClick = (e) => {
    e.stopPropagation();
  };
</script>

<Modal visible={showContact} on:close={() => {showContact = false}}>
  <div class="contact-modal" on:click={handleClick}>
    CONTACT
  </div>
</Modal>

<style lang="scss">
  .contact-modal {
    position: relative;
    width: 50%;
    height: 50%;
    top: 5%;
    margin-left: 45%;
    right: 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #fff;
    overflow-y: hidden;
  }
</style>

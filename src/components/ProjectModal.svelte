<script lang="ts">
  import Modal from "./Modal.svelte";

  const handleClick = (e) => {
    e.stopPropagation();
  };
</script>

<Modal on:close>
  <div class="contact-modal" on:click={handleClick}>
    TEXTO INTRODUTÓRIO SOBRE O PROJETO<br />
    CORDIALMENTE<br />
    XOXO
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

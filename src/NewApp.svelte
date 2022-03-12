<script lang="ts">
  const faces = [...Array(100).keys()].map((i) => {
    return {
      value: i,
    };
  });

  const handleFaceClick = (f) => {
    faces.forEach((item, i) => {
      if (item.value === f.value) {
        faces.splice(i, 1);
        faces.unshift(null);
        faces[0] = f;
      }
    });
  };
</script>

<div class="container">
  {#each faces as face (face.value)}
    <div class="face" on:click={() => handleFaceClick(face)}>{face.value}</div>
  {/each}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100vh;
    padding: 0;
    margin: 0;
    background-color: aqua;
  }

  .face {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 10%;
    height: 10%;
    border: 1px solid #000;
    box-sizing: border-box;
    background-color: bisque;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: antiquewhite;
    }
  }
</style>

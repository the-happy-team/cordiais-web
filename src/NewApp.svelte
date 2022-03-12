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
    <div class="face" on:click={() => handleFaceClick(face)}>
      <div class="face-content">{face.value}</div>
    </div>
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
    position: relative;
    display: flex;
    flex-direction: column;
    width: 10%;
    padding-bottom: 10%;
    border: 1px solid blueviolet;
    box-sizing: border-box;
    background-color: bisque;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: antiquewhite;
    }
  }

  .face-content {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>

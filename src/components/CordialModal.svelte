<script lang="ts">
  import type { CordialType } from "../types/cordiais.types";
  import { EmotionOrder } from "../types/cordiais.types";

  export let obra: CordialType;
</script>

<div>
  {obra.title} ({obra.year})
  {obra.slug}
</div>

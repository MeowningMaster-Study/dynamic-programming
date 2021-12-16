<script lang="ts">
  import { Constraints } from '@lib/calc';
  import RangeOrList from './range_or_list.svelte';
  export let steps_count: number;
  export let constraints: Constraints;
  $: constraints = new Array(steps_count + 1).fill(0).map(() => []);
</script>

{#each constraints as x, i}
  <RangeOrList
    {i}
    name="constraints"
    bind:value={x}
    listPre={`u(${i}) \\in`}
    rangePre={`|u(${i})| \\leq`}
  />
  {#if i != steps_count}<br />{/if}
{/each}

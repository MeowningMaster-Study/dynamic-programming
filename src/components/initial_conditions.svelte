<script lang="ts">
  import { Innitial } from '@lib/calc';
  import RangeOrList from './range_or_list.svelte';
  export let params_count: number;
  export let initial: Innitial;
  $: initial = new Array(params_count).fill(0).map(() => [0]);
</script>

{#each initial as x, i}
  <RangeOrList
    bind:value={x}
    listPre={`x_${i + 1}(0) \\in`}
    rangePre={`|x_${i + 1}(0)| \\leq`}
  />
  {#if i != params_count}<br />{/if}
{/each}

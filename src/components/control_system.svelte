<script lang="ts">
  import { System } from '@lib/calc';

  import Katex from './katex.svelte';
  import NumberInput from './number_input.svelte';

  export let params_count: number;
  export let system: System;
  $: system = new Array(params_count)
    .fill(0)
    .map(() => ({ x: new Array(params_count).fill(0), u: 0 }));
</script>

{#each system as row, i}
  <Katex math={`x_{${i + 1}}(i+1)=`} />
  {#each row.x as arg, i}
    <NumberInput min={0} bind:value={arg} />
    <Katex math={`x_{${i + 1}}(i)`} />
    {' + '}
  {/each}
  <NumberInput min={0} bind:value={row.u} />
  <Katex math={'u(i)'} />
  {#if i != params_count}
    <br />
  {/if}
{/each}

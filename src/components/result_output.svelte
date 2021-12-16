<script lang="ts">
  import { Result } from '@lib/calc';
  import Katex from './katex.svelte';
  export let result: Result;
  export let steps_count: number;
  export let params_count: number;
</script>

<table>
  {#if result !== undefined}
    <tr>
      <th><Katex math="N" /></th>
      {#each { length: params_count } as _, i}
        <th><Katex math={`x_{${i}}`} /></th>
      {/each}
      <th><Katex math="u" /></th>
    </tr>
    {#each { length: steps_count + 1 } as _, i}
      <tr>
        <td>{i}</td>
        {#each { length: params_count } as _, j}
          <td>{result.x[j][i]}</td>
        {/each}
        <td>{i != steps_count ? result.u[i] : ''}</td>
      </tr>
    {/each}
  {/if}
</table>

<style>
  table,
  th,
  td {
    border: 1px solid rgb(180, 173, 173);
    padding: 5px 10px;
    text-align: center;
  }
  table {
    border-collapse: collapse;
  }
</style>

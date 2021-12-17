<script lang="ts">
  import { Result } from '@lib/calc';
  import Katex from './katex.svelte';
  import { z } from 'zod';

  export let result: Result;
  export let steps_count: number;
  export let params_count: number;
  let error = false;

  $: {
    const result_schema = z.object({
      x: z
        .array(z.array(z.number()).length(steps_count + 2))
        .length(params_count),
      u: z.array(z.number()).length(steps_count + 1)
    });
    try {
      result_schema.parse(result);
      error = false;
    } catch (e) {
      error = true;
    }
  }
</script>

{#if error}
  <p style="color:red">Помилка</p>
{:else}
  <table>
    {#if result !== undefined}
      <tr>
        <th><Katex math="N" /></th>
        {#each { length: params_count } as _, i}
          <th><Katex math={`x_{${i}}`} /></th>
        {/each}
        <th><Katex math="u" /></th>
      </tr>
      {#each { length: steps_count + 2 } as _, i}
        <tr>
          <td>{i}</td>
          {#each { length: params_count } as _, j}
            <td>{Number(result.x[j][i])}</td>
          {/each}
          <td>{i != steps_count + 1 ? result.u[i] : ''}</td>
        </tr>
      {/each}
    {/if}
  </table>
{/if}

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

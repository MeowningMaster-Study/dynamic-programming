<script>
  import Katex from './katex.svelte';
  import NumberInput from './number_input.svelte';

  export let params_count = 2;
  const genValuesForParams = () => new Array(params_count).fill(0);
  const genValue = () =>
    new Array(params_count)
      .fill(0)
      .map(() => ({ xi: genValuesForParams(), u: 0 }));
  let value = genValue();
</script>

{#each value as row, i}
  <Katex math={`x_{${i + 1}}(i+1)=`} />
  {#each row.xi as arg, i}
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

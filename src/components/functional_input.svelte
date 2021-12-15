<script>
  import Katex from './katex.svelte';
  import NumberInput from './number_input.svelte';

  export let steps_count;
  export let params_count = 2;
  const genValuesForParams = () => new Array(params_count).fill(0);
  export let value = {
    xi: genValuesForParams(),
    u: 0,
    xmax: genValuesForParams()
  };
</script>

<Katex math={`Q = \\sum_{i=0}^{${steps_count}}`} />({#each value.xi as x, i}
  <NumberInput bind:value={x} min={0} /><Katex math={`x_{${i + 1}}(i)`} />
  +
{/each}<NumberInput bind:value={value.u} min={0} /><Katex math={'u(i)'} />) + {#each value.xmax as x, i}
  <NumberInput bind:value={x} min={0} /><Katex
    math={`x_{${i + 1}}(${steps_count + 1})`}
  />{i + 1 != params_count ? ' + ' : ''}
{/each}

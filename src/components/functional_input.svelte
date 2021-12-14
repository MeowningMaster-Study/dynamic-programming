<script>
  import Katex from './katex.svelte';
  import NumberInput from './number_input.svelte';

  export let time_points_count;
  export let value = {
    xi: [],
    u: 0,
    xmax: []
  };
  $: value.xi = new Array(time_points_count).fill(0).map(() => ({ value: 0 }));
  $: value.xmax = new Array(time_points_count)
    .fill(0)
    .map(() => ({ value: 0 }));
</script>

Q = <Katex math={`\\sum_{i=0}^{${time_points_count}}`} />
({#each value.xi as x, i}
  <NumberInput bind:value={x.value} /><Katex math={`x_{${i + 1}}(i)`} /> +
{/each}<NumberInput bind:value={value.u} /><Katex math={'u(i)'} />) + {#each value.xmax as x, i}
  <NumberInput bind:value={x.value} /><Katex
    math={`x_{${i + 1}}(${time_points_count + 1})`}
  />{i + 1 != time_points_count ? ' + ' : ''}
{/each}

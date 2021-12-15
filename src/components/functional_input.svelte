<script lang="ts">
  import Katex from './katex.svelte';
  import NumberInput from './number_input.svelte';
  import { Functional } from '@lib/calc';

  export let steps_count: number;
  export let params_count: number;
  const genValuesForParams = () => new Array(params_count).fill(0);
  export let value: Functional = {
    xInner: genValuesForParams(),
    uInner: 0,
    xOuter: genValuesForParams()
  };
</script>

<Katex math={`Q = \\sum_{i=0}^{${steps_count}}`} />({#each value.xInner as x, i}
  <NumberInput bind:value={x} min={0} /><Katex math={`x_{${i + 1}}(i)`} />
  +
{/each}<NumberInput bind:value={value.uInner} min={0} /><Katex math={'u(i)'} />)
+ {#each value.xOuter as x, i}
  <NumberInput bind:value={x} min={0} /><Katex
    math={`x_{${i + 1}}(${steps_count + 1})`}
  />{i + 1 != params_count ? ' + ' : ''}
{/each}

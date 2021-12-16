<script lang="ts">
  import Katex from './katex.svelte';
  import NumberInput from './number_input.svelte';
  import { Functional } from '@lib/calc';

  export let steps_count: number;
  export let params_count: number;
  export let functional: Functional;
  $: functional = {
    xInner: new Array(params_count).fill(0),
    uInner: 0,
    xOuter: new Array(params_count).fill(0)
  };
</script>

<Katex
  math={`Q = \\sum_{i=0}^{${steps_count}}`}
/>({#each functional.xInner as x, i}
  <NumberInput bind:value={x} min={0} /><Katex math={`x_{${i + 1}}(i)`} />
  +
{/each}<NumberInput bind:value={functional.uInner} min={0} /><Katex
  math={'u(i)'}
/>) + {#each functional.xOuter as x, i}
  <NumberInput bind:value={x} min={0} /><Katex
    math={`x_{${i + 1}}(${steps_count + 1})`}
  />{i + 1 != params_count ? ' + ' : ''}
{/each}

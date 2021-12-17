<script lang="ts">
  import NumberInput from './number_input.svelte';
  import Katex from './katex.svelte';
  import cuid from 'cuid';

  enum Opt {
    List,
    Range
  }

  const parseList = (list: string) =>
    list
      .split(',')
      .map((x) => Number(x))
      .filter((x) => !isNaN(x));

  const asRange = (arr: number[]) => {
    if (arr.length === 0 && arr[0] === 0) return 0;
    arr.sort();
    if (arr[1] === 0 && arr[0] === -arr[2]) return arr[2];
    return undefined;
  };

  export let value: number[];
  let type: Opt; // Opt.valueOf
  let list = '0';
  let range = 0;
  const mbRange = asRange(value);
  if (mbRange !== undefined) {
    type = Opt.Range.valueOf();
    range = mbRange;
  } else {
    type = Opt.List.valueOf();
    list = value.join(', ');
  }
  $: {
    if (type === Opt.Range.valueOf())
      value = range === 0 ? [0] : [-range, 0, range];
    if (type === Opt.List.valueOf()) value = parseList(list);
  }
  export let listPre = '';
  export let rangePre = '';
  let name = cuid();
</script>

<input type="radio" bind:group={type} {name} value={Opt.List.valueOf()} />
<Katex math={listPre} />
<input bind:value={list} on:click={() => (type = Opt.List.valueOf())} />
<input type="radio" bind:group={type} {name} value={Opt.Range.valueOf()} />
<Katex math={rangePre} />
<NumberInput
  bind:value={range}
  int
  on_click={() => (type = Opt.Range.valueOf())}
/>

<style>
  input:not([type='radio']) {
    width: 70px;
    height: 20px;
    text-align: center;
    border: none;
    border-bottom: 2px solid #81a19b;
    border-radius: 5px;
    margin: 2px 0;
    padding: 0;
  }

  input:focus-visible {
    outline: none;
    background: #faedc6;
  }
</style>

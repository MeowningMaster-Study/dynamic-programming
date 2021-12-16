<script lang="ts">
  import NumberInput from './number_input.svelte';
  import Katex from './katex.svelte';

  enum Type {
    List,
    Range
  }

  export let i: number;
  export let type = 0;
  export let list = '0';
  export let range = 0;
  export let value = [0];
  export let listPre = '';
  export let rangePre = '';
  export let name;
  $: {
    if (type === Type.List) {
      value = list
        .split(',')
        .map((x) => Number(x))
        .filter((x) => !isNaN(x));
    }

    if (type === Type.Range) {
      if (range === 0) value = [0];
      else value = [-range, 0, range];
    }
  }
</script>

<input type="radio" bind:group={type} name={`${name}${i}`} value={Type.List} />
<Katex math={listPre} />
<input bind:value={list} />
<input type="radio" bind:group={type} name={`${name}${i}`} value={Type.Range} />
<Katex math={rangePre} />
<NumberInput bind:value={range} min={0} />

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

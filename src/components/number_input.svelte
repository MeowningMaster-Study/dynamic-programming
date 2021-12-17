<script lang="ts">
  export let value: number;
  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;
  export let int = true;
  export let disabled = false;
  export let on_click = () => {};
  let n = value;
  let input: HTMLInputElement;
  let span: HTMLSpanElement;

  const on_change = () => {
    if (typeof n !== 'number') {
      n = 0;
    }
    if (min !== undefined) {
      if (n < min) {
        n = min;
      }
    }
    if (max !== undefined) {
      if (n > max) {
        n = max;
      }
    }
    if (int) {
      n = Math.trunc(n);
    }
    value = n;
    span.textContent = n.toString();
    input.style.width = span.offsetWidth + 'px';
  };
</script>

<input
  type="number"
  bind:value={n}
  on:input={on_change}
  bind:this={input}
  {disabled}
  on:click={on_click}
/>
<span bind:this={span} />

<style>
  input {
    width: 20px;
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

  span {
    position: absolute;
    left: -9999px;
    display: inline-block;
    min-width: 20px;
  }

  /* remove spit buttons */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
</style>

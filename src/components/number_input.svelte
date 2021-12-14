<script>
  export let value = 4;
  export let min = 1;
  export let max = 10;
  let n = value;

  const on_change = () => {
    if (typeof n != 'number') {
      n = 1;
    }
    min = Number(min);
    if (n < min) {
      n = min;
    }
    max = Number(max);
    if (n > max) {
      n = max;
    }
    value = n;
  };
</script>

<input type="number" on:change={on_change} bind:value={n} />

<style>
  input[type='number'] {
    width: 20px;
    text-align: center;
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

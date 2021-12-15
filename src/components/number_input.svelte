<script>
  export let value;
  export let min;
  export let max;
  let n = value;

  const on_change = () => {
    if (typeof n !== 'number') {
      n = 1;
    }
    if (typeof min === 'number') {
      if (n < min) {
        n = min;
      }
    }
    if (typeof max === 'number') {
      if (n > max) {
        n = max;
      }
      value = n;
    }
  };
</script>

<input type="number" on:change={on_change} bind:value={n} />

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

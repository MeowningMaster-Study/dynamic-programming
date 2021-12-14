<script>
  import NumberInput from '@components/number_input.svelte';
  import FunctionalInput from '@components/functional_input.svelte';
  let time_points_count;
  let functional;
</script>

<h1>Метод динамічного програмування</h1>
<h2>Калькулятор з ходом розв'язку</h2>

<p>
  Вкажіть кількість точок: <NumberInput
    bind:value={time_points_count}
    min="1"
    max="10"
  />
</p>
<p>
  Вкажіть функціонал: <FunctionalInput
    {time_points_count}
    bind:value={functional}
  />
</p>

<style>
  :global(body) {
    font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console,
      monospace;
    background-color: #fafafa;
    max-width: 650px;
    margin: 32px auto;
    padding: 0 16px;
  }

  p {
    color: #444;
    font-size: 16px;
    line-height: 1.5;
  }
</style>

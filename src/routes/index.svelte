<script>
  import NumberInput from '@components/number_input.svelte';
  import FunctionalInput from '@components/functional_input.svelte';
  import ControlSystem from '@components/control_system.svelte';
  let steps_count = 3;
  let functional;
</script>

<h1>Метод динамічного програмування</h1>
<!-- <h2>Калькулятор з ходом розв'язку</h2> -->

<p>
  Кількість кроків:
  <NumberInput bind:value={steps_count} min={1} max={10} />
</p>
<p>
  Функціонал:
  <br />
  <FunctionalInput {steps_count} bind:value={functional} />
</p>
<p>
  Система керування:
  <br />
  <ControlSystem />
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
    margin: 5px 0;
  }
</style>

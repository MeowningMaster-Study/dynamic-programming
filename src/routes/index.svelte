<script lang="ts">
  import NumberInput from '@components/number_input.svelte';
  import FunctionalInput from '@components/functional_input.svelte';
  import ControlSystem from '@components/control_system.svelte';
  import InitialConditions from '@components/initial_conditions.svelte';
  import ResultOutput from '@components/result_output.svelte';
  import {
    calc,
    Functional,
    Innitial,
    System,
    Constraints,
    Result
  } from '@lib/calc';
  import ControlConstraints from '@components/control_constraints.svelte';
  let steps_count = 2;
  let params_count = 2;
  let functional: Functional;
  let system: System;
  let initial: Innitial;
  let constraints: Constraints;
  let result: Result;

  $: {
    try {
      console.warn(
        steps_count,
        params_count,
        functional,
        system,
        initial,
        constraints
      );
      result = calc(steps_count, functional, system, initial, constraints);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<h1>Метод динамічного програмування</h1>
<!-- <h2>Калькулятор з ходом розв'язку</h2> -->

<p>
  Кількість кроків:
  <NumberInput bind:value={steps_count} min={1} max={10} />
</p>
<p>
  Кількість фазових координат:
  <NumberInput bind:value={params_count} min={1} max={5} disabled />
</p>
<p>
  Функціонал:
  <br />
  <FunctionalInput {steps_count} {params_count} bind:functional />
</p>
<p>
  Система керування:
  <br />
  <ControlSystem {params_count} bind:system />
</p>
<p>
  Початкові умови:
  <br />
  <InitialConditions {params_count} bind:initial />
</p>
<p>
  Обмеження на керування:
  <br />
  <ControlConstraints {steps_count} bind:constraints />
</p>
<h2>Результат:</h2>
<ResultOutput bind:result {steps_count} {params_count} />

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

<script lang="ts">
  import katex from 'katex';
  export let math: string;
  export let displayMode = false;

  const options = {
    displayMode: displayMode,
    throwOnError: false
  };

  $: katexString = katex.renderToString(math, options);
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css"
    integrity="sha384-R4558gYOUz8mP9YWpZJjofhk+zx0AS11p36HnD2ZKj/6JR5z27gSSULCNHIRReVs"
    crossorigin="anonymous"
  />
</svelte:head>

{@html katexString}

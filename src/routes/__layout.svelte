<script lang="ts">
  import Logo from '$lib/Logo.svelte';
	import '../app.css';
</script>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 56px 1fr;
    padding: 120px;
    row-gap: 120px;
  }

  @media(max-width: 780px) {
    .wrapper {
      padding: 20%;
    }
  }

  header {
    align-items: center;
    display: grid;
    grid-template-columns: minmax(100px, 400px);
    grid-template-rows: 56px;
    justify-content: center;
  }

  .logo-wrapper {
    max-width: 410px;
  }
</style>

<div class="wrapper">
  <header>
    <div class="logo-wrapper">
      <Logo/>
    </div>
  </header>
  <main>
    <slot />
  </main>  
</div>

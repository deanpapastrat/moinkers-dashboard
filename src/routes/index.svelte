<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import Countdown from '$lib/Countdown.svelte';
import IconCheck from '$lib/IconCheck.svelte';
import IconConfigure from '$lib/IconConfigure.svelte';
import IconShuffle from '$lib/IconShuffle.svelte';
  import TeamsConfig from '$lib/PeopleEditor.svelte';
import { randomizeTeams } from '$lib/teams';
  import TeamsList from '$lib/TeamsList.svelte';
  
  let showTeamConfig = true;
</script>

<style>
  .wrapper {
    column-gap: 120px;
    display: grid;
    grid-template-columns: 400px minmax(400px, 700px);
    justify-content: center;
  }

  .team-header {
    --team-header-border-color: var(--border-color-100);
    --team-header-text-color: var(--border-color-300);
    --team-header-action-color: var(--color-teal);

    border-bottom: 4px solid var(--team-header-border-color);
    display: flex;
    padding-bottom: 16px;
  }

  h2 {
    color: var(--team-header-text-color);
    font-size: 20px;
    font-weight: 900;
    letter-spacing: 1.8px;
    line-height: 24px;
    margin: 0 auto 0 0;
    text-transform: uppercase;
  }

  .icon-button {
    align-items: center;
    background: transparent;
    border: none;
    color: var(--team-header-action-color);
    cursor: pointer;
    display: flex;
    font-family: Nunito, sans-serif;
    font-size: 16px;
    font-weight: 700;
    margin: -12px 0 -8px 16px;
    padding: 0;
    text-transform: uppercase;
  }

  .icon-button span {
    margin: 2px 0 0 4px;
  }
</style>

<svelte:head>
<title>Moinkers</title>
</svelte:head>

<div class="wrapper">
  <section>
    <Countdown/>
  </section>
  <section>
    {#if showTeamConfig}
      <div class="team-header">        
        <h2>Edit Teams</h2>
        <button class="icon-button" on:click={() => showTeamConfig = false}>
          <IconCheck color="var(--team-header-action-color)" size="16px"/>
          <span>Done</span>
        </button>
      </div>
      <TeamsConfig/>
    {:else}
      <div class="team-header">
        <h2>Teams</h2>
        <button class="icon-button" on:click={randomizeTeams}>
          <IconShuffle color="var(--team-header-action-color)" size="16px"/>
          <span>Randomize</span>
        </button>
        <button class="icon-button" on:click={() => showTeamConfig = true}>
          <IconConfigure color="var(--team-header-action-color)" size="16px"/>
          <span>Edit</span>
        </button>
      </div>
      <TeamsList/>
    {/if}
  </section>
</div>


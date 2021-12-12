<script lang="ts">
  import type { Team } from "./teams";
  import UserTag from "./UserTag.svelte";
  export let team: Team;
</script>

<style>
  ul {
    display: flex;
    flex-flow: row wrap;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0 8px 16px 0;
  }

  p {
    --no-people-background-color: var(--border-color-100);
    --no-people-text-color: var(--border-color-300);

    background-color: var(--no-people-background-color);
    border-radius: 12px;
    box-sizing: border-box;
    color: var(--no-people-text-color);
    margin: -8px 0 32px;
    min-height: 40px;
    padding: 16px;
    width: 100%;
  }
</style>

<div>
  <h3 contenteditable="true" bind:textContent={team.name}>{team.name}</h3>
  {#if team.people.length > 0}
    <ul>
      {#each team.people as person}
        <li>
          <UserTag name={person}/>
        </li>
      {/each}
    </ul>
  {:else}
    <p>No people on this team.</p>
  {/if}
</div>
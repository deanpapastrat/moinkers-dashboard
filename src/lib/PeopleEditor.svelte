<script lang="ts">
  import IconPlus from "./IconPlus.svelte";
  import IconRemove from "./IconRemove.svelte";
  import { addPerson, randomizeTeams, removePerson, TeamId, teams } from "./teams";
  import UserTag from "./UserTag.svelte";

  let newPerson: string;
  let labelVisible: boolean = true;

  function onSubmit(event: Event) {
    event.preventDefault();
    const sanitizedNewPerson = newPerson.trim();

    if (sanitizedNewPerson) {
      addPerson(sanitizedNewPerson);
      newPerson = '';
    }
  }

  function showLabel() {
    labelVisible = !newPerson;
  }

  function hideLabel() {
    labelVisible = false;
  }
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
    position: relative;
    margin: 0 8px 16px 0;
  }

  .user-remove {
    --user-remove-icon-color: var(--border-color-300);

    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    height: 40px;
    justify-content: center;
    position: absolute;
    right: 12px;
    top: 12px;
    width: 40px;
  }

  form {
    align-items: center;
    display: grid;
    grid-template-columns: 0 1fr 0;
    padding: 16px 0;
  }

  label {
    cursor: text;
    font-size: 16px;
    line-height: 30px;
    margin-left: 20px;
    width: 90px;
    user-select: none;
    visibility: hidden;
    z-index: 1;
  }

  label.labelVisible {
    opacity: 1;
    visibility: visible;
  }

  input {
    --new-user-input-border-color: var(--border-color-200);
    --new-user-input-border-color-focus: var(--color-teal);

    background: var(--background-color);
    border: 2px solid var(--new-user-input-border-color);
    border-radius: 32px;
    color: var(--primary-text-color);
    cursor: text;
    font-family: Nunito, sans-serif;
    font-size: 16px;
    line-height: 24px;
    outline: none;
    padding: 12px 48px 12px 20px;
  }

  input:focus {
    border-color: var(--new-user-input-border-color-focus);
  }

  input:focus-visible {
    outline: default;
  }

  .person-add {
    --person-add-icon-color: var(--color-teal);

    background: transparent;
    border: 0;
    border-radius: 32px;
    cursor: pointer;
    margin-left: -48px;
    padding: 0;
    width: 40px;
  }
</style>

<form on:submit={onSubmit}>
  <label for="new-person" class:labelVisible>Add Person</label>
  <input id="new-person" name="name" bind:value={newPerson} on:focus={hideLabel} on:blur={showLabel}>
  <button class="person-add" type="submit" aria-label="Add">
    <IconPlus color="var(--person-add-icon-color)" size="28px"/>
  </button>
</form>
<ul>
  {#each $teams.team1.people as person, idx}
    <li>
      <UserTag name={person} hasButton={true}/>
      <button
        class="user-remove"
        aria-label="Remove"
        on:click={() => removePerson(TeamId.team1, idx)}
      >
       <IconRemove color="var(--user-remove-icon-color)" size="40px"/> 
      </button>
    </li>
  {/each}
  {#each $teams.team2.people as person, idx}
    <li>
      <UserTag name={person} hasButton={true}/>
      <button
        class="user-remove"
        aria-label="Remove"
        on:click={() => removePerson(TeamId.team2, idx)}
      >
        <IconRemove color="var(--user-remove-icon-color)" size="40px"/> 
      </button>
    </li>
  {/each}
</ul>
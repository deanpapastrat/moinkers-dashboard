<script lang="ts">
  import TeamView from '$lib/TeamView.svelte';
  import { teams } from '$lib/teams';
</script>

<style>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

<ul>
  <li><TeamView team={$teams.team1}/></li>
  <li><TeamView team={$teams.team2}/></li>
</ul>
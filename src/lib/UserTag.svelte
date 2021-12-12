<script lang="ts">
  import { generateFromString } from 'generate-avatar'
  export let name: string;
  export let hasButton: boolean = false;

  $:avatarUrl = `data:image/svg+xml;utf8,${generateFromString(name)}`
</script>

<style>
  div {
    --user-tag-background-color: var(--border-color-100);
    --user-tag-border-color: var(--background-color);

    align-items: center;
    background-color: var(--user-tag-background-color);
    border-radius: 40px;
    display: flex;
    font-size: 28px;
    padding: 12px 24px 12px 12px;
  }

  div.hasButton {
    padding-right: 56px;
  }

  img {
    border: 8px solid var(--user-tag-border-color);
    border-radius: 20px;
    margin-right: 12px;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<div class:hasButton>
  <img src={avatarUrl} alt="" height="24" width="24">
  <span>{name}</span>
</div>
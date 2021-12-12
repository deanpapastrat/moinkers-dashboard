<script lang="ts">
  import { onDestroy } from 'svelte';
  import { browser } from '$app/env';
  import { assets } from '$app/paths';
  import IconPlay from './IconPlay.svelte';
  import IconPause from './IconPause.svelte';
  import IconRestart from './IconRestart.svelte';

  const timerMax = 60;
  let interval: NodeJS.Timeout;
  let timer = timerMax;
  let audioContext: AudioContext,
  audioElement: HTMLAudioElement,
  audioSource: MediaElementAudioSourceNode;

  $:percentage = (Math.max(timer - 1, 0) / (timerMax - 1)) * 100;
  $:label = `${timer}s`
  $:percentageOffset = 100 - percentage;
  $:done = percentage == 0;
  $:notStarted = percentage == 100;
  $:paused = done || !interval;

  function createAudioSource() {
    if (browser && !audioElement) {
      audioElement = document.createElement('audio');
      audioElement.src = `${assets}/notification-sound.mp3`
      audioContext = new AudioContext();
      audioSource = audioContext.createMediaElementSource(audioElement);
      audioSource.connect(audioContext.destination);
    }
  }

  function tick() {
    timer = timer - 1;
    if (timer < 1) {
      timer = 0;
      audioElement.currentTime = 0;
      audioElement.play();
      clearInterval(interval);
    }
  }

  function play() {
    if (timer == 0) {
      reset();
    }
    createAudioSource();
    audioElement.play().then(() => {
      audioElement.pause();
    });
    setTimeout(() => {
      tick();
      interval = setInterval(() => tick(), 1000);
    });
  }

  function reset() {
    pause();
    timer = timerMax;
  }

  function pause() {
    interval && clearInterval(interval);
    interval = null;
  }

  function toggleTimer() {
    paused ? play() : pause();
  }

  onDestroy(() => {
    audioElement?.remove();
    pause();
  });

  let internalSvgSize = 40;
  $:internalSvgRadius = internalSvgSize / 2;
  
</script>

<style>
  .countdown-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: 400px 0;
    justify-items: center;
    max-width: 400px;
  }

  svg {
    grid-column-start: 1;
    grid-column-end: 3;
    user-select: none;
  }

  circle {
    --countdown-circle-background-color: var(--border-color-200);
    --countdown-circle-segment-color: var(--color-teal);

    opacity: 1;
    transition: stroke-dasharray 1s linear;
  }

  circle.donut-ring {
    stroke: var(--countdown-circle-background-color);
    stroke-width: 3px;
  }

  circle.donut-segment {
    fill: transparent;
    stroke: var(--countdown-circle-segment-color);
    stroke-dashoffset: 25;
    stroke-width: 3px;
  }

  circle.notStarted {
    opacity: 1;
    transition:
      opacity 0s linear 0s,
      stroke-dasharray 0s linear;
  }

  circle.done {
    opacity: 0;
    transition:
      opacity 0s linear 1s,
      stroke-dasharray 1s linear;
  }

  .value {
    fill: var(--primary-text-color);
    font-size: 0.7em;
  }

  .label {
    letter-spacing: 0.5px;
    fill: var(--border-color-300);
    font-size: 0.1em;
    font-weight: 900;
    text-transform: uppercase;
  }

  button {
    --countdown-button-background-color: var(--color-purple);
    --countdown-button-border-color: var(--background-color);
    --countdown-button-icon-color: var(--background-color);

    align-items: center;
    background: var(--countdown-button-background-color);
    border: 12px solid var(--countdown-button-border-color);
    border-radius: 48px;
    cursor: pointer;
    display: flex;
    height: 96px;
    justify-content: center;
    margin-top: -112px;
    width: 96px;
    z-index: 1;
  }
</style>

<div class="countdown-wrapper">
  <svg viewBox="0 0 {internalSvgSize} {internalSvgSize}" class="donut">
    <defs>
      <mask>
        <rect width="100%" height="100%" fill="#fff"/>
        <circle class="donut-hole" cx={internalSvgRadius} cy={internalSvgRadius} r="15.91549430918954" fill="#000"></circle>
      </mask>
    </defs>
    <circle class="donut-ring" cx={internalSvgRadius} cy={internalSvgRadius} r="16" fill="transparent"></circle>
    <circle class="donut-segment" class:done class:notStarted cx={internalSvgRadius} cy={internalSvgRadius} r="16" stroke-dasharray="{percentage} {percentageOffset}"></circle>
    <text class="value" alignment-baseline="central" text-anchor="middle" x={internalSvgRadius} y={internalSvgRadius}>{label}</text>
    <text class="label" alignment-baseline="central" text-anchor="middle" x={internalSvgRadius} y={internalSvgRadius * 1.35}>remaining</text>
  </svg>  
  <button class="restart" aria-label="Restart" on:click={reset}>
    <IconRestart color='var(--countdown-button-icon-color)' size='40px'/>
  </button>
  <button class="play" aria-label="{interval ? 'Play' : 'Pause'}" on:click={toggleTimer}>
    {#if paused}
      <IconPlay color='var(--countdown-button-icon-color)' size='72px'/>
    {:else}
      <IconPause color='var(--countdown-button-icon-color)' size='48px'/>
    {/if}
  </button>
</div>

<script lang="ts">
  import { onMount } from 'svelte';
  let input = '';
  let suggestion = '';

  function generateIdea() {
    const ideas = [
      "Add a real-time visitor counter with Go backend",
      "Integrate Three.js shader that reacts to your mouse",
      "Create a dark carbon-fiber theme with Tailwind",
      "Add voice navigation using Web Speech API"
    ];
    suggestion = ideas[Math.floor(Math.random() * ideas.length)];
  }
</script>

<div class="fixed bottom-8 right-8 glass p-6 rounded-3xl w-80">
  <div class="text-xs uppercase tracking-widest text-pink-400 mb-3">SKILL ORACLE v1.0</div>
  <input 
    bind:value={input}
    on:input={generateIdea}
    placeholder="Type your next skill or goal..."
    class="bg-transparent border-b border-white/30 w-full py-3 outline-none text-lg"
  />
  {#if suggestion}
    <div class="mt-6 text-sm text-white/80">
      ✨ Oracle suggests: <span class="text-cyan-300 font-medium">{suggestion}</span>
    </div>
  {/if}
</div>


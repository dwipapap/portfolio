<script setup lang="ts">
const {
  currentMode,
  isRunning,
  cycleCount,
  isOpen,
  progress,
  formattedTime,
  modeLabel,
  toggleTimer,
  resetTimer,
  setMode,
  skipToNext,
  fullReset,
  minimize,
  closeSlideover,
} = usePomodoro()

/* ── SVG circle maths ─────────────────────────────────── */
const circleRadius = 90
const circumference = 2 * Math.PI * circleRadius
const dashOffset = computed(() => circumference * (1 - progress.value))

/* ── Mode-dependent accent colour ─────────────────────── */
const modeColor = computed(() => {
  switch (currentMode.value) {
    case 'pomodoro': return '#bba0ca'
    case 'shortBreak': return '#6ee7b7'
    case 'longBreak': return '#93c5fd'
    default: return '#bba0ca'
  }
})

const modeIcon = computed(() => {
  switch (currentMode.value) {
    case 'pomodoro': return 'i-lucide-brain'
    case 'shortBreak': return 'i-lucide-coffee'
    case 'longBreak': return 'i-lucide-moon'
    default: return 'i-lucide-brain'
  }
})

/* ── Modes for bottom toggles ─────────────────────────── */
const modes = [
  { key: 'pomodoro' as const, label: 'Pomodoro', icon: 'i-lucide-brain' },
  { key: 'shortBreak' as const, label: 'Short Break', icon: 'i-lucide-coffee' },
  { key: 'longBreak' as const, label: 'Long Break', icon: 'i-lucide-moon' },
]

/* ── Filled cycle dots ────────────────────────────────── */
const filledDots = computed(() => cycleCount.value % 4)

/* ── Handle slideover close (X button or escape) ──────── */
function onSlideoverUpdate(val: boolean) {
  if (!val) {
    closeSlideover()
  }
}
</script>

<template>
  <USlideover :open="isOpen" side="right" :overlay="false" :dismissible="false" :ui="{
    content: 'rounded-2xl m-3 max-h-[calc(100vh-1.5rem)] bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-xl',
  }" @update:open="onSlideoverUpdate">
    <!-- Empty default so we drive open state programmatically -->
    <template #default />

    <!-- Custom header -->
    <template #header>
      <div class="flex items-center justify-between w-full px-1">
        <div class="flex items-center gap-2.5">
        </div>
        <div class="flex items-center gap-1">
          <!-- Minimize button -->
          <UButton icon="i-lucide-minus" size="sm" color="neutral" variant="ghost" class="rounded-xl"
            @click="minimize" />
        </div>
      </div>
    </template>

    <!-- Body -->
    <template #body>
      <div class="flex flex-col items-center gap-6 py-4 px-2">

        <!-- ─── Top Controls ─────────────────────────── -->
        <div class="flex items-center gap-2">
          <UButton :icon="isRunning ? 'i-lucide-pause' : 'i-lucide-play'" size="lg" color="neutral" variant="soft"
            class="rounded-xl" @click="toggleTimer" />
          <UButton icon="i-lucide-rotate-ccw" size="lg" color="neutral" variant="soft" class="rounded-xl"
            @click="resetTimer" />
          <UButton icon="i-lucide-skip-forward" size="lg" color="neutral" variant="soft" class="rounded-xl"
            @click="skipToNext" />
        </div>

        <!-- ─── Circular Timer ───────────────────────── -->
        <div class="relative w-60 h-60 flex items-center justify-center">
          <!-- Glow -->
          <div class="absolute inset-6 rounded-full blur-2xl opacity-25 transition-colors duration-500"
            :style="{ backgroundColor: modeColor }" />

          <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
            <!-- Track -->
            <circle cx="100" cy="100" :r="circleRadius" fill="none" stroke-width="5"
              class="stroke-gray-200/60 dark:stroke-gray-700/40" />
            <!-- Progress -->
            <circle cx="100" cy="100" :r="circleRadius" fill="none" stroke-width="5" stroke-linecap="round"
              :stroke="modeColor" :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset"
              class="transition-[stroke-dashoffset] duration-1000 ease-linear" />
          </svg>

          <!-- Time text -->
          <div class="relative z-10 flex flex-col items-center select-none">
            <span class="text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
              style="font-variant-numeric: tabular-nums">
              {{ formattedTime }}
            </span>
            <span class="text-[11px] uppercase tracking-[0.2em] mt-1 font-medium" :style="{ color: modeColor }">
              {{ isRunning ? 'running' : 'paused' }}
            </span>
          </div>
        </div>

        <!-- ─── Cycle Indicator ──────────────────────── -->
        <div class="flex flex-col items-center gap-2">
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Cycle {{ filledDots }} / 4
          </span>
          <div class="flex items-center gap-2">
            <div v-for="i in 4" :key="i" class="w-3 h-3 rounded-full transition-all duration-500" :style="{
              backgroundColor: i <= filledDots ? modeColor : undefined,
              boxShadow: i <= filledDots ? `0 0 8px ${modeColor}60` : 'none',
            }" :class="{
              'bg-gray-200 dark:bg-gray-700/50': i > filledDots,
              'scale-110': i <= filledDots,
            }" />
          </div>
        </div>

        <!-- ─── Mode Toggles ─────────────────────────── -->
        <div class="flex items-center gap-1 p-1 rounded-2xl bg-gray-100/70 dark:bg-gray-800/50 w-full max-w-xs">
          <button v-for="m in modes" :key="m.key"
            class="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer"
            :class="currentMode === m.key
              ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
            @click="setMode(m.key)">
            <UIcon :name="m.icon" class="w-3.5 h-3.5" />
            {{ m.label }}
          </button>
        </div>

        <!-- ─── Full Reset ────────────────────────────── -->
        <UButton v-if="cycleCount > 0 || currentMode !== 'pomodoro'" label="Reset All" icon="i-lucide-refresh-ccw"
          size="xs" color="neutral" variant="link" class="opacity-60 hover:opacity-100" @click="fullReset" />
      </div>
    </template>
  </USlideover>
</template>

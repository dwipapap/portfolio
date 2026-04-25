<script setup lang="ts">
const {
  isRunning,
  currentMode,
  isMinimized,
  formattedTime,
  maximize,
  closeIsland,
} = usePomodoro()

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

function onClose(e: Event) {
  e.stopPropagation()
  closeIsland()
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      enter-from-class="opacity-0 -translate-y-6 scale-75"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-4 scale-90"
    >
      <div
        v-if="isMinimized"
        class="pomodoro-island fixed top-4 right-4 z-60 flex items-center gap-2.5
               bg-white/50 dark:bg-gray-900/50 backdrop-blur-2xl
               border border-white/30 dark:border-white/10
               rounded-full shadow-lg shadow-black/5 dark:shadow-black/20
               select-none pl-4 pr-1.5 py-1.5"
      >
        <!-- Clickable main area to maximize -->
        <button
          class="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity duration-150"
          @click="maximize"
        >
          <!-- Pulsing dot when running -->
          <span class="relative flex items-center justify-center w-5 h-5">
            <span
              v-if="isRunning"
              class="absolute inset-0 rounded-full animate-ping opacity-40"
              :style="{ backgroundColor: modeColor }"
            />
            <UIcon :name="modeIcon" class="relative w-4 h-4" :style="{ color: modeColor }" />
          </span>

          <!-- Timer -->
          <span
            class="text-sm font-bold tracking-tight text-gray-900 dark:text-white"
            style="font-variant-numeric: tabular-nums"
          >
            {{ formattedTime }}
          </span>

          <!-- Mode pill -->
          <span
            class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
            :style="{
              backgroundColor: modeColor + '1A',
              color: modeColor,
            }"
          >
            {{ currentMode === 'pomodoro' ? 'Focus' : currentMode === 'shortBreak' ? 'Break' : 'Rest' }}
          </span>
        </button>

        <!-- Close button -->
        <button
          class="flex items-center justify-center w-6 h-6 rounded-full
                 text-gray-400 dark:text-gray-500
                 hover:text-gray-600 dark:hover:text-gray-300
                 hover:bg-gray-200/50 dark:hover:bg-gray-700/50
                 transition-all duration-150 cursor-pointer"
          title="Close & reset timer"
          @click="onClose"
        >
          <UIcon name="i-lucide-x" class="w-3.5 h-3.5" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

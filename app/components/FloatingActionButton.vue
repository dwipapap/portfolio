<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  imageSrc: {
    type: String,
    default: '/takodachi.png'
  },
  audioSrc: {
    type: String,
    default: '/ina-wah.mp3'
  },
  volume: {
    type: Number,
    default: 0.5
  }
})

const isMounted = ref(false)
const imageError = ref(false)

/* Use the global pomodoro store to control slideover */
const { openSlideover } = usePomodoro()

onMounted(() => {
  isMounted.value = true
})

const playAudio = () => {
  // Respect prefers-reduced-motion
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  if (!props.audioSrc) return

  try {
    const audio = new Audio(props.audioSrc)
    audio.volume = props.volume
    audio.play().catch(() => {
      // Silent fail if audio playback is blocked (e.g., missing file or browser block)
    })
  } catch (err) {
    // Silent fail
  }
}

const handleClick = () => {
  playAudio()
}

const onImageError = () => {
  imageError.value = true
}

const openPomodoro = () => {
  openSlideover()
}

// Widget items for the popover menu
const widgets = [
  {
    label: 'Pomodoro Timer',
    icon: 'i-lucide-timer',
    description: 'Focus & break timer',
    action: openPomodoro,
    iconClass: 'text-purple-600 dark:text-purple-400'
  },
  {
    label: 'Daily Tasks',
    icon: 'i-lucide-list-todo',
    action: () => {},
    iconClass: 'text-gray-600 dark:text-gray-400'
  },
  {
    label: 'Quick Notes',
    icon: 'i-lucide-sticky-note',
    action: () => {},
    iconClass: 'text-gray-600 dark:text-gray-400'
  }
]
</script>

<template>
  <div class="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50">
    <Transition
      appear
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 scale-50 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-50 translate-y-4"
    >
      <div v-if="isMounted">
        <UPopover
          arrow
          :content="{ side: 'top', align: 'end', sideOffset: 12 }"
        >
          <template #default="{ open }">
            <button
              v-if="!imageError"
              type="button"
              class="w-16 h-16 md:w-24 md:h-24 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 flex items-center justify-center cursor-pointer"
              @click="handleClick"
            >
              <div class="w-full h-full flex items-center justify-center" :class="[open ? '' : 'animate-subtle-bounce']">
                <img
                  :src="imageSrc"
                  alt="Floating Action Menu"
                  class="w-full h-full object-contain transition-transform duration-300 drop-shadow-xl"
                  :class="{ 'scale-110 rotate-12': open }"
                  @error="onImageError"
                />
              </div>
            </button>
            
            <UButton
              v-else
              icon="i-heroicons-plus"
              size="xl"
              color="primary"
              variant="solid"
              class="w-[56px] h-[56px] md:w-[96px] md:h-[96px] flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
              @click="handleClick"
            />
          </template>

          <template #content>
            <div class="p-3 w-64 sm:w-72">
              <div class="space-y-3">
                <!-- Header -->
                <div class="flex items-center gap-2 px-1 pb-2 border-b border-gray-200 dark:border-gray-700/60">
                  <UIcon name="i-lucide-layout-grid" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span class="font-semibold text-base text-gray-900 dark:text-white">Widgets</span>
                </div>

                <!-- Widget List -->
                <div class="flex flex-col gap-0.5">
                  <button
                    v-for="widget in widgets"
                    :key="widget.label"
                    class="group flex items-center gap-3 w-full px-2.5 py-2.5 rounded-lg text-left transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800/60 cursor-pointer"
                    @click="widget.action"
                  >
                    <div 
                      class="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 group-hover:scale-110"
                      :class="widget.iconClass"
                    >
                      <UIcon :name="widget.icon" class="w-5 h-5" />
                    </div>
                    <div class="flex flex-col min-w-0">
                      <span class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ widget.label }}
                      </span>
                      <span v-if="widget.description" class="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {{ widget.description }}
                      </span>
                    </div>
                    <UIcon 
                      name="i-lucide-chevron-right" 
                      class="w-4 h-4 ml-auto text-gray-400 dark:text-gray-500 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </button>
                </div>
              </div>
            </div>
          </template>
        </UPopover>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@keyframes subtle-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-subtle-bounce {
  animation: subtle-bounce 3.5s ease-in-out infinite;
}
</style>
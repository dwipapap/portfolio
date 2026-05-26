<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  imageSrc?: string
  audioSrc?: string
  volume?: number
}>(), {
  imageSrc: '/takodachi.png',
  audioSrc: '/ina-wah.mp3',
  volume: 0.5,
})

const isMounted = ref(false)
const imageError = ref(false)
let _audio: HTMLAudioElement | null = null

const router = useRouter()
const { isRunning, formattedTime, modeLabel, openSlideover } = usePomodoro()

onMounted(() => {
  isMounted.value = true
})

const playAudio = () => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!props.audioSrc) return
  if (!_audio) {
    _audio = new Audio(props.audioSrc)
    _audio.volume = props.volume
  }
  _audio.currentTime = 0
  _audio.play().catch(() => {})
}

const handleClick = () => {
  playAudio()
}

const onImageError = () => {
  imageError.value = true
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

interface Widget {
  id: string
  label: string
  icon: string
  description: string
  iconClass: string
  action: () => void
}

const widgets = computed<Widget[]>(() => [
  {
    id: 'pomodoro',
    label: 'Pomodoro Timer',
    icon: 'i-lucide-timer',
    description: isRunning.value
      ? `${formattedTime.value} \u00B7 ${modeLabel.value}`
      : 'Focus & break timer',
    iconClass: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30',
    action: openSlideover,
  },
  {
    id: 'about',
    label: 'About Me',
    icon: 'i-lucide-user',
    description: 'Background & experience',
    iconClass: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30',
    action: () => scrollToSection('about'),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: 'i-lucide-folder-git-2',
    description: "What I've built",
    iconClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30',
    action: () => scrollToSection('projects'),
  },
  {
    id: 'manga',
    label: 'Manga Recs',
    icon: 'i-lucide-book-open',
    description: 'Coming soon',
    iconClass: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30',
    action: () => router.push('/manga'),
  },
])
</script>

<template>
  <div class="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50">
    <Transition
appear enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 scale-50 translate-y-4" enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in" leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-50 translate-y-4">
      <div v-if="isMounted">
        <UPopover arrow :content="{ side: 'top', align: 'end', sideOffset: 12 }">
          <template #default="{ open }">
            <button
v-if="!imageError" type="button"
              class="relative w-16 h-16 md:w-24 md:h-24 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 flex items-center justify-center cursor-pointer"
              @click="handleClick">
              <div
v-if="isRunning"
                class="absolute inset-0 rounded-full ring-2 ring-purple-400/50 animate-pulse pointer-events-none" />
              <div class="w-full h-full flex items-center justify-center">
                <img
:src="imageSrc" alt="Takodachi mascot"
                  class="w-full h-full object-contain transition-transform duration-300 drop-shadow-xl"
                  :class="{ 'scale-110 rotate-12': open }" @error="onImageError" >
              </div>
            </button>

            <UButton
v-else icon="i-heroicons-plus" size="xl" color="primary" variant="solid"
              class="w-[56px] h-[56px] md:w-[96px] md:h-[96px] flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
              @click="handleClick" />
          </template>

          <template #content>
            <div class="p-2 w-64 sm:w-72">
              <div class="flex flex-col gap-1">
                <button
v-for="widget in widgets" :key="widget.id"
                  class="group relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800/60 cursor-pointer"
                  @click="widget.action">
                  <div
                    class="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 group-hover:scale-110"
                    :class="widget.iconClass">
                    <UIcon :name="widget.icon" class="w-5 h-5" />
                  </div>
                  <div class="flex flex-col min-w-0 flex-1">
                    <span class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ widget.label }}
                    </span>
                    <span class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 truncate">
                      <span
v-if="widget.id === 'pomodoro' && isRunning"
                        class="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                      {{ widget.description }}
                    </span>
                  </div>
                  <UIcon
name="i-lucide-chevron-right"
                    class="w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
                </button>
              </div>
            </div>
          </template>
        </UPopover>
      </div>
    </Transition>
  </div>
</template>

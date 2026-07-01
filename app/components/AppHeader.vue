<script setup lang="ts">
const colorMode = useColorMode()
const route = useRoute()
const router = useRouter()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark: boolean) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  },
})

const isHome = computed(() => route.path === '/')

const navItems = [
  { id: 'home', icon: 'i-lucide-home', label: 'Home', href: '#home' },
  { id: 'about', icon: 'i-lucide-user', label: 'About', href: '#about' },
  { id: 'services', icon: 'i-lucide-layers', label: 'Services', href: '#services' },
  { id: 'skills', icon: 'i-lucide-wrench', label: 'Skills', href: '#skills' },
  { id: 'experience', icon: 'i-lucide-briefcase', label: 'Experience', href: '#experience' },
  { id: 'publications', icon: 'i-lucide-scroll-text', label: 'Publications', href: '#publications' },
  { id: 'projects', icon: 'i-lucide-folder', label: 'Projects', href: '#projects' },
]

const activeSection = ref('')

function scrollToSection(href: string) {
  const id = href.replace('#', '')
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    activeSection.value = id
  }
}

const isProjectsOpen = useState('projects-drawer-open', () => false)
const projectsDirection = useState<'left' | 'bottom'>('projects-drawer-direction', () => 'bottom')

function handleNavClick(item: { id: string, icon: string, label: string, href: string }) {
  if (item.id === 'projects') {
    projectsDirection.value = 'bottom'
    isProjectsOpen.value = true
    return
  }

  const id = item.href.replace('#', '')

  if (isHome.value) {
    scrollToSection(item.href)
  } else {
    router.push({ path: '/', hash: `#${id}` })
  }
}

let observer: IntersectionObserver | null = null

const observerOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px',
  threshold: 0,
}

function setupObserver() {
  if (observer) observer.disconnect()

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, observerOptions)

  navItems.forEach((item) => {
    const id = item.href.replace('#', '')
    const element = document.getElementById(id)
    if (element) observer?.observe(element)
  })
}

onMounted(() => {
  if (isHome.value) setupObserver()
})

watch(isHome, (home) => {
  if (home) {
    nextTick(setupObserver)
  } else {
    activeSection.value = ''
  }
})
</script>

<template>
  <!-- Desktop Header: floating pill design -->
  <header class="hidden md:block fixed top-1/2 -translate-y-1/2 left-6 z-50">
    <nav
      class="inline-flex flex-col items-center bg-white dark:bg-gray-900 rounded-full px-2.5 py-4 shadow-xl border border-gray-200 dark:border-gray-700">
      <div class="flex flex-col items-center gap-2">
        <UButton
v-for="item in navItems" :key="item.id" :icon="item.icon" size="xl" variant="ghost"
          color="neutral" :class="activeSection === item.id
            ? 'text-purple-700'
            : ''
          " :aria-label="item.label" @click="handleNavClick(item)" />
      </div>

      <ClientOnly>
        <UButton
:icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" size="xl" color="neutral" variant="ghost"
          class="mt-6" aria-label="Toggle color mode" @click="isDark = !isDark" />
        <template #fallback>
          <div class="size-10 mt-6" />
        </template>
      </ClientOnly>
    </nav>
  </header>

  <!-- Mobile Bottom Tab Bar -->
  <header
    class="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-100 w-max max-w-[95vw] pb-[max(0px,env(safe-area-inset-bottom))]">
    <nav
      class="flex items-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-xl border border-gray-200 dark:border-gray-700 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div class="flex items-center gap-1 sm:gap-1.5">
        <UButton
v-for="item in navItems" :key="item.id" :icon="item.icon" size="lg" variant="ghost"
          color="neutral" class="shrink-0" :class="activeSection === item.id
            ? 'text-purple-700'
            : ''
          " :aria-label="item.label" @click="handleNavClick(item)" />
      </div>

      <div class="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2 sm:mx-2.5 shrink-0"/>

      <ClientOnly>
        <UButton
:icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" size="lg" color="neutral" variant="ghost"
          class="shrink-0" aria-label="Toggle color mode" @click="isDark = !isDark" />
        <template #fallback>
          <div class="size-8 shrink-0" />
        </template>
      </ClientOnly>
    </nav>
  </header>
</template>

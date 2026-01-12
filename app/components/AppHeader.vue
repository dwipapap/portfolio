<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark: boolean) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  },
})

const navItems = [
  { icon: 'i-lucide-home', label: 'Home', href: '#home' },
  { icon: 'i-lucide-user', label: 'About', href: '#about' },
  { icon: 'i-lucide-wrench', label: 'Skills', href: '#skills' },
  { icon: 'i-lucide-folder', label: 'Projects', href: '#projects' },
]

const activeSection = ref('home')

function scrollToSection(href: string) {
  const id = href.replace('#', '')
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    activeSection.value = id
  }
}

onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, observerOptions)

  navItems.forEach((item) => {
    const id = item.href.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      observer.observe(element)
    }
  })
})
</script>

<template>
  <header class="fixed top-6 left-1/2 -translate-x-1/2 z-50">
    <nav
      class="inline-flex items-center bg-white dark:bg-gray-900 rounded-full px-4 py-2.5 shadow-xl border border-gray-200 dark:border-gray-700"
    >
      <div class="flex items-center gap-1">
        <UButton
          v-for="item in navItems"
          :key="item.label"
          :icon="item.icon"
          size="xl"
          variant="ghost"
          color="neutral"
          :class="activeSection === item.href.replace('#', '') ? 'text-purple-500' : ''"
          :aria-label="item.label"
          @click="scrollToSection(item.href)"
        />
      </div>

      <ClientOnly>
        <UButton
          :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
          size="xl"
          color="neutral"
          variant="ghost"
          class="ml-6"
          aria-label="Toggle color mode"
          @click="isDark = !isDark"
        />
        <template #fallback>
          <div class="size-10 ml-6" />
        </template>
      </ClientOnly>
    </nav>
  </header>
</template>

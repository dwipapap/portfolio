<script setup lang="ts">
useSeoMeta({
  title: 'Manga Recommendations - Dwipa Amedihardjo',
  description: 'A curated list of manga I have read and enjoyed, straight from MyAnimeList.',
})

const router = useRouter()

interface Manga {
  id: number
  title: string
  picture?: string
  score: number
  userStatus: string
  meanScore: number
  synopsis?: string
  authors: string
  chapters: number
  volumes: number
}

const { data: mangas, pending, error, refresh: refreshNuxtData } = useFetch<Manga[]>('/api/manga')

const statusFilters = [
  { label: 'All', value: '' },
  { label: 'Completed', value: 'completed' },
  { label: 'Reading', value: 'reading' },
  { label: 'Plan to Read', value: 'plan_to_read' },
] as const

const sortOptions = [
  { label: 'Score', value: 'score' },
  { label: 'Title', value: 'title' },
  { label: 'Chapters', value: 'chapters' },
  { label: 'Global Rating', value: 'meanScore' },
] as const

const activeStatus = ref('')
const sortBy = ref('score')
const sortOrder = ref<'desc' | 'asc'>('desc')

function toggleSort(key: typeof sortOptions[number]['value']) {
  if (sortBy.value === key) {
    sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
  } else {
    sortBy.value = key
    sortOrder.value = 'desc'
  }
}

const filteredMangas = computed(() => {
  const list = mangas.value || []
  let result = activeStatus.value
    ? list.filter(m => m.userStatus === activeStatus.value)
    : list
  result = [...result].sort((a, b) => {
    const valA = a[sortBy.value as keyof Manga] ?? ''
    const valB = b[sortBy.value as keyof Manga] ?? ''
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder.value === 'desc' ? valB - valA : valA - valB
    }
    return sortOrder.value === 'desc'
      ? String(valB).localeCompare(String(valA))
      : String(valA).localeCompare(String(valB))
  })
  return result
})
</script>

<template>
  <main class="min-h-[85vh] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h1 class="text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white mb-6">
        Manga Recommendations
      </h1>
      <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
        A curated collection of my favorite manga, fetched directly from my MyAnimeList profile. 
        These are the stories that have left a lasting impression on me.
      </p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="text-center p-8 rounded-3xl bg-red-50 dark:bg-red-900/20 max-w-2xl mx-auto border border-red-100 dark:border-red-900/50">
      <UIcon name="i-lucide-alert-circle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-red-800 dark:text-red-300">Failed to load manga list</h3>
      <p class="text-red-600 dark:text-red-400 mt-2">{{ error.message }}</p>
      <UButton color="error" variant="soft" class="mt-6 rounded-full" @click="() => refreshNuxtData()">Try Again</UButton>
    </div>

    <!-- Loading State -->
    <div v-else-if="pending" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
      <div v-for="i in 8" :key="i" class="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
        <USkeleton class="aspect-[4/5] w-full rounded-none" />
        <div class="p-4 space-y-3">
          <USkeleton class="h-5 w-3/4" />
          <USkeleton class="h-3 w-1/2" />
          <div class="space-y-1.5">
            <USkeleton class="h-3.5 w-full" />
            <USkeleton class="h-3.5 w-full" />
            <USkeleton class="h-3.5 w-2/3" />
          </div>
          <div class="pt-3 border-t border-gray-100 dark:border-gray-700/50 flex justify-between">
            <USkeleton class="h-3.5 w-16" />
            <USkeleton class="h-3.5 w-12" />
          </div>
        </div>
      </div>
    </div>

    <!-- Data Grid -->
    <template v-else-if="mangas && mangas.length">
      <!-- Filter & Sort Controls -->
      <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-8 pb-4 border-b border-gray-200/60 dark:border-gray-800/60">
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mr-1">Status</span>
            <button
              v-for="f in statusFilters"
              :key="f.value"
              :class="[
                'text-sm font-medium px-4 py-2 rounded-full transition-colors',
                activeStatus === f.value
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              ]"
              @click="activeStatus = f.value"
            >
              {{ f.label }}
            </button>
          </div>

          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mr-1">Sort</span>
            <button
              v-for="opt in sortOptions"
              :key="opt.value"
              :class="[
                'text-sm font-medium px-4 py-2 rounded-full transition-colors',
                sortBy === opt.value
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              ]"
              @click="toggleSort(opt.value)"
            >
              {{ opt.label }}<span v-if="sortBy === opt.value" class="ml-1 text-xs">{{ sortOrder === 'desc' ? '↓' : '↑' }}</span>
            </button>
          </div>
        </div>

        <div class="sm:ml-auto text-sm text-gray-400 dark:text-gray-500 tabular-nums">
          <span class="text-purple-600 dark:text-purple-400 font-semibold">{{ filteredMangas.length }}</span> of {{ mangas.length }}
        </div>
      </div>

      <!-- Cards -->
      <div v-if="filteredMangas.length" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
        <div 
          v-for="manga in filteredMangas" 
          :key="manga.id"
          class="group relative flex flex-col bg-gray-50 dark:bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-100 hover:border-purple-200/60 dark:border-gray-800 dark:hover:border-purple-800/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out"
        >
          <div class="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img 
              v-if="manga.picture"
              :src="manga.picture" 
              :alt="manga.title" 
              class="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <UIcon name="i-lucide-image" class="w-10 h-10 text-gray-300 dark:text-gray-600" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none" />
          </div>

          <div class="p-4 flex-1 flex flex-col gap-2.5">
            <div>
              <h3 class="text-base font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-500">
                {{ manga.title }}
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-between gap-2">
                <span class="truncate">{{ manga.authors }}</span>
                <UBadge 
                  color="primary"
                  size="sm"
                  variant="subtle"
                  class="font-bold shrink-0 px-2 py-0.5"
                >
                  <UIcon name="i-lucide-star" class="w-3 h-3 mr-0.5" />
                  {{ manga.score > 0 ? manga.score + '/10' : '--' }}
                </UBadge>
              </p>
            </div>
            
            <p class="hidden lg:line-clamp-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ manga.synopsis || 'No synopsis available.' }}
            </p>
            
            <div class="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700/50 mt-auto">
              <span class="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                <UIcon name="i-lucide-book-open" class="w-3.5 h-3.5" />
                {{ manga.chapters > 0 ? manga.chapters + ' ch' : 'ongoing' }}
              </span>
              <span class="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 ml-auto">
                <UIcon name="i-lucide-globe" class="w-3.5 h-3.5" />
                {{ manga.meanScore || 'N/A' }}
              </span>
            </div>
          </div>
          
          <a 
            :href="`https://myanimelist.net/manga/${manga.id}`" 
            target="_blank" 
            rel="noopener noreferrer"
            class="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset rounded-2xl"
            :aria-label="`View ${manga.title} on MyAnimeList`"
          ></a>
        </div>
      </div>

      <!-- Filtered Empty State -->
      <div v-else class="text-center p-8 sm:p-16 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 max-w-2xl mx-auto">
        <div class="mx-auto w-24 h-24 mb-6 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
          <UIcon name="i-lucide-search-x" class="w-12 h-12 text-purple-500 dark:text-purple-400" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">No manga match this filter</h3>
        <p class="text-lg text-gray-500 dark:text-gray-400 mb-6">
          Try a different status or sort option.
        </p>
        <UButton color="neutral" variant="soft" class="rounded-full" @click="activeStatus = ''">
          Clear Filter
        </UButton>
      </div>
    </template>

    <!-- Empty State -->
    <div v-else class="text-center p-8 sm:p-16 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 max-w-2xl mx-auto">
<div class="mx-auto w-24 h-24 mb-6 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
          <UIcon name="i-lucide-library" class="w-12 h-12 text-purple-500 dark:text-purple-400" />
        </div>
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">No recommendations found</h3>
      <p class="text-lg text-gray-500 dark:text-gray-400">
        It looks like there are no manga in your MyAnimeList profile yet.
      </p>
    </div>

    <!-- Back link -->
    <div class="mt-16 sm:mt-20 text-center">
      <UButton
        variant="ghost"
        color="neutral"
        icon="i-lucide-arrow-left"
        size="xl"
        class="rounded-full px-8 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        @click="router.push('/')"
      >
        Back to Home
      </UButton>
    </div>
  </main>
</template>

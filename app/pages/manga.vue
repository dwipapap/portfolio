<script setup lang="ts">
useSeoMeta({
  title: 'Manga Recommendations - Dwipa Amedihardjo',
  description: 'Manga and anime I have read and enjoyed. Recommendations coming soon.',
})

const router = useRouter()
</script>

<template>
  <main class="min-h-[85vh] flex items-center justify-center px-4 pt-24 pb-16">
    <div class="w-full max-w-2xl mx-auto text-center">
      <!-- Icon -->
      <div
        class="mx-auto mb-8 flex items-center justify-center w-20 h-20 rounded-2xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
      >
        <UIcon name="i-lucide-book-open" class="w-10 h-10" />
      </div>

      <!-- Title -->
      <h1
        class="text-[clamp(1.75rem,3.5vw,1.875rem)] font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
      >
        Manga Recommendations
      </h1>

      <!-- Subtitle -->
      <p class="mt-4 text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
        A curated list of manga and anime I have read and enjoyed.
        <span class="text-gray-400 dark:text-gray-500">Still compiling the list — check back soon.</span>
      </p>

      <!-- Placeholder card -->
      <div
        class="mt-10 p-8 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/20"
      >
        <UIcon
          name="i-lucide-library"
          class="mx-auto w-12 h-12 text-gray-300 dark:text-gray-600"
        />
        <p class="mt-4 text-sm text-gray-400 dark:text-gray-500">
          No recommendations yet
        </p>
      </div>

      <!-- Back link -->
      <UButton
        variant="ghost"
        color="neutral"
        icon="i-lucide-arrow-left"
        class="mt-10"
        @click="router.push('/')"
      >
        Back to home
      </UButton>
    </div>
  </main>
</template>

<template>
  <UApp>
    <NuxtImg
      src="/inabg.png"
      format="webp"
      loading="lazy"
      fetchpriority="low"
      aria-hidden="true"
      class="fixed inset-0 w-full h-full object-cover z-[-1] pointer-events-none opacity-[0.03] dark:opacity-[0.02]"
    />
    <AppHeader />
    <NuxtPage />
    <ClientOnly><FloatingActionButton /></ClientOnly>
    <PomodoroSlideover />
    <PomodoroIsland />
  </UApp>
</template>

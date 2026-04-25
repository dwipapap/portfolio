<script setup lang="ts">
useSeoMeta({
    title: 'Dwipa Amedihardjo - Frontend Engineer & IT Support',
    description: 'Portfolio of Dwipa Amedihardjo, a Frontend Engineer and IT Support specialist. Building seamless digital experiences with Vue.js, React, and modern web technologies.',
    ogTitle: 'Dwipa Amedihardjo - Frontend Engineer & IT Support',
    ogDescription: 'Portfolio showcasing projects in frontend development and IT infrastructure management.',
    ogImage: '/og-image.png',
    twitterCard: 'summary_large_image',
})
</script>

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
        <main>
            <HeroSection />
            <AboutSection />
            <WhatIDoSection />
            <SkillsSection />
            <ExperiencesSection />
            <ProjectsSection />
        </main>
        <FloatingActionButton />
        <PomodoroSlideover />
        <PomodoroIsland />
    </UApp>
</template>

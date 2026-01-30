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
        <AppHeader />
        <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperiencesSection />
            <ProjectsSection />
        </main>
    </UApp>
</template>

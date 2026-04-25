<script setup lang="ts">
const { addRef } = useScrollAnimation(0.1);

const socialLinks = [
    {
        label: "WhatsApp",
        icon: "i-simple-icons-whatsapp",
        to: "https://wa.me/6289504166115",
    },
    {
        label: "Instagram",
        icon: "i-simple-icons-instagram",
        to: "https://instagram.com/dwipaa11",
    },
    {
        label: "GitHub",
        icon: "i-simple-icons-github",
        to: "https://github.com/dwipapap",
    },
];
</script>

<template>
    <section id="home" class="min-h-[85vh] flex items-center pt-24 pb-16">
        <div
            class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-24">
            <div class="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                <h1 :ref="addRef"
                    class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight scroll-animate"
                    :style="{ transitionDelay: '0.1s' }">
                    Wah, I'm Dwipa Amedihardjo!
                </h1>

                <h2 :ref="addRef"
                    class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-6 scroll-animate"
                    :style="{ transitionDelay: '0.2s' }">
                    Frontend Engineer, IT Support & Consultant
                </h2>

                <p :ref="addRef"
                    class="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-lg leading-relaxed scroll-animate"
                    :style="{ transitionDelay: '0.3s' }">
                    I build seamless digital experiences where design meets
                    functionality. Bringing ideas to life through code and creative
                    problem-solving.
                </p>

                <div :ref="addRef"
                    class="flex flex-wrap items-center justify-center md:justify-start gap-6 scroll-animate"
                    :style="{ transitionDelay: '0.4s' }">
                    <UButton to="/CurriculumVitae.pdf" icon="i-lucide-download" color="neutral" variant="solid"
                        size="lg" class="px-6 rounded-full shadow-sm" download>
                        Download CV
                    </UButton>

                    <div class="flex items-center gap-4">
                        <UButton v-for="link in socialLinks" :key="link.label" :to="link.to" :icon="link.icon"
                            :aria-label="link.label" color="neutral" variant="ghost" size="lg" target="_blank"
                            class="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" />
                    </div>
                </div>
            </div>

            <div :ref="addRef" class="shrink-0 relative scroll-animate" :style="{ transitionDelay: '0.1s' }">
                <img src="/placeholder1.webp" alt="Dwipa Amedihardjo"
                    class="w-48 h-48 md:w-72 md:h-72 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800 rounded-full object-cover">
            </div>
        </div>
    </section>
</template>

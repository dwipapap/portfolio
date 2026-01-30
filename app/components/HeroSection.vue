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
    <section
        id="home"
        class="flex flex-col md:flex-row items-center justify-center gap-12 pt-32 pb-16 px-4 md:text-left text-center"
    >
        <div :ref="addRef" class="relative group scroll-animate shrink-0">
            <div
                class="absolute -inset-1 bg-purple-900 rounded-full opacity-25 transition duration-1000"
            />
            <UAvatar
                src="/placeholder1.webp"
                alt="Dwipa Amedihardjo"
                size="4xl"
                class="relative ring-4 ring-white dark:ring-gray-900 size-48 md:size-64"
            />
        </div>

        <div class="flex flex-col items-center md:items-start max-w-2xl">
            <h1
                :ref="addRef"
                class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight scroll-animate"
                :style="{ transitionDelay: '0.1s' }"
            >
                Wah!, I'm Dwipa Amedihardjo
            </h1>

            <h2
                :ref="addRef"
                class="text-xl md:text-2xl font-medium text-purple-700 dark:text-purple-400 mb-6 scroll-animate"
                :style="{ transitionDelay: '0.2s' }"
            >
                Frontend Engineer & IT Support
            </h2>

            <p
                :ref="addRef"
                class="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed scroll-animate"
                :style="{ transitionDelay: '0.3s' }"
            >
                I build seamless digital experiences where design meets
                functionality. Bringing ideas to life through code and creative
                problem-solving.
            </p>

            <div
                :ref="addRef"
                class="flex flex-col sm:flex-row items-center gap-8 scroll-animate"
                :style="{ transitionDelay: '0.4s' }"
            >
                <UButton
                    to="/CurriculumVitae.pdf"
                    icon="i-lucide-download"
                    color="neutral"
                    variant="solid"
                    size="xl"
                    class="px-8"
                    download
                >
                    Download my CV
                </UButton>

                <div class="flex items-center gap-4">
                    <UButton
                        v-for="link in socialLinks"
                        :key="link.label"
                        :to="link.to"
                        :icon="link.icon"
                        :aria-label="link.label"
                        color="neutral"
                        variant="ghost"
                        size="xl"
                        target="_blank"
                        class="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

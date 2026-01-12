<script setup lang="ts">
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
        class="flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center"
    >
        <div class="mb-8 relative group">
            <div
                class="absolute -inset-1 bg-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"
            />
            <UAvatar
                src="/placeholder.webp"
                alt="Dwipa Amedihardjo"
                size="3xl"
                class="relative ring-4 ring-white dark:ring-gray-900"
            />
        </div>

        <h1
            class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight"
        >
            Hey, I'm Dwipa Amedihardjo
        </h1>

        <h2
            class="text-xl md:text-2xl font-medium text-purple-600 dark:text-purple-400 mb-6"
        >
            Frontend Engineer & IT Support
        </h2>

        <p
            class="max-w-2xl text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed"
        >
            I build seamless digital experiences where design meets
            functionality. Bringing ideas to life through code and creative
            problem-solving.
        </p>

        <div class="flex flex-col items-center gap-8">
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
    </section>
</template>

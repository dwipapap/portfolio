<script setup lang="ts">
const socialLinks = [
    {
        label: "Discord",
        icon: "i-lucide-message-circle",
        to: "https://discord.com",
    },
    {
        label: "X (Twitter)",
        icon: "i-lucide-twitter",
        to: "https://twitter.com",
    },
    {
        label: "GitHub",
        icon: "i-lucide-github",
        to: "https://github.com",
    },
];
</script>

<template>
    <section
        class="flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center"
    >
        <div class="mb-8 relative group">
            <div
                class="absolute -inset-1 bg-linear-to-r from-teal-500 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"
            />
            <UAvatar
                src="https://github.com/nuxt.png"
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
            class="text-xl md:text-2xl font-medium text-teal-600 dark:text-teal-400 mb-6"
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
                to="/cv.pdf"
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
                    class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                />
            </div>
        </div>
    </section>
</template>

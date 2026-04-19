<script setup lang="ts">
const { addRef } = useScrollAnimation();

interface Service {
    icon: string;
    title: string;
    description: string;
}

const services: Service[] = [
    {
        icon: "i-lucide-code-2",
        title: "Frontend Development",
        description:
            "Crafting modern, responsive interfaces that feel fast and intuitive using Vue.js and modern frameworks.",
    },
    {
        icon: "i-lucide-server",
        title: "IT Infrastructure",
        description:
            "Keeping systems running reliably through proactive maintenance, configuration, and hands-on management.",
    },
    {
        icon: "i-lucide-palette",
        title: "UI Implementation",
        description:
            "Bridging design and code by translating mockups into pixel-perfect, interactive user experiences.",
    },
    {
        icon: "i-lucide-plug",
        title: "API Integration",
        description:
            "Wiring frontend and backend together through clean, efficient API consumption and data handling.",
    },
    {
        icon: "i-lucide-wrench",
        title: "Technical Support",
        description:
            "Diagnosing and resolving hardware and software issues quickly to keep workflows uninterrupted.",
    },
    {
        icon: "i-lucide-terminal",
        title: "System Administration",
        description:
            "Configuring servers, scripting automation, and maintaining development environments at scale.",
    },
    {
        icon: "i-lucide-keyboard",
        title: "Keyboard Modding",
        description:
            "Customizing and tuning mechanical keyboards for optimal acoustics, feel, and typing aesthetics.",
    },
    {
        icon: "i-lucide-briefcase",
        title: "IT Consultant",
        description:
            "Providing strategic technical advice to align technology infrastructure with business objectives.",
    },
];
</script>

<template>
    <section id="services" class="py-16">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 :ref="addRef" class="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white scroll-animate">
                What I Do
            </h2>

            <p :ref="addRef" class="text-center text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-12 scroll-animate"
                :style="{ transitionDelay: '0.05s' }">
                I work at the intersection of development and infrastructure,
                making sure things not only look great but run smoothly behind
                the scenes.
            </p>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <UCard v-for="(service, index) in services" :key="service.title" :ref="addRef"
                    class="scroll-animate"
                    :style="{ transitionDelay: `${index * 0.07}s` }" :ui="{ body: 'p-4 sm:p-5' }">
                    <div
                        class="size-10 rounded-full flex items-center justify-center mb-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                        <UIcon :name="service.icon" class="size-5" />
                    </div>

                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1.5">
                        {{ service.title }}
                    </h3>

                    <p class="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                        {{ service.description }}
                    </p>
                </UCard>
            </div>
        </div>
    </section>
</template>

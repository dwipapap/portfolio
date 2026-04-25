<script setup lang="ts">
interface Experience {
    company: string;
    location: string;
    title: string;
    dateRange: string;
    responsibilities: string[];
}

const experiences: Experience[] = [
    {
        company: "ITTR English Course",
        location: "Pekanbaru",
        title: "Frontend Developer",
        dateRange: "Aug 2025 - Present",
        responsibilities: [
            "Built and maintained a Learning Management System (LMS)",
            "Developed responsive user interfaces, increasing user engagement by 30%",
            "Integrated APIs to improve data flow and system functionality",
            "Collaborated with designers to enhance user experience and visual consistency",
            "Implemented modern Vue.js frameworks, improving development efficiency by 40%",
        ],
    },
    {
        company: "PT. Konsultan Bisnis Sudarno",
        location: "Pekanbaru",
        title: "Intern",
        dateRange: "Jan 2025 - Feb 2025",
        responsibilities: [
            "Implemented data backup procedures to secure critical client information",
            "Managed the installation, configuration, and troubleshooting of software and office productivity tools",
            "Served as the primary technical point of contact, resolving hardware and software issues to minimize downtime",
        ],
    },
];

const items = experiences.map((exp, index) => ({
    title: exp.title,
    date: exp.dateRange,
    description: exp.company,
    slot: 'experience' as const,
    value: String(index),
    company: exp.company,
    location: exp.location,
    responsibilities: exp.responsibilities
}));

const { addRef } = useScrollAnimation();
</script>

<template>
    <section id="experience" class="py-16 overflow-hidden">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
                :ref="addRef"
                class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white scroll-animate"
            >
                Experience
            </h2>

            <UTimeline
                :items="items"
                class="max-w-3xl mx-auto"
            >
                <template #experience-indicator>
                    <div class="h-3 w-3 rounded-full bg-purple-600 dark:bg-purple-400 border-2 border-white dark:border-gray-900 ring-2 ring-gray-100 dark:ring-gray-800" />
                </template>

                <template #experience-description="{ item }">
                    <div class="text-lg font-medium text-gray-700 dark:text-gray-300">
                        {{ item.company }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {{ item.location }}
                    </div>
                    <ul class="space-y-1.5 text-gray-600 dark:text-gray-400 mt-2">
                        <li v-for="(resp, rIndex) in item.responsibilities" :key="rIndex" 
                            class="flex items-start gap-2.5">
                            <span class="mt-2 size-1.5 rounded-full bg-gray-400 dark:bg-gray-500 shrink-0"></span>
                            <span class="text-left leading-relaxed">{{ resp }}</span>
                        </li>
                    </ul>
                </template>
            </UTimeline>
        </div>
    </section>
</template>

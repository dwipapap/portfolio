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

const { addRef } = useScrollAnimation();
</script>

<template>
    <section id="experience" class="py-16">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
                :ref="addRef"
                class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white scroll-animate"
            >
                Experience
            </h2>

            <div class="relative space-y-8 pl-8 sm:pl-0">
                <!-- Vertical Line (Left aligned on mobile, centralized or kept left on desktop per simplified request) -->
                <!-- Based on requirements: "Vertical timeline layout (line on left, cards on right)" implies a simple left-aligned timeline -->
                <div
                    class="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 sm:left-4"
                />

                <div
                    v-for="(job, index) in experiences"
                    :key="index"
                    :ref="addRef"
                    class="relative pl-8 sm:pl-12 scroll-animate"
                    :style="{ transitionDelay: `${index * 0.1}s` }"
                >
                    <!-- Timeline Dot -->
                    <div
                        class="absolute left-1.5 top-2 h-3 w-3 sm:left-2.5 rounded-full bg-primary-500 border-2 border-white dark:border-gray-900 ring-2 ring-gray-100 dark:ring-gray-800"
                    />

                    <!-- Card Content -->
                    <div
                        class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2"
                    >
                        <div>
                            <h3
                                class="text-xl font-bold text-gray-900 dark:text-white"
                            >
                                {{ job.title }}
                            </h3>
                            <div
                                class="text-lg font-medium text-gray-700 dark:text-gray-300"
                            >
                                {{ job.company }}
                            </div>
                            <div
                                class="text-sm text-gray-500 dark:text-gray-400"
                            >
                                {{ job.location }}
                            </div>
                        </div>
                        <div
                            class="mt-1 sm:mt-0 text-sm font-medium text-purple-700 dark:text-purple-400"
                        >
                            {{ job.dateRange }}
                        </div>
                    </div>

                    <ul
                        class="list-disc list-outside ml-4 space-y-1 text-gray-600 dark:text-gray-400"
                    >
                        <li
                            v-for="(resp, rIndex) in job.responsibilities"
                            :key="rIndex"
                        >
                            {{ resp }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

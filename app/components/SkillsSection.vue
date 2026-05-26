<script setup lang="ts">
const { addRef } = useScrollAnimation();

const skillCategories = [
    {
        name: "Proficient In",
        skills: [
            { name: "Ms. Excel", icon: "i-simple-icons-microsoftexcel" },
            { name: "Ms. Word", icon: "i-simple-icons-microsoftword" },
        ],
    },
    {
        name: "Programming Languages",
        skills: [
            { name: "HTML5", icon: "i-logos-html-5" },
            { name: "CSS3", icon: "i-logos-css" },
            { name: "JavaScript", icon: "i-logos-javascript" },
            { name: "Kotlin", icon: "i-logos-kotlin-icon" },
            { name: "Bash", icon: "i-logos-bash-icon" },
        ],
    },
    {
        name: "Frameworks",
        skills: [
            { name: "Vue.js", icon: "i-logos-vue" },
            { name: "Next.js", icon: "i-logos-nextjs-icon" },
            { name: "Tailwind CSS", icon: "i-logos-tailwindcss-icon" },
        ],
    },
    {
        name: "Collaboration Tools",
        skills: [
            { name: "GitHub", icon: "i-logos-github-icon" },
            { name: "Figma", icon: "i-logos-figma" },
            { name: "Canva", icon: "i-devicon-canva" },
        ],
    },
    {
        name: "Linux & Infrastructure",
        skills: [
            { name: "Linux CLI", icon: "i-logos-linux-tux" },
            { name: "Bash Scripting", icon: "i-logos-bash-icon" },
            { name: "HPC", icon: "i-lucide-server" },
        ],
    },
    {
        name: "General",
        skills: [
            { name: "Git", icon: "i-logos-git-icon" },
            { name: "Data Analysis", icon: "i-lucide-bar-chart-3" },
            { name: "Hardware Troubleshooting", icon: "i-lucide-wrench" },
        ],
    },
    {
        name: "Passionate In",
        skills: [
            { name: "Mechanical Keyboards", icon: "i-lucide-keyboard" },
            { name: "Horology", icon: "i-lucide-watch" },
            { name: "IoT/Hardware", icon: "i-lucide-cpu" },
        ],
    },
];
</script>

<template>
    <section id="skills" class="py-16">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
                :ref="addRef"
                class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white scroll-animate"
            >
                Skill Set
            </h2>

            <div class="space-y-8">
                <div
                    v-for="(category, index) in skillCategories"
                    :key="category.name"
                    :ref="addRef"
                    class="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 scroll-animate"
                    :style="{ transitionDelay: `${index * 0.08}s` }"
                >
                    <!-- Category Name -->
                    <div class="md:w-48 shrink-0">
                        <h3
                            class="text-lg font-semibold text-gray-700 dark:text-gray-300 md:text-right pt-1.5"
                        >
                            {{ category.name }}
                        </h3>
                    </div>

                    <!-- Skills List -->
                    <div class="flex flex-wrap gap-3 flex-1">
                        <UButton
                            v-for="skill in category.skills"
                            :key="skill.name"
                            :icon="skill.icon"
                            :label="skill.name"
                            color="neutral"
                            variant="outline"
                            size="md"
                            class="rounded-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
                            :ui="{
                                base: 'font-normal px-4 py-2',
                            }"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

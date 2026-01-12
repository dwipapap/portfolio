<script setup lang="ts">
const skillCategories = [
  {
    name: 'Proficient In',
    skills: [
      { name: 'Ms. Excel', icon: 'i-simple-icons-microsoftexcel' },
      { name: 'Ms. Word', icon: 'i-simple-icons-microsoftword' },
    ]
  },
  {
    name: 'Programming Languages',
    skills: [
      { name: 'HTML5', icon: 'i-simple-icons-html5' },
      { name: 'CSS3', icon: 'i-simple-icons-css3' },
      { name: 'JavaScript', icon: 'i-simple-icons-javascript' },
      { name: 'Kotlin', icon: 'i-simple-icons-kotlin' },
      { name: 'Bash', icon: 'i-lucide-terminal' },
    ]
  },
  {
    name: 'Frameworks',
    skills: [
      { name: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
      { name: 'Next.js', icon: 'i-simple-icons-nextdotjs' },
      { name: 'Tailwind CSS', icon: 'i-simple-icons-tailwindcss' },
    ]
  },
  {
    name: 'Collaboration Tools',
    skills: [
      { name: 'GitHub', icon: 'i-simple-icons-github' },
      { name: 'Figma', icon: 'i-simple-icons-figma' },
      { name: 'Canva', icon: 'i-simple-icons-canva' },
    ]
  },
  {
    name: 'Linux & Infrastructure',
    skills: [
      { name: 'Linux CLI', icon: 'i-simple-icons-linux' },
      { name: 'Bash Scripting', icon: 'i-lucide-terminal' },
      { name: 'HPC', icon: 'i-lucide-server' },
    ]
  },
  {
    name: 'General',
    skills: [
      { name: 'Git', icon: 'i-simple-icons-git' },
      { name: 'Data Analysis', icon: 'i-lucide-bar-chart-3' },
      { name: 'Hardware Troubleshooting', icon: 'i-lucide-wrench' },
    ]
  },
  {
    name: 'Passionate In',
    skills: [
      { name: 'Mechanical Keyboards', icon: 'i-lucide-keyboard' },
      { name: 'Horology', icon: 'i-lucide-watch' },
      { name: 'IoT/Hardware', icon: 'i-lucide-cpu' },
    ]
  },
]
</script>

<template>
  <section class="py-16 bg-gray-50/50 dark:bg-gray-900/50">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Skill Set
      </h2>

      <div class="space-y-8">
        <div 
          v-for="category in skillCategories" 
          :key="category.name"
          class="flex flex-col md:flex-row md:items-start gap-4 md:gap-8"
        >
          <!-- Category Name -->
          <div class="md:w-48 flex-shrink-0">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 md:text-right pt-1.5">
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
                font: 'font-normal',
                padding: { md: 'px-4 py-2' }
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set(_isDark: boolean) {
        colorMode.preference = _isDark ? "dark" : "light";
    },
});

const navItems = [
    { icon: "i-lucide-home", label: "Home", active: true },
    { icon: "i-lucide-folder", label: "Projects", active: false },
    { icon: "i-lucide-square-pen", label: "Notes", active: false },
    { icon: "i-lucide-bell", label: "Notifications", active: false },
    { icon: "i-lucide-briefcase", label: "Work", active: false },
    { icon: "i-lucide-bookmark", label: "Bookmarks", active: false },
];
</script>

<template>
    <header class="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <nav
            class="inline-flex items-center bg-white dark:bg-gray-900 rounded-full px-4 py-2.5 shadow-xl border border-gray-200 dark:border-gray-700"
        >
            <div class="flex items-center gap-1">
                <UButton
                    v-for="item in navItems"
                    :key="item.label"
                    :icon="item.icon"
                    size="xl"
                    variant="ghost"
                    color="neutral"
                    :class="item.active ? 'text-teal-500' : ''"
                    :aria-label="item.label"
                />
            </div>

            <ClientOnly>
                <UButton
                    :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
                    size="xl"
                    color="neutral"
                    variant="ghost"
                    class="ml-6"
                    aria-label="Toggle color mode"
                    @click="isDark = !isDark"
                />
                <template #fallback>
                    <div class="size-10 ml-6" />
                </template>
            </ClientOnly>
        </nav>
    </header>
</template>

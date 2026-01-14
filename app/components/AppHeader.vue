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
    { icon: "i-lucide-home", label: "Home", href: "#home" },
    { icon: "i-lucide-user", label: "About", href: "#about" },
    { icon: "i-lucide-wrench", label: "Skills", href: "#skills" },
    { icon: "i-lucide-folder", label: "Projects", href: "#projects" },
];

const activeSection = ref("home");

function scrollToSection(href: string) {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        activeSection.value = id;
    }
}

onMounted(() => {
    const observerOptions = {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                activeSection.value = entry.target.id;
            }
        });
    }, observerOptions);

    navItems.forEach((item) => {
        const id = item.href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
            observer.observe(element);
        }
    });
});
</script>

<template>
    <header
        class="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 border-t border-gray-200 dark:border-gray-800 pb-[env(safe-area-inset-bottom)]"
    >
        <nav
            class="flex justify-around items-end h-16 w-full max-w-3xl mx-auto px-2"
        >
            <button
                v-for="item in navItems"
                :key="item.label"
                class="flex flex-1 flex-col items-center justify-center gap-1 py-2 h-full transition-colors duration-200 group"
                :class="
                    activeSection === item.href.replace('#', '')
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                "
                @click="scrollToSection(item.href)"
            >
                <UIcon
                    :name="item.icon"
                    class="size-6 transition-transform duration-200 group-active:scale-95"
                />
                <span class="text-[10px] font-medium">{{ item.label }}</span>
                <div
                    class="w-1 h-1 rounded-full mt-0.5 transition-all duration-300"
                    :class="
                        activeSection === item.href.replace('#', '')
                            ? 'bg-blue-500 dark:bg-blue-400 scale-100'
                            : 'bg-transparent scale-0'
                    "
                />
            </button>

            <!-- Theme Toggle -->
            <button
                class="flex flex-1 flex-col items-center justify-center gap-1 py-2 h-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 group"
                @click="isDark = !isDark"
            >
                <ClientOnly>
                    <UIcon
                        :name="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
                        class="size-6 transition-transform duration-200 group-active:scale-95"
                    />
                    <span class="text-[10px] font-medium">{{
                        isDark ? "Dark" : "Light"
                    }}</span>
                    <!-- Spacer to match layout of other items -->
                    <div class="w-1 h-1 mt-0.5 bg-transparent" />

                    <template #fallback>
                        <div
                            class="size-6 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"
                        />
                    </template>
                </ClientOnly>
            </button>
        </nav>
    </header>
</template>

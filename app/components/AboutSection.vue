<script setup lang="ts">
const { addRef } = useScrollAnimation();
</script>

<template>
    <section id="about" class="py-16 px-4 max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UCard
                :ref="addRef"
                :ui="{ body: 'flex flex-col h-full' }"
                class="h-full scroll-animate"
            >
                <div class="flex flex-col h-full">
                    <div class="mb-8">
                        <h2
                            class="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                        >
                            About Dwipa
                        </h2>
                        <p
                            class="text-gray-600 dark:text-gray-300 leading-relaxed"
                        >
                            I'm a Frontend Engineer with a passion for building
                            seamless user experiences. I also specialize in IT
                            Support, ensuring systems run smoothly and
                            efficiently.
                        </p>
                    </div>

                    <div class="mt-auto">
                        <h3
                            class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
                        >
                            Education
                        </h3>

                        <div
                            class="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
                        >
                            <UAvatar
                                icon="i-lucide-graduation-cap"
                                size="md"
                                class="bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 ring-1 ring-gray-200 dark:ring-gray-700"
                            />
                            <div>
                                <h4
                                    class="font-semibold text-gray-900 dark:text-white text-sm md:text-base"
                                >
                                    Universitas Riau
                                </h4>
                                <p
                                    class="text-sm text-gray-600 dark:text-gray-300"
                                >
                                    Bachelor of Computer Science GPA-3.76
                                </p>
                                <p class="text-xs text-gray-400 mt-0.5">
                                    Aug 2022 - Dec 2025
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </UCard>

            <UCard
                :ref="addRef"
                class="relative h-full overflow-hidden scroll-animate"
                :style="{ transitionDelay: '0.15s' }"
            >
                <div
                    class="absolute top-0 right-0 p-6 opacity-10 dark:opacity-5 pointer-events-none"
                >
                    <svg
                        width="120"
                        height="120"
                        fill="none"
                        viewBox="0 0 120 120"
                    >
                        <pattern
                            id="dot-pattern"
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle
                                cx="2"
                                cy="2"
                                r="2"
                                class="fill-current text-gray-900 dark:text-white"
                            />
                        </pattern>
                        <rect
                            width="120"
                            height="120"
                            fill="url(#dot-pattern)"
                        />
                    </svg>
                </div>

                <div class="relative z-10">
                    <h2
                        class="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        Beyond the Code
                    </h2>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Motivated Computer Science graduate with a passion for
                        driving technological solutions. Possesses a diverse
                        skillset ranging from Frontend Engineering to IT
                        Infrastructure management. Proven ability to adapt
                        quickly in dynamic environments, demonstrated through
                        experience in both software development and technical
                        support roles. Committed to continuous improvement and
                        mastering new technology stacks.
                    </p>
                </div>
            </UCard>
        </div>
    </section>
</template>

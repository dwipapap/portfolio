/**
 * Global Pomodoro Timer Store
 *
 * Uses Nuxt `useState` for SSR-safe global state so the timer
 * keeps ticking even when UI components are unmounted / minimized.
 * The setInterval runs at module-level on the client and is never
 * tied to any single component lifecycle.
 */

export type PomodoroMode = 'pomodoro' | 'shortBreak' | 'longBreak'

/* ── Duration map (seconds) ─────────────────────────────── */
const DURATIONS: Record<PomodoroMode, number> = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
}

/* ── Module-level interval handle (client only) ──────────── */
let _intervalId: ReturnType<typeof setInterval> | null = null

export function usePomodoro() {
  /* ── Global reactive state via useState ────────────────── */
  const timeLeft = useState<number>('pomo-timeLeft', () => DURATIONS.pomodoro)
  const isRunning = useState<boolean>('pomo-isRunning', () => false)
  const currentMode = useState<PomodoroMode>('pomo-currentMode', () => 'pomodoro')
  const cycleCount = useState<number>('pomo-cycleCount', () => 0)
  const isMuted = useState<boolean>('pomo-isMuted', () => false)

  /**
   * isOpen  = slideover is visible on screen
   * isMinimized = user pressed minimize → show island instead
   *
   * On page load both default to false → nothing shows.
   * FAB "Pomodoro Timer" click → isOpen=true, isMinimized=false
   * Minimize button          → isOpen=false, isMinimized=true  (island appears)
   * Island click             → isOpen=true, isMinimized=false  (slideover re-opens)
   * Island close (X)         → fullReset + isMinimized=false   (everything gone)
   * Slideover closed via X   → isOpen=false, isMinimized=false
   */
  const isOpen = useState<boolean>('pomo-isOpen', () => false)
  const isMinimized = useState<boolean>('pomo-isMinimized', () => false)

  /* ── Computed helpers ──────────────────────────────────── */
  const totalDuration = computed(() => DURATIONS[currentMode.value])

  const progress = computed(() => {
    const total = totalDuration.value
    if (total === 0) return 0
    return 1 - timeLeft.value / total
  })

  const formattedTime = computed(() => {
    const m = Math.floor(timeLeft.value / 60)
    const s = timeLeft.value % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  })

  const modeLabel = computed(() => {
    switch (currentMode.value) {
      case 'pomodoro': return 'Focus Time'
      case 'shortBreak': return 'Short Break'
      case 'longBreak': return 'Long Break'
      default: return 'Focus Time'
    }
  })

  /* ── Internal helpers ──────────────────────────────────── */
  function _clearInterval() {
    if (_intervalId !== null) {
      clearInterval(_intervalId)
      _intervalId = null
    }
  }

  function _playSound() {
    if (import.meta.server) return
    if (isMuted.value) return
    try {
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = 830
      osc.type = 'sine'
      gain.gain.value = 0.3
      osc.start()
      osc.stop(ctx.currentTime + 0.15)
      setTimeout(() => {
        const osc2 = ctx.createOscillator()
        const gain2 = ctx.createGain()
        osc2.connect(gain2)
        gain2.connect(ctx.destination)
        osc2.frequency.value = 1050
        osc2.type = 'sine'
        gain2.gain.value = 0.3
        osc2.start()
        osc2.stop(ctx.currentTime + 0.25)
      }, 200)
    } catch {
      // silent fail
    }
  }

  function _onTimerEnd() {
    _clearInterval()
    isRunning.value = false
    _playSound()

    if (currentMode.value === 'pomodoro') {
      cycleCount.value++
      if (cycleCount.value >= 4) {
        currentMode.value = 'longBreak'
        cycleCount.value = 0
      } else {
        currentMode.value = 'shortBreak'
      }
    } else {
      currentMode.value = 'pomodoro'
    }

    timeLeft.value = DURATIONS[currentMode.value]
  }

  function _tick() {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      _onTimerEnd()
    }
  }

  function _ensureInterval() {
    _clearInterval()
    _intervalId = setInterval(_tick, 1000)
  }

  /* ── Public actions ────────────────────────────────────── */
  function startTimer() {
    if (import.meta.server) return
    if (isRunning.value) return
    isRunning.value = true
    _ensureInterval()
  }

  function pauseTimer() {
    _clearInterval()
    isRunning.value = false
  }

  function toggleTimer() {
    isRunning.value ? pauseTimer() : startTimer()
  }

  function resetTimer() {
    _clearInterval()
    isRunning.value = false
    timeLeft.value = DURATIONS[currentMode.value]
  }

  function setMode(mode: PomodoroMode) {
    _clearInterval()
    isRunning.value = false
    currentMode.value = mode
    timeLeft.value = DURATIONS[mode]
  }

  function skipToNext() {
    _onTimerEnd()
  }

  function fullReset() {
    _clearInterval()
    isRunning.value = false
    currentMode.value = 'pomodoro'
    cycleCount.value = 0
    timeLeft.value = DURATIONS.pomodoro
  }

  function toggleMute() {
    isMuted.value = !isMuted.value
  }

  /** Minimize: close slideover, show island */
  function minimize() {
    isOpen.value = false
    isMinimized.value = true
  }

  /** Maximize: open slideover, hide island */
  function maximize() {
    isMinimized.value = false
    isOpen.value = true
  }

  /** Close the island entirely and reset timer */
  function closeIsland() {
    fullReset()
    isMinimized.value = false
    isOpen.value = false
  }

  /** Open the slideover (from FAB widget click) */
  function openSlideover() {
    isMinimized.value = false
    isOpen.value = true
  }

  /** Close the slideover (via X or outside click) without minimizing */
  function closeSlideover() {
    isOpen.value = false
  }

  return {
    // State
    timeLeft,
    isRunning,
    currentMode,
    cycleCount,
    isMinimized,
    isOpen,
    isMuted,

    // Computed
    totalDuration,
    progress,
    formattedTime,
    modeLabel,

    // Actions
    startTimer,
    pauseTimer,
    toggleTimer,
    resetTimer,
    setMode,
    skipToNext,
    fullReset,
    toggleMute,
    minimize,
    maximize,
    closeIsland,
    openSlideover,
    closeSlideover,
  }
}

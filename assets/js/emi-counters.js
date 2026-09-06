(() => {
  const counters = document.querySelectorAll('[data-emi-counter]')
  if (!counters.length) return

  const formatter = new Intl.NumberFormat()
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  counters.forEach(counter => {
    const target = Number(counter.dataset.emiCounter)
    if (!Number.isFinite(target) || reducedMotion) {
      counter.textContent = formatter.format(target)
      return
    }

    const duration = 1500
    const start = performance.now()
    counter.textContent = '0'

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      counter.textContent = formatter.format(Math.round(target * eased))
      if (progress < 1) window.requestAnimationFrame(tick)
    }

    window.requestAnimationFrame(tick)
  })
})()

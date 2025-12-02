// Navigation Toggle
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")
const navLinks = document.querySelectorAll(".nav-link")

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Sticky Navigation
const nav = document.getElementById("nav")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    nav.classList.add("scrolled")
  } else {
    nav.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// Menu Filter
const filterButtons = document.querySelectorAll(".filter-btn")
const menuCards = document.querySelectorAll(".menu-card")

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    // Add active class to clicked button
    button.classList.add("active")

    const category = button.getAttribute("data-category")

    // Filter menu cards with animation
    menuCards.forEach((card, index) => {
      const cardCategory = card.getAttribute("data-category")

      if (category === "all" || cardCategory === category) {
        card.classList.remove("hidden")
        // Reset animation
        card.style.animation = "none"
        setTimeout(() => {
          card.style.animation = ""
        }, 10)
      } else {
        card.classList.add("hidden")
      }
    })
  })
})

// Order Button Animation
const orderButtons = document.querySelectorAll(".menu-card-btn")

orderButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.style.position = "absolute"
    ripple.style.width = "0"
    ripple.style.height = "0"
    ripple.style.borderRadius = "50%"
    ripple.style.background = "rgba(255, 255, 255, 0.5)"
    ripple.style.transform = "translate(-50%, -50%)"
    ripple.style.animation = "ripple 0.6s ease-out"

    this.style.position = "relative"
    this.style.overflow = "hidden"
    this.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)

    // Show alert (in production, this would handle order)
    setTimeout(() => {
      alert("Obrigado pelo seu pedido! Nossa equipe entrará em contato em breve.")
    }, 300)
  })
})

// Add ripple animation to CSS dynamically
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Scroll Reveal Animation
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe sections
const aboutText = document.querySelector(".about-text")
const contactInfo = document.querySelector(".contact-info")
const menuCards2 = document.querySelectorAll(".menu-card")

if (aboutText) observer.observe(aboutText)
if (contactInfo) observer.observe(contactInfo)

// Menu Card Hover Effect
menuCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Contact Form Submission
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Add loading state
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Enviando..."
    submitBtn.disabled = true

    // Simulate form submission (in production, send to server)
    setTimeout(() => {
      alert("Obrigado pela sua reserva! Confirmaremos seu agendamento em breve.")
      this.reset()
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 1500)
  })
}

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroContent = document.querySelector(".hero-content")

  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
    heroContent.style.opacity = 1 - scrolled / 600
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
})

// Menu card stagger animation on scroll
const menuObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  },
  {
    threshold: 0.1,
  },
)

// Observe all visible menu cards
setTimeout(() => {
  const visibleCards = Array.from(menuCards).filter((card) => !card.classList.contains("hidden"))
  visibleCards.forEach((card) => menuObserver.observe(card))
}, 100)

// Add floating animation to crown icons
const crownIcons = document.querySelectorAll(".crown-icon")
crownIcons.forEach((icon, index) => {
  icon.style.animationDelay = `${index * 0.5}s`
})

// Price highlight animation
const prices = document.querySelectorAll(".menu-card-price")
prices.forEach((price) => {
  price.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)"
    this.style.transition = "transform 0.3s ease"
  })

  price.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)"
  })
})

// Add entrance animation to filter buttons
const menuSection = document.querySelector(".menu")
const filterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        filterButtons.forEach((btn, index) => {
          setTimeout(() => {
            btn.style.opacity = "1"
            btn.style.transform = "translateY(0)"
          }, index * 100)
        })
        filterObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.2 },
)

if (menuSection) {
  filterButtons.forEach((btn) => {
    btn.style.opacity = "0"
    btn.style.transform = "translateY(20px)"
    btn.style.transition = "all 0.5s ease"
  })
  filterObserver.observe(menuSection)
}

// Restaurant menu website loaded successfully

// Animation au scroll
const timelineItems = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease';
    }
  });
}, { threshold: 0.1 });

timelineItems.forEach(item => {
  observer.observe(item);
});


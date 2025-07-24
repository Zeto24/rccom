// script-animation.js

document.addEventListener("DOMContentLoaded", () => {
  // Memilih semua elemen yang akan dianimasikan saat di-scroll
  const animatedElements = document.querySelectorAll(".animated-element");

  // Opsi untuk IntersectionObserver
  const observerOptions = {
    root: null, // Menggunakan viewport sebagai area pengamatan utama
    rootMargin: "0px", // Tidak ada margin tambahan di sekitar viewport
    threshold: 0.1, // Memicu callback saat 10% dari elemen terlihat di viewport
  };

  // Membuat instance IntersectionObserver
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // Jika elemen sedang berpotongan dengan viewport
      if (entry.isIntersecting) {
        // Tambahkan kelas 'is-visible' ke elemen
        entry.target.classList.add("is-visible");
        // Berhenti mengamati elemen setelah animasi dipicu sekali
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Mengamati setiap elemen yang dipilih
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Penanganan khusus untuk Hero Section:
  // Kita ingin animasi hero langsung dimainkan saat halaman dimuat,
  // tidak menunggu scroll. Jadi, kita tambahkan kelas 'is-visible' secara langsung.
  const heroSection = document.querySelector(".hero-animation");
  if (heroSection) {
    heroSection.classList.add("is-visible");
  }
});

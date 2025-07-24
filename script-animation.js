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

// Script untuk Peringatan Desktop Mode
document.addEventListener("DOMContentLoaded", () => {
  const desktopModeWarning = document.getElementById("desktopModeWarning");
  const closeWarningBtn = document.getElementById("closeWarningBtn");

  // Fungsi untuk mengecek apakah perangkat adalah mobile (berdasarkan lebar layar)
  function isMobileDevice() {
    // Anda bisa menyesuaikan angka 768px ini
    // Jika lebar browser lebih kecil dari ini, anggap sebagai mobile
    return window.innerWidth < 768;
  }

  // Fungsi untuk menampilkan peringatan
  function showWarning() {
    if (isMobileDevice()) {
      desktopModeWarning.classList.add("show");
      // Optional: Untuk mencegah scrolling saat warning muncul
      document.body.style.overflow = "hidden";
    }
  }

  // Fungsi untuk menyembunyikan peringatan
  function hideWarning() {
    desktopModeWarning.classList.remove("show");
    document.body.style.overflow = ""; // Mengembalikan scrolling
  }

  // Tampilkan peringatan saat halaman dimuat
  // Gunakan timeout singkat agar tidak langsung muncul dan terlihat mengganggu
  setTimeout(showWarning, 1500); // Tampil setelah 1.5 detik

  // Sembunyikan peringatan saat tombol "Oke, Mengerti" diklik
  closeWarningBtn.addEventListener("click", hideWarning);

  // Optional: Sembunyikan peringatan jika layar diubah ke ukuran desktop
  window.addEventListener("resize", () => {
    if (!isMobileDevice()) {
      hideWarning();
    } else {
      // Tampilkan lagi jika kembali ke mobile dan belum pernah ditutup
      // (Ini opsional, bisa juga hanya muncul sekali)
      // showWarning();
    }
  });
});

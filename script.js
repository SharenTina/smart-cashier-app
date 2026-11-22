// =====================================================
// SajiKas - script.js
// Kelompok 4, Kelas WebDev A
// =====================================================

// Ketentuan promo kelompok
const KODE_PROMO = "BISDIG";
const PERSEN_DISKON = 10;

// =====================================================
// BAGIAN SOFTWARE ENGINEER 1
// Membaca isian formulir dan mengalikan harga paket
// dengan jumlah cabang
// =====================================================

// Harga awal = harga paket x jumlah cabang
function hitungHargaAwal(hargaPaket, jumlahCabang) {
  return hargaPaket * jumlahCabang;
}

// Mengubah angka menjadi tulisan Rupiah, contoh: 99000 -> Rp99.000
function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

// =====================================================
// BAGIAN SOFTWARE ENGINEER 2
// Memeriksa kode promo dengan if dan else, lalu
// menampilkan rincian harga ke halaman
// =====================================================

// Potongan harga: 10% kalau kode promo benar, 0 kalau tidak
function hitungDiskon(hargaAwal, kodePromo) {
  let diskon = 0;

  if (kodePromo === KODE_PROMO) {
    diskon = hargaAwal * PERSEN_DISKON / 100;
  } else {
    diskon = 0;
  }

  return diskon;
}

// Dijalankan setiap tombol "Hitung total" ditekan
function hitungTotal() {
  const hargaPaket = Number(document.getElementById("pilih-paket").value);
  const jumlahCabang = Number(document.getElementById("jumlah-cabang").value);
  const kodePromo = document.getElementById("kode-promo").value.trim().toUpperCase();
  const kotakHasil = document.getElementById("hasil-hitung");

  // Jumlah cabang harus bilangan bulat, minimal 1
  if (!Number.isInteger(jumlahCabang) || jumlahCabang < 1) {
    kotakHasil.innerHTML =
      '<p class="pesan-galat">Jumlah cabang belum diisi dengan benar. Isi dengan angka bulat, minimal 1.</p>';
    return;
  }

  const hargaAwal = hitungHargaAwal(hargaPaket, jumlahCabang);
  const diskon = hitungDiskon(hargaAwal, kodePromo);
  const totalBayar = hargaAwal - diskon;

  // Keterangan tentang kode promo
  let catatanPromo = "";

  if (kodePromo === "") {
    catatanPromo = "Kode promo belum diisi. Kode " + KODE_PROMO + " memotong " + PERSEN_DISKON + "%.";
  } else if (kodePromo === KODE_PROMO) {
    catatanPromo = "Kode " + KODE_PROMO + " dipakai. Total dipotong " + PERSEN_DISKON + "%.";
  } else {
    catatanPromo = "Kode promo tidak dikenali, jadi harga normal berlaku. Periksa lagi ejaannya.";
  }

  kotakHasil.innerHTML =
    '<div class="baris-hasil"><span>Harga awal (' + jumlahCabang + ' cabang)</span><span>' + formatRupiah(hargaAwal) + '</span></div>' +
    '<div class="baris-hasil baris-diskon"><span>Potongan diskon</span><span>- ' + formatRupiah(diskon) + '</span></div>' +
    '<div class="baris-hasil baris-total"><span>Total bayar per bulan</span><span>' + formatRupiah(totalBayar) + '</span></div>' +
    '<p class="catatan-promo">' + catatanPromo + '</p>';
}

// Menghubungkan tombol di index.html dengan fungsi hitungTotal
document.getElementById("tombol-hitung").addEventListener("click", hitungTotal);

// =====================================================
// BAGIAN TAMBAHAN
// Kartu paket, tombol kecil di judul bagian, dan menu ponsel
// =====================================================

// Kartu paket yang diketuk memilihkan paketnya di kalkulator
document.querySelectorAll("[data-harga]").forEach(function (tombolPaket) {
  tombolPaket.addEventListener("click", function () {
    document.getElementById("pilih-paket").value = tombolPaket.dataset.harga;
  });
});

// Tombol "Buka semua" membuka atau menutup semua pertanyaan sekaligus
const tombolBukaSemua = document.getElementById("buka-semua");
const semuaPertanyaan = document.querySelectorAll(".daftar-tanya details");

tombolBukaSemua.addEventListener("click", function () {
  const buka = tombolBukaSemua.getAttribute("aria-pressed") !== "true";
  semuaPertanyaan.forEach(function (pertanyaan) {
    pertanyaan.open = buka;
  });
  tombolBukaSemua.setAttribute("aria-pressed", buka);
  tombolBukaSemua.textContent = buka ? "Tutup semua" : "Buka semua";
});

// Tombol "Atur ulang" mengosongkan kalkulator
document.getElementById("atur-ulang").addEventListener("click", function () {
  document.getElementById("pilih-paket").selectedIndex = 0;
  document.getElementById("jumlah-cabang").value = 1;
  document.getElementById("kode-promo").value = "";
  document.getElementById("hasil-hitung").innerHTML =
    '<p class="hasil-kosong">Hasil perhitungan akan tampil di sini.</p>';
});

// Tombol Menu membuka dan menutup menu di layar ponsel
const tombolMenu = document.getElementById("tombol-menu");
const menuUtama = document.getElementById("menu-utama");

tombolMenu.addEventListener("click", function () {
  const terbuka = menuUtama.classList.toggle("terbuka");
  tombolMenu.setAttribute("aria-expanded", terbuka);
  tombolMenu.textContent = terbuka ? "Tutup" : "Menu";
});

// Menu menutup lagi setelah salah satu tautannya dipilih
menuUtama.querySelectorAll("a").forEach(function (tautan) {
  tautan.addEventListener("click", function () {
    menuUtama.classList.remove("terbuka");
    tombolMenu.setAttribute("aria-expanded", "false");
    tombolMenu.textContent = "Menu";
  });
});

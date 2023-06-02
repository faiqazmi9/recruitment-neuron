// Data untuk dropdown Lowongan
var lowonganData = ["Database Developer", "System Analyst", "Front End Developer"];

// Data untuk dropdown Posisi
var posisiData = ["Jakarta", "Bandung"];

// Ambil elemen dropdown Lowongan dan Posisi
var lowonganDropdown = document.getElementById("vacancy");
var posisiDropdown = document.getElementById("posisi");

// Tambahkan pilihan dropdown Lowongan
lowonganData.forEach(function (lowongan) {
    var option = document.createElement("option");
    option.text = lowongan;
    lowonganDropdown.appendChild(option);
});

// Tambahkan pilihan dropdown Posisi
posisiData.forEach(function (posisi) {
    var option = document.createElement("option");
    option.text = posisi;
    posisiDropdown.appendChild(option);
});

// Menangani event saat form dikirim
const form = document.getElementById("recruitment-form");
const dataBody = document.getElementById("dataBody");
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form dikirim secara langsung

    // Mengambil nilai input
    const nama = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const vacancy = document.getElementById("vacancy").value;
    const posisi = document.getElementById("posisi").value;

    // Memvalidasi input
    if (nama === "" || email === "" || phone === "" || vacancy === "" || posisi === "") {
        alert("Harap isi semua kolom!");
        return;
    } else {

        var successMessage = document.createElement("p");
        successMessage.className = "success";
        successMessage.textContent = "Lamaran Anda telah terkirim!, Semoga beruntung mendapat panggilan";
        document.body.appendChild(successMessage);

        Swal.fire({
            icon: 'success',
            title: 'Lamaran Terkirim!',
            showConfirmButton: false,
            timer: 2000 // Notifikasi akan hilang setelah 2 detik
        });

        // Membuat elemen <tr> dan <td> untuk setiap kolom data
        const newRow = document.createElement("tr");
        const namaCell = document.createElement("td");
        const emailCell = document.createElement("td");
        const phoneCell = document.createElement("td");
        const vacancyCell = document.createElement("td");
        const posisiCell = document.createElement("td");

        // Mengisi teks pada setiap elemen <td> dengan nilai yang diisi pengguna
        namaCell.textContent = nama;
        emailCell.textContent = email;
        phoneCell.textContent = phone;
        vacancyCell.textContent = vacancy;
        posisiCell.textContent = posisi;

        // Menambahkan elemen <td> ke dalam elemen <tr>
        newRow.appendChild(namaCell);
        newRow.appendChild(emailCell);
        newRow.appendChild(phoneCell);
        newRow.appendChild(vacancyCell);
        newRow.appendChild(posisiCell);

        // Menambahkan elemen <tr> ke dalam elemen <tbody>
        dataBody.appendChild(newRow);

        // Mereset form setelah berhasil ditambahkan ke dalam tabel
        form.reset();
    }
});

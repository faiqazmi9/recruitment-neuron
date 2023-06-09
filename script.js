// Data untuk dropdown Lowongan
var lowonganData = ["System Administrator", "Programmer", "Technical Writter"];

// Data untuk dropdown Posisi
var posisiData = ["Jakarta", "Bandung"];

// Ambil elemen dropdown Lowongan dan Posisi
var lowonganDropdown = document.getElementById("vacancy");
var posisiDropdown = document.getElementById("posisi");

// Menyimpan array
var inputData = [];

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

var successMessage = document.createElement("p");
successMessage.className = "success";

var alertMessage = document.createElement("p");
alertMessage.className = "success";

// Data kuota lowongan
var kuotaVacancy = {
    "System Administrator": {
        kuota: 1,
        terisi: 0
    },
    "Programmer": {
        kuota: 2,
        terisi: 0
    },
    "Technical Writer": {
        kuota: 3,
        terisi: 0
    }
};

// Mendapatkan informasi kuota lowongan
function getLowonganInfo(vacancy) {
    if (kuotaVacancy.hasOwnProperty(vacancy)) {
        var lowongan = kuotaVacancy[vacancy];
        if (lowongan.terisi < lowongan.kuota) {
            var tersisa = lowongan.kuota - lowongan.terisi;
            if (tersisa <= 2) {
                return 'Kuota tersisa untuk ' + vacancy + ' hanya ' + tersisa + ' pendaftar.';
            } else {
                return 'Anda dapat memilih lowongan ' + vacancy + '.';
            }
        } else {
            return 'Mohon maaf, rekrutasi untuk ' + vacancy + ' sudah penuh dan tidak dapat dipilih.';
        }
    } else {
        return 'Lowongan tidak tersedia.';
    }
}

// Menangani event saat form dikirim
const form = document.getElementById("recruitment-form");
const dataBody = document.getElementById("dataBody");
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form dikirim secara langsung

    successMessage.innerHTML = "";
    alertMessage.innerHTML = "";

    // Mengambil nilai input
    const nama = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const vacancy = document.getElementById("vacancy").value;
    const posisi = document.getElementById("posisi").value;

    // Validasi inputan
    if (nama === "" || email === "" || phone === "" || vacancy === "" || posisi === "") {
        // Tampilkan notifikasi bahwa semua inputan harus diisi
        Swal.fire({
            icon: 'error',
            title: 'Silakan lengkapi semua field!',
            showConfirmButton: false,
            timer: 2000 // Notifikasi akan hilang setelah 2 detik
        });
    } else if (!isValidEmail(email)) {
        // Tampilkan notifikasi bahwa email tidak valid
        Swal.fire({
            icon: 'error',
            title: 'Email tidak valid! format email harus benar',
            showConfirmButton: false,
            timer: 2000 // Notifikasi akan hilang setelah 2 detik
        });
    } else if (!isValidPhoneNumber(phone)) {
        // Tampilkan notifikasi bahwa nomor telepon tidak valid
        Swal.fire({
            icon: 'error',
            title: 'Nomor telepon tidak valid! harus berawalan 08, minimal 9 karakter dan maksimal 13 karakter',
            showConfirmButton: false,
            timer: 2000 // Notifikasi akan hilang setelah 2 detik
        });
    } else if (!isValidVacancy(vacancy)) {
        // Tampilkan notifikasi terkait kuota lowongan
        var lowonganInfo = getLowonganInfo(vacancy);
        Swal.fire({
            icon: 'info',
            title: lowonganInfo,
            showConfirmButton: false,
            timer: 2000 // Notifikasi akan hilang setelah 2 detik
        });
    } else {

        var emailExists = inputData.some(function (item) {
            return item.email === email;
        });

        if (emailExists) {
            // Tampilkan notifikasi email sudah ada
            Swal.fire({
                icon: 'error',
                title: 'Email sudah terdaftar!',
                showConfirmButton: false,
                timer: 2000 // Notifikasi akan hilang setelah 2 detik
            });
        } else {

            successMessage.innerHTML = "Terima kasih telah melakukan pengisian, permintaan anda akan kami segera proses!";
            document.body.appendChild(successMessage);
            
            kuotaVacancy[vacancy].terisi++;

            // Tampilkan notifikasi vacancy menggunakan elemen <p>
            var lowonganInfo = getLowonganInfo(vacancy);
            alertMessage.innerHTML = lowonganInfo;
            document.body.appendChild(alertMessage);

            inputData.push({ name: nama, email: email, phone: phone, vacancy: vacancy, posisi: posisi });

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

            // Notifikasi saat Sukses
            Swal.fire({
                icon: 'success',
                title: 'Lamaran Terkirim!',
                showConfirmButton: false,
                timer: 2000 // Notifikasi akan hilang setelah 2 detik
            });

            // Mereset form setelah berhasil ditambahkan ke dalam tabel
            form.reset();
        }
    }
});

// Validasi email
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validasi nomor telepon (hanya angka)
function isValidPhoneNumber(phone) {
    var phoneRegex = /^08[0-9]{7,12}$/;
    return phoneRegex.test(phone);
}

// Validasi kuota lowongan tersedia
function isValidVacancy(vacancy) {
    if (kuotaVacancy.hasOwnProperty(vacancy)) {
        if (kuotaVacancy[vacancy].terisi < kuotaVacancy[vacancy].kuota) {
            return true;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Mohon maaf, rekrutasi untuk ' + vacancy + ' sudah penuh dan tidak dapat dipilih.',
                showConfirmButton: false,
                timer: 2000 // Notifikasi akan hilang setelah 2 detik
            });
            return false;
        }
    } else {
        return false;
    }
}

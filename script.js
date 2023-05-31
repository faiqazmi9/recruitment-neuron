// Data untuk dropdown Lowongan
var lowonganData = ["Database Developer", "System Analyst", "Front End Developer"];

// Data untuk dropdown Posisi
var posisiData = ["Jakarta", "Bandung"];

// Ambil elemen dropdown Lowongan dan Posisi
var lowonganDropdown = document.getElementById("vacancy");
var posisiDropdown = document.getElementById("posisi");

// Tambahkan pilihan dropdown Lowongan
lowonganData.forEach(function(vacancy) {
  var option = document.createElement("option");
  option.text = vacancy;
  lowonganDropdown.add(option);
});

// Tambahkan pilihan dropdown Posisi
posisiData.forEach(function(posisi) {
  var option = document.createElement("option");
  option.text = posisi;
  posisiDropdown.add(option);
});
document.addEventListener("DOMContentLoaded", function () {
  const registeredUsers = {
    // 101: { name: "John Doe", region: "North", phone: "1234567890" },
    "mfmyc325": { name: "Pastor Ope", region: "sw23", phone: "07087654321" },
    "mfmyc110": { name: "Pastor Tope", region: "sw23", phone: "07023456789" },
    "mfmyc249": { name: "Bro John", region: "sw23", phone: "07034567890" },
    "mfmyc165": { name: "Bro Seyi", region: "sw23", phone: "07098765432" },
    "mfmyc393": { name: "Sis Obafunke", region: "sw23", phone: "07012345678" },
    "mfmyc557": { name: "Bro Peter", region: "sw23", phone: "07056789012" },
    "mfmyc762": { name: "Bro Sam", region: "sw23", phone: "07067890123" },
    "mfmyc203": { name: "Sis Hannah", region: "sw23", phone: "07043219876" },
    "mfmyc191": { name: "Sis Abimbola", region: "sw23", phone: "07078901234" },
    "mfmyc453": { name: "Sis Peace", region: "sw23", phone: "07091011121" },
    "mfmyc503": { name: "Sis Bukola", region: "sw23", phone: "07071014561" },
    "mfmyc859": { name: "Sis Joy", region: "sw23", phone: "07081055521" },
  };

  document
    .getElementById("user-info-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const examNumber = document.getElementById("examNumber").value.trim();
      const region = document.getElementById("region").value.trim();
      const phone = document.getElementById("phone").value.trim();

      if (!registeredUsers[examNumber]) {
        alert("Invalid Exam Number. Please enter a valid exam number.");
        return;
      }

      if (
        registeredUsers[examNumber].name !== name ||
        registeredUsers[examNumber].phone !== phone
      ) {
        alert("User details do not match the registered exam number.");
        return;
      }

      // Store in sessionStorage for quiz access
      sessionStorage.setItem(
        "user",
        JSON.stringify({ name, examNumber, region, phone })
      );

      alert("Details submitted successfully!");
      document.querySelector(".Proceed-to-start-Quiz-btn").style.display =
        "block";
    });

  // Hide Proceed button initially
  document.querySelector(".Proceed-to-start-Quiz-btn").style.display = "none";
});

document.addEventListener("selectstart", function (e) {
  e.preventDefault();
});

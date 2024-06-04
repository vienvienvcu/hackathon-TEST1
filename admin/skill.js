// show login
document.querySelector(".navbar").addEventListener("click", () => {
  document.querySelector(".logout-admin").classList.toggle("open");
});

// show login

document.getElementById("login").addEventListener("click", () => {
  document.querySelector(".login").classList.add("open");
});
document.querySelector(".login-box").addEventListener("click", () => {
  document.querySelector(".login").classList.remove("open");
});

// open form

document.getElementById("add-skill").addEventListener("click", () => {
  // console.log("hihi");
  document.querySelector(".form-product").classList.add("open");
});

// close form

document.getElementById("btn-cancel").addEventListener("click", () => {
  // console.log("hihi");
  document.querySelector(".form-product").classList.remove("open");
});

// mảng chứa dữ liệu sản phẩm
const skills = [
  {
    STT: 1,
    name: "ReactJS",
    image: "../img/ReactJS.png",
    date: "20 / 5 / 2024",
  },
  {
    STT: 2,
    name: "VueJS",
    image: "../img/VueJS.png",
    date: "20 / 5 / 2024",
  },
  {
    STT: 3,
    name: "Next.js",
    image: "../img/Next.js.png",
    date: "20 / 5 / 2024,",
  },
  {
    STT: 4,
    name: "Java",
    image: "../img/Java.png",
    date: "20 / 5 / 2024",
  },
];

//
const skillName = document.getElementById("name");
const image = document.getElementById("input-image");
const errorName = document.getElementById("error-name");
const tableSkills = document.getElementById("tbody");
const errorSkill = document.querySelectorAll(".error-skill");

function submitForm(event) {
  event.preventDefault();
  let id = 1;
  const skills = JSON.parse(localStorage.getItem("skills")) || [];
  if (checkName(skills)) {
    if (skills.length > 0) {
      id = skills[skills.length - 1].id + 1;
    }
    const newSkill = {
      id: id,
      name: skillName.value,
      image: image.value,
      date: formatDate(),
    };
    skills.push(newSkill);
    localStorage.setItem("skills", JSON.stringify(skills)) || [];
    event.target.reset();
    render();
  }
}

function render() {
  let skills = JSON.parse(localStorage.getItem("skills")) || [];

  tableSkills.innerHTML = ``;
  let stt = 1;
  for (let i = 0; i < skills.length; i++) {
    tableSkills.innerHTML += `
            <tr>
                <td>${stt}</td>
                <td>${skills[i].name}</td>
                <td><img src= "${skills[i].image}"></td>
                <td>${skills[i].date}</td>
                <td>
                <button id="remove" class="btn" onclick ="deleteSkills(${skills[i].id})">delete</button>
                </td>
            </tr>
        `;
    stt++;
  }
}
window.load = render();

function checkName(check) {
  errorSkill[0].innerText = "";
  errorSkill[1].innerText = "";
  let flag = true;
  const index = check.findIndex((index) => index.name === skillName.value);
  // name is valid?
  if (skillName.value === "") {
    errorSkill[0].innerText = "Invalid name,Please re-enter name.";
    flag = false;
  } else if (index !== -1) {
    errorSkill[0].innerText = "name is duplicated, please re-enter name.";
    flag = false;
  }
  if (image.value == "") {
    errorSkill[1].innerText = "Invalid image,Please re-enter name.";
    flagImg = false;
  }
  return flag;
}
// tao mot ham date
function formatDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  const formattedToday = dd + "/" + mm + "/" + yyyy;
  return formattedToday;
}
function deleteSkills(id) {
  let skills = JSON.parse(localStorage.getItem("skills")) || [];
  const indexId = skills.findIndex((index) => index.id === id);
  console.log(indexId);
  skills.splice(indexId, 1);
  localStorage.setItem("skills", JSON.stringify(skills));
  render();
}

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

const projectName = document.getElementById("name");
const image = document.getElementById("input-image");
const technology = document.getElementById("technology");
const linkGithub = document.getElementById("link-github");
const description = document.getElementById("description");
const errorName = document.getElementById("error-name");
const tableProjects = document.getElementById("tbody");
const errorSkill = document.querySelectorAll(".error-skill");
const showId = document.getElementById("showId");
const submitBtn = document.getElementById("btn-submit");
const btnUpdate = document.getElementById("btn-update");
var action = "add";

function submitForm(event) {
  event.preventDefault();
  let id = 1;
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  if (checkName(projects)) {
    if (action == "add") {
      if (projects.length > 0) {
        id = projects[projects.length - 1].id + 1;
      }
      const newProject = {
        id: id,
        name: projectName.value,
        image: image.value,
        technology: technology.value,
        link: linkGithub.value,
        description: description.value,
      };
      projects.push(newProject);
      localStorage.setItem("projects", JSON.stringify(projects)) || [];
      event.target.reset();
      render();
    } else {
      let updateId = projects.findIndex((item) => item.id == showId.value);
      projects[updateId].name = projectName.value;
      projects[updateId].image = image.value;
      projects[updateId].technology = technology.value;
      projects[updateId].link = linkGithub.value;
      projects[updateId].description = description.value;
      localStorage.setItem("projects", JSON.stringify(projects));
      action = "add";
      submitBtn.innerText = "Add";
      event.target.reset();
      render();
    }
  }
}

function render() {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  tableProjects.innerHTML = ``;
  let stt = 1;
  for (let i = 0; i < projects.length; i++) {
    tableProjects.innerHTML += `
            <tr>
                <td>${stt}</td>
                <td>${projects[i].name}</td>
                <td><img src= "${projects[i].image}"></td>
                <td>${projects[i].technology}</td>
                <td>${projects[i].link}</td>
                <td>${projects[i].description}</td>
                <td>
                <button id="edit" type= "button" onclick="initUpdate(${projects[i].id})" class="btn">Edit</button>
                <button id="remove" type = "button" class="btn" onclick ="deleteProjects(${projects[i].id})">Delete</button>
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
  errorSkill[2].innerText = "";
  errorSkill[3].innerText = "";
  errorSkill[4].innerText = "";

  let flag = true;
  const index = check.findIndex((index) => index.name === projectName.value);
  // name is valid?
  if (projectName.value === "") {
    errorSkill[0].innerText = "Invalid name,Please re-enter name.";
    flag = false;
  } else if (index !== -1) {
    errorSkill[0].innerText = "name is duplicated, please re-enter name.";
    flag = false;
  }
  if (image.value === "") {
    errorSkill[1].innerText = "Invalid image,Please re-enter name.";
    flag = false;
  }
  if (technology.value === "") {
    errorSkill[2].innerText = "Invalid technology,Please re-enter name.";
    flag = false;
  }
  if (linkGithub.value === "") {
    errorSkill[3].innerText = "Invalid technology,Please re-enter name.";
    flag = false;
  }
  // console.log(description.value);
  if (description.value == "") {
    errorSkill[4].innerText = "Invalid descriptionß";
    flag = false;
  }
  return flag;
}
// tao mot ham delete

function deleteProjects(id) {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  const indexId = projects.findIndex((index) => index.id === id);
  console.log(indexId);
  projects.splice(indexId, 1);
  localStorage.setItem("projects", JSON.stringify(projects));
  render();
}
// ham  before update
function initUpdate(id) {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  const indexId = projects.findIndex((index) => index.id === id);
  projectName.value = projects[indexId].name;
  image.value = projects[indexId].image;
  linkGithub.value = projects[indexId].link;
  description.value = projects[indexId].description;
  technology.value = projects[indexId].technology;
  showId.value = id;
  submitBtn.innerText = "Update";
  action = "Update";
  document.querySelector(".form-product").classList.add("open");
}

const skillIcon = document.getElementById("skill-icon");
const cardProject = document.getElementById("project-card");

// lay du lieu tren  locals
function renderSkill() {
  const dataSkills = JSON.parse(localStorage.getItem("skills"));
  let stringHtml = ``;

  for (let i = 0; i < dataSkills.length; i++) {
    stringHtml += `
    <a href="#"><img src="${dataSkills[i].image}" /></a>

    `;
  }
  skillIcon.innerHTML = stringHtml;
}
renderSkill();

function renderProject() {
  const dataProjects = JSON.parse(localStorage.getItem("projects"));
  let stringProjects = ``;
  for (let i = 0; i < dataProjects.length; i++) {
    stringProjects += `
<div class="card-item" id="card-item">
    <img
    src="${dataProjects[i].image}"
  />
  <div class="card-text">
    <h4>${dataProjects[i].name}</h4>
    <p>
    ${dataProjects[i].description}
    </p>
    <p>${dataProjects[i].technology}</p>
    <div class="card-icon">
      <i class="bx bx-link">${dataProjects[i].link}</i>
      <i class="bx bxl-github">View Code</i>
    </div>
  </div>
</div>
    `;
  }
  cardProject.innerHTML = stringProjects;
}
renderProject();

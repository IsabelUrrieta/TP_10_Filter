const cardContainer = document.getElementById("card-container");
let filtros = [];
const tags = (job) => {
  return [
    job.role,
    job.level,
    ...(job.languages || []),
    ...(job.tools || []),
  ].reduce((html, tag) => {
    return (
      html + `<span class="card__tag" onclick="filtrar('${tag}')">${tag}</span>`
    );
  }, "");
};

const header = document.getElementById("header");

const filtrar = (tag) => {
  let index = filtros.indexOf(tag);
  if (index === -1) {
    filtros.push(tag);
  } else {
    filtros.splice(index, 1);
  }

  updateHeader();

  header.innerHTML = filtros.reduce((html, tag) => {
    return (
      html +
      `<span class="card__tag" onclick="filtrar('${tag}')">${tag}</span> `
    );
  }, `<button id="btn-clear" class="btn-clear" onclick="clearFilter()">Clear</button>`);

  const jobs = jobsList.filter((job) => {
    return filtros.every((filtro) => {
      return [
        job.role,
        job.level,
        ...(job.languages || []),
        ...(job.tools || []),
      ].includes(filtro);
    });
  });

  getJobs(jobs);
};

const updateHeader = () => {
  if (filtros.length) {
    header.classList.replace("fade", "show");
  } else {
    header.classList.replace("show", "fade");
  }
};

// broom.addEventListener("click", function () {
//   header.classList.replace("show", "fade");
// });

const getJobs = (jobs) => {
  cardContainer.innerHTML = jobs.reduce((html, job) => {
    return (
      html +
      `<div class="card card--selected">
    <div class="card__column card__column--left">
      <img class="card__logo" src=${job.logo}>
      <div class="card__info">
        <h2 class="card__subtitle">
          <span class="card__subtitle__texts">Photosnap</span> 
          ${job.new ? `<span class="badge badge--primary">New!</span>` : ``}
          ${
            job.featured.new
              ? `<span class="badge badge--black">Featured</span>`
              : ``
          }
        </h2>
        <h2 class="card__title">
          ${job.position}
        </h2>
        <div class="card__detail">
          <p class="card__detail__item">${job.postedAt}</p>
          <p class="card__detail__item">${job.contract}</p>
          <p class="card__detail__item">${job.location}</p>
        </div>
      </div>
    </div>
    <div class="card__column card__column--right">
        ${tags(job)}
    </div>
  </div>`
    );
  }, "");
};

getJobs(jobsList);

// const clearButtom = document.getElementById("btn-clear");

const clearFilter = () => {
  filtros = [];

  updateHeader();
  getJobs(jobsList);
};

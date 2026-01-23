document.querySelectorAll(".course").forEach(course => {
  if (!course.classList.contains("locked")) {
    course.addEventListener("click", () => toggleCourse(course));
  }
});

function toggleCourse(course) {
  if (course.classList.contains("approved")) {
    course.classList.remove("approved");
  } else {
    course.classList.add("approved");
  }
  checkUnlocks();
}

function checkUnlocks() {
  const approved = [...document.querySelectorAll(".course.approved")]
    .map(c => c.dataset.id);

  document.querySelectorAll(".course.locked").forEach(course => {
    const prereqs = course.dataset.prereq.split(",");
    const unlocked = prereqs.every(p => approved.includes(p));

    if (unlocked) {
      course.classList.remove("locked");
      course.addEventListener("click", () => toggleCourse(course));
    }
  });
}

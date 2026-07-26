/* =========================================================
   BOOT LOADER — terminal log, copper terms -> mint (code) terms
========================================================= */
const bootLines = [
  { text: "INIT ece_core.sys", phase: 0 },
  { text: "LOADING verilog_hdl…", phase: 0 },
  { text: "LOADING digital_logic…", phase: 0 },
  { text: "MOUNTING arduino / esp32…", phase: 0 },
  { text: "LINKING iot_sensors…", phase: 0 },
  { text: "COMPILING html · css · js…", phase: 1 },
  { text: "IMPORTING python3…", phase: 1 },
  { text: "TRAINING ml_model.fit()…", phase: 1 },
  { text: "FETCH github.com/Nishmitha07 [200 OK]", phase: 1 },
  { text: "BOOT COMPLETE — welcome.", phase: 1, bold: true }
];

const bootList = document.getElementById("bootList");
const bootFill = document.getElementById("bootFill");
const bootPct = document.getElementById("bootPct");
const loader = document.getElementById("loader");
const body = document.body;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function finishLoad(){
  loader.classList.add("hide");
  body.classList.remove("locked");
}

if(reduceMotion){
  finishLoad();
}else{
  let i = 0;
  const total = bootLines.length;
  const step = () => {
    if(i >= total){
      setTimeout(finishLoad, 250);
      return;
    }
    const line = bootLines[i];
    const li = document.createElement("li");
    li.textContent = line.text;
    if(line.phase === 1) li.classList.add("code-phase");
    if(line.bold) li.innerHTML = `<b>${line.text}</b>`;
    bootList.appendChild(li);
    bootList.parentElement.scrollTop = bootList.scrollHeight;

    const pct = Math.round(((i + 1) / total) * 100);
    bootFill.style.width = pct + "%";
    bootPct.textContent = (pct < 100 ? "BOOTING… " : "READY ") + pct + "%";

    i++;
    setTimeout(step, 150);
  };
  setTimeout(step, 150);
  // hard safety cap so the loader never blocks the site
  setTimeout(finishLoad, 3200);
}

/* =========================================================
   TYPING EFFECT
========================================================= */
const words = [
  "Electronics & Communication Engineer.",
  "Learning Web Development.",
  "Exploring Machine Learning.",
  "Building at the Hardware/Software Edge."
];
let wordIndex = 0, charIndex = 0;
const typing = document.getElementById("typing");

function typeWord(){
  if(!typing) return;
  if(charIndex < words[wordIndex].length){
    typing.textContent += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeWord, 55);
  }else{
    setTimeout(eraseWord, 1400);
  }
}
function eraseWord(){
  if(charIndex > 0){
    typing.textContent = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseWord, 28);
  }else{
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeWord, 250);
  }
}
if(!reduceMotion) setTimeout(typeWord, 1700);
else if(typing) typing.textContent = words[0];

/* =========================================================
   MOBILE MENU
========================================================= */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

/* =========================================================
   SCROLL SPY + NAV BACKGROUND
========================================================= */
const sections = document.querySelectorAll("main section");
const links = document.querySelectorAll(".nav-links a");
const nav = document.getElementById("siteNav");

window.addEventListener("scroll", () => {
  nav.style.background = window.scrollY > 40 ? "rgba(8,23,18,.85)" : "rgba(8,23,18,.55)";
  let current = "";
  sections.forEach(sec => {
    if(pageYOffset >= sec.offsetTop - 160) current = sec.getAttribute("id");
  });
  links.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

/* =========================================================
   REVEAL ON SCROLL (restrained — cards & stats only)
========================================================= */
if(!reduceMotion){
  const revealTargets = document.querySelectorAll(
    ".skill-card, .project-card, .ach-item, .stat-card, .contact-card"
  );
  revealTargets.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity .6s ease, transform .6s ease";
  });
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));
}

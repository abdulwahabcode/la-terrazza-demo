/* La Terrazza — interactions */
(function(){
  "use strict";

  /* footer year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* mobile nav */
  var burger = document.getElementById("burger");
  var links = document.getElementById("navLinks");
  if (burger && links) {
    burger.addEventListener("click", function(){
      var open = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){ links.classList.remove("open"); });
    });
  }

  /* menu tabs */
  var tabs = document.querySelectorAll(".tab");
  var panels = document.querySelectorAll(".menu-panel");
  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      tabs.forEach(function(t){ t.classList.remove("active"); t.setAttribute("aria-selected","false"); });
      panels.forEach(function(p){ p.classList.remove("active"); });
      tab.classList.add("active");
      tab.setAttribute("aria-selected","true");
      var panel = document.getElementById("panel-" + tab.dataset.tab);
      if (panel) panel.classList.add("active");
    });
  });

  /* reservation form */
  var form = document.getElementById("reserveForm");
  var confirmBox = document.getElementById("confirmBox");
  var dateInput = document.getElementById("rdate");
  if (dateInput) {
    var today = new Date();
    var iso = today.toISOString().split("T")[0];
    dateInput.min = iso;
  }
  if (form) {
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var name = document.getElementById("rname").value.trim();
      var phone = document.getElementById("rphone").value.trim();
      var date = dateInput.value;
      var time = document.getElementById("rtime").value;
      var guests = document.getElementById("rguests").value;
      if (!name || !phone || !date || !time) return;

      var d = new Date(date + "T00:00:00");
      var nice = d.toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long", year:"numeric" });
      var ref = "LT-" + Math.random().toString(36).slice(2,7).toUpperCase();

      document.getElementById("cName").textContent = name;
      document.getElementById("cWhen").textContent = nice + " · " + time + " · " + guests + (guests === "1" ? " guest" : " guests");

      var refEl = document.getElementById("cRef");
      if (refEl) refEl.textContent = "Reference " + ref;

      form.style.display = "none";
      confirmBox.classList.add("show");
      confirmBox.scrollIntoView({ behavior:"smooth", block:"center" });
    });
  }

  /* gentle reveal on scroll */
  var revealEls = document.querySelectorAll(".section-head, .dish, .chef-grid, .visit-card");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting) { en.target.style.opacity = "1"; en.target.style.transform = "none"; io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(function(el){
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = "opacity .6s ease, transform .6s ease";
      io.observe(el);
    });
  }
})();

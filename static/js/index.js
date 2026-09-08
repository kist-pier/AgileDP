/* AgileDP project page interactions. */

document.addEventListener('DOMContentLoaded', function () {

  /* --- floating nav: click to pin open (hover handles desktop via CSS) --- */
  var nav = document.querySelector('.floating-nav');
  var trigger = document.querySelector('.floating-nav-trigger');
  if (nav && trigger) {
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      nav.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) nav.classList.remove('open');
    });
    nav.querySelectorAll('.floating-nav-link').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* --- task selector: one active task panel per scope ------------------- */
  document.querySelectorAll('.task-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var scope = card.closest('.task-scope');
      if (!scope) return;
      var panel = scope.querySelector('#' + card.dataset.task);
      if (!panel) return;

      scope.querySelectorAll('.task-panel').forEach(function (p) { p.classList.remove('active'); });
      scope.querySelectorAll('.task-card').forEach(function (c) { c.classList.remove('active'); });

      panel.classList.add('active');
      card.classList.add('active');
      panel.querySelectorAll('video').forEach(function (v) {
        var play = v.play();
        if (play && play.catch) play.catch(function () {});
      });
    });
  });

  /* --- bit-width toggle on the simulation results table ----------------- */
  document.querySelectorAll('.bit-toggle').forEach(function (group) {
    group.querySelectorAll('.bit-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.dataset.bits;
        group.querySelectorAll('.bit-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        document.querySelectorAll('[data-bit-table]').forEach(function (tbl) {
          tbl.hidden = (tbl.dataset.bitTable !== target);
          /* a table measured while hidden reports zero width, so re-measure */
          if (!tbl.hidden) syncScrollFade(tbl);
        });
      });
    });
  });

  /* --- drop the right-edge fade when a table is not (or no longer) cut off */
  function syncScrollFade(box) {
    var overflowing = box.scrollWidth > box.clientWidth + 1;
    var atEnd = box.scrollLeft + box.clientWidth >= box.scrollWidth - 2;
    box.classList.toggle('at-end', !overflowing || atEnd);
  }

  var scrollBoxes = document.querySelectorAll('.table-scroll');
  scrollBoxes.forEach(function (box) {
    syncScrollFade(box);
    box.addEventListener('scroll', function () { syncScrollFade(box); });
  });
  window.addEventListener('resize', function () {
    scrollBoxes.forEach(syncScrollFade);
  });

  /* --- speed up placeholder / rollout clips tagged .fast-video ---------- */
  document.querySelectorAll('.fast-video').forEach(function (v) { v.playbackRate = 1.5; });

  /* --- autoplay guard: some browsers refuse until muted is set in JS ---- */
  document.querySelectorAll('video[autoplay]').forEach(function (v) {
    v.muted = true;
    var play = v.play();
    if (play && play.catch) play.catch(function () {});
  });
});

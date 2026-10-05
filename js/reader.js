/* Word of God Risen — Chapter Reader
 *
 * Turns dead chapter-card links into a real reading experience.
 * Every book page renders its chapters as <a href=""> cards (empty links).
 * This script intercepts clicks on those empty-link cards and opens a
 * focused reading overlay with the chapter's full text, artwork, and
 * previous/next navigation — no per-page changes needed.
 *
 * Cards with REAL links (e.g. the book grid on index.html) are untouched.
 */
(function () {
  function init() {
    var container = document.getElementById('books');
    if (!container) return;

    // --- Build the overlay once -------------------------------------------
    var overlay = document.createElement('div');
    overlay.className = 'wogr-reader';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Chapter reader');
    overlay.innerHTML =
      '<div class="wogr-reader-backdrop"></div>' +
      '<div class="wogr-reader-card">' +
        '<button type="button" class="wogr-reader-close" aria-label="Close chapter">&times;</button>' +
        '<img class="wogr-reader-img" alt="" />' +
        '<h2 class="wogr-reader-title"></h2>' +
        '<div class="wogr-reader-text"></div>' +
        '<div class="wogr-reader-nav">' +
          '<button type="button" class="wogr-reader-prev">&larr; Previous</button>' +
          '<button type="button" class="wogr-reader-next">Next &rarr;</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    var cardEl  = overlay.querySelector('.wogr-reader-card');
    var imgEl   = overlay.querySelector('.wogr-reader-img');
    var titleEl = overlay.querySelector('.wogr-reader-title');
    var textEl  = overlay.querySelector('.wogr-reader-text');
    var prevBtn = overlay.querySelector('.wogr-reader-prev');
    var nextBtn = overlay.querySelector('.wogr-reader-next');
    var current = -1;

    function chapterLinks() {
      return Array.prototype.slice.call(container.querySelectorAll('a'));
    }

    function dataFromLink(link) {
      var card = link.querySelector('.book-card') || link;
      var im = card.querySelector('img');
      var h  = card.querySelector('h2');
      var p  = card.querySelector('p');
      return {
        img:   im ? im.src : '',
        alt:   im ? (im.alt || '') : '',
        title: h ? h.textContent.trim() : '',
        text:  p ? p.textContent.trim() : ''
      };
    }

    function openAt(i) {
      var links = chapterLinks();
      if (i < 0 || i >= links.length) return;
      current = i;
      var d = dataFromLink(links[i]);
      if (d.img) { imgEl.src = d.img; imgEl.alt = d.alt; imgEl.style.display = ''; }
      else { imgEl.style.display = 'none'; }
      titleEl.textContent = d.title;
      textEl.textContent = d.text;
      cardEl.scrollTop = 0;
      prevBtn.disabled = (i === 0);
      nextBtn.disabled = (i === links.length - 1);
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      overlay.querySelector('.wogr-reader-close').focus();
    }

    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Only hijack EMPTY links — real navigation keeps working.
    container.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a') : null;
      if (!link || !container.contains(link)) return;
      var href = link.getAttribute('href');
      if (href && href.trim() !== '' && href.trim() !== '#') return;
      e.preventDefault();
      openAt(chapterLinks().indexOf(link));
    });

    overlay.querySelector('.wogr-reader-close').addEventListener('click', close);
    overlay.querySelector('.wogr-reader-backdrop').addEventListener('click', close);
    prevBtn.addEventListener('click', function () { openAt(current - 1); });
    nextBtn.addEventListener('click', function () { openAt(current + 1); });
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') openAt(current - 1);
      else if (e.key === 'ArrowRight') openAt(current + 1);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

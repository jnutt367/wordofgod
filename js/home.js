/* Word of God Risen — homepage widgets (index.html only)
 *
 * - Verse of the day (bible-api.com, cached per day in localStorage)
 * - "Continue reading" card from WOGRProgress (js/progress.js)
 */
(function () {
  var FALLBACK = {
    ref: 'Jeremiah 29:11',
    text: 'For I know the plans I have for you,\u201d declares the Lord, \u201cplans to prosper you and not to harm you, plans to give you hope and a future.'
  };

  function bookLabel(page) {
    return (page || '').replace(/\.html$/, '').replace(/-/g, ' ')
      .replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  function todayKey() {
    return new Date().toDateString();
  }

  function loadVerse(el) {
    var verseP = el.querySelector('.widget-verse');
    var refP = document.createElement('p');
    refP.className = 'widget-ref';

    function show(ref, text) {
      verseP.textContent = '\u201c' + text.trim() + '\u201d';
      refP.textContent = '\u2014 ' + ref;
      el.appendChild(refP);
    }

    var cached = null;
    try { cached = JSON.parse(localStorage.getItem('wogr_votd') || 'null'); } catch (e) {}
    if (cached && cached.day === todayKey() && cached.text) {
      show(cached.ref, cached.text);
      return;
    }
    fetch('https://bible-api.com/?random')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d || !d.text) throw new Error('empty');
        try {
          localStorage.setItem('wogr_votd', JSON.stringify({ day: todayKey(), ref: d.reference, text: d.text.trim() }));
        } catch (e) {}
        show(d.reference, d.text.trim());
      })
      .catch(function () { show(FALLBACK.ref, FALLBACK.text); });
  }

  function init() {
    var anchor = document.querySelector('.encourage');
    if (!anchor) return;

    var verseEl = document.createElement('section');
    verseEl.className = 'wogr-home-widget';
    verseEl.setAttribute('aria-label', 'Verse of the day');
    verseEl.innerHTML =
      '<p class="widget-kicker">Verse of the day</p>' +
      '<p class="widget-verse">Loading today\u2019s verse\u2026</p>';
    anchor.after(verseEl);
    loadVerse(verseEl);

    if (window.WOGRProgress) {
      var last = WOGRProgress.lastRead();
      if (last) {
        var total = WOGRProgress.totalRead();
        var el = document.createElement('section');
        el.className = 'wogr-home-widget';
        el.setAttribute('aria-label', 'Continue reading');
        el.innerHTML =
          '<p class="widget-kicker">Continue reading</p>' +
          '<p class="widget-verse">' + bookLabel(last.page) +
            (last.title ? ' \u2014 ' + last.title : '') + '</p>' +
          '<p class="widget-progress">You\u2019ve read ' + total +
            ' chapter' + (total === 1 ? '' : 's') + ' so far. Keep going!</p>' +
          '<a class="widget-link" href="' + last.page + '#read=' + last.idx + '">Pick up where you left off &rarr;</a>';
        // Escape: rebuild safely if title has HTML-special chars
        var titleNode = el.querySelector('.widget-verse');
        titleNode.textContent = '';
        titleNode.appendChild(document.createTextNode(
          bookLabel(last.page) + (last.title ? ' \u2014 ' + last.title : '')));
        verseEl.after(el);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

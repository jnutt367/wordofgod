/* Word of God Risen — chapter search
 *
 * Searches every chapter (title + text) via a compact prebuilt index
 * (json/search_index.json). The index loads lazily on first use.
 * window.WOGRSearch.open() is wired to the nav search button (script2.js).
 */
(function () {
  var index = null, loading = null, overlay = null, input = null, list = null, count = null;

  function ensureIndex() {
    if (index) return Promise.resolve(index);
    if (!loading) {
      loading = fetch('json/search_index.json')
        .then(function (r) { return r.json(); })
        .then(function (d) { index = d; return d; })
        .catch(function () { index = []; return index; });
    }
    return loading;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function bookLabel(page) {
    return page.replace(/\.html$/, '').replace(/-/g, ' ')
      .replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  function highlight(text, q) {
    var safe = esc(text);
    if (!q) return safe;
    var qi = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    try {
      return safe.replace(new RegExp('(' + qi + ')', 'ig'), '<mark>$1</mark>');
    } catch (e) { return safe; }
  }

  function search(q) {
    q = q.trim().toLowerCase();
    if (q.length < 2 || !index) return [];
    var titleHits = [], textHits = [];
    for (var n = 0; n < index.length; n++) {
      var e = index[n];
      if (e.t.toLowerCase().indexOf(q) !== -1) titleHits.push(e);
      else if (e.x.toLowerCase().indexOf(q) !== -1) textHits.push(e);
      if (titleHits.length + textHits.length >= 40) break;
    }
    return titleHits.concat(textHits).slice(0, 40);
  }

  function render(q) {
    var hits = search(q);
    count.textContent = q.trim().length < 2
      ? 'Type at least 2 letters to search ' + (index ? index.length : '') + ' chapters.'
      : hits.length + ' result' + (hits.length === 1 ? '' : 's');
    list.innerHTML = '';
    if (q.trim().length >= 2 && !hits.length) {
      var empty = document.createElement('li');
      empty.className = 'wogr-search-empty';
      empty.textContent = 'No chapters found for \u201c' + q.trim() + '\u201d.';
      list.appendChild(empty);
      return;
    }
    hits.forEach(function (e) {
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wogr-search-result';
      btn.innerHTML =
        '<span class="wogr-search-book">' + esc(bookLabel(e.p)) + '</span>' +
        '<span class="wogr-search-title">' + highlight(e.t, q.trim()) + '</span>' +
        '<span class="wogr-search-snippet">' + highlight(e.x, q.trim()) + '\u2026</span>';
      btn.addEventListener('click', function () { goTo(e); });
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  function goTo(e) {
    close();
    var target = e.p + '#read=' + e.i;
    if (location.pathname.split('/').pop() === e.p) {
      location.hash = '#read=' + e.i; // reader.js picks this up live
    } else {
      location.href = target;
    }
  }

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'wogr-search';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Search chapters');
    overlay.innerHTML =
      '<div class="wogr-search-backdrop"></div>' +
      '<div class="wogr-search-card">' +
        '<button type="button" class="wogr-search-close" aria-label="Close search">&times;</button>' +
        '<div class="wogr-search-head">' +
          '<input type="search" class="wogr-search-input" placeholder="Search every chapter\u2026" aria-label="Search chapters" />' +
          '<p class="wogr-search-count"></p>' +
        '</div>' +
        '<ul class="wogr-search-results"></ul>' +
      '</div>';
    document.body.appendChild(overlay);
    input = overlay.querySelector('.wogr-search-input');
    list = overlay.querySelector('.wogr-search-results');
    count = overlay.querySelector('.wogr-search-count');

    var t = null;
    input.addEventListener('input', function () {
      clearTimeout(t);
      t = setTimeout(function () { render(input.value); }, 160);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var first = list.querySelector('.wogr-search-result');
        if (first) first.click();
      }
    });
    overlay.querySelector('.wogr-search-close').addEventListener('click', close);
    overlay.querySelector('.wogr-search-backdrop').addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });
  }

  function open() {
    if (!overlay) build();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    ensureIndex().then(function () {
      render(input.value || '');
      input.focus();
    });
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  window.WOGRSearch = { open: open, close: close };
})();

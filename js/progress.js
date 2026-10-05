/* Word of God Risen — Reading progress
 *
 * Persists which chapters have been read in localStorage.
 * Keyed by page + chapter index, so it survives content edits.
 * Used by js/book.js (badges), js/reader.js (mark-read toggle)
 * and js/home.js (continue-reading on the homepage).
 */
(function () {
  var STORE_KEY = 'wogr_progress_v1';

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    } catch (e) { return {}; }
  }
  function save(data) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {}
  }
  // Stable page id, e.g. "genesis.html"
  function pageId() {
    var p = location.pathname.split('/').pop();
    return p || 'index.html';
  }

  window.WOGRProgress = {
    pageId: pageId,
    key: function (page, idx) { return page + '::' + idx; },

    isRead: function (page, idx) {
      return !!load()[this.key(page, idx)];
    },

    markRead: function (page, idx, title) {
      var data = load();
      data[this.key(page, idx)] = { title: title || '', at: Date.now() };
      save(data);
    },

    markUnread: function (page, idx) {
      var data = load();
      delete data[this.key(page, idx)];
      save(data);
    },

    toggle: function (page, idx, title) {
      if (this.isRead(page, idx)) { this.markUnread(page, idx); return false; }
      this.markRead(page, idx, title);
      return true;
    },

    // Chapters read on a given page, as [idx, ...] sorted ascending.
    readOnPage: function (page) {
      var data = load(), out = [], prefix = page + '::';
      Object.keys(data).forEach(function (k) {
        if (k.indexOf(prefix) === 0) out.push(parseInt(k.slice(prefix.length), 10));
      });
      return out.sort(function (a, b) { return a - b; });
    },

    // Total chapters read across the whole app.
    totalRead: function () {
      return Object.keys(load()).length;
    },

    // Most recently read chapter, for "Continue reading".
    lastRead: function () {
      var data = load(), best = null;
      Object.keys(data).forEach(function (k) {
        var entry = data[k];
        if (!best || (entry.at || 0) > (best.at || 0)) {
          var sep = k.lastIndexOf('::');
          best = { page: k.slice(0, sep), idx: parseInt(k.slice(sep + 2), 10),
                   title: entry.title || '', at: entry.at || 0 };
        }
      });
      return best;
    }
  };
})();

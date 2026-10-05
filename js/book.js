/* Word of God Risen — shared book renderer
 *
 * Replaces 25 copy-pasted per-book renderer files. Each book page loads:
 *   <script src="js/book.js" data-json="json/genesis_data.json"></script>
 * and this renders the chapter cards from that JSON file.
 *
 * After rendering it marks already-read chapters (via WOGRProgress) and
 * fires a "wogr:chapters-ready" event on #books for js/reader.js.
 */
(function () {
  function init() {
    var container = document.getElementById('books');
    if (!container) return;

    var script = document.currentScript;
    var jsonPath = script && script.getAttribute('data-json');
    if (!jsonPath) return;

    fetch(jsonPath)
      .then(function (response) { return response.json(); })
      .then(function (data) {
        var page = window.WOGRProgress ? WOGRProgress.pageId() : null;

        data.books.forEach(function (book, idx) {
          var link = document.createElement('a');
          link.href = book.link || ''; // empty => js/reader.js opens the reading overlay
          link.dataset.chapterIndex = idx;

          var card = document.createElement('div');
          card.classList.add('book-card');

          var img = document.createElement('img');
          img.src = book.image;
          img.alt = book.title;

          var title = document.createElement('h2');
          title.textContent = book.title;

          var desc = document.createElement('p');
          desc.textContent = book.description;

          card.appendChild(img);
          card.appendChild(title);
          card.appendChild(desc);

          // Read badge
          if (page && window.WOGRProgress && WOGRProgress.isRead(page, idx)) {
            card.classList.add('is-read');
            var badge = document.createElement('span');
            badge.className = 'read-badge';
            badge.textContent = '\u2713 Read';
            badge.setAttribute('aria-label', 'Chapter already read');
            card.appendChild(badge);
          }

          link.appendChild(card);
          container.appendChild(link);
        });

        // Let the chapter reader (and anything else) know cards are in.
        var evt;
        try {
          evt = new CustomEvent('wogr:chapters-ready', { bubbles: true });
        } catch (e) {
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent('wogr:chapters-ready', true, false, null);
        }
        container.dispatchEvent(evt);
      })
      .catch(function (error) {
        console.error('Error fetching data:', error);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

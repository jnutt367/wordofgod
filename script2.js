document.addEventListener('DOMContentLoaded', function() {
    // ---------- Intro modal: show once per browser, not on every page -----
    var modal = document.getElementById('modal');
    var closeButton = document.querySelector('.close-button');
    var seen = false;
    try { seen = localStorage.getItem('wogr_modal_seen') === '1'; } catch (e) {}

    function dismissModal() {
      if (!modal) return;
      modal.style.display = 'none';
      try { localStorage.setItem('wogr_modal_seen', '1'); } catch (e) {}
    }

    if (modal && closeButton) {
      if (!seen) {
        // 2-second delay before displaying the modal
        setTimeout(function () {
          modal.classList.add('fade-in');
          modal.style.display = 'block';
        }, 2000);
      }
      closeButton.onclick = dismissModal;
      window.onclick = function (event) {
        if (event.target === modal) dismissModal();
      };
    }

    // ---------- Nav icon labels: the icon-only nav is unreadable alone ----
    var NAV_LABELS = {
      'bi-arrow-left-square-fill': 'Prev',
      'bi-caret-down-square-fill': 'Books',
      'bi-journal-bookmark-fill': 'Books',
      'bi-pen-fill': 'About',
      'bi-house-heart-fill': 'Home',
      'bi-envelope-paper-heart': 'Give',
      'bi-quote': 'Parables',
      'bi-arrow-right-square-fill': 'Next'
    };
    var icons = document.querySelectorAll('.sticky-nav i[class*="bi-"]');
    Array.prototype.forEach.call(icons, function (icon) {
      var match = Object.keys(NAV_LABELS).filter(function (k) {
        return icon.classList.contains(k);
      })[0];
      if (match && !icon.parentElement.querySelector('.nav-label')) {
        var s = document.createElement('span');
        s.className = 'nav-label';
        s.textContent = NAV_LABELS[match];
        icon.after(s);
      }
    });

    // ---------- Search button in the nav (opens js/search.js overlay) -----
    var navUl = document.querySelector('.sticky-nav ul');
    if (navUl && !navUl.querySelector('.wogr-search-open')) {
      var searchLi = document.createElement('li');
      searchLi.innerHTML = '<button type="button" class="wogr-search-open" aria-label="Search every chapter">' +
        '<i class="bi bi-search"></i><span class="nav-label">Search</span></button>';
      navUl.appendChild(searchLi);
      searchLi.querySelector('button').addEventListener('click', function () {
        if (window.WOGRSearch) window.WOGRSearch.open();
      });
    }
  });

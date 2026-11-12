/* دار الحلا — سكربت المعاينة (Demo فقط، بلا مكتبات)
   في سلة: السلة والخيارات والسعر والمعرض وترتيب التصنيف وفلترته تديرها المنصة نفسها، فلا يُنقل
   هذا الملف إلى المتجر. قد يُستفاد فقط من فكرة رسالة التأكيد أو عداد
   رسالة الإهداء إن لم يوفّرها القالب. */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var fmt = function (n) { return Math.round(n).toLocaleString('en-US'); };

  /* ---------- رسالة التأكيد (Toast) ---------- */
  var toast = $('[data-toast]');
  var toastText = $('[data-toast-text]');
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toastText.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2800);
  }

  /* ---------- عداد السلة (يُحفظ بين الصفحتين للمعاينة) ---------- */
  var KEY = 'darhala-demo-cart';
  function readCount() { try { return parseInt(localStorage.getItem(KEY), 10) || 0; } catch (e) { return 0; } }
  function writeCount(n) { try { localStorage.setItem(KEY, String(n)); } catch (e) { /* التخزين غير متاح */ } }
  var cartCount = readCount();
  function renderCount(bump) {
    $$('[data-cart-count]').forEach(function (el) {
      el.textContent = cartCount;
      if (bump) { el.classList.remove('is-bump'); void el.offsetWidth; el.classList.add('is-bump'); }
    });
    $$('[data-cart-link]').forEach(function (el) {
      el.setAttribute('aria-label', 'السلة، ' + cartCount + ' ' + (cartCount === 1 ? 'منتج' : 'منتجات'));
    });
  }
  function addToCart(name, qty, btn) {
    cartCount += qty;
    writeCount(cartCount);
    renderCount(true);
    showToast('تمت إضافة ' + (qty > 1 ? qty + ' × ' : '') + name + ' إلى السلة');
    if (btn) {
      btn.classList.add('is-added');
      setTimeout(function () { btn.classList.remove('is-added'); }, 1200);
    }
  }
  renderCount(false);

  $$('[data-add-to-cart]').forEach(function (btn) {
    btn.addEventListener('click', function () { addToCart(btn.getAttribute('data-product'), 1, btn); });
  });

  /* ---------- روابط غير متاحة في المعاينة ---------- */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-demo-link]');
    if (!link) return;
    e.preventDefault();
    if (link.hasAttribute('data-whatsapp')) showToast('رابط واتساب يُضاف بعد استلام رقم المتجر من العميل');
    else if (link.hasAttribute('data-cart-link')) showToast('في السلة ' + cartCount + ' منتج — صفحة السلة يولّدها متجر سلة');
    else showToast('هذه الصفحة غير مضمّنة في المعاينة — النموذج يضم الرئيسية وتصنيف المعمول والتمور وصفحة بوكس المعمول');
  });

  var search = $('[data-search]');
  if (search) search.addEventListener('submit', function (e) { e.preventDefault(); showToast('البحث يعمل في المتجر الفعلي على سلة'); });

  /* ---------- المفضلة ---------- */
  $$('.wish').forEach(function (b) {
    b.addEventListener('click', function () {
      var on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      showToast(on ? 'أُضيف إلى المفضلة' : 'أُزيل من المفضلة');
    });
  });

  /* ---------- قائمة الجوال ---------- */
  var nav = $('#site-nav');
  var openBtn = $('[data-nav-open]');
  var closeBtn = $('[data-nav-close]');
  var overlay = $('[data-nav-overlay]');
  function setNav(open) {
    if (!nav) return;
    nav.classList.toggle('is-open', open);
    overlay.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-locked', open);
    openBtn.setAttribute('aria-expanded', String(open));
    if (open) { var first = $('.nav__link', nav); if (first) first.focus(); }
    else openBtn.focus();
  }
  if (nav && openBtn) {
    openBtn.addEventListener('click', function () { setNav(true); });
    closeBtn.addEventListener('click', function () { setNav(false); });
    overlay.addEventListener('click', function () { setNav(false); });
    $$('.nav__link', nav).forEach(function (a) {
      a.addEventListener('click', function () { if (nav.classList.contains('is-open')) setNav(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setNav(false);
    });
    // عند التوسيع لعرض الحاسوب تصبح القائمة صفاً أفقياً، فنغلق الدرج إن كان مفتوحاً
    var mq = window.matchMedia('(min-width: 1024px)');
    var onMq = function () {
      if (mq.matches && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open'); overlay.classList.remove('is-open');
        document.body.classList.remove('nav-locked'); openBtn.setAttribute('aria-expanded', 'false');
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', onMq); else if (mq.addListener) mq.addListener(onMq);
  }

  /* ---------- صفحة المنتج ---------- */
  // المعرض
  var mainImg = $('[data-gallery-main]');
  $$('[data-thumb]').forEach(function (t) {
    t.addEventListener('click', function () {
      if (t.getAttribute('aria-current') === 'true') return;
      $$('[data-thumb]').forEach(function (x) { x.setAttribute('aria-current', 'false'); });
      t.setAttribute('aria-current', 'true');
      mainImg.classList.add('is-swapping');
      setTimeout(function () {
        mainImg.src = t.getAttribute('data-src');
        mainImg.alt = t.getAttribute('data-alt');
        mainImg.classList.remove('is-swapping');
      }, 160);
    });
  });

  var form = $('[data-product-form]');
  if (form) {
    var qtyInput = $('[data-qty]', form);
    var totalEls = $$('[data-total]');
    var priceEl = $('[data-price]');
    var bnplEl = $('[data-bnpl]');

    var calc = function () {
      var size = $('input[name="size"]:checked', form);
      var wrap = $('input[name="wrap"]:checked', form);
      var unit = (+size.getAttribute('data-price')) + (+wrap.getAttribute('data-price'));
      var qty = Math.min(20, Math.max(1, parseInt(qtyInput.value, 10) || 1));
      qtyInput.value = qty;
      if (priceEl) priceEl.textContent = fmt(unit);
      totalEls.forEach(function (el) { el.textContent = fmt(unit * qty) + ' ر.س'; });
      if (bnplEl) bnplEl.textContent = (unit * qty / 4).toFixed(2).replace(/\.00$/, '');
    };

    $$('[data-step]', form).forEach(function (b) {
      b.addEventListener('click', function () {
        qtyInput.value = (parseInt(qtyInput.value, 10) || 1) + (+b.getAttribute('data-step'));
        calc();
      });
    });
    form.addEventListener('change', calc);
    qtyInput.addEventListener('input', function () { if (qtyInput.value !== '') calc(); });

    // عداد رسالة الإهداء
    var msg = $('[data-gift-msg]', form);
    var msgCount = $('[data-gift-count]', form);
    if (msg && msgCount) {
      var upd = function () { msgCount.textContent = msg.value.length; };
      msg.addEventListener('input', upd); upd();
    }

    // أقرب تاريخ للتوصيل = اليوم، وأبعده بعد 30 يوماً
    var date = $('[data-date]', form);
    if (date) {
      var iso = function (d) { var z = new Date(d.getTime() - d.getTimezoneOffset() * 60000); return z.toISOString().slice(0, 10); };
      var now = new Date();
      date.min = iso(now);
      date.max = iso(new Date(now.getTime() + 30 * 864e5));
      if (!date.value) date.value = iso(now);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var size = $('input[name="size"]:checked', form);
      var name = form.getAttribute('data-product') + ' (' + size.getAttribute('data-label') + ')';
      addToCart(name, parseInt(qtyInput.value, 10) || 1, $('[data-submit]', form));
    });

    calc();
  }

  /* ---------- صفحة التصنيف ---------- */
  // الفقرة التعريفية: تُطوى في الجوال فقط (CSS)، والزر يفتحها
  var intro = $('[data-intro]');
  var introBtn = $('[data-intro-toggle]');
  if (intro && introBtn) {
    introBtn.addEventListener('click', function () {
      var on = !intro.classList.contains('is-expanded');
      intro.classList.toggle('is-expanded', on);
      introBtn.setAttribute('aria-expanded', String(on));
      introBtn.textContent = on ? 'عرض أقل' : 'اقرأ المزيد';
    });
  }

  // الترتيب والفلترة على بيانات data-* في كل عنصر من الشبكة
  var catalog = $('[data-catalog]');
  var filterForm = $('[data-filter-form]');
  if (catalog && filterForm) {
    var items = Array.prototype.slice.call(catalog.children);
    var total = items.length;
    var sortSel = $('[data-sort]');
    var sortValue = $('[data-sort-value]');
    var countEl = $('[data-result-count]');
    var applyCount = $('[data-apply-count]');
    var badge = $('[data-filter-badge]');
    var emptyEl = $('[data-empty]');
    var activeWrap = $('[data-active-filters]');
    var activeList = $('[data-active-list]');
    var headClear = $('.filters__head [data-filters-clear]');
    var drawer = $('[data-filters]');
    var fOverlay = $('[data-filters-overlay]');
    var fOpen = $('[data-filters-open]');
    var fClose = $('[data-filters-close]');
    var fApply = $('[data-filters-apply]');
    var mqDesk = window.matchMedia('(min-width: 1024px)');

    // صيغة العدد بالعربية: منتج واحد، منتجان، 3–10 منتجات، 11+ منتجاً
    var plural = function (n) {
      if (n === 1) return 'منتج واحد';
      if (n === 2) return 'منتجان';
      if (n >= 3 && n <= 10) return n + ' منتجات';
      return n + ' منتجاً';
    };
    var visible = function (el) { return !!el && el.offsetParent !== null; };

    items.forEach(function (li, i) { li.setAttribute('data-index', i); });

    var getState = function () {
      var price = $('input[name="price"]:checked', filterForm);
      return {
        today: $('input[name="today"]', filterForm).checked,
        gift: $('input[name="gift"]', filterForm).checked,
        occ: $$('input[name="occasion"]:checked', filterForm).map(function (i) { return i.value; }),
        price: price ? price.value : ''
      };
    };
    var matches = function (li, s) {
      if (s.today && li.getAttribute('data-today') !== '1') return false;
      if (s.gift && li.getAttribute('data-gift') !== '1') return false;
      if (s.occ.length) {
        // داخل المجموعة الواحدة "أو": العيد أو الزواج
        var own = (li.getAttribute('data-occasions') || '').split(/\s+/);
        if (!s.occ.some(function (o) { return own.indexOf(o) > -1; })) return false;
      }
      if (s.price) {
        var r = s.price.split('-'), p = +li.getAttribute('data-price');
        if (p < +r[0] || p > +r[1]) return false;
      }
      return true;
    };

    // عدد المنتجات بجانب كل خيار (ثابت، محسوب من كل المنتجات)
    $$('[data-count-for]').forEach(function (el) {
      var key = el.getAttribute('data-count-for').split(':');
      var s = { today: key[0] === 'today', gift: key[0] === 'gift', occ: key[0] === 'occasion' ? [key[1]] : [], price: key[0] === 'price' ? key[1] : '' };
      el.textContent = '(' + items.filter(function (li) { return matches(li, s); }).length + ')';
    });

    var num = function (li, attr) { return +li.getAttribute(attr); };
    var sorters = {
      popular: function (a, b) { return num(b, 'data-popular') - num(a, 'data-popular'); },
      'price-asc': function (a, b) { return num(a, 'data-price') - num(b, 'data-price'); },
      'price-desc': function (a, b) { return num(b, 'data-price') - num(a, 'data-price'); },
      newest: function (a, b) { var x = a.getAttribute('data-added'), y = b.getAttribute('data-added'); return x < y ? 1 : x > y ? -1 : 0; }
    };
    var applySort = function () {
      var fn = sorters[sortSel.value] || sorters.popular;
      items.slice()
        .sort(function (a, b) { return fn(a, b) || num(a, 'data-index') - num(b, 'data-index'); })
        .forEach(function (li) { catalog.appendChild(li); });
      if (sortValue) sortValue.textContent = sortSel.options[sortSel.selectedIndex].text;
    };

    var afterRemoveFocus = function () {
      // بعد إزالة فلتر يختفي زره؛ ننقل التركيز لمكان منطقي بدل أن يضيع
      var next = $('.filter-chip', activeList);
      if (next) next.focus();
      else if (drawer.classList.contains('is-open')) fClose.focus();
      else if (visible(fOpen)) fOpen.focus();
      else sortSel.focus();
    };

    var applyFilters = function () {
      var s = getState(), shown = 0;
      items.forEach(function (li) {
        var ok = matches(li, s);
        li.hidden = !ok;
        if (ok) shown++;
      });
      countEl.textContent = shown === 0 ? 'لا توجد نتائج'
        : shown === total ? plural(total)
        : 'عرض ' + shown + ' من ' + total + ' منتجات';
      if (applyCount) applyCount.textContent = shown === 0 ? 'لا توجد نتائج' : 'عرض ' + (shown === 2 ? 'منتجين' : plural(shown));
      emptyEl.hidden = shown !== 0;
      catalog.hidden = shown === 0;

      // رقائق الفلاتر المفعّلة
      var active = $$('input:checked', filterForm).filter(function (i) { return i.value !== '' && i.hasAttribute('data-chip'); });
      activeList.innerHTML = '';
      active.forEach(function (inp) {
        var label = inp.getAttribute('data-chip');
        var li = document.createElement('li');
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'filter-chip';
        b.setAttribute('aria-label', 'إزالة فلتر: ' + label);
        b.innerHTML = '<span></span><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-close"/></svg>';
        b.firstChild.textContent = label;
        b.addEventListener('click', function () {
          if (inp.type === 'radio') $('input[name="price"][value=""]', filterForm).checked = true;
          else inp.checked = false;
          applyFilters();
          afterRemoveFocus();
        });
        li.appendChild(b);
        activeList.appendChild(li);
      });
      activeWrap.hidden = active.length === 0;
      if (headClear) headClear.hidden = active.length === 0;
      badge.hidden = active.length === 0;
      badge.textContent = active.length;
      fOpen.setAttribute('aria-label', active.length ? 'تصفية، ' + active.length + ' مفعّلة' : 'تصفية');
    };

    filterForm.addEventListener('change', applyFilters);
    filterForm.addEventListener('submit', function (e) { e.preventDefault(); });
    sortSel.addEventListener('change', applySort);

    $$('[data-filters-clear]').forEach(function (b) {
      b.addEventListener('click', function () {
        filterForm.reset();
        applyFilters();
        if (!visible(b)) afterRemoveFocus();
      });
    });

    // الدرج (الجوال والتابلت)
    var setDrawer = function (open, silent) {
      drawer.classList.toggle('is-open', open);
      fOverlay.classList.toggle('is-open', open);
      document.body.classList.toggle('filters-locked', open);
      fOpen.setAttribute('aria-expanded', String(open));
      if (open) {
        drawer.setAttribute('role', 'dialog');
        drawer.setAttribute('aria-modal', 'true');
        fClose.focus();
      } else {
        drawer.removeAttribute('role');
        drawer.removeAttribute('aria-modal');
        if (!silent) fOpen.focus();
      }
    };
    fOpen.addEventListener('click', function () { setDrawer(true); });
    fClose.addEventListener('click', function () { setDrawer(false); });
    fApply.addEventListener('click', function () { setDrawer(false); });
    fOverlay.addEventListener('click', function () { setDrawer(false); });
    document.addEventListener('keydown', function (e) {
      if (!drawer.classList.contains('is-open')) return;
      if (e.key === 'Escape') { setDrawer(false); return; }
      if (e.key !== 'Tab') return;
      // إبقاء التركيز داخل الدرج أثناء فتحه
      var f = $$('button, input, select, a[href]', drawer).filter(visible);
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    var onDesk = function () { if (mqDesk.matches && drawer.classList.contains('is-open')) setDrawer(false, true); };
    if (mqDesk.addEventListener) mqDesk.addEventListener('change', onDesk); else if (mqDesk.addListener) mqDesk.addListener(onDesk);

    applySort();
    applyFilters();
  }
})();

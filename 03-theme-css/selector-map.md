# خريطة المحددات — من تصميم "دار الحلا" إلى قالب رائد

> **المصدر:** [SallaApp/theme-raed](https://github.com/SallaApp/theme-raed) فرع `master`، commit `d49c0edc61ed40dfb5e7117c1c4003465c7f5a62` بتاريخ 2026-11-11، و`package.json` بالإصدار `1.358.0`.
> مكونات `salla-*` من الحزمة `@salla.sa/twilight-components`: الإصدار `2.14.612` (يطابق `^2.14.551` في رائد). وقورنت الكلاسات المستخدمة هنا بآخر إصدار `3.0.50`، وهي موجودة فيه بالأسماء نفسها.
> تاريخ الفحص: 2026-11-12. قُرئت الملفات نصاً فقط، دون استنساخ المستودع أو تشغيل أي سكربت منه.
>
> **الاختصارات:** `[raed]` = مستودع رائد، و`[twc]` = `twilight-components/dist/collection/components/`.
> **"مؤكد"** يعني أن المحدد موجود في الشيفرة المصدرية. **لا يعني أنه جُرّب على متجر حي**؛ كل الملف يحتاج الفحص البصري بعد التركيب (README، القسم 6).

## 1. المتغيرات (ربط لا كتابة فوق)

| العنصر في التصميم | المتغير في رائد | الملف المصدر | الحالة |
|---|---|---|---|
| اللون الأساسي `#4E2E1E` | `--color-primary` و`--color-primary-dark` (يُضبطان من اللوحة، و`custom.css` يقرؤهما فقط) | `[raed] src/views/layouts/master.twig` | ✔ مؤكد |
| الخط | `--font-main` (يُضبط من اللوحة، والبديل معلّق في القسم 0) | `[raed] layouts/master.twig` و`tailwind.config.js` | ✔ مؤكد |
| لون النص الأساسي `#2B1B12` | `--main-text-color` | `[raed] src/assets/styles/01-settings/global.scss` و`02-generic/reset.scss` | ✔ مؤكد |
| النص الثانوي `#6B5646` | `--color-text` | `[raed] 01-settings/global.scss` و`[twc] salla-cart-summary/salla-cart-summary.css` | ✔ مؤكد |
| زاوية الحقول 14px | `--s-radius` | `[raed] layouts/master.twig` و`[twc] salla-button/salla-button.css` و`salla-product-options.css` | ✔ مؤكد |
| زر الشراء الأخضر `#2E6A4C` | `--color-primary` داخل `salla-add-product-button` فقط | `[twc] salla-add-product-button/salla-add-product-button.js` و`salla-button/salla-button.css` | ✔ مؤكد |

## 2. المحددات

| العنصر في التصميم | المحدد في رائد | الملف المصدر | الحالة |
|---|---|---|---|
| خلفية الصفحة الكريمية | `body.theme-raed` | `[raed] layouts/master.twig` و`02-generic/common.scss` | ✔ مؤكد |
| حلقة التركيز | `body.theme-raed :focus-visible` | `[raed] tailwind.config.js` (`outline: false`) | ✔ مؤكد |
| الشريط العلوي (بني) | `body.topnav-is-dark .top-navbar` | `[raed] 04-components/header.scss` و`components/header/header.twig` | ✔ مؤكد |
| أيقونات الحساب والسلة | `.main-nav-container .header-btn__icon` | `[raed] 04-components/header.scss` و`header.twig` | ✔ مؤكد |
| عداد السلة (أخضر) | `salla-cart-summary .s-cart-summary-count` | `[raed] 04-components/header.scss` و`[twc] salla-cart-summary.js` | ✔ مؤكد |
| روابط القائمة (حاسوب) | `.main-menu > li.root-level > a` | `[raed] 04-components/menus.scss` و`assets/js/partials/main-menu.js` | ✔ مؤكد |
| تعتيم البانر | `.s-block--hero-slider .overlay-bg::after` | `[raed] 04-components/home-blocks.scss` و`components/home/enhanced-slider.twig` | ✔ مؤكد |
| عنوان البانر | `.s-block--hero-slider .home-slider__content h2` | `[raed] components/home/enhanced-slider.twig` | ✔ مؤكد |
| زر داخل البانر | لا يوجد في رائد: السلايدر يعرض عنواناً ووصفاً فقط | `[raed] enhanced-slider.twig` | ✖ غير متاح، والحل صورة بانر فيها النص |
| عناوين الأقسام | `.s-block__title h2` | `[raed] 04-components/home-blocks.scss` و`featured-products-style1.twig` | ✔ مؤكد |
| رابط "عرض الكل" | `.s-block__display-all` | `[raed] 04-components/home-blocks.scss` | ✔ مؤكد |
| بطاقات المناسبات | `.slide--cat-entry` (عنصر "روابط سريعة") | `[raed] components/home/main-links.twig` و`home-blocks.scss` | ✔ مؤكد |
| المزايا | `.s-block--features__item` | `[raed] components/home/store-features.twig` و`home-blocks.scss` | ✔ مؤكد |
| بطاقة المنتج | `custom-salla-product-card.s-product-card-entry` | `[raed] assets/js/partials/product-card.js` و`03-elements/product-card.scss` | ✔ مؤكد |
| خلفية صورة البطاقة وزاويتها | `custom-salla-product-card.s-product-card-vertical .s-product-card-image` | `[raed] product-card.js` و`product-card.scss` | ✔ مؤكد |
| صورة البطاقة 1:1 | المحدد نفسه + `aspect-ratio` | `[raed] product-card.scss` (تعارض محتمل مع `.s-product-card-fit-height`) | ⚠ غير مجرّب، معلّق |
| اسم المنتج (سطران) | `custom-salla-product-card .s-product-card-content-title a` | `[raed] product-card.js` و`product-card.scss` | ✔ مؤكد |
| سعر البطاقة | `custom-salla-product-card .s-product-card-price` | `[raed] product-card.js` | ✔ مؤكد |
| سعر البطاقة بعد الخصم | `.s-product-card-sale-price h4` | `[raed] 04-components/product.scss` (فيه `!important`) | ⚠ تُرك عمداً |
| الوصف المختصر في البطاقة | `custom-salla-product-card .s-product-card-content-subtitle` | `[raed] product-card.js` | ✔ مؤكد |
| زر "أضف للسلة" في البطاقة | `custom-salla-product-card .s-product-card-content-footer .s-button-primary-outline` | `[raed] product-card.js` (`fill="outline"`) و`[twc] salla-button/salla-button.js`، `salla-button.css` | ✔ مؤكد |
| زر "أضف للسلة" في صفحة المنتج | `salla-add-product-button .s-button-primary` | `[raed] pages/product/single.twig` و`[twc] salla-button.css` | ✔ مؤكد |
| شكل الكبسولة لكل أزرار الإضافة | `salla-add-product-button .s-button-btn` | `[twc] salla-button.js` و`salla-button.css` | ✔ مؤكد |
| شارة "الأكثر طلباً" | `custom-salla-product-card .s-product-card-promotion-title` (حقل "عنوان الترويج" في المنتج) | `[raed] product-card.js` و`04-components/product.scss` | ✔ مؤكد |
| الشارة في صفحة المنتج | `.container--product-details .promotion-title` | `[raed] pages/product/single.twig` و`04-components/slider.scss` | ✔ مؤكد |
| شارة "جديد" وشارة "خصم %" | لا يوجد عنصر في بطاقة رائد | `[raed] product-card.js` | ✖ غير متاح |
| معرض صفحة المنتج | `.container--product-details .details-slider` | `[raed] pages/product/single.twig` | ✔ مؤكد |
| اسم المنتج H1 | `.container--product-details [data-testid="store-product-title"]` | `[raed] pages/product/single.twig` | ✔ مؤكد |
| سعر صفحة المنتج | `.product-form .price-wrapper .total-price` و`.price_is_on_sale .total-price` | `[raed] pages/product/single.twig` | ✔ مؤكد |
| أقسام النموذج | `.product-form > section` | `[raed] pages/product/single.twig` | ✔ مؤكد |
| إطار الخيارات | `salla-product-options .s-product-options-wrapper` | `[twc] salla-product-options.css` و`[raed] pages/partials/product/options.twig` | ✔ مؤكد |
| عنوان الخيار | `salla-product-options .s-product-options-option-label` | `[twc] salla-product-options.css` | ✔ مؤكد |
| القائمة المنسدلة للخيار | `salla-product-options .s-form-control` | `[twc] salla-product-options.js` (`renderSelect`) | ✔ مؤكد |
| رقائق الخيارات (أزرار) | `salla-product-options .s-product-options-grid-mode-span` و`.s-product-options-grid-mode input:checked + div` | `[twc] salla-product-options.js` (`renderButtonStyle`) و`.css` | ✔ مؤكد (تظهر فقط إن كان الخيار بشكل أزرار) |
| عداد الكمية | `.sticky-product-bar salla-quantity-input .s-quantity-input-container` | `[twc] salla-quantity-input.js` و`[raed] 04-components/product.scss` | ✔ مؤكد |
| شريط الشراء الثابت (جوال) | `body.is-sticky-product-bar .sticky-product-bar` حتى 640px | `[raed] 04-components/product.scss` و`layouts/master.twig` | ✔ مؤكد (موجود في رائد كإعداد) |
| شريط الشراء الثابت (تابلت) | — | رائد يثبّته حتى 640px فقط | ⚠ لم يُكتب |
| عنوان التصنيف | `#page-main-title` | `[raed] pages/product/index.twig` | ✔ مؤكد |
| قائمة الترتيب | `#product-filter` | `[raed] pages/product/index.twig` و`03-elements/form.scss` | ✔ مؤكد |
| زر فتح الفلاتر (جوال) | `.container--products-list .filters-trigger` | `[raed] pages/product/index.twig` | ✔ مؤكد |
| وصف التصنيف (طيّ لسطرين) | لا يعرضه رائد في صفحة التصنيف | `[raed] pages/product/index.twig` | ✖ غير متاح |
| لوحة الفلاتر ورقائقها | `salla-filters` (البنية الداخلية لم تُفحص) | `[twc] salla-filters` | ⚠ غير مؤكد |
| التذييل | `body.footer-is-dark .store-footer` و`.store-footer__inner` و`.store-footer h3` | `[raed] components/footer/footer.twig` و`04-components/footer.scss` | ✔ مؤكد |
| نص الحقوق | `body.footer-is-dark .copyright-text p` | `[raed] 04-components/footer.scss` | ✔ مؤكد |
| الرقم الضريبي وشارات الثقة والدفع | `salla-trust-badges` و`salla-payments` (لا تُعدَّل) | `[raed] footer.twig` | ✔ لم تُلمس |
| الشريط الإعلاني أعلى الصفحة | `salla-advertisement` (احتمال) | `[twc] salla-advertisement` — غير مستخدم في قوالب رائد | ⚠ غير مؤكد، معلّق |
| عناوين سلايدر المنتجات | `.s-slider-block__title h2` | `[raed] home-blocks.scss` يذكر الكلاس، والبنية من `salla-products-slider` | ⚠ غير مؤكد، معلّق |
| زر واتساب العائم | غير موجود في رائد (من تطبيق أو إعداد خارجي) | — | ⚠ غير معروف، معلّق |

## 3. الملخص

- **قواعد مفعّلة (محددها من الشيفرة المصدرية):** 53 قاعدة (منها 4 داخل `@media`)، و3 متغيرات مربوطة بمتغيرات رائد.
- **معلّقة في قسم "⚠ يُتحقق على المتجر الحي":** 4 قواعد (صورة 1:1، والشريط الإعلاني، وواتساب، وعناوين السلايدر)، و3 ملاحظات بلا قواعد (شريط التابلت، والفلاتر، وسعر الخصم في البطاقة).
- **غير متاح في رائد** (يحتاج حلاً بالمحتوى لا بـ CSS): زر داخل البانر، وشارتا "جديد" و"خصم %"، ووصف التصنيف.

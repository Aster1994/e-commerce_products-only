# E-Commerce Products — Nuxt 4

یک پروژه فروشگاهی با **Nuxt 4** و **Vue 3** که با تمرکز بر ساختار قابل توسعه، SSR، SEO، performance و تجربه کاربری
پیاده‌سازی شده است.

این پروژه به‌عنوان یک coding challenge توسعه داده شده و API محصولات آن از **Fake Store API** استفاده می‌کند.

---

## معرفی پروژه

هدف پروژه ایجاد یک فروشگاه ساده اما با ساختار مناسب برای توسعه در مقیاس بزرگ‌تر است.

تمرکز اصلی در پیاده‌سازی روی موارد زیر بوده است:

* استفاده از Nuxt و SSR برای بهبود SEO و initial rendering
* ساختار component-based و قابل توسعه
* مدیریت state سمت client با Pinia
* بهینه‌سازی تصاویر و استفاده از responsive images
* پیاده‌سازی SEO و sitemap
* رعایت accessibility در بخش‌های اصلی UI
* توجه به performance و Lighthouse
* جداسازی مسئولیت‌ها بین UI، composables، stores و API layer

---

## قابلیت‌ها

### محصولات

* نمایش لیست محصولات
* فیلتر و مرتب‌سازی محصولات
* pagination
* صفحه جزئیات محصول
* SEO metadata برای صفحات محصول
* مدیریت loading و error state

### Navigation و UI

* Header و Footer قابل استفاده در صفحات مختلف
* طراحی responsive
* رعایت اصول پایه accessibility
* استفاده از componentهای قابل استفاده مجدد

### SEO

* مدیریت metadata صفحات
* title و description اختصاصی برای صفحات
* canonical URL
* sitemap
* robots configuration
* مدیریت صفحات dynamic مانند محصولات

### Performance

* استفاده از Nuxt Image
* تبدیل تصاویر به فرمت‌های مدرن مانند WebP
* responsive image sizing
* lazy loading برای تصاویر خارج از viewport
* preload کردن resource های مهم در صورت نیاز
* استفاده از SSR برای initial page rendering

---

## ساختار کلی پروژه

ساختار پروژه بر اساس مسئولیت هر بخش سازمان‌دهی شده است:

```text
.
├── assets/
│   └── ...
│
├── components/
│   ├── ui/
│   ├── pages/
│   ├── layout/
│   └── ...
│
├── composables/
│   └── ...
│
├── pages/
│   ├── index.vue
│   ├── products/
│   │   ├── index.vue
│   │   └── [id].vue
│   └── ...
│
├── server/
│   └── api/
│       └── ...
│
├── stores/
│   └── ...
│
├── types/
│   └── ...
│
├── public/
│   └── ...
│
├── nuxt.config.ts
└── package.json
```

هدف این ساختار این است که logic مربوط به data fetching، state management، UI و server functionality تا حد امکان از
یکدیگر جدا باشند.

---

## تکنولوژی‌ها

* **Nuxt 4**
* **Vue 3**
* **TypeScript v4**
* **Pinia**
* **Tailwind CSS**
* **Nuxt Image**
* **Nuxt SEO**
* **Nuxt Fonts**
* **Fake Store API**

---

## API

برای داده‌های پروژه از Fake Store API استفاده شده است.

[Fake Store API Documentation](https://fakestoreapi.com/docs)

این API صرفاً برای اهداف آموزشی و demonstration استفاده شده و یک backend production-ready محسوب نمی‌شود.

به همین دلیل مواردی مانند authentication، payment و order management در یک پروژه واقعی باید توسط backend اختصاصی
پیاده‌سازی شوند.

---

## Authentication و Cart

ساختار پروژه برای اضافه شدن flow مربوط به authentication و shopping cart در نظر گرفته شده است.

Flow مورد نظر:

```text
Product
   ↓
Add to Cart
   ↓
Cart
   ↓
Continue / Checkout
   ↓
Authenticated?
   ├── No → Login
   │          ↓
   │        Return to Cart
   │
   └── Yes
        ↓
   Submit Cart to API
        ↓
   Success
```

Cart در سمت client با Pinia مدیریت می‌شود و authentication نیز به‌صورت جداگانه در state management پروژه قرار می‌گیرد.

> در نسخه فعلی challenge، بخش Cart و Authentication هنوز تکمیل نشده‌اند و به‌عنوان مرحله بعدی توسعه در نظر گرفته
> شده‌اند.

---

## Server-side functionality

بخش server پروژه برای functionality هایی که بهتر است خارج از client اجرا شوند استفاده می‌شود.

به‌طور مشخص، functionality مربوط به sitemap به‌صورت server-side پیاده‌سازی شده تا اطلاعات محصولات dynamic از API دریافت
و به URL های مربوط به صفحات محصولات تبدیل شوند.

این ساختار باعث می‌شود sitemap به جای نگهداری دستی URL محصولات، بتواند بر اساس داده‌های API تولید شود.

---

## SEO و Sitemap

صفحات اصلی پروژه دارای metadata مناسب هستند و URL های dynamic محصولات نیز در sitemap در نظر گرفته شده‌اند.

برای جلوگیری از index شدن URL هایی که صرفاً نتیجه فیلتر یا sorting هستند، این نوع صفحات به‌عنوان صفحات canonical content
در نظر گرفته نشده‌اند.

### نکته مهم درباره Lighthouse

برای تست SEO باید پروژه با environment مربوط به production اجرا شود.

برای تست production:

```bash
pnpm build
NUXT_PUBLIC_APP_ENV=production node .output/server/index.mjs
```

همچنین در deployment واقعی باید `NUXT_PUBLIC_SITE_URL` روی domain اصلی پروژه تنظیم شود.

---

## Lighthouse و Performance

Performance پروژه با Lighthouse بررسی شده و تمرکز اصلی روی موارد زیر بوده است:

* کاهش حجم تصاویر
* responsive image loading
* جلوگیری از layout shift
* بهینه‌سازی rendering اولیه
* کاهش JavaScript غیرضروری
* SEO و crawlability
* accessibility

## Environment Variables

نمونه environment:

```env
NUXT_PUBLIC_APP_ENV=development
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

برای production:

```env
NUXT_PUBLIC_APP_ENV=production
NUXT_PUBLIC_SITE_URL=https://your-domain.com
```

مقادیر واقعی production نباید داخل repository قرار بگیرند.

---

## نصب و اجرای پروژه

### نصب dependencies

```bash
pnpm install
```

### اجرای development

```bash
pnpm dev
```

### ساخت production build

```bash
pnpm build
```

### اجرای production server

```bash
node .output/server/index.mjs
```

---

## تصمیم‌های اصلی معماری

### Nuxt به جای Vue SPA

Nuxt به دلیل SSR، routing، SEO و امکانات server-side انتخاب شده است تا پروژه از ابتدا قابلیت توسعه برای یک فروشگاه واقعی
را داشته باشد.

### Pinia برای state management

Stateهایی مانند cart و authentication ماهیت global دارند و بین چند صفحه و component استفاده می‌شوند؛ بنابراین مدیریت
آن‌ها با Pinia انجام می‌شود.

### Nuxt Image

تصاویر محصولات از یک API خارجی دریافت می‌شوند و به دلیل تفاوت aspect ratio محصولات، image container و image fitting باید
به‌صورت responsive مدیریت شوند.

Nuxt Image برای:

* responsive images
* image optimization
* modern formats
* lazy loading

استفاده شده است.

### Server-side SEO

SEO configuration و sitemap در سطح Nuxt مدیریت شده‌اند تا صفحات dynamic نیز قابلیت index شدن صحیح داشته باشند.

---

## محدودیت‌های پروژه

این پروژه یک coding challenge است و برخی قسمت‌ها عمداً ساده نگه داشته شده‌اند.

مهم‌ترین محدودیت‌ها:

* Fake Store API یک API آزمایشی است.
* authentication آن برای production مناسب نیست.
* payment در پروژه وجود ندارد.
* order management واقعی وجود ندارد.
* cart persistence و server-side order processing در نسخه کامل پروژه می‌توانند توسعه داده شوند.
* performance نهایی به deployment environment نیز وابسته است.

بنابراین این پروژه نباید به‌عنوان یک e-commerce production-ready کامل در نظر گرفته شود، بلکه ساختار frontend و تصمیم‌های
فنی آن هدف اصلی پروژه هستند.

---

## Commit Strategy

Commit ها باید بر اساس **یک تغییر منطقی و قابل توضیح** ایجاد شوند.

هر commit بهتر است:

* یک مسئولیت مشخص داشته باشد.
* تغییرات مرتبط را در یک واحد نگه دارد.
* عنوان کوتاه و واضحی داشته باشد.
* مستقل از commit های نامرتبط باشد.
* امکان review و rollback آسان را فراهم کند.

هدف این strategy این است که تاریخچه Git نشان‌دهنده روند واقعی توسعه و تصمیم‌های پروژه باشد، نه صرفاً مجموعه‌ای از
تغییرات پراکنده.

---

## Future Improvements

در صورت ادامه توسعه پروژه، موارد زیر می‌توانند به آن اضافه شوند:

* Authentication کامل‌تر
* Shopping Cart و persistence بهتر
* Checkout flow
* Order management
* caching سمت server
* CDN و production-level asset caching
* تست واحد و integration test
* E2E testing
* design system کامل‌تر
* monitoring و error tracking

---

## License

This project was created for a technical coding challenge.

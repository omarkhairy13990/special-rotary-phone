# MASAM platform

Bilingual (English first, Arabic second) website for MASAM: water treatment and environmental systems for companies and households.

- **Site:** Next.js 16 (App Router), routes under `/en` and `/ar`
- **Content dashboard:** Sanity Studio at `/studio` (articles, videos, products in both languages)
- **Sections:** Solutions, Products, Lab (water signature + calculators), Learn (articles and videos), Store
- **Hosting:** Vercel

Until a Sanity project is connected, the site shows the sample content in `content/sample.ts`.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the Sanity values
npm run dev                  # http://localhost:3000 → /en
```

## Project layout

| Path | What it is |
| --- | --- |
| `app/[locale]/` | Pages: home, solutions, products, lab, learn, learn/[slug], store |
| `app/studio/` | Sanity Studio (content dashboard) |
| `app/api/revalidate/` | Webhook that refreshes pages right after you publish |
| `lib/i18n.ts` | English and Arabic interface text |
| `lib/signature.ts` | Water signature generator (shared by the Lab, cards and covers) |
| `sanity/schemaTypes/` | Content types: article, video, product |
| `content/sample.ts` | Sample content used before Sanity is connected |

---

# دليل التشغيل بالعربية

## ١. الإعداد لأول مرة (مرة واحدة فقط)

1. **إنشاء مشروع Sanity:** ادخل على [sanity.io/manage](https://www.sanity.io/manage) وأنشئ مشروعاً جديداً باسم MASAM واختر dataset باسم `production`. انسخ رقم المشروع (Project ID).
2. **النشر على Vercel:** ادخل على [vercel.com/new](https://vercel.com/new) واختر مستودع `special-rotary-phone` من GitHub. في خانة Environment Variables أضف:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = رقم المشروع
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `SANITY_REVALIDATE_SECRET` = أي كلمة سر طويلة تختارها
   - `NEXT_PUBLIC_SITE_URL` = رابط موقعك، مثل `https://masam.co`
3. **السماح للوحة التحكم:** في Sanity افتح API ثم CORS origins وأضف رابط موقعك ورابط `http://localhost:3000`، مع تفعيل Allow credentials.
4. **التحديث الفوري بعد النشر:** في Sanity افتح API ثم Webhooks وأضف webhook:
   - الرابط: `https://رابط-موقعك/api/revalidate`
   - Trigger on: Create, Update, Delete
   - Secret: نفس قيمة `SANITY_REVALIDATE_SECRET`
5. **ربط الدومين:** في Vercel افتح Settings ثم Domains وأضف الدومين الذي حجزته، واتبع التعليمات لتعديل إعدادات DNS عند شركة الدومين.

## ٢. النشر الأسبوعي للمقالات والفيديوهات

افتح `https://رابط-موقعك/studio` وسجّل الدخول.

**مقال جديد:**
1. اختر Article ثم اضغط زر الإضافة.
2. اكتب العنوان بالإنجليزية والعربية. الرابط (Link) يُنشأ تلقائياً من العنوان الإنجليزي بالضغط على Generate.
3. اختر التصنيف (دليل، ملاحظة هندسية، دراسة حالة، أخبار) والجمهور (شركات، منازل، الاثنان).
4. اكتب الملخص والنص باللغتين. يمكنك إضافة صور أو فيديو يوتيوب داخل النص.
5. (اختياري) أدخل قيم تحليل المياه في Water signature لتظهر بصمة الماء كغلاف للمقال إذا لم تضع صورة.
6. اضغط **Publish**.

**فيديو جديد:**
1. ارفع الفيديو على قناة يوتيوب الخاصة بمسام.
2. في لوحة التحكم اختر Video، والصق رابط يوتيوب، واكتب العنوان والوصف باللغتين ومدة الفيديو.
3. اضغط **Publish**.

**الجدولة:** ضع تاريخ نشر مستقبلي في Publish date، وسيظهر المحتوى في الموقع تلقائياً عند حلول هذا التاريخ.

**نصائح للمحتوى الأسبوعي:**
- مقال واحد وفيديو واحد كل أسبوع يكفي لبناء جمهور. نوّع بين الشركات والمنازل.
- اكتب كل لغة بأسلوبها الطبيعي، ولا تترجم حرفياً.
- استخدم الأرقام والوحدات الحقيقية (ppm، م³/يوم، NTU) بدلاً من الوعود العامة.

## ٣. التطوير لاحقاً

الخطوات المقترحة بعد الإطلاق:
- **المتجر:** ربط Shopify للدفع الإلكتروني (حقل `shopifyHandle` موجود في المنتج).
- **جواز الماء:** حساب لكل عميل يحفظ أنظمته ومواعيد تغيير الشمعات.
- **منشئ طلبات الأسعار:** نموذج من ٤ خطوات للشركات.
- **حاسبات إضافية:** تصميم نظام RO، جرعة الكلور، محول وحدات العسر.

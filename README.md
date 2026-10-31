# 🌈 Colorful News — News App (الشكل الملوّن)

نفس مشروع الـ News App البسيط بنفس هيكل مشروع الدكتور، بشكل مختلف. أول ما تفتحه الصفحة فاضية وفوق أزرار الأقسام (Latest News, Business, Technology, Sports, Science, Health, Entertainment, Food). تدوس على قسم فتظهر أخباره من NewsAPI.

## 1) التشغيل على جهازك

1. فك الـ zip وافتح الفولدر في VS Code (`File` ثم `Open Folder`). لازم تشوف `package.json` مباشرة.
2. اعمل ملف جنب `package.json` اسمه `.env` واكتب فيه:
   ```
   VITE_NEWS_API_KEY=المفتاح_بتاعك
   ```
   (من غير مسافات ولا علامات تنصيص)
3. افتح Terminal (`Terminal` ثم `New Terminal`) واكتب:
   ```bash
   npm install
   npm run dev
   ```
4. افتح الرابط اللي يظهر (غالباً http://localhost:5173).

> لو غيّرت `.env` والتطبيق شغال، وقّفه بـ `Ctrl + C` وشغّله تاني.

## 2) النشر على Vercel (عشان يطلعلك لينك)

NewsAPI المجاني بيشتغل على `localhost` بس، فلو نشرت الموقع من غير الملف الوسيط هتظهر رسالة
"Requests from the browser are not allowed on the Developer plan". عشان كده المشروع ده فيه فولدر `api` فيه ملف `news.js`: السيرفر هو اللي بيكلّم NewsAPI، والمفتاح بيفضل عليه.

1. ارفع المشروع على GitHub (من غير `node_modules` ولا `.env`، الـ `.gitignore` بيمنعهم).
2. على vercel.com اضغط **Add New → Project** واعمل **Import** للـ repo.
3. **مهم:** ضيف المتغير ده في **Environment Variables** (اسمه من غير `VITE_`):
   ```
   NEWS_API_KEY=المفتاح_بتاعك
   ```
4. اضغط **Deploy**. لو ضفت المتغير بعد النشر، اعمل **Redeploy** لآخر نشر.
5. افتح الموقع، واعمل `Ctrl + Shift + R` مرة واحدة.

## الهيكل

```
├── api/
│   └── news.js           ← الملف الوسيط (بيشتغل على Vercel بس)
├── src/
│   ├── App.jsx           ← state + useEffect + fetch
│   ├── components/       ← Header, Navbar, NewsList, NewsCard, Footer
│   └── css/              ← ملف CSS لكل component
```

```
App
├── Header
│   └── Navbar
├── NewsList
│   └── NewsCard
└── Footer
```

## إزاي الكود بيعرف هو على جهازك ولا على Vercel؟

في `App.jsx` المتغير `IS_DEV` بيبقى `true` لما تشغّل `npm run dev`، فبنكلّم NewsAPI مباشرة بالمفتاح من `.env`. وعلى Vercel بيبقى `false`، فبنكلّم `/api/news`.

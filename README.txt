موقع العبقري - دليل التشغيل والأمان

[1] Firebase (مشروع abkary-132ab)
  - Authentication > Sign-in method: فعّل Anonymous و Email/Password.
  - Firestore Database > Create database.
  - Firestore > Rules: الصق ملف firestore.rules كاملًا واضغط Publish.
  - Authentication > Settings > Authorized domains: أضف دومين Vercel الخاص بك.

[2] Vercel (Settings > Environment Variables) ثم Redeploy
  CLOUDINARY_CLOUD_NAME , CLOUDINARY_API_KEY , CLOUDINARY_API_SECRET , OWNER_EMAIL
  (من Cloudinary > Settings > API Keys. السري لا يُرسل لأحد ولا يوضع في الكود.)
  لازم ترفع مجلد api مع الموقع.

[3] Cloudinary
  - احذف أو عطّل الـ Unsigned preset (w7mk0hd2).

[4] حساب المالك
  - افتح رابط-موقعك/#admin وسجّل: بريد + باسورد 12 حرف فأكثر (حروف وأرقام) + كود التفعيل.
  - سيُنزَّل ملف abqari-owner-key.json: احفظه في مكانين. بدونه لا تُقرأ كلمات مرور العملاء.
  - سجّل فور النشر قبل أن يسبقك أحد.

[5] حماية إضافية (من لوحة Firebase / Google، لا تُفعَّل من الكود)
  - App Check: سجّل reCAPTCHA v3، ضع الـ Site Key مكان PUT_RECAPTCHA_V3_SITE_KEY في index.html ثم Enforce.
  - Google Cloud > Credentials: قيّد الـ API key على دومينك.
  - فعّل التحقق بخطوتين (MFA) لحساب المالك من Identity Platform.

[6] اختبار
  - اطلب خدمة كعميل، ثم تأكد أن الطلب ظهر في #admin، وجرّب الشات ورفع صورة QR.

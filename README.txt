تشغيل موقع العبقري بحماية مشددة (مشروع Firebase: abkary-132ab)

1) Authentication > Sign-in method: فعّل Anonymous و Email/Password.
2) firestore.rules: غيّر CHANGE_ME_TO_A_LONG_SECRET_CODE لكود سري طويل (20+ حرف) واحتفظ به،
   ثم الصق الملف في Firestore > Rules واضغط Publish.
3) App Check (يمنع السكربتات والبوتات):
   Build > App Check > Apps > سجّل تطبيق الويب بـ reCAPTCHA v3 وانسخ الـ Site Key،
   ضعه مكان PUT_RECAPTCHA_V3_SITE_KEY في index.html، ثم Enforce لـ Firestore و Authentication.
4) Authentication > Settings > Authorized domains: أضف دومينك فقط.
5) Google Cloud > APIs & Services > Credentials: قيّد الـ API key على دومينك (HTTP referrers).
6) ارفع الموقع على Firebase Hosting (firebase deploy) ليتفعّل ملف firebase.json (HSTS, X-Frame-Options...).
7) افتح رابطك/#admin فورًا: سجّل البريد + باسورد 12 حرف+ + كود التفعيل.
   سيُنزَّل ملف abqari-owner-key.json: احفظه نسختين (فلاشة + مكان آمن). بدونه لا يمكن قراءة كلمات المرور.
   عند كل دخول استورد الملف من لوحة التحكم لإظهار الباسورد (يبقى في الذاكرة فقط).
8) فعّل التحقق بخطوتين للمالك من Google Cloud > Identity Platform (MFA).

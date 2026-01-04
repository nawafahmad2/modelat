# 🛠️ دليل التطوير المحلي

## 🎯 الهدف
تشغيل وتطوير التطبيق محلياً على جهازك قبل النشر على Vercel.

---

## 📦 المتطلبات

- Node.js (v14+) أو Python
- محرر نصوص (VS Code موصى به)
- Git
- متصفح حديث

---

## ✅ البدء السريع

### 1. استنساخ أو فتح المشروع

```bash
cd /home/nawaf-ahmad/Documents/testttt/gggg
```

### 2. تشغيل خادم محلي

#### الخيار أ: استخدام Python

```bash
# Python 3
python -m http.server 8000

# أو Python 2
python -m SimpleHTTPServer 8000
```

#### الخيار ب: استخدام Node.js

```bash
# تثبيت http-server
npm install -g http-server

# تشغيل
http-server -p 8000
```

#### الخيار ج: استخدام Vercel CLI

```bash
# تثبيت
npm install -g vercel

# تشغيل بيئة Vercel المحلية
vercel dev
```

### 3. فتح المتصفح

```
http://localhost:8000
```

---

## 🔧 اختبار API محلياً

### الطريقة 1: استخدام curl

```bash
curl -X POST http://localhost:8000/api/send \
  -H "Content-Type: application/json" \
  -d '{
    "products": [
      {
        "id": "1",
        "modelNumber": "F001",
        "image": "data:image/jpeg;base64,...",
        "colors": "أحمر، أزرق",
        "price": "50,000 دينار"
      }
    ],
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
  }'
```

### الطريقة 2: استخدام Postman

1. افتح Postman
2. اختر POST
3. أدخل URL: `http://localhost:8000/api/send`
4. اختر **Body** → **raw** → **JSON**
5. الصق البيانات أعلاه

### الطريقة 3: استخدام browser console

افتح **DevTools** في المتصفح (F12) واكتب:

```javascript
fetch('/api/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    products: [{id: '1', modelNumber: 'F001'}],
    timestamp: new Date().toISOString()
  })
})
.then(r => r.json())
.then(data => console.log(data))
```

---

## 🐛 تصحيح الأخطاء (Debugging)

### فتح DevTools

```
Windows/Linux: F12 أو Ctrl+Shift+I
Mac: Cmd+Option+I
```

### عرض Logs

في console ابحث عن:
- ✅ رسائل النجاح (خضراء)
- ❌ رسائل الخطأ (حمراء)

### اختبار Fetch API

```javascript
// في console
fetch('/api/send')
  .then(r => console.log('Status:', r.status))
  .catch(e => console.error('Error:', e))
```

---

## 📝 التعديلات الشائعة

### تغيير عنوان الصفحة

في `index.html` ابحث عن:
```html
<title>كتالوج الفساتين</title>
```

غيره إلى:
```html
<title>اسمك - كتالوج الفساتين</title>
```

### تغيير الألوان

في `index.html` ابحث عن فئات Tailwind:
- `bg-blue-600` → `bg-purple-600`
- `bg-green-600` → `bg-cyan-600`

### إضافة حقل جديد

في `ProductForm` أضف:

```javascript
FormField('حقل جديد', 'text', formData.newField, 
  (v) => setFormData({...formData, newField: v}))
```

---

## 📊 مراقبة الأداء

### استخدام Chrome DevTools

1. افتح DevTools (F12)
2. اذهب إلى **Network** tab
3. تحقق من سرعة الطلبات

### استخدام Lighthouse

1. DevTools → **Lighthouse**
2. اضغط **Generate Report**
3. شاهد توصيات الأداء

---

## 🔄 سير العمل الموصى به

```
1. عدّل الملف
   ↓
2. احفظ (Ctrl+S)
   ↓
3. حدّث المتصفح (F5)
   ↓
4. اختبر الميزة
   ↓
5. افتح DevTools للتحقق من الأخطاء
   ↓
6. اعمل git commit
```

---

## 🚀 نقل التغييرات لـ Vercel

### خطوة 1: Commit التغييرات

```bash
git add .
git commit -m "وصف التغييرات"
```

### خطوة 2: Push لـ GitHub

```bash
git push origin main
```

### خطوة 3: Vercel سيبني النسخة تلقائياً

راقب التحديثات على:
```
https://vercel.com/dashboard
```

---

## 🆘 حل المشاكل الشائعة

### ❌ المشكلة: "Cannot GET /api/send"

**السبب:** الخادم المحلي لا يدعم الدوال السحابية

**الحل:** استخدم `vercel dev` بدلاً من `http-server`

### ❌ المشكلة: صور لا تظهر

**السبب:** مشاكل CORS أو الصور محفوظة كـ Base64

**الحل:** استخدم Base64 في البيانات (كما في التطبيق)

### ❌ المشكلة: الموقع بطيء

**السبب:** صور كبيرة جداً

**الحل:** ضغط الصور قبل التحميل

---

## 💡 نصائح المطور

1. **استخدم Git Branches** للميزات الجديدة:
   ```bash
   git checkout -b feature/new-feature
   ```

2. **احفظ العمل بانتظام**:
   ```bash
   git add . && git commit -m "Progress"
   ```

3. **راجع Console أولاً** عند وجود مشكلة

4. **استخدم VS Code extensions**:
   - Live Server
   - REST Client
   - GitLens

5. **اختبر في أكثر من متصفح**:
   - Chrome
   - Firefox
   - Safari

---

## 📚 مراجع مفيدة

- [MDN Web Docs](https://developer.mozilla.org)
- [JavaScript.info](https://javascript.info)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)

---

**حظاً موفقاً مع التطوير! 🚀**

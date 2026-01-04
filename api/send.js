export default async function handler(req, res) {
  // تحديد رؤوس CORS للسماح بالطلبات من أي مصدر
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // معالجة طلبات OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // معالجة طلبات POST فقط
  if (req.method === 'POST') {
    try {
      const { products, timestamp } = req.body;

      // التحقق من البيانات المرسلة
      if (!products || !Array.isArray(products)) {
        return res.status(400).json({
          success: false,
          message: 'البيانات غير صحيحة. يجب إرسال قائمة المنتجات.',
          error: 'INVALID_DATA'
        });
      }

      // محاكاة حفظ البيانات (يمكنك ربطها بقاعدة بيانات لاحقاً)
      console.log(`[${new Date().toISOString()}] تم استقبال ${products.length} منتج`);
      console.log('البيانات:', JSON.stringify(products, null, 2));

      // إرسال رد ناجح
      return res.status(200).json({
        success: true,
        message: 'تم حفظ البيانات بنجاح!',
        data: {
          productsCount: products.length,
          timestamp: new Date().toISOString(),
          received_at: timestamp
        }
      });

    } catch (error) {
      console.error('حدث خطأ:', error);
      return res.status(500).json({
        success: false,
        message: 'حدث خطأ في معالجة الطلب',
        error: error.message
      });
    }
  }

  // رد على الطلبات الأخرى
  return res.status(405).json({
    success: false,
    message: 'الطريقة غير مدعومة. يرجى استخدام POST',
    method: req.method
  });
}

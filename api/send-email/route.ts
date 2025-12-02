// /app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// قم بتعريف أنواع بيانات النموذج (يجب أن تتطابق مع ContactForm.tsx)
interface FormData {
    fullName: string;
    email: string;
    company: string;
    phone: string;
    projectName: string;
    location: string;
    capital: string;
    description: string;
}

// 1. إعداد مرسل البريد الإلكتروني (Transporter)
// يستخدم المتغيرات البيئية المعرفة في .env.local
const transporter = nodemailer.createTransport({
    service: 'gmail', // لضمان استخدام خادم Gmail
    auth: {
        // يتم جلب المتغيرات من البيئة (سواء Vercel أو .env.local)
        user: process.env.GMAIL_USER, // sajadwa844@gmail.com
        pass: process.env.GMAIL_APP_PASSWORD, // كلمة مرور التطبيق
    },
});

export async function POST(request: Request) {
    try {
        const formData: FormData = await request.json();

        // 2. التحقق الأساسي من الحقول المطلوبة
        if (!formData.fullName || !formData.email || !formData.projectName) {
            return NextResponse.json({ 
                message: 'الرجاء ملء الاسم الكامل والبريد الإلكتروني واسم المشروع.', 
                status: 'error' 
            }, { status: 400 });
        }

        // 3. بناء محتوى البريد الإلكتروني
        const htmlContent = `
            <h2>طلب استشارة جديد</h2>
            <p><strong>الاسم الكامل:</strong> ${formData.fullName}</p>
            <p><strong>البريد الإلكتروني:</strong> ${formData.email}</p>
            <p><strong>الشركة:</strong> ${formData.company || 'غير محدد'}</p>
            <p><strong>رقم الهاتف:</strong> ${formData.phone || 'غير محدد'}</p>
            <hr>
            <h3>تفاصيل المشروع:</h3>
            <p><strong>اسم المشروع:</strong> ${formData.projectName}</p>
            <p><strong>موقع المشروع:</strong> ${formData.location || 'غير محدد'}</p>
            <p><strong>رأس المال التقديري:</strong> ${formData.capital || 'غير محدد'}</p>
            <p><strong>الوصف الإضافي:</strong></p>
            <p>${formData.description || 'لا يوجد وصف إضافي.'}</p>
        `;

        // 4. إعداد خيارات البريد
        const mailOptions = {
            from: process.env.GMAIL_USER, // sajadwa844@gmail.com
            to: process.env.COMPANY_RECEIVING_EMAIL, // info@sa-jadwa.com
            subject: `طلب استشارة جديد: ${formData.projectName} من ${formData.fullName}`,
            html: htmlContent,
            // (اختياري) إرسال نسخة إلى المرسل كإثبات
            replyTo: formData.email, 
        };

        // 5. إرسال البريد الإلكتروني
        await transporter.sendMail(mailOptions);

        // 6. الاستجابة بالنجاح
        return NextResponse.json({ 
            message: 'تم إرسال رسالتك بنجاح!', 
            status: 'success' 
        }, { status: 200 });

    } catch (error) {
        console.error('Email sending error:', error);
        
        // 7. الاستجابة بالخطأ
        return NextResponse.json({ 
            message: 'فشل في إرسال البريد الإلكتروني.', 
            status: 'error' 
        }, { status: 500 });
    }
}
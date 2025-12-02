// /app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
    // 📢 هذه الخيارات هي الأهم لتحديد سبب الفشل
    logger: true, // لتسجيل رسائل حالة الاتصال
    debug: true // لتسجيل تفاصيل بروتوكول الاتصال
});

export async function POST(request: Request) {
    // ⚠️ التحقق من المتغيرات البيئية
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.COMPANY_RECEIVING_EMAIL) {
        console.error("Missing email configuration environment variables.");
        return NextResponse.json({ 
            message: 'خطأ في إعدادات الخادم لإرسال البريد الإلكتروني. (راجع GMAIL_USER/PASSWORD)', 
            status: 'error' 
        }, { status: 500 });
    }
    
    try {
        const formData: FormData = await request.json();

        // 2. التحقق الأساسي من الحقول المطلوبة (يمكنك تخصيص هذا)
        if (!formData.fullName || !formData.email || !formData.projectName) {
            return NextResponse.json({ 
                message: 'الرجاء ملء الاسم الكامل والبريد الإلكتروني واسم المشروع.', 
                status: 'error' 
            }, { status: 400 });
        }

        // 3. بناء محتوى البريد الإلكتروني
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
                <h2 style="color: #0056b3;">طلب استشارة جديد</h2>
                <p><strong>الاسم الكامل:</strong> ${formData.fullName}</p>
                <p><strong>البريد الإلكتروني:</strong> ${formData.email}</p>
                <p><strong>الشركة:</strong> ${formData.company || 'غير محدد'}</p>
                <p><strong>رقم الهاتف:</strong> ${formData.phone || 'غير محدد'}</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;">
                <h3 style="color: #333;">تفاصيل المشروع:</h3>
                <p><strong>اسم المشروع:</strong> ${formData.projectName}</p>
                <p><strong>موقع المشروع:</strong> ${formData.location || 'غير محدد'}</p>
                <p><strong>رأس المال التقديري:</strong> ${formData.capital || 'غير محدد'}</p>
                <p><strong>الوصف الإضافي:</strong></p>
                <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 10px; border-radius: 5px;">${formData.description || 'لا يوجد وصف إضافي.'}</p>
            </div>
        `;

        // 4. إعداد خيارات البريد
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.COMPANY_RECEIVING_EMAIL,
            subject: `طلب استشارة جديد: ${formData.projectName} من ${formData.fullName}`,
            html: htmlContent,
            replyTo: formData.email, 
        };

        // 5. إرسال البريد الإلكتروني
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully. Response:", info.response); // طباعة الرد الناجح

        // 6. الاستجابة بالنجاح
        return NextResponse.json({ 
            message: 'تم إرسال رسالتك بنجاح!', 
            status: 'success' 
        }, { status: 200 });

    } catch (error) {
        // طباعة الخطأ التفصيلي الذي نحتاجه
        console.error('Email sending error details:', error);
        
        // 7. الاستجابة بالخطأ
        return NextResponse.json({ 
            message: 'فشل في إرسال البريد الإلكتروني. راجع سجلات Vercel للأسباب.', 
            status: 'error' 
        }, { status: 500 });
    }
}
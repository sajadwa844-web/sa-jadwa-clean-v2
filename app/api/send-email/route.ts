// /app/api/send-email/route.ts
import { NextResponse } from 'next/server'; 
import nodemailer from 'nodemailer'; 

// واجهة تعريف البيانات (Interface)
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

export async function POST(request: Request) {
    // ⚠️ التحقق من المتغيرات البيئية (للتأكد من أن الإعدادات جاهزة)
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.COMPANY_RECEIVING_EMAIL) {
        console.error("Missing email configuration environment variables.");
        return NextResponse.json({ 
            message: 'خطأ في إعدادات الخادم لإرسال البريد الإلكتروني. (راجع GMAIL_USER/PASSWORD)', 
            status: 'error' 
        }, { status: 500 });
    }
    
    // 1. تعريف Transporter داخل دالة POST (لتحسين أداء الخوادم اللامركزية واستخدام المنفذ الآمن 465)
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465, 
        secure: true, 
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
        logger: true,
        debug: true
    });
    
    try {
        const formData: FormData = await request.json();

        // 2. التحقق من الحقول الأساسية المطلوبة: الاسم، الهاتف، اسم المشروع 
        if (!formData.fullName || !formData.phone || !formData.projectName) { 
            return NextResponse.json({ 
                message: 'الرجاء ملء الاسم الكامل ورقم الهاتف واسم المشروع أولاً.', 
                status: 'error' 
            }, { status: 400 });
        }

        // 3. بناء محتوى البريد الإلكتروني
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
                <h2 style="color: #0056b3;">طلب استشارة جديد</h2>
                <p><strong>الاسم الكامل:</strong> ${formData.fullName}</p>
                <p><strong>البريد الإلكتروني:</strong> ${formData.email || 'غير محدد'}</p>
                <p><strong>الشركة:</strong> ${formData.company || 'غير محدد'}</p>
                <p><strong>رقم الهاتف:</strong> ${formData.phone}</p>
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
            from: `"SA Jadwa Contact" <${process.env.GMAIL_USER}>`, 
            to: process.env.COMPANY_RECEIVING_EMAIL,
            subject: `طلب استشارة جديد: ${formData.projectName} من ${formData.fullName}`, 
            html: htmlContent,
            replyTo: formData.email, 
        };

        // 5. إرسال البريد الإلكتروني
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully. Response:", info.response);

        // 6. الاستجابة بالنجاح
        return NextResponse.json({ 
            message: 'تم إرسال رسالتك بنجاح!', 
            status: 'success' 
        }, { status: 200 });

    } catch (error) {
        // 7. طباعة الخطأ التفصيلي (للتشخيص)
        console.error('Email sending error details:', error);
        
        return NextResponse.json({ 
            message: 'فشل في إرسال البريد الإلكتروني. راجع سجلات Vercel للأسباب.', 
            status: 'error' 
        }, { status: 500 });
    }
}
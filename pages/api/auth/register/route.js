import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        // 1. รับข้อมูลทั้งหมดจาก request body
        const { username, email, phone, password, role } = await request.json();

        // 2. ตรวจสอบข้อมูลเบื้องต้น
        if (!username || !email || !phone || !password || !role) {
            return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
        }
        if (password.length < 6) {
            return NextResponse.json({ message: 'Password must be at least 6 characters long.' }, { status: 400 });
        }

        // 3. ตรวจสอบว่า Role ที่ส่งมานั้นถูกต้องและได้รับอนุญาต
        const allowedRoles = ['customer', 'shop', 'admin'];
        if (!allowedRoles.includes(role)) {
            return NextResponse.json({ message: 'A valid role is required.' }, { status: 400 });
        }
        
        // --- (ส่วนจำลอง) ตรวจสอบว่ามี email นี้ในระบบแล้วหรือยัง ---
        // ในอนาคตเมื่อคุณเชื่อมต่อฐานข้อมูล คุณจะเขียนโค้ดเพื่อค้นหาผู้ใช้จริงที่นี่
        // const existingUser = await db.users.findUnique({ where: { email } });
        // if (existingUser) {
        //     return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 }); // 409 Conflict
        // }
        // -----------------------------------------------------------

        // 4. เข้ารหัสรหัสผ่านด้วย bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. สร้าง object ของผู้ใช้ใหม่ (เพื่อเตรียมบันทึกลงฐานข้อมูล)
        const newUser = {
            id: Date.now().toString(), // สร้าง ID จำลองชั่วคราว
            username: username,
            email: email,
            phone: phone,
            role: role, // บันทึก role ที่ผู้ใช้เลือก
            password: hashedPassword, // **สำคัญ:** บันทึกรหัสผ่านที่ถูกเข้ารหัสแล้ว
        };
        
        // แสดงผลใน console ของ server เพื่อให้เราเห็นว่ามีผู้ใช้ใหม่สมัครเข้ามา
        console.log('New user registered (mock):', newUser);
        // ในอนาคต บรรทัดนี้จะถูกแทนที่ด้วยโค้ดบันทึกลงฐานข้อมูลจริง
        // await db.users.create({ data: newUser });

        // 6. ส่ง Response กลับไปบอก Frontend ว่าการสมัครสมาชิกสำเร็จ
        return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 }); // 201 Created

    } catch (error) {
        // จัดการกับ Error ที่ไม่คาดคิด
        console.error('Registration API error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}
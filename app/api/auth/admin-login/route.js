import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import bcrypt from 'bcrypt';
import pool from '../../../../lib/db';

export async function POST(request) {
    let connection;
    try {
        const { username, password } = await request.json();

        connection = await pool.getConnection();

        const [users] = await connection.execute(
            'SELECT * FROM users WHERE username = ?', [username]
        );

        if (users.length !== 1) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const user = users[0];

        // 🎯 ตรวจสอบ role ให้เป็น 'admin'
        if (user.role !== 'admin') {
            return NextResponse.json({ message: 'Access denied for this role' }, { status: 403 });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
        
        // (ส่วนสร้าง Token และ Cookie เหมือนเดิม)
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const serializedCookie = serialize('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60 * 60,
            path: '/',
        });

        const response = NextResponse.json({ message: 'Login successful' });
        response.headers.set('Set-Cookie', serializedCookie);
        
        return response;

    } catch (error) {
        console.error('Admin Login API error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
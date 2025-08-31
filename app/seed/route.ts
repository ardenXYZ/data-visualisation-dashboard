import bcrypt from 'bcrypt';
import prisma from "@/app/lib/prisma";

export async function GET() {
    try {
        const password = 'psw123';
        const hashedPassword = await bcrypt.hash(password, 12);

        const testUser = await prisma.user.upsert({
            where: { username: 'user1' },
            update: {},
            create: {
                username: 'user1',
                password: hashedPassword,
            },
        });

        return Response.json({ message: 'Test user seeded successfully' });
    } catch (error: unknown) {
        return Response.json({ error }, { status: 500 });
    }
}
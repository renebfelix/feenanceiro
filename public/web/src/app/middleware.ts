import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const token = request.cookies.get('token_fee')?.value;

	if (!token) {
		return NextResponse.redirect(new URL('/login', request.url));
	} else {
		const decoded = jwtDecode(token);
		const currentDate = new Date();

		if (decoded.exp && decoded.exp * 1000 < currentDate.getTime()) {

			// TODO: REFRESH TOKEN

			return NextResponse.redirect(new URL('/login', request.url));
		} else {
			return NextResponse.next();
		}
	}
}

export const config = {
	matcher: '/(app)/:path*',
}

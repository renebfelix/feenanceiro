import { sign } from 'jsonwebtoken';

function generateToken(uuid: string){
	const token = sign(
		{uuid},
		`${process.env.APP_JWT_PRIVATE}`,
		{expiresIn: '120m'}
	);

	return token;
}

export { generateToken };

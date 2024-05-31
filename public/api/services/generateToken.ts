import { sign } from 'jsonwebtoken';

function generateToken(uuid: string){
	const token = sign(
		{uuid},
		`${process.env.APP_JWT_PRIVATE}`,
		{expiresIn: '10m'}
	);

	return token;
}

export { generateToken };

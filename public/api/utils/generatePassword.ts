import { createHash } from 'crypto';

export function createPassword(password: string){
	const hash = createHash('sha256');
	hash.update(password);
	return hash.digest('hex');
}

import { nanoid } from 'nanoid';

export function randomString(length: number): string{
	return nanoid(length);
}
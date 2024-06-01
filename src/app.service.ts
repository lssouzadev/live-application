import { Injectable } from '@nestjs/common'

import { AppGateway } from './app.gateway'

@Injectable()
export class AppService {
	constructor(private readonly gateway: AppGateway) {}
	async getPosts(): Promise<any[]> {
		const posts = await this.gateway.emit('worker', 'getPosts', { limit: 1 })
		return posts as unknown as any[]
	}
}

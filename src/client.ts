import { NestFactory } from '@nestjs/core'

import { IoClientAdapter } from './adapters/socket-io-client.adapter'
import { ClientModule } from './client.module'

async function bootstrap() {
	const app = await NestFactory.create(ClientModule)
	app.useWebSocketAdapter(new IoClientAdapter(app))
	await app.init()
}
bootstrap()

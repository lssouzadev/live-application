import { NestFactory } from '@nestjs/core'

import { IoClientAdapter } from './adapters/socket-io-client.adapter'
import { WorkerModule } from './worker.module'

async function bootstrap() {
	const app = await NestFactory.create(WorkerModule)
	app.useWebSocketAdapter(new IoClientAdapter(app))
	await app.listen(2222)
}
bootstrap()

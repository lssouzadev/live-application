import { Module } from '@nestjs/common'

import { ClientService } from './client.service'

@Module({
	imports: [],
	providers: [ClientService],
})
export class ClientModule {}

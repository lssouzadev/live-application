import { Controller, Get, Req, Res } from '@nestjs/common'

import { AppService } from './app.service'

@Controller('')
export class AppController {
	constructor(private readonly appService: AppService) {
		//
	}

	@Get()
	async getPosts(@Req() req: any, @Res() res: any) {
		const posts = await this.appService.getPosts()
		return res.send({
			posts,
		})
	}
}

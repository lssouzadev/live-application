import axios from 'axios'
import { Server } from 'socket.io'

import { Injectable, OnModuleInit } from '@nestjs/common'
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
@Injectable()
@WebSocketGateway(6666, {
	reconnection: true,
	reconnectAttempts: 1000,
	reconnectDelay: 1000,
	reconnectInterval: 10000,
	transports: ['websocket'],
	auth: {
		type: 'worker',
	},
})
export class WorkerService implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server
	constructor() {}

	onModuleInit() {
		this.server.emit('msgToClient', 'Hello from WorkerService')
	}

	@SubscribeMessage('getPosts')
	async handleMessageToServer(@MessageBody() payload): Promise<void> {
		const { limit } = payload

		const response = await axios.get(`https://api.linkzap.ai/blog/posts`)
		const posts = response.data.posts.slice(0, limit)
		this.server.emit('transmit', {
			event: 'setPosts',
			payload: {
				posts,
			},
		})
	}

	handleConnection() {
		console.log('Connected to server!')
	}

	handleDisconnect() {
		console.log('Disconnected from server!')
	}
}

import { JsonController, Get, Post, HttpCode, Body, Put, Param, NotFoundError } from 'routing-controllers'
import Game from './entity'

@JsonController()
export default class GameController {

    @Get('/games')
    async getGames() {
        const games = await Game.find()                   
        return {games}
    }

    @Post('/games')
    @HttpCode (201)
    createGame(
        @Body() game: Game
    ) {
        return game.save()
    }

    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Cannot find game')

        return Game.merge(game, update).save()
    }
}


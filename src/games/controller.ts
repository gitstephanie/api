import { JsonController, Get, Post, HttpCode, Body, Put, Param, BodyParam, NotFoundError } from 'routing-controllers'
import Game from './entity'
import {randomColor, defaultBoard} from './logic'

@JsonController()
export default class GameController {

    @Get('/games')
    async getGames() {
        const games = await Game.find()  
        if (!games) throw new NotFoundError (`Games not found`)                 
        return {games}
    }

    @Post('/games')
    @HttpCode (201)
    createGame(
        @BodyParam('name', {required: true}) name: string
    ) {
        const game = new Game
        game.name = name
        game.color = randomColor()
        game.board = defaultBoard
        return game.save()
    }
    
    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body({validate: true}) update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Cannot find game')

        return Game.merge(game, update).save()
    }

    //@Patch('/games/:id')
    //return Game.patch
}


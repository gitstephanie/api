import { JsonController, Get, Post, HttpCode, Body, Put, BodyParam, Param, NotFoundError, BadRequestError } from 'routing-controllers'
import Game from './entity'
import {randomColor, defaultBoard, colors, moves} from './logic'

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
        @BodyParam('name', {required: true}) game: Game
    ) {
        game.name = name
        game.color = randomColor()
        game.board = defaultBoard
        return game.save()
    }
    
    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body({required: true}) update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Cannot find game')

        if(moves(game.board, update.board) > 1) throw new BadRequestError (`Only one move allowed`)

        if(update.color && !colors.includes[update.color]) throw new BadRequestError (`Color not allowed`)

        return Game.merge(game, update).save()
    }
}

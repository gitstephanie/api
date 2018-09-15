import { JsonController, Get, Param } from 'routing-controllers'
import Game from './entity'

@JsonController()
export default class GameController {

    @Get('/games/:id')
    getGame(
        @Param('id') id: number
    ){
        return Game.findOne[id]
    }
}
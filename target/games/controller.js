"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const logic_1 = require("./logic");
let GameController = class GameController {
    async getGames() {
        const games = await entity_1.default.find();
        if (!games)
            throw new routing_controllers_1.NotFoundError(`Games not found`);
        return { games };
    }
    createGame(game) {
        game.name = name;
        game.color = logic_1.randomColor();
        game.board = logic_1.defaultBoard;
        return game.save();
    }
    async updateGame(id, update) {
        const game = await entity_1.default.findOne(id);
        if (!game)
            throw new routing_controllers_1.NotFoundError('Cannot find game');
        if (logic_1.moves(game.board, update.board) > 1)
            throw new routing_controllers_1.BadRequestError(`Only one move allowed`);
        if (update.color && !logic_1.colors.includes[update.color])
            throw new routing_controllers_1.BadRequestError(`Color not allowed`);
        return entity_1.default.merge(game, update).save();
    }
};
__decorate([
    routing_controllers_1.Get('/games'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getGames", null);
__decorate([
    routing_controllers_1.Post('/games'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.BodyParam('name', { required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "createGame", null);
__decorate([
    routing_controllers_1.Put('/games/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateGame", null);
GameController = __decorate([
    routing_controllers_1.JsonController()
], GameController);
exports.default = GameController;
//# sourceMappingURL=controller.js.map
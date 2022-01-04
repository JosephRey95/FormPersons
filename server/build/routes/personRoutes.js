"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personControllers_1 = __importDefault(require("../controllers/personControllers"));
class PersonRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //* Search all 
        this.router.get('/', personControllers_1.default.list);
        //* Search for id
        this.router.get('/:id', personControllers_1.default.getOne);
        //* Insert
        this.router.post('/', personControllers_1.default.create);
        //* Actualizar
        this.router.put('/:id', personControllers_1.default.update);
        //* Delete
        this.router.delete('/:id', personControllers_1.default.delete);
        //** INFO DATA API*/
        this.router.post('/apiJson', personControllers_1.default.apiJson);
    }
}
const personRoutes = new PersonRoutes();
exports.default = personRoutes.router;

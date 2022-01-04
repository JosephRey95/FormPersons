"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class PersonController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = yield database_1.default.query('SELECT * FROM PERSON');
            res.json({ data: person });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const person = yield database_1.default.query("SELECT * FROM PERSON WHERE I_CODE = ?", [id]);
            if (person.length > 0) {
                return res.json({ data: person[0] });
            }
            res.status(404).json({ text: "The person doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO PERSON SET ?", [req.body]);
            res.json({ message: 'Person Saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("UPDATE PERSON SET ? WHERE I_CODE = ?", [req.body, id]);
            res.json({ message: 'Person Updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM PERSON WHERE I_CODE = ?", [id]);
            res.json({ message: 'Person Deleted' });
        });
    }
    apiJson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = [];
            for (let index = 0; index < req.body.length; index++) {
                result.push({ C_NAME: req.body[index].userId, C_EMAIL: req.body[index].id, C_CITY: 'N/A', C_COMPANY: req.body[index].title, c_DESCRIPTION: req.body[index].body });
            }
            res.contentType('application/json');
            res.send(JSON.stringify(result));
            for (let index = 0; index < result.length; index++) {
                yield database_1.default.query("INSERT INTO PERSON SET ?", [result[index]]);
            }
            res.json({ message: 'Persons Saved' });
        });
    }
}
const personController = new PersonController();
exports.default = personController;

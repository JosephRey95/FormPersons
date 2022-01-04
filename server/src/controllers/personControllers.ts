import {Request, Response} from 'express';
import pool from '../database';

class PersonController{

    public async list (req:Request, res:Response) {
         const person = await pool.query('SELECT * FROM PERSON');
        res.json({data: person});
    } 

    public async getOne(req:Request, res:Response):Promise<any> {
        const {id} = req.params;
        const person= await pool.query("SELECT * FROM PERSON WHERE I_CODE = ?", [id]);
        if(person.length>0){
            return res.json({data: person[0]});
        }
        res.status(404).json({text: "The person doesn't exists"});
        
    } 

    public async create (req:Request, res:Response): Promise<void>{
        await pool.query("INSERT INTO PERSON SET ?", [req.body]);
        res.json({message: 'Person Saved'});
    }

    public async update(req:Request, res:Response):Promise<void>{
        const {id} = req.params;
        await pool.query("UPDATE PERSON SET ? WHERE I_CODE = ?", [req.body, id]);
        res.json({message: 'Person Updated'});
    }

    public async delete (req:Request, res:Response):Promise<void>{
        const {id} = req.params;
        await pool.query("DELETE FROM PERSON WHERE I_CODE = ?", [id]);
        res.json({message: 'Person Deleted'});
    }

    public async apiJson(req:Request, res:Response):Promise<void>{
        
        
        var result = [];
        for (let index = 0; index < req.body.length; index++) {
            result.push({C_NAME: req.body[index].userId, C_EMAIL: req.body[index].id, C_CITY: 'N/A', C_COMPANY: req.body[index].title, c_DESCRIPTION: req.body[index].body});   
        }
        res.contentType('application/json');
        res.send(JSON.stringify(result));
        
        for (let index = 0; index < result.length; index++) {
            await pool.query("INSERT INTO PERSON SET ?", [result[index]]);
        }

        res.json({message: 'Persons Saved'});
    }
}

const personController = new PersonController();
export default personController;
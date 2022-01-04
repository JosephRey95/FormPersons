import {Router} from 'express';
import personController from '../controllers/personControllers';

class PersonRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{

        //* Search all 
        this.router.get('/',personController.list);
        //* Search for id
        this.router.get('/:id',personController.getOne);
        //* Insert
        this.router.post('/', personController.create);
        //* Actualizar
        this.router.put('/:id', personController.update);
        //* Delete
        this.router.delete('/:id', personController.delete);
        //** INFO DATA API*/
        this.router.post('/apiJson', personController.apiJson);    
    }
}

const personRoutes = new PersonRoutes();
export default personRoutes.router;
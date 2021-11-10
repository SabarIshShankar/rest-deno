import {Response } from 'https://deno.land/x/oak/mod.ts';
import {getTodosFromJson, writeDataToJson} from '../../db/db.ts';
import ToDos from '../../models/todos.ts';

const deleteTodo = async({params, response}:{params: any, response: Response}): Promise<void> => {
	try{
		const id = params.id;
		let allTodos = await getTodosFromJson();
		const index = allTodos.findIndex((todo: ToDos) => todo.id === id)

		if(index < 0){
			response.status = 404;
			response.body = {msg: `No todo found on this ${id} id`}
			return;
		}
		allTodos = allTodos.filter((todo: ToDos) => todo.id !== id)

		await writeDataToJson(allTodos)
		response.status = 200;
		
		response.body = {msg: "Todo has been deleted"}
	}catch(err){
		console.error(err.message);
	}
}

export default deleteTodo;
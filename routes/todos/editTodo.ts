import {Response, Request} from "https://deno.land/x/oak/mod.ts";
import {getTodosFromJson, writeDataToJson} from '../../db/db.ts';
import ToDos from '../../models/todos.ts';

const editTodo = async({params, request, response}: {params: any, request: Request, response: Response}): Promise<void> => {
	try{
		const id = params.id;
		if(!request.hasBody){
			response.status = 400;
			response.body = {msg: "Invalid data, please add title and description"};
			return;
		}

		const {
			value: {title, description}
		} = await request.body();

		if(!title || !description){
			response.status = 422;
			response.body = {msg: "Title and Description required"};
			return;
		}

		let allTodos: ToDos[] = await getTodosFromJson();
		const todo: ToDos | undefined = allTodos.find((todo: ToDos) => todo.id === id)

		
	}
}
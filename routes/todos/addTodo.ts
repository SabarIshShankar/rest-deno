import {Request, Response} from 'https://deno.land/x/oak/mod.ts';
import {v4 as uuid} from 'https://deno.land/std/uuid/mod.ts';
import ToDos from '../../models/todos.ts';
import {writeDataToJson, getTodosFromJson} from '../../db/db.ts';

const addTodo = async ({request, response}: {request: Request, response: Response}) => {
	if(!request.hasBody){
		response.status = 400;
		response.body = {msg: "Invalid data, Please Add title and description"};
		return;
	}

	const {value: {
		title, description
	}} = await request.body();

	if(!title || !description){
		response.status = 422;
		response.body = {msg: "Title and description required"};
		return;
	}

	const newTodo: ToDos = {id: uuid.generate(), title, description}

	let allTodos: ToDos[] = await getTodosFromJson()

	allTodos = [newTodo, ...allTodos]

	await writeDataToJson(allTodos)

	response.body = {msg: "New todo created", newTodo};
};

export default addTodo
import {DB_PATH} from '../config/config.ts';
import ToDos from '../models/todos.ts';

export const getTodosFromJson: () => Promise<ToDos[]> = async() => {
	try{
		const data: any = await Deno.readFile(DB_PATH);
		const decode = new TextDecoder()
		const decodedData = decode.decode(data)
		return JSON.parse(decodedData)
	} catch(err){
		console.error(err.message);
	}
}

export const writeDataToJson: (todos: ToDos[]) => Promise<void> = async (todos: ToDos[]): Promise<void> => {
	const encode = new TextEncoder();
	await Deno.writeFile(DB_PATH, encoe.encode(JSON.stringify(todos)))
} catch (err){
	console.err(err.message);
}
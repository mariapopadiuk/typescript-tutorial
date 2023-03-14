import React, {useState} from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';
import InputFeild from './components/InputFeild';
import TodoList from './components/TodoList';
import { Todo } from './model';


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo){
      setTodos([...todos, {id: Date.now(), todo, isDone: false}])
      setTodo('');
    }
  };
  const onDragEnd = (result: DropResult) => {
const {source, destination} = result;

if(!destination) return;
if(
  destination.droppableId === source.droppableId &&
  destination.index === source.index
)
return;
let add, 
active = todos,
complete = completedTodos;

if ( source.droppableId === 'TodoList') {
  add = active[source.index];
  active.splice(source.index, 1);
} else {
  add = complete[source.index];
  complete.splice(source.index, 1);
}

    if (destination.droppableId === 'TodoList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
          <span className='heading'>Taskyfy</span>
          <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          <TodoList
            todos={todos}
            setTodos={setTodos}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
          />
      </div>
    </DragDropContext>
    
  );
}

export default App;



// let name: string;
// let age: number;
// let isStudent: boolean;
// let hobbies: string[];
// let numbers: [number, string];
// let printName: (name: string) => void;
// numbers = [1, 'penny'];
// type Person = {
//   name: string;
//   age?: number;
// }
// let person: Person;
// person = {
//   name: "maria"
// }
// function PrintName(name: string){
//   console.log(name);
// }
// PrintName('M');
import { Todo } from "@/model/todo";
import { KeyboardEventHandler, useState } from "react";

export interface TodoItemProps {
  todo: Todo;
}

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export function TodoItem({ todo }: TodoItemProps) {
  const [editing, setEditing] = useState(false);

  const handleEditInput: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.keyCode === ESCAPE_KEY) {
      setEditing(false);
    } else if (event.keyCode === ENTER_KEY) {
      setEditing(false);
    }
  };

  // useTask$(({ track }) => {
  //   const el = track(() => editField.value);
  //   if (el) {
  //     el.focus();
  //     el.selectionStart = el.value.length;
  //   }
  // });

  return (
    <li
      className={`${todo.completed ? "completed" : ""} ${
        editing ? "editing" : ""
      }`}
      onDoubleClick={() => setEditing(true)}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo?.completed}
          onClick={async () => console.log("await toggleAction.submit(todo)")}
        />
        <label>{todo.title}</label>
        <form action="deleteAction">
          <input type="hidden" name="id" value={todo.id} />
          <button type="submit" className="destroy"></button>
        </form>
      </div>
      {editing && (
        <form action="editAction">
          <input type="hidden" name="id" value={todo.id} />
          <input
            className="edit"
            name="title"
            value={todo.title}
            onKeyUp={handleEditInput}
            onBlur={() => setEditing(false)}
          />
        </form>
      )}
    </li>
  );
}

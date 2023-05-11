import { TodoItem } from "@/components/TodoItem";
import { mockTodoService as todoService } from "@/model/todo-service-mock";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filter: "all" | "active" | "completed" =
    (searchParams?.f as any) || "all";
  const todos = await todoService.loadTodos(filter);
  const itemsLeft = 0;

  async function addTodo(formData: FormData) {
    "use server";
    await todoService.addTodo(formData.get("title") as string);
    revalidatePath("/");
  }

  async function toggleAll() {
    "use server";
    await todoService.toggleAllTodos();
    revalidatePath("/");
  }

  async function clearCompletedTodos() {
    "use server";
    await todoService.clearCompletedTodos();
    revalidatePath("/");
  }

  return (
    <>
      <main>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <form action={addTodo}>
              <input
                className="new-todo"
                name="title"
                placeholder="What needs to be done?"
                autoFocus
              />
            </form>
          </header>
          <section className="main">
            <form action={toggleAll}>
              <button
                type="submit"
                id="toggle-all"
                className="toggle-all"
              ></button>
              <label htmlFor="toggle-all">Mark all as complete</label>
            </form>
            <ul className="todo-list" id="todo-list">
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo}></TodoItem>
              ))}
            </ul>
          </section>
        </section>
        {todos && (
          <footer className="footer">
            <span className="todo-count">
              <strong>{itemsLeft}</strong>{" "}
              {" item" + (itemsLeft > 1 || itemsLeft === 0 ? "s " : " ")}
              left
            </span>
            <ul className="filters">
              <li>
                <Link className={filter === "all" ? "selected" : ""} href="/">
                  All
                </Link>
              </li>
              <li>
                <Link
                  className={filter === "active" ? "selected" : ""}
                  href="/?f=active"
                >
                  Active
                </Link>
              </li>
              <li>
                <Link
                  className={filter === "completed" ? "selected" : ""}
                  href="/?f=completed"
                >
                  Completed
                </Link>
              </li>
            </ul>
            {todos.some((t) => t.completed) && (
              <form action={clearCompletedTodos}>
                <button className="clear-completed" type="submit">
                  Clear completed
                </button>
              </form>
            )}
          </footer>
        )}
      </main>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Template by <a href="http://sindresorhus.com">Sindre Sorhus</a>
        </p>
        <p>
          Created by <a href="https://derkoe.dev">derkoe</a>
        </p>
      </footer>
    </>
  );
}

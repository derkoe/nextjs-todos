"use client";

import { TodoItem } from "@/components/TodoItem";
import { Todo } from "@/model/todo";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const todos: Todo[] = [];
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const itemsLeft = 0;
  return (
    <>
      <main>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <form action="addTodoAction">
              <input
                className="new-todo"
                name="title"
                placeholder="What needs to be done?"
                autoFocus
              />
            </form>
          </header>
          <section className="main">
            <form action="toggleAll">
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
              <form action="clearCompletedTodos">
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

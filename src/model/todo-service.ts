declare interface EnvGetter {
  get(key: string): string | undefined;
}

export async function getTodoService(env: NodeJS.ProcessEnv) {
  const todoDatabase: D1Database | undefined = env.TODO_DB as any;
  if (todoDatabase && typeof todoDatabase.prepare === "function") {
    return (await import("./todo-service-d1")).createTodoService(todoDatabase);
  } else if (env.STORAGE_ACCOUNT_NAME && env.STORAGE_ACCOUNT_KEY) {
    const storageAccountName = env.STORAGE_ACCOUNT_NAME!;
    const storageAccountKey = env.STORAGE_ACCOUNT_KEY!;
    return (await import("./todo-service-azure")).createTodoService(
      storageAccountName,
      storageAccountKey
    );
  } else {
    return (await import("./todo-service-mock")).mockTodoService;
  }
}

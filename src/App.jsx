import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem('todos');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos((prev) => [
      { id: crypto.randomUUID(), text, completed: false, createdAt: Date.now() },
      ...prev,
    ]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodo = (id, text) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const filtered = useMemo(() => {
    const base = query
      ? todos.filter((t) => t.text.toLowerCase().includes(query.toLowerCase()))
      : todos;
    if (filter === 'active') return base.filter((t) => !t.completed);
    if (filter === 'completed') return base.filter((t) => t.completed);
    return base;
  }, [todos, filter, query]);

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-950 dark:to-indigo-950">
      <div className="max-w-2xl mx-auto px-4">
        <Header />

        <main className="w-full bg-white/70 dark:bg-gray-950/60 backdrop-blur border border-gray-200 dark:border-gray-900 rounded-2xl shadow-xl p-5 sm:p-6 mb-6">
          <TodoForm onAdd={addTodo} onSearch={setQuery} />

          <div className="mt-4">
            <TodoList items={filtered} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
            <TodoFooter
              total={total}
              active={active}
              completed={completed}
              filter={filter}
              setFilter={setFilter}
              clearCompleted={clearCompleted}
            />
          </div>
        </main>

        <p className="text-center text-xs text-gray-500 pb-8">
          Tip: Your tasks are saved in your browser. Connect a backend later for multi-device sync.
        </p>
      </div>
    </div>
  );
}

export default App;

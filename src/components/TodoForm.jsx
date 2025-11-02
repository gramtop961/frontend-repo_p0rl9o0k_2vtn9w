import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

function TodoForm({ onAdd, onSearch, initialText = '', isEditing = false, onCancelEdit }) {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    if (isEditing) return; // prevent add during edit state
    onAdd(trimmed);
    setText('');
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 bg-white/90 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 shadow-sm">
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Add a new task or type to search..."
            className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
          />
          {!isEditing && (
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 transition-colors"
              aria-label="Add task"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          )}
          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TodoForm;

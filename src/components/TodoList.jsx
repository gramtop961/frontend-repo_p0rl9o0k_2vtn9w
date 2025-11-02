import React, { useState } from 'react';
import { CheckCircle, Circle, Trash2, Edit, X, Save } from 'lucide-react';

function TodoList({ items, onToggle, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState('');

  const startEdit = (item) => {
    setEditingId(item.id);
    setDraft(item.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft('');
  };

  const commitEdit = (id) => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onEdit(id, trimmed);
    cancelEdit();
  };

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-12">
        No tasks match your filters. Add something new!
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="group flex items-center gap-3 bg-white/90 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 shadow-sm"
        >
          <button
            onClick={() => onToggle(item.id)}
            className="text-gray-400 hover:text-indigo-600 transition-colors"
            aria-label={item.completed ? 'Mark as active' : 'Mark as completed'}
          >
            {item.completed ? (
              <CheckCircle className="w-5 h-5 text-indigo-600" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>

          {editingId === item.id ? (
            <div className="flex-1 flex items-center gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="flex-1 bg-transparent outline-none border-b border-gray-300 dark:border-gray-700 pb-1 text-gray-900 dark:text-gray-100"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') commitEdit(item.id);
                  if (e.key === 'Escape') cancelEdit();
                }}
              />
              <button
                onClick={() => commitEdit(item.id)}
                className="p-2 rounded-lg text-white bg-emerald-600 hover:bg-emerald-500"
                aria-label="Save"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={cancelEdit}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
                aria-label="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-between gap-2">
              <p
                className={`truncate ${
                  item.completed
                    ? 'line-through text-gray-400 dark:text-gray-500'
                    : 'text-gray-900 dark:text-gray-100'
                }`}
                title={item.text}
              >
                {item.text}
              </p>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-rose-600"
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;

import React from 'react';

function TodoFooter({ total, active, completed, filter, setFilter, clearCompleted }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600 dark:text-gray-300">
      <div>
        <span className="font-medium text-gray-900 dark:text-white">{total}</span> total •{' '}
        <span className="font-medium">{active}</span> active •{' '}
        <span className="font-medium">{completed}</span> completed
      </div>

      <div className="flex items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              filter === f.key
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white/80 dark:bg-gray-900/60 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <button
        onClick={clearCompleted}
        className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300"
      >
        Clear completed
      </button>
    </div>
  );
}

export default TodoFooter;

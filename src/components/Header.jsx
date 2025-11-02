import React from 'react';
import { ListTodo } from 'lucide-react';

function Header() {
  return (
    <header className="w-full flex items-center justify-center py-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
          <ListTodo className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          My Tasks
        </h1>
      </div>
    </header>
  );
}

export default Header;

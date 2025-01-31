import { Home, Search, Bell, User, PlusSquare } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Social</h1>
          </div>
          
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100">
              <Home className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100">
              <PlusSquare className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
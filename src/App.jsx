import React, { useState, useMemo } from 'react';
import {
  Plus,
  CheckCircle2,
  Clock,
  ListTodo,
  TrendingUp,
  RotateCcw,
  Sparkles,
  CalendarDays,
  SlidersHorizontal
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FocusNotes from './components/FocusNotes';
import StatCard from './components/StatCard';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import DeleteModal from './components/DeleteModal';
import MobileDock from './components/MobileDock';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialSampleTasks } from './data/sampleTasks';

export default function App() {
  // Persistent Task State via custom localStorage hook
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', initialSampleTasks);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatusTab, setActiveStatusTab] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');

  // Navigation & Drawer State
  const [activeNav, setActiveNav] = useState('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modal Dialog States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  // Derived Dynamic Statistics (Single Source of Truth, NEVER hardcoded)
  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === 'In progress').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const todo = tasks.filter((t) => t.status === 'To do').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, inProgress, completed, todo, completionRate };
  }, [tasks]);

  // Derived Filtered Tasks (Search + Status Tabs + Priority Filter Working Together)
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Case-insensitive Title Search
      const matchesSearch = searchQuery
        ? task.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
          (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase().trim()))
        : true;

      // 2. Status Tab Filtering
      const matchesStatus =
        activeStatusTab === 'All' ? true : task.status === activeStatusTab;

      // 3. Priority Dropdown Filtering
      const matchesPriority =
        selectedPriority === 'All' ? true : task.priority === selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, activeStatusTab, selectedPriority]);

  const isFiltered = Boolean(
    searchQuery.trim() !== '' || activeStatusTab !== 'All' || selectedPriority !== 'All'
  );

  // Handlers for Task CRUD Operations
  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (taskData.id) {
      // Edit existing task (immutable update preserving unique ID)
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskData.id ? { ...t, ...taskData } : t))
      );
    } else {
      // Create new task with unique ID
      const newTask = {
        ...taskData,
        id: Date.now().toString()
      };
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    }
  };

  const handleDeleteTask = (task) => {
    setDeletingTask(task);
  };

  const handleConfirmDelete = () => {
    if (deletingTask) {
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== deletingTask.id));
      setDeletingTask(null);
    }
  };

  const handleToggleTaskStatus = (task) => {
    // If completed, toggle back to 'In progress'; otherwise mark 'Completed'
    const nextStatus = task.status === 'Completed' ? 'In progress' : 'Completed';
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, status: nextStatus } : t))
    );
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveStatusTab('All');
    setSelectedPriority('All');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        stats={stats}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 pb-20 lg:pb-12">
        {/* Top Header */}
        <Header
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onOpenCreateTask={handleOpenCreateModal}
          activeNav={activeNav}
        />

        {/* Dashboard Main Container */}
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Page Headline & Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Your work, in focus.
              </h1>
              <p className="text-sm text-slate-500">
                Plan your day, stay organized, and celebrate small wins.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New task</span>
            </button>
          </div>

          {/* Hero Banner Carousel (Focus Notes) */}
          <FocusNotes />

          {/* Dynamic Statistics Cards Grid */}
          <section aria-label="Task Statistics">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <StatCard
                title="Total tasks"
                value={stats.total}
                subtext="Across all projects"
                icon={ListTodo}
                iconBgColor="bg-indigo-50"
                iconColor="text-indigo-600"
                badgeText={stats.total > 0 ? `${stats.total} active` : '0 tasks'}
                badgeTrend="neutral"
              />
              <StatCard
                title="In progress"
                value={stats.inProgress}
                subtext="Keep the momentum"
                icon={Clock}
                iconBgColor="bg-blue-50"
                iconColor="text-blue-600"
                badgeText={`${stats.inProgress} ongoing`}
                badgeTrend="neutral"
              />
              <StatCard
                title="Completed"
                value={stats.completed}
                subtext="Great work this week"
                icon={CheckCircle2}
                iconBgColor="bg-emerald-50"
                iconColor="text-emerald-600"
                badgeText={`${stats.completionRate}% done`}
                badgeTrend="up"
              />
              <StatCard
                title="Completion rate"
                value={`${stats.completionRate}%`}
                subtext={`${stats.completed} of ${stats.total} completed`}
                icon={TrendingUp}
                iconBgColor="bg-purple-50"
                iconColor="text-purple-600"
                badgeText={stats.completionRate >= 50 ? 'On track' : 'In review'}
                badgeTrend={stats.completionRate >= 50 ? 'up' : 'neutral'}
              />
            </div>
          </section>

          {/* My Tasks Section */}
          <section aria-label="My Tasks" className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  My tasks
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage and track everything in one place.
                </p>
              </div>

              {isFiltered && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold self-start sm:self-auto flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  View all tasks
                </button>
              )}
            </div>

            {/* Controls: Search input + Status Tabs + Priority Filter */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onClear={() => setSearchQuery('')}
                  placeholder="Find a task by title or keyword..."
                />
              </div>

              <FilterTabs
                activeStatus={activeStatusTab}
                onSelectStatus={setActiveStatusTab}
                selectedPriority={selectedPriority}
                onSelectPriority={setSelectedPriority}
                counts={{
                  all: stats.total,
                  todo: stats.todo,
                  inProgress: stats.inProgress,
                  completed: stats.completed
                }}
                onResetFilters={handleResetFilters}
                isFiltered={isFiltered}
              />
            </div>

            {/* Task List / Cards Container */}
            <TaskList
              tasks={filteredTasks}
              totalTasksCount={stats.total}
              onToggleStatus={handleToggleTaskStatus}
              onStatusChange={handleStatusChange}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteTask}
              onOpenCreateTask={handleOpenCreateModal}
              onResetFilters={handleResetFilters}
              isFiltered={isFiltered}
            />
          </section>
        </main>
      </div>

      {/* Mobile Fixed Bottom Dock Navigation */}
      <MobileDock
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onOpenCreateTask={handleOpenCreateModal}
      />

      {/* Task Creation & Edit Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSaveTask}
        initialTask={editingTask}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(deletingTask)}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleConfirmDelete}
        taskTitle={deletingTask?.title || ''}
      />
    </div>
  );
}

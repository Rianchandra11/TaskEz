// TaskEasy - TaskManager Class - Day 2: US1 Implementation
// Following TDD approach: Tests written first, now implementing

class TaskManager {
  constructor() {
    this.tasks = this.loadTasks()
    this.currentEditId = null
    this.currentSort = "priority" // Default sort

    // Only initialize DOM listeners if we're in a browser environment
    if (typeof document !== "undefined") {
      this.initializeEventListeners()
      this.renderTasks()
      this.updateStats()
    }
  }

  // Load tasks from localStorage
  loadTasks() {
    try {
      const tasks = localStorage.getItem("taskeasy-tasks")
      return tasks ? JSON.parse(tasks) : []
    } catch (error) {
      console.error("Error loading tasks:", error)
      return []
    }
  }

  // Save tasks to localStorage
  saveTasks() {
    try {
      localStorage.setItem("taskeasy-tasks", JSON.stringify(this.tasks))
      return true
    } catch (error) {
      console.error("Error saving tasks:", error)
      return false
    }
  }

  // Generate unique ID for tasks
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Validate task data - US1 Requirements
  validateTask(taskData) {
    const errors = []

    // Title validation
    if (!taskData.title || taskData.title.trim() === "") {
      errors.push("Title is required")
    }

    if (taskData.title && taskData.title.length > 100) {
      errors.push("Title too long")
    }

    // Priority validation
    if (!["high", "medium", "low"].includes(taskData.priority)) {
      errors.push("Invalid priority")
    }

    // Status validation
    if (!["to-do", "in-progress", "done"].includes(taskData.status)) {
      errors.push("Invalid status")
    }

    return errors
  }

  // US1: Create task with title, description, priority
  createTask(taskData) {
    const errors = this.validateTask(taskData)
    if (errors.length > 0) {
      throw new Error(errors[0]) // Throw first error for simplicity
    }

    const task = {
      id: this.generateId(),
      title: taskData.title.trim(),
      description: taskData.description?.trim() || "",
      priority: taskData.priority,
      status: taskData.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.tasks.push(task)
    this.saveTasks()
    return task
  }

  // Get all tasks
  getAllTasks() {
    return [...this.tasks]
  }

  // Get task by ID
  getTaskById(id) {
    return this.tasks.find((task) => task.id === id) || null
  }

  // Get task statistics
  getStats() {
    const total = this.tasks.length
    const completed = this.tasks.filter((task) => task.status === "done").length
    const inProgress = this.tasks.filter((task) => task.status === "in-progress").length
    const todo = this.tasks.filter((task) => task.status === "to-do").length

    return { total, completed, inProgress, todo }
  }

  sortTasksByPriority() {
    this.tasks.sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
  }

  getSortedTasks() {
    if (this.currentSort === "priority") {
      const sortedTasks = [...this.tasks]
      sortedTasks.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      })
      return sortedTasks
    } else {
      return [...this.tasks] // Return unsorted tasks if no sorting is applied
    }
  }

  // Initialize event listeners (DOM-dependent)
  initializeEventListeners() {
    const taskForm = document.getElementById("taskForm")
    if (taskForm) {
      taskForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.handleFormSubmit()
      })
    }

    const sortControl = document.getElementById("sortControl")
    if (sortControl) {
      sortControl.addEventListener("change", (e) => {
        this.currentSort = e.target.value
        this.renderTasks()
      })
    }
  }

  // Handle form submission (DOM-dependent)
  handleFormSubmit() {
    const title = document.getElementById("taskTitle")?.value?.trim() || ""
    const description = document.getElementById("taskDescription")?.value?.trim() || ""
    const priority = document.getElementById("taskPriority")?.value || "medium"
    const status = document.getElementById("taskStatus")?.value || "to-do"

    try {
      const taskData = { title, description, priority, status }
      const task = this.createTask(taskData)

      this.showNotification("Task created successfully!", "success")
      this.resetForm()
      this.renderTasks()
      this.updateStats()

      return task
    } catch (error) {
      this.showNotification(error.message, "error")
      throw error
    }
  }

  // DOM manipulation methods
  resetForm() {
    const form = document.getElementById("taskForm")
    if (form) form.reset()

    const priority = document.getElementById("taskPriority")
    if (priority) priority.value = "medium"

    const status = document.getElementById("taskStatus")
    if (status) status.value = "to-do"
  }

  renderTasks() {
    const taskList = document.getElementById("taskList")
    if (!taskList) return

    const tasksToRender = this.getSortedTasks()

    if (tasksToRender.length === 0) {
      taskList.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <h3>No tasks yet</h3>
          <p>Create your first task using the form above</p>
        </div>
      `
      return
    }

    taskList.innerHTML = tasksToRender.map((task) => this.createTaskHTML(task)).join("")
  }

  createTaskHTML(task) {
    const priorityText = { high: "High", medium: "Medium", low: "Low" }
    const statusText = { "to-do": "To Do", "in-progress": "In Progress", done: "Done" }

    return `
      <div class="task-item priority-${task.priority}" data-task-id="${task.id}">
        <div class="task-header">
          <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
        </div>
        <div class="task-meta">
          <span class="task-badge priority-${task.priority}">${priorityText[task.priority]}</span>
          <span class="task-badge status-${task.status}">${statusText[task.status]}</span>
        </div>
        ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ""}
        <div class="task-dates">
          Created: ${this.formatDate(task.createdAt)}
        </div>
      </div>
    `
  }

  updateStats() {
    const statsElement = document.getElementById("taskStats")
    if (!statsElement) return

    const stats = this.getStats()
    let statsText = `${stats.total} task${stats.total !== 1 ? "s" : ""}`

    if (stats.total > 0) {
      statsText += ` • ${stats.completed} done • ${stats.inProgress} in progress • ${stats.todo} to do`
    }

    statsElement.textContent = statsText
  }

  showNotification(message, type = "info") {
    if (typeof document === "undefined") return

    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "#10b981" : "#ef4444"};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1001;
      animation: slideIn 0.3s ease;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)
  }

  // Utility functions
  escapeHtml(text) {
    if (typeof document === "undefined") {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
    }

    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
}
module.exports = { TaskManager };
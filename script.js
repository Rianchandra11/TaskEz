// TaskEasy - Day 5: Complete CRUD Application
// Fixed version - Mengatasi masalah form submission

class TaskManager {
  constructor() {
    this.tasks = this.loadTasks()
    this.currentEditId = null
    this.pendingDeleteId = null

    // Initialize setelah DOM ready
    this.initializeEventListeners()
    this.renderTasks()
    this.updateStats()

    console.log("🚀 TaskEasy Day 5: US4 Delete Tasks - FIXED VERSION")
    console.log("Pair Programming: Zein (Driver), Rian (Navigator), Robi (Reviewer)")
    console.log("Features: CREATE + PRIORITY SORTING + EDIT + DELETE")
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

  // US1: Validate task data
  validateTask(taskData) {
    const errors = []

    if (!taskData.title || taskData.title.trim() === "") {
      errors.push("Title is required")
    }

    if (taskData.title && taskData.title.length > 100) {
      errors.push("Title must be less than 100 characters")
    }

    if (!["high", "medium", "low"].includes(taskData.priority)) {
      errors.push("Invalid priority value")
    }

    if (!["to-do", "in-progress", "done"].includes(taskData.status)) {
      errors.push("Invalid status value")
    }

    return errors
  }

  // US1: Create task with title, description, priority
  createTask(taskData) {
    const errors = this.validateTask(taskData)
    if (errors.length > 0) {
      throw new Error(errors[0])
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

  // Initialize event listeners - FIXED
  initializeEventListeners() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.setupEventListeners()
      })
    } else {
      this.setupEventListeners()
    }
  }

  setupEventListeners() {
    const form = document.getElementById("taskForm")
    if (form) {
      // Remove existing listeners to prevent duplicates
      form.removeEventListener("submit", this.handleFormSubmitBound)

      // Bind the method to preserve 'this' context
      this.handleFormSubmitBound = this.handleFormSubmit.bind(this)
      form.addEventListener("submit", this.handleFormSubmitBound)

      console.log("✅ Form event listener attached successfully")
    } else {
      console.error("❌ Form element not found!")
    }

    // Cancel button for edit mode
    const cancelBtn = document.getElementById("cancelBtn")
    if (cancelBtn) {
      cancelBtn.removeEventListener("click", this.handleCancelEditBound)
      this.handleCancelEditBound = this.handleCancelEdit.bind(this)
      cancelBtn.addEventListener("click", this.handleCancelEditBound)
    }
  }

  // Handle form submission - FIXED
  handleFormSubmit(e) {
    e.preventDefault()
    console.log("📝 Form submitted!")

    const submitBtn = document.querySelector("#submitBtn")
    const originalText = submitBtn.textContent

    try {
      submitBtn.textContent = this.isInEditMode() ? "Updating..." : "Creating..."
      submitBtn.disabled = true

      const title = document.getElementById("taskTitle").value.trim()
      const description = document.getElementById("taskDescription").value.trim()
      const priority = document.getElementById("taskPriority").value
      const status = document.getElementById("taskStatus").value

      console.log("📋 Form data:", { title, description, priority, status })

      if (this.isInEditMode()) {
        // Update existing task
        this.handleSaveEdit()
      } else {
        // Create new task
        const taskData = { title, description, priority, status }
        const task = this.createTask(taskData)
        console.log("✅ Task created:", task)
        this.showNotification(`Task "${task.title}" created successfully!`, "success")
      }

      this.resetForm()
      this.renderTasks()
      this.updateStats()
    } catch (error) {
      console.error("❌ Error:", error)
      this.showNotification(error.message, "error")
    } finally {
      setTimeout(() => {
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 500)
    }
  }

  // Reset form to default state
  resetForm() {
    const form = document.getElementById("taskForm")
    if (form) {
      form.reset()
    }

    const priority = document.getElementById("taskPriority")
    const status = document.getElementById("taskStatus")
    const title = document.getElementById("taskTitle")

    if (priority) priority.value = "medium"
    if (status) status.value = "to-do"
    if (title) title.focus()

    // Reset form UI
    const formTitle = document.getElementById("formTitle")
    const submitBtn = document.getElementById("submitBtn")
    const cancelBtn = document.getElementById("cancelBtn")

    if (formTitle) formTitle.textContent = "Create New Task"
    if (submitBtn) submitBtn.textContent = "Create Task"
    if (cancelBtn) cancelBtn.style.display = "none"
  }

  // Render tasks
  renderTasks() {
    const taskList = document.getElementById("taskList")
    if (!taskList) return

    if (this.tasks.length === 0) {
      taskList.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <p>No tasks yet. Create your first task above!</p>
          <small>Tasks will be automatically sorted by priority: High → Medium → Low</small>
        </div>
      `
      return
    }

    const sortedTasks = this.getTasksSortedByPriority()
    const completedCount = this.tasks.filter((task) => task.status === "done").length

    let html = sortedTasks.map((task) => this.createTaskHTML(task)).join("")

    // Add bulk actions if there are completed tasks
    if (completedCount > 0) {
      html += `
        <div class="bulk-actions">
          <button class="bulk-delete-btn" onclick="taskManager.handleDeleteCompleted()">
            🗑️ Delete ${completedCount} Completed Task${completedCount !== 1 ? "s" : ""}
          </button>
        </div>
      `
    }

    taskList.innerHTML = html
  }

  // Create HTML for a single task
  createTaskHTML(task) {
    const priorityText = { high: "High", medium: "Medium", low: "Low" }
    const statusText = { "to-do": "To Do", "in-progress": "In Progress", done: "Done" }
    const isEditing = this.currentEditId === task.id

    return `
      <div class="task-item priority-${task.priority} ${isEditing ? "editing" : ""}" data-task-id="${task.id}">
        ${isEditing ? '<div class="editing-indicator">Editing</div>' : ""}
        
        <div class="task-header">
          <div class="task-title">${this.escapeHtml(task.title)}</div>
        </div>
        
        <div class="task-meta">
          <span class="task-badge priority-${task.priority}">${priorityText[task.priority]}</span>
          <span class="task-badge status-${task.status}">${statusText[task.status]}</span>
        </div>
        
        ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ""}
        
        <div class="task-dates">
          Created: ${this.formatDate(task.createdAt)}
          ${task.updatedAt !== task.createdAt ? `• Updated: ${this.formatDate(task.updatedAt)}` : ""}
        </div>

        <div class="task-actions">
          <button class="edit-btn" onclick="taskManager.handleEditClick('${task.id}')">
            ✏️ Edit
          </button>
          <button class="delete-btn" onclick="taskManager.handleDeleteClick('${task.id}')">
            🗑️ Delete
          </button>
        </div>
      </div>
    `
  }

  // Update statistics
  updateStats() {
    const statsElement = document.getElementById("taskStats")
    if (!statsElement) return

    const total = this.tasks.length
    const completed = this.tasks.filter((task) => task.status === "done").length
    const inProgress = this.tasks.filter((task) => task.status === "in-progress").length
    const todo = this.tasks.filter((task) => task.status === "to-do").length

    // Priority breakdown
    const priorityStats = this.getPriorityStats()

    let statsText = `${total} task${total !== 1 ? "s" : ""} created`
    if (total > 0) {
      statsText += ` • ${completed} done • ${inProgress} active • ${todo} todo`
      statsText += ` • Priority: ${priorityStats.high}H/${priorityStats.medium}M/${priorityStats.low}L`
    }

    statsElement.textContent = statsText
  }

  // Show notification
  showNotification(message, type = "info") {
    console.log(`📢 Notification: ${message} (${type})`)

    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)
  }

  // Utility functions
  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  formatDate(dateString) {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  // US2: Sort tasks by priority (high > medium > low)
  getTasksSortedByPriority() {
    const priorityOrder = { high: 1, medium: 2, low: 3 }

    return [...this.tasks].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
  }

  // US2: Get priority stats
  getPriorityStats() {
    return this.tasks.reduce(
      (stats, task) => {
        stats[task.priority]++
        return stats
      },
      { high: 0, medium: 0, low: 0 },
    )
  }

  // US3: Update task functionality
  updateTask(taskId, updates) {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId)
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }

    const currentTask = this.tasks[taskIndex]
    const updatedData = { ...currentTask, ...updates }

    // Trim string fields
    if (updates.title !== undefined) {
      updatedData.title = updates.title.trim()
    }
    if (updates.description !== undefined) {
      updatedData.description = updates.description.trim()
    }

    const errors = this.validateTask(updatedData)
    if (errors.length > 0) {
      throw new Error(errors[0])
    }

    this.tasks[taskIndex] = {
      ...currentTask,
      ...updates,
      title: updatedData.title,
      description: updatedData.description,
      updatedAt: new Date().toISOString(),
    }

    this.saveTasks()
    return this.tasks[taskIndex]
  }

  // Edit mode management
  enterEditMode(taskId) {
    this.exitEditMode() // Exit any current edit mode
    this.currentEditId = taskId
    this.populateEditForm(taskId)
    this.renderTasks() // Re-render to show edit state
  }

  exitEditMode() {
    this.currentEditId = null
    this.resetForm()
    this.renderTasks() // Re-render to hide edit state
  }

  isInEditMode() {
    return this.currentEditId !== null
  }

  getEditingTaskId() {
    return this.currentEditId
  }

  populateEditForm(taskId) {
    const task = this.tasks.find((t) => t.id === taskId)
    if (!task) return

    const titleInput = document.getElementById("taskTitle")
    const descInput = document.getElementById("taskDescription")
    const prioritySelect = document.getElementById("taskPriority")
    const statusSelect = document.getElementById("taskStatus")

    if (titleInput) titleInput.value = task.title
    if (descInput) descInput.value = task.description || ""
    if (prioritySelect) prioritySelect.value = task.priority
    if (statusSelect) statusSelect.value = task.status

    // Update form UI for edit mode
    const formTitle = document.getElementById("formTitle")
    const submitBtn = document.getElementById("submitBtn")
    const cancelBtn = document.getElementById("cancelBtn")

    if (formTitle) formTitle.textContent = "Edit Task"
    if (submitBtn) submitBtn.textContent = "Update Task"
    if (cancelBtn) cancelBtn.style.display = "inline-block"
  }

  // Handle edit button click
  handleEditClick(taskId) {
    this.enterEditMode(taskId)
  }

  // Handle save edit
  handleSaveEdit() {
    if (!this.currentEditId) return

    try {
      const title = document.getElementById("taskTitle").value.trim()
      const description = document.getElementById("taskDescription").value.trim()
      const priority = document.getElementById("taskPriority").value
      const status = document.getElementById("taskStatus").value

      const updates = { title, description, priority, status }
      this.updateTask(this.currentEditId, updates)

      this.showNotification("Task updated successfully!", "success")
      this.exitEditMode()
      this.updateStats()
    } catch (error) {
      this.showNotification(error.message, "error")
    }
  }

  // Handle cancel edit
  handleCancelEdit() {
    this.exitEditMode()
    this.showNotification("Edit cancelled", "info")
  }

  // US4: Delete functionality
  handleDeleteClick(taskId) {
    const task = this.getTaskById(taskId)
    if (!task) return

    this.requestDelete(taskId)
    this.showDeleteConfirmation(task)
  }

  showDeleteConfirmation(task) {
    const modal = document.createElement("div")
    modal.className = "delete-modal"
    modal.innerHTML = `
      <div class="delete-modal-content">
        <div class="delete-modal-header">
          <h3>🗑️ Delete Task</h3>
        </div>
        <div class="delete-modal-body">
          <p>Are you sure you want to delete this task?</p>
          <div class="task-preview">
            <strong>"${this.escapeHtml(task.title)}"</strong>
            <span class="task-badge priority-${task.priority}">${task.priority}</span>
          </div>
          <p class="warning-text">This action cannot be undone.</p>
        </div>
        <div class="delete-modal-actions">
          <button class="confirm-delete-btn" onclick="taskManager.handleConfirmDelete()">
            🗑️ Delete Task
          </button>
          <button class="cancel-delete-btn" onclick="taskManager.handleCancelDelete()">
            Cancel
          </button>
        </div>
      </div>
    `

    document.body.appendChild(modal)

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.handleCancelDelete()
      }
    })
  }

  handleConfirmDelete() {
    try {
      const task = this.getTaskById(this.pendingDeleteId)
      this.confirmDelete()
      this.closeDeleteModal()
      this.renderTasks()
      this.updateStats()
      this.showNotification(`Task "${task.title}" deleted successfully!`, "success")
    } catch (error) {
      this.showNotification(error.message, "error")
    }
  }

  handleCancelDelete() {
    this.cancelDelete()
    this.closeDeleteModal()
  }

  closeDeleteModal() {
    const modal = document.querySelector(".delete-modal")
    if (modal) {
      modal.remove()
    }
  }

  // Bulk delete operations
  handleDeleteCompleted() {
    const completedTasks = this.tasks.filter((task) => task.status === "done")
    if (completedTasks.length === 0) {
      this.showNotification("No completed tasks to delete", "info")
      return
    }

    const count = this.deleteCompletedTasks()
    this.renderTasks()
    this.updateStats()
    this.showNotification(`${count} completed task${count !== 1 ? "s" : ""} deleted!`, "success")
  }

  // US4: Delete task methods
  deleteTask(taskId) {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId)
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }

    if (this.currentEditId === taskId) {
      this.exitEditMode()
    }

    this.tasks.splice(taskIndex, 1)
    this.saveTasks()
    return true
  }

  requestDelete(taskId) {
    const task = this.getTaskById(taskId)
    if (!task) {
      throw new Error("Task not found")
    }
    this.pendingDeleteId = taskId
  }

  confirmDelete() {
    if (!this.pendingDeleteId) {
      throw new Error("No delete operation pending")
    }

    const result = this.deleteTask(this.pendingDeleteId)
    this.pendingDeleteId = null
    return result
  }

  cancelDelete() {
    this.pendingDeleteId = null
  }

  isDeletePending() {
    return this.pendingDeleteId !== null
  }

  getPendingDeleteId() {
    return this.pendingDeleteId
  }

  getTaskById(id) {
    return this.tasks.find((task) => task.id === id) || null
  }

  deleteCompletedTasks() {
    const completedTaskIds = this.tasks.filter((task) => task.status === "done").map((task) => task.id)
    return this.deleteTasks(completedTaskIds)
  }

  deleteTasks(taskIds) {
    let deletedCount = 0

    const tasksToDelete = taskIds
      .map((id) => ({ id, index: this.tasks.findIndex((task) => task.id === id) }))
      .filter((item) => item.index !== -1)
      .sort((a, b) => b.index - a.index)

    tasksToDelete.forEach(({ id, index }) => {
      if (this.currentEditId === id) {
        this.exitEditMode()
      }

      this.tasks.splice(index, 1)
      deletedCount++
    })

    if (deletedCount > 0) {
      this.saveTasks()
    }

    return deletedCount
  }
}

// Initialize app - FIXED
let taskManager

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 DOM Content Loaded - Initializing TaskEasy...")

  taskManager = new TaskManager()
  window.taskManager = taskManager // Make it globally accessible

  // Focus on title input for better UX
  const titleInput = document.getElementById("taskTitle")
  if (titleInput) {
    titleInput.focus()
  }

  console.log("✅ TaskEasy initialized successfully!")
})

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState === "complete" || document.readyState === "interactive") {
  console.log("🚀 DOM already ready - Initializing TaskEasy...")

  taskManager = new TaskManager()
  window.taskManager = taskManager

  const titleInput = document.getElementById("taskTitle")
  if (titleInput) {
    titleInput.focus()
  }

  console.log("✅ TaskEasy initialized successfully!")
}

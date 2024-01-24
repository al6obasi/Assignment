const express = require('express')
const GoalController = require('../controllers/GoalController')

class GoalRouter {
    constructor() {
        this.router = express.Router()
        this.goalController = new GoalController()
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.post(
            '/goal',
            this.handleAsync(this.createGoal.bind(this)),
        )
        this.router.get(
            '/goal',
            this.handleAsync(
                this.getAllGoalsWithPagination.bind(this),
            ),
        )
        this.router.get(
            '/goal/:id',
            this.handleAsync(this.getGoalById.bind(this)),
        )
        this.router.patch(
            '/goal/:id',
            this.handleAsync(this.updateGoal.bind(this)),
        )
        this.router.delete(
            '/goal/:id',
            this.handleAsync(this.deleteGoal.bind(this)),
        )
    }

    // Helper function to handle asynchronous route handlers
    handleAsync(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next)
        }
    }

    async createGoal(req, res) {
        await this.goalController.createGoal(req, res)
    }

    async getAllGoalsWithPagination(req, res) {
        await this.goalController.getAllGoalsWithPagination(
            req,
            res,
        )
    }

    async getGoalById(req, res) {
        await this.goalController.getGoalById(req, res)
    }

    async updateGoal(req, res) {
        await this.goalController.updateGoal(req, res)
    }

    async deleteGoal(req, res) {
        await this.goalController.deleteGoal(req, res)
    }

    // Getter for the router to use in the main Express application
    getRouter() {
        return this.router
    }
}

// Export an instance of the router
const goalRouter = new GoalRouter()
module.exports = goalRouter.getRouter()

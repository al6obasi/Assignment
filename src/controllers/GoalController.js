const {
    BadRequestError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
} = require('../helpers/Errors.js')
const {
    DEFAULT_LIMIT_NUMBER,
    DEFAULT_PAGE_NUMBER,
    DEFAULT_SORT_BY_COLUMN,
    DEFAULT_SORT_ORDER,
} = require('../constants/index.js')

const {
    isOperationalError,
    logError,
    returnError,
} = require('../helpers/errorHandler.js')
const {
    returnSuccess,
} = require('../helpers/successHandler.js')

class GoalController {
    constructor() {
        if (!GoalController.instance) {
            GoalController.instance = this
        }
        return GoalController.instance
    }

    /**
     * Create a new goal.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    async createGoal(req, res) {
        try {
            const {
                title,
                description,
                dueDate = '2024-01-24 17:06:25.443 +00:00',
                status = 'COMPLETED',
            } = req.body

            const newGoal = await req.db.models.Goal.create(
                {
                    title,
                    description,
                    dueDate,
                    status,
                    userId: req?.user?.id,
                },
            )

            return returnSuccess(
                newGoal,
                'Goal created successfully',
                req,
                res,
            )
        } catch (error) {
            logError(error)

            if (isOperationalError(error)) {
                return returnError(error, req, res)
            } else {
                return returnError(
                    new InternalServerError(
                        'Error creating goal',
                    ),
                    req,
                    res,
                )
            }
        }
    }

    /**
     * Get all goals with pagination and sorting.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    async getAllGoalsWithPagination(req, res) {
        try {
            // Get query parameters for pagination and sorting
            const queryParams = req.query
            const {
                page = DEFAULT_PAGE_NUMBER,
                limit = DEFAULT_LIMIT_NUMBER,
                sortBy = DEFAULT_SORT_BY_COLUMN,
                sortOrder = DEFAULT_SORT_ORDER,
            } = queryParams

            // Validate the query params
            if (isNaN(parseInt(page))) {
                throw new BadRequestError(
                    `Invalid query params page: ${page}. The allowed values are numbers.`,
                )
            }

            if (isNaN(parseInt(limit))) {
                throw new BadRequestError(
                    `Invalid query params limit: ${limit}. The allowed values are numbers.`,
                )
            }

            if (
                !['id', 'title', 'description'].includes(
                    sortBy,
                )
            ) {
                throw new BadRequestError(
                    `Invalid query params sortBy: ${sortBy}. The allowed values 'id', 'title' or 'description'.`,
                )
            }

            if (!['asc', 'desc'].includes(sortOrder)) {
                throw new BadRequestError(
                    `Invalid query params sortOrder: ${sortOrder}. The allowed values 'asc' or 'desc'.`,
                )
            }

            // Get all goals with sorting and pagination
            const { count, rows: goals } =
                await req.db.models.Goal.findAndCountAll({
                    order: [[sortBy, sortOrder]],
                    offset:
                        (parseInt(page) - 1) *
                        parseInt(limit),
                    limit: parseInt(limit),
                })

            return returnSuccess(
                {
                    goals,
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                },
                'Goals retrieved successfully',
                req,
                res,
            )
        } catch (error) {
            logError(error)

            if (isOperationalError(error)) {
                returnError(error, req, res)
            } else {
                returnError(
                    new InternalServerError(
                        'Error retrieving goals',
                    ),
                    req,
                    res,
                )
            }
        }
    }

    /**
     * Get a single goal by ID.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    async getGoalById(req, res) {
        try {
            const goalId = parseInt(
                req.url.split('/').pop(),
            )
            if (isNaN(goalId)) {
                throw new BadRequestError('Invalid goal ID')
            }

            const goal = await req.db.models.Goal.findByPk(
                goalId,
            )
            if (!goal) {
                throw new NotFoundError('Goal not found')
            }

            return returnSuccess(
                goal,
                'Goal retrieved successfully',
                req,
                res,
            )
        } catch (error) {
            logError(error)

            if (isOperationalError(error)) {
                returnError(error, req, res)
            } else {
                returnError(
                    new InternalServerError(
                        'Error retrieving goal',
                    ),
                    req,
                    res,
                )
            }
        }
    }

    /**
     * Update a goal by ID.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    async updateGoal(req, res) {
        try {
            const goalId = parseInt(
                req.url.split('/').pop(),
            )
            if (isNaN(goalId)) {
                throw new BadRequestError('Invalid goal ID')
            }

            const {
                title,
                description,
                dueDate = '2024-01-24 17:06:25.443 +00:00',
                status = 'COMPLETED',
            } = req.body

            const goal = await req.db.models.Goal.findByPk(
                goalId,
            )
            if (!goal) {
                throw new NotFoundError('Goal not found')
            }

            if (goal.userId !== req.user.id) {
                throw new UnauthorizedError(
                    'Unathorized user',
                )
            }

            await goal.update({
                title,
                description,
                dueDate,
                status,
            })

            return returnSuccess(
                goal,
                'Goal updated successfully',
                req,
                res,
            )
        } catch (error) {
            logError(error)

            if (isOperationalError(error)) {
                returnError(error, req, res)
            } else {
                returnError(
                    new InternalServerError(
                        'Error updating goal',
                    ),
                    req,
                    res,
                )
            }
        }
    }

    /**
     * Delete a goal by ID.
     * @param {http.IncomingMessage} req - The HTTP request object.
     * @param {http.ServerResponse} res - The HTTP response object.
     */
    async deleteGoal(req, res) {
        try {
            const goalId = parseInt(
                req.url.split('/').pop(),
            )
            if (isNaN(goalId)) {
                throw new BadRequestError('Invalid goal ID')
            }

            const goal = await req.db.models.Goal.findByPk(
                goalId,
            )
            if (!goal) {
                throw new NotFoundError('Goal not found')
            }

            if (goal.userId !== req.user.id) {
                throw new UnauthorizedError(
                    'Unathorized user',
                )
            }

            await goal.destroy()

            return returnSuccess(
                null,
                'Goal deleted successfully',
                req,
                res,
            )
        } catch (error) {
            logError(error)

            if (isOperationalError(error)) {
                returnError(error, req, res)
            } else {
                returnError(
                    new InternalServerError(
                        'Error deleting goal',
                    ),
                    req,
                    res,
                )
            }
        }
    }
}

module.exports = GoalController

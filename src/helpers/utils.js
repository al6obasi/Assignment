/* global Promise */

function generateGoals(count = 30) {
    const goals = []

    for (let i = 1; i <= count; i++) {
        const goal = {
            description: `goal ${i} description`,
            created_at: new Date(),
            title: `goal${i}`,
            updated_at: new Date(),
            user_id: i < 15 ? 1 : 2,
            status: 'PENDING',
            due_date: new Date(),
        }
        goals.push(goal)
    }

    return goals
}

module.exports = { generateGoals }

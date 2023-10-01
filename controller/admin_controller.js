export class AdminController {
    static async index (req, res, next) {
        try {
            res.json("AdminController")
        } catch (error) {
            next(error)
        }
    }
}
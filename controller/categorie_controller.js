export class CategorieController {
    static async index (req, res, next) {
        try {
            res.json("CategorieController")
        } catch (error) {
            next(error)
        }
    }

    static async addCategorie (req, res, next){
        try {
            res.json("addCategorie")
        } catch (error) {
            next(error)
        }
    }
}
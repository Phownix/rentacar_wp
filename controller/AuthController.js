import passport from "passport";

export class AuthController {
    static async login (req, res, next) {
        try {
            res.render("Pages/Auth/signin",{
                success: req.query.success??null,
                run: req.query.run??null
            });
        } catch (error) {
            next(error)
        }
    }

    static async register (req, res, next) {
        try {
            res.render("Pages/Auth/signup");
        } catch (error) {
            next(error)
        }
    }

    static async logout (req, res, next) {
        try {
            req.logout(function(err) {
                if (err) { return next(err); }
                res.redirect('/');
            }); 
        } catch (error) {
            next(error);
        }
    }


    static async login_post (req, res, next) {
        passport.authenticate('local-signin', {
            successRedirect: req.query.success ?? '/',
            failureRedirect: '/auth/login'
        })(req, res, next);
    }

    static async register_post (req, res, next) {
        passport.authenticate('local-signup', {
            successRedirect: '/auth/login?run='+req.body.rut,
            failureRedirect: '/auth/register',
            passReqToCallback: true
        })(req, res, next);
    }
}
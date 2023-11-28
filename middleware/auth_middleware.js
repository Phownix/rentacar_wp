export function isAdmin(req, res, next) {
    const user = req.user; // todo
  
    if (user && user.type === 'admin') {
        next(); // El usuario es un administrador, permitir acceso
    } else {
        res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden acceder a esta ruta.' });
    }
}
  
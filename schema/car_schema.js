import { Schema, model } from 'mongoose';

const CarSchema = new Schema({
    uuid: {type: String, required: true, unique: true, index: true }, // Id del Objeto
    brand: {type: String, required: true }, // Marca del auto
    model: {type: String, required: true }, // Modelo del auto
    year: { type: Number, required: true }, // Año de fabricación del auto
    category: { type: String, required: true }, // Categoría o tipo de auto (por ejemplo, sedán, SUV, etc.)
    availability: { type: Boolean, default: true }, // Indica si el auto está disponible para renta
    rentalPrice: { type: Number, required: true }, // Precio de renta del auto
    features: [String] // Una lista de características o extras que tiene el auto (por ejemplo, aire acondicionado, GPS, etc.).
});

export default model('Car', CarSchema);

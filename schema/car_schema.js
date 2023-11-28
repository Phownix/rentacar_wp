import { Schema, model } from 'mongoose';

const CarSchema = new Schema({
    uuid: {type: String, required: true, unique: true, index: true }, // Id del Objeto
    sku:  {type: String, required: true, }, // sku del Objeto
    brand: {type: String, required: true }, // Marca del auto
    model: {type: String, required: true }, // Modelo del auto
    year: { type: Number, required: true }, // Año de fabricación del auto
    category: { type: String, required: true }, // Categoría o tipo de auto (por ejemplo, sedán, SUV, etc.)
    seating_places: { type: Number, required: true }, // Numero de plazas/asientos del vehiculo
    transmission: { type: String, required: true }, // tipo de transmision del vehiculo, valores disponibles "manual" y "automatic"
    availability: { type: Boolean, default: true }, // Indica si el auto está disponible para renta
    rentalPrice: { type: Number, required: true }, // Precio de renta del auto
    features: [String] // Una lista de características o extras que tiene el auto (por ejemplo, aire acondicionado, GPS, etc.).
});

export default model('Car', CarSchema);

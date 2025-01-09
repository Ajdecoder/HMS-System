import PantryStaff from './models/PantryStaff';

// PantryStaff Management
export const addPantryStaff = async (req, res) => {
  try {
    const newPantryStaff = new PantryStaff(req.body);
    await newPantryStaff.save();
    res.status(201).json(newPantryStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPantryStaffById = async (req, res) => {
  try {
    const pantryStaff = await PantryStaff.findById(req.params.id);
    if (!pantryStaff) return res.status(404).json({ message: "Pantry staff not found" });
    res.json(pantryStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePantryStaffById = async (req, res) => {
  try {
    const updatedPantryStaff = await PantryStaff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPantryStaff) return res.status(404).json({ message: "Pantry staff not found" });
    res.json(updatedPantryStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePantryStaffById = async (req, res) => {
  try {
    const deletedPantryStaff = await PantryStaff.findByIdAndDelete(req.params.id);
    if (!deletedPantryStaff) return res.status(404).json({ message: "Pantry staff not found" });
    res.json({ message: "Pantry staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
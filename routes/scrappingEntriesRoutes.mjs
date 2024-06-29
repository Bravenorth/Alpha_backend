import express from 'express';
import ScrappingEntry from '../models/scrappingEntry.mjs'; // Assurez-vous d'utiliser .mjs
import authMiddleware from '../middlewares/authMiddleware.mjs';

const router = express.Router();

// Ajouter une nouvelle entrée
router.post('/entries', authMiddleware, async (req, res) => {
  try {
    const entry = new ScrappingEntry({ ...req.body, user: req.user.username });
    await entry.save();
    res.status(201).send(entry);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtenir les entrées de l'utilisateur connecté
router.get('/entries', authMiddleware, async (req, res) => {
  try {
    const entries = await ScrappingEntry.find({ user: req.user.username });
    res.status(200).send(entries);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Mettre à jour une entrée
router.patch('/entries/:id', authMiddleware, async (req, res) => {
  try {
    const entry = await ScrappingEntry.findOneAndUpdate(
      { _id: req.params.id, user: req.user.username },
      req.body,
      { new: true }
    );
    if (!entry) {
      return res.status(404).send();
    }
    res.send(entry);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Supprimer une entrée
router.delete('/entries/:id', authMiddleware, async (req, res) => {
  try {
    const entry = await ScrappingEntry.findOneAndDelete({ _id: req.params.id, user: req.user.username });
    if (!entry) {
      return res.status(404).send();
    }
    res.send(entry);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

const contactosRouter = require('express').Router();
const User = require('../models/user');
const Contacto = require('../models/contacto');

contactosRouter.get('/', async (request, response) => {
  const user = request.user;
  const contacto = await Contacto.find({ user: user.id });
  return response.status(200).json(contacto);
});

contactosRouter.post('/', async (request, response) => {
  const user = request.user;
  const { contacto, phone } = request.body;
  const newContacto = new Contacto({
    contacto,
    phone,
    user: user._id,
  });
  const savedContacto = await newContacto.save();
  user.contactos = user.contactos.concat(savedContacto._id);
  await user.save();

  return response.status(201).json(savedContacto);
});

contactosRouter.delete('/:id', async (request, response) => {
  const user = request.user;
  await Contacto.findByIdAndDelete(request.params.id);

  user.contactos = user.contactos.filter(id => id.toString() !== request.params.id);
  await user.save();

  return response.sendStatus(204);
});

contactosRouter.patch('/:id', async (request, response) => {
  const user = request.user;
  const { contacto, phone } = request.body;

  await Contacto.findByIdAndUpdate(request.params.id, { contacto, phone });
  return response.sendStatus(200);
});


module.exports = contactosRouter;
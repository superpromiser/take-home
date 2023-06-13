const express = require('express');
const { Agent } = require('./model');

const app = express();

// Init Middleware
app.use(express.json());

app.get('/agents', async (req, res, next) => {
  const agents = await Agent.findAll();
  return res.json(agents);
});

app.post('/jointeam', async (req, res, next) => {
  try {
    const agent = new Agent({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      photoUrl: req.body.photoUrl,
      agentLicence: req.body.agentLicence,
      address: req.body.address,
      practiceAreas: req.body.practiceAreas,
      aboutMe: req.body.aboutMe,
      review: ''
    });
    await agent.save();
    return res.json({status: 'success'});
  }catch (error) {
    console.log(error);
    res.json({status: 'error'});
  }
});

app.post('/review/:id', async (req, res, next) => {
  try {
    const agent = await Agent.findOne({ where: { id: req.params.id }});
    Agent.update(
      { reviews: agent.reviews + req.body.newReview },
      { where: { id: req.params.id } }
    )
    return res.json(agent);
  }catch (error) {
    console.log(error);
    res.json({status: 'error'});
  }
});

app.get('/review/:id', async (req, res, next) => {
  try {
    const agent = await Agent.findOne({ where: { id: req.params.id }});
    return res.json(agent);
  }catch (error) {
    console.log(error);
    res.json({status: 'error'});
  }
});

app.get('/avatar', async (req, res, next) => {
  res.download('./avatar/111.jpg');
})

module.exports = app;

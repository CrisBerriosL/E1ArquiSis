// code from https://www.emqx.com/en/blog/how-to-use-mqtt-in-nodejs

const mqtt = require('mqtt')

const { Event } = require('./models');

const host = 'planetaryevents.iic2173.net'
const port = '9000'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'common',
  password: 'iic2173',
  reconnectPeriod: 1000,
})

const topic = 'global-emergencies'
client.on('connect', () => {
  console.log('Connected')
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
})

client.on('message', async (topic, payload) => {
  console.log('Received Message:', topic, payload.toString());

  try {
    const event = JSON.parse(payload.toString());
    await Event.create( event );
    console.log('Event added to database successfully');
  } catch (error) {
    console.log('Error trying to add event to database:', error);
  };
})

module.exports = client;
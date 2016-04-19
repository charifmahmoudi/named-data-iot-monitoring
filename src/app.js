/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ndn = require('./js/ndn');
var ProtoBuf = require("./js/protobuf");
/*
var Face = require('./js/ndn').Face;
var Name = require('./js/ndn').Name;
var Interest = require('./js/ndn').Interest;
var Blob = require('./js/ndn').Blob;
//var UnixTransport = require('./js/ndn').UnixTransport;
var ProtobufTlv = require('./js/ndn').ProtobufTlv;
var SegmentFetcher = require('./js/ndn').SegmentFetcher;
*/
var hostip = "spurs.cs.ucla.edu";

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'NDN Monitoring Client',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('Connecting to UCLA');
  card.subtitle('NDN');
  card.body('Creating face and processing');
  card.show();
  express();
});

var face = null;

function onData(interest, data)
{
  console.log("Got data packet with name " + data.getName().toUri());
  console.log(data.getContent().buf().toString('binary'));
};

function onTimeout(interest)
{
  console.log("Time out for interest " + interest.getName().toUri());
};

function express() {
  if (face === null) {
    // Connect to the forwarder with a WebSocket.
    face = new ndn.Face({host: hostip});
  }

  var name = new ndn.Name("/ndn/edu/arizona");
  name.append(+ Math.floor(Math.random()*100000));
  console.log("Express name " + name.toUri());
  face.expressInterest(name, onData, onTimeout);
}
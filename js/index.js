var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}
///////////////////START FLAG MESH

console.clear();

var mesh = void 0;
var cloth = void 0;
var spacingX = 5;
var spacingY = 5;
var accuracy = 1;

var opts = {
  //I changed opts.image to opts.glyph


  ///this is the first rendered image
  ChangeGlyph: 'https://i.ibb.co/kXXb6Nz/e.png',




  ///I changed rendercloth from true to false and changed other values

  gravity: 150,
  friction: 0.99,
  bounce: 0.3,
  pointsX: 20,
  pointsY: 22,
  renderCloth: false,
  mouseInfluence: 50,

  ///changed to Hang/drop x3
  HangDrop: true,


  randomImage: function randomImage() {
    /// this.image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ454id5ldfep-mLVLeFt57_IsJz54Mopj5KxI1ZBIzn9eRmqDC4Q' + Math.floor(Math.random() * 1100);
    //  RANDOM IMAGE OPT REMOVED 
    loadTexture();
  } };



var gui = new dat.GUI();
gui.closed = window.innerWidth < 600;

/// let renderCloth = gui.add(opts, 'renderCloth'); 

///this is the list of images
//I changed opts.image to opts.glyph

var image = gui.add(opts, 'ChangeGlyph', {
  A: 'https://i.ibb.co/1v4Y0DY/a.png',
  B: 'https://i.ibb.co/z7Tp8xG/b.png',
  C: 'https://i.ibb.co/xfbKQyq/c.png',
  D: 'https://i.ibb.co/W67VXKs/d.png',
  E: 'https://i.ibb.co/kXXb6Nz/e.png',
  F: 'https://i.ibb.co/52wx1Kt/f.png',
  G: 'https://i.ibb.co/n642dZ4/g.png',
  H: 'https://i.ibb.co/4pG5WqW/h.png',
  I: 'https://i.ibb.co/KsmsZBw/i.png',
  J: 'https://i.ibb.co/N1z5nBK/j.png',
  K: 'https://i.ibb.co/kcRMGht/k.png',
  L: 'https://i.ibb.co/nfYXR78/l.png',
  M: 'https://i.ibb.co/zJzYp9S/m.png',
  N: 'https://i.ibb.co/pw1tzPG/n.png',
  O: 'https://i.ibb.co/Mn33DgC/o.png',
  P: 'https://i.ibb.co/NFb4QHg/p.png',
  Q: 'https://i.ibb.co/F8CkxM9/q.png',
  R: 'https://i.ibb.co/WBSmpRv/r.png',
  S: 'https://i.ibb.co/ySfrR1p/s.png',
  T: 'https://i.ibb.co/8Xn0xnZ/t.png',
  U: 'https://i.ibb.co/WGnXzmB/u.png',
  V: 'https://i.ibb.co/Vp7jt0N/v.png',
  W: 'https://i.ibb.co/0CPqbcM/w.png',
  X: 'https://i.ibb.co/pwsDkmz/x.png',
  Y: 'https://i.ibb.co/Fx0ZfyL/y.png',
  Z: 'https://i.ibb.co/bN6Sxk9/z.png' });



image.onChange(loadTexture);

//let random = gui.add(opts, 'randomImage');//this option removed from GUI
//let influence = gui.add(opts, 'mouseInfluence', 0, 200).step(1);
//let gravity = gui.addopts, 'gravity', 0, 1000).step(20);
//let friction = gui.add(opts, 'friction', 0.5, 1).step(0.005);
//let bounce = gui.add(opts, 'bounce', 0, 2).step(0.1);

//Changed pinCorners to HangDrop


var pin = gui.add(opts, 'HangDrop');
pin.onChange(loadTexture);

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

ctx.strokeStyle = '#555';

var mouse = {

  down: false,
  x: 0,
  y: 0,
  px: 0,
  py: 1


  /*////////////////////////////////////////*/ };

var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: true });

document.body.insertBefore(renderer.view, canvas);
renderer.render(stage);

canvas.width = renderer.width;
canvas.height = renderer.height;


/*////////////////////////////////////////*/

function loadTexture() {

  //I changed opts.image to opts.glyph
  console.log('loading texture', opts.ChangeGlyph);

  document.body.className = 'loading';

  //I changed opts.image to opts.glyph
  var texture = new PIXI.Texture.fromImage(opts.ChangeGlyph);
  if (!texture.requiresUpdate) {texture.update();}

  texture.on('error', function () {console.error('AGH!');});

  texture.on('update', function () {
    document.body.className = '';

    console.log('texture loaded');

    if (mesh) {stage.removeChild(mesh);}

    mesh = new PIXI.mesh.Plane(this, opts.pointsX, opts.pointsY);
    mesh.width = this.width;
    mesh.height = this.height;

    spacingX = mesh.width / (opts.pointsX - 1);
    spacingY = mesh.height / (opts.pointsY - 1);

    //Changed pinCorners to HangDrop

    cloth = new Cloth(opts.pointsX - 1, opts.pointsY - 1, !opts.HangDrop);

    stage.addChild(mesh);
  });
}

loadTexture(opts.image);

;(function update() {
  requestAnimationFrame(update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (cloth) {cloth.update(0.016);}
  renderer.render(stage);
})(0);

/*///////////////////?????????????/////////////////////*/var

Point = function () {
  function Point(x, y) {_classCallCheck(this, Point);
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.vx = 0;
    this.vy = 0;
    this.pinX = null;
    this.pinY = null;

    this.constraints = [];
  }_createClass(Point, [{ key: 'update', value: function update(

    delta) {
      if (this.pinX && this.pinY) return this;

      if (mouse.down) {
        var dx = this.x - mouse.x;
        var dy = this.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (mouse.button === 1 && dist < opts.mouseInfluence) {
          this.px = this.x - (mouse.x - mouse.px);
          this.py = this.y - (mouse.y - mouse.py);
        } else if (dist < mouse.cut) {
          this.constraints = [];
        }
      }

      this.addForce(0, opts.gravity);

      var nx = this.x + (this.x - this.px) * opts.friction + this.vx * delta;
      var ny = this.y + (this.y - this.py) * opts.friction + this.vy * delta;

      this.px = this.x;
      this.py = this.y;

      this.x = nx;
      this.y = ny;

      this.vy = this.vx = 0;

      if (this.x >= canvas.width) {
        this.px = canvas.width + (canvas.width - this.px) * opts.bounce;
        this.x = canvas.width;
      } else if (this.x <= 0) {
        this.px *= -1 * opts.bounce;
        this.x = 0;
      }

      if (this.y >= canvas.height) {
        this.py = canvas.height + (canvas.height - this.py) * opts.bounce;
        this.y = canvas.height;
      } else if (this.y <= 0) {
        this.py *= -1 * opts.bounce;
        this.y = 0;
      }

      return this;
    } }, { key: 'draw', value: function draw()

    {
      var i = this.constraints.length;
      while (i--) {this.constraints[i].draw();}
    } }, { key: 'resolve', value: function resolve()

    {
      if (this.pinX && this.pinY) {
        this.x = this.pinX;
        this.y = this.pinY;
        return;
      }

      this.constraints.forEach(function (constraint) {return constraint.resolve();});
    } }, { key: 'attach', value: function attach(

    point) {
      this.constraints.push(new Constraint(this, point));
    } }, { key: 'free', value: function free(

    constraint) {
      this.constraints.splice(this.constraints.indexOf(constraint), 1);
    } }, { key: 'addForce', value: function addForce(

    x, y) {
      this.vx += x;
      this.vy += y;
    } }, { key: 'pin', value: function pin(

    pinx, piny) {
      this.pinX = pinx;
      this.pinY = piny;
    } }, { key: 'unpin', value: function unpin()

    {
      this.pinX = null;
      this.pinY = null;
    } }]);return Point;}();


/*///////////////////?????????????/////////////////////*/var


Constraint = function () {
  function Constraint(p1, p2, length) {_classCallCheck(this, Constraint);
    this.p1 = p1;
    this.p2 = p2;
    this.length = length || spacingX;
  }_createClass(Constraint, [{ key: 'resolve', value: function resolve()

    {
      var dx = this.p1.x - this.p2.x;
      var dy = this.p1.y - this.p2.y;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.length) return;

      var diff = (this.length - dist) / dist;

      //if (dist > tearDist) this.p1.free(this)

      var mul = diff * 0.5 * (1 - this.length / dist);

      var px = dx * mul;
      var py = dy * mul;

      !this.p1.pinX && (this.p1.x += px);
      !this.p1.pinY && (this.p1.y += py);
      !this.p2.pinX && (this.p2.x -= px);
      !this.p2.pinY && (this.p2.y -= py);

      return this;
    } }, { key: 'draw', value: function draw()

    {
      ctx.moveTo(this.p1.x, this.p1.y);
      ctx.lineTo(this.p2.x, this.p2.y);
    } }]);return Constraint;}();


/*///////////////////?????????????/////////////////////*/

var count = 0;var

Cloth = function () {
  function Cloth(clothX, clothY, free) {_classCallCheck(this, Cloth);
    this.points = [];

    var startX = canvas.width / 2 - clothX * spacingX / 2;
    var startY = canvas.height * 0.2;

    for (var y = 0; y <= clothY; y++) {
      for (var x = 0; x <= clothX; x++) {
        var point = new Point(
        startX + x * spacingX - spacingX * Math.sin(y),
        y * spacingY + startY + (y !== 0 ? 5 * Math.cos(x) : 0));

        !free && y === 0 && point.pin(point.x, point.y);
        x !== 0 && point.attach(this.points[this.points.length - 1]);
        y !== 0 && point.attach(this.points[x + (y - 1) * (clothX + 1)]);

        this.points.push(point);
      }
    }

  }_createClass(Cloth, [{ key: 'update', value: function update(

    delta) {
      var i = accuracy;

      while (i--) {
        this.points.forEach(function (point) {
          point.resolve();
        });
      }

      ctx.beginPath();

      this.points.forEach(function (point, i) {
        point.update(delta * delta);

        if (opts.renderCloth) {point.draw();}

        if (mesh) {
          i *= 2;
          mesh.vertices[i] = point.x;
          mesh.vertices[i + 1] = point.y;
        }
      });
      ctx.stroke();
    } }]);return Cloth;}();

function pointerMove(e) {
  var pointer = e.touches ? e.touches[0] : e;
  mouse.px = mouse.x || pointer.clientX;
  mouse.py = mouse.y || pointer.clientY;
  mouse.x = pointer.clientX;
  mouse.y = pointer.clientY;
}
function pointerDown(e) {
  mouse.down = true;
  mouse.button = 1;
  pointerMove(e);
}
function pointerUp(e) {
  mouse.down = false;
  mouse.px = null;
  mouse.py = null;
  console.log('pointer up');
}
document.body.addEventListener('mousedown', pointerDown);
document.body.addEventListener('touchstart', pointerDown);
document.body.addEventListener('mousemove', pointerMove);
document.body.addEventListener('touchmove', pointerMove);
document.body.addEventListener('mouseup', pointerUp);
document.body.addEventListener('touchend', pointerUp);
document.body.addEventListener('mouseleave', pointerUp);

///////////////////END FLAG MESH
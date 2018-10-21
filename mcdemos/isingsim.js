var lx = 40;
var ly = 40;
var K = 10;
var spinConf = [];
var dx = 10;

var runner;

function runSim() {
  var ix = Math.floor(Math.random() * lx);
  var iy = Math.floor(Math.random() * ly);
  var i = ix*ly + iy;
  var ix1 = (ix+lx-1) % lx;
  var ix2 = (ix+1) % lx;
  var iy1 = (iy+ly-1) % ly;
  var iy2 = (iy+1) % ly;

  var neighb = [];
  neighb[0] = ix1*ly + iy;
  neighb[1] = ix2*ly + iy;
  neighb[2] = ix*ly + iy1;
  neighb[3] = ix*ly + iy2;

  var de = 0.;
  for (x = 0; x < 4; x++) {
    de += 2. * K * spinConf[i] * spinConf[neighb[x]];
  }
  if (Math.random() < Math.exp(- K * de)) {
    spinConf[i] = - spinConf[i];
    var canvas = document.getElementById('ising2d');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      if (spinConf[i] > 0)
        ctx.fillStyle = 'rgb(200, 0, 0)';
      else ctx.fillStyle = 'rgb(0, 0, 200)';
      ctx.fillRect(ix*dx, iy*dx, dx, dx);

    }
  }
}

function init() {
  for (i=0; i<lx*ly; i++)
    spinConf[i]=Math.random()>0.5?+1:-1;

  var canvas = document.getElementById('ising2d');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    for (i=0; i<ly; i++) {
      for (j=0; j<ly; j++) {
        if (spinConf[i*ly + j] > 0)
          ctx.fillStyle = 'rgb(200, 0, 0)';
        else ctx.fillStyle = 'rgb(0, 0, 200)';
        ctx.fillRect(i*dx, j*dx, dx, dx);
      }
    }

  }
  runner = setInterval(runSim, 1);
}

function setTemp() {
  temp = Math.exp(document.getElementById('temp').value);
  K = 1/temp;
}

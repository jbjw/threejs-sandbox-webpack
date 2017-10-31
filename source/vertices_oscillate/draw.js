function draw() {
	var canvas = document.querySelector( 'canvas' );
	if ( canvas.getContext ){
		var ctx = canvas.getContext('2d');
	}
}

const pixels =
function draw() {
      var canvas = document.getElementById( 'canvas' );
      if (canvas.getContext) {
        var ctx = canvas.getContext( '2d' );

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 50, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 50, 50);
      }
    }




function getpixelamount(canvas, r, g, b) {
  var cx = canvas.getContext('2d');
  var pixels = cx.getImageData(0, 0, canvas.width, canvas.height);
  var all = pixels.data.length;
  var amount = 0;
  for (i = 0; i < all; i += 4) {
    if (pixels.data[i] === r &&
        pixels.data[i + 1] === g &&
        pixels.data[i + 2] === b) {
      amount++;
    }
  }
  return amount;
};

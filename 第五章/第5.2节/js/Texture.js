var vertexSource =  ' attribute vec4 aPosition;\n'
 + ' attribute vec2 aUv;\n'
 + 'varying vec2 vUv;\n'
 + ' void main(){\n '
 + '  vUv = aUv;\n'
 + ' gl_Position = aPosition;\n' // 设置顶点位置
 + '}'; 
var fragmentSource=  ' precision mediump float;\n '
 + ' varying vec2 vUv;\n'
 + ' uniform sampler2D uTexture;\n'
 + ' void main(void){\n'
 + 'gl_FragColor = texture2D(uTexture, vUv);\n' // 设置颜色
 + '}';


function load(){
	var gl = window.gl= utils.getWebGLContext('webgl');
	if(gl == null){
		console.log("Get WebGL Context fail");
		return;
	}
	gl.clearColor(0.0,0.0,1.0,1.0);//设置背景色为蓝色
	var program = utils.buildProgram(gl,vertexSource,fragmentSource); // 创建着色器程序 
     // 获取attribute变量的存储位置
      var aPosition =  gl.getAttribLocation(program,'aPosition');
      if(aPosition < 0){
     	  console.log("Get attribute variable aPositiona's location fail");
     	   return;
      }
      var aUv = gl.getAttribLocation(program,'aUv');
       if(aUv == null){
          console.log("Failed get unifrom variable aUv's location");
          return;
     } 
      // 启用attribute变量使用缓冲区
       gl.enableVertexAttribArray(aPosition);
       gl.enableVertexAttribArray(aUv);

       // 获取uniform变量的存储位置
     
     
     var uTexture = gl.getUniformLocation(program,'uTexture');
       if(uTexture == null){
          console.log("Failed get unifrom variable uTexture's location");
          return;
     }     
    var vertices = new Float32Array([
          -0.5,0.5,
          -0.5,-0.5,
          0.5,0.5,
          0.5,-0.5,
      ]);
      var vertexBuffer = utils.initVertexBufferObject(gl,vertices,2,aPosition);

      var uvs = new Float32Array([
            0.0,1.0, // 左上角
            0.0,0.0, // 左下角
            1.0,1.0, // 右上角
            1.0,0.0, // 右上角
      ]);
      var uvBuffer = utils.initVertexBufferObject(gl,uvs,2,aUv);
      loadTexture(gl,'./images/grid.png',uTexture);
}

function loadTexture(gl,src,uTexture){
      var image = new Image();
      image.src = src;
      image.onload = function (argument) {
          var texture = gl.createTexture();
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          gl.activeTexture(gl.TEXTURE1); // 激活gl.TEXTURE1
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.uniform1i(uTexture, 1);

          gl.clear(gl.COLOR_BUFFER_BIT);//清空
          gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
      }
}
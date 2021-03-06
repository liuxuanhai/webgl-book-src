var vertexSource =  ' attribute vec4 aPosition;\n'
+  'attribute float aPointSize;'
 + ' void main(){\n '
 + ' gl_Position = aPosition;\n' // 设置点位置
 + '}'; 
var fragmentSource= 'void main(){\n'
+ 'gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n' // 设置颜色
+ '}';

function load(){
	var gl = window.gl= utils.getWebGLContext('webgl');
	if(gl == null){
		console.log("Get WebGL Context fail");
		return;
	}
	gl.clearColor(0.0,0.0,1.0,1.0);//设置背景色为蓝色
	gl.clear(gl.COLOR_BUFFER_BIT);//清空
	var program = utils.buildProgram(gl,vertexSource,fragmentSource); // 创建着色器程序
     
     // 获取attribute变量的存储位置
     var aPosition =  gl.getAttribLocation(program,'aPosition');
      if(aPosition < 0){
     	  console.log("Get attribute variable aPositiona's location fail");
     	   return;
     }
      var vertices1 = new Float32Array([
         -0.9,0.9,
         -0.9,0.3,
         -0.3,0.9,
         -0.3,0.3,

         -0.9 + 1,0.9,
         -0.9 + 1,0.3,
         -0.3 + 1,0.9,
         -0.3 + 1,0.3,

         -0.9,0.9 - 1,
         -0.9,0.3 - 1,
         -0.3,0.9 - 1,
         -0.3,0.3 - 1
      ]);
      utils.initVertexBufferObject(gl,vertices1,2,aPosition);
      gl.drawArrays(gl.TRIANGLES,0,4);
      gl.drawArrays(gl.TRIANGLE_STRIP,4,4);
      gl.drawArrays(gl.TRIANGLE_FAN,8,4);
}




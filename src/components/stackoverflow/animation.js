// // var controls = new THREE.OrbitControls(camera, renderer.domElement);

// // scene.add(new THREE.GridHelper(20, 40));

// // var curve = new THREE.CatmullRomCurve3([
// //   new THREE.Vector3(-10, 0, 10),
// //   new THREE.Vector3(-5, 5, 5),
// //   new THREE.Vector3(0, 0, 0),
// //   new THREE.Vector3(5, -5, 5),
// //   new THREE.Vector3(10, 0, 10),
// // ]);

// // var points = curve.getPoints(50);

// // var geometry = new THREE.BufferGeometry().setFromPoints(points);

// // var material = new THREE.LineBasicMaterial({
// //   color: 0x00ffff,
// // });

// // var curveObject = new THREE.Line(geometry, material);

// // scene.add(curveObject);

// // var clock = new THREE.Clock();
// // var time = 0;

// // render();

// // function resize(renderer) {
// //   const canvas = renderer.domElement;
// //   const width = canvas.clientWidth;
// //   const height = canvas.clientHeight;
// //   const needResize = canvas.width !== width || canvas.height !== height;
// //   if (needResize) {
// //     renderer.setSize(width, height, false);
// //   }
// //   return needResize;
// // }

// // function render() {
// //   if (resize(renderer)) {
// //     camera.aspect = canvas.clientWidth / canvas.clientHeight;
// //     camera.updateProjectionMatrix();
// //   }
// //   renderer.render(scene, camera);

// //   time += clock.getDelta();

// //   curve.points[1].y = Math.sin(time) * 2.5;

// //   geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));

// //   curveObject.geometry.dispose();
// //   curveObject.geometry = geometry;

// //   requestAnimationFrame(render);
// // }

// var curveArr = [];

//     var curveDensity = 3;
//     for (var i = 0; i < curveDensity; i++) {
//       var curve = new THREE.CatmullRomCurve3([
//         new THREE.Vector3(-10, 0, i * 10),
//         new THREE.Vector3(-5, 0, i * 10),
//         new THREE.Vector3(0, 0, i * 10),
//         new THREE.Vector3(5, 0, i * 10),
//         new THREE.Vector3(10, 0, i * 10),
//       ]);
//       curveArr.push(curve);
//     }

//     var indices = [];
//     var points = curveArr[0].getPoints(50);
//     var newGeom = new THREE.Geometry();

//     for (var curCurveID = 0; curCurveID < curveArr.length - 1; curCurveID++) {
//       const pointsNext = curveArr[curCurveID + 1].getPoints(50);
//       points = points.concat(pointsNext);

//       for (var ptNum = 0; ptNum < points.length - 1; ptNum++) {
//         var a = curCurveID * 51 + ptNum;
//         var b = curCurveID * 51 + ptNum + 1;
//         var c = (curCurveID + 1) * 51 + ptNum + 1;
//         var d = (curCurveID + 1) * 51 + ptNum;

//         indices.push(a, b, c);
//         indices.push(b, c, d);

//         var f1 = new THREE.Face3(a, b, c);
//         var f2 = new THREE.Face3(b, c, d);

//         newGeom.faces.push(f1);
//         newGeom.faces.push(f2);
//       }
//     }
//     newGeom.vertices.concat(points);
//     newGeom.computeBoundingSphere();

//     // var sphereMat = new THREE.MeshBasicMaterial({ color: "red" });
//     // var sphereMesh = new THREE.Mesh(newGeom, sphereMat);
//     // this.scene.add(sphereMesh);

//     // this.scene.add(sphereMesh);
//     // var ribbonGeom = new THREE.BufferGeometry().setFromPoints(points);
//     // ribbonGeom.setAttribute("position", points);
//     // ribbonGeom.setIndex(indices);
//     // ribbonGeom.computeVertexNormals();
//     // var ribbon = new THREE.Mesh(
//     //   ribbonGeom,
//     //   new THREE.MeshBasicMaterial({ color: 0xffff00 })
//     // );

//     const material = new THREE.PointsMaterial({ color: "blue" });
//     const pointsC = new THREE.Points(newGeom, material);
//     pointsC.setSize = 10;
//     this.scene.add(pointsC);

//     var points1 = curveArr[1].getPoints(50);
//     var line = new THREE.Line(
//       new THREE.BufferGeometry().setFromPoints(points1),
//       new THREE.LineBasicMaterial({
//         color: "red",
//       })
//     );
//     this.scene.add(line);

//     var points2 = curveArr[2].getPoints(50);
//     var line2 = new THREE.Line(
//       new THREE.BufferGeometry().setFromPoints(points2),
//       new THREE.LineBasicMaterial({
//         color: "red",
//       })
//     );
//     this.scene.add(line2);

//     const geometryb = new THREE.BoxGeometry(5, 5, 5);
//     const materialb = new THREE.MeshBasicMaterial({ color: "#433F81" });
//     this.cube = new THREE.Mesh(geometryb, materialb);
//     this.cube.position.x = 10;
//     this.cube.position.y = 10;
//     this.cube.position.z = 0;
//     // this.scene.add(this.cube);

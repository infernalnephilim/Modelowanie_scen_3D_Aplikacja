/*******************************************************************
********************************************************************
Modelowanie scen 3D z wykorzystaniem Pixi.js
Aplikacja licencjacka

Aleksandra Półtorak
********************************************************************
*******************************************************************/

$(function() {

// Statystyki
  var stats = new Stats();
  stats.showPanel(1);

/*******************************************************************
	Funkcja render()
*******************************************************************/ 
  var render = function() {
    stats.begin();
    requestAnimationFrame(render);

    controls.update();
    pixiCanvas.render(pixiScene);
    renderer.render(scene, camera);
    stats.end();
  };

/*******************************************************************
	Funkcja chowajaca ekran ladowania
*******************************************************************/

  function hide_loader() {
    $(".loader-wrapper").fadeOut(1000);
  }

/*******************************************************************
	Funkcje otwierajace i zamykajace okno informacyjne
*******************************************************************/
  $("#info-img").click(function(){
	  $(this).fadeOut();
	  $("#info-img2").fadeIn();
	  $(".info").toggleClass("hide-right");
	  $(".info").toggleClass("show-right");	
	  $("#footer-author").toggleClass("white-color");	
	  $("#footer-author").toggleClass("black-color");		  
  }); 
  
  $("#info-img2").click(function(){
	  $(this).fadeOut();
	  $("#info-img").fadeIn();
	  $(".info").toggleClass("hide-right");
	  $(".info").toggleClass("show-right");	
	  $("#footer-author").toggleClass("white-color");	
	  $("#footer-author").toggleClass("black-color");		  
  });
  
  
/*******************************************************************
	Inicjalizacja Three.js i Pixi.js
*******************************************************************/
  // Three.js
  var scene = new THREE.Scene();
  var aspect = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(45, aspect, 1, 20000);
  var renderer = new THREE.WebGLRenderer({antialias: true} );
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor( 0x87CEEB, 1);
  renderer.shadowMapEnabled = true;
  renderer.shadowMapType = THREE.PCFSoftShadowMap;

  document.body.appendChild(renderer.domElement);

  // Pixi.js
  var width = 1024;
  var height = 1024;
  var pixiScene = new PIXI.Container();
  var pixiCanvas = PIXI.autoDetectRenderer(width, height, {
    transparent: true
  });

  // Zaladowanie obrazkow
  var loader = PIXI.loader
    .add('plasterImage', 'tekstury/tynk.png')
    .add('balconyImage', 'tekstury/balcony.png')
    .add('garageDoorImage', 'tekstury/brama.png')
    .add('roofTilesImage', 'tekstury/dach2.png')
    .add('roofTilesImageB', 'tekstury/dachb.png')
    .add('clinkerImage', 'tekstury/klinkier.png')
    .add('luxferImage', 'tekstury/luxfer.png')
    .add('windowImage', 'tekstury/okno.png')
    .add('windowsillImage', 'tekstury/parapet.png')
    .add('tileImage', 'tekstury/plytka.png')
    .add('stairsTileImage', 'tekstury/plytka2.png')
    .add('columnImage', 'tekstury/column.png')
	.add('windowImageB', 'tekstury/oknoB.png')
	.add('doorImage', 'tekstury/door.png')
	.add('waterImage', 'tekstury/water.png')
    .once('complete', function(loader, resources) {

  // Wywolanie funkcji render() dopiero po zakończeniu wykonywania init()
      $.ajax({
        url: init(),
        success: function() {
          render();
          hide_loader();
          document.body.appendChild(stats.dom);
        }
      })
    })
    .load();
	
  // Zmiana wielkosci renderera wraz ze zmiana wielkosci okna
	$( window ).resize(function() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
		  
	});

/*******************************************************************
	Materialy
*******************************************************************/
  var material = new THREE.MeshLambertMaterial({
    color: 0xA95520,
    shininess: 30,
    shading: THREE.FlatShading
  });
  var material_2 = new THREE.MeshLambertMaterial({
    color: 0xFFE9CD,
    roughness: 1,
    shading: THREE.FlatShading
  });
  var material_3 = new THREE.MeshLambertMaterial({
    color: 0xe27f3d,
    shininess: 30,
    shading: THREE.FlatShading
  });

  var material_glass = new THREE.MeshBasicMaterial({
    color: 0xccddff,
    'transparent': true,
    'opacity': 0.4,
    refractionRatio: 0.98,
    reflectivity: 0.9
  });

  var material_wood = new THREE.MeshLambertMaterial({
    color: 0x814024
  });

  var groundMaterial = new THREE.MeshLambertMaterial({
    color: 0x32CD32
  });

  var skyMaterial = new THREE.MeshLambertMaterial({
    color: 0x87CEEB,
	'transparent': true,
    'opacity': 0.1,
    side: THREE.BackSide
  });

  var plasterMaterial = new THREE.MeshPhongMaterial({
	  color: 0xffffff
	});

  var balconyFenceMaterial = new THREE.MeshPhongMaterial({
	  color: 0xc99d82
  });

  var garageDoorMaterial = new THREE.MeshPhongMaterial({
	  color: 0xc99d82
  });

  var balconyTilesMaterial = new THREE.MeshPhongMaterial({});

  var roofTileMaterial = new THREE.MeshPhongMaterial();
  var roofTileMaterialB = new THREE.MeshPhongMaterial();
  var roofTileMaterialC = new THREE.MeshPhongMaterial();
  var clinkerMaterial = new THREE.MeshPhongMaterial();
  var clinkerMaterialB = new THREE.MeshPhongMaterial();

  var luxferMaterial = new THREE.MeshBasicMaterial({
    'transparent': true,
    'opacity': 0.8,
    refractionRatio: 0.98,
    reflectivity: 0.9
  });
  var luxferMaterialB = new THREE.MeshBasicMaterial({
    'transparent': true,
    'opacity': 0.8,
    refractionRatio: 0.98,
    reflectivity: 0.9
  });
  var luxferMaterialC = new THREE.MeshBasicMaterial({
    'transparent': true,
    'opacity': 0.8,
    refractionRatio: 0.98,
    reflectivity: 0.9
  });
  var windowMaterial = new THREE.MeshPhongMaterial();
  var windowsillMaterial = new THREE.MeshPhongMaterial();
  var tileMaterial = new THREE.MeshPhongMaterial();
  var tileMaterialB = new THREE.MeshPhongMaterial();
  
  var stairsTileMaterial = new THREE.MeshLambertMaterial({
	  color: 0xfce9de
  });
  var columnMaterial = new THREE.MeshPhongMaterial({
	 color: 0xffffff 
  });
  
  var windowBMaterial = new THREE.MeshPhongMaterial();
  var doorMaterial = new THREE.MeshPhongMaterial({
	  color: 0x9b8277
  });
  
  var lampMaterialA = new THREE.MeshPhongMaterial({
	  color: 0x878787,
	  emissive: 0x000000,
	  roughness: 0.72,
	  metalness: 1,
	  shading: THREE.SmoothShading
  });
  var lampMaterialB = new THREE.MeshPhongMaterial({
	  color: 0xffffff,
	  emissive: 0x989265,
	  roughness: 0,
	  metalness: 0.76,
	  shading: THREE.SmoothShading
  });
  
  var doorHandleMaterial = new THREE.MeshPhongMaterial({
		color: 0x83898c,
		emissive: 0x000000,
		  roughness: 0,
		  metalness: 0.76,
		  shading: THREE.SmoothShading,
		  shininess: 100
  });
  var doorHandleMaterial2 = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		emissive: 0x000000,
		  roughness: 0,
		  metalness: 0.76,
		  shading: THREE.SmoothShading
  });
  var waterMaterial = new THREE.MeshBasicMaterial({
    color: 0xccddff,
    'transparent': true,
    'opacity': 0.5,
    refractionRatio: 0.98,
    reflectivity: 0.9
  });
  
/*******************************************************************
	Inicjalizacja Three.js i Pixi.js
*******************************************************************/
	var house = new THREE.Object3D();
	
/*******************************************************************
	Funkcja tworząca tekstury w Pixi.js
*******************************************************************/	
  function init() {
    var sprite1 = new PIXI.Sprite(PIXI.loader.resources.plasterImage.texture);
    var sprite2 = new PIXI.Sprite(PIXI.loader.resources.balconyImage.texture);
    var sprite3 = new PIXI.Sprite(PIXI.loader.resources.garageDoorImage.texture);
    var sprite4 = new PIXI.Sprite(PIXI.loader.resources.roofTilesImage.texture);
    var sprite4b = new PIXI.Sprite(PIXI.loader.resources.roofTilesImageB.texture);
    var sprite5 = new PIXI.Sprite(PIXI.loader.resources.clinkerImage.texture);
    var sprite6 = new PIXI.Sprite(PIXI.loader.resources.luxferImage.texture);
    var sprite7 = new PIXI.Sprite(PIXI.loader.resources.windowImage.texture);
    var sprite8 = new PIXI.Sprite(PIXI.loader.resources.windowsillImage.texture);
    var sprite9 = new PIXI.Sprite(PIXI.loader.resources.tileImage.texture);
    var sprite10 = new PIXI.Sprite(PIXI.loader.resources.stairsTileImage.texture);
    var sprite11 = new PIXI.Sprite(PIXI.loader.resources.columnImage.texture);
    var sprite12 = new PIXI.Sprite(PIXI.loader.resources.windowImageB.texture);
    var sprite13 = new PIXI.Sprite(PIXI.loader.resources.doorImage.texture);
    var sprite14 = new PIXI.Sprite(PIXI.loader.resources.waterImage.texture);

    pixiScene.addChild(sprite1);

    var rt2 = new PIXI.RenderTexture(pixiCanvas, width, height, PIXI.SCALE_MODES.LINEAR, 1);

    rt2.render(pixiScene);
    var can2 = rt2.getCanvas();
    //document.body.appendChild(can2);

    var texture = new THREE.Texture(can2);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.x = 1000;
    texture.repeat.set(3, 3);

    texture.needsUpdate = true;

    plasterMaterial.map = texture;
    plasterMaterial.side = THREE.DoubleSide;

    for (var i = pixiScene.children.length - 1; i >= 0; i--) {
      pixiScene.removeChild(pixiScene.children[i]);
    };

    pixiScene.addChild(sprite2);
    rt2 = new PIXI.RenderTexture(pixiCanvas, width, height, PIXI.SCALE_MODES.LINEAR, 1);
    rt2.render(pixiScene);
    var can3 = rt2.getCanvas();
    //document.body.appendChild(can3);

    var balconyFenceTexture = new THREE.Texture(can3);
    balconyFenceTexture.wrapS = balconyFenceTexture.wrapT = THREE.RepeatWrapping;
    //balconyFenceTexture.offset.x = 0;
    balconyFenceTexture.offset.y = 0.1;
    balconyFenceTexture.repeat.set(1, 0.9);
    balconyFenceTexture.needsUpdate = true;

    balconyFenceMaterial.map = balconyFenceTexture;
    balconyFenceMaterial.side = THREE.DoubleSide;
    balconyFenceMaterial.transparent = true;

    for (var i = pixiScene.children.length - 1; i >= 0; i--) {
      pixiScene.removeChild(pixiScene.children[i]);
    };

    pixiScene.addChild(sprite3);

    rt2 = new PIXI.RenderTexture(pixiCanvas, width, height, PIXI.SCALE_MODES.LINEAR, 1);
    rt2.render(pixiScene);
    var can4 = rt2.getCanvas();
    //document.body.appendChild(can4);

    var garageDoorTexture = new THREE.Texture(can4);
    garageDoorTexture.wrapS = garageDoorTexture.wrapT = THREE.RepeatWrapping;
    garageDoorTexture.repeat.set(1, 1);
    garageDoorTexture.needsUpdate = true;

    garageDoorMaterial.map = garageDoorTexture;
    garageDoorMaterial.side = THREE.DoubleSide;
    garageDoorMaterial.transparent = true;

    for (var i = pixiScene.children.length - 1; i >= 0; i--) {
      pixiScene.removeChild(pixiScene.children[i]);
    };

    pixiScene.addChild(sprite4);

    rt2 = new PIXI.RenderTexture(pixiCanvas, width, height, PIXI.SCALE_MODES.LINEAR, 1);
    rt2.render(pixiScene);
    var can5 = rt2.getCanvas();
    //document.body.appendChild(can5);

    var roofTileTexture = new THREE.Texture(can5);
    roofTileTexture.wrapS = roofTileTexture.wrapT = THREE.RepeatWrapping;
    roofTileTexture.repeat.set(1, 1);
    roofTileTexture.needsUpdate = true;

    roofTileMaterial.map = roofTileTexture;
	
	var roofTileTextureB = new THREE.Texture(can5);
    roofTileTextureB.wrapS = roofTileTextureB.wrapT = THREE.RepeatWrapping;
    roofTileTextureB.repeat.set(0.5, 0.5);
    roofTileTextureB.needsUpdate = true;

    roofTileMaterialB.map = roofTileTextureB; 
	
	for (var i = pixiScene.children.length - 1; i >= 0; i--) {
      pixiScene.removeChild(pixiScene.children[i]);
    };
	pixiScene.addChild(sprite4b);
	rt2 = new PIXI.RenderTexture(pixiCanvas, width, height, PIXI.SCALE_MODES.LINEAR, 1);
    rt2.render(pixiScene);
	var can5b = rt2.getCanvas();
	
	var roofTileTextureC = new THREE.Texture(can5b);
    roofTileTextureC.wrapS = roofTileTextureC.wrapT = THREE.RepeatWrapping;
    roofTileTextureC.repeat.set(1.2, 1.2);
    roofTileTextureC.needsUpdate = true;

    roofTileMaterialC.map = roofTileTextureC; 

    for (var i = pixiScene.children.length - 1; i >= 0; i--) {
      pixiScene.removeChild(pixiScene.children[i]);
    };

    pixiScene.addChild(sprite5);

    rt2 = new PIXI.RenderTexture(pixiCanvas, width, height, PIXI.SCALE_MODES.LINEAR, 1);
    rt2.render(pixiScene);
    var can6 = rt2.getCanvas();
    //document.body.appendChild(can6);

    var clinkerTexture = new THREE.Texture(can6);
    clinkerTexture.wrapS = clinkerTexture.wrapT = THREE.RepeatWrapping;
    //clinkerTexture.offset.x = 0;
    // clinkerTexture.offset.y = -100;
    clinkerTexture.repeat.set(15, 1);
    clinkerTexture.needsUpdate = true;

    clinkerMaterial.map = clinkerTexture;
    clinkerMaterial.side = THREE.DoubleSide;
    clinkerMaterial.transparent = true;

    var clinkerTextureB = new THREE.Texture(can6);
    clinkerTextureB.wrapS = clinkerTextureB.wrapT = THREE.RepeatWrapping;
    //clinkerTexture.offset.x = 0;
    // clinkerTexture.offset.y = -100;
    clinkerTextureB.repeat.set(5, 1);
    clinkerTextureB.needsUpdate = true;

    clinkerMaterialB.map = clinkerTexture;
    clinkerMaterialB.side = THREE.DoubleSide;
    clinkerMaterialB.transparent = true;

    for (var i = pixiScene.children.length - 1; i >= 0; i--) {
      pixiScene.removeChild(pixiScene.children[i]);
    };

    pixiScene.addChild(sprite6);

    rt2 = new PIXI.RenderTexture(pixiCanvas, width, height, PIXI.SCALE_MODES.LINEAR, 1);
    rt2.render(pixiScene);
    var can7 = rt2.getCanvas();
    //document.body.appendChild(can7);

    var luxferTexture = new THREE.Texture(can7);
    luxferTexture.wrapS = luxferTexture.wrapT = THREE.RepeatWrapping;
    luxferTexture.repeat.set(0.5, 3);
    luxferTexture.needsUpdate = true;

    luxferMaterial.map = luxferTexture;
    luxferMaterial.side = THREE.DoubleSide;
    luxferMaterial.transparent = true;
	
	var luxferTextureB = new THREE.Texture(can7);
    luxferTextureB.wrapS = luxferTextureB.wrapT = THREE.RepeatWrapping;
    luxferTextureB.repeat.set(1, 3);
    luxferTextureB.needsUpdate = true;

    luxferMaterialB.map = luxferTextureB;
    luxferMaterialB.side = THREE.DoubleSide;
    luxferMaterialB.transparent = true;
	
	var luxferTextureC = new THREE.Texture(can7);
    luxferTextureC.wrapS = luxferTextureC.wrapT = THREE.RepeatWrapping;
    luxferTextureC.repeat.set(1, 1);
    luxferTextureC.needsUpdate = true;

    luxferMaterialC.map = luxferTextureC;
    luxferMaterialC.side = THREE.DoubleSide;
    luxferMaterialC.transparent = true;
	
	for (var i = pixiScene.children.length - 1; i >= 0; i--) {
      pixiScene.removeChild(pixiScene.children[i]);
    };

    pixiScene.addChild(sprite7);

    rt2 = new PIXI.RenderTexture(pixiCanvas, width, height, PIXI.SCALE_MODES.LINEAR, 1);
    rt2.render(pixiScene);
    var can8 = rt2.getCanvas();
    //document.body.appendChild(can8);

    var windowTexture = new THREE.Texture(can8);
    windowTexture.wrapS = windowTexture.wrapT = THREE.RepeatWrapping;
    //windowTexture.offset.x = 0;
    // windowTexture.offset.y = -100;
    windowTexture.repeat.set(1, 1);
    windowTexture.needsUpdate = true;

    windowMaterial.map = windowTexture;
    windowMaterial.side = THREE.DoubleSide;
    windowMaterial.transparent = true;
	
	for (var i = pixiScene.children.length - 1; i >= 0; i--) {
      pixiScene.removeChild(pixiScene.children[i]);
    };

    pixiScene.addChild(sprite8);

    rt2 = new PIXI.RenderTexture(pixiCanvas, width, height, PIXI.SCALE_MODES.LINEAR, 1);
    rt2.render(pixiScene);
    var can88 = rt2.getCanvas();
    //document.body.appendChild(can88);

    var windowsillTexture = new THREE.Texture(can88);
    windowsillTexture.wrapS = windowsillTexture.wrapT = THREE.RepeatWrapping;
    //windowsillTexture.offset.x = 0;
    // windowsillTexture.offset.y = -100;
    windowsillTexture.repeat.set(1, 1);
    windowsillTexture.needsUpdate = true;

    windowsillMaterial.map = windowsillTexture;
    windowsillMaterial.side = THREE.DoubleSide;
    windowsillMaterial.transparent = true;
	
	for (var i = pixiScene.children.length - 1; i >= 0; i--) {
      pixiScene.removeChild(pixiScene.children[i]);
    };

    pixiScene.addChild(sprite9);

    rt2 = new PIXI.RenderTexture(pixiCanvas, width, height, PIXI.SCALE_MODES.LINEAR, 1);
    rt2.render(pixiScene);
    var can9 = rt2.getCanvas();
    //document.body.appendChild(can9);

    var tileTexture = new THREE.Texture(can9);
    tileTexture.wrapS = tileTexture.wrapT = THREE.RepeatWrapping;
    //tileTexture.offset.x = 0;
    // tileTexture.offset.y = -100;
    tileTexture.repeat.set(8, 16);
    tileTexture.needsUpdate = true;

    tileMaterial.map = tileTexture;
    tileMaterial.side = THREE.DoubleSide;
    tileMaterial.transparent = true;
	
	var tileTextureB = new THREE.Texture(can9);
    tileTextureB.wrapS = tileTextureB.wrapT = THREE.RepeatWrapping;
    //tileTexture.offset.x = 0;
    // tileTexture.offset.y = -100;
    tileTextureB.repeat.set(2, 2);
    tileTextureB.needsUpdate = true;

    tileMaterialB.map = tileTextureB;
    tileMaterialB.side = THREE.DoubleSide;
    tileMaterialB.transparent = true;
	
	for (var i = pixiScene.children.length - 1; i >= 0; i--) {
      pixiScene.removeChild(pixiScene.children[i]);
    };

    pixiScene.addChild(sprite10);

    rt2 = new PIXI.RenderTexture(pixiCanvas, width, height, PIXI.SCALE_MODES.LINEAR, 1);
    rt2.render(pixiScene);
    var can10 = rt2.getCanvas();
    //document.body.appendChild(can10);

    var stairsTileTexture = new THREE.Texture(can10);
    stairsTileTexture.wrapS = stairsTileTexture.wrapT = THREE.RepeatWrapping;
    //stairsTileTexture.offset.x = 0;
    // stairsTileTexture.offset.y = -100;
    stairsTileTexture.repeat.set(3, 3);
    stairsTileTexture.needsUpdate = true;

    stairsTileMaterial.map = stairsTileTexture;
    stairsTileMaterial.side = THREE.DoubleSide;
    stairsTileMaterial.transparent = true;
	
	for (var i = pixiScene.children.length - 1; i >= 0; i--) {
      pixiScene.removeChild(pixiScene.children[i]);
    };

    pixiScene.addChild(sprite11);

    rt2 = new PIXI.RenderTexture(pixiCanvas, width, height, PIXI.SCALE_MODES.LINEAR, 1);
    rt2.render(pixiScene);
    var can11 = rt2.getCanvas();
    //document.body.appendChild(can11);

    var columnTexture = new THREE.Texture(can11);
    columnTexture.wrapS = columnTexture.wrapT = THREE.RepeatWrapping;
    //columnTexture.offset.x = 0;
    // columnTexture.offset.y = -100;
    columnTexture.repeat.set(3, 6);
    columnTexture.needsUpdate = true;

    columnMaterial.map = columnTexture;
    columnMaterial.side = THREE.DoubleSide;
	
	for (var i = pixiScene.children.length - 1; i >= 0; i--) {
      pixiScene.removeChild(pixiScene.children[i]);
    };

    pixiScene.addChild(sprite12);

    rt2 = new PIXI.RenderTexture(pixiCanvas, width, height, PIXI.SCALE_MODES.LINEAR, 1);
    rt2.render(pixiScene);
    var can12 = rt2.getCanvas();
    //document.body.appendChild(can12);

    var windowBTexture = new THREE.Texture(can12);
    windowBTexture.wrapS = windowBTexture.wrapT = THREE.RepeatWrapping;
    windowBTexture.repeat.set(1.06, 1);
    windowBTexture.needsUpdate = true;
	windowBTexture.offset.x = 0.97;
    windowBMaterial.map = windowBTexture;
    windowBMaterial.side = THREE.DoubleSide;
	
	for (var i = pixiScene.children.length - 1; i >= 0; i--) {
      pixiScene.removeChild(pixiScene.children[i]);
    };

    pixiScene.addChild(sprite13);

    rt2 = new PIXI.RenderTexture(pixiCanvas, width, height, PIXI.SCALE_MODES.LINEAR, 1);
    rt2.render(pixiScene);
    var can13 = rt2.getCanvas();
    //document.body.appendChild(can13);

    var doorTexture = new THREE.Texture(can13);
    doorTexture.wrapS = doorTexture.wrapT = THREE.RepeatWrapping;
    doorTexture.needsUpdate = true;
    doorMaterial.map = doorTexture;
    doorMaterial.side = THREE.DoubleSide;
	
	for (var i = pixiScene.children.length - 1; i >= 0; i--) {
      pixiScene.removeChild(pixiScene.children[i]);
    };
	
	pixiScene.addChild(sprite14);

    rt2 = new PIXI.RenderTexture(pixiCanvas, width, height, PIXI.SCALE_MODES.LINEAR, 1);
    rt2.render(pixiScene);
    var can14 = rt2.getCanvas();
    //document.body.appendChild(can13);

    var waterTexture = new THREE.Texture(can14);
    waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping;
	waterTexture.repeat.set(1, 2);
    waterTexture.needsUpdate = true;
    waterMaterial.map = waterTexture;
    waterMaterial.side = THREE.DoubleSide;
  }

/*******************************************************************
	Wymiary
*******************************************************************/
  var fundsHeight = 0.32;
  var fundsDepth = 10.7;
  var garageHeight = 0.07;
  var wallThickness = 0.35;
  var underWindowWallHeight = 1.12;

  var fundWidth1 = 3.85;
  var fundWidth2 = 3.7;
  var fundWidth3 = 3.85;
  var fundWidth4 = 0.35;
  var fundWidth = fundWidth1 + fundWidth2 + fundWidth3;
  var garageWidth = 7;
  var garageDepth = 7.7;

  var fundsWidth = fundWidth1 + fundWidth2 + fundWidth3 + garageWidth;

  var terraceWidth1 = 4.8;
  var terraceWidth2 = 3.8;
  var terraceWidth3 = 5.16;
  var terraceWidth4 = 4.53;
  var terraceWidth5 = 3.9;
  var terraceWidth6 = 3.7;
  var terraceWidth7 = 4.42;

  var terraceHeight1 = 0.48;
  var terraceHeight2 = 0.34;
  var terraceHeight3 = 0.16;
  var terraceHeight4 = 0.48;

  var terraceDepth1 = 1.8;
  var terraceDepth2 = 1.76;
  var terraceDepth3 = 1.6;
  var terraceDepth4 = 1.3;
  var terraceDepth5 = 1;
  var terraceDepth6 = 0.25;
  var terraceDepth7 = 1.24;

  var windowHeight1 = 1.5;
  var windowHeight2 = 2.3;
  var windowHeight3 = 0.6;

  var windowWidth1 = 1.5;
  var windowWidth2 = 1.8;
  var windowWidth3 = 1.2;
  var windowWidth4 = 0.9;
  var windowWidth5 = 0.6;
  var luxferWindowWidth = 0.3;

  var mainDoorWidth = 1;
  var mainDoorHeight = 2;
  
  var backDoorWidth = 0.9;
  var backDoorHeight = 2;

  var frontWallHeight1 = 7.18;
  var frontWallHeight2 = 8.57 + 0.16;

  var frontWallWidth1 = 3.85;
  var frontWallWidth2 = 3.7;
/******************************************************************************
	Wymiary ścian tylnych
******************************************************************************/
    var backWallHeight1 = 7.18;
    var backWallHeight2 = 8.57 + 0.16;

    var backWallWidth1 = 3.5;
    var backWallWidth2 = 4.4;
	
/******************************************************************************
	Wymiary garażu
******************************************************************************/
	
 var garageWallHeight1 = 4.21;
    var garageWallHeight2 = 6.96;
    var garageDoorHeight = 2.2;
    var garageDoorWidth = 2.5;
/******************************************************************************
	Wymiary dachu
******************************************************************************/	
var roofHeight = 0.17;
    var roofWidth = 7.52;
    var roofWidth2 = 8.48;
    var roofWidth3 = 10.9 - roofWidth;
    var roofWidth4 = 4.75;

    var roofDepth = 6.48;
    var roofDepth2 = 12.5;
    var roofDepth3 = 3.71;
	
   var glassWidth = 0.56;
    var glassWidth2 = 0.93;
    var glassHeight = 1.27;
/******************************************************************************
	Wymiary ścian bok
******************************************************************************/
    var sideWallHeight1 = 4.01;
    var sideWallHeight2 = 3.23;

    var sideWallWidth1 = 3.8;

	
/*******************************************************************
	Funkcja tworzaca podloge
*******************************************************************/	
  createGround();

  function createGround() {
    var groundGeometry = new THREE.PlaneGeometry(2000, 2000);
	
	var poolHoleGeometry = new THREE.CubeGeometry(3.33*5, 1.55*5, 7.09*5);
	
	var groundMesh = new THREE.Mesh(groundGeometry);
	groundMesh.rotation.x = -Math.PI / 2;
	groundMesh.position.y = -fundsHeight/2;
	
	var poolMesh = new THREE.Mesh(poolHoleGeometry);
	poolMesh.applyMatrix(new THREE.Matrix4().makeTranslation(0,(1.55/2-fundsHeight/2)*5,0));
	poolMesh.rotateY(-(22.8 * Math.PI) / 180);
	poolMesh.updateMatrix();
	poolMesh.applyMatrix(new THREE.Matrix4().makeTranslation(5*(-8.29 -4.41/2 + 0.435) ,5*(-1),5*(-8.29/2 - 2.71/2 + 0.335)));
	//scene.add(poolMesh);
	
	var ground_BSP_A = new ThreeBSP(groundMesh);
	var pool_BSP = new ThreeBSP(poolMesh);
	
	var ground_BSP = ground_BSP_A.subtract(pool_BSP);
	
    var ground = ground_BSP.toMesh(groundMaterial);
	
    
    ground.doubleSided = true;
    ground.receiveShadow = true;
    scene.add(ground);
	
  }

/*******************************************************************
	Funkcja tworzaca niebo
*******************************************************************/
 createSky();

  function createSky() {
    //var skyGeometry = new THREE.CubeGeometry(1000, 1000, 1000);
    var skyGeometry = new THREE.SphereBufferGeometry(1000, 32, 32);
    var skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
    skyMesh.flipSided = true;
	skyMesh.receiveShadow = false;
    scene.add(skyMesh);

  }

/*******************************************************************
	Funkcja tworzaca fundamenty
*******************************************************************/

  createFunds();

  function createFunds() {

    var fundsGeometry1 = new THREE.BoxGeometry(fundWidth1, fundsHeight, fundsDepth);
    var fundsGeometry2 = new THREE.BoxGeometry(fundWidth2, fundsHeight, fundsDepth);
    var fundsGeometry3 = new THREE.BoxGeometry(fundWidth3, fundsHeight, fundsDepth);
    var fundsGeometry4 = new THREE.BoxGeometry(garageWidth, garageHeight, garageDepth);
    var fundsGeometry5 = new THREE.BoxGeometry(fundWidth4, fundsHeight, 0.25);

    var fundMesh1 = new THREE.Mesh(fundsGeometry1);
    var fundMesh2 = new THREE.Mesh(fundsGeometry2);
    var fundMesh3 = new THREE.Mesh(fundsGeometry3);
    var fundMesh4 = new THREE.Mesh(fundsGeometry4);
    var fundMesh5 = new THREE.Mesh(fundsGeometry5);
    var fundMesh6 = new THREE.Mesh(fundsGeometry5);

    fundMesh1.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 / 2, 0, 0));
    fundMesh2.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 + fundWidth2 / 2, 0, -0.25));
    fundMesh3.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 + fundWidth2 + fundWidth3 / 2, 0, 0));
    fundMesh4.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 + fundWidth2 + fundWidth3 + garageWidth / 2, -fundsHeight / 2 + garageHeight / 2, 0));
    fundMesh5.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 - fundWidth4 / 2, 0, -(fundsDepth / 2 + 0.25 / 2)));
    fundMesh6.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 + fundWidth2 + fundWidth4 / 2, 0, -(fundsDepth / 2 + 0.25 / 2)));

    var fundGeometry = new THREE.Geometry();
    fundGeometry.merge(fundMesh1.geometry, fundMesh1.matrix);
    fundGeometry.merge(fundMesh2.geometry, fundMesh2.matrix);
    fundGeometry.merge(fundMesh3.geometry, fundMesh3.matrix);
    fundGeometry.merge(fundMesh4.geometry, fundMesh4.matrix);
    fundGeometry.merge(fundMesh5.geometry, fundMesh5.matrix);
    fundGeometry.merge(fundMesh6.geometry, fundMesh6.matrix);

    var fundsMaterials = [];
    fundsMaterials.push(clinkerMaterial); 
    fundsMaterials.push(clinkerMaterial); 
    fundsMaterials.push(new THREE.MeshLambertMaterial(material_2));
    fundsMaterials.push(new THREE.MeshLambertMaterial({
      color: 0x000000
    })); 
    fundsMaterials.push(clinkerMaterialB); 
    fundsMaterials.push(clinkerMaterialB); 

    var fundMaterial = new THREE.MeshFaceMaterial(fundsMaterials);

    var fund = new THREE.Mesh(fundGeometry, fundMaterial);
    fund.receiveShadow = true;
    fund.castShadow = true;

    var floorGeometry = new THREE.Geometry();
    floorGeometry.merge(fundMesh1.geometry, fundMesh1.matrix);
    floorGeometry.merge(fundMesh2.geometry, fundMesh2.matrix);
    floorGeometry.merge(fundMesh3.geometry, fundMesh3.matrix);
    floorGeometry.merge(fundMesh4.geometry, fundMesh4.matrix);
    floorGeometry.merge(fundMesh5.geometry, fundMesh5.matrix);

    var floor = new THREE.Mesh(floorGeometry, material_2);
    floor.applyMatrix(new THREE.Matrix4().makeTranslation(0.1, 3.24, 0));
    floor.scale.x = 0.99;
    floor.scale.z = 0.99;

    floor.receiveShadow = true;
    floor.castShadow = true;

    var floor2 = floor.clone();

    floor2.position.set(0.1, fundsHeight, 0);
    floor2.scale.y = 0.01;

	house.add(fund);
	house.add(floor);
    /*/scene.add(fund);
    scene.add(floor);/*/
    //scene.add(floor2);
  }
  
/*******************************************************************
	Funkcja tworzaca taras i balkony
*******************************************************************/

  createTerraces();

  function createTerraces() {
    // wyjście na taras
    var terraceShape = new THREE.Shape();
    terraceShape.moveTo(0, 0);
    terraceShape.lineTo(0, 1.3);
    terraceShape.lineTo(0.5, 1.3 + 0.5);
    terraceShape.lineTo(0.5 + 3.8, 1.3 + 0.5);
    terraceShape.lineTo(0.5 * 2 + 3.8, 1.3);
    terraceShape.lineTo(0.5 * 2 + 3.8, 0);
    terraceShape.lineTo(0, 0);

    var extrudeSettingsTerrace = {
      bevelEnabled: false,
      steps: 1,
      amount: 0.48
    };
    var terraceGeometry1 = new THREE.ExtrudeGeometry(terraceShape, extrudeSettingsTerrace);
    var terraceMesh1 = new THREE.Mesh(terraceGeometry1);
    terraceMesh1.rotation.x += ((90 * Math.PI) / 180);
    terraceMesh1.rotation.z += ((90 * Math.PI) / 180);
    terraceMesh1.updateMatrix();
    terraceMesh1.applyMatrix(new THREE.Matrix4().makeTranslation(0, fundsHeight / 4 + 0.48 / 2, -(0.5 * 2 + 3.8) / 2));

    // balkon bok
    var extrudeSettingsBalcony = {
      bevelEnabled: false,
      steps: 1,
      amount: 0.34
    };

    var sideBalconyShape = new THREE.Shape();
    sideBalconyShape.moveTo(0, 0);
    sideBalconyShape.lineTo(0, 0.94);
    sideBalconyShape.lineTo(0.3, 0.94 + 0.3);
    sideBalconyShape.lineTo(0.3 + 3.2, 0.94 + 0.3);
    sideBalconyShape.lineTo(0.3 * 2 + 3.2, 0.94);
    sideBalconyShape.lineTo(0.3 * 2 + 3.2, 0);
    sideBalconyShape.lineTo(0, 0);

    var terraceGeometry2 = new THREE.ExtrudeGeometry(sideBalconyShape, extrudeSettingsBalcony);
    var terraceMesh2 = new THREE.Mesh(terraceGeometry2);
    terraceMesh2.rotation.x += ((90 * Math.PI) / 180);
    terraceMesh2.rotation.z += ((90 * Math.PI) / 180);
    terraceMesh2.updateMatrix();
    terraceMesh2.applyMatrix(new THREE.Matrix4().makeTranslation(0, terraceHeight2 * 1.5 + 2.74 + 0.15, -(0.3 * 2 + 3.2) / 2));
    terraceMesh2.updateMatrix();

    // schody przód - gorny
    var stairShape1 = new THREE.Shape();
    stairShape1.moveTo(0, 0);
    stairShape1.lineTo(0, 0.78);
    stairShape1.lineTo(0.23, 0.78 + 0.23);
    stairShape1.lineTo(0.23 + 3.44, 0.78 + 0.23);
    stairShape1.lineTo(0.23 * 2 + 3.44, 0.78);
    stairShape1.lineTo(0.23 * 2 + 3.44, 0);
    stairShape1.lineTo(0.23 * 2 + 3.44 - 0.1, 0);
    stairShape1.lineTo(0.23 * 2 + 3.44 - 0.1, -0.25);
    stairShape1.lineTo(0.1, -0.25);
    stairShape1.lineTo(0.1, 0);
    stairShape1.lineTo(0, 0);

    var stairShape2 = new THREE.Shape();
    stairShape2.moveTo(0, 0);
    stairShape2.lineTo(0, 0.89);
    stairShape2.lineTo(0.43, 0.89 + 0.41);
    stairShape2.lineTo(0.43 + 3.67, 0.89 + 0.41);
    stairShape2.lineTo(0.43 * 2 + 3.67, 0.89);
    stairShape2.lineTo(0.43 * 2 + 3.67, 0);
    stairShape2.lineTo(0.43 * 2 + 3.67 - 0.41, 0);
    stairShape2.lineTo(0.43 * 2 + 3.67 - 0.41, -0.25);
    stairShape2.lineTo(0.41, -0.25);
    stairShape2.lineTo(0.41, 0);
    stairShape2.lineTo(0, 0);

    var stairShape3 = new THREE.Shape();
    stairShape3.moveTo(0, 0);
    stairShape3.lineTo(0, 1.02);
    stairShape3.lineTo(0.63, 1.02 + 0.6);
    stairShape3.lineTo(0.63 + 3.9, 1.02 + 0.6);
    stairShape3.lineTo(0.63 * 2 + 3.9, 1.02);
    stairShape3.lineTo(0.63 * 2 + 3.9, 0);
    stairShape3.lineTo(0.63 * 2 + 3.9 - 0.73, 0);
    stairShape3.lineTo(0.63 * 2 + 3.9 - 0.73, -0.25);
    stairShape3.lineTo(0.73, -0.25);
    stairShape3.lineTo(0.73, 0);
    stairShape3.lineTo(0, 0);

    var extrudeSettingsStairs = {
      bevelEnabled: false,
      steps: 1,
      amount: 0.16
    };
    var terraceGeometry5 = new THREE.ExtrudeGeometry(stairShape1, extrudeSettingsStairs);
    var terraceMesh5 = new THREE.Mesh(terraceGeometry5);
    terraceMesh5.rotation.x += ((90 * Math.PI) / 180);
    terraceMesh5.updateMatrix();
    terraceMesh5.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 - 0.1, fundsHeight / 2 + 0.16, fundsDepth / 2));

    // schody przód - środek
    var terraceGeometry4 = new THREE.ExtrudeGeometry(stairShape2, extrudeSettingsStairs);
    var terraceMesh4 = new THREE.Mesh(terraceGeometry4);
    terraceMesh4.rotation.x += ((90 * Math.PI) / 180);
    terraceMesh4.updateMatrix();
    terraceMesh4.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 - 0.41, fundsHeight / 2, fundsDepth / 2));

    // schody przód - dolny
    var terraceGeometry3 = new THREE.ExtrudeGeometry(stairShape3, extrudeSettingsStairs);
    var terraceMesh3 = new THREE.Mesh(terraceGeometry3);
    terraceMesh3.rotation.x += ((90 * Math.PI) / 180);
    terraceMesh3.updateMatrix();
    terraceMesh3.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 - 0.73, 0, fundsDepth / 2));

    // slup
    var columnGeometry = new THREE.CylinderGeometry(0.14, 0.14, 2.74, 64);
    var column_1 = new THREE.Mesh(columnGeometry, columnMaterial);
    column_1.position.set(-0.79, 2.74 / 2 + 0.48 - 0.29 / 2, -1.38);
	
	column_1.castShadow = true;
    column_1.receiveShadow = true;
	
	house.add(column_1);
    /*/scene.add(column_1);/*/

    var column_2 = column_1.clone();
    column_2.position.set(-0.79, 2.74 / 2 + 0.48 - 0.29 / 2, 1.38);
	
	column_2.castShadow = true;
	column_2.receiveShadow = true;
	
    house.add(column_2);
    /*/scene.add(column_2);/*/

    var column_3 = column_1.clone();
    column_3.position.set(fundWidth1 + 0.22 + 0.14 / 2, 2.74 / 2 + 0.48 - 0.29 / 2, fundsDepth / 2 + 0.49);
    
	column_3.castShadow = true;
	column_3.receiveShadow = true;
	house.add(column_3);
	/*/scene.add(column_3);/*/

    var column_4 = column_1.clone();
    column_4.position.set(fundWidth1 + fundWidth2 - 0.22 - 0.14 / 2, 2.74 / 2 + 0.48 - 0.29 / 2, fundsDepth / 2 + 0.49);
    
	column_4.castShadow = true;
	column_4.receiveShadow = true;
	house.add(column_4);
	/*/scene.add(column_4);/*/

    // balkon przód
    var balconyShape = stairShape1;
    var terraceGeometry7 = new THREE.ExtrudeGeometry(balconyShape, extrudeSettingsBalcony);

    var terraceMesh7 = new THREE.Mesh(terraceGeometry7, material_3);
    terraceMesh7.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 - 0.1, 3.23 + 0.34 / 2, fundsDepth / 2));
    terraceMesh7.rotation.x += ((90 * Math.PI) / 180);
    terraceMesh7.updateMatrix();
	terraceMesh7.castShadow = true;
    terraceMesh7.receiveShadow = true;
    //scene.add(terraceMesh7);

    var terraceGeometry = new THREE.Geometry();
    terraceGeometry.merge(terraceMesh1.geometry, terraceMesh1.matrix);
    terraceGeometry.merge(terraceMesh2.geometry, terraceMesh2.matrix);
    terraceGeometry.merge(terraceMesh3.geometry, terraceMesh3.matrix);
    terraceGeometry.merge(terraceMesh4.geometry, terraceMesh4.matrix);
    terraceGeometry.merge(terraceMesh5.geometry, terraceMesh5.matrix);
    terraceGeometry.merge(terraceMesh7.geometry, terraceMesh7.matrix);

    var terrace = new THREE.Mesh(terraceGeometry, stairsTileMaterial);
	
	terrace.castShadow = true;
    terrace.receiveShadow = true;
    house.add(terrace);
    /*/scene.add(terrace);/*/
    
  }
  
/*******************************************************************
	Funkcja tworzaca barierki
*******************************************************************/
  createFences();

  function createFences() {

    var balconyFenceShape = new THREE.Shape();
    balconyFenceShape.moveTo(0, 0);
    balconyFenceShape.lineTo(0, 0.78);
    balconyFenceShape.lineTo(0.23, 0.78 + 0.23);
    balconyFenceShape.lineTo(0.23 + 3.44, 0.78 + 0.23);
    balconyFenceShape.lineTo(0.23 * 2 + 3.44, 0.78);
    balconyFenceShape.lineTo(0.23 * 2 + 3.44, 0);
    balconyFenceShape.lineTo(0.23 * 2 + 3.44 - 0.1, 0);
    balconyFenceShape.lineTo(0.23 * 2 + 3.44 - 0.1, 0.78);
    balconyFenceShape.lineTo(0.23 + 3.44, 0.78 + 0.21 - 0.1);
    balconyFenceShape.lineTo(0.23, 0.78 + 0.21 - 0.1);
    balconyFenceShape.lineTo(0.1, 0.78);
    balconyFenceShape.lineTo(0.1, 0);
    balconyFenceShape.lineTo(0, 0);

    var extrudeSettingsFence = {
      bevelEnabled: false,
      steps: 1,
      amount: 1.1
    };

    var balconyFenceGeometry = new THREE.ExtrudeGeometry(balconyFenceShape, extrudeSettingsFence);

    var balconyFenceMesh = new THREE.Mesh(balconyFenceGeometry, balconyFenceMaterial);
    balconyFenceMesh.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 - 0.1, 3.23 + 0.34 / 2 + 1.1, fundsDepth / 2));
    balconyFenceMesh.rotation.x += ((90 * Math.PI) / 180);
    balconyFenceMesh.updateMatrix();

    balconyFenceMesh.receiveShadow = true;
    balconyFenceMesh.castShadow = true;
    house.add(balconyFenceMesh);
    /*/scene.add(balconyFenceMesh);/*/

    var sideBalconyFenceShape = new THREE.Shape();
    sideBalconyFenceShape.moveTo(0, 0);
    sideBalconyFenceShape.lineTo(0, 0.94);
    sideBalconyFenceShape.lineTo(0.3, 0.94 + 0.3);
    sideBalconyFenceShape.lineTo(0.3 + 3.2, 0.94 + 0.3);
    sideBalconyFenceShape.lineTo(0.3 * 2 + 3.2, 0.94);
    sideBalconyFenceShape.lineTo(0.3 * 2 + 3.2, 0);
    sideBalconyFenceShape.lineTo(0.3 * 2 + 3.2 - 0.1, 0);
    sideBalconyFenceShape.lineTo(0.3 * 2 + 3.2 - 0.1, 0.94);
    sideBalconyFenceShape.lineTo(0.3 + 3.2, 0.94 + 0.3 - 0.1);
    sideBalconyFenceShape.lineTo(0.3, 0.94 + 0.3 - 0.1);
    sideBalconyFenceShape.lineTo(0.1, 0.94);
    sideBalconyFenceShape.lineTo(0.1, 0);
    sideBalconyFenceShape.lineTo(0, 0);

    var balconyFenceGeometry2 = new THREE.ExtrudeGeometry(sideBalconyFenceShape, extrudeSettingsFence);
    var balconyFenceMesh2 = new THREE.Mesh(balconyFenceGeometry2, balconyFenceMaterial);
    balconyFenceMesh2.rotation.x += ((90 * Math.PI) / 180);
    balconyFenceMesh2.rotation.z += ((90 * Math.PI) / 180);
    balconyFenceMesh2.updateMatrix();
    balconyFenceMesh2.applyMatrix(new THREE.Matrix4().makeTranslation(0, terraceHeight2 * 1.5 + 2.74 + 0.15 + 1.1, -(0.3 * 2 + 3.2) / 2));
    balconyFenceMesh2.updateMatrix();

    balconyFenceMesh2.receiveShadow = true;
    balconyFenceMesh2.castShadow = true;
    house.add(balconyFenceMesh2);
   /*/ scene.add(balconyFenceMesh2);/*/

  }

/*******************************************************************
	Funkcja tworzaca schody
*******************************************************************/  
  createStairs();
  
  function createStairs(){
	  var stairsShape = new THREE.Shape();
	  
	  stairsShape.moveTo(0,0);
	  stairsShape.lineTo(0, -0.48);
		stairsShape.lineTo(1.01, -0.48);
		stairsShape.lineTo(1.01, -(0.48 - 0.16));
		stairsShape.lineTo(1.01 - 0.3, -(0.48 - 0.16));
		stairsShape.lineTo(1.01 - 0.3, -(0.48 - 0.16*2));
		stairsShape.lineTo(1.01 - 0.3*2, -(0.48 - 0.16*2));
		stairsShape.lineTo(1.01 - 0.3*2, 0);
		stairsShape.lineTo(0, 0);
		
		var extrudeSettingsStairsB = {
		  bevelEnabled: false,
		  steps: 1,
		  amount: 1.17
		};
		
		var stairsGeometry = new THREE.ExtrudeGeometry(stairsShape, extrudeSettingsStairsB);
		var stairsMesh = new THREE.Mesh(stairsGeometry, stairsTileMaterial);
		stairsMesh.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 + fundWidth2 + fundWidth3, 0.48/2 + 0.08, -garageDepth/2 - 1.0 - wallThickness/2));
		
		house.add(stairsMesh);
		/*/scene.add(stairsMesh);/*/
  }

/*******************************************************************
	Funkcja tworzaca taras i basen
*******************************************************************/  
  createTerraceAndPool();
  function createTerraceAndPool(){
	  var terraceShape = new THREE.Shape();
	terraceShape.moveTo(0,0);
	terraceShape.lineTo(-1.33, 0);
	terraceShape.lineTo(-1.33-8.29, 3.49);
	terraceShape.lineTo(-6.44, 8.29+2.71);
	terraceShape.lineTo(0, 8.29);
	terraceShape.lineTo(0,0);

	var extrudeSettingsTerrace = {
		bevelEnabled: false,
		steps: 1,
		amount: 0.25
	};
	
	var terraceGeometry = new THREE.ExtrudeGeometry( terraceShape, extrudeSettingsTerrace );
	var terrace = new THREE.Mesh(terraceGeometry, tileMaterialB);
	terrace.rotateX(-(Math.PI)/2);
	terrace.updateMatrix();
	terrace.applyMatrix(new THREE.Matrix4().makeTranslation(0,-fundsHeight/2,2.95));
	
	terrace.castShadow = true;
	terrace.receiveShadow = true;
	house.add(terrace);
	/*/scene.add(terrace);/*/
	
	var poolGeometryA = new THREE.CubeGeometry(4.41, 1.55, 8.17);
	var poolGeometryB = new THREE.CubeGeometry(3.32, 1.54, 7.08);
	var poolGeometryC = new THREE.CubeGeometry(3.32, 0.1, 7.08);
	
	var poolMeshA = new THREE.Mesh(poolGeometryA);
	var poolMeshB = new THREE.Mesh(poolGeometryB);
	poolMeshB.applyMatrix(new THREE.Matrix4().makeTranslation(0,0.05,0));
	
	var pool_BSP_A = new ThreeBSP(poolMeshA);
	var pool_BSP_B = new ThreeBSP(poolMeshB);
	
	var pool_BSP = pool_BSP_A.subtract(pool_BSP_B);
	
	var pool = pool_BSP.toMesh(tileMaterial);
	
	pool.applyMatrix(new THREE.Matrix4().makeTranslation(0,1.55/2-fundsHeight/2,0));
	pool.rotateY(-(22.8 * Math.PI) / 180);
	pool.updateMatrix();
	pool.applyMatrix(new THREE.Matrix4().makeTranslation(-8.29 -4.41/2 + 0.435 ,-1,-8.29/2 - 2.71/2 + 0.335));
	pool.castShadow = true;
	pool.receiveShadow = true;
	house.add(pool);
	/*/scene.add(pool);/*/
	
	var waterMesh = new THREE.Mesh(poolGeometryC, waterMaterial);
	waterMesh.applyMatrix(new THREE.Matrix4().makeTranslation(0,1.55/2-fundsHeight/2,0));
	waterMesh.rotateY(-(22.8 * Math.PI) / 180);
	waterMesh.updateMatrix();
	waterMesh.applyMatrix(new THREE.Matrix4().makeTranslation(-8.29 -4.41/2 + 0.435 ,-0.6,-8.29/2 - 2.71/2 + 0.335));
	house.add(waterMesh);
	/*/scene.add(waterMesh);/*/

	
  }

 /*******************************************************************
	Funkcja tworzaca sciany i dach
*******************************************************************/
  function createWalls() {
    /******************************************************************************
    Ściana 1
    ******************************************************************************/
    var frontWallGeometry1 = new THREE.BoxGeometry(frontWallWidth1, frontWallHeight1, wallThickness);
    var frontWallMesh1 = new THREE.Mesh(frontWallGeometry1);
    frontWallMesh1.applyMatrix(new THREE.Matrix4().makeTranslation(frontWallWidth1 / 2, frontWallHeight1 / 2 + fundsHeight / 2, fundsDepth / 2 - wallThickness / 2));
    var frontWall_BSP_1 = new ThreeBSP(frontWallMesh1);
    /******************************************************************************
    Ściana 2
    ******************************************************************************/
    var frontWall_geometry_2 = new THREE.BoxGeometry(frontWallWidth2, frontWallHeight2, wallThickness);
    var frontWallMesh2 = new THREE.Mesh(frontWall_geometry_2);
    frontWallMesh2.applyMatrix(new THREE.Matrix4().makeTranslation(frontWallWidth1 + frontWallWidth2 / 2, frontWallHeight2 / 2 + fundsHeight / 2, fundsDepth / 2 - wallThickness / 2 - 0.25));
    var frontWall_BSP_2 = new ThreeBSP(frontWallMesh2);

    var frontWall_BSP = frontWall_BSP_1.union(frontWall_BSP_2);
    /******************************************************************************
    Ściana 3
    ******************************************************************************/
    frontWallMesh1.applyMatrix(new THREE.Matrix4().makeTranslation(frontWallWidth2 + frontWallWidth1, 0, 0));

    frontWall_BSP_1 = new ThreeBSP(frontWallMesh1);

    frontWall_BSP = frontWall_BSP.union(frontWall_BSP_1);

    /******************************************************************************
    Front - Okno 1
    ******************************************************************************/
    var windowHoleGeometry1 = new THREE.BoxGeometry(windowWidth1, windowHeight1, wallThickness);
    var windowHoleMesh1 = new THREE.Mesh(windowHoleGeometry1);
    windowHoleMesh1.applyMatrix(new THREE.Matrix4().makeTranslation(windowHeight1 / 2 + 1.1, windowHeight1 / 2 + 1.12 + fundsHeight / 2, fundsDepth / 2 - wallThickness / 2));
    var window_holeBSP = new ThreeBSP(windowHoleMesh1);

    frontWall_BSP = frontWall_BSP.subtract(window_holeBSP);

    /******************************************************************************
    Front - Okno 2
    ******************************************************************************/
    windowHoleMesh1.applyMatrix(new THREE.Matrix4().makeTranslation(frontWallWidth1 + frontWallWidth2, 0, 0));
    window_holeBSP = new ThreeBSP(windowHoleMesh1);
    frontWall_BSP = frontWall_BSP.subtract(window_holeBSP);

    /******************************************************************************
    	Front - Okno 3
    	******************************************************************************/
    var windowHoleGeometry1_b = new THREE.BoxGeometry(windowWidth3, windowHeight1, wallThickness);
    var windowHoleMesh1_b = new THREE.Mesh(windowHoleGeometry1_b);
    windowHoleMesh1_b.applyMatrix(new THREE.Matrix4().makeTranslation(2.03 + windowWidth3 / 2, 4.09 + windowHeight1 / 2 + fundsHeight / 2, fundsDepth / 2 - wallThickness / 2));
    window_holeBSP = new ThreeBSP(windowHoleMesh1_b);

    frontWall_BSP = frontWall_BSP.subtract(window_holeBSP);
    /******************************************************************************
    Front - Okno 4
    ******************************************************************************/
    windowHoleMesh1_b.applyMatrix(new THREE.Matrix4().makeTranslation(frontWallWidth2 + 2.03 + windowWidth3 / 2, 0, 0));
    window_holeBSP = new ThreeBSP(windowHoleMesh1_b);

    frontWall_BSP = frontWall_BSP.subtract(window_holeBSP);
    /******************************************************************************
    Front - Okno balkonowe
    ******************************************************************************/
    var windowHoleGeometry1_c = new THREE.BoxGeometry(windowWidth2, windowHeight2, wallThickness);
    var windowHoleMesh1_c = new THREE.Mesh(windowHoleGeometry1_c);
    windowHoleMesh1_c.applyMatrix(new THREE.Matrix4().makeTranslation(frontWallWidth1 + frontWallWidth2 / 2, 3.24 + windowHeight2 / 2 + fundsHeight / 2, fundsDepth / 2 - wallThickness / 2 - 0.25));
    window_holeBSP = new ThreeBSP(windowHoleMesh1_c);

    frontWall_BSP = frontWall_BSP.subtract(window_holeBSP);

    //
    // Luksfery
    //

    var windowHoleGeometryluxfer = new THREE.BoxGeometry(luxferWindowWidth, windowHeight1, wallThickness);
    var windowHoleGeometryluxfer_mesh = new THREE.Mesh(windowHoleGeometryluxfer);
    windowHoleGeometryluxfer_mesh.applyMatrix(new THREE.Matrix4().makeTranslation(frontWallWidth1 + 0.67 + luxferWindowWidth / 2, 0.5 + 0.16 + windowHeight1 / 2 + fundsHeight / 2, fundsDepth / 2 - wallThickness / 2 - 0.25));
    window_holeBSP = new ThreeBSP(windowHoleGeometryluxfer_mesh);

    frontWall_BSP = frontWall_BSP.subtract(window_holeBSP);

    windowHoleGeometryluxfer_mesh.position.set(frontWallWidth1 + frontWallWidth2 - 0.67 - luxferWindowWidth / 2, 0.5 + 0.16 + windowHeight1 / 2 + fundsHeight / 2, fundsDepth / 2 - wallThickness / 2 - 0.25);
    window_holeBSP = new ThreeBSP(windowHoleGeometryluxfer_mesh);

    frontWall_BSP = frontWall_BSP.subtract(window_holeBSP);

    //
    // Drzwi wejściowe
    //
    var mainDoor_hole_geometry = new THREE.BoxGeometry(mainDoorWidth, mainDoorHeight, wallThickness);
    var mainDoor_hole_mesh = new THREE.Mesh(mainDoor_hole_geometry);
    mainDoor_hole_mesh.applyMatrix(new THREE.Matrix4().makeTranslation(frontWallWidth1 + frontWallWidth2 / 2, 0.16 + mainDoorHeight / 2 + fundsHeight / 2, fundsDepth / 2 - wallThickness / 2 - 0.25));
    window_holeBSP = new ThreeBSP(mainDoor_hole_mesh);

    frontWall_BSP = frontWall_BSP.subtract(window_holeBSP);

    // Drzwi - obiekt 3d
    var doorGeometry = new THREE.BoxGeometry(mainDoorWidth, mainDoorHeight, wallThickness / 2);
    var doorMesh = new THREE.Mesh(doorGeometry, material);
    var door_BSP_1 = new ThreeBSP(doorMesh);

    var doorWindow = new THREE.BoxGeometry(0.18, 0.18, wallThickness / 2);
    var door_BSP_2 = new ThreeBSP(doorWindow);

    var door_BSP = door_BSP_1.subtract(door_BSP_2);

    var doorWindow_mesh = new THREE.Mesh(doorWindow);

    for (var i = -3; i < 4; i++) {
      doorWindow_mesh.position.set(0, 0.1 * 2 * i + 0.05 * i, 0);
      door_BSP_2 = new ThreeBSP(doorWindow_mesh);
      door_BSP = door_BSP.subtract(door_BSP_2);
    }

    var door = door_BSP.toMesh(doorMaterial);
	door.receiveShadow = true;

    var mainDoor = new THREE.Object3D();

    var doorWindow_glass_geometry = new THREE.BoxGeometry(0.18, 0.18, wallThickness / 4);
    var doorWindow_glass = new Array(7);
    for (var i = 0; i < 7; i++) {
      doorWindow_glass[i] = new THREE.Mesh(doorWindow_glass_geometry, material_glass);
      doorWindow_glass[i].position.set(0, 0.1 * 2 * (i - 3) + 0.05 * (i - 3), 0);
      mainDoor.add(doorWindow_glass[i]);
    }

    var doorWindow_frame_geometry = new THREE.TorusGeometry(Math.sqrt(0.02), 0.01, 4, 4);
    var doorWindow_frame = new Array(7);
    for (var i = 0; i < 7; i++) {
      doorWindow_frame[i] = new THREE.Mesh(doorWindow_frame_geometry, doorMaterial);
      doorWindow_frame[i].position.set(0, 0.1 * 2 * (i - 3) + 0.05 * (i - 3), wallThickness / 4);
      doorWindow_frame[i].rotation.z += ((45 * Math.PI) / 180);
      mainDoor.add(doorWindow_frame[i]);
    }

    mainDoor.add(door);
    mainDoor.position.set(frontWallWidth1 + frontWallWidth2 / 2, 0.16 + mainDoorHeight / 2 + fundsHeight / 2, fundsDepth / 2 - wallThickness / 2 - 0.25);
	
	mainDoor.receiveShadow = true;
	mainDoor.castShadow = true;
	
    house.add(mainDoor);
    /*/scene.add(mainDoor);/*/

    /******************************************************************************
    Ściana frontowa
    ******************************************************************************/
    var frontWall = frontWall_BSP.toMesh(material_2);


    /******************************************************************************
    Ściana 4
    ******************************************************************************/
    var backWallGeometry1 = new THREE.BoxGeometry(backWallWidth1, backWallHeight1, wallThickness);
    var backWallMesh1 = new THREE.Mesh(backWallGeometry1);
    backWallMesh1.applyMatrix(new THREE.Matrix4().makeTranslation(backWallWidth1 / 2, backWallHeight1 / 2 + fundsHeight / 2, -(fundsDepth / 2 - wallThickness / 2)));
    var backWall_BSP_1 = new ThreeBSP(backWallMesh1);
    /******************************************************************************
    Ściana 5
    ******************************************************************************/
    var backWallGeometry2 = new THREE.BoxGeometry(backWallWidth2, backWallHeight2, wallThickness);
    var backWallMesh2 = new THREE.Mesh(backWallGeometry2);
    backWallMesh2.applyMatrix(new THREE.Matrix4().makeTranslation(backWallWidth1 + backWallWidth2 / 2, frontWallHeight2 / 2 + fundsHeight / 2, -(fundsDepth / 2 - wallThickness / 2 + 0.25)));
    var backWall_BSP_2 = new ThreeBSP(backWallMesh2);

    var backWall_BSP = backWall_BSP_1.union(backWall_BSP_2);

    /******************************************************************************
    Ściana 6
    ******************************************************************************/
    backWallMesh1.applyMatrix(new THREE.Matrix4().makeTranslation(backWallWidth2 + backWallWidth1, 0, 0));

    backWall_BSP_1 = new ThreeBSP(backWallMesh1);

    backWall_BSP = backWall_BSP.union(backWall_BSP_1);
    /******************************************************************************
    Tył okno
    ******************************************************************************/
    windowHoleMesh1.position.set(backWallWidth1 / 2, windowHeight1 / 2 + 1.12 + fundsHeight / 2, -fundsDepth / 2 + wallThickness / 2);
    window_holeBSP = new ThreeBSP(windowHoleMesh1);
    backWall_BSP = backWall_BSP.subtract(window_holeBSP);
    /******************************************************************************
    Tył okno
    ******************************************************************************/
    windowHoleMesh1.position.set(backWallWidth1 * 1.5 + backWallWidth2, windowHeight1 / 2 + 1.12 + fundsHeight / 2, -fundsDepth / 2 + wallThickness / 2);
    window_holeBSP = new ThreeBSP(windowHoleMesh1);
    backWall_BSP = backWall_BSP.subtract(window_holeBSP);

    /******************************************************************************
    Tył okno
    ******************************************************************************/
    windowHoleMesh1_b.position.set(2.03 + windowWidth3 / 2, 4.09 + windowHeight1 / 2 + fundsHeight / 2, -(fundsDepth / 2 - wallThickness / 2));
    window_holeBSP = new ThreeBSP(windowHoleMesh1_b);
    backWall_BSP = backWall_BSP.subtract(window_holeBSP);
    /******************************************************************************
    Tył okno
    ******************************************************************************/
    windowHoleMesh1_b.applyMatrix(new THREE.Matrix4().makeTranslation(frontWallWidth2 + 2.03 + windowWidth3 / 2, 0, 0));
    window_holeBSP = new ThreeBSP(windowHoleMesh1_b);
    backWall_BSP = backWall_BSP.subtract(window_holeBSP);

    windowHoleGeometryluxfer_mesh.position.set(frontWallWidth1 + frontWallWidth2 + frontWallWidth1 - 1.6 - luxferWindowWidth / 2, windowHeight1 / 2 + 1.12 + fundsHeight / 2, -(fundsDepth / 2 - wallThickness / 2));
    window_holeBSP = new ThreeBSP(windowHoleGeometryluxfer_mesh);

    backWall_BSP = backWall_BSP.union(window_holeBSP);
    /******************************************************************************
    Tył okno środek 1
    ******************************************************************************/
    var windowHoleGeometry1_d = new THREE.BoxGeometry(windowWidth2, windowHeight1, wallThickness);
    var windowHoleMesh1_d = new THREE.Mesh(windowHoleGeometry1_d);
    windowHoleMesh1_d.applyMatrix(new THREE.Matrix4().makeTranslation(backWallWidth1 + backWallWidth2 / 2, 1.12 + windowHeight1 / 2 + fundsHeight / 2, -(fundsDepth / 2 - wallThickness / 2 + 0.25)));
    window_holeBSP = new ThreeBSP(windowHoleMesh1_d);
    backWall_BSP = backWall_BSP.subtract(window_holeBSP);
    /******************************************************************************
    Tył okno środek 2
    ******************************************************************************/
    windowHoleMesh1_d.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.48 + windowHeight1, 0));
    window_holeBSP = new ThreeBSP(windowHoleMesh1_d);
    backWall_BSP = backWall_BSP.subtract(window_holeBSP);

    var backWall = backWall_BSP.toMesh(material_2);

   
    /******************************************************************************
    Ściana 7
    ******************************************************************************/
    var sideWall_geometry_1 = new THREE.BoxGeometry(wallThickness, sideWallHeight1, fundsDepth);
    var sideWall_mesh_1 = new THREE.Mesh(sideWall_geometry_1);
    sideWall_mesh_1.applyMatrix(new THREE.Matrix4().makeTranslation(wallThickness / 2, sideWallHeight1 / 2 + fundsHeight / 2, 0));
    var sideWall_BSP_1 = new ThreeBSP(sideWall_mesh_1);
    /******************************************************************************
    Ściana 8
    ******************************************************************************/
    var sideWall_geometry_2 = new THREE.BoxGeometry(wallThickness, sideWallHeight2, sideWallWidth1);
    var sideWall_mesh_2 = new THREE.Mesh(sideWall_geometry_2);
    sideWall_mesh_2.applyMatrix(new THREE.Matrix4().makeTranslation(wallThickness / 2, sideWallHeight1 + sideWallHeight2 / 2 + fundsHeight / 2, 0));
    var sideWall_BSP_2 = new ThreeBSP(sideWall_mesh_2);

    var sideWall_BSP = sideWall_BSP_1.union(sideWall_BSP_2);
    /******************************************************************************
    Okno
    ******************************************************************************/
    var windowHoleGeometry2 = new THREE.BoxGeometry(wallThickness, windowHeight1, windowWidth1);
    var windowHoleMesh2 = new THREE.Mesh(windowHoleGeometry2);
    windowHoleMesh2.position.set(wallThickness / 2, windowHeight1 / 2 + 1.12 + fundsHeight / 2, fundsDepth / 2 - 1.95 - windowWidth1 / 2);
    var window_holeBSP_2 = new ThreeBSP(windowHoleMesh2);

    sideWall_BSP = sideWall_BSP.subtract(window_holeBSP_2);

    windowHoleMesh2.position.set(wallThickness / 2, windowHeight1 / 2 + 1.12 + fundsHeight / 2, -(fundsDepth / 2 - 1.95 - windowWidth1 / 2));
    window_holeBSP_2 = new ThreeBSP(windowHoleMesh2);

    sideWall_BSP = sideWall_BSP.subtract(window_holeBSP_2);

    /******************************************************************************
    Okno taras
    ******************************************************************************/
    var windowHoleGeometry2b = new THREE.BoxGeometry(wallThickness, windowHeight2, windowWidth2);
    var windowHoleMesh2b = new THREE.Mesh(windowHoleGeometry2b);
    windowHoleMesh2b.position.set(wallThickness / 2, windowHeight2 / 2 + fundsHeight / 2 + 0.16, 0);
    window_holeBSP_2 = new ThreeBSP(windowHoleMesh2b);

    sideWall_BSP = sideWall_BSP.subtract(window_holeBSP_2);
    //
    // Bok - Okno balkon
    //
    var windowHoleGeometry2c = new THREE.BoxGeometry(wallThickness, windowHeight2, windowWidth4);
    var windowHoleMesh2c = new THREE.Mesh(windowHoleGeometry2c);
    windowHoleMesh2c.position.set(wallThickness / 2, 3.08 + windowHeight2 / 2 + fundsHeight / 2 + 0.16, 0.13 + windowWidth4 / 2);
    window_holeBSP_2 = new ThreeBSP(windowHoleMesh2c);

    sideWall_BSP = sideWall_BSP.subtract(window_holeBSP_2);

    //
    // Bok - Okno balkon
    //
    windowHoleMesh2c.position.set(wallThickness / 2, 3.08 + windowHeight2 / 2 + fundsHeight / 2 + 0.16, -(0.13 + windowWidth4 / 2));
    window_holeBSP_2 = new ThreeBSP(windowHoleMesh2c);

    sideWall_BSP = sideWall_BSP.subtract(window_holeBSP_2);
    //
    // Ściana obok garażu
    //
    sideWall_mesh_1.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 + fundWidth2 + fundWidth3 - wallThickness, 0, 0));
    sideWall_BSP_1 = new ThreeBSP(sideWall_mesh_1);
    sideWall_BSP = sideWall_BSP.union(sideWall_BSP_1);
	
	/******************************************************************************
    Tył drzwi
    ******************************************************************************/
	var backDoorHoleGeometry = new THREE.BoxGeometry(backDoorWidth, backDoorHeight, wallThickness);
	var backDoorHoleMesh = new THREE.Mesh(backDoorHoleGeometry);
	backDoorHoleMesh.rotateY((90 * Math.PI) / 180);
	backDoorHoleMesh.updateMatrix();
	backDoorHoleMesh.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth - wallThickness/2, backDoorHeight/2 + fundsHeight/2 + 0.16, -garageDepth/2 - backDoorWidth/2 - 0.2));
	//scene.add(backDoorHoleMesh);
	var backDoorHole_BSP = new ThreeBSP(backDoorHoleMesh);
	sideWall_BSP = sideWall_BSP.subtract(backDoorHole_BSP);

    var sideWall = sideWall_BSP.toMesh(material_2);
	
	var backDoorGeometry = new THREE.BoxGeometry(backDoorWidth, backDoorHeight, wallThickness/2);
	var backDoor = new THREE.Mesh(backDoorGeometry, doorMaterial);
	backDoor.rotateY((90 * Math.PI) / 180);
	backDoor.updateMatrix();
	backDoor.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth - wallThickness/2, backDoorHeight/2 + fundsHeight/2 + 0.16, -garageDepth/2 - backDoorWidth/2 - 0.2));
	house.add(backDoor);
	/*/scene.add(backDoor);/*/
	
    /******************************************************************************
    ******************************************************************************
    Garaż
    ******************************************************************************
    ******************************************************************************/

    var garage_geometry = new THREE.BoxGeometry(garageWidth, garageWallHeight1, wallThickness);
    var garage_mesh = new THREE.Mesh(garage_geometry);
    garage_mesh.position.set(fundWidth1 + fundWidth2 + fundWidth3 + garageWidth / 2, -fundsHeight / 2 + garageHeight + garageWallHeight1 / 2, garageDepth / 2 - wallThickness / 2);
    var garage_BSP = new ThreeBSP(garage_mesh);

    var garage_geometry_2 = new THREE.BoxGeometry(wallThickness, garageWallHeight2, garageDepth);
    var garage_mesh_2 = new THREE.Mesh(garage_geometry_2);
    garage_mesh_2.position.set(fundWidth1 + fundWidth2 + fundWidth3 + garageWidth - wallThickness / 2, -fundsHeight / 2 + garageHeight + garageWallHeight2 / 2, 0);
    var garage_BSP_2 = new ThreeBSP(garage_mesh_2);

    var garageWall_BSP = garage_BSP.union(garage_BSP_2);

    garage_mesh.position.set(fundWidth1 + fundWidth2 + fundWidth3 + garageWidth / 2, -fundsHeight / 2 + garageHeight + garageWallHeight1 / 2, -garageDepth / 2 + wallThickness / 2);
    garage_BSP = new ThreeBSP(garage_mesh);
    garageWall_BSP = garageWall_BSP.union(garage_BSP);
    //
    // Drzwi garażowe
    //
    var garageDoorGeometry = new THREE.BoxGeometry(garageDoorWidth, garageDoorHeight, wallThickness);
    var garageDoorMesh = new THREE.Mesh(garageDoorGeometry);
    garageDoorMesh.position.set(fundWidth1 + fundWidth2 + fundWidth3 + 0.85 + garageDoorWidth / 2, -fundsHeight / 2 + garageHeight + garageDoorHeight / 2, garageDepth / 2 - wallThickness / 2);
    garage_BSP_2 = new ThreeBSP(garageDoorMesh);

    garageWall_BSP = garageWall_BSP.subtract(garage_BSP_2);

    garageDoorMesh.applyMatrix(new THREE.Matrix4().makeTranslation(0.5 + garageDoorWidth, 0, 0));
    garage_BSP_2 = new ThreeBSP(garageDoorMesh);

    garageWall_BSP = garageWall_BSP.subtract(garage_BSP_2);

    var garageDoorGeometry_2 = new THREE.BoxGeometry(garageDoorWidth, garageDoorHeight, wallThickness / 4);
    var garageDoor = new THREE.Mesh(garageDoorGeometry_2, garageDoorMaterial);
    garageDoor.position.set(fundWidth1 + fundWidth2 + fundWidth3 + 0.85 + garageDoorWidth / 2, -fundsHeight / 2 + garageHeight + garageDoorHeight / 2, garageDepth / 2 - wallThickness / 2);
    garageDoor.updateMatrix();
    house.add(garageDoor);
    /*/scene.add(garageDoor);/*/
    var garageDoor_2 = garageDoor.clone();
    garageDoor_2.applyMatrix(new THREE.Matrix4().makeTranslation(0.5 + garageDoorWidth, 0, 0));
    house.add(garageDoor_2);
    /*/scene.add(garageDoor_2);/*/

    garageDoor.receiveShadow = true;
    garageDoor_2.receiveShadow = true;
    garageDoor.castShadow = true;
    garageDoor_2.castShadow = true;
    //////////////////////////////////////////
    // Okno garaż
    ////////////////////////////////////
    var windowHoleGeometry3 = new THREE.BoxGeometry(wallThickness, windowHeight1, windowWidth3);
    var windowHoleMesh3 = new THREE.Mesh(windowHoleGeometry3);
    windowHoleMesh3.position.set(fundWidth1 + fundWidth2 + fundWidth3 + garageWidth - wallThickness / 2, 3.7 + windowHeight1 / 2 + garageHeight / 2, 0.45 + windowWidth3 / 2);
    window_holeBSP_2 = new ThreeBSP(windowHoleMesh3);

    garageWall_BSP = garageWall_BSP.subtract(window_holeBSP_2);

    windowHoleMesh3.position.set(fundWidth1 + fundWidth2 + fundWidth3 + garageWidth - wallThickness / 2, 3.7 + windowHeight1 / 2, -(0.45 + windowWidth3 / 2));
    window_holeBSP_2 = new ThreeBSP(windowHoleMesh3);

    garageWall_BSP = garageWall_BSP.subtract(window_holeBSP_2);

    windowHoleGeometry3 = new THREE.BoxGeometry(wallThickness, windowHeight3, windowWidth5);

    windowHoleMesh3 = new THREE.Mesh(windowHoleGeometry3);
    windowHoleMesh3.position.set(fundWidth1 + fundWidth2 + fundWidth3 + garageWidth - wallThickness / 2, 1.4 + windowHeight3 / 2 + garageHeight / 2, 1.3 + windowWidth5);
    window_holeBSP_2 = new ThreeBSP(windowHoleMesh3);

    garageWall_BSP = garageWall_BSP.subtract(window_holeBSP_2);

    windowHoleMesh3.position.set(fundWidth1 + fundWidth2 + fundWidth3 + garageWidth - wallThickness / 2, 1.4 + windowHeight3 / 2 + garageHeight / 2, -(1.3 + windowWidth5));
    window_holeBSP_2 = new ThreeBSP(windowHoleMesh3);

    garageWall_BSP = garageWall_BSP.subtract(window_holeBSP_2);

    windowHoleMesh3.position.set(fundWidth1 + fundWidth2 + fundWidth3 + garageWidth - wallThickness / 2, 1.4 + windowHeight3 / 2 + garageHeight / 2, 0);
    window_holeBSP_2 = new ThreeBSP(windowHoleMesh3);

    garageWall_BSP = garageWall_BSP.subtract(window_holeBSP_2);

    windowHoleGeometry3 = new THREE.BoxGeometry(windowWidth5, windowHeight3, wallThickness);

    windowHoleMesh3 = new THREE.Mesh(windowHoleGeometry3);
    windowHoleMesh3.position.set(fundWidth1 + fundWidth2 + fundWidth3 + 1.33 + windowWidth5 / 2, 1.4 + windowHeight3 / 2 + garageHeight / 2, -(garageDepth / 2 - wallThickness / 2));
    window_holeBSP_2 = new ThreeBSP(windowHoleMesh3);

    garageWall_BSP = garageWall_BSP.subtract(window_holeBSP_2);

    windowHoleMesh3.position.set(fundWidth1 + fundWidth2 + fundWidth3 + 1.33 + windowWidth5 + 3.13 + windowWidth5 / 2, 1.4 + windowHeight3 / 2 + garageHeight / 2, -(garageDepth / 2 - wallThickness / 2));
    window_holeBSP_2 = new ThreeBSP(windowHoleMesh3);

    garageWall_BSP = garageWall_BSP.subtract(window_holeBSP_2);

    var garageWall = garageWall_BSP.toMesh(material_2);

    //************************************************************
    // Dach
    //**************************************************************

    var eraseWallsGeometry = new THREE.BoxGeometry(roofWidth, 4, roofDepth);
    var eraseWallsMesh = new THREE.Mesh(eraseWallsGeometry);
    eraseWallsMesh.position.set(fundWidth1 + fundWidth2 * 2 + fundWidth3 + 0.06, fundsHeight / 2 + 7, fundsDepth / 2 - roofDepth / 2 + 1);
    eraseWallsMesh.rotateX((35.5 * Math.PI) / 180);
    var erase_BSP = new ThreeBSP(eraseWallsMesh);

    garageWall_BSP = garageWall_BSP.subtract(erase_BSP);

    eraseWallsMesh.position.set(fundWidth1 + fundWidth2 * 2 + fundWidth3 + 0.06, fundsHeight / 2 + 7, -(fundsDepth / 2 - roofDepth / 2 + 1));
    eraseWallsMesh.rotateX(-(2 * 35.5 * Math.PI) / 180);
    erase_BSP = new ThreeBSP(eraseWallsMesh);

    garageWall_BSP = garageWall_BSP.subtract(erase_BSP);

    garageWall = garageWall_BSP.toMesh(material_2);
    //
    //
    eraseWallsGeometry = new THREE.BoxGeometry(roofWidth2, roofHeight + 3, roofDepth2);

    eraseWallsMesh = new THREE.Mesh(eraseWallsGeometry);
    eraseWallsMesh.position.set(fundWidth1 / 2, fundsHeight / 2 + 7.8, 0);
    eraseWallsMesh.rotateZ((39 * Math.PI) / 180);
    erase_BSP = new ThreeBSP(eraseWallsMesh);

    frontWall_BSP = frontWall_BSP.subtract(erase_BSP);
    backWall_BSP = backWall_BSP.subtract(erase_BSP);

    eraseWallsMesh.position.set(fundWidth1 + fundWidth2 + fundWidth1 / 2, fundsHeight / 2 + 7.8, 0);
    eraseWallsMesh.rotateZ(-(39 * 2 * Math.PI) / 180);
    erase_BSP = new ThreeBSP(eraseWallsMesh);

    frontWall_BSP = frontWall_BSP.subtract(erase_BSP);
    backWall_BSP = backWall_BSP.subtract(erase_BSP);
    /******************************************************************************
    Ściana frontowa
    ******************************************************************************/
    frontWall = frontWall_BSP.toMesh(material_2);
    backWall = backWall_BSP.toMesh(material_2);

    //scene.add(eraseWallsMesh);
    ///
    ////
    ///
    //
    //
	

    var roofGeometry = new THREE.BoxGeometry(roofWidth, roofHeight, roofDepth);
    var roofMesh = new THREE.Mesh(roofGeometry);
    roofMesh.position.set(fundWidth1 + fundWidth2 * 2 + fundWidth3 + 0.05, fundsHeight / 2 + 4.9, fundsDepth / 2 - roofDepth / 2 + 0.5);

    roofMesh.rotateX((35.5 * Math.PI) / 180);

    var roof_BSP_1 = new ThreeBSP(roofMesh);
    //scene.add(roofMesh); // garaż przód

    var roofMesh_2 = new THREE.Mesh(roofGeometry);
    roofMesh_2.position.set(fundWidth1 + fundWidth2 * 2 + fundWidth3 + 0.05, fundsHeight / 2 + 4.9, -(fundsDepth / 2 - roofDepth / 2 + 0.5));
    roofMesh_2.rotateX(-(35.5 * Math.PI) / 180);

    var roof_BSP_2 = new ThreeBSP(roofMesh_2);
    //scene.add(roofMesh_2); // garaż tył

    var roof_BSP = roof_BSP_1.union(roof_BSP_2);
	
	var garageRoof = roof_BSP.toMesh(roofTileMaterial);
	
	var garageRoof_B = garageRoof.clone();
	garageRoof_B.material = doorMaterial;
	garageRoof_B.scale.x = 1.01;
	garageRoof_B.updateMatrix();
	garageRoof_B.applyMatrix(new THREE.Matrix4().makeTranslation(0,-0.1,0));
	house.add(garageRoof_B);
	/*/scene.add(garageRoof_B);/*/

    var newRoof = garageRoof.clone();
    //newRoof.position.set(fundWidth1 + fundWidth2 * 1.6, fundsHeight / 2 + 5.29, 2.09);
	newRoof.updateMatrix();
    newRoof.applyMatrix(new THREE.Matrix4().makeTranslation(-roofWidth, 0, 0));
	newRoof.updateMatrix();
	var newRoof_BSP = new ThreeBSP(newRoof);
	var nnRoof = newRoof_BSP.toMesh();
	//scene.add(nnRoof); // boki dach garaż
	
	var roofGeometry_E = new THREE.BoxGeometry(roofWidth2*1.23, (roofHeight + 0.02)*30, roofDepth2);
    var roofMesh_E = new THREE.Mesh(roofGeometry_E);
	roofMesh_E.position.set(fundWidth1 + fundWidth2 + fundWidth1 / 2 - 1.7, fundsHeight / 2 + 6.18 - 1.65 -1, 0);
	roofMesh_E.rotateZ(-(39 * Math.PI) / 180);
	roofMesh_E.updateMatrix();
	var roofMesh_E_BSP = new ThreeBSP(roofMesh_E);
	var garageRoof2_BSP = newRoof_BSP.subtract(roofMesh_E_BSP);
	var garageRoof2 = garageRoof2_BSP.toMesh(roofTileMaterial);
	

    var roofGeometry_3 = new THREE.BoxGeometry(roofWidth2, roofHeight + 0.02, roofDepth2);
    var roofMesh_3 = new THREE.Mesh(roofGeometry_3);
    roofMesh_3.position.set(fundWidth1 + fundWidth2 + fundWidth1 / 2 - 0.47, fundsHeight / 2 + 6.18, 0);
    roofMesh_3.rotateZ(-(39 * Math.PI) / 180);
    roof_BSP_2 = new ThreeBSP(roofMesh_3);
    
	//scene.add(roofMesh_3);

    roofMesh_3.applyMatrix(new THREE.Matrix4().makeTranslation(-frontWallWidth1 - frontWallWidth2 / 2 - 0.77, 0, 0));
    roofMesh_3.rotateZ((39 * 2 * Math.PI) / 180);
    var roof_BSP_3 = new ThreeBSP(roofMesh_3);
    var roof_BSP_B = roof_BSP_3.union(roof_BSP_2);
	//scene.add(roofMesh_3)
    var roofGeometry_4 = new THREE.BoxGeometry(3.56, roofHeight + 2, 3.8);

    roofMesh_3 = new THREE.Mesh(roofGeometry_4);
    roofMesh_3.position.set(0.32, fundsHeight / 2 + 5, 0);
    roofMesh_3.rotateZ((39 * Math.PI) / 180);
    roof_BSP_2 = new ThreeBSP(roofMesh_3);
    roof_BSP_B = roof_BSP_B.subtract(roof_BSP_2);
    //scene.add(roofMesh_3);
	
	var houseRoof = roof_BSP_B.toMesh(roofTileMaterialC);

	var houseRoof_B = houseRoof.clone();
	houseRoof_B.material = doorMaterial;
	houseRoof_B.scale.x = 1.002;
	houseRoof_B.scale.z = 1.005;
	houseRoof_B.updateMatrix();
	houseRoof_B.applyMatrix(new THREE.Matrix4().makeTranslation(0,-0.1,0));
	house.add(houseRoof_B);
	/*/scene.add(houseRoof_B);/*/
	
    var roofGeometry_5 = new THREE.BoxGeometry(roofWidth4, roofHeight, roofDepth3);
    roofMesh_3 = new THREE.Mesh(roofGeometry_5);
    roofMesh_3.position.set(roofWidth4 / 3, fundsHeight / 2 + 6.2, roofDepth3 / 2 - 0.44);

    roofMesh_3.rotateX((38.2 * Math.PI) / 180);

    roof_BSP_2 = new ThreeBSP(roofMesh_3);
    

    roofMesh_3.position.set(roofWidth4 / 3, fundsHeight / 2 + 6.2, -(roofDepth3 / 2 - 0.44));

    roofMesh_3.rotateX(-(38.2 * 2 * Math.PI) / 180);

    roof_BSP_3 = new ThreeBSP(roofMesh_3);
    var roof_BSP_C = roof_BSP_3.union(roof_BSP_2);
	
    var roofGeometry_6 = new THREE.BoxGeometry(roofWidth2, roofHeight + 0.02, roofDepth2);
    var roofMesh_6 = new THREE.Mesh(roofGeometry_6);
    roofMesh_6.scale.y = 14;
    roofMesh_6.scale.x = 0.53;
    roofMesh_6.position.set(fundWidth1 + fundWidth2 + fundWidth1 / 2 - 0.69, fundsHeight / 2 + 6.18 - 1.65, 0);
    roofMesh_6.rotateZ(-(39 * Math.PI) / 180);
    roof_BSP_2 = new ThreeBSP(roofMesh_6);
    roofMesh_6.applyMatrix(new THREE.Matrix4().makeTranslation(-fundWidth1 - 1.8, 0.3, 0));
    roofMesh_6.rotateZ((39 * 2 * Math.PI) / 180);
    roof_BSP_2 = new ThreeBSP(roofMesh_6);
//scene.add(roof_BSP_2.toMesh());
    roof_BSP_C = roof_BSP_C.subtract(roof_BSP_2);
    
	var houseRoofB = roof_BSP_C.toMesh(roofTileMaterialB);
	
	var houseRoofB_B = houseRoofB.clone();
	houseRoofB_B.material = doorMaterial;
	houseRoofB_B.scale.x = 1.002;
	houseRoofB_B.scale.z = 1.005;
	houseRoofB_B.updateMatrix();
	houseRoofB_B.applyMatrix(new THREE.Matrix4().makeTranslation(0,-0.1,0));
	house.add(houseRoofB_B);
	/*/scene.add(houseRoofB_B);/*/
	

    var roofGeometry_5 = new THREE.BoxGeometry(roofWidth4, roofHeight * 8, roofDepth3);
    roofMesh_3 = new THREE.Mesh(roofGeometry_5);
    roofMesh_3.position.set(roofWidth4 / 3, fundsHeight / 2 + 7.1, -(roofDepth3 / 2 - 0.44));
    roofMesh_3.rotateX(-(38.2 * Math.PI) / 180);
    roof_BSP_2 = new ThreeBSP(roofMesh_3);
    sideWall_BSP = sideWall_BSP.subtract(roof_BSP_2);

    roofMesh_3.position.set(roofWidth4 / 3, fundsHeight / 2 + 7.1, roofDepth3 / 2 - 0.44);
    roofMesh_3.rotateX((38.2 * 2 * Math.PI) / 180);
    roof_BSP_2 = new ThreeBSP(roofMesh_3);
    sideWall_BSP = sideWall_BSP.subtract(roof_BSP_2);

    var side_wall_geometry = new THREE.BoxGeometry(2, 2.5, wallThickness);
    var side_wall_mesh = new THREE.Mesh(side_wall_geometry);
    side_wall_mesh.applyMatrix(new THREE.Matrix4().makeTranslation(1, 0.16 + 2.74 + 0.34 + 2.5 / 2 + fundsHeight / 2, 3.8 / 2 - wallThickness / 2));
    var side_wall_BSP = new ThreeBSP(side_wall_mesh);

    sideWall_BSP = sideWall_BSP.union(side_wall_BSP);

    side_wall_mesh.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -(3.8 / 2 - wallThickness / 2)));
    var side_wall_BSP = new ThreeBSP(side_wall_mesh);

    sideWall_BSP = sideWall_BSP.union(side_wall_BSP);

    side_wall_mesh.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -(3.8 / 2 - wallThickness / 2)));
    var side_wall_BSP = new ThreeBSP(side_wall_mesh);

    sideWall_BSP = sideWall_BSP.union(side_wall_BSP);

    sideWall = sideWall_BSP.toMesh(material_2);

	
	garageRoof.castShadow = true;
	garageRoof.receiveShadow = true;
	garageRoof2.castShadow = true;
	garageRoof2.receiveShadow = true;
	houseRoof.castShadow = true;
	houseRoof.receiveShadow = true;
	houseRoofB.castShadow = true;
	houseRoofB.receiveShadow = true;
	
    var roof = new THREE.Object3D();
	roof.add(garageRoof);
	roof.add(garageRoof2);
	roof.add(houseRoof);
	roof.add(houseRoofB);

    house.add(roof);
    /*/scene.add(roof);/*/

    /******************************************************************************
    Merge ścian
    ******************************************************************************/
    frontWall.updateMatrix();
    backWall.updateMatrix();
    sideWall.updateMatrix();
    garageWall.updateMatrix();

    var wallsGeometry = new THREE.Geometry();
    wallsGeometry.merge(frontWall.geometry, frontWall.matrix);
    wallsGeometry.merge(backWall.geometry, backWall.matrix);
    wallsGeometry.merge(sideWall.geometry, sideWall.matrix);
    wallsGeometry.merge(garageWall.geometry, garageWall.matrix);

    var walls = new THREE.Mesh(wallsGeometry, plasterMaterial);

    walls.castShadow = true;
    walls.receiveShadow = true;
	house.add(walls);
    /*/scene.add(walls);/*/

  }

  createWalls();

/*******************************************************************
	Funkcja tworzaca deski ozdobne dachu
*******************************************************************/
createDecors();

function createDecors(){
	var decorWidth = fundWidth2 + 1.15;
	var decorHeight = 0.15;
	var decorDepth = 0.15;
	var decorGeometry1 = new THREE.BoxGeometry(decorWidth, decorHeight, decorDepth);
    var decorMesh1 = new THREE.Mesh(decorGeometry1, doorMaterial);
	decorMesh1.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 + fundWidth2/2 + 0.05,6.85, fundsDepth/2 + decorDepth  + 0.25));
	decorMesh1.castShadow = true;
	decorMesh1.receiveShadow = true;
	house.add(decorMesh1);
	
	var decorWidth2 = 0.15;
	var decorHeight2 = 0.15;
	var decorDepth2 = 1;
	var decorGeometry2 = new THREE.BoxGeometry(decorWidth2, decorHeight2, decorDepth2);
    var decorMesh2 = new THREE.Mesh(decorGeometry2, doorMaterial);
	decorMesh2.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 - decorWidth2/2- 0.01,6.85 + decorHeight, fundsDepth/2 + decorDepth));
	decorMesh2.updateMatrix();
	decorMesh2.castShadow = true;
	decorMesh2.receiveShadow = true;
	house.add(decorMesh2);
	
	var decorMesh2b = decorMesh2.clone();
	decorMesh2b.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,-fundsDepth - decorDepth2/3));
	decorMesh2b.castShadow = true;
	decorMesh2b.receiveShadow = true;
	house.add(decorMesh2b);
	
	var decorMesh3 = decorMesh2.clone();
	decorMesh3.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth2 + decorWidth2 + 0.12,0,0));
	decorMesh3.castShadow = true;
	decorMesh3.receiveShadow = true;
	house.add(decorMesh3);
	
	var decorMesh3b = decorMesh3.clone();
	decorMesh3b.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,-fundsDepth - decorDepth2/3));
	decorMesh3b.castShadow = true;
	decorMesh3b.receiveShadow = true;
	house.add(decorMesh3b);
	
	var decorMesh4 = decorMesh2.clone();
	decorMesh4.position.set(0.3,4.2, fundsDepth/2 + 0.05);
	decorMesh4.updateMatrix();
	decorMesh4.castShadow = true;
	decorMesh4.receiveShadow = true;
	house.add(decorMesh4);
	
	var decorMesh4b = decorMesh4.clone();
	decorMesh4b.applyMatrix(new THREE.Matrix4().makeTranslation(0,0, -fundsDepth));
	decorMesh4b.castShadow = true;
	decorMesh4b.receiveShadow = true;
	house.add(decorMesh4b);
	
	var decorMesh5 = decorMesh4.clone();
	decorMesh5.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 + fundWidth2 + fundWidth3 - 0.45,0,0));
	decorMesh5.castShadow = true;
	decorMesh5.receiveShadow = true;
	house.add(decorMesh5);
	
	var decorMesh5b = decorMesh5.clone();
	decorMesh5b.applyMatrix(new THREE.Matrix4().makeTranslation(0,0, -fundsDepth));
	decorMesh5b.castShadow = true;
	decorMesh5b.receiveShadow = true;
	house.add(decorMesh5b);
	
	var decorMesh6 = decorMesh5.clone();
	decorMesh6.scale.z = 3;
	decorMesh6.updateMatrix();
	decorMesh6.position.set(-0.3,6.3,0);
	decorMesh6.castShadow = true;
	decorMesh6.receiveShadow = true;
	house.add(decorMesh6);
	
	var decorMesh6b = decorMesh6.clone();
	decorMesh6b.scale.z = 3.3;
	decorMesh6b.updateMatrix();
	decorMesh6b.position.set(fundsWidth,5.6,0);
	decorMesh6b.castShadow = true;
	decorMesh6b.receiveShadow = true;
	house.add(decorMesh6b);
	
	var decorMesh7 = decorMesh1.clone();
	decorMesh7.scale.x = 0.15;
	decorMesh7.updateMatrix();
	decorMesh7.position.set(-0.3,5.8,-1.72);
	decorMesh7.castShadow = true;
	decorMesh7.receiveShadow = true;
	house.add(decorMesh7);
	
	var decorMesh7b = decorMesh7.clone();
	decorMesh7b.position.set(-0.3 + fundsWidth,4.5,-garageDepth/2+0.87);
	decorMesh7b.castShadow = true;
	decorMesh7b.receiveShadow = true;
	house.add(decorMesh7b);
	
	var decorMesh7c = decorMesh7.clone();
	decorMesh7c.position.set(-0.3 + fundsWidth,4.5,garageDepth/2-0.87);
	decorMesh7c.castShadow = true;
	decorMesh7c.receiveShadow = true;
	house.add(decorMesh7c);
	
	var decorMesh8 = decorMesh7.clone();
	decorMesh8.position.set(-0.3,5.8,1.72);
	decorMesh8.castShadow = true;
	decorMesh8.receiveShadow = true;
	house.add(decorMesh8);
}

  
/*******************************************************************
	Funkcja tworzaca okna
*******************************************************************/
  createWindows();

  function createWindows() {
    /****************************************************************
     *
     * OKNO
     *
     *****************************************************************/

    var window_1 = new THREE.Object3D();

    var windowGeometry1 = new THREE.BoxGeometry(windowWidth1, windowHeight1, wallThickness / 2);
    var windowMesh1 = new THREE.Mesh(windowGeometry1);
    windowMesh1.applyMatrix(new THREE.Matrix4().makeTranslation(windowHeight1 / 2 + 1.1, windowHeight1 / 2 + 1.12 + fundsHeight / 2, fundsDepth / 2 - wallThickness / 2));
    var window_BSP = new ThreeBSP(windowMesh1);

    var glassGeometry1 = new THREE.BoxGeometry(glassWidth, glassHeight, wallThickness / 2);
    var glassMesh1 = new THREE.Mesh(glassGeometry1);
    glassMesh1.applyMatrix(new THREE.Matrix4().makeTranslation(windowHeight1 / 2 + 1.1 - 0.09 - 0.56 / 2, windowHeight1 / 2 + 1.12 + fundsHeight / 2, fundsDepth / 2 - wallThickness / 2));
    var glass_BSP_1 = new ThreeBSP(glassMesh1);

    var window_B = window_BSP.subtract(glass_BSP_1);

    glassMesh1.applyMatrix(new THREE.Matrix4().makeTranslation(2 * (0.09 + 0.56 / 2), 0, 0));
    glass_BSP_1 = new ThreeBSP(glassMesh1);

    window_B = window_B.subtract(glass_BSP_1);

    var window_mesh = window_B.toMesh(windowMaterial);
    window_mesh.receiveShadow = true;

    window_1.add(window_mesh);

    //scene.add(window_mesh);

    var glassGeometry2 = new THREE.BoxGeometry(glassWidth, glassHeight, 0.05);
    var glassMesh2 = new THREE.Mesh(glassGeometry2);
    glassMesh2.applyMatrix(new THREE.Matrix4().makeTranslation(windowHeight1 / 2 + 1.1 - 0.09 - 0.56 / 2, windowHeight1 / 2 + 1.12 + fundsHeight / 2, fundsDepth / 2 - wallThickness / 2));
    var glass_BSP_2 = new ThreeBSP(glassMesh2);

    glassMesh2.applyMatrix(new THREE.Matrix4().makeTranslation(2 * (0.09 + 0.56 / 2), 0, 0));
    var glass_BSP_3 = new ThreeBSP(glassMesh2);

    var glass_BSP = glass_BSP_3.union(glass_BSP_2);

    var glass = glass_BSP.toMesh(material_glass);

    window_1.add(glass);
    //scene.add(glass);

    house.add(window_1);
    /*/scene.add(window_1);/*/

    var window_2 = window_1.clone();
    window_2.applyMatrix(new THREE.Matrix4().makeTranslation(frontWallWidth1 + frontWallWidth2, 0, 0));
	house.add(window_2);
    /*/scene.add(window_2);/*/

    var window_1_back = window_1.clone();
    window_1_back.position.set(-0.1, 0, -fundsDepth + wallThickness);
    house.add(window_1_back);
    /*/scene.add(window_1_back);/*/

    // Balkon przód
    var window_3 = window_1.clone();

    window_3.scale.x = 1.2;
    window_3.scale.y = 1.54;
    window_3.updateMatrix();
    window_3.position.set(frontWallWidth1 - windowWidth1 * 1.2 / 4 + 0.07, windowHeight1 * 1.54 / 2 + 0.27, -0.25);
    window_3.updateMatrix();

    house.add(window_3);
    /*/scene.add(window_3);/*/

    // Taras bok
    var window_4 = window_3.clone();
    window_4.rotation.y += ((90 * Math.PI) / 180);
    window_4.updateMatrix();
    window_4.position.set(-frontWallWidth1 - frontWallWidth2 / 2 + 1.8 / 2 - wallThickness / 2, -(windowHeight1 * 1.54 / 2 + 0.27) - 0.23, windowWidth2 + windowWidth2 / 4 - 0.03);

    house.add(window_4);
    /*/scene.add(window_4);/*/

    // Okna bok
    var window_5 = window_1.clone();
    window_5.rotation.y += ((90 * Math.PI) / 180);
    window_5.updateMatrix();
    window_5.position.set(-frontWallWidth1 - frontWallWidth2 / 2 + 1.8 / 2 - wallThickness / 2, 0, -windowWidth1 / 2 - 0.05);
    window_5.updateMatrix();

    house.add(window_5);
    /*/scene.add(window_5);/*/

    var window_6 = window_5.clone();
    window_6.position.set(-frontWallWidth1 - frontWallWidth2 / 2 + 1.8 / 2 - wallThickness / 2, 0, -windowWidth1 / 2 - 0.05 + 5.3);

    house.add(window_6);
    /*/scene.add(window_6);/*/

    var window_7 = window_1.clone();
    window_7.scale.x = 1.2;
    window_7.position.set(frontWallWidth1 - 1.8 / 4 + 0.08, 0, -(fundsDepth - wallThickness) - 0.25);
    window_7.updateMatrix();

    house.add(window_7);
    /*/scene.add(window_7);/*/

    var window_8 = window_7.clone();
    window_8.applyMatrix(new THREE.Matrix4().makeTranslation(0, 4.48 - windowHeight1, 0));
    house.add(window_8);
    /*/scene.add(window_8);/*/

    /****************************************************
    Okna pojedyncze
    ******************************************************/
    var window_9 = new THREE.Object3D();

    var windowGeometrysingle = new THREE.BoxGeometry(windowWidth3, windowHeight1, wallThickness / 2);
    var windowMesh2 = new THREE.Mesh(windowGeometrysingle);
    windowMesh2.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    window_BSP = new ThreeBSP(windowMesh2);

    var glassGeometrysingle = new THREE.BoxGeometry(glassWidth2, glassHeight, wallThickness / 2);
    var glassMesh3 = new THREE.Mesh(glassGeometrysingle);
    glass_BSP_1 = new ThreeBSP(glassMesh3);

    window_B = window_BSP.subtract(glass_BSP_1);

    glass_BSP_1 = new ThreeBSP(glassMesh3);

    window_B = window_B.subtract(glass_BSP_1);

    var window_mesh2 = window_B.toMesh(windowBMaterial);
    window_mesh2.receiveShadow = true;
    window_9.add(window_mesh2);

    // Okno front góra lewo
    var glassGeometry4 = new THREE.BoxGeometry(glassWidth2, glassHeight, 0.05);
    var glassMesh4 = new THREE.Mesh(glassGeometry4, material_glass);
    glassMesh4.receiveShadow = true;
    window_9.add(glassMesh4);
    window_9.applyMatrix(new THREE.Matrix4().makeTranslation(2.03 + windowWidth3 / 2, 4.09 + windowHeight1 / 2 + fundsHeight / 2, fundsDepth / 2 - wallThickness / 2));
    house.add(window_9);
    /*/scene.add(window_9);/*/

    // okno front góra prawo
    var window_10 = window_9.clone();
    window_10.applyMatrix(new THREE.Matrix4().makeTranslation(frontWallWidth1 + frontWallWidth2 / 2 + windowWidth3 / 2 + 0.03, 0, 0));
    house.add(window_10);
    /*/scene.add(window_10);/*/

    // okno tyl góra prawo
    var window_11 = window_9.clone();
    window_11.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -fundsDepth + wallThickness));
    house.add(window_11);
    /*/scene.add(window_11);/*/

    // okno tyl góra lewo
    var window_12 = window_10.clone();
    window_12.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -fundsDepth + wallThickness));
    house.add(window_12);
    /*/scene.add(window_12);/*/

    // okna pomieszczenie nad garażem
    var window_13 = window_9.clone();
    window_13.rotateY((90 * Math.PI) / 180);
    window_13.position.set(fundWidth1 + fundWidth2 + fundWidth3 + garageWidth - wallThickness / 2, 3.7 + windowHeight1 / 2 + garageHeight / 2, 0.45 + windowWidth3 / 2);
    house.add(window_13);
    /*/scene.add(window_13);/*/

    var window_14 = window_9.clone();
    window_14.rotateY((90 * Math.PI) / 180);
    window_14.position.set(fundWidth1 + fundWidth2 + fundWidth3 + garageWidth - wallThickness / 2, 3.7 + windowHeight1 / 2, -(0.45 + windowWidth3 / 2));
    house.add(window_14);
    /*/scene.add(window_14);/*/

    // okno balkon bok
    var window_15 = window_9.clone();
    window_15.rotateY((-90 * Math.PI) / 180);
    window_15.scale.x = 0.72;
    window_15.scale.y = 1.54;
    window_15.position.set(wallThickness / 2, 3.08 + windowHeight2 / 2 + fundsHeight / 2 + 0.16, 0.16 + windowWidth4 / 2);
    window_15.updateMatrix();
    house.add(window_15);
    /*/scene.add(window_15);/*/

    var window_16 = window_15.clone();
    window_16.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -0.32 - windowWidth4));
    house.add(window_16);
    /*/scene.add(window_16);/*/

    // luksfery
    // przód
    var windowLuxferGeometry = new THREE.BoxGeometry(luxferWindowWidth, windowHeight1, wallThickness / 2);
    var windowLuxfer1 = new THREE.Mesh(windowLuxferGeometry, luxferMaterial);
    windowLuxfer1.applyMatrix(new THREE.Matrix4().makeTranslation(frontWallWidth1 + 0.67 + luxferWindowWidth / 2, 0.5 + 0.16 + windowHeight1 / 2 + fundsHeight / 2, fundsDepth / 2 - wallThickness / 2 - 0.25));
    house.add(windowLuxfer1);
    /*/scene.add(windowLuxfer1);/*/

    var windowLuxfer2 = windowLuxfer1.clone();
    windowLuxfer2.position.set(frontWallWidth1 + frontWallWidth2 - 0.67 - luxferWindowWidth / 2, 0.5 + 0.16 + windowHeight1 / 2 + fundsHeight / 2, fundsDepth / 2 - wallThickness / 2 - 0.25);
    house.add(windowLuxfer2);
    /*/scene.add(windowLuxfer2);/*/

    // tył
    var windowLuxferGeometry_2 = new THREE.BoxGeometry(luxferWindowWidth * 2, windowHeight1, wallThickness / 2);
    var windowLuxfer3 = new THREE.Mesh(windowLuxferGeometry_2, luxferMaterialB);
    windowLuxfer3.applyMatrix(new THREE.Matrix4().makeTranslation(frontWallWidth1 + frontWallWidth2 + 1.05 + luxferWindowWidth * 2, windowHeight1 / 2 + 1.12 + fundsHeight / 2, -(fundsDepth / 2 - wallThickness / 2)));
    house.add(windowLuxfer3);
    /*/scene.add(windowLuxfer3);/*/

    var windowLuxfer4 = windowLuxfer3.clone();
    windowLuxfer4.applyMatrix(new THREE.Matrix4().makeTranslation(0.3 + luxferWindowWidth * 2, 0, 0));
    house.add(windowLuxfer4);
    /*/scene.add(windowLuxfer4);/*/

    var windowLuxferGeometry_3 = new THREE.BoxGeometry(windowWidth5, windowHeight3, wallThickness / 2);
    var windowLuxfer5 = new THREE.Mesh(windowLuxferGeometry_3, luxferMaterialC);
    windowLuxfer5.position.set(fundWidth1 + fundWidth2 + fundWidth3 + 1.33 + windowWidth5 / 2, 1.4 + windowHeight3 / 2 + garageHeight / 2, -(garageDepth / 2 - wallThickness / 2));
    house.add(windowLuxfer5);
    /*/scene.add(windowLuxfer5);/*/

    var windowLuxfer6 = windowLuxfer5.clone();
    windowLuxfer6.position.set(fundWidth1 + fundWidth2 + fundWidth3 + 1.33 + windowWidth5 + 3.13 + windowWidth5 / 2, 1.4 + windowHeight3 / 2 + garageHeight / 2, -(garageDepth / 2 - wallThickness / 2));
    house.add(windowLuxfer6);
    /*/scene.add(windowLuxfer6);/*/

    var windowLuxferGeometry_4 = new THREE.BoxGeometry(wallThickness / 2, windowHeight3, windowWidth5);
    var windowLuxfer7 = new THREE.Mesh(windowLuxferGeometry_4, luxferMaterialC);
    windowLuxfer7.position.set(fundWidth1 + fundWidth2 + fundWidth3 + garageWidth - wallThickness / 2, 1.4 + windowHeight3 / 2 + garageHeight / 2, 1.3 + windowWidth5);
    house.add(windowLuxfer7);
    /*/scene.add(windowLuxfer7);/*/

    var windowLuxfer8 = windowLuxfer7.clone();
    windowLuxfer8.position.set(fundWidth1 + fundWidth2 + fundWidth3 + garageWidth - wallThickness / 2, 1.4 + windowHeight3 / 2 + garageHeight / 2, -(1.3 + windowWidth5));
    house.add(windowLuxfer8);
    /*/scene.add(windowLuxfer8);/*/

    var windowLuxfer9 = windowLuxfer7.clone();
    windowLuxfer9.position.set(fundWidth1 + fundWidth2 + fundWidth3 + garageWidth - wallThickness / 2, 1.4 + windowHeight3 / 2 + garageHeight / 2, 0);
	house.add(windowLuxfer9);
    /*/scene.add(windowLuxfer9);/*/

    window_1.receiveShadow = true;
    window_2.receiveShadow = true;
    window_3.receiveShadow = true;
    window_4.receiveShadow = true;
    window_5.receiveShadow = true;
    window_6.receiveShadow = true;
    window_7.receiveShadow = true;
    window_8.receiveShadow = true;
    window_9.receiveShadow = true;
    window_10.receiveShadow = true;
    window_11.receiveShadow = true;
    window_12.receiveShadow = true;
    window_13.receiveShadow = true;
    window_14.receiveShadow = true;
    window_15.receiveShadow = true;
    window_16.receiveShadow = true;
    windowLuxfer1.receiveShadow = true;
    windowLuxfer2.receiveShadow = true;
    windowLuxfer3.receiveShadow = true;
    windowLuxfer4.receiveShadow = true;
    windowLuxfer5.receiveShadow = true;
    windowLuxfer6.receiveShadow = true;
    windowLuxfer7.receiveShadow = true;
    windowLuxfer8.receiveShadow = true;
    windowLuxfer9.receiveShadow = true;
  }

/*******************************************************************
	Funkcja tworzaca lampy 1
*******************************************************************/  
 createLamps();
 function createLamps(){
	  var lampGeometry1 = new THREE.CubeGeometry(0.17, 0.17, 0.05);
	var lampGeometry2 = new THREE.CubeGeometry(0.21,0.21,0.02);
	var lampGeometry3 = new THREE.CubeGeometry(0.13,0.13,0.02);
	var lampGeometry4 = new THREE.CubeGeometry(0.13,0.13,0.01);

	var lampMesh1 = new THREE.Mesh(lampGeometry1, material);
	var lampMesh2 = new THREE.Mesh(lampGeometry2, material);
	lampMesh2.applyMatrix(new THREE.Matrix4().makeTranslation(0,0, 0.05/2+ 0.02/2));
	var lampMesh3 = new THREE.Mesh(lampGeometry3, material);
	lampMesh3.applyMatrix(new THREE.Matrix4().makeTranslation(0,0, 0.05/2 + 0.02/2));
	
	var lampMesh_BSP_1 = new ThreeBSP(lampMesh1);
	var lampMesh_BSP_2 = new ThreeBSP(lampMesh2);
	var lampMesh_BSP_3 = new ThreeBSP(lampMesh3);
	var lampMesh_BSP = lampMesh_BSP_1.union(lampMesh_BSP_2);	
	lampMesh_BSP = lampMesh_BSP.subtract(lampMesh_BSP_3);
	
	//var lamp_geometry = new THREE.Geometry();
	//lamp_geometry.merge();
	var lampMesh = lampMesh_BSP.toMesh(lampMaterialA);	
	
	var lampLightMesh = new THREE.Mesh(lampGeometry4);
	lampLightMesh.applyMatrix(new THREE.Matrix4().makeTranslation(0,0, 0.05/2 + 0.02/2));
	lampLightMesh.receiveShadow = true;
	
	var lampGeometry = new THREE.Geometry();
	lampGeometry.merge(lampMesh.geometry, lampMesh.matrix);
	lampGeometry.merge(lampLightMesh.geometry, lampLightMesh.matrix);
	
	
	var lampMaterials = [];
	lampMaterials.push(lampMaterialA);
	lampMaterials.push(lampMaterialA);
	lampMaterials.push(lampMaterialA);
	lampMaterials.push(lampMaterialA);
	lampMaterials.push(lampMaterialB);
	lampMaterials.push(lampMaterialA);	
	
	var lampMaterial = new THREE.MeshFaceMaterial(lampMaterials);
	
	var lamp = new THREE.Mesh(lampGeometry, lampMaterial);
	
	lamp.applyMatrix(new THREE.Matrix4().makeTranslation(
	frontWallWidth1 + 0.67 + luxferWindowWidth / 2, 
	0.5 + 0.16 + windowHeight1 + fundsHeight / 2 + 0.2, 
	fundsDepth / 2 - 0.25 + 0.07/2 - 0.01));
	lamp.receiveShadow = true;
	lamp.castShadow = true;
	house.add(lamp);
	/*/scene.add(lamp);/*/
	
	var lamp2 = lamp.clone();
	lamp2.applyMatrix(new THREE.Matrix4().makeTranslation(1.89 + 0.17, 0, 0));
	
	house.add(lamp2);
	/*/scene.add(lamp2);/*/
	
	var lamp3 = lamp.clone();
	lamp3.position.set(-0.02,2.22 + 0.45,1.25);
	lamp3.rotateY(-(90 * Math.PI) / 180); 
	lamp3.updateMatrix();
	house.add(lamp3);
	/*/scene.add(lamp3);/*/
	
	var lamp4 = lamp3.clone();
	lamp4.position.set(-0.01,2.22 + 0.45,-1.25);
	lamp4.updateMatrix();
	house.add(lamp4);
	/*/scene.add(lamp4);/*/
	  
  } 
  
/*******************************************************************
	Funkcja tworzaca lampy 2
*******************************************************************/
createLamps2();
 function createLamps2(){
	  var lampGeometry1 = new THREE.CubeGeometry(0.38, 0.38, 0.05);
	var lampGeometry2 = new THREE.CubeGeometry(0.47,0.47,0.02);
	var lampGeometry3 = new THREE.CubeGeometry(0.36,0.36,0.02);
	var lampGeometry4 = new THREE.CubeGeometry(0.36,0.36,0.01);

	var lampMesh1 = new THREE.Mesh(lampGeometry1, material);
	var lampMesh2 = new THREE.Mesh(lampGeometry2, material);
	lampMesh2.applyMatrix(new THREE.Matrix4().makeTranslation(0,0, 0.05/2+ 0.02/2));
	var lampMesh3 = new THREE.Mesh(lampGeometry3, material);
	lampMesh3.applyMatrix(new THREE.Matrix4().makeTranslation(0,0, 0.05/2 + 0.02/2));
	
	var lampMesh_BSP_1 = new ThreeBSP(lampMesh1);
	var lampMesh_BSP_2 = new ThreeBSP(lampMesh2);
	var lampMesh_BSP_3 = new ThreeBSP(lampMesh3);
	var lampMesh_BSP = lampMesh_BSP_1.union(lampMesh_BSP_2);	
	lampMesh_BSP = lampMesh_BSP.subtract(lampMesh_BSP_3);
	
	//var lamp_geometry = new THREE.Geometry();
	//lamp_geometry.merge();
	var lampMesh = lampMesh_BSP.toMesh(lampMaterialA);	
	
	var lampLightMesh = new THREE.Mesh(lampGeometry4);
	lampLightMesh.applyMatrix(new THREE.Matrix4().makeTranslation(0,0, 0.05/2 + 0.02/2));
	lampLightMesh.receiveShadow = true;
	
	var lampGeometry = new THREE.Geometry();
	lampGeometry.merge(lampMesh.geometry, lampMesh.matrix);
	lampGeometry.merge(lampLightMesh.geometry, lampLightMesh.matrix);
	
	
	var lampMaterials = [];
	lampMaterials.push(lampMaterialA);
	lampMaterials.push(lampMaterialA);
	lampMaterials.push(lampMaterialA);
	lampMaterials.push(lampMaterialA);
	lampMaterials.push(lampMaterialB);
	lampMaterials.push(lampMaterialA);	
	
	var lampMaterial = new THREE.MeshFaceMaterial(lampMaterials);
	
	var lamp = new THREE.Mesh(lampGeometry, lampMaterial);
	
	lamp.applyMatrix(new THREE.Matrix4().makeTranslation(fundWidth1 + fundWidth2 + fundWidth3 + garageWidth / 2 - garageDoorWidth/2 - 0.38/2, 0.4 + garageHeight + garageWallHeight1 / 2, garageDepth / 2 + 0.01));
	lamp.receiveShadow = true;
	lamp.castShadow = true;
	house.add(lamp);
	/*/scene.add(lamp);/*/
	
	var lamp2 = lamp.clone();
	lamp2.applyMatrix(new THREE.Matrix4().makeTranslation(2.94, 0, 0));
	
	house.add(lamp2);
	/*/scene.add(lamp2);/*/
	  
  }

/*******************************************************************
	Funkcja tworzaca klamki
*******************************************************************/  
 createHandles();
 function createHandles(){
	var doorHandleWidth = 0.03;
	var doorHandleHeight = 0.18;
	var doorHandleDepth = 0.01;
	var handleGeometry1 = new THREE.CylinderGeometry( doorHandleWidth, doorHandleWidth, doorHandleDepth, 32, 2, false, Math.PI/2, Math.PI );
	var handleGeometry2 = new THREE.BoxGeometry(doorHandleWidth*2, doorHandleHeight, doorHandleDepth);
	var handleGeometry3 = new THREE.CylinderGeometry( 0.01, 0.01, doorHandleDepth*2, 32, 2);
	var handleGeometry4 = new THREE.TorusGeometry( 0.02, 0.01, 30, 60, Math.PI/2 );
	var handleGeometry5 = new THREE.CylinderGeometry( 0.01, 0.01, 0.09, 32, 2);
	var sphereHoleGeometry = new THREE.CylinderGeometry( 0.005, 0.005, doorHandleDepth, 32, 2);
	var sphereHoleGeometry2 = new THREE.CylinderGeometry( 0.01, 0.01, doorHandleDepth, 32, 2);
	var boxHoleGeometry = new THREE.BoxGeometry(0.01,0.03,doorHandleDepth);

	var handleMesh1 = new THREE.Mesh( handleGeometry1);
	handleMesh1.rotation.x += Math.PI / 2;
	//handleMesh1.updateMatrix();
	var handleMesh1_BSP = new ThreeBSP(handleMesh1);
	var sphereHoleMesh = new THREE.Mesh(sphereHoleGeometry);
	sphereHoleMesh.rotation.x += Math.PI / 2;
	sphereHoleMesh.updateMatrix();
	sphereHoleMesh.applyMatrix(new THREE.Matrix4().makeTranslation(0,doorHandleWidth/3,0));
	var sphereHoleMesh_BSP = new ThreeBSP(sphereHoleMesh);
	handleMesh1_BSP = handleMesh1_BSP.subtract(sphereHoleMesh_BSP);
	handleMesh1 = handleMesh1_BSP.toMesh(doorHandleMaterial);
	
	handleMesh1.receiveShadow = true;
	handleMesh1.castShadow = true;
	//scene.add( handleMesh1 );

	var handleMesh2 = new THREE.Mesh( handleGeometry2);
	handleMesh2.applyMatrix(new THREE.Matrix4().makeTranslation(0,-doorHandleHeight/2,0));
	var handleMesh2_BSP = new ThreeBSP(handleMesh2);
	var sphereHoleMesh2 = new THREE.Mesh(sphereHoleGeometry2);
	sphereHoleMesh2.rotation.x += Math.PI / 2;
	sphereHoleMesh2.updateMatrix();
	sphereHoleMesh2.applyMatrix(new THREE.Matrix4().makeTranslation(0,-doorHandleHeight/2-0.02,0));
	var sphereHoleMesh2_BSP = new ThreeBSP(sphereHoleMesh2);
	handleMesh2_BSP = handleMesh2_BSP.subtract(sphereHoleMesh2_BSP);

	var boxHoleMesh = new THREE.Mesh(boxHoleGeometry);
	boxHoleMesh.applyMatrix(new THREE.Matrix4().makeTranslation(0,-doorHandleHeight/2-0.08/2,0));
	var boxHoleMesh_BSP = new ThreeBSP(boxHoleMesh);
	handleMesh2_BSP = handleMesh2_BSP.subtract(boxHoleMesh_BSP);
	handleMesh2 = handleMesh2_BSP.toMesh(doorHandleMaterial);
	
	handleMesh2.receiveShadow = true;
	handleMesh2.castShadow = true;
	//scene.add( handleMesh2 );

	var handleMesh3 = handleMesh1.clone();
	handleMesh3.rotation.x += Math.PI;
	handleMesh3.updateMatrix();
	handleMesh3.applyMatrix(new THREE.Matrix4().makeTranslation(0,-doorHandleHeight,0));
	
	handleMesh3.receiveShadow = true;
	handleMesh3.castShadow = true;
	//scene.add(handleMesh3);

	var handleMesh4 = new THREE.Mesh(handleGeometry3, doorHandleMaterial);
	handleMesh4.rotation.x += Math.PI/2;
	handleMesh4.updateMatrix();
	handleMesh4.applyMatrix(new THREE.Matrix4().makeTranslation(0,-0.07,doorHandleDepth));
	
	handleMesh4.receiveShadow = true;
	handleMesh4.castShadow = true;
	//scene.add(handleMesh4);

	var handleMesh5 = new THREE.Mesh(handleGeometry4, doorHandleMaterial);
	handleMesh5.rotation.x += Math.PI/2;
	handleMesh5.updateMatrix();
	handleMesh5.applyMatrix(new THREE.Matrix4().makeTranslation(-0.02,-0.07,doorHandleDepth*2));
	handleMesh5.receiveShadow = true;
	handleMesh5.castShadow = true;
	//scene.add(handleMesh5);

	var handleMesh6 = new THREE.Mesh(handleGeometry5, doorHandleMaterial);
	handleMesh6.rotation.z += Math.PI/2;
	handleMesh6.updateMatrix();
	handleMesh6.applyMatrix(new THREE.Matrix4().makeTranslation(-0.025-doorHandleDepth*4,-0.07,doorHandleDepth*2 + 0.02));
	handleMesh6.receiveShadow = true;
	handleMesh6.castShadow = true;
	//scene.add(handleMesh6);

	var doorHandle = new THREE.Object3D();
	doorHandle.add(handleMesh1);
	doorHandle.add(handleMesh2);
	doorHandle.add(handleMesh3);
	doorHandle.add(handleMesh4);
	doorHandle.add(handleMesh5);
	doorHandle.add(handleMesh6);
	house.add(doorHandle);
	/*/scene.add(doorHandle);/*/
	
	doorHandle.position.set(fundWidth1+fundWidth2/2 + mainDoorWidth/2.6,fundsHeight+mainDoorHeight/2,fundsDepth/2-0.25-wallThickness/4);
	
	var doorHandle2 = doorHandle.clone();
	doorHandle2.rotation.y += Math.PI/2
	doorHandle2.position.set(fundWidth1+fundWidth2+fundWidth3-wallThickness/4,fundsHeight+mainDoorHeight/2,-fundsDepth/2+0.9/8+ 0.4);
	house.add(doorHandle2);
	/*/scene.add(doorHandle2);*/
 }
 
 
/*******************************************************************
	Skalowanie domu i dodanie go do sceny
*******************************************************************/
	house.scale.set(5,5,5);
	house.updateMatrix();
	house.applyMatrix(new THREE.Matrix4().makeTranslation(0,fundsHeight/2*5,0));
	scene.add(house);

  /******************************************************************************
  ******************************************************************************
  ******************************************************************************
  Kamera
  ******************************************************************************/
  camera.position.z = 125;
  camera.position.x = 10;
  camera.position.y = 27;

  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 1;
  controls.enableZoom = true;
  controls.center.set(fundsWidth*2, 10, 0);

  var light = new THREE.DirectionalLight(0xffffff, 0.2);
  light.position.set(1, 4, 33);
   light.color.setHSL(0.1, 1, 0.95);
  //light.position.set(-4, 35, 46);
  //	light.position.multiplyScalar( 50 );			
  light.castShadow = true;
  light.shadowMapWidth = 4096;
  light.shadowMapHeight = 4096;
  light.shadowDarkness = 0.5;
  var d = 500;
  light.shadowCameraLeft = -d;
  light.shadowCameraRight = d;
  light.shadowCameraTop = d;
  light.shadowCameraBottom = -d;
  light.shadowCameraFar = 8500;
  light.shadowBias = -0.000001;

  light.shadowCameraVisible = true;
 scene.add(light);

  var dirLight = new THREE.SpotLight(0xffffff, 1);
  dirLight.color.setHSL(0.1, 1, 0.95);
  dirLight.position.set(-4, 35, 46);
  //	dirLight.position.multiplyScalar( 50 );			
  dirLight.castShadow = true;
  dirLight.shadowMapWidth = 4096;
  dirLight.shadowMapHeight = 4096;
  dirLight.shadowDarkness = 0.5;
  var d = 500;
  dirLight.shadowCameraLeft = -d;
  dirLight.shadowCameraRight = d;
  dirLight.shadowCameraTop = d;
  dirLight.shadowCameraBottom = -d;
  dirLight.shadowCameraFar = 8500;
  dirLight.shadowBias = -0.000001;

  dirLight.shadowCameraVisible = true;

  scene.add(dirLight);

  var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.3);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(0.095, 13, 0.75);
  hemiLight.position.set(10, 100, 0);
  scene.add(hemiLight);

  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

});
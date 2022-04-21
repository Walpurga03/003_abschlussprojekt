    //blenderDateiName
    let path = "halfter3";

    // playground-Format 
    const createScene = function (engine, canvas) {
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.0, 0.0, 0.0, 0.0);

        //lade model
        BABYLON.SceneLoader.ImportMeshAsync("", "./", "assets/models/" + path + ".babylon")
            .then(function (result) {

                //mesh to objekt
                stoffueberzug = result.meshes[0];
                polsterung = result.meshes[1];
                metallteile = result.meshes[2];

                //zoom min. max. definieren
                scene.activeCamera.lowerRadiusLimit = 2.5;
                scene.activeCamera.upperRadiusLimit = 2.5;
                scene.activeCamera.useBouncingBehavior = true;

               //texture zu material
               baumrinde = new BABYLON.StandardMaterial("baumrinde", scene);
               baumrinde.diffuseTexture = new BABYLON.Texture("assets/images/stoffueberzug/baumrinde.png", scene);
               candy = new BABYLON.StandardMaterial("candy", scene);
               candy.diffuseTexture = new BABYLON.Texture("assets/images/stoffueberzug/candy.png", scene);
               fellimitatOzelot = new BABYLON.StandardMaterial("fellimitatOzelot", scene);
               fellimitatOzelot.diffuseTexture = new BABYLON.Texture("assets/images/stoffueberzug/fellimitatOzelot.png", scene);
               fellimitatZebra = new BABYLON.StandardMaterial("fellimitatZebra", scene);
               fellimitatZebra.diffuseTexture = new BABYLON.Texture("assets/images/stoffueberzug/fellimitatZebra.png", scene);
               holzHellbraun = new BABYLON.StandardMaterial("holzHellbraun", scene);
               holzHellbraun.diffuseTexture = new BABYLON.Texture("assets/images/stoffueberzug/holzHellbraun.png", scene);
               jeansBlau = new BABYLON.StandardMaterial("jeansBlau", scene);
               jeansBlau.diffuseTexture = new BABYLON.Texture("assets/images/stoffueberzug/jeansBlau.png", scene);
               jeansSchwarz = new BABYLON.StandardMaterial("jeansSchwarz", scene);
               jeansSchwarz.diffuseTexture = new BABYLON.Texture("assets/images/stoffueberzug/jeansSchwarz.png", scene);
               kork = new BABYLON.StandardMaterial("kork", scene);
               kork.diffuseTexture = new BABYLON.Texture("assets/images/stoffueberzug/kork.png", scene);
               rauteLachs = new BABYLON.StandardMaterial("rauteLachs", scene);
               rauteLachs.diffuseTexture = new BABYLON.Texture("assets/images/stoffueberzug/rauteLachs.png", scene);
               regenbogen = new BABYLON.StandardMaterial("regenbogen", scene);
               regenbogen.diffuseTexture = new BABYLON.Texture("assets/images/stoffueberzug/regenbogen.png", scene);
               trachtPink = new BABYLON.StandardMaterial("trachtPink", scene);
               trachtPink.diffuseTexture = new BABYLON.Texture("assets/images/stoffueberzug/trachtPink.png", scene);
               vichykaroTürkis = new BABYLON.StandardMaterial("vichykaroTürkis", scene);
               vichykaroTürkis.diffuseTexture = new BABYLON.Texture("assets/images/stoffueberzug/vichykaroTürkis.png", scene);
  
               gold = new BABYLON.StandardMaterial("gold", scene);
               gold.diffuseTexture = new BABYLON.Texture("assets/images/metallteile/gold.jpg", scene);
               silber = new BABYLON.StandardMaterial("silber", scene);
               silber.diffuseTexture = new BABYLON.Texture("assets/images/metallteile/silber.jpg", scene);

               fellimitatOzelot = new BABYLON.StandardMaterial("fellimitatOzelot", scene);
               fellimitatOzelot.diffuseTexture = new BABYLON.Texture("assets/images/polsterung/fellimitatOzelot.png", scene);
               fellimitatZebra = new BABYLON.StandardMaterial("fellimitatZebra", scene);
               fellimitatZebra.diffuseTexture = new BABYLON.Texture("assets/images/polsterung/fellimitatZebra.png", scene);
               fleeceCamel = new BABYLON.StandardMaterial("fleeceCamel", scene);
               fleeceCamel.diffuseTexture = new BABYLON.Texture("assets/images/polsterung/fleeceCamel.png", scene);
               fleecePink = new BABYLON.StandardMaterial("fleecePink", scene);
               fleecePink.diffuseTexture = new BABYLON.Texture("assets/images/polsterung/fleecePink.png", scene);
               fleeceRot = new BABYLON.StandardMaterial("fleeceRot", scene);
               fleeceRot.diffuseTexture = new BABYLON.Texture("assets/images/polsterung/fleeceRot.png", scene);
               naturWeiß = new BABYLON.StandardMaterial("naturWeiß", scene);
               naturWeiß.diffuseTexture = new BABYLON.Texture("assets/images/polsterung/naturWeiß.png", scene);
               softshellSchwarz = new BABYLON.StandardMaterial("softshellSchwarz", scene);
               softshellSchwarz.diffuseTexture = new BABYLON.Texture("assets/images/polsterung/softshellSchwarz.png", scene);
               softshellTürkis = new BABYLON.StandardMaterial("softshellTürkis", scene);
               softshellTürkis.diffuseTexture = new BABYLON.Texture("assets/images/polsterung/softshellTürkis.png", scene);

               return scene;
           });
       //camera pos
       const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
       camera.attachControl(canvas, true);

       
       //light pos
       const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0));
       light.diffuse = new BABYLON.Color3(1, 1, 1);
       light.specular = new BABYLON.Color3(1, 1, 1);
       light.groundColor = new BABYLON.Color3(1, 1, 1);
      
       return scene;
   };

   function reloadScene() {
       //Holt das Leinwand-Element
       const canvas = document.getElementById("renderCanvas"); 
       //Generiere die BABYLON 3D-Engine
       const engine = new BABYLON.Engine(canvas, true); 
       //Rufen Sie die createScene-Funktion auf
       const scene = createScene(engine, canvas); 

       //Registrieren Sie eine Renderschleife, um die Szene wiederholt zu rendern
       engine.runRenderLoop(function () {
           scene.render();
       });

       //Achtet auf Browser-/Leinwand-Größenänderungsereignisse
       window.addEventListener("resize", function () {
           engine.resize();
       });
   };

   window.onload = reloadScene;

   //auswahl
   function waehleStoffueberzug(material) {
       const gewaehlterStoffueberzug = material ?? document.getElementById("stoffueberzug").value;
       switch (gewaehlterStoffueberzug) {
           case "baumrinde":
               stoffueberzug.material = baumrinde;
               break;
           case "candy":
               stoffueberzug.material = candy;
               break;
           case "fellimitatOzelot":
               stoffueberzug.material = fellimitatOzelot;
               break;
           case "fellimitatZebra":
               stoffueberzug.material = fellimitatZebra;
               break;
           case "holzHellbraun":
               stoffueberzug.material = holzHellbraun;
               break;
           case "jeansBlau":
               stoffueberzug.material = jeansBlau;
               break;
           case "jeansSchwarz":
               stoffueberzug.material = jeansSchwarz;
               break;
           case "kork":
                stoffueberzug.material = kork;
                break;
           case "rauteLachs":
               stoffueberzug.material = rauteLachs;
               break;
            case "regenbogen":
                stoffueberzug.material = regenbogen;
                break;
            case "trachtPink":
                stoffueberzug.material = trachtPink;
                break;
            case "vichykaroTürkis":
                stoffueberzug.material = vichykaroTürkis;
                break;
       }
   }

   function waehleMetallteile(material) {
    const gewaehkteMetallteile = material ?? document.getElementById("metallteile").value;
    switch (gewaehkteMetallteile) {
        case "gold":
            metallteile.material = gold;
            break;
        case "silber":
            metallteile.material = silber;
            break;
    }
}

   function waehlePolsterung(material) {
       const gewaehltePolsterung = material ?? document.getElementById("polsterung").value;
       switch (gewaehltePolsterung) {
           case "fellimitatOzelot":
               polsterung.material = fellimitatOzelot;
               break;
           case "fellimitatZebra":
               polsterung.material = fellimitatZebra;
               break;
           case "fleeceCamel":
               polsterung.material = fleeceCamel;
               break;
            case "fleecePink":
                polsterung.material = fleecePink;
                break;
            case "fleeceRot":
               polsterung.material = fleeceRot;
               break;
            case "naturWeiß":
               polsterung.material = naturWeiß;
               break;
            case "softshellSchwarz":
               polsterung.material = softshellSchwarz;
               break;
            case "softshellTürkis":
               polsterung.material = softshellTürkis;
               break;

       }
   }

   
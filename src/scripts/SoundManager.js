class SoundManager {
    constructor(oSceneObj) {
        this.oSceneObj = oSceneObj;
        
        this.backgroundMusic = this.oSceneObj.sound.add("backgroundMusic");
        this.jumpSound = this.oSceneObj.sound.add("jumpSound");
        this.dieSound = this.oSceneObj.sound.add("dieSound");
        this.yaySound = this.oSceneObj.sound.add("yaySound");
    }
    playSound(key, loop) {
        key.play();
        key.loop = loop;
    }
    stopSound(key, loop) {
        key.loop = loop
        key.stop();
    }

}
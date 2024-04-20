export class Power {
    static command = "default";
    static description = "This is the default power, it does nothing.";
    static cost = 0;


    static test() {

    }
}


export class Splash extends Power {
    static command = "splash";
    static description = "This power will splash the tiles around the player.";
    static cost = 1;

    static test() {

    }
}
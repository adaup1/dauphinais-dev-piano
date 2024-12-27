declare module "tunajs" {
  class Tuna {
    constructor(context: AudioContext);
    Convolver: new (options: {
      highCut: number;
      lowCut: number;
      dryLevel: number;
      wetLevel: number;
      level: number;
      impulse: string;
      bypass: boolean;
    }) => AudioNode;
  }
  export default Tuna;
}

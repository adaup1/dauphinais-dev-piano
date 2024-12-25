export interface MenuContextProps {
  audioOn: boolean;
  audioContext: AudioContext | null;
  tunaReverb: any | null;
  setAudioOn: (audioOn: boolean) => void;
}

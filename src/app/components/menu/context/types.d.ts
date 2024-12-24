export interface MenuContextProps {
  audioOn: boolean;
  audioContext: AudioContext | null;
  setAudioOn: (audioOn: boolean) => void;
}

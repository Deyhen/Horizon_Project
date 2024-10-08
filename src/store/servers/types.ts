export interface ServersState {
  data: GameServer[];
}
export interface GameServer {
  title: string;
  ip: string;
  port?: string;
  type: string;
  playersNow: number;
}

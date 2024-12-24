export interface PrivilegesState {
  data: DataState;
  loading: boolean;
}

export interface DataState {
  privileges: PrivilegeState[];
  generalResponsibilities: string[];
}

export interface PrivilegeState {
  name: string;
  responsobilities: string[];
  imageName: string;
  privateSize: number;
  privateCount: number;
  cost: number;
}

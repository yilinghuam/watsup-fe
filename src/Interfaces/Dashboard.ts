export interface Formconfig {
    Details:{},
    Setup:[]
}

export interface ViewConfig {
    [name: string]: string;
  }

export interface DashboardViewConfig {
    host: Array<ViewConfig>| [];
    user: Array<ViewConfig>| [];
  }
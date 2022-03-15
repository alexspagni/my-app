export type actionLibrariesType = {
  type: string;
  payload: any;
};

export type actionImageType = {
  type: string;
  payload: any;
};

export type nasaObject = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  type: string;
  url: string;
  title: string;
};
export type cameraType = {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
};
export type roverType = {
  id: number;
  name: string;
  landing_date: string;
  lunch_date: string;
  status: string;
};
export type marsObject = {
  id: number;
  sol: number;
  camera: cameraType;
  img_src: string;
  earth_date: string;
  rover: roverType;
};
export type dateObject = {
  earth_day: string;
  earth_month: string;
  earth_year: string;
};
export type sign = {
  signIn: boolean;
  error_message: string;
};

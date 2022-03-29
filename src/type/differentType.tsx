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
  id: string;
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
export type stateUser = {
  token: string;
  error_message: string;
};
export type signType = {
  email: string;
  password: string;
};

export type roverDataType = {
  rover_name: string;
  page_number: number;
  earth_day: string;
  earth_month: string;
  earth_year: string;
};
export type imageType = {
  image: marsObject;
  hide: boolean;
};

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
export type SignComponentType = {
  headerText: string;
  onSubmit: ({ email, password }: SignDataType) => void;
  error_message: string;
  buttonName: string;
};
type SignDataType = {
  email: string;
  password: string;
};

export type TextInputType = {
  term: string;
  value: string;
  onChangeText(s: string): void;
};

export type FilterButtonComponentType = {
  buttonName: string;
  onPressButton: () => void;
  buttonWidth: number;
  buttonHeight: number;
  color: string;
  setColor: (s: string) => void;
};
export type ButtonComponentType = {
  buttonName: string;
  buttonColor: string;
  buttonWidth: number;
  onPressButton: () => void;
  heightButton: number;
};

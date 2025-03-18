export interface UserRegisterDto {
  name: string;
  email: string;
  birthdate: Date;
  nDni: number;
  username: string;
  password: string;
}

export interface UserLoginDto {
  username: string;
  password: string;
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
  birthdate: Date;
  nDni: number
}

export interface UserLoginSucessDto {
  login: boolean,
  user: UserDto
}
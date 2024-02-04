interface Alien {
  name: string;
  profilePicture?: string;
  shortBio?: string;

  species: string;
  origin: string;
  currentLocation: string;
  occupation: string;

  age: string;
  height: string;
  mbti: string;

  bodyCount: number | string;
  numberOfFingers: number | string;

  visibleSpectrum: string;
  dimensionalCompatibility: string;
  meansOfCommunication: string;
}

export { Alien };

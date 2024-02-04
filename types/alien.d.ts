interface Alien {
  name: string;
  profilePicture?: string; // TODO:
  shortBio?: string;

  species: string;
  origin: string;
  currentLocation: string;
  occupation: string;

  age: string;
  height: string;
  mbti: string;

  bodyCount: number;
  numberOfFingers: number;

  visibleSpectrum: string;
  dimensionalCompatibility: string;
  meansOfCommunication: string;

  favoriteFood: string;
  favoriteProgrammingLanguage: string;
  funFact?: string;
}

export { Alien };

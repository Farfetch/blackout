export enum Gender {
  Woman = 'Woman',
  Man = 'Man',
  Unisex = 'Unisex',
  Kid = 'Kid',
}

export enum UserGender {
  NotDefined = 'NotDefined',
  Male = 'Male',
  Female = 'Female',
}

export enum UserGenderLogin {
  NotDefined,
  Male,
  Female,
}

export type GenderDescription = 'Woman' | 'Man' | 'Unisex' | 'Kid';

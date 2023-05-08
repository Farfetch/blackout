export enum Gender {
  Woman = 'Woman',
  Man = 'Man',
  Unisex = 'Unisex',
  Kid = 'Kid',
}

export enum GenderCode {
  Woman,
  Man,
  Unisex,
  Kid,
}

export enum UserGender {
  NotDefined = 'NotDefined',
  Male = 'Male',
  Female = 'Female',
}

export enum UserGenderLegacy {
  NotDefined,
  Male,
  Female,
}

export type GenderDescription = 'Woman' | 'Man' | 'Unisex' | 'Kid';

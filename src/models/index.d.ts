import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type FavoritesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PetMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ImagesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CategoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AgeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Favorites {
  readonly id: string;
  readonly Pet?: Pet | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly favoritesPetId?: string | null;
  constructor(init: ModelInit<Favorites, FavoritesMetaData>);
  static copyOf(source: Favorites, mutator: (draft: MutableModel<Favorites, FavoritesMetaData>) => MutableModel<Favorites, FavoritesMetaData> | void): Favorites;
}

export declare class Pet {
  readonly id: string;
  readonly name?: string | null;
  readonly age?: string | null;
  readonly weight?: string | null;
  readonly sex?: string | null;
  readonly breed?: string | null;
  readonly address?: string | null;
  readonly Images?: (Images | null)[] | null;
  readonly Category?: Category | null;
  readonly about?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly petCategoryId?: string | null;
  constructor(init: ModelInit<Pet, PetMetaData>);
  static copyOf(source: Pet, mutator: (draft: MutableModel<Pet, PetMetaData>) => MutableModel<Pet, PetMetaData> | void): Pet;
}

export declare class Images {
  readonly id: string;
  readonly imageUri?: string | null;
  readonly petID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Images, ImagesMetaData>);
  static copyOf(source: Images, mutator: (draft: MutableModel<Images, ImagesMetaData>) => MutableModel<Images, ImagesMetaData> | void): Images;
}

export declare class Category {
  readonly id: string;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Category, CategoryMetaData>);
  static copyOf(source: Category, mutator: (draft: MutableModel<Category, CategoryMetaData>) => MutableModel<Category, CategoryMetaData> | void): Category;
}

export declare class Age {
  readonly id: string;
  readonly type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Age, AgeMetaData>);
  static copyOf(source: Age, mutator: (draft: MutableModel<Age, AgeMetaData>) => MutableModel<Age, AgeMetaData> | void): Age;
}

export declare class User {
  readonly id: string;
  readonly name?: string | null;
  readonly userName?: string | null;
  readonly phone?: string | null;
  readonly state?: string | null;
  readonly image?: string | null;
  readonly email?: string | null;
  readonly Favorites?: (Favorites | null)[] | null;
  readonly Pets?: (Pet | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}
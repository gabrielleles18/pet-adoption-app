import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

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

type EagerFavorites = {
  readonly id: string;
  readonly Pet?: Pet | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly favoritesPetId?: string | null;
}

type LazyFavorites = {
  readonly id: string;
  readonly Pet: AsyncItem<Pet | undefined>;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly favoritesPetId?: string | null;
}

export declare type Favorites = LazyLoading extends LazyLoadingDisabled ? EagerFavorites : LazyFavorites

export declare const Favorites: (new (init: ModelInit<Favorites, FavoritesMetaData>) => Favorites) & {
  copyOf(source: Favorites, mutator: (draft: MutableModel<Favorites, FavoritesMetaData>) => MutableModel<Favorites, FavoritesMetaData> | void): Favorites;
}

type EagerPet = {
  readonly id: string;
  readonly name?: string | null;
  readonly age?: number | null;
  readonly weight?: number | null;
  readonly sex?: string | null;
  readonly breed?: string | null;
  readonly address?: string | null;
  readonly Images?: (Images | null)[] | null;
  readonly Category?: Category | null;
  readonly about?: string | null;
  readonly userID: string;
  readonly Age?: Age | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly petCategoryId?: string | null;
  readonly petAgeId?: string | null;
}

type LazyPet = {
  readonly id: string;
  readonly name?: string | null;
  readonly age?: number | null;
  readonly weight?: number | null;
  readonly sex?: string | null;
  readonly breed?: string | null;
  readonly address?: string | null;
  readonly Images: AsyncCollection<Images>;
  readonly Category: AsyncItem<Category | undefined>;
  readonly about?: string | null;
  readonly userID: string;
  readonly Age: AsyncItem<Age | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly petCategoryId?: string | null;
  readonly petAgeId?: string | null;
}

export declare type Pet = LazyLoading extends LazyLoadingDisabled ? EagerPet : LazyPet

export declare const Pet: (new (init: ModelInit<Pet, PetMetaData>) => Pet) & {
  copyOf(source: Pet, mutator: (draft: MutableModel<Pet, PetMetaData>) => MutableModel<Pet, PetMetaData> | void): Pet;
}

type EagerImages = {
  readonly id: string;
  readonly imageUri?: string | null;
  readonly petID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyImages = {
  readonly id: string;
  readonly imageUri?: string | null;
  readonly petID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Images = LazyLoading extends LazyLoadingDisabled ? EagerImages : LazyImages

export declare const Images: (new (init: ModelInit<Images, ImagesMetaData>) => Images) & {
  copyOf(source: Images, mutator: (draft: MutableModel<Images, ImagesMetaData>) => MutableModel<Images, ImagesMetaData> | void): Images;
}

type EagerCategory = {
  readonly id: string;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategory = {
  readonly id: string;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Category = LazyLoading extends LazyLoadingDisabled ? EagerCategory : LazyCategory

export declare const Category: (new (init: ModelInit<Category, CategoryMetaData>) => Category) & {
  copyOf(source: Category, mutator: (draft: MutableModel<Category, CategoryMetaData>) => MutableModel<Category, CategoryMetaData> | void): Category;
}

type EagerAge = {
  readonly id: string;
  readonly type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAge = {
  readonly id: string;
  readonly type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Age = LazyLoading extends LazyLoadingDisabled ? EagerAge : LazyAge

export declare const Age: (new (init: ModelInit<Age, AgeMetaData>) => Age) & {
  copyOf(source: Age, mutator: (draft: MutableModel<Age, AgeMetaData>) => MutableModel<Age, AgeMetaData> | void): Age;
}

type EagerUser = {
  readonly id: string;
  readonly name?: string | null;
  readonly userName?: string | null;
  readonly phone?: number | null;
  readonly state?: string | null;
  readonly image?: string | null;
  readonly email?: string | null;
  readonly Favorites?: (Favorites | null)[] | null;
  readonly Pets?: (Pet | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly name?: string | null;
  readonly userName?: string | null;
  readonly phone?: number | null;
  readonly state?: string | null;
  readonly image?: string | null;
  readonly email?: string | null;
  readonly Favorites: AsyncCollection<Favorites>;
  readonly Pets: AsyncCollection<Pet>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}
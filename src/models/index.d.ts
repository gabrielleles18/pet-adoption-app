import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

type PetMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ImagesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CategoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AgeTypeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FavoritesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerPet = {
  readonly id: string;
  readonly name?: string | null;
  readonly age?: number | null;
  readonly weight?: string | null;
  readonly sex?: string | null;
  readonly breed?: string | null;
  readonly address?: string | null;
  readonly abount?: string | null;
  readonly Images?: (Images | null)[] | null;
  readonly Category?: Category | null;
  readonly userID: string;
  readonly AgeType?: AgeType | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly petCategoryId?: string | null;
  readonly petAgeTypeId?: string | null;
}

type LazyPet = {
  readonly id: string;
  readonly name?: string | null;
  readonly age?: number | null;
  readonly weight?: string | null;
  readonly sex?: string | null;
  readonly breed?: string | null;
  readonly address?: string | null;
  readonly abount?: string | null;
  readonly Images: AsyncCollection<Images>;
  readonly Category: AsyncItem<Category | undefined>;
  readonly userID: string;
  readonly AgeType: AsyncItem<AgeType | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly petCategoryId?: string | null;
  readonly petAgeTypeId?: string | null;
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

type EagerAgeType = {
  readonly id: string;
  readonly type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAgeType = {
  readonly id: string;
  readonly type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AgeType = LazyLoading extends LazyLoadingDisabled ? EagerAgeType : LazyAgeType

export declare const AgeType: (new (init: ModelInit<AgeType, AgeTypeMetaData>) => AgeType) & {
  copyOf(source: AgeType, mutator: (draft: MutableModel<AgeType, AgeTypeMetaData>) => MutableModel<AgeType, AgeTypeMetaData> | void): AgeType;
}

type EagerFavorites = {
  readonly id: string;
  readonly userID: string;
  readonly Pet?: Pet | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly favoritesPetId?: string | null;
}

type LazyFavorites = {
  readonly id: string;
  readonly userID: string;
  readonly Pet: AsyncItem<Pet | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly favoritesPetId?: string | null;
}

export declare type Favorites = LazyLoading extends LazyLoadingDisabled ? EagerFavorites : LazyFavorites

export declare const Favorites: (new (init: ModelInit<Favorites, FavoritesMetaData>) => Favorites) & {
  copyOf(source: Favorites, mutator: (draft: MutableModel<Favorites, FavoritesMetaData>) => MutableModel<Favorites, FavoritesMetaData> | void): Favorites;
}

type EagerUser = {
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
}

type LazyUser = {
  readonly id: string;
  readonly name?: string | null;
  readonly userName?: string | null;
  readonly phone?: string | null;
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
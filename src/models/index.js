// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Pet, Images, Category, AgeType, Favorites, User } = initSchema(schema);

export {
  Pet,
  Images,
  Category,
  AgeType,
  Favorites,
  User
};
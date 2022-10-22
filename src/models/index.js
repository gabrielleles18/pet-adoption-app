// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Favorites, Pet, Images, Category, Age, User } = initSchema(schema);

export {
  Favorites,
  Pet,
  Images,
  Category,
  Age,
  User
};
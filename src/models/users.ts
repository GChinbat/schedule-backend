import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { ObjectID } from 'mongodb';

import { db } from './init';

export type User = {
  _id?: ObjectID;
  admin: boolean;
  username: string;
  password: string;
};

export type TokenData = {
  admin: boolean;
  username: string;
};

export async function authenticateToken(
  token: string,
): Promise<TokenData | null> {
  try {
    return jwt.verify(token, process.env.APP_SECRET) as TokenData;
  } catch {
    return null;
  }
}

export async function login(
  username: string,
  password: string,
): Promise<string> {
  const usersCollection = db.collection<User>('users');
  const user = await usersCollection.findOne({ username });
  if (!(await argon2.verify(user?.password, password))) {
    throw Error('Invalid login or password');
  }
  return jwt.sign(
    { admin: user.admin, username: user.username },
    process.env.APP_SECRET,
    { expiresIn: '1d' },
  );
}

export async function register(
  username: string,
  password: string,
): Promise<boolean> {
  const usersCollection = db.collection<User>('users');
  if ((await usersCollection.find({ username }).count()) > 0) {
    throw Error('User already exists!');
  }

  const user: User = {
    admin: false,
    username,
    password: await argon2.hash(password),
  };
  await usersCollection.insertOne(user);

  return true;
}

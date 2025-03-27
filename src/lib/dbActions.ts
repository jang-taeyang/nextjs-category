'use server';

import { Stuff, Condition, Category } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition, category.
 */
export async function addStuff(stuff: {
  name: string;
  quantity: number;
  owner: string;
  condition: string;
  category: string;
}) {
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else if (stuff.condition === 'fair') {
    condition = 'fair';
  }

  let category: Category = 'Other';
  if (
    stuff.category === 'Food'
    || stuff.category === 'Sporting_Goods'
    || stuff.category === 'Electronics'
  ) {
    category = stuff.category;
  }

  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
      category,
    },
  });

  // ⛔ Removed redirect so client can handle navigation after alert
}

/**
 * Edits an existing stuff in the database.
 */
export async function editStuff(stuff: Stuff) {
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
      category: stuff.category,
    },
  });

  redirect('/list');
}

/**
 * Deletes an existing stuff from the database.
 */
export async function deleteStuff(id: number) {
  await prisma.stuff.delete({
    where: { id },
  });

  redirect('/list');
}

/**
 * Creates a new user in the database.
 */
export async function createUser(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

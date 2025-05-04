import bcrypt from 'bcrypt'
import { User } from '../models/user.model.js'
import { Topic } from '../models/topic.model.js'
import { Post } from '../models/post.model.js'
import { Material } from '../models/material.model.js'
import { Comment } from '../models/comment.model.js'

export async function insertData () {
  const password = await bcrypt.hash('P@ssw0rd', 12)

  const users = [
    {
      email: 'isac_cortes82212@elpoli.edu.co',
      password,
      firstName: 'Isac',
      lastName: 'Cortes',
      secondLastName: 'Buitrago',
      major: 'Computer Engineering',
      role: 'student',
      age: 20
    },
    {
      email: 'emmanuel_bolivar82212@elpoli.edu.co',
      password,
      firstName: 'Emmanuel',
      lastName: 'Bolivar',
      secondLastName: 'Marin',
      major: 'Sports',
      role: 'student',
      age: 21
    },
    {
      email: 'juan_estrada82212@elpoli.edu.co',
      password,
      firstName: 'Juan',
      middleName: 'Jose',
      lastName: 'Estrada',
      secondLastName: 'Velez',
      major: 'Audiovisual communication',
      role: 'student',
      age: 21
    },
    {
      email: 'juan_adams82212@elpoli.edu.co',
      password,
      firstName: 'Juan',
      middleName: 'Pablo',
      lastName: 'Adams',
      secondLastName: 'Parra',
      major: 'Massotherapy',
      role: 'student',
      age: 21
    }
  ]

  const topics = [
    { name: 'Computer Science' },
    { name: 'Mathematics' },
    { name: 'Physics' },
    { name: 'Chemistry' },
    { name: 'Biology' },
    { name: 'Engineering' },
    { name: 'Economics' },
    { name: 'History' },
    { name: 'Literature' },
    { name: 'Philosophy' }
  ]

  const posts = [
    {
      message: 'Hello, this is my first post!',
      date: new Date('2025-05-03T10:00:00Z'),
      userId: 'isac_cortes82212@elpoli.edu.co',
      topicId: 1
    },
    {
      message: 'I love programming!',
      date: new Date('2025-05-03T10:05:00Z'),
      userId: 'isac_cortes82212@elpoli.edu.co',
      topicId: 1
    },
    {
      message: 'Math is fascinating!',
      date: new Date('2025-05-03T11:00:00Z'),
      userId: 'emmanuel_bolivar82212@elpoli.edu.co',
      topicId: 2
    },
    {
      message: 'I am gay! ❤️🏳️‍🌈',
      date: new Date('2025-05-03T11:00:00Z'),
      userId: 'juan_estrada82212@elpoli.edu.co',
      topicId: 9
    },
    {
      message: 'Petrico mi cuchurrumí! 💏🏻',
      date: new Date('2025-05-03T11:00:00Z'),
      userId: 'juan_adams82212@elpoli.edu.co',
      topicId: 7
    }
  ]

  const materials = [
    {
      uri: 'https://example.com/material1.pdf',
      postId: 1
    },
    {
      uri: 'https://example.com/material2.pdf',
      postId: 2
    },
    {
      uri: 'https://example.com/material3.pdf',
      postId: 3
    },
    {
      uri: 'https://example.com/material4.pdf',
      postId: 4
    },
    {
      uri: 'https://example.com/material5.pdf',
      postId: 5
    },
    {
      uri: 'https://example.com/material6.pdf',
      postId: 1
    },
    {
      uri: 'https://example.com/material7.pdf',
      postId: 1
    }
  ]

  const comments = [
    {
      message: 'Me too!! 🌈🌈',
      date: new Date('2025-05-03T10:10:00Z'),
      postId: 4,
      userId: 'emmanuel_bolivar82212@elpoli.edu.co'
    },
    {
      message: 'Why are you geh? 👨🏿‍🦲',
      date: new Date('2025-05-03T10:20:00Z'),
      postId: 4,
      userId: 'juan_adams82212@elpoli.edu.co'
    },
    {
      message: 'You are geh! 👨🏿‍🦲👨🏿‍🦲',
      date: new Date('2025-05-03T10:30:00Z'),
      postId: 4,
      userId: 'isac_cortes82212@elpoli.edu.co'
    }
  ]

  await User.bulkCreate(users)
  await Topic.bulkCreate(topics)
  await Post.bulkCreate(posts)
  await Material.bulkCreate(materials)
  await Comment.bulkCreate(comments)
  console.log('Data inserted successfully')
}

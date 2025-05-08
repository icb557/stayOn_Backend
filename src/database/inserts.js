import bcrypt from 'bcrypt'
import { User } from '../models/user.model.js'
import { Topic } from '../models/topic.model.js'
import { Post } from '../models/post.model.js'
import { Material } from '../models/material.model.js'
import { Comment } from '../models/comment.model.js'
import { Follower } from '../models/follower.model.js'

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
      message: `I am gay! ❤️🏳️‍🌈 
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Praesent ex lectus, sodales et maximus sit amet, vehicula ut sapien. 
      Fusce eu pulvinar nisl. Nunc vitae iaculis sapien. 
      Nunc dapibus metus nunc, id sagittis metus elementum et. Etiam viverra malesuada leo eget hendrerit. 
      Nulla commodo venenatis scelerisque. Vivamus in vulputate odio.`,
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
      name: 'doc1',
      uri: 'https://example.com/material1.pdf',
      type: 'document',
      postId: 1
    },
    {
      name: 'doc2',
      uri: 'https://example.com/material2.docx',
      type: 'document',
      postId: 2
    },
    {
      name: 'img1',
      uri: 'https://example.com/material3.jpg',
      type: 'image',
      postId: 3
    },
    {
      name: 'vid1',
      uri: 'https://example.com/material4.mp4',
      type: 'video',
      postId: 4
    },
    {
      name: 'url1',
      uri: 'https://example.com/material5.html',
      type: 'url',
      postId: 5
    },
    {
      name: 'url2',
      uri: 'https://example.com/material6.php',
      type: 'url',
      postId: 4
    },
    {
      name: 'img2',
      uri: 'https://example.com/material7.png',
      type: 'image',
      postId: 4
    },
    {
      name: 'doc3',
      uri: 'https://example.com/material8.pdf',
      type: 'document',
      postId: 4
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

  const followers = [
    { followedId: 'isac_cortes82212@elpoli.edu.co', followerId: 'juan_adams82212@elpoli.edu.co' },
    { followedId: 'isac_cortes82212@elpoli.edu.co', followerId: 'juan_estrada82212@elpoli.edu.co' },
    { followedId: 'isac_cortes82212@elpoli.edu.co', followerId: 'emmanuel_bolivar82212@elpoli.edu.co' },
    { followedId: 'juan_adams82212@elpoli.edu.co', followerId: 'isac_cortes82212@elpoli.edu.co' },
    { followedId: 'juan_adams82212@elpoli.edu.co', followerId: 'juan_estrada82212@elpoli.edu.co' },
    { followedId: 'juan_adams82212@elpoli.edu.co', followerId: 'emmanuel_bolivar82212@elpoli.edu.co' },
    { followedId: 'juan_estrada82212@elpoli.edu.co', followerId: 'isac_cortes82212@elpoli.edu.co' },
    { followedId: 'juan_estrada82212@elpoli.edu.co', followerId: 'juan_adams82212@elpoli.edu.co' },
    { followedId: 'juan_estrada82212@elpoli.edu.co', followerId: 'emmanuel_bolivar82212@elpoli.edu.co' },
    { followedId: 'emmanuel_bolivar82212@elpoli.edu.co', followerId: 'isac_cortes82212@elpoli.edu.co' },
    { followedId: 'emmanuel_bolivar82212@elpoli.edu.co', followerId: 'juan_adams82212@elpoli.edu.co' },
    { followedId: 'emmanuel_bolivar82212@elpoli.edu.co', followerId: 'juan_estrada82212@elpoli.edu.co' }
  ]

  await User.bulkCreate(users)
  await Topic.bulkCreate(topics)
  await Post.bulkCreate(posts)
  await Material.bulkCreate(materials)
  await Comment.bulkCreate(comments)
  await Follower.bulkCreate(followers)
  console.log('Data inserted successfully')
}

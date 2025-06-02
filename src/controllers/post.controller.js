import { Comment } from '../models/comment.model.js'
import { Material } from '../models/material.model.js'
import { Post } from '../models/post.model.js'
import { Topic } from '../models/topic.model.js'
import { User } from '../models/user.model.js'

export class PostController {
  getAllPosts = async (req, res) => {
    try {
      const posts = await Post.findAll({
        attributes: { exclude: ['topicId'] },
        include: [
          {
            model: User,
            as: 'User',
            attributes: { exclude: ['password', 'id'] }
          },
          {
            model: Comment,
            as: 'Comments',
            attributes: { exclude: ['postId'] },
            include: [
              {
                model: User,
                as: 'User',
                attributes: { exclude: ['password', 'id'] }
              }
            ]
          },
          {
            model: Material,
            as: 'Materials',
            attributes: { exclude: ['postId'] }
          },
          {
            model: Topic
          }
        ]
      })
      res.json(posts)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createPost = async (req, res) => {
    try {
      const { message, topicId, userId } = req.body

      const newPost = await Post.create({
        message,
        topicId,
        userId,
        date: new Date()
      })

      const files = req.files

      const materials = files.map(file => ({
        name: file.originalname,
        uri: file.filename,
        type: file.mimetype,
        postId: newPost.id
      }))

      await Material.bulkCreate(materials)

      res.status(201).json({ message: 'Post created succefully' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error creating Post' })
    }
  }

  getPostById = async (req, res) => {
    try {
      const { id } = req.params
      const post = await Post.findByPk(id, {
        attributes: { exclude: ['topicId'] },
        include: [
          {
            model: User,
            as: 'User',
            attributes: { exclude: ['password', 'id'] }
          },
          {
            model: Comment,
            as: 'Comments',
            attributes: { exclude: ['postId'] },
            include: [
              {
                model: User,
                as: 'User',
                attributes: { exclude: ['password', 'id'] }
              }
            ]
          },
          {
            model: Material,
            as: 'Materials',
            attributes: { exclude: ['postId'] }
          },
          {
            model: Topic
          }
        ]
      })

      if (post) {
        res.json(post)
      } else {
        res.status(404).json({ err: 'post not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message, error })
    }
  }

  getPostsByUser = async (req, res) => {
    try {
      const { userId } = req.params
      const post = await Post.findAll({
        where: { userId },
        attributes: { exclude: ['topicId'] },
        include: [
          {
            model: User,
            as: 'User',
            attributes: { exclude: ['password', 'id'] }
          },
          {
            model: Comment,
            as: 'Comments',
            attributes: { exclude: ['postId'] },
            include: [
              {
                model: User,
                as: 'User',
                attributes: { exclude: ['password', 'id'] }
              }
            ]
          },
          {
            model: Material,
            as: 'Materials',
            attributes: { exclude: ['postId'] }
          },
          {
            model: Topic
          }
        ]
      })
      if (post.length > 0) {
        res.json(post)
      } else {
        res.status(404).json({ err: 'posts not found for this user' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message, error })
    }
  }

  deletePost = async (req, res) => {
    try {
      const { id } = req.params
      const postDeleted = await Post.destroy({ where: { id } })
      if (!postDeleted) {
        return res.status(404).json({ message: 'Post does not exist', text: 'The post you are trying to delete does not exists', forUser: true })
      }
      res.status(200).json({ message: 'Post deleted successfully', forUser: true })
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  updatePost = async (req, res) => {
    try {
      const { id } = req.params
      const post = await Post.findByPk(id)
      if (!post) {
        return res.status(404).json({ message: 'Post does not exist', text: 'The post you are trying to update does not exists', forUser: true })
      }
      post.set({ message: req.body.message, topicId: req.body.topicId })
      await post.save()
      res.status(200).json(req.body)
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }
}

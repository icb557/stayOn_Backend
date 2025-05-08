// import { Op } from 'sequelize'
import { User } from '../models/user.model.js'
// import { Follower } from '../models/follower.model.js'
import { Post } from '../models/post.model.js'
import { Comment } from '../models/comment.model.js'
import { Topic } from '../models/topic.model.js'

export class ProfileController {
  getProfile = async (req, res) => {
    try {
      const { userId } = req.params
      console.log('userid: ', userId)
      const profile = await User.findByPk(userId, {
        attributes: { exclude: ['password'] },
        include: [
          {
            model: Post,
            as: 'Posts',
            attributes: { exclude: ['userId', 'topicId'] },
            include: [
              {
                model: Comment,
                as: 'Comments',
                attributes: { exclude: ['postId'] }
              },
              {
                model: Topic
              }
            ]
          },
          {
            model: User,
            as: 'Followers',
            attributes: { exclude: ['password'] },
            through: { attributes: [] }
          },
          {
            model: User,
            as: 'Following',
            attributes: { exclude: ['password'] },
            through: { attributes: [] }
          }
        ]
      })

      if (profile) {
        res.json(profile)
      } else {
        res.status(404).json({ err: 'Profile not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message, error })
    }
  }
}

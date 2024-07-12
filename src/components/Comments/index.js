import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import Comment from '../CommentItem'
import './index.css'

const commentImage =
  'https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialCommentsList = []

class Comments extends Component {
  state = {
    commentsList: initialCommentsList,
    username: '',
    description: '',
  }

  addComment = event => {
    event.preventDefault()
    const {username, description} = this.state
    const backgroundClassName =
      initialContainerBackgroundClassNames[
        Math.floor(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    const newComment = {
      id: uuidv4(),
      name: username,
      description,
      date: new Date(),
      isLiked: false,
      initialClassName: backgroundClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      username: '',
      description: '',
    }))
  }

  isToggleLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isLiked: !eachItem.isLiked}
        }
        return eachItem
      }),
    }))
  }

  onDeleteComment = id => {
    const {commentsList} = this.state
    const newCommentList = commentsList.filter(eachItem => eachItem.id !== id)
    this.setState({commentsList: newCommentList})
  }

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangeDescription = event => {
    this.setState({description: event.target.value})
  }

  render() {
    const {commentsList, username, description} = this.state

    return (
      <div className="bg-container">
        <h1 className="title">Comments</h1>
        <div className="user-container">
          <form onSubmit={this.addComment}>
            <p>Say something about 4.0 Technologies</p>
            <input
              type="text"
              value={username}
              className="input-user"
              onChange={this.onChangeName}
              placeholder="Your Name"
            />
            <textarea
              rows="7"
              cols="50"
              value={description}
              className="description"
              placeholder="Your Comment"
              onChange={this.onChangeDescription}
            >
              .
            </textarea>
            <br />
            <button className="addButton" type="submit">
              Add Comment
            </button>
          </form>
          <img src={commentImage} alt="comments" />
        </div>
        <hr className="horizontal-line" />
        <p>
          <span>{commentsList.length}</span> Comments
        </p>
        <ul>
          {commentsList.map(eachContact => (
            <Comment
              key={eachContact.id}
              date={formatDistanceToNow(eachContact.date)}
              details={eachContact}
              isToggleLiked={this.isToggleLiked}
              onDeleteComment={this.onDeleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments

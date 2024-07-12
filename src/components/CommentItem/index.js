import './index.css'

const deleteImage =
  'https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png'
const unlikeImage =
  'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
const likedImage =
  'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

const Comment = props => {
  const {details, isToggleLiked, date, onDeleteComment} = props
  const {name, id, description, initialClassName} = details

  const likeIcon = isToggleLiked ? likedImage : unlikeImage
  const likeTextClass = isToggleLiked ? 'blue-color' : ''

  const handleLike = () => {
    isToggleLiked(id)
  }

  const handleDelete = () => {
    onDeleteComment(id)
  }

  return (
    <li>
      <div className="comment-section-card">
        <div className={`profile-card ${initialClassName}`}>{name[0]}</div>
        <div>
          <div className="time-card">
            <p className="person-name">{name}</p>
            <p>{date}</p>
          </div>
          <p>{description}</p>
        </div>
      </div>
      <div className="last-container">
        <div className="like-card">
          <img src={likeIcon} alt="like" className="like-image" />
          <button className={likeTextClass} onClick={handleLike}>
            Like
          </button>
        </div>
        <button testid="delete" onClick={handleDelete}>
          <img src={deleteImage} alt="delete" />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default Comment

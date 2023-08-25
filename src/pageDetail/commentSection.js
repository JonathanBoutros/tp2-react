import React from 'react';
import '../css/comment.css';

const CommentSection = ({
  commentValue,
  handleComment,
  addComment,
  allComments,
  deleteComment,
}) => {
  return (
    <div className="mt-4">
      <h3 className="mb-3 comment-title">Comments</h3>

      <div className="mb-4">
        <div className="form-group">
          <label htmlFor="commentInput">Commentaire:</label>
          <textarea
            className="form-control comment-input"
            id="commentInput"
            rows="3"
            placeholder='Ajouter un commentaire...'
            value={commentValue}
            onChange={handleComment}
          ></textarea>
        </div>
        <button className="btn btn-sub" onClick={addComment}>Submit</button>
      </div>

      {allComments.map((comment) => (
        <div className="col-sm-12 col-md-12 mb-3" key={comment.id}>
          <div className="card">
            <div className="card-body com-bubble">
              <p className="card-text">{comment.content}</p>
              <button className="btn btn-sm btn-dlt-com" onClick={() => deleteComment(comment.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

};

export default CommentSection;

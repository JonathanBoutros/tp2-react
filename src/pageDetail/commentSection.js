import React from 'react';

const CommentSection = ({
  commentValue,
  handleComment,
  addComment,
  allComments,
  deleteComment,
}) => {
  return (
      <div>
          <h3>Section Commentaire</h3>
          <label htmlFor="commentInput">Commentaire:</label>
          <br></br>
          <input
            type="text"
            value={commentValue}
            placeholder='Ajouter un commentaire...'
            onChange={handleComment}
          />
          <button onClick={addComment}>Submit</button>
          <div>
            {allComments.map((comment) => (
              <div className="col-sm-4" key={comment.id}>
                <p>{comment.content}
                  <button onClick={() => deleteComment(comment.id)}>
                    Delete
                  </button>
                </p>
              </div>
            ))}
          </div>
    </div>
  );
};

export default CommentSection;

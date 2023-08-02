function CommentList({ comments }) {
  const renderedComments = comments ? (
    comments.map((comment) => {
      let content;
      if (comment.status === "rejected") {
        content = "This comment has been rejected";
      }
      if (comment.status === "pending") {
        content = "This comment is awaiting moderation";
      }
      if (comment.status === "approved") {
        content = comment.content;
      }
      return <li key={comment.id}>{content}</li>;
    })
  ) : (
    <p>No comments Yet</p>
  );
  return <ul>{renderedComments}</ul>;
}

export default CommentList;

import React, { useState } from "react";
import moment from "moment";
import Link from "next/link";

interface BlogCardProps {
  createdAt: string;
  description: string;
  thumbnail: string;
  title: string;
  updatedAt: string;
  user: {
    email: string;
    password: string;
    role: string;
    username: string;
  };
  _id: string;
}

function truncateToWords(text: string, numWords: number) {
  const words = text?.split(" ");
  if (words?.length > numWords) {
    return words.slice(0, numWords).join(" ") + " ...";
  }
  return text;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  user,
  createdAt,
  thumbnail,
  _id,
  description,
}) => {
  const truncatedDescription = truncateToWords(description, 10);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [reaction, setReaction] = useState<string | null>(null);

  // const handleReaction = (selectedReaction: string) => {
  //   setReaction(selectedReaction);
  // };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment = comment.trim();
    if (newComment) {
      setComments((prevComments) => [...prevComments, newComment]);
      setComment("");
    }
  };

  return (
    <div className="max-w-md mx-4 bg-white shadow-lg border-4 rounded-lg overflow-hidden">
      {thumbnail && <img className="w-96 h-80" src={`https://blogbackend-ten.vercel.app/${thumbnail}`} alt="" />}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm">
          By {user?.username} | {moment(createdAt).format("LL")}
        </p>
        <p className="text-gray-700 mt-2">{truncatedDescription}</p>
      </div>

      <div className="bg-gray-100 p-2">
        <div className="ml-auto">
          <button
            className="text-blue-600 font-semibold"
            onClick={() => setShowComments(!showComments)}
          >
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </button>
        </div>
      </div>
      {showComments && (
        <div className="bg-gray-100 p-4">
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((comment, index) => (
              <p key={index} className="border-b border-gray-300 py-2">
                {comment}
              </p>
            ))
          )}
        </div>
      )}
      <div className="bg-gray-100 p-4">
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave a comment..."
            className="border border-gray-300 p-2 w-full"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogCard;

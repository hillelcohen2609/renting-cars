import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_API } from "../../../../constant/apiParams";
import { toast } from "react-toastify";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { Star } from "@mui/icons-material";

export const Comments = ({ idUser, carId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    comment: "",
    rating: 0,
  });

  useEffect(() => {
    // Fetch all comments from the server
    axios
      .get(`${BASE_API}api/responses/getResponsesByCar/${carId}`)
      .then((res) => setComments(res.data))
      .catch((_err) => toast.error("Error getting the comments"));
  }, []);

  const handleCommentChange = (e) => {
    setNewComment((prev) => ({
      ...prev,
      comment: e.target.value,
    }));
  };

  const handleRatingChange = (e) => {
    const value = Math.min(Math.max(parseInt(e.target.value, 10), 0), 5); // Ensures rating stays between 0 and 5
    setNewComment((prev) => ({
      ...prev,
      rating: isNaN(value) ? 0 : value,
    }));
  };

  const uploadComment = () => {
    // Send the new comment to the server
    if (newComment.comment.trim() === "") {
      toast.error("Comment cannot be empty");
      return;
    }

    axios
      .post(
        `${BASE_API}api/responses/addResponse?id_car=${carId}&id_user=${idUser}`,
        {
          ...newComment,
          commentDate: new Date(),
          status: "approved",
        }
      )
      .then(() => {
        toast.success("Comment added successfully");
        // Clear the input fields
        setNewComment({ comment: "", rating: 0 });
        // Optionally refetch comments or add the new comment to the local state
        axios
          .get(`${BASE_API}api/responses/getResponsesByCar/${carId}`)
          .then((res) => setComments(res.data));
      })
      .catch((_err) => toast.error("Error uploading the comment"));
  };

  return (
    <div style={{ alignItems: "center", justifyContent: "center" }}>
      <TextField
        fullWidth
        type="text"
        label="Add a comment"
        value={newComment.text}
        onChange={handleCommentChange}
        sx={{ marginBottom: "2vh" }}
      />
      <TextField
        fullWidth
        type="number"
        label="Add rating"
        value={newComment.rating}
        onChange={handleRatingChange}
        inputProps={{ min: 0, max: 5 }}
        sx={{ marginBottom: "2vh" }}
      />
      <Button
        sx={{ marginBottom: "3vh" }}
        variant="contained"
        fullWidth
        onClick={uploadComment}
      >
        Upload comment
      </Button>
      <Typography>All comments:</Typography>
      {comments ? (
        comments.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {comments.map((comment) => (
              <div
                style={{
                  width: "25%",
                  border: "1px solid grey",
                  padding: "2px",
                  borderRadius: "8px",
                  margin: "0.5rem 0.5rem",
                }}
                key={comment.idResponse}
              >
                <p>{comment.comment}</p>
                <p>{comment.commentDate}</p>
                <p>
                  {comment.rating}
                  <Star />
                </p>
              </div>
            ))}
          </div>
        ) : (
          <Typography>No Comments Yet</Typography>
        )
      ) : (
        <CircularProgress size={"10vw"} />
      )}
    </div>
  );
};

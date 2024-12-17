import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const CustomLink = ({ to, text, variant, color, style }) => {
  return (
    <Link style={{ textDecoration: "none" }} to={to}>
      <Typography
        variant={variant}
        sx={{ color: color ? color : "white" }}
        style={style}
      >
        {text}
      </Typography>
    </Link>
  );
};

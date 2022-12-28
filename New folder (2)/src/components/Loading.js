import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: "0.7",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Loading;

import React from "react";
import { RouterProvider } from "react-router-dom";
import { useRouter } from "./Utils/Routes";

const App = () => {
  const { router } = useRouter();
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

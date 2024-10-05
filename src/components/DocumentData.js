import { useFrappeGetDoc } from "frappe-react-sdk";
import React from "react";

export const DocumentData = () => {
  const { data, error, isValidating, mutate } = useFrappeGetDoc(
    "User",
    "huannghiem2711@gmail.com",
    {
      /** SWR Configuration Options - Optional **/
    }
  );

  if (isValidating) {
    console.log("Loaded");
    return <>Loading</>;
  }
  if (error) {
    return <>{JSON.stringify(error)}</>;
  }
  if (data) {
    return (
      <p>
        {JSON.stringify(data)}
        <button onClick={() => mutate()}>Reload</button>
      </p>
    );
  }
  return null;
};

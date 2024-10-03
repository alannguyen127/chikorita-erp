import { useFrappeGetDoc } from "frappe-react-sdk";
import React from "react";

export const DocumentData = () => {
  const { data, error, isValidating, mutate } = useFrappeGetDoc(
    "EFE Customer",
    "q2b7gok95v",
    {
      /** SWR Configuration Options - Optional **/
    }
  );
  console.log("Loaded");
  if (isValidating) {
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

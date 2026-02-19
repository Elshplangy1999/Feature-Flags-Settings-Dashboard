import { HandleReducerProps } from "@/interfaces/HandleReducer/HandleReducerProps";
import AdvLoader from "./AdvLoader";
import AlertError from "./AlertError";

const HandleReducer = ({
  loading,
  error,
  message,
  className,
}: HandleReducerProps) => {

  if (loading === "pending") {
    return (
      <div className="flex items-center justify-center">
        <AdvLoader
          message={message}
          variant="glow"
          speed="slow"
          color="green"
          className={className}
        />
      </div>
    );
  }

  if (error) {
    return <AlertError error={error} />;
  }
};

export default HandleReducer;

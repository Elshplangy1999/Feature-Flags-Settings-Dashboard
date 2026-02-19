import { InfoNotificationProps } from "@/interfaces/Notify/InfoNotificationProps";
import React from "react";

const InfoNotification: React.FC<InfoNotificationProps> = ({
  type = "info",
  title,
  message,
  actionText,
  onAction,
  onClose,
}) => {
  return (
    <div className="max-w-139.25  bg-white rounded-lg border border-stroke py-6 pl-4 pr-4.5 shadow-3 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card sm:pl-6">
      <div className="flex justify-between">
        {/* Left: Icon + Content */}
        <div className="flex grow gap-6">
          {/* Icon Placeholder */}
          <div>
            {type === "update" && (
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.02922 14.0455L12.3673 8.17621C15.1714 4.3823 16.5734 2.48535 17.8815 2.88622C19.1896 3.28708 19.1896 5.61369 19.1896 10.2669V10.7057C19.1896 12.384 19.1896 13.2231 19.7259 13.7495L19.7542 13.7768C20.3021 14.292 21.1755 14.292 22.9222 14.292C26.0656 14.292 27.6374 14.292 28.1685 15.2453C28.1773 15.2611 28.1859 15.277 28.1942 15.2931C28.6956 16.2612 27.7856 17.4924 25.9655 19.9549L21.6275 25.8241C18.8233 29.618 17.4213 31.515 16.1132 31.1141C14.8051 30.7132 14.8051 28.3866 14.8052 23.7333L14.8052 23.2948C14.8052 21.6164 14.8052 20.7773 14.269 20.2509L14.2406 20.2236C13.6927 19.7084 12.8193 19.7084 11.0725 19.7084C7.92915 19.7084 6.35745 19.7084 5.82627 18.755C5.81747 18.7392 5.80892 18.7233 5.80062 18.7073C5.29919 17.7392 6.2092 16.508 8.02922 14.0455Z"
                  fill="#5750F1"
                />
              </svg>
            )}
          </div>

          {/* Content */}
          <div>
            <h4 className="mb-2 text-lg font-medium text-dark dark:text-white">
              {title}
            </h4>
            <p className="text-body-sm font-medium">{message}</p>
            {actionText && (
              <button
                onClick={onAction}
                className="mt-5 font-medium text-primary"
              >
                {actionText}
              </button>
            )}
          </div>
        </div>

        {/* Right: Close button */}
        <div>
          <button
            onClick={onClose}
            className="hover:text-dark dark:hover:text-white"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.03 8.97c-.29-.29-.76-.29-1.06 0s-.29.77 0 1.06L10.94 12l-2.03 2.03c-.29.29-.29.77 0 1.06s.77.29 1.06 0L12 13.06l2.03 2.03c.29.29.77.29 1.06 0s.29-.77 0-1.06L13.06 12l2.03-2.03c.29-.29.29-.77 0-1.06s-.77-.29-1.06 0L12 10.94 10.03 8.97Z" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 1.25C6.06 1.25 1.25 6.06 1.25 12S6.06 22.75 12 22.75 22.75 17.94 22.75 12 17.94 1.25 12 1.25Zm-9.25 10.75c0-5.11 4.14-9.25 9.25-9.25s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25-9.25-4.14-9.25-9.25Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoNotification;

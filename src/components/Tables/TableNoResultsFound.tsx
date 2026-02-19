import { useTranslation } from "@/hooks/useTranslation";

const TableNoResultsFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col items-center justify-center rounded bg-gray-100 p-10 text-center dark:bg-gray-400">
        <h1 className="text-2xl font-bold dark:text-white">
          {t("No results found")}
        </h1>

        <p className="mt-2 text-gray-600">
          {t("There is no data to display at the moment.")}
        </p>
      </div>
    </>
  );
};

export default TableNoResultsFound;

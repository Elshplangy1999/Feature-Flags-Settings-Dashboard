import { useTranslation } from "@/hooks/useTranslation";
import { CellData, DynamicTDProps } from "@/interfaces/GeneralTable/DynamicColumnsProps";

const DynamicTD: React.FC<DynamicTDProps> = ({ data }) => {
  const { t } = useTranslation();
  
  return (
    <>
      {data.map((cell: CellData, index: number) => (
        <td
          key={index}
          className={`border-[#eee] px-4 py-4 text-center dark:border-dark-3 ${cell.className || ""} border-b`}
          {...(cell.options || {})}
        >
          {cell.element ? (
            cell.element
          ) : (
            <span className="text-dark dark:text-white">
              {cell.value !== undefined && cell.value !== null ? t(String(cell.value)) : ""}
            </span>
          )}
        </td>
      ))}
    </>
  );
};

export default DynamicTD;
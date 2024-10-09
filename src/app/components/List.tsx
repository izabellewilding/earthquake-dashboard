import { Earthquake } from "../types/types";

interface ListProps {
  data: Object[];
}

export const List = ({ data }: ListProps) => {
  return (
    <div className="max-h-fit p-3 md:m-5 sm:ml-8">
      <h2 className="text-md font-bold pb-6 text-text">Recent Activity</h2>
      <ul>
        {data?.map((earthquake: any, index: number) => (
          <li
            key={`${index}${earthquake.properties.id}`}
            className="pb-3 text-sm text-slate-400 hover:text-slate-200 cursor-pointer transition-all"
          >
            <p>{`(M${earthquake.properties.mag}) ${earthquake.properties.place}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

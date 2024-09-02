import { Earthquake } from "../types/types";

interface ListProps {
  data: Object[];
}

export const List = ({ data }: ListProps) => {
  return (
    <div className="max-h-fit p-8 md:m-6 sm:ml-8  rounded-md bg-gradient-to-b ">
      <h2 className="text-lg font-bold pb-6 text-text">Recent Activity</h2>
      <ul>
        {data?.map((earthquake: any, index: number) => (
          <li
            key={`${index}${earthquake.properties.id}`}
            className="pb-3 text-slate-400"
          >
            <p>{`(M${earthquake.properties.mag}) ${earthquake.properties.place}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

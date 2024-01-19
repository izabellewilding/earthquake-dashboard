import { Earthquake } from "../types/types";

interface ListProps {
  data: Object[];
}

export const List = ({ data }: ListProps) => {
  return (
    <div className="max-h-fit p-6 m-4 ml-8  rounded-md bg-gradient-to-b from-slate-900">
      <h2 className="text-lg font-bold pb-6">Recent activity..</h2>
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
